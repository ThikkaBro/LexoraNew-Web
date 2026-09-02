/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  KNOWLEDGE BASE INGESTION
 *  Run: npm run kb:build
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Collects this site's own text into `data/knowledge-base.json`, which is
 *  committed to the repository and read by the API route at request time.
 *
 *  Two sources, in order:
 *
 *    1. `app/site-config.ts` — the single source of truth for site copy. We
 *       import it as a typed module rather than scraping the rendered HTML,
 *       so ingestion cannot silently drift from what the page shows and does
 *       not need a running server.
 *
 *    2. `content/kb/*.md` — free-form Markdown for anything the site config
 *       does not model: policies, delivery details, answers to questions that
 *       come up on calls. Drop a file in, re-run, done.
 *
 *  Re-runnable and deterministic: same input, byte-identical output. That
 *  matters because a non-deterministic build would produce a pointless diff on
 *  every run, and — since the knowledge base is the cached prompt prefix — it
 *  would also throw away the prompt cache for no reason.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { siteConfig } from "../app/site-config.ts";
import { assistantConfig } from "../assistant.config.ts";
import type { KnowledgeBase, KnowledgeChunk } from "../lib/assistant/types.ts";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/** Collapse whitespace so chunk text is one clean paragraph per line. */
const clean = (s: string) => s.replace(/\s+/g, " ").trim();

const chunks: KnowledgeChunk[] = [];

function add(chunk: KnowledgeChunk) {
  if (!chunk.text.trim()) return;
  chunks.push({ ...chunk, text: clean(chunk.text) });
}

/**
 * Rough token estimate. We deliberately do not call the token-counting API
 * here: ingestion must work offline and with no key, and the only decision
 * this number drives is a threshold with a lot of headroom either side.
 * ~3.7 characters per token is close for English prose and errs high.
 */
const estimateTokens = (text: string) => Math.ceil(text.length / 3.7);

/* ── 1. Site config ───────────────────────────────────────────────────────── */

add({
  id: "overview",
  section: "Overview",
  title: `What ${siteConfig.company} is`,
  url: "/",
  keywords: [
    "based", "location", "where", "country", "office", "remote", "timezone",
    "hours", "contact", "email", "reach", "founded", "company", "studio",
  ],
  text: `${siteConfig.company} — ${siteConfig.tagline}. ${siteConfig.seo.description}
    Founded ${siteConfig.foundingDate}. Based in ${siteConfig.location}. ${siteConfig.locationLine}.
    Contact email ${siteConfig.email}. Booking link ${siteConfig.bookingUrl}.
    ${siteConfig.about.body}`,
});

add({
  id: "positioning",
  section: "Overview",
  title: "Headline positioning",
  url: "/",
  text: `${siteConfig.hero.headline} ${siteConfig.hero.subhead}
    Trust signals shown on the site: ${siteConfig.hero.trust.join("; ")}.`,
});

add({
  id: "problem",
  section: "The problem we solve",
  title: siteConfig.problem.heading,
  url: "/",
  text: `${siteConfig.problem.body} Specific examples: ${siteConfig.problem.items
    .map((i) => `${i.title} — ${i.body}`)
    .join(" ")}`,
});

add({
  id: "offer",
  section: "Pricing and offer",
  title: `${siteConfig.offer.title} — ${siteConfig.offer.price} ${siteConfig.offer.priceNote}`,
  url: "/",
  keywords: [
    "price", "pricing", "cost", "budget", "quote", "rate", "fee", "how much",
    "package", "offer", "guarantee", "refund", "risk", "warranty", "included",
  ],
  text: `${siteConfig.offer.description}
    Price: ${siteConfig.offer.price} (${siteConfig.offer.priceNote}).
    What is included: ${siteConfig.offer.bullets.join("; ")}.
    Guarantee: ${siteConfig.offer.guarantee}`,
});

add({
  id: "calculator",
  section: "Pricing and offer",
  title: "The cost-of-manual-work calculator on the site",
  url: "/",
  text: `${siteConfig.calculator.heading} ${siteConfig.calculator.standfirst}
    It is an interactive estimate the visitor runs in their own browser; nothing is sent anywhere.
    Its own stated caveat: ${siteConfig.calculator.disclaimer}`,
});

siteConfig.whyUs.rows.forEach((row, i) => {
  add({
    id: `why-us-${i + 1}`,
    section: "Why hire us",
    title: row.label,
    url: "/#why-us",
    // Written as prose rather than as table cells, so a chunk read back
    // verbatim still forms sentences.
    text: `${row.label}. At ${siteConfig.whyUs.columns.ours}: ${row.ours}
      By comparison, with ${siteConfig.whyUs.columns.theirs.toLowerCase()} — an agency or a marketplace contractor — ${row.theirs}`,
  });
});

add({
  id: "why-us-summary",
  section: "Why hire us",
  title: siteConfig.whyUs.heading,
  url: "/#why-us",
  text: `${siteConfig.whyUs.standfirst} ${siteConfig.whyUs.footnote}`,
});

siteConfig.caseStudies.forEach((study) => {
  add({
    id: `case-${study.slug}`,
    section: "Case study",
    title: study.title,
    url: `/work/${study.slug}`,
    // The vocabulary of "show me your work" — none of which appears in a
    // case study's own title.
    keywords: [
      "work", "built", "build", "made", "portfolio", "projects", "examples",
      "clients", "case", "study", "previous", "before", "experience",
      "references", "done",
      ...study.stack,
    ],
    text: `Client: ${study.client}.
      The problem: ${study.problem}
      What we built: ${study.built}
      ${study.resultLabel}: ${study.result}.
      Technologies used: ${study.stack.join(", ")}.
      ${study.href ? `Live at ${study.href}.` : "No live link is available for this project."}`,
  });
});

