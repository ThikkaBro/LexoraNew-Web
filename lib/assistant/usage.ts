import type { UsageSummary } from "./types";

/**
 * Token accounting, so "what is this actually costing me" has a real answer
 * rather than a guess at the end of the month.
 *
 * Every completed request writes one JSON line to stdout. On Vercel that lands
 * in the runtime logs, where it can be filtered by the `assistant_usage` tag
 * and, on a paid plan, drained to somewhere you can total it up.
 */

/** USD per million tokens. Update when Anthropic's price list changes. */
const PRICING: Record<string, { input: number; output: number; cacheRead: number; cacheWrite: number }> = {
  "claude-sonnet-4-6": { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 },
  "claude-opus-5": { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 },
  "claude-haiku-4-5": { input: 1, output: 5, cacheRead: 0.1, cacheWrite: 1.25 },
};

export function priceFor(model: string) {
  return PRICING[model] ?? null;
}

/**
 * Cost of one request in USD. Returns 0 for models we have no price for —
 * which covers every free-tier provider, and is the honest answer for them.
 */
export function estimateCost(
  model: string,
  usage: Omit<UsageSummary, "provider" | "model" | "costUsd">,
): number {
  const price = priceFor(model);
  if (!price) return 0;

  const perToken = (rate: number) => rate / 1_000_000;
  return (
    usage.inputTokens * perToken(price.input) +
    usage.outputTokens * perToken(price.output) +
    usage.cacheReadTokens * perToken(price.cacheRead) +
    usage.cacheWriteTokens * perToken(price.cacheWrite)
  );
}

export function logUsage(entry: {
  usage: UsageSummary;
  sessionId: string;
  durationMs: number;
  historyLength: number;
  fallback: boolean;
  /** True when the configured provider failed and demo mode answered instead. */
  degraded: boolean;
}) {
  const { usage } = entry;
  const cacheable = usage.inputTokens + usage.cacheReadTokens + usage.cacheWriteTokens;

  console.log(
    JSON.stringify({
      tag: "assistant_usage",
      at: new Date().toISOString(),
      // Not the visitor's IP: this is only here to group a conversation's
      // requests together when reading logs, and it is generated client-side.
      session: entry.sessionId,
      provider: usage.provider,
      model: usage.model,
      input_tokens: usage.inputTokens,
      output_tokens: usage.outputTokens,
      cache_read_tokens: usage.cacheReadTokens,
      cache_write_tokens: usage.cacheWriteTokens,
      // The single number that tells you whether caching is working. If this
      // sits near 0 across requests, something in the system prompt is varying
      // per request and you are paying full price for the knowledge base.
      cache_hit_ratio: cacheable > 0 ? +(usage.cacheReadTokens / cacheable).toFixed(3) : 0,
      cost_usd: +usage.costUsd.toFixed(6),
      duration_ms: entry.durationMs,
      history_messages: entry.historyLength,
      could_not_answer: entry.fallback,
      degraded: entry.degraded,
    }),
  );
}
