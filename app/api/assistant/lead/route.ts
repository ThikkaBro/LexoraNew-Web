import { assistantConfig } from "@/assistant.config";
import { checkRateLimit, clientIp } from "@/lib/assistant/rate-limit";
import type { ChatMessage } from "@/lib/assistant/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  POST /api/assistant/lead
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  WHERE LEADS GO — and why this choice.
 *
 *  Set LEAD_WEBHOOK_URL and every submission is POSTed to it as JSON. That one
 *  variable covers Zapier, Make, n8n, a Slack incoming webhook, Formspree, a
 *  Google Apps Script, or a client's own CRM endpoint — so a client picks their
 *  destination without a code change, and there is no email provider account to
 *  create, no API key to rotate, and no domain to verify before the first lead
 *  can arrive.
 *
 *  If the variable is unset, submissions are written to the server log as a
 *  tagged JSON line. Nothing is ever silently dropped.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 120, email: 200, message: 2000 } as const;

// Deliberately permissive. The purpose is to catch a typo, not to police what
// a valid address looks like — a rejected real customer costs far more than a
// junk row does.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  if (!assistantConfig.leadCapture.enabled) return json({ error: "Not enabled." }, 404);

  // Leads share the chat's per-IP budget: a submission endpoint that anyone can
  // hit without limit is a spam funnel into whatever the webhook is wired to.
  const limit = await checkRateLimit(clientIp(request.headers));
  if (!limit.ok) {
    return json({ error: "Too many requests. Try again shortly." }, 429);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "Could not read that request." }, 400);
  }

  const str = (value: unknown, max: number) =>
    typeof value === "string" ? value.trim().slice(0, max) : "";

  const name = str(body.name, MAX.name);
  const email = str(body.email, MAX.email);
  const message = str(body.message, MAX.message);

  if (!name) return json({ error: "Please add your name." }, 400);
  if (!EMAIL.test(email)) return json({ error: "That email doesn't look right." }, 400);

  // Honeypot: a hidden field no person can see or fill. Bots fill everything.
  // Answer 200 so a bot cannot tell it was caught and try a different shape.
  if (str(body.company, 100)) {
    console.log(JSON.stringify({ tag: "assistant_lead_rejected", reason: "honeypot" }));
    return json({ ok: true }, 200);
  }

  // The last few turns give whoever picks this up the context to reply
  // properly, without storing the whole conversation.
  const transcript: ChatMessage[] = Array.isArray(body.transcript)
    ? (body.transcript as unknown[])
        .filter(
          (m): m is ChatMessage =>
            !!m &&
            typeof m === "object" &&
            typeof (m as ChatMessage).content === "string" &&
            ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant"),
        )
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 600) }))
    : [];

  const lead = {
    source: `${assistantConfig.business.name} site assistant`,
    receivedAt: new Date().toISOString(),
    name,
    email,
    message: message || null,
    page: str(body.page, 300) || null,
    transcript,
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    console.log(JSON.stringify({ tag: "assistant_lead", ...lead }));
    return json({ ok: true, delivered: "log" }, 200);
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Optional shared secret, for a receiver that wants to verify the
        // caller. Omitted from the request entirely when unset.
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? { "X-Assistant-Secret": process.env.LEAD_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify(lead),
      cache: "no-store",
      // A webhook that hangs must not hold the visitor's browser open.
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return json({ ok: true, delivered: "webhook" }, 200);
  } catch (cause) {
    // The lead is worth more than the delivery mechanism. Log it in full so it
    // is recoverable, and tell the visitor it arrived — because it did.
    console.error("[assistant] lead webhook failed:", cause);
    console.log(JSON.stringify({ tag: "assistant_lead", delivery: "webhook_failed", ...lead }));
    return json({ ok: true, delivered: "log" }, 200);
  }
}
