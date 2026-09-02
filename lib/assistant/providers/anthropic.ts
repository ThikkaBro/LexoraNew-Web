import Anthropic from "@anthropic-ai/sdk";
import { estimateCost } from "../usage";
import type { Provider, ProviderInput } from "./types";
import type { UsageSummary } from "../types";

/**
 * The Anthropic provider.
 *
 * THE API KEY IS READ HERE AND NOWHERE ELSE. `process.env` is not available in
 * browser code, this module is only ever imported by a route handler, and the
 * variable is not prefixed `NEXT_PUBLIC_` — which is the only way Next.js
 * inlines an environment variable into the client bundle. Three independent
 * reasons the key cannot reach the browser. Keep all three.
 */

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  return client;
}

export function anthropicProvider(model: string): Provider {
  return {
    id: "anthropic",
    model,

    async *stream(input: ProviderInput): AsyncGenerator<string, UsageSummary, void> {
      const stream = getClient().messages.stream({
        model,
        max_tokens: input.maxTokens,
        temperature: input.temperature,
        /**
         * The cache breakpoint sits on the system prompt, which holds the
         * rules and the entire knowledge base and is byte-identical on every
         * request. The conversation — the part that changes — comes after it,
         * so each request re-reads the cached prefix at a tenth of the input
         * price instead of paying for it again.
         *
         * Default TTL is 5 minutes, refreshed on every hit. A site with steady
         * traffic keeps it warm; the first visitor after a quiet spell pays to
         * write it. That is the trade, and it is a good one here.
         */
        system: [
          {
            type: "text",
            text: input.system,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: input.messages.map((m) => ({ role: m.role, content: m.content })),
      });

      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          yield event.delta.text;
        }
      }

      const final = await stream.finalMessage();
      const usage = {
        inputTokens: final.usage.input_tokens,
        outputTokens: final.usage.output_tokens,
        cacheReadTokens: final.usage.cache_read_input_tokens ?? 0,
        cacheWriteTokens: final.usage.cache_creation_input_tokens ?? 0,
      };

      const summary: UsageSummary = {
        provider: "anthropic",
        model,
        ...usage,
        costUsd: estimateCost(model, usage),
      };
      return summary;
    },
  };
}
