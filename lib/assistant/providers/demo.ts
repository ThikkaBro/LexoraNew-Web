import { assistantConfig } from "@/assistant.config";
import { hasTitleHit, loadKnowledgeBase, queryCoverage, scoreChunks } from "../knowledge";
import type { Provider, ProviderInput } from "./types";
import type { UsageSummary } from "../types";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DEMO MODE — WORKS WITH NO API KEY, COSTS NOTHING
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  With no key configured the endpoint still answers, using the same knowledge
 *  base, the same streaming protocol and the same refusal behaviour — but the
 *  answer is retrieved and quoted rather than generated. It picks the best
 *  matching chunk, pulls the sentences that actually address the question, and
 *  streams them back.
 *
 *  What it can do: answer anything the site already states, in the site's own
 *  words. What it cannot do: rephrase, combine two topics, or follow a
 *  conversational thread. Those need a model.
 *
 *  It is here for two reasons. It lets the widget be demonstrated to a client
 *  before anyone has paid for anything, and it is a safe degraded mode when a
 *  key expires or a provider is down — a visitor gets the site's real answer
 *  instead of an error.
 *
 *  It cannot be prompt-injected: nothing here interprets the visitor's text as
 *  an instruction, it is only ever used as a bag of search terms.
 */

/**
 * When we are allowed to claim a chunk answers the question.
 *
 * Term overlap on its own is far too eager. "Do you do Salesforce integrations
 * and how much for 40 hours?" scores respectably against the page about manual
 * work — "integrations", "hours" — and answering it would be exactly the
 * confident, wrong, invented answer this assistant exists not to give. So a
 * confident answer needs all three of these:
 *
 *   1. A real score, not a couple of incidental word matches.
 *   2. A hit in the chunk's TITLE, not just somewhere in its body. On a corpus
 *      this small, a body match on a common word means almost nothing.
 *   3. Few enough unknown words. A question containing a term that appears
 *      nowhere on the site is, most of the time, a question about something
 *      the site does not cover.
 *
 * Failing any of the three, it says it does not know — which is always a
 * correct answer, where a guess is only sometimes one.
 */
// One solid title or keyword hit. The floor is not what stops a bad answer —
// the title-hit and unknown-word rules are — so it is set low enough that a
// one-word question ("pricing?") still gets its answer.
const CONFIDENCE_FLOOR = 4;
const MAX_UNKNOWN_RATIO = 0.34;

const GREETING = /^\s*(hi|hey|hello|yo|good\s+(morning|afternoon|evening))\b/i;

/**
 * Questions asking the assistant to commit to something, rather than asking
 * what the site says.
 *
 * Retrieval has no notion of what a question is *asking for*, so "can you
 * guarantee delivery in three days for $200?" happily matches the page about
 * fixed prices and delivery dates — and quoting it back reads like agreement.
 * Nothing in that answer is false, and it is still the wrong answer, because
 * only a person can accept work or agree terms. Anything matching this goes
 * straight to a human.
 *
 * Deliberately narrow, and matched on the second person, so it catches "can
 * you guarantee…" without catching "is there a guarantee?" — which the site
 * genuinely answers.
 */
const ASKS_FOR_COMMITMENT = [
  /\b(can|could|will|would)\s+(you|u)\b[^?.!]{0,40}\b(guarantee|promise|commit|confirm|agree|assure)\b/i,
  /\b(guarantee|promise|commit\s+to|confirm)\s+(that\s+)?(you|it|this)\b/i,
  /\b(discount|cheaper|negotiate|knock\s+off|best\s+price|lower\s+(the\s+)?price|do\s+it\s+for\s+\$?\d)/i,
  /\b(can|could|will|would)\s+(you|u)\b[^?.!]{0,40}\b(by|before)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|tonight|next\s+week|the\s+\d)/i,
];

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"“])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25);
}

function answerFor(query: string): { text: string; fellBack: boolean } {
  const { business, persona } = assistantConfig;
  const human = business.contact.email;

  if (GREETING.test(query) && query.trim().length < 30) {
    return {
      text: `Hello. I can answer questions about ${business.name}'s work, pricing and process using what is published on this site. What would you like to know?`,
      fellBack: false,
    };
  }

  if (ASKS_FOR_COMMITMENT.some((pattern) => pattern.test(query))) {
    return {
      text: `That's a commitment only one of the founders can make, so I won't answer for them. Shall I pass it on? You can also email ${human} or use the booking link below.`,
      fellBack: true,
    };
  }

  const kb = loadKnowledgeBase();
  const ranked = scoreChunks(query, kb.chunks);
  const best = ranked[0];
  const coverage = queryCoverage(query);

  const confident =
    !!best &&
    best.score >= CONFIDENCE_FLOOR &&
    hasTitleHit(query, best.chunk) &&
    coverage.unknownRatio <= MAX_UNKNOWN_RATIO;

  if (!confident) {
    return {
      text: `I don't have anything on that in the site's content, so I'd rather not guess. Would you like me to pass it to one of the founders? You can also email ${human} directly.`,
      fellBack: true,
    };
  }

  // Rank the sentences inside the winning chunk the same way we ranked the
  // chunks, so the reply is the part that answers the question rather than
  // whatever happened to come first.
  const sentences = splitSentences(best.chunk.text);
  const picked =
    sentences.length > 1
      ? scoreChunks(query, sentences.map((s, i) => ({
          id: String(i),
          section: best.chunk.section,
          title: best.chunk.title,
          text: s,
        })))
          .slice(0, 2)
          .map((r) => r.chunk.text)
      : sentences;

  const body = (picked.length > 0 ? picked : [best.chunk.text])
    .join(" ")
    // FAQ chunks are stored as "Question: … Answer: …" because that framing
    // helps a model. Read aloud to a visitor it is nonsense, so drop it.
    .replace(/^Question:\s*.*?\s*Answer:\s*/i, "")
    .replace(/\bAnswer:\s*/gi, "")
    .trim();

  // Keep it to the two or three sentences the brief asks for.
  const trimmed = body.length > 420 ? `${body.slice(0, 400).replace(/\s+\S*$/, "")}…` : body;

  const pointer =
    best.chunk.url && best.chunk.url !== "/"
      ? ` There's more on ${best.chunk.url}.`
      : "";

  return { text: `${trimmed}${pointer}`, fellBack: false };
}

export function demoProvider(): Provider {
  return {
    id: "demo",
    model: "knowledge-base-retrieval",
    isDemo: true,

    async *stream(input: ProviderInput): AsyncGenerator<string, UsageSummary, void> {
      const last = [...input.messages].reverse().find((m) => m.role === "user");
      const query = (last?.content ?? "").replace(/<\/?user_message>/gi, "").trim();

      const { text } = answerFor(query);

      // Streamed in word groups so the widget's streaming path is exercised
      // identically to a real provider — if it renders well here it renders
      // well in production.
      const words = text.split(/(\s+)/);
      for (let i = 0; i < words.length; i += 3) {
        yield words.slice(i, i + 3).join("");
        await new Promise((resolve) => setTimeout(resolve, 18));
      }

      return {
        provider: "demo",
        model: "knowledge-base-retrieval",
        inputTokens: 0,
        outputTokens: 0,
        cacheReadTokens: 0,
        cacheWriteTokens: 0,
        costUsd: 0,
      } satisfies UsageSummary;
    },
  };
}