add({
  id: "services",
  section: "Services",
  title: "What we build",
  url: "/#services",
  keywords: [
    "services", "offer", "capabilities", "skills", "tech", "stack", "do",
    "mobile", "app", "web", "ecommerce", "cms", "automation", "agents",
  ],
  text: siteConfig.services.map((s) => `${s.title}: ${s.body}`).join(" "),
});

add({
  id: "process",
  section: "Process",
  title: "How a project runs, step by step",
  url: "/#process",
  keywords: ["process", "steps", "how", "work", "timeline", "onboarding", "kickoff", "start", "handover", "delivery"],
  text: siteConfig.process.map((p) => `Step ${p.step} — ${p.title}: ${p.body}`).join(" "),
});

add({
  id: "about",
  section: "About the studio",
  title: siteConfig.about.heading,
  url: "/#about",
  keywords: ["team", "who", "people", "founders", "about", "company", "staff", "size", "location", "where"],
  text: `${siteConfig.about.body}
    The team: ${siteConfig.about.team.map((p) => `${p.name}, ${p.role}. ${p.bio}`).join(" ")}`,
});

add({
  id: "products",
  section: "Our own products",
  title: "Products we build and run ourselves",
  url: "/",
  text: siteConfig.products
    .map((p) => `${p.name} (${p.url}): ${p.description}`)
    .join(" "),
});

siteConfig.faq.forEach((item, i) => {
  add({
    id: `faq-${i + 1}`,
    section: "FAQ",
    title: item.q,
    url: "/#faq",
    text: `Question: ${item.q} Answer: ${item.a}`,
  });
});

/* ── 2. Markdown in content/kb ────────────────────────────────────────────── */

const kbDir = join(repoRoot, "content", "kb");
if (existsSync(kbDir)) {
  const files = readdirSync(kbDir)
    .filter((f) => f.endsWith(".md"))
    // Sorted so the output is deterministic regardless of filesystem order.
    .sort();

  for (const file of files) {
    const raw = readFileSync(join(kbDir, file), "utf8");
    const slug = basename(file, ".md");

    // Split on level-2 headings so each section becomes its own chunk; the
    // text before the first `##` is kept as the document's intro chunk.
    const titleMatch = raw.match(/^#\s+(.+)$/m);
    const docTitle = titleMatch ? titleMatch[1].trim() : slug;
    const body = raw.replace(/^#\s+.+$/m, "");
    const parts = body.split(/^##\s+/m);

    parts.forEach((part, i) => {
      const trimmed = part.trim();
      if (!trimmed) return;

      const lines = trimmed.split("\n");
      const isIntro = i === 0;
      const heading = isIntro ? docTitle : lines[0]!.trim();

      // A `Keywords: a, b, c` line declares the other words visitors use for
      // this section. Pulled out while the text is still line-structured —
      // the body is flattened to a single line immediately afterwards, which
      // is why this cannot wait until then.
      const bodyLines = isIntro ? lines : lines.slice(1);
      const keywordIndex = bodyLines.findIndex((l) => /^\s*Keywords:/i.test(l));
      const keywords =
        keywordIndex >= 0
          ? bodyLines[keywordIndex]!
              .replace(/^\s*Keywords:/i, "")
              .split(",")
              .map((k) => k.trim())
              .filter(Boolean)
          : undefined;

      const text = bodyLines
        .filter((_, idx) => idx !== keywordIndex)
        .join(" ")
        .trim();

      add({
        id: `md-${slug}-${i}`,
        section: "Site content",
        title: heading,
        text: text || heading,
        ...(keywords ? { keywords } : {}),
      });
    });
  }
}

/* ── Write ────────────────────────────────────────────────────────────────── */

const estimatedTokens = chunks.reduce(
  (sum, c) => sum + estimateTokens(`${c.section} ${c.title} ${c.text}`),
  0,
);

const kb: KnowledgeBase = {
  version: 1,
  builtAt: new Date().toISOString(),
  business: { name: siteConfig.company, domain: siteConfig.domain },
  estimatedTokens,
  chunks,
};

const outPath = join(repoRoot, assistantConfig.knowledgeBase.path);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(kb, null, 2)}\n`, "utf8");

/* ── Report ───────────────────────────────────────────────────────────────── */

const bySection = chunks.reduce<Record<string, number>>((acc, c) => {
  acc[c.section] = (acc[c.section] ?? 0) + 1;
  return acc;
}, {});

console.log(`\n  Knowledge base written to ${assistantConfig.knowledgeBase.path}`);
console.log(`  ${chunks.length} chunks · ~${estimatedTokens.toLocaleString()} tokens\n`);
for (const [section, count] of Object.entries(bySection)) {
  console.log(`    ${String(count).padStart(3)}  ${section}`);
}

const THRESHOLD = 30_000;
console.log("");
if (estimatedTokens > THRESHOLD) {
  console.log(
    `  ⚠  Over ${THRESHOLD.toLocaleString()} tokens. Sending all of this on every\n` +
      `     request is now the expensive option. Set knowledgeBase.mode to "topk"\n` +
      `     in assistant.config.ts so only the relevant chunks are sent.\n`,
  );
} else {
  const pct = Math.round((estimatedTokens / THRESHOLD) * 100);
  console.log(
    `  ✓  ${pct}% of the ${THRESHOLD.toLocaleString()}-token threshold. Keep mode: "full" —\n` +
      `     the whole base goes in the cached system prompt, so nothing can be\n` +
      `     missed by retrieval and cached reads cost a tenth of normal input.\n`,
  );
}
