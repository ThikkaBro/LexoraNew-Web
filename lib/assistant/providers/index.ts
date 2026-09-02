import { assistantConfig } from "@/assistant.config";
import { anthropicProvider } from "./anthropic";
import { openAiCompatibleProvider } from "./openai-compatible";
import { demoProvider } from "./demo";
import type { Provider } from "./types";

export type { Provider, ProviderInput } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROVIDER RESOLUTION
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Every environment variable read in this file is server-side. None is
 *  prefixed NEXT_PUBLIC_, so none is inlined into the browser bundle, and this
 *  module is only reachable from route handlers.
 *
 *  Resolution order under "auto":
 *
 *    1. ANTHROPIC_API_KEY            → Anthropic. Best answers, prompt caching.
 *    2. ASSISTANT_OPENAI_API_KEY     → whichever OpenAI-compatible provider the
 *                                      base URL points at. Free tiers welcome.
 *    3. nothing                      → demo mode. Free, offline, no key.
 *
 *  Deliberately silent about which key exists in any client-visible response.
 *  The widget is told whether it is talking to a real model, and nothing more.
 */

const hasAnthropicKey = () => Boolean(process.env.ANTHROPIC_API_KEY?.trim());
const hasOpenAiKey = () => Boolean(process.env.ASSISTANT_OPENAI_API_KEY?.trim());

export function resolveProvider(): Provider {
  const { provider, anthropicModel, openaiModel } = assistantConfig.model;
  const openai = () =>
    openAiCompatibleProvider(process.env.ASSISTANT_OPENAI_MODEL?.trim() || openaiModel);

  switch (provider) {
    case "anthropic":
      if (!hasAnthropicKey()) {
        console.warn(
          "[assistant] provider is pinned to anthropic but ANTHROPIC_API_KEY is unset — serving demo mode.",
        );
        return demoProvider();
      }
      return anthropicProvider(anthropicModel);

    case "openai-compatible":
      if (!hasOpenAiKey()) {
        console.warn(
          "[assistant] provider is pinned to openai-compatible but ASSISTANT_OPENAI_API_KEY is unset — serving demo mode.",
        );
        return demoProvider();
      }
      return openai();

    case "demo":
      return demoProvider();

    case "auto":
    default:
      if (hasAnthropicKey()) return anthropicProvider(anthropicModel);
      if (hasOpenAiKey()) return openai();
      return demoProvider();
  }
}

/**
 * The fallback used when the chosen provider throws before producing any text
 * — an expired key, an exhausted free-tier quota, a provider outage. The
 * visitor gets the site's real answer rather than an error message.
 *
 * Only safe to use when nothing has been streamed yet; the route enforces that.
 */
export const fallbackProvider = demoProvider;
