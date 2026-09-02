import { assistantConfig } from "@/assistant.config";
import knowledgeBaseJson from "@/data/knowledge-base.json";
import type { KnowledgeBase, KnowledgeChunk } from "./types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LOADING THE KNOWLEDGE BASE
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  THIS IS A STATIC IMPORT, AND IT HAS TO BE. Do not "improve" it into a
 *  `readFileSync(process.cwd() + config.path)` — that is what it used to be,
 *  and it fails in production while working perfectly on a local machine,
 *  which is the worst way for a bug to behave.
 *
 *  Why it fails: a serverless deployment does not ship the repository. Next.js
 *  traces which files each function actually needs and copies only those. That
 *  trace is static — it follows `import` statements. A path assembled at
 *  runtime from a config value is invisible to it, so `data/` never gets
 *  copied, the read throws, and every request returns "The assistant is not
 *  configured yet."
 *
 *  An `import` is visible to the tracer, so the knowledge base is compiled into
 *  the function bundle. It also means a missing or malformed file is a BUILD
 *  error rather than a 503 discovered by a visitor, and it removes the disk
 *  read from the request path entirely.
 *
 *  `assistant.config.ts` still owns the path — the ingestion script writes
 *  there. If a client needs a different location, change it in both places;
 *  the import cannot read the config value, by design.
 *
 *  Server-only. Nothing in `components/` imports this, so the knowledge base is
 *  never downloaded by a visitor.
 */

/**
 * The JSON's inferred type is structural and not quite `KnowledgeBase` —
 * `version` widens to `number`, and only some chunks carry `keywords`, so the
 * array infers as a union. The shape is guaranteed by the ingestion script and
 * checked at runtime immediately below.
 */
const parsed = knowledgeBaseJson as unknown as KnowledgeBase;

let cached: KnowledgeBase | null = null;

export function loadKnowledgeBase(): KnowledgeBase {
  if (cached) return cached;

  // A version mismatch means the committed file predates a shape change.
  // Failing loudly beats serving answers from a half-understood file.
  if (parsed.version !== 1) {
    throw new Error(
      `Knowledge base is version ${parsed.version}, this build expects 1. ` +
        `Re-run \`npm run kb:build\` (writes ${assistantConfig.knowledgeBase.path}).`,
    );
  }

  if (!Array.isArray(parsed.chunks) || parsed.chunks.length === 0) {
    throw new Error(
      `Knowledge base has no chunks. Run \`npm run kb:build\` and commit the result.`,
    );
  }

  cached = parsed;
  return parsed;
}

/** Render chunks as the plain-text block that goes into the system prompt. */
export function renderChunks(chunks: KnowledgeChunk[]): string {
  return chunks
    .map((c) => {
      const url = c.url ? `\nPage: ${c.url}` : "";
      return `<document id="${c.id}" section="${c.section}">\nTitle: ${c.title}${url}\n${c.text}\n</document>`;
    })
    .join("\n\n");
}

/* ── Lexical retrieval ────────────────────────────────────────────────────── */

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "is", "are", "was", "were", "be", "been",
  "do", "does", "did", "have", "has", "had", "you", "your", "we", "our", "i",
  "me", "my", "it", "its", "to", "of", "in", "on", "for", "with", "at", "by",
  "from", "as", "that", "this", "these", "those", "can", "could", "would",
  "should", "will", "what", "how", "who", "when", "where", "why", "if", "so",
  "about", "there", "their", "they", "not", "no", "yes", "please", "tell",
]);

/**
 * Hyphens are split, not kept: "child-safeguarding" has to match a question
 * asking about "child safeguarding", and treating the compound as one opaque
 * token means it matches neither half.
 */
const tokenize = (text: string): string[] =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

/**
 * Score chunks against a query by term overlap, weighting the title far more
 * heavily than the body — on a corpus of this size a title match ("What does a
 * typical project cost?") is a much stronger signal than a body match, where
 * common words like "project" appear everywhere.
 *
 * This is not a substitute for embeddings on a large corpus. It exists for two
 * jobs where it is genuinely the right tool: the optional `topk` mode, and
 * demo mode, which has to answer with no model at all.
 */
/**
 * ── Inverse document frequency ────────────────────────────────────────────
 *
 * Not every matched word is worth the same. On this site "work" and "project"
 * appear in most entries, so matching one tells you almost nothing;
 * "safeguarding" or "guarantee" appears in one, so matching it tells you
 * almost everything.
 *
 * Without this, "what if I'm not happy with the work?" matches the FAQ titled
 * "You're not local — how does that work?" on the strength of the word "work"
 * and answers about timezones. Weighting each term by how rare it is fixes
 * that whole class of near-miss, and it is the standard way to do it.
 */
let documentFrequency: Map<string, number> | null = null;

