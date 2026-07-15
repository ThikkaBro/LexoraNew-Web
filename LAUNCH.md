# LexoraTech website — launch guide

Rebuilt in `nextjs-app/` per `lexoratech-rebuild-spec.md` (v1.0, 13 July 2026). This doc is
the checklist to get it from "builds clean locally" to "live at lexoratech.com."

---

## 1. What's here

- **Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4.
- **Pages:** `/`, `/work`, `/work/[slug]` (4 case studies), `/services`, `/products`, `/about`,
  `/contact`, `/privacy`, `/terms`, custom 404.
- **Design system:** tokens, type scale, and the single aurora-seam gradient from spec section 3,
  implemented in `src/app/globals.css`. All three approved interactions from section 7
  (link underline reveal, card hover, scroll fade-rise) are live and respect
  `prefers-reduced-motion`.
- **SEO/metadata:** per-page titles and descriptions, generated OG image (`src/app/opengraph-image.tsx`),
  generated favicon (`src/app/icon.tsx`), `sitemap.xml`, `robots.txt`.
- **Redirects:** every old `.php` URL 301s to its new route — see `next.config.ts`.
- **Contact form:** client + server validation, real success/error states, optional email
  delivery via [Resend](https://resend.com) (falls back to server-side logging if unconfigured
  — see section 3).

Old PHP site remains untouched at the repo root; the new site lives entirely in `nextjs-app/`.

---

## 2. Local development

```bash
cd nextjs-app
npm install
npm run dev       # http://localhost:3000
npm run build     # production build — run this before every deploy
npm run lint
```

---

## 3. Environment variables (required before launch)

Copy `nextjs-app/.env.example` to `.env.local` for local testing, and set the same keys in
**Vercel → Project → Settings → Environment Variables** for production:

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | **Yes, before launch** | Without it, the contact form still shows the correct success message to visitors, but no email is actually sent — submissions only appear in server logs. Get a key at resend.com/api-keys (free tier covers this volume easily). |
| `CONTACT_TO_EMAIL` | No (defaults to `hello@lexoratech.com`) | Inbox that receives contact form submissions. |

**This is the one functional gap between "demo" and "launch."** Everything else works without
further setup.

---

## 4. Deploy to Vercel

1. Push `nextjs-app/` to a GitHub repo (or connect this monorepo and set the Vercel project's
   **Root Directory** to `nextjs-app`).
2. Import the repo in Vercel, framework preset auto-detects as Next.js.
3. Add the environment variables from section 3.
4. Deploy — check the preview URL against the QA checklist in section 6 before promoting.
5. Add `lexoratech.com` and `www.lexoratech.com` as domains on the Vercel project.

## 5. DNS cutover

1. Point `lexoratech.com` (A/ALIAS record) and `www` (CNAME) at Vercel per the instructions
   Vercel shows once the domain is added.
2. Keep the old hosting live but unlinked from DNS for at least a week as a rollback path —
   don't delete the PHP site yet.
3. Once DNS has propagated, re-check every redirect in section 7 against the **live** domain,
   not just the Vercel preview URL (redirects are configured in `next.config.ts` and only take
   effect on the deployed app, not the old host).

---

## 6. Pre-launch QA — spec section 9, checked against this build

