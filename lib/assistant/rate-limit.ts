import { assistantConfig } from "@/assistant.config";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PER-IP RATE LIMITING
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Two backends behind one function:
 *
 *    • In-memory (default, no setup). Counters live in the Node process.
 *    • Upstash Redis (set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
 *      Called over its REST API with fetch, so it adds no dependency.
 *
 *  BE HONEST ABOUT THE IN-MEMORY LIMITATION. On a single long-running server
 *  it is exact. On serverless — Vercel included — each instance keeps its own
 *  counters, so someone hitting several cold instances can exceed the limit by
 *  roughly the number of live instances. That is a fine ceiling against a
 *  casual abuser and useless against a determined one. If real money is at
 *  stake, set the two Upstash variables; its free tier covers this comfortably.
 */

export type RateLimitResult = {
  ok: boolean;
  /** Seconds until the caller may retry. Only meaningful when ok is false. */
  retryAfter: number;
  remaining: number;
};

const { perWindow, windowSeconds, perDay } = assistantConfig.limits.rateLimit;
const DAY_SECONDS = 86_400;

/* ── In-memory backend ────────────────────────────────────────────────────── */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

/**
 * Bounded so a flood of distinct IPs cannot grow the map without limit — that
 * would turn a rate limiter into a memory-exhaustion vector.
 */
const MAX_TRACKED = 10_000;

function sweep(now: number) {
  if (buckets.size < MAX_TRACKED) return;
  // Array.from rather than iterating the Map directly: the project's
  // tsconfig has no `target`, so downlevel iteration is unavailable.
  for (const [key, bucket] of Array.from(buckets.entries())) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  // Still full of live entries: drop the oldest insertions (Map preserves order).
  if (buckets.size >= MAX_TRACKED) {
    const excess = buckets.size - Math.floor(MAX_TRACKED * 0.9);
    let i = 0;
    for (const key of Array.from(buckets.keys())) {
      if (i++ >= excess) break;
      buckets.delete(key);
    }
  }
}

function hitMemory(key: string, limit: number, seconds: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + seconds * 1000 });
    return { ok: true, retryAfter: 0, remaining: limit - 1 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
      remaining: 0,
    };
  }
  return { ok: true, retryAfter: 0, remaining: limit - bucket.count };
}

/* ── Upstash backend ──────────────────────────────────────────────────────── */

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
export const usingSharedRateLimitStore = Boolean(upstashUrl && upstashToken);

/**
 * INCR the key, and set the TTL only on the first hit of a window. Two round
 * trips in a pipeline, so the whole check is one HTTP request.
 */
async function hitUpstash(
  key: string,
  limit: number,
  seconds: number,
): Promise<RateLimitResult> {
  const res = await fetch(`${upstashUrl}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${upstashToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["TTL", key],
    ]),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Upstash responded ${res.status}`);

  const [incr, ttl] = (await res.json()) as Array<{ result: number }>;
  const count = incr.result;

  // TTL is -1 when the key exists with no expiry: the first hit of a window.
  if (ttl.result < 0) {
    await fetch(`${upstashUrl}/expire/${encodeURIComponent(key)}/${seconds}`, {
      headers: { Authorization: `Bearer ${upstashToken}` },
      cache: "no-store",
    });
  }

  const retryAfter = ttl.result > 0 ? ttl.result : seconds;
  return count > limit
    ? { ok: false, retryAfter, remaining: 0 }
    : { ok: true, retryAfter: 0, remaining: limit - count };
}

/* ── Public API ───────────────────────────────────────────────────────────── */

async function hit(key: string, limit: number, seconds: number): Promise<RateLimitResult> {
  if (usingSharedRateLimitStore) {
    try {
      return await hitUpstash(key, limit, seconds);
    } catch (error) {
      // Never let the limiter's own failure take the chat down with it. Fall
      // back to the in-memory counter and make the degradation visible.
      console.warn("[assistant] rate-limit store unreachable, using memory:", error);
    }
  }
  return hitMemory(key, limit, seconds);
}

/** Checks both the short window and the daily cap. Short window first. */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const day = new Date().toISOString().slice(0, 10);

  const short = await hit(`assistant:w:${ip}`, perWindow, windowSeconds);
  if (!short.ok) return short;

  const daily = await hit(`assistant:d:${day}:${ip}`, perDay, DAY_SECONDS);
  if (!daily.ok) return daily;

  return short;
}

/**
 * Best-effort client IP.
 *
 * On Vercel, `x-forwarded-for` is set by the platform's proxy and the leftmost
 * entry is the real client. Anywhere the app is directly exposed, a client can
 * forge this header — so treat the limiter as a cost control, not a security
 * boundary, and put a real WAF in front if you need one.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
