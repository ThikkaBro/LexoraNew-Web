# LEXORATECH — conversion site

Single-page Next.js 14 (App Router) site in TypeScript + Tailwind. Deploys to
Vercel with zero configuration.

The page has one job: get a qualified buyer to click **Book a call** within 30
seconds of landing.

---

## Before you go live — 4 things

Everything below lives in [`app/site-config.ts`](app/site-config.ts). Search the
file for `NEEDS_REAL_DATA`.

1. **`bookingUrl`** — create the real booking link and paste it in. Cal.com is
   recommended over Calendly: its free tier includes automated reminders and
   unlimited event types, both of which Calendly puts behind a paid plan, and
   no-show reduction is the highest-ROI feature here. Set availability to hours
   that work for US Eastern and UK buyers.
2. **`caseStudies`** — these are now your **real** projects, recovered from the
   previous PHP site. Before launch: confirm the published numbers are still
   accurate, and get written sign-off from both clients on being named. Add a
   third project when you have one — the heading is count-free, so no copy
   change is needed.
3. **`about.team[1].bio`** — replace with Praveen's own line. One concrete,
   specific detail beats any adjective.
4. **`domain` / `email` / `social`** — confirm these resolve. The email is
   deliberately shown as plain text in the final CTA and the footer.

**Known issue:** `magaharunupaadama.com` no longer resolves, so that case study
has no live link and no screenshot. If the site comes back, add the URL to
`href` and drop a screenshot into `public/work/`.

---

## Brand assets

The "L" mark is drawn as inline SVG geometry in `components/Logo.tsx` — it stays
sharp at any size, inherits `currentColor` (white on dark, black on light) and
costs zero network requests. A standalone copy lives at
`public/brand/lexoratech-mark.svg`, and the same path drives the favicon
(`app/icon.svg`), the web manifest and the OG card.

**It is a geometric reconstruction, not your original file.** If the curves need
to match the official artwork exactly, replace the `<path>` in
`components/Logo.tsx` and `public/brand/lexoratech-mark.svg` with the `d`
attribute from your source SVG.

The wordmark renders as live text (Inter, tight tracking) rather than an image —
sharper on every screen, and it scales with the layout. To use your brand
typeface instead, load it via `next/font/local` in `app/layout.tsx` and point
`.font-sans` at it.

**The slogan** (`tagline` in the config) appears in the footer lockup only. It is
deliberately kept out of the hero so it never competes with the H1, which has to
carry the value proposition.

---

## Editing content

All copy is in one object: `app/site-config.ts`. Nothing in `/components` needs
to change to update text, prices, FAQ items, case studies or team members.

- Add or remove a case study → add/remove an entry in `caseStudies`. The layout
  alternates image-left / image-right automatically.
- Add or remove an FAQ item → add/remove an entry in `faq`. The JSON-LD FAQ
  schema updates itself.
- Change the accent colour → `tailwind.config.ts`, `colors.accent`. It is used
  only on CTAs, result numbers and small markers. Keep it to one colour.

### Screenshots

Set `image` on a case study to a filename in `public/work/` and it renders
through `next/image`. Leave it as `""` and the card falls back to a placeholder
panel, so a project with no screenshot still looks deliberate.

To capture a new one at the right aspect ratio (16:10), with Chrome installed:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --virtual-time-budget=12000 --window-size=1600,1000 --screenshot=public/work/new-project.png https://example.com
```

Then convert it to a lighter JPEG:

```bash
sips -s format jpeg -s formatOptions 82 public/work/new-project.png --out public/work/new-project.jpg
```

### Icons

`app/icon.svg`, `app/favicon.ico` and `app/apple-icon.png` are all generated
from the same L-mark geometry. If you change the mark, regenerate the raster
pair rather than hand-editing them.

---

## Local development

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build
```

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). Framework preset
   **Next.js** is detected automatically — no build settings to change, no
   environment variables required.
3. Deploy, then add your domain under **Settings → Domains** and point your
   registrar's records at Vercel.

Set `domain` in `app/site-config.ts` to your live URL before deploying — it
feeds canonical URLs, OpenGraph tags, `sitemap.xml` and `robots.txt`.

---

## What's included

- **SEO** — full metadata, OpenGraph and Twitter cards, and a single JSON-LD
  `@graph` with cross-referenced `@id`s: `Organization`/`ProfessionalService`
  (logo, slogan, founders as `Person`, `areaServed`, a 4-item `OfferCatalog` and
  the `$1,500` `Offer`), `WebSite`, `WebPage` and `FAQPage`. Plus generated
  `sitemap.xml`, `robots.txt` and `manifest.webmanifest`. Heading outline is one
  `h1`, section `h2`s, and descriptive keyword-bearing `h3`s on each case study.
- **OG image** — generated at request time in `app/opengraph-image.tsx`. No
  external assets, no stock photography.
- **Accessibility** — semantic landmarks, a skip link, visible focus rings,
  ARIA labels on every icon-only control, and a native `<details>` accordion
  that works without JavaScript. Text colours meet WCAG AA on the dark ground.
- **Motion** — fade-and-rise on scroll only (20px, 0.5s, 0.1s stagger).
  `prefers-reduced-motion` disables it entirely.
- **Performance** — one page, `next/font` for Inter, no image requests, no
  analytics or chat widgets. Framer Motion is the only runtime dependency of
  any size.

## Structure

```
app/
  site-config.ts       ← all copy lives here
  layout.tsx           ← metadata + JSON-LD
  page.tsx             ← section order
  globals.css
  opengraph-image.tsx
  robots.ts  sitemap.ts
components/
  Nav  Hero  Problem  Offer  CaseStudies  Services
  Process  About  Faq  FinalCta  Footer
  Reveal.tsx           ← scroll animation wrapper
  ui.tsx               ← Section, headings, buttons, placeholder
```

Section order answers the buyer's objections in the order they occur: *do they
understand my problem → can they actually build → are they real people → what
will this cost and how badly can it go wrong.*
