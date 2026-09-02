/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE COPY
 *  Edit this file only. No JSX changes needed to update the site.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  ⚠️  BEFORE YOU GO LIVE — things marked `NEEDS_REAL_DATA` are placeholder:
 *
 *      1. bookingUrl     — create the real booking link and paste it here
 *      2. caseStudies    — REAL projects now, but VERIFY the published numbers
 *                          and get both clients' sign-off on being named
 *      3. team[1].bio    — replace with Praveen's own line
 *      4. social         — confirm the LinkedIn / GitHub URLs resolve
 */

export const siteConfig = {
  // ── Brand ─────────────────────────────────────────────────────────────────
  company: "LexoraTech",
  /** Cased for the logo lockup. The nav renders this next to the L mark. */
  wordmark: "LexoraTech",
  /** Brand slogan. Deliberately kept out of the hero so it never competes
      with the H1, which has to carry the value proposition. */
  tagline: "Building with Bits",
  legalName: "LexoraTech",
  foundingDate: "2023",

  domain: "https://lexoratech.com",
  email: "hello@lexoratech.com",
  location: "Colombo, Sri Lanka",
  locationLine: "Colombo, Sri Lanka · Working worldwide",

  // NEEDS_REAL_DATA: your live booking link. Recommended: Cal.com — its free
  // tier includes automated reminders and unlimited event types, both of which
  // Calendly charges for. Set availability to hours that work for US Eastern
  // and UK buyers, and put it on your own subdomain once it is live.
  bookingUrl: "https://cal.com/lexora-tech/30min",

  social: {
    linkedin: "https://www.linkedin.com/company/lexoratech",
    github: "https://github.com/Lexora-Tech",
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: "LexoraTech — AI Automation & Internal Tools, Shipped in 5 Days",
    shortTitle: "LexoraTech",
    // Kept under ~160 characters — Google truncates meta descriptions past
    // roughly that length in search results, usually mid-word.
    description:
      "AI automation and internal tools for agencies and service businesses. Fixed price, fixed date, working software in five days. US, UK, EU, AU.",
    keywords: [
      "AI automation agency",
      "custom internal tools",
      "workflow automation development",
      "AI agent development",
      "software development studio Sri Lanka",
      "offshore development team",
      "recruitment automation software",
      "business process automation",
      "React and Next.js development studio",
      "hire senior developers",
    ],
    /** Used as the OG image subtitle and the schema slogan. */
    ogSubtitle: "AI automation & internal tools · Fixed price, five days",
  },

  // ── Availability ──────────────────────────────────────────────────────────
  // Drives the month in the hero pill and the year in the footer, so neither
  // has to be edited by hand. Requires the `revalidate` export in
  // app/layout.tsx to keep working after the first build — see lib/site-date.ts.
  availability: {
    /** The calendar the business actually works to. */
    timeZone: "Asia/Colombo",
    /**
     * Past this day of the month, the pill advertises the NEXT month instead.
     * Claiming availability "in August" on the 29th is a promise about two
     * days. 20 gives roughly a week and a half of runway.
     */
    rollToNextMonthAfterDay: 20,
  },

  // ── Nav ───────────────────────────────────────────────────────────────────
  nav: [
    { label: "Work", href: "#work" },
    { label: "Why us", href: "#why-us" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
  ],

  // ── 2. Hero ───────────────────────────────────────────────────────────────
  hero: {
    /** `{month}` is filled in at render time — see lib/site-date.ts. Never
        hard-code a month here; it will go stale and nobody will notice. */
    pill: "Available for new projects — {month}",
    headline: "We automate the work your team shouldn’t be doing.",
    subhead:
      "Custom AI automation and internal tools for agencies and service businesses. Working software in 5 days, not 5 months.",
    primaryCta: "Book a 30-min call",
    secondaryCta: "See our work",
    trust: [
      "Teams in the US, UK, Australia & NL",
      "4-hour daily overlap with US Eastern",
      "Fixed prices, no surprises",
    ],
  },

  // ── 3. Problem ────────────────────────────────────────────────────────────
  problem: {
    eyebrow: "The problem",
    heading: "Most teams lose 15+ hours a week to work a machine should be doing.",
    body: "Not the interesting work. The copy-paste, the chasing, the re-typing of things that already exist somewhere else.",
    items: [
      {
        icon: "ArrowLeftRight",
        title: "Copying data between tools",
        body: "Your CRM, your spreadsheet and your inbox all hold the same record. Someone keeps them in sync by hand.",
      },
      {
        icon: "FileSearch",
        title: "Manually screening applications",
        body: "Two hundred CVs, one shortlist, and a person reading every single one to find the eight that matter.",
      },
      {
        icon: "MessageSquareWarning",
        title: "Chasing status updates",
        body: "Half your week is asking people where things are, then typing the answer into a report nobody reads.",
      },
    ],
  },

  // ── 4. The Offer ──────────────────────────────────────────────────────────
  offer: {
    label: "Start here",
    title: "The 5-Day Build",
    price: "$1,500",
    priceNote: "fixed price",
    /** Numeric form of `price`, used by the cost calculator. Keep in sync. */
    priceValue: 1500,
    description:
      "We map your top three manual workflows, pick the one with the highest hours-saved-per-week, and ship it as working software in five working days.",
    bullets: [
      "Working software running on your systems — not a prototype, not a slide deck",
      "Full source code in your own repository from day one",
      "A written update at the end of every working day",
      "30 days of fixes included after handover, no hourly billing",
      "A recorded handover call so your team can run it without us",
    ],
    guarantee:
      "If it doesn’t do what we agreed, you don’t pay the second half.",
    cta: "Book a call",
  },

  // ── 5. Case studies ───────────────────────────────────────────────────────
  // These are your REAL projects, recovered from the previous site (commit
  // 64803bb: project1.php / project2.php).
  //
  // ⚠️ VERIFY BEFORE LAUNCH: the numbers below ("50+ organisations", the build
  // timelines) are your own previously-published claims. Confirm each is still
  // accurate and that both clients are happy to be named — then they are the
  // strongest thing on this page. Add a third project when you have one.
  //
  // `image` — a file in /public/work, or "" to render the placeholder panel.
  // `href`  — optional live URL. Omit if the site is offline.
  // ── Our own products ──────────────────────────────────────────────────────
  // Feeds the `owns` block of the JSON-LD graph. Declaring these associates
  // all three domains with one organisation for search engines, so authority
  // earned on the products reflects back on the studio.
  products: [
    {
      name: "Lexora Workspace",
      url: "https://apps.lexoratech.com/",
      category: "DesignApplication",
      description:
        "33 free browser-based tools for design, video, audio and development. No install, no account, and files are processed in the browser rather than uploaded.",
    },
    {
      name: "Nimithi",
      url: "https://nimithi.com",
      category: "LifestyleApplication",
      description:
        "24+ free Vedic astrology tools for Sri Lanka, computed from Swiss Ephemeris planetary data. Bilingual Sinhala and English, no account required.",
    },
  ],

  // ── Cost calculator ───────────────────────────────────────────────────────
  // Sits between the problem and the offer: the visitor quantifies their own
  // pain, then meets the price. Their own number is far more persuasive than
  // any number we could assert.
  calculator: {
    eyebrow: "Do the math",
    heading: "What is that manual work already costing you?",
    standfirst:
      "Move the sliders to your own numbers. No email required, nothing is sent anywhere — the maths runs in your browser.",
    fields: {
      hours: { label: "Hours lost per week", min: 1, max: 40, step: 1, initial: 15, suffix: "hrs" },
      people: { label: "People doing it", min: 1, max: 25, step: 1, initial: 3, suffix: "" },
      rate: { label: "Fully-loaded hourly cost", min: 15, max: 150, step: 5, initial: 40, prefix: "$" },
    },
    resultLabel: "That work costs you roughly",
    resultSuffix: "a year",
    // Deliberately conservative: we claim half the time back, not all of it.
    paybackLead: "Automate even half of it and",
    paybackTail: "pays for itself in",
    cta: "Book a 30-min call",
    // Honest framing. Never let this read as a promise.
    disclaimer:
      "A rough estimate, not a quote. Assumes 46 working weeks a year and that automation removes half the task, not all of it.",
    workingWeeks: 46,
    workingDays: 230,
  },

  // ── Why hire us ───────────────────────────────────────────────────────────
  // The buyer is never choosing between you and nothing. They are choosing
  // between you, an agency, and a marketplace freelancer. Name the comparison
  // and win it on structure, not adjectives.
  whyUs: {
    eyebrow: "Why hire us",
    heading: "The difference is structural, not a sales pitch.",
    standfirst:
      "You are not choosing between us and nothing. You are choosing between us and an agency or a marketplace contractor — so here is the honest comparison.",
    columns: { ours: "LexoraTech", theirs: "The usual arrangement" },
    rows: [
      {
        label: "Who writes your code",
        ours: "The two founders. The person on your kickoff call is the person committing.",
        theirs: "A rotating junior you never meet, behind an account manager.",
      },
      {
        label: "What you pay",
        ours: "A fixed number, agreed in writing before anyone starts.",
        theirs: "An hourly estimate that grows once the work is underway.",
      },
      {
        label: "Time to working software",
        ours: "Five working days for the first build.",
        theirs: "Six to twelve weeks, most of it discovery and documents.",
      },
      {
        label: "How you track progress",
        ours: "A written update at the end of every working day.",
        theirs: "A status call every other week, if you chase it.",
      },
      {
        label: "Who owns the code",
        ours: "You do, in your own repository, from the first commit.",
        theirs: "Handed over at the end — assuming the contract says so.",
      },
      {
        label: "When something breaks after launch",
        ours: "30 days of fixes included, no hourly billing.",
        theirs: "A new statement of work, or the contractor has moved on.",
      },
    ],
    footnote:
      "If a local agency is genuinely the better fit for what you need, we will say so on the call.",
  },

  work: {
    eyebrow: "Selected work",
    // Deliberately count-free so adding a project needs no copy edit.
    heading: "Client work, and the products we build for ourselves.",
  },
  caseStudies: [
    {
      // `title` is the card's H3 — keep it descriptive, it carries SEO weight.
      title: "Sri Lanka’s first Employee Assistance Program platform",
      /** URL segment for this project's own indexable page. */
      slug: "employee-assistance-program-platform",
      client: "Inner Mental Wellness · corporate mental health",
      problem:
        "Workplace mental health support was fragmented. Companies had no private, central way for staff to reach a therapist — and employees would not use anything HR could see.",
      built:
        "A platform where employees book therapy anonymously, sessions run securely in the browser, and HR only ever sees aggregated wellness reporting. Stripe handles corporate billing automatically.",
      resultLabel: "Corporate clients on the platform",
      result: "50+ organisations",
      stack: ["Laravel", "Vue.js", "AWS", "Stripe", "MySQL"],
      image: "eap-platform.jpg",
      href: "https://innermentalwellness.com",
    },
    {
      // Our own product. Labelled as such on purpose — claiming it as client
      // work would be a lie a buyer could check in one click.
      title: "A 33-tool creator suite that runs entirely in the browser",
      /** URL segment for this project's own indexable page. */
      slug: "browser-based-creator-tool-suite",
      client: "Lexora Workspace · our own product",
      problem:
        "Everyday creator and developer utilities are scattered across dozens of ad-heavy sites, most of which want you to upload your file to their server before they will touch it.",
      built:
        "One workspace with 33 tools across design, video, audio and developer tooling — whiteboard, device mockups, background removal, image compression, code formatting. The work happens in your browser. No install, no account, nothing uploaded.",
      resultLabel: "Shipped and live",
      result: "33 tools, zero install",
      stack: ["PHP 8.2", "Cloudflare", "Client-side processing"],
      image: "lexora-workspace.jpg",
      href: "https://apps.lexoratech.com/",
    },
    {
      title: "Vedic astrology tools built on real ephemeris data, in Sinhala",
      /** URL segment for this project's own indexable page. */
      slug: "vedic-astrology-platform-sinhala",
      client: "Nimithi · our own product",
      problem:
        "Astrology online in Sri Lanka meant a choice between paywalled readings and free sites whose numbers came from nowhere in particular — and almost none of it in Sinhala.",
      built:
        "Nimithi computes every reading from Swiss Ephemeris planetary data rather than guesswork: daily horoscopes, Rahu Kalaya, Panchanga, compatibility. Bilingual Sinhala and English, 24+ tools, free, no account. Shareable cards give it a route into WhatsApp and Instagram.",
      resultLabel: "Free tools, both languages",
      result: "24+ tools, no login",
      stack: ["Next.js", "Vercel", "Swiss Ephemeris", "Bilingual i18n"],
      image: "nimithi.jpg",
      href: "https://nimithi.com",
    },
    {
      title: "The digital home of a national child-safeguarding programme",
      /** URL segment for this project's own indexable page. */
      slug: "national-child-safeguarding-platform",
      client: "The Missed Lesson · national child-safety programme",
      // ⚠️ VERIFY: naming the Ministry of Education and the Police Child and
      // Women Bureau publicly on a commercial page is a stronger credential
      // than anything else on this site — and exactly the kind of claim that
      // needs their sign-off. Confirm before launch, or soften to
      // "a government-backed child-safeguarding programme".
      problem:
        "A programme run jointly by the Ministry of Education, the Police Child and Women Bureau, TEAM HERO and the ELPEC Campus was coordinating through fragmented channels and printed handouts. Staff could not publish or correct safety guidance without going back to a developer.",
      built:
        "A deliberately lightweight PHP platform with a custom CMS, so non-technical staff publish and update safeguarding guidance themselves, in real time, with no developer in the loop.",
      resultLabel: "Brief to live",
      result: "12 days",
      stack: ["PHP 8", "MySQL", "Bootstrap 5", "jQuery"],
      // The domain no longer resolves, so there is no live link to offer.
      image: "missed-lesson.jpg",
      href: "",
    },
  ],

  // ── 6. Services ───────────────────────────────────────────────────────────
  services: [
    {
      icon: "Bot",
      title: "AI Automation & Agents",
      body: "Workflows that read, decide and act on your real data.",
    },
    {
      icon: "LayoutDashboard",
      title: "Web Applications",
      body: "Internal tools, dashboards and customer portals.",
    },
    {
      icon: "Smartphone",
      title: "Mobile Apps",
      body: "React Native, one codebase, iOS and Android.",
    },
    {
      icon: "ShoppingCart",
      title: "E-commerce & CMS",
      body: "Shopify and WordPress builds and integrations.",
    },
  ],

  // ── 7. Process ────────────────────────────────────────────────────────────
  process: [
    {
      step: "01",
      title: "Call",
      body: "30 minutes. You describe the work that’s eating your week. We tell you honestly whether we can fix it.",
    },
    {
      step: "02",
      title: "Scope",
      body: "A fixed price and a fixed delivery date, in writing, before anyone starts. No hourly billing, no scope drift.",
    },
    {
      step: "03",
      title: "Build",
      body: "A written update at the end of every working day. Your repository, your access, from the first commit.",
    },
    {
      step: "04",
      title: "Handover",
      body: "Code, documentation and a recorded training call. Then 30 days of fixes, included.",
    },
  ],

  // ── 8. About ──────────────────────────────────────────────────────────────
  about: {
    eyebrow: "The studio",
    heading: "Two people. You talk to whoever is writing the code.",
    body: "We’re a two-person studio. No account managers, no handoffs, no team you never meet. The person on your kickoff call is the person shipping your software.",
    team: [
      {
        name: "Theekshana Sudeepa",
        role: "Founder, Full-Stack Engineering",
        // Grounded in the project record. Swap the second sentence for
        // something only you would say — that line is what people remember.
        bio: "Full-stack architect on both the Inner Mental Wellness platform and the Missed Lesson system. Writes most of the backend, and would rather delete code than add it.",
        photo: "/team/theekshana-sudeepa.jpg",
        initials: "TS",
        links: {
          github: "https://github.com/ThikkaBro",
          linkedin: "https://www.linkedin.com/in/theekshana-sudeepa/",
          website: "https://thikka.me",
        },
      },
      {
        name: "Praveen Lakshan",
        role: "Co-founder, CTO",
        // NEEDS_REAL_DATA: replace this with Praveen's own line — one concrete,
        // specific detail beats any adjective.
        bio: "Runs architecture and infrastructure across the studio’s builds. Cares most about the boring parts that keep systems up at 3am.",
        photo: "/team/praveen-lakshan.jpg",
        initials: "PL",
        links: {
          github: "https://github.com/PraveenLakshan",
          linkedin: "https://www.linkedin.com/in/praveenlakshan/",
          website: "https://praveenlakshan.me",
        },
      },
    ],
  },

  // ── 9. FAQ ────────────────────────────────────────────────────────────────
  faq: [
    {
      q: "You’re not local — how does that work?",
      a: "We work a 4-hour daily overlap with US Eastern and a full overlap with UK and European hours. You get a written update at the end of every working day, and your code sits in your repository from the first commit — not ours. In practice most clients say it feels closer than agencies in their own city, because the updates never stop.",
    },
    {
      q: "What does a typical project cost?",
      a: "The 5-Day Build is $1,500 fixed and is how most clients start. Beyond that, a focused internal tool or automation usually lands between $4,000 and $12,000. A full web or mobile application is typically $15,000 to $40,000. We quote a fixed number before we start, and we’d rather tell you the range now than waste a call.",
    },
    {
      q: "How fast can you start?",
      a: "Usually within one to two weeks. If you book a call this week we’ll tell you our real next opening on that call — we don’t hold slots we can’t honour.",
    },
    {
      q: "Who owns the code?",
      a: "You do, completely, on final payment. It lives in your repository, under your account, from day one. No licensing, no hosting lock-in, no per-seat fees to us. If you decide to take it in-house next month, everything you need is already yours.",
    },
    {
      q: "What if it goes wrong?",
      a: "The 5-Day Build is billed half up front and half on delivery. If what we ship doesn’t do what the written scope says, you don’t pay the second half. On larger projects we work in fixed-price milestones so you can stop after any one of them.",
    },
    {
      q: "Can you work with our existing team and stack?",
      a: "Yes — that’s most of our work. We join your repo, follow your conventions, and open pull requests your engineers review. If you have no engineers, we handle deployment and hosting too, and document it so you’re never dependent on us.",
    },
  ],

  // ── 10. Final CTA ─────────────────────────────────────────────────────────
  finalCta: {
    heading: "Tell us what’s slowing you down.",
    body: "Thirty minutes, no deck, no sales script. If we’re not the right people for it we’ll say so and point you somewhere better.",
    cta: "Book a 30-min call",
    emailLabel: "Or email us directly",
  },
} as const;

export type SiteConfig = typeof siteConfig;
