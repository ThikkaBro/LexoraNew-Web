import type { ChatMessage, UsageSummary } from "../types";

export type ProviderInput = {
  system: string;
  messages: ChatMessage[];
  maxTokens: number;
  temperature: number;
};

/**
 * A provider streams text and then reports what it cost.
 *
 * Modelled as an async generator so the return value carries the usage: the
 * generator yields text deltas as they arrive, and its `return` value is the
 * usage summary, which is only known once the stream has finished. That keeps
 * "stream the text" and "account for the tokens" in one object with no
 * callbacks and no mutable state passed around.
 */
export interface Provider {
  /** Short id used in logs and in the widget's status line. */
  id: string;
  model: string;
  /** True when replies do not come from a real language model. */
  isDemo?: boolean;
  stream(input: ProviderInput): AsyncGenerator<string, UsageSummary, void>;
}
