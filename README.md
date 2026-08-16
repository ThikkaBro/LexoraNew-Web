# LEXORATECH — conversion site

Single-page Next.js 14 (App Router) site in TypeScript + Tailwind. Deploys to
Vercel with zero configuration.

The page has one job: get a qualified buyer to click **Book a call** within 30
seconds of landing.

---

## Before you go live — 5 things

Everything below lives in [`app/site-config.ts`](app/site-config.ts). Search the
file for `NEEDS_REAL_DATA`.

1. **`calendly`** — swap the placeholder for your real scheduling link, and set
   your availability to hours that work for US Eastern and UK buyers.
2. **`caseStudies`** — ⚠️ the three projects shipped in this repo are
   **illustrative templates, not real clients**. Replace every field with real
   work and real numbers. A single invented result destroys the credibility of
   the whole page the first time a buyer asks a follow-up question.
3. **`about.team[1]`** — real name, role, bio and links for your co-founder.
4. **Team photos** — drop two real photos in `public/team/`, then set
   `photo: "/team/your-file.jpg"` on each person. Until then the site renders an
   initials block, which is honest but converts far worse than a real face.
5. **`domain` / `email` / `social`** — confirm these are correct. The email is
   deliberately shown as plain text in the final CTA and the footer.

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

Case study images currently render as `ScreenshotPlaceholder` — a dark block
with a hairline border and the filename. To use real screenshots:

1. Put the file in `public/work/`.
2. In `components/CaseStudies.tsx`, replace `<ScreenshotPlaceholder … />` with
   `next/image`:

```tsx
<Image
  src={`/work/${study.image}`}
  alt={`…`}
  width={1280}
  height={800}
  className="w-full rounded border border-hairline shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]"
/>
```

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

- **SEO** — full metadata, OpenGraph and Twitter cards, `ProfessionalService`
  JSON-LD with an embedded `FAQPage`, generated `sitemap.xml` and `robots.txt`.
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
