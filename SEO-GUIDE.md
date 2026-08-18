# The full SEO picture

Everything below is checked against the live build, not assumed. Two real bugs
got fixed while putting this together — see the top of Part 1.

**The honest framing, up front:** on-page work (Part 1) makes you *eligible*
to rank. Off-page work (Part 2) is what actually makes you *rank*. Nobody can
promise a date for competitive terms like "AI automation agency" — that's
months of consistent output, not a setting you flip. Branded and long-tail
terms can land in weeks. Plan around that difference.

---

## Part 1 — On-page (done, verified)

### Fixed just now

| Bug | Was | Now |
|---|---|---|
| Homepage meta description | 230 chars — Google truncates past ~160, usually mid-word | 141 chars |
| Case study descriptions | Hard-sliced at 300 chars, no word-boundary awareness | Word-boundary truncated at 155 chars for search, 300 for social cards |

### What every page carries

Six indexable URLs, each with its own title, description, and canonical —
verified, not just written:

| Page | Title | Description length |
|---|---|---|
| `/` | LexoraTech — AI Automation & Internal Tools, Shipped in 5 Days | 141 |
| `/privacy` | Privacy Policy — LexoraTech | 125 |
| `/work/employee-assistance-program-platform` | Sri Lanka's first Employee Assistance Program platform | 151 |
| `/work/browser-based-creator-tool-suite` | A 33-tool creator suite that runs entirely in the browser | 156 |
| `/work/vedic-astrology-platform-sinhala` | Vedic astrology tools built on real ephemeris data, in Sinhala | 158 |
| `/work/national-child-safeguarding-platform` | The digital home of a national child-safeguarding programme | 147 |

Every one of those is under Google's ~160-character display cutoff. Each also
gets its own `og:image`, `og:description`, Twitter card, and canonical tag —
confirmed by pulling the rendered HTML, not the source.

### Structured data (JSON-LD)

One connected graph, not scattered blocks — 16 distinct schema types
cross-referenced by `@id` so crawlers resolve them as one entity:

`Organization` + `ProfessionalService` · `Person` (×2, your founders) ·
`ContactPoint` · `Offer` · `OfferCatalog` · `Service` · `SoftwareApplication`
(×2, Nimithi + Lexora Workspace) · `WebSite` · `WebPage` · `FAQPage` ·
`Question`/`Answer` · `CreativeWork` (×4, one per case study) ·
`BreadcrumbList` (×4) · `PostalAddress` · `ImageObject`.

Why this matters more than it looks: Google's rich-result eligibility (star
ratings, FAQ dropdowns in search, sitelinks) is graded on this, not on the
visible page. Validate it whenever you edit `site-config.ts`:

```
https://search.google.com/test/rich-results?url=https://lexoratech.com
```

### International targeting

```html
<link rel="alternate" hreflang="x-default" href="https://lexoratech.com"/>
<link rel="alternate" hreflang="en" href="https://lexoratech.com"/>
```

Plus `alternateLocale` in OpenGraph for `en_GB`, `en_AU`, `en_CA`, `en_IE`,
`en_NZ`. This tells Google the same English page is intentionally meant for
all of those markets, not just the US.

### Legacy migration

The old PHP site had 43 indexed URLs. All of them 301/308-redirect to the
closest equivalent on the new site — the two old case study pages redirect to
their matching new page specifically, not a generic homepage bounce, which is
what actually carries ranking signal across instead of losing it.

### Sitemap and robots

```
https://lexoratech.com/sitemap.xml   → all 6 URLs, correct priorities
https://lexoratech.com/robots.txt    → Allow: / , points at the sitemap
```

### What's deliberately NOT here yet

- **No `Review`/`AggregateRating` schema.** Tempting for star ratings in
  search results, but fabricated reviews are a Google manual-action penalty,
  not a grey area. Add it the day you have genuine written testimonials —
  see Part 2.
- **No analytics.** Covered below — this is the one open decision.

---

## Part 2 — Off-page (the part that actually moves rankings)

Ranked by return on the hour you spend on it.

### 1. Google Search Console — do this first, today

You're already verified. Two things left:

