/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  AI ASSISTANT — THE ONLY FILE YOU EDIT PER CLIENT
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Deploying this widget for a new client is three steps:
 *
 *    1. Edit this file.
 *    2. Run `npm run kb:build` to regenerate the knowledge base.
 *    3. Set the environment variables listed in ASSISTANT-README.md.
 *
 *  Nothing in this file is secret. It is imported by browser code as well as
 *  server code, so it must never contain an API key, a webhook URL, or any
 *  other credential. Those live in environment variables — see `lib/assistant/
 *  providers/index.ts` for where they are read (server-side only).
 */

export const assistantConfig = {
  // ── Who the assistant works for ───────────────────────────────────────────
  business: {
    /** Used in the system prompt and shown in the widget header. */
    name: "LexoraTech",
    /** One line describing what the business does. Anchors the assistant. */
    shortDescription:
      "a two-person software studio building AI automation and internal tools",
    /** Where the assistant sends people it cannot help. Both are shown. */
    contact: {
      email: "hello@lexoratech.com",
      /** Booking link, or "" to omit the button. */
      bookingUrl: "https://cal.com/lexora-tech/30min",
      /** Label for the booking button in the handoff card. */
      bookingLabel: "Book a 30-min call",
    },
  },

  // ── How it speaks ─────────────────────────────────────────────────────────
  persona: {
    /** The assistant's display name in the transcript and header. */
    name: "Lexi",
    /**
     * Tone instruction injected into the system prompt. Keep it to one or two
     * sentences — long tone descriptions fight with the accuracy rules and the
     * accuracy rules must win.
     */
    tone:
      "Warm, plain-spoken and direct. British-neutral English. No exclamation marks, no sales language, no emoji.",
    /** First message in the panel. Not sent to the model. */
    greeting:
      "Hi — I can answer questions about LexoraTech's work, pricing and process, using only what is published on this site. What would you like to know?",
    /** Shown as tappable chips under the greeting. Keep to 3–4, keep them short. */
    suggestions: [
      "What does a project cost?",
      "How fast can you start?",
      "Who owns the code?",
      "What have you built before?",
    ],
  },

  // ── Knowledge base ────────────────────────────────────────────────────────
  knowledgeBase: {
    /**
     * Where `npm run kb:build` WRITES the knowledge base, relative to the repo
     * root. The runtime does not read this value: it imports the JSON
     * statically, because a path assembled at runtime is invisible to the
     * build's file tracer and the file then never reaches a serverless
     * deployment. If you move it, change the import in
     * `lib/assistant/knowledge.ts` too — that file explains why.
     */
    path: "data/knowledge-base.json",
    /**
     * "full"  — put the entire knowledge base in the system prompt (cached).
     * "topk"  — retrieve the most relevant chunks per question.
     *
     * Use "full" while the knowledge base is under ~30k tokens: it is more
     * accurate (nothing can be missed by a bad retrieval) and, with prompt
     * caching, cheaper than the embedding round-trip retrieval would need.
     * `npm run kb:build` prints the token count and warns when you cross over.
     */
    mode: "full" as "full" | "topk",
    /** Only used when mode is "topk". Number of chunks to supply per question. */
    topK: 6,
  },

  // ── Model ─────────────────────────────────────────────────────────────────
  model: {
    /**
     * Which provider to call. "auto" picks the first one whose API key is
     * present, in this order: anthropic → openaiCompatible → demo.
     * With no keys set at all you land in "demo", which answers from the
     * knowledge base locally and costs nothing.
     */
    provider: "auto" as "auto" | "anthropic" | "openai-compatible" | "demo",
    /** Anthropic model id. $3/1M in, $15/1M out, $0.30/1M cached reads. */
    anthropicModel: "claude-sonnet-4-6",
    /**
     * Model id for the OpenAI-compatible provider (Groq, Google AI Studio,
     * Cerebras, OpenRouter…). Overridable with ASSISTANT_OPENAI_MODEL so one
     * codebase can serve clients on different free tiers.
     */
    openaiModel: "llama-3.3-70b-versatile",
    /** Hard ceiling on the reply. 1000 is ~750 words — far more than needed. */
    maxTokens: 1000,
    /** Low temperature: this assistant recites, it does not compose. */
    temperature: 0.2,
  },

  // ── Cost and abuse control ────────────────────────────────────────────────
  limits: {
    /** Longest single message we will accept, in characters. */
    maxMessageChars: 1000,
    /**
     * How many past messages (user + assistant) to send with each request.
     * Older turns are dropped from the front. 12 ≈ 6 exchanges, which is more
     * than enough context for a site FAQ and caps the worst-case input cost.
     */
    maxHistoryMessages: 12,
    /** Requests allowed per IP inside a rolling window. */
    rateLimit: {
      perWindow: 12,
      windowSeconds: 600, // 10 minutes
      perDay: 60,
    },
  },

  // ── Lead capture ──────────────────────────────────────────────────────────
  leadCapture: {
    enabled: true,
    /** Offer the form once the assistant has replied this many times. */
    afterAssistantMessages: 3,
    /** Also offer it immediately whenever the assistant cannot answer. */
    offerOnFallback: true,
    heading: "Want a human to pick this up?",
    body: "Leave your name and email and one of the founders will reply — usually within a working day.",
    submitLabel: "Send",
    successMessage:
      "Thanks — that has reached us. You will hear back from a founder, not a bot.",
    /** Optional free-text field alongside name and email. */
    includeMessageField: true,
  },

  // ── Appearance ────────────────────────────────────────────────────────────
  // Every value here is an existing Tailwind token from tailwind.config.ts.
  // Restyling for a client means swapping these for that client's tokens —
  // no component edits.
  ui: {
    launcherLabel: "Ask a question",
    panelTitle: "Ask LexoraTech",
    /** "left" or "right" edge of the viewport. */
    side: "right" as "left" | "right",
    /**
     * Load the panel's JavaScript when the browser goes idle, rather than
     * waiting for the first click. Costs ~6KB of idle-time bandwidth and makes
     * the first open instant. It never blocks rendering either way.
     */
    prefetchOnIdle: true,
    theme: {
      surface: "bg-surface",
      raised: "bg-raised",
      border: "border-line",
      borderStrong: "border-line-strong",
      text: "text-paper",
      textMuted: "text-muted",
      textFaint: "text-faint",
      accent: "text-accent",
      bubbleUser: "bg-paper text-ink",
      bubbleAssistant: "bg-raised text-paper",
    },
  },

  /** Shown in the panel footer. Keep it honest — it is a trust signal. */
  disclaimer:
    "Answers come only from this site's published content and can be wrong. Nothing here is a quote or a commitment.",
} as const;

export type AssistantConfig = typeof assistantConfig;
