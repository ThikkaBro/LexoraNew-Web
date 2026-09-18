import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lexora-admin-2026";

function checkPassword(pw: string | null): boolean {
  return pw === ADMIN_PASSWORD;
}

// Helper to resolve Upstash / Redis credentials across ANY Vercel integration prefix.
function getRedisCredentials(): { url: string; token: string } | null {
  const knownUrlKeys = [
    "UPSTASH_REDIS_REST_URL",
    "KV_REST_API_URL",
    "KV_REDIS_REST_URL",
    "STORAGE_REDIS_REST_URL",
    "REDIS_URL",
  ];
  const knownTokenKeys = [
    "UPSTASH_REDIS_REST_TOKEN",
    "KV_REST_API_TOKEN",
    "KV_REDIS_REST_TOKEN",
    "STORAGE_REDIS_REST_TOKEN",
    "REDIS_TOKEN",
  ];

  for (const k of knownUrlKeys) {
    const url = process.env[k];
    if (url) {
      const tokenKey = k.replace(/_URL$/, "_TOKEN");
      const token = process.env[tokenKey];
      if (token) return { url, token };
    }
  }
  for (const k of knownTokenKeys) {
    const token = process.env[k];
    if (token) {
      const urlKey = k.replace(/_TOKEN$/, "_URL");
      const url = process.env[urlKey];
      if (url) return { url, token };
    }
  }

  // Fallback: scan ALL env vars for anything with "upstash.io" in the value
  const allKeys = Object.keys(process.env);
  for (const key of allKeys) {
    const val = process.env[key] || "";
    if (val.includes("upstash.io") && (key.includes("URL") || key.includes("url"))) {
      const base = key.replace(/_?URL$/i, "");
      const tokenKey = allKeys.find(
        (k) => k.startsWith(base) && (k.includes("TOKEN") || k.includes("token"))
      );
      if (tokenKey && process.env[tokenKey]) {
        return { url: val, token: process.env[tokenKey]! };
      }
    }
  }

  console.warn("[careers/admin] No Redis/Upstash credentials found.");
  return null;
}

interface StoredApplication {
  id: string;
  name: string;
  email: string;
  linkedin?: string | null;
  coverNote?: string | null;
  expectedSalary?: string | null;
  cvFileName?: string | null;
  cvUrl?: string | null;
  appliedAt?: string;
  [key: string]: unknown;
}

async function loadApplications(): Promise<StoredApplication[]> {
  const creds = getRedisCredentials();

  if (creds) {
    try {
      // ── Production: read from Upstash Redis ────────────────────────────────
      const { Redis } = await import("@upstash/redis");
      const redis = new Redis({ url: creds.url, token: creds.token });

      // Get all application IDs
      const ids = (await redis.lrange("career:apps", 0, -1)) as string[];
      if (!ids || ids.length === 0) return [];

      // Fetch each application hash in parallel
      const apps = await Promise.all(
        ids.map(async (id) => {
          try {
            const data = await redis.hgetall(`career:app:${id}`);
            return data as StoredApplication | null;
          } catch (err) {
            console.error(`[careers/admin] Error loading app ${id}:`, err);
            return null;
          }
        })
      );

      const validApps = apps.filter((a): a is StoredApplication => Boolean(a && a.id));

      // Sort newest first by appliedAt
      validApps.sort((a, b) => {
        const timeA = a.appliedAt ? new Date(a.appliedAt).getTime() : 0;
        const timeB = b.appliedAt ? new Date(b.appliedAt).getTime() : 0;
        return timeB - timeA;
      });

      return validApps;
    } catch (redisErr) {
      console.error("[careers/admin] Redis fetch failed:", redisErr);
      return [];
    }
  }

  // ── Dev: read from local JSON file ───────────────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    try {
      const { readFile } = await import("fs/promises");
      const indexFile = path.join(
        process.cwd(),
        "data",
        "applications",
        "index.json"
      );
      const raw = await readFile(indexFile, "utf-8");
      const list = JSON.parse(raw) as StoredApplication[];
      list.sort((a, b) => {
        const timeA = a.appliedAt ? new Date(a.appliedAt).getTime() : 0;
        const timeB = b.appliedAt ? new Date(b.appliedAt).getTime() : 0;
        return timeB - timeA;
      });
      return list;
    } catch {
      return [];
    }
  }

  return [];
}

// POST /api/careers/admin — validate password
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (checkPassword(body?.password)) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET /api/careers/admin?load=1 — fetch all applications
export async function GET(req: NextRequest) {
  try {
    const pw = req.headers.get("x-admin-password");
    if (!checkPassword(pw)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const applications = await loadApplications();
    return NextResponse.json({ applications });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
