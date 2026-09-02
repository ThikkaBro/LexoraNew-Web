/**
 * Shared types for the assistant. Imported by the ingestion script, the API
 * routes and the widget, so it must stay free of any server-only imports.
 */

/** One retrievable unit of site content. */
export type KnowledgeChunk = {
  /** Stable across rebuilds so logs and diffs stay readable. */
  id: string;
  /** Which part of the site this came from, e.g. "FAQ" or "Case study". */
  section: string;
  /** Human title — also the strongest keyword signal in demo/topk matching. */
  title: string;
  /** The content itself, already flattened to plain prose. */
  text: string;
  /** Path on the site a visitor can be pointed to, if there is one. */
  url?: string;
  /**
   * Other words people use for this topic. Someone asking "what have you built
   * before" is asking about the case studies, but shares no word with their
   * titles — so each entry carries the vocabulary a visitor is likely to use,
   * and retrieval treats those words as strongly as the title.
   */
  keywords?: string[];
};

export type KnowledgeBase = {
  /** Bumped if the shape changes, so a stale file fails loudly. */
  version: 1;
  /** ISO timestamp of the last `npm run kb:build`. */
  builtAt: string;
  business: { name: string; domain: string };
  /** Rough token count of the whole base — drives the full/topk decision. */
  estimatedTokens: number;
  chunks: KnowledgeChunk[];
};

/* ── Wire format between the widget and the API ───────────────────────────── */

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

/**
 * The stream is newline-delimited JSON, one event per line. This is simpler to
 * produce and parse than SSE and needs no library on either side; the only
 * rule is that no event may contain a raw newline, which JSON guarantees.
 */
export type StreamEvent =
  | { type: "delta"; text: string }
  | { type: "done"; usage: UsageSummary; fallback: boolean }
  | { type: "error"; message: string; retryAfter?: number };

export type UsageSummary = {
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  /** Estimated cost of this single request, in USD. */
  costUsd: number;
};

export type LeadSubmission = {
  name: string;
  email: string;
  message?: string;
  /** Last few turns, so whoever picks it up has the context. */
  transcript: ChatMessage[];
  page?: string;
};
