# Launch checklist — what you do

Everything in code is done. These are the steps that need your accounts, your
decisions, or your clients' permission.

Work top to bottom. Steps 1–3 can happen today; step 5 is the point of no
return, so do it when you can watch it for an hour.

**What I verified about your current setup**, so you don't have to re-check:

| Thing | State |
|---|---|
| `lexoratech.com` | **Live**, serving the old PHP site |
| DNS | Managed at **Cloudflare** (`anuj` / `stevie.ns.cloudflare.com`) |
| Current origin | Namecheap shared hosting (`66.29.141.101`) |
| Email | **Google Workspace** — `hello@lexoratech.com` already works |
| Google Search Console | Already verified (2 TXT records present) |
| `github.com/Lexora-Tech` | Resolves ✅ |
| `linkedin.com/company/lexoratech` | Resolves ✅ |
| `cal.com/lexoratech` | **404 — does not exist yet** ❌ |

---

## 1. Create the booking link — 15 min

This is the only genuinely broken link on the site. Every CTA points at it.

1. Sign up at [cal.com](https://cal.com) with `hello@lexoratech.com`.
2. Claim the username `lexoratech`.
3. Create one event type: **30 min**, name it "Intro call".
4. Connect Google Calendar so it reads your real availability.
5. **Turn on email reminders** (24h and 1h before). This is the whole reason
   I recommended Cal.com over Calendly — Calendly charges $12/mo for it, and
   no-shows are what actually kill discovery-call pipelines.
6. Set availability to hours that overlap **US Eastern and UK**. From Colombo
   (UTC+5:30), roughly **17:00–21:00 your time** covers UK afternoon and US
   Eastern morning. Block everything else.
7. Add one intake question: *"What's the manual process you want gone?"* — it
   makes every call start warm.

Then paste the final URL into `app/site-config.ts` → `bookingUrl`.

> Later, put it on `booking.lexoratech.com` via Cal.com's custom-domain setting
> so buyers never leave your brand.

---

## 2. Get client sign-off — do this before launch, not after

Both case studies name real clients. Before they go public you need:

- [ ] **Chathuranga Rajapaksha** to confirm he's happy being named for **both**
      Inner Mental Wellness and Magaharunupaadama.
- [ ] Confirm **"50+ organisations"** is still accurate for the EAP platform.
      It came from your own old site — if it's stale, change it or drop it.
- [ ] Confirm the **12-day** build timeline for Missed Lesson.

A single number a client contradicts on a sales call costs you the deal and the
reference. One email covers all three.

Also: **`magaharunupaadama.com` no longer resolves.** That case study has no
live link and no screenshot as a result. If the client brings it back, add the
URL to `href` and drop a screenshot into `public/work/`.

---

## 3. Replace Praveen's bio — 5 min

`app/site-config.ts` → `about.team[1].bio`. Mine is a placeholder. One concrete,
specific thing he actually does beats any adjective. Ask him to write it himself
in one sentence.

---

## 4. Push to GitHub and deploy to Vercel — 20 min

The site is currently uncommitted on the `brand-new` branch.

```bash
git add -A && git commit -m "Rebuild site: monochrome redesign, real case studies, SEO"
```

```bash
git push origin brand-new
```

Then:

1. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub.
2. Import the `LexoraNew-Web` repo.
3. Framework preset **Next.js** is detected automatically. **Change nothing.**
   No environment variables are needed.
4. Deploy. You'll get a `something.vercel.app` URL in about 90 seconds.

**Test everything on that Vercel URL before touching DNS.** Open it on your
phone. Click every CTA. Confirm the booking link opens your real Cal.com page.

---

## 5. Point the domain at Vercel — the careful step

Your DNS is at **Cloudflare**, and your old site is still live on Namecheap.
Read this whole section before changing anything.

### Before you start

- [ ] Lower the TTL on your `@` and `www` records to **5 minutes** and wait an
      hour. This makes rollback fast if something's wrong.
- [ ] **Do not touch the MX records.** They point at Google Workspace. Deleting
      them kills `hello@lexoratech.com` immediately.
- [ ] Leave the Namecheap hosting running for a week. It's your rollback.

### In Vercel

Settings → Domains → add `lexoratech.com` and `www.lexoratech.com`. Vercel will
show you the exact records it wants.

### In Cloudflare DNS

| Type | Name | Value | Proxy |
|---|---|---|---|
| A | `@` | `76.76.21.21` | **DNS only (grey cloud)** |
| CNAME | `www` | `cname.vercel-dns.com` | **DNS only (grey cloud)** |

> ⚠️ **Set the proxy to grey cloud, not orange.** Cloudflare's proxy in front of
> Vercel means two CDNs stacked on each other, and it blocks Vercel from
> issuing its SSL certificate — you get an SSL error loop that's genuinely
> annoying to debug. If you insist on keeping the orange cloud, you must set
> Cloudflare SSL/TLS mode to **Full (strict)** or you'll get a redirect loop.

Confirm both records use Vercel's values, then wait. With a 5-minute TTL it's
usually live in under 15 minutes. Vercel issues the certificate automatically.

### Verify

```bash
curl -sI https://lexoratech.com | head -3
```

You want `server: Vercel`. Then check a legacy URL still lands correctly:

```bash
curl -sI https://lexoratech.com/portfolio.php | grep -i location
```

Should return `location: /#work`.

---

## 6. Tell Google — 10 min, same day as launch

Your old site had **43 indexed URLs**. I added 308 permanent redirects for all
of them (`next.config.mjs`), so the ranking signal transfers instead of
evaporating. Google treats 308 exactly like 301.

In [Search Console](https://search.google.com/search-console) — you're already
verified, so this is quick:

1. **Sitemaps** → submit `https://lexoratech.com/sitemap.xml`.
2. **URL Inspection** → paste `https://lexoratech.com/` → **Request indexing**.
3. Check **Pages** a week later. Some old URLs showing "Page with redirect" is
   correct and expected — that's the redirects working.

Then update the link on both social profiles you already have:

- [ ] `linkedin.com/company/lexoratech` → website field
- [ ] `github.com/Lexora-Tech` → org profile website field

---

## 7. Worth deciding soon (not launch blockers)

**A privacy policy.** Your old site had one at `/privacy-policy.php`; the new
site doesn't, so that URL now redirects to the homepage. The new site collects
nothing directly — no forms, just an email link and an outbound booking link —
but Cal.com collects names and emails on your behalf. If you're selling into
the **UK or EU, GDPR applies to you as the data controller.** Buyers there
sometimes check. Worth adding a real one back at `/privacy` before you push
hard into those markets.

**A third case study.** The section heading is deliberately count-free, so
adding one needs no copy change — just a new entry in `caseStudies`.

**Real screenshots.** The Magaharunupaadama card uses a placeholder panel. The
README has the exact headless-Chrome command to capture a new one at the right
aspect ratio if the site returns.

---

## The 20-minute check after it's live

- [ ] Open it on your phone first. Most buyers check you on mobile.
- [ ] Click **Book a call** from the nav, hero, offer card, and footer CTA.
      All four go to Cal.com.
- [ ] Send `hello@lexoratech.com` a test email from a personal account.
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/). Investigate if
      mobile scores under 90.
- [ ] Paste the URL into
      [LinkedIn's Post Inspector](https://www.linkedin.com/post-inspector/) so
      the OG card is cached correctly before you share it anywhere.
- [ ] Have one person outside the company read it and tell you what you do. If
      they can't in one sentence, the headline needs work — not the design.