- **Sitemaps** → submit `https://lexoratech.com/sitemap.xml`
- **URL Inspection** → *Request indexing* for all 6 URLs individually, not
  just the homepage. The case study pages are the entire point of having six
  pages instead of one — each needs its own crawl request.

Check back in a week. Old PHP URLs showing "Page with redirect" in the report
is correct and expected — that's your 301s being read.

### 2. Bing Webmaster Tools — 5 minutes, nobody in your market bothers

Import directly from Search Console. Bing's index feeds ChatGPT's web search
and Copilot — a real, growing referral channel that costs you nothing extra
since you already did the Search Console work.

### 3. Google Business Profile — the single strongest lever available

Free. For queries like "software development company Colombo" or "AI
automation agency Sri Lanka," this outranks on-page SEO entirely — Google
weights the Business Profile heavier than the website for anything with
local intent, even when your actual clients are abroad.

Set it up as a **service-area business** (you don't need a public storefront).
Category: *Software Company*. Your NAP (name, address, phone) must match the
site exactly, or Google treats it as a trust signal failure.

### 4. Link your three domains together — closes a loop the code opened

The JSON-LD already declares `lexoratech.com` as the owner of Nimithi and
Lexora Workspace (`owns` + `sameAs`, both directions). That's a one-way
technical claim. Add a real link from **each product's own footer** back to
`lexoratech.com`. Authority only flows through actual `<a>` tags — the
schema is a hint, the link is the proof.

### 5. Dev-studio directories — Clutch, GoodFirms, DesignRush

Tedious, but these rank for exactly the head terms ("top software development
companies") you'll never compete for directly, and foreign buyers use them as
a trust filter before they'll book a call with an unfamiliar name. One
profile, reused across all three — 30-60 min each.

### 6. LinkedIn — currently doing nothing for you

The company page exists but isn't linked from anywhere new. Post each case
study as a short article with a link back to its `/work/` page. This is also
where a Colombo-based studio's foreign-market credibility actually gets built
— people check the page before they book.

### 7. Content — the only durable answer to the competitive terms

Directories and profiles get you found; they don't make you *rank* for
"AI automation agency" against studios with years of content. The only real
lever there is writing about what you actually built:

- How the EAP platform's anonymous booking works, without exposing identity
  to HR
- Why Nimithi computes from Swiss Ephemeris instead of an API
- What "five working days" actually looks like, day by day, on a real project

One post per project, technical enough that a competitor couldn't write it
without having done the work. This is the thing that compounds — directories
don't.

### 8. Real testimonials → unlocks `Review` schema

Once Chathuranga (or another client) gives you a written quote, it goes on
the site *and* the JSON-LD gets `AggregateRating`. That's the star rating in
search results — a genuine click-through-rate lift, and off-limits until the
review is real.

---

## The one open decision: analytics

**Right now the site has none** — the privacy policy explicitly says so, and
that's currently true. But you can't tell whether any of the above is working
without it. Search Console tells you what people *search* to find you; it
tells you nothing about what they *do* once they land.

Given you're on Vercel already:

**Vercel Web Analytics** — no cookie banner needed (no personal data
collected), one line to add, free tier covers a site this size. The
straightforward fit if you want zero friction.

**Plausible or Fathom** — same privacy profile, a few dollars a month,
slightly more detail (referrer breakdown, goal tracking on the booking click).

Whichever you pick, **the privacy policy has to be updated the same day** —
it currently promises no analytics, and that promise has to stay true or
become accurately false. Tell me which one and I'll wire it in and update the
policy together, so they're never out of sync.

---

## Timeline — set expectations honestly

| Term type | Example | Realistic timeline |
|---|---|---|
| Branded | "LexoraTech" | Days — often already ranks once indexed |
| Long-tail, specific | "Employee Assistance Program platform developer" | Weeks, once Parts 1 + a bit of Part 2 land |
| Competitive, generic | "AI automation agency" | 6+ months of sustained content and links, or realistically: not without a much larger effort |

Prioritize the middle row. It's winnable in a quarter, it's what your case
studies were written to target, and it's where actual buyers with actual
budget are searching.
