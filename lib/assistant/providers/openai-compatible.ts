import type { Provider, ProviderInput } from "./types";
import type { UsageSummary } from "../types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ANY OPENAI-COMPATIBLE PROVIDER — INCLUDING THE FREE ONES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Groq, Google AI Studio, Cerebras and OpenRouter all expose the same
 *  `/chat/completions` shape, and all four have a real free tier. One adapter
 *  therefore covers all of them: point the base URL at whichever you signed up
 *  for and paste that provider's key into ASSISTANT_OPENAI_API_KEY.
 *
 *  Written against `fetch` rather than the OpenAI SDK on purpose — the SDK
 *  would be a dependency added solely to POST one JSON body and read an SSE
 *  stream, and the wire format below is stable across all four providers.
 *
 *  These providers have no prompt caching, so the whole knowledge base is paid
 *  for on every request. On a free tier that costs nothing but quota; it is the
 *  reason Anthropic remains the default once there is a budget.
 */

const DEFAULT_BASE_URL = "https://api.groq.com/openai/v1";

export function openAiCompatibleProvider(model: string): Provider {
  const baseUrl = (process.env.ASSISTANT_OPENAI_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");

  return {
    id: "openai-compatible",
    model,

    async *stream(input: ProviderInput): AsyncGenerator<string, UsageSummary, void> {
      const res = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ASSISTANT_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          max_tokens: input.maxTokens,
          temperature: input.temperature,
          stream: true,
          // Not every provider honours this; where it is ignored we simply
          // report zero tokens rather than failing.
          stream_options: { include_usage: true },
          messages: [
            { role: "system", content: input.system },
            ...input.messages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
        cache: "no-store",
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => "");
        throw new Error(
          `${baseUrl} responded ${res.status}${detail ? `: ${detail.slice(0, 300)}` : ""}`,
        );
      }

      let inputTokens = 0;
      let outputTokens = 0;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      // Server-sent events: blank-line-separated records, each a `data:` line.
      // Chunks split anywhere, so we only consume complete lines and keep the
      // remainder in `buffer` for the next read.
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;

          try {
            const parsed = JSON.parse(payload);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) yield delta;
            if (parsed.usage) {
              inputTokens = parsed.usage.prompt_tokens ?? inputTokens;
              outputTokens = parsed.usage.completion_tokens ?? outputTokens;
            }
          } catch {
            // A malformed record is not worth ending a live answer over.
          }
        }
      }

      return {
        provider: "openai-compatible",
        model,
        inputTokens,
        outputTokens,
        cacheReadTokens: 0,
        cacheWriteTokens: 0,
        // Free tiers cost nothing per token; a paid one is priced by that
        // provider, which we do not model here. Zero is the honest number.
        costUsd: 0,
      } satisfies UsageSummary;
    },
  };
}