function idf(term: string): number {
  const kb = loadKnowledgeBase();

  if (!documentFrequency) {
    documentFrequency = new Map();
    for (const chunk of kb.chunks) {
      const seen = new Set(
        tokenize(`${chunk.title} ${chunk.section} ${(chunk.keywords ?? []).join(" ")} ${chunk.text}`),
      );
      for (const word of Array.from(seen)) {
        documentFrequency.set(word, (documentFrequency.get(word) ?? 0) + 1);
      }
    }
  }

  const df = documentFrequency.get(term) ?? 0;
  // Floored rather than allowed to reach zero: a common word should count for
  // little, not for nothing.
  return Math.max(0.25, Math.log2(kb.chunks.length / (1 + df)));
}

/** A word distinctive enough that matching it in a title means something. */
const DISTINCTIVE = 1;

/**
 * A small thumb on the scale for FAQ entries. They are already written as
 * answers to questions a visitor actually asks, so when an FAQ entry ties with
 * a chunk derived from a comparison table or a heading, the FAQ is the one
 * that will read like an answer. Kept deliberately small — it should break a
 * tie, never overturn a better match.
 */
const SECTION_BOOST: Record<string, number> = { FAQ: 0.75 };

export function scoreChunks(
  query: string,
  chunks: KnowledgeChunk[],
): Array<{ chunk: KnowledgeChunk; score: number }> {
  const terms = tokenize(query);
  if (terms.length === 0) return [];

  return chunks
    .map((chunk) => {
      const title = tokenize(
        `${chunk.title} ${chunk.section} ${(chunk.keywords ?? []).join(" ")}`,
      );
      const body = tokenize(chunk.text);
      let score = 0;

      for (const term of terms) {
        const weight = idf(term);

        if (title.some((t) => t === term)) score += 4 * weight;
        else if (title.some((t) => t.startsWith(term) || term.startsWith(t)))
          score += 2 * weight;

        const hits = body.filter((t) => t === term).length;
        // Diminishing returns: a chunk that says "price" nine times is not
        // nine times more relevant than one that says it once.
        if (hits > 0) score += (1 + Math.log2(hits)) * weight;
      }

      if (score > 0) score += SECTION_BOOST[chunk.section] ?? 0;

      return { chunk, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/**
 * How much of the question the knowledge base has any vocabulary for.
 *
 * The point is to notice the word that appears nowhere on the site — the
 * "Salesforce" in "do you do Salesforce integrations". Term overlap alone will
 * happily match such a question to a chunk on the strength of its other words
 * and answer with confidence about something else entirely. Knowing which
 * terms are unknown is what lets a retrieval-only answer refuse honestly.
 */
export function queryCoverage(query: string): {
  terms: string[];
  unknown: string[];
  unknownRatio: number;
} {
  const kb = loadKnowledgeBase();
  const terms = Array.from(new Set(tokenize(query)));
  if (terms.length === 0) return { terms, unknown: [], unknownRatio: 0 };

  // Built once per process, then reused — the knowledge base does not change
  // while the server is running.
  if (!vocabulary) {
    vocabulary = new Set<string>();
    for (const chunk of kb.chunks) {
      for (const word of tokenize(`${chunk.title} ${chunk.section} ${chunk.text}`)) {
        vocabulary.add(word);
      }
    }
  }

  // Prefix-tolerant, because English morphology otherwise makes a known word
  // look unknown: a visitor asking whether you "store" their data would be
  // refused because the page says "stored". A four-character prefix is enough
  // to bridge that without letting a genuinely absent word — "Salesforce" —
  // pass as known.
  const known = (term: string) => {
    if (vocabulary!.has(term)) return true;
    if (term.length < 4) return false;
    // True prefixes only, in either direction. "store" matches "stored"
    // because it is a prefix of it; "happy" does NOT match "happens", because
    // it is not — an earlier, looser stem comparison accepted that pair and
    // made an unanswerable question look answerable.
    for (const word of Array.from(vocabulary!)) {
      if (word.length >= 4 && (word.startsWith(term) || term.startsWith(word))) return true;
    }
    return false;
  };

  const unknown = terms.filter((t) => !known(t));
  return { terms, unknown, unknownRatio: unknown.length / terms.length };
}

let vocabulary: Set<string> | null = null;

/** True when at least one of the query's terms appears in the chunk's title. */
/**
 * Does the question hit this entry's title or keywords on a word that actually
 * distinguishes it? A hit on "work" does not count; a hit on "safeguarding"
 * does. This is the gate that decides whether a retrieved answer is offered at
 * all, so it has to mean something.
 */
export function hasTitleHit(query: string, chunk: KnowledgeChunk): boolean {
  const title = new Set(
    tokenize(`${chunk.title} ${chunk.section} ${(chunk.keywords ?? []).join(" ")}`),
  );
  return tokenize(query).some((t) => title.has(t) && idf(t) >= DISTINCTIVE);
}

/** The chunks to put in front of the model for this question. */
export function selectChunks(query: string): KnowledgeChunk[] {
  const kb = loadKnowledgeBase();
  if (assistantConfig.knowledgeBase.mode === "full") return kb.chunks;

  const ranked = scoreChunks(query, kb.chunks).slice(
    0,
    assistantConfig.knowledgeBase.topK,
  );
  // Never send nothing: an empty context makes the model far likelier to
  // improvise than an irrelevant one does.
  return ranked.length > 0 ? ranked.map((r) => r.chunk) : kb.chunks.slice(0, 3);
}