| Item | Status |
|---|---|
| Every link goes somewhere real, zero `#` hrefs | ✅ Verified — no placeholder hrefs anywhere in the codebase |
| Custom 404 in the site's voice | ✅ `/this-page-does-not-exist` confirmed in browser |
| Favicon, per-page titles/descriptions, real OG image | ✅ Generated favicon + OG image confirmed rendering; every route has its own `<title>`/description |
| Privacy and Terms are real, spelled correctly | ✅ Full pages written, spellchecked; old site's `terms-and-conditons` typo is gone (now `/terms`) |
| Testimonials praise LexoraTech, attributed, inside a case study | ⚠️ **Needs your sign-off** — see section 8 |
| Alt text on all images / type comes from the locked scale | ✅ No raster `<img>` tags are used anywhere (all visuals are coded UI, so no missing alt text is possible); audited every arbitrary `text-[Npx]` in site chrome against the locked scale — one true violation (12px browser-frame label) found and fixed to 13px. Sizes inside the product mockups are exempt, the same way a screenshot's internal text would be |
| Visible keyboard focus states; reduced motion respected | ✅ Verified by tabbing through nav in the browser — accent focus ring visible. `prefers-reduced-motion` disables all transforms/animation site-wide, confirmed in `globals.css` |
| Lighthouse ≥ 95 performance and accessibility | ⚠️ **Run this yourself post-deploy** — no headless Chrome/Lighthouse available in this environment. The build is favorable to a high score (zero raster images, self-hosted fonts via `next/font`, static generation on every route except the contact API), but I can't produce the actual number. Run Lighthouse (Chrome DevTools or PageSpeed Insights) against the Vercel preview URL for Home and one case study before promoting to production |
| Footer says © 2026; forms have working success/error states | ✅ Footer confirmed. Contact form tested with both a valid submission (success message shown) and an invalid one (inline error message shown) in the browser |
| Read every word out loud — voice check | ✅ Scanned all copy for the banned-word list (innovative, masterpiece, passion, seamless, unlock, empower, solutions-as-noun, cutting-edge, 24/7) and for exclamation marks — none found outside a product mockup that's quoting another company's own site verbatim |

---

## 7. Redirect map (implemented in `next.config.ts`)

| Old URL | New URL |
|---|---|
| `/index.php` | `/` |
| `/about.php` | `/about` |
| `/services.php`, `/web-development.php`, `/mobile-development.php`, `/pos-development.php`, `/ui-ux-design.php`, `/brand-strategy.php`, `/marketing-and-smm.php` | `/services` |
| `/portfolio.php`, `/publication.php` | `/work` |
| `/project1.php` | `/work/maga-harunu-paadama` |
| `/project2.php` | `/work/inner-mental-wellness` |
| `/contact.php`, `/quote.php`, `/process-quote.php`, `/thank-you.php` | `/contact` |
| `/privacy-policy.php` | `/privacy` |
| `/terms-and-conditons.php` | `/terms` |
| `/blog.php` | `/` (per spec: blog is killed until real posts exist) |
| `/live-demos.php` | `/products` (demos now live inside Work and Products) |

If any other old URL gets real inbound traffic (check Search Console / analytics after launch),
add it to the `redirects()` array in `next.config.ts` — don't let it 404.

---

## 8. Open items — need your decision before this fully matches the spec

1. **Testimonial wording.** The old site reused one identical testimonial across both the
   Maga Harunu Paadama and Inner Mental Wellness case studies (a copy-paste bug — the quote
   was written for the education platform and didn't fit the EAP platform). I wrote two
   distinct quotes, both attributed to Chathuranga Rajapaksha (the real founder of both
   ventures) and both grounded in the sentiment of the original, but the exact wording is
   mine, not a fresh quote from him. **Confirm the wording with him before launch**, or send me
   his actual words and I'll drop them in — `src/lib/work.ts`, the `outcome.quote` field on
   each case study.
2. **`RESEND_API_KEY`.** Covered in section 3 — the form doesn't send real email until this is set.
3. **Founder section.** Cut for v1 per your earlier decision (no photos yet). Spec section 4.8
   describes it — when you have real names and photos, tell me and I'll add it back to the
   homepage between Process and the CTA band.
4. **Lighthouse score.** Covered in section 6 — needs to be run against the live deploy.

Nothing else in the spec is outstanding. Every other section (design tokens, copy, sitemap,
interactions, case study template) is implemented and verified in-browser.

---

## 9. Rollback plan

DNS is the only irreversible-feeling step, and it isn't really: keep the old PHP hosting
active and simply repoint DNS back to it if something's wrong post-cutover. Vercel keeps every
deployment, so rolling the new site back to a previous build is a one-click "Promote to
Production" on an earlier deployment in the Vercel dashboard — no rebuild needed.
