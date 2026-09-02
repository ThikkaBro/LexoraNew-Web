import { assistantConfig } from "@/assistant.config";
import { buildSystemPrompt, wrapUserMessage, looksLikeFallback } from "@/lib/assistant/prompt";
import { resolveProvider, fallbackProvider } from "@/lib/assistant/providers";
import { checkRateLimit, clientIp } from "@/lib/assistant/rate-limit";
import { logUsage } from "@/lib/assistant/usage";
import type { ChatMessage, StreamEvent } from "@/lib/assistant/types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  POST /api/assistant/chat
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Takes the conversation so far plus a new message, returns a stream of
 *  newline-delimited JSON events.
 *
 *  This is the only place the model is called, and it runs on the server. The
 *  API key never enters a response body, a header, or the client bundle.
 */

// Node rather than Edge: the knowledge base is read from disk with node:fs,
// and the Anthropic SDK is happiest here.
export const runtime = "nodejs";
// Never cache a chat response — every request is different and some are
// rate-limit rejections.
export const dynamic = "force-dynamic";

const { limits, model } = assistantConfig;

const encoder = new TextEncoder();

/** One event, one line. */
function line(e: StreamEvent): string {
  return `${JSON.stringify(e)}\n`;
}

function event(e: StreamEvent): Uint8Array {
  return encoder.encode(line(e));
}

/** A single-event stream, for the paths that fail before streaming starts. */
function errorStream(message: string, status: number, retryAfter?: number) {
  return new Response(line({ type: "error", message, retryAfter }), {
    status,
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}),
    },
  });
}

/* ── Input validation ─────────────────────────────────────────────────────── */

type Body = { messages?: unknown; sessionId?: unknown };

/**
 * Validates and normalises the conversation.
 *
 * Everything the client sends is untrusted — including the assistant turns,
 * which a crafted request could use to put words in the assistant's mouth and
 * steer the next reply. We cannot verify them (the server is stateless), so we
 * cap and truncate them like everything else, and the system prompt is written
 * to hold even when the history is hostile.
 */
function parseMessages(raw: unknown): { messages: ChatMessage[]; error?: string } {
  if (!Array.isArray(raw)) return { messages: [], error: "Expected a messages array." };

  const cleaned: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { role, content } = item as Record<string, unknown>;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const trimmed = content.trim();
    if (!trimmed) continue;
    cleaned.push({ role, content: trimmed });
  }

  if (cleaned.length === 0) return { messages: [], error: "No usable messages." };

  const last = cleaned[cleaned.length - 1]!;
  if (last.role !== "user") return { messages: [], error: "The last message must be from the visitor." };
  if (last.content.length > limits.maxMessageChars) {
    return {
      messages: [],
      error: `Please keep messages under ${limits.maxMessageChars} characters.`,
    };
  }

  // Drop the oldest turns beyond the cap. This is the main lever on input
  // cost: without it a long conversation grows without limit and every
  // subsequent request pays for the whole thing again.
  let trimmed = cleaned.slice(-limits.maxHistoryMessages);
  // The API requires the first message to be from the user; slicing can land
  // on an assistant turn.
  while (trimmed.length > 0 && trimmed[0]!.role !== "user") trimmed = trimmed.slice(1);

  // Older turns are capped too — a visitor could otherwise pad the history
  // with long messages that individually passed the check on an earlier turn.
  trimmed = trimmed.map((m) => ({
    ...m,
    content: m.content.slice(0, limits.maxMessageChars),
  }));

  return { messages: trimmed };
}

/* ── Handler ──────────────────────────────────────────────────────────────── */

export async function POST(request: Request) {
  const startedAt = Date.now();

  const limit = await checkRateLimit(clientIp(request.headers));
  if (!limit.ok) {
    return errorStream(
      "That's a lot of questions in a short time. Give it a minute, or email us and we'll reply properly.",
      429,
      limit.retryAfter,
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return errorStream("Could not read that request.", 400);
  }

  const { messages, error } = parseMessages(body.messages);
  if (error) return errorStream(error, 400);

  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId.slice(0, 64) : "anonymous";

  const question = messages[messages.length - 1]!.content;

  // The visitor's text is wrapped so the model can tell content from
  // instruction. Only the newest message needs it: earlier user turns were
  // wrapped when they were sent, and re-wrapping them would change the prefix.
  const modelMessages: ChatMessage[] = messages.map((m, i) =>
    i === messages.length - 1 && m.role === "user"
      ? { ...m, content: wrapUserMessage(m.content) }
      : m,
  );

  let system: string;
  try {
    system = buildSystemPrompt(question);
  } catch (cause) {
    console.error("[assistant] knowledge base unavailable:", cause);
    return errorStream("The assistant is not configured yet.", 503);
  }

  const provider = resolveProvider();
  const input = {
    system,
    messages: modelMessages,
    maxTokens: model.maxTokens,
    temperature: model.temperature,
  };

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let reply = "";
      let streamed = false;
      let usedFallback = false;

      const run = async (p: typeof provider) => {
        const iterator = p.stream(input);
        while (true) {
          const next = await iterator.next();
          if (next.done) return next.value;
          streamed = true;
          reply += next.value;
          controller.enqueue(event({ type: "delta", text: next.value }));
        }
      };

      try {
        let usage;
        try {
          usage = await run(provider);
        } catch (cause) {
          // Nothing streamed yet, so we can still switch horses: answer from
          // the knowledge base rather than showing the visitor an error.
          if (streamed) throw cause;
          console.error(`[assistant] ${provider.id} failed, falling back to demo:`, cause);
          usedFallback = true;
          usage = await run(fallbackProvider());
        }

        const couldNotAnswer = looksLikeFallback(reply);

        logUsage({
          usage,
          sessionId,
          durationMs: Date.now() - startedAt,
          historyLength: messages.length,
          fallback: couldNotAnswer,
          degraded: usedFallback,
        });

        controller.enqueue(
          event({
            type: "done",
            usage,
            // Tells the widget whether to offer the lead form. Deliberately
            // the only signal we send back — no prompt, no key state, no
            // internal detail.
            fallback: couldNotAnswer,
          }),
        );
      } catch (cause) {
        console.error("[assistant] stream failed:", cause);
        controller.enqueue(
          event({
            type: "error",
            message: streamed
              ? "That answer got cut off. Try again?"
              : "Something went wrong on our side. Try again, or email us.",
          }),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      // Stops nginx and similar proxies buffering the stream into one chunk,
      // which would defeat the whole point of streaming.
      "X-Accel-Buffering": "no",
    },
  });
}
