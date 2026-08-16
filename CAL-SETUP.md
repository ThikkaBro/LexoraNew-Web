# Cal.com setup — no paid anything

Free Cal.com account. Free personal Gmail. That's it. No Workspace, no Meet,
no subscriptions.

---

## 1. Username — 2 min

**Settings → My Account → Profile**

Username: `lexoratech` → your link becomes `https://cal.com/lexoratech/intro`

Set **name** to your real name, not the company. People book calls with people.
Upload the same headshot that's on the site.

---

## 2. Calendar — 3 min

**Settings → Calendars → Add → Google Calendar**

Sign in with **any free Gmail account** — your personal one is fine. Cal.com
reads your busy times so it never double-books you. Free Google accounts work
exactly the same as paid ones here.

Not a Gmail user? **Apple Calendar** and **Outlook/Microsoft** connect the same
way, all free.

Two settings people miss:
- **Check for conflicts in:** tick every calendar you actually use.
- **Add bookings to:** pick the one calendar bookings should land in.

> You *can* skip this entirely and Cal.com still works — you just risk being
> double-booked. Takes 2 minutes, worth doing.

---

## 3. Event type — 5 min

**Event Types → New**

| Field | Value |
|---|---|
| Title | `Intro call` |
| URL | `intro` |
| Duration | 30 minutes |
| Location | **Cal Video** |

**Cal Video is Cal.com's own video calling, built in and free.** It generates a
link automatically for every booking and opens in the browser — nothing for you
or the client to install. This is why you don't need Google Meet.

Then, on the event type's tabs:

**Limits tab:**
- Minimum notice: `12 hours` — stops 2am bookings for 7am
- Buffer after event: `15 minutes`
- Limit future bookings: `21 days` rolling

**Advanced tab → Booking questions.** Add one required **Long text**:

> *"What's the manual process you want gone?"*

This single question means every call starts warm, and you can decline bad fits
before you ever dial in.

---

## 4. Availability — the part that actually matters

**Availability → New schedule → "Client calls"**

Timezone: **Asia/Colombo**. You enter your own local hours; Cal.com shows every
visitor their own local time automatically.

### Two blocks, Monday–Friday

**Evening: 18:00 – 22:00 Colombo** — your US + UK block

| Colombo | UK summer | UK winter | US East summer | US East winter |
|---|---|---|---|---|
| 18:00 | 13:30 | 12:30 | 08:30 | 07:30 |
| 22:00 | 17:30 | 16:30 | 12:30 | 11:30 |

One block covering **UK afternoon and US Eastern morning at once**, year round,
through both daylight-saving shifts. Highest-value four hours in your week.

**Morning: 09:00 – 12:00 Colombo** — your Australia block

| Colombo | Sydney winter | Sydney summer |
|---|---|---|
| 09:00 | 13:30 | 14:30 |
| 12:00 | 16:30 | 17:30 |

Attach this schedule on the event type's **Availability** tab.

Don't open 09:00–22:00. A wide-open calendar signals no demand.

---

## 5. Reminders — don't skip this

**Workflows → New**

This is why Cal.com beat Calendly for you: reminders are free here, $12/month
there. No-shows are what kill discovery calls.

**Reminder 1**
- Trigger: *Before event starts* → `24 hours`
- Action: *Send email to attendee*

**Reminder 2**
- Trigger: *Before event starts* → `1 hour`
- Action: *Send email to attendee*

**Follow-up**
- Trigger: *After event ends* → `1 hour`
- Action: *Send email to attendee*

Apply all three to the Intro call event type. Two reminders is the sweet spot
across a 10-hour timezone gap.

---

## 6. Polish — 3 min

**Event type → Advanced → Success redirect URL:**

```
https://lexoratech.com/#work
```

After booking they land on your case studies, at peak intent.

**Settings → Appearance → Dark.** Your site is near-black; a white booking page
breaks the spell right when they commit.

---

## 7. Put the link on the site — 1 min

[`app/site-config.ts`](app/site-config.ts):

```ts
bookingUrl: "https://cal.com/lexoratech/intro",
```

One line updates all eight CTAs plus your structured data.

---

## 8. Test it like a buyer — 5 min

- [ ] Open the link in a **private window**
- [ ] Set your computer's timezone to **New York**, reload, confirm slots show
      as US Eastern morning — this is the check that proves it works for
      foreign buyers
- [ ] Book a real slot with a personal email
- [ ] Confirm the Cal Video link opens and the confirmation email arrives
- [ ] Cancel the test booking
- [ ] Open the booking page on your phone

---

## Heads up: the email on your site

Your site shows **hello@lexoratech.com** in the footer and final CTA. The
domain's mail records point at Google — so if you don't have an active
Workspace subscription, **mail sent there may bounce**.

Send yourself a test from a personal account. If it doesn't arrive, either:

- change the displayed address in `app/site-config.ts` → `email` to one that
  works, or
- set up free email forwarding — Cloudflare Email Routing is free and forwards
  `hello@lexoratech.com` to any Gmail in about five minutes.

A dead email address on a sales page costs you the buyers who prefer email over
booking, and you'd never know it was happening.
