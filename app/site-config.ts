/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE COPY
 *  Edit this file only. No JSX changes needed to update the site.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  ⚠️  BEFORE YOU GO LIVE — three things in here are PLACEHOLDER and must be
 *      replaced with real information. They are marked with `NEEDS_REAL_DATA`.
 *
 *      1. calendly       — swap in your real scheduling link
 *      2. caseStudies    — the three projects below are ILLUSTRATIVE TEMPLATES,
 *                          not real clients. Shipping invented numbers will
 *                          destroy your credibility the first time a buyer asks
 *                          a follow-up question. Replace with real work.
 *      3. team[1]        — the second team member’s real name, bio and links.
 *
 *      Also add two real photos at /public/team/*.jpg (see `photo` fields).
 */

export const NEEDS_REAL_DATA = true;

export const siteConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  company: "LEXORATECH",
  domain: "https://lexoratech.com",
  email: "hello@lexoratech.com",
  location: "Colombo, Sri Lanka",
  locationLine: "Colombo, Sri Lanka · Working worldwide",

  // NEEDS_REAL_DATA: replace with your live Calendly (or Cal.com) link.
  // Set your availability to hours that work for US Eastern and UK buyers.
  calendly: "https://calendly.com/lexoratech/30min",

  social: {
    linkedin: "https://www.linkedin.com/company/lexoratech",
    github: "https://github.com/Lexora-Tech",
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  seo: {
    title: "LEXORATECH — AI automation and internal tools, built in 5 days",
    description:
      "A two-person senior development studio. We build custom AI automation and internal tools for agencies and service businesses. Fixed price, fixed date, working software in 5 days.",
    keywords: [
      "AI automation",
      "internal tools",
      "workflow automation",
      "custom software studio",
      "AI agents for agencies",
      "recruitment automation",
    ],
  },

  // ── Nav ───────────────────────────────────────────────────────────────────
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
  ],

  // ── 2. Hero ───────────────────────────────────────────────────────────────
  hero: {
    pill: "Available for new projects — August",
    headline: "We automate the work your team shouldn’t be doing.",
    subhead:
      "Custom AI automation and internal tools for agencies and service businesses. Working software in 5 days, not 5 months.",
    primaryCta: "Book a 30-min call",
    secondaryCta: "See our work",
    trustRow:
      "Working with teams in 🇺🇸 🇬🇧 🇦🇺 🇳🇱 · 4-hour daily overlap with US Eastern · Fixed prices, no surprises",
  },

  // ── 3. Problem ────────────────────────────────────────────────────────────
  problem: {
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
    label: "START HERE",
    title: "The 5-Day Build",
    price: "$1,500",
    priceNote: "fixed",
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
  // NEEDS_REAL_DATA: These three are ILLUSTRATIVE TEMPLATES showing the shape
  // of a good case study. Replace every field with real projects and real
  // numbers before this site goes live. Keep the structure — it works.
  caseStudies: [
    {
      client: "UK recruitment agency, 12 staff",
      problem:
        "Every inbound CV was read by a consultant, tagged by hand, and re-typed into their applicant tracking system. Roughly 200 applications a week.",
      built:
        "A screening pipeline that reads each CV, scores it against the live role brief, and writes a ranked shortlist straight into their existing ATS. Consultants review the top ten and nothing else.",
      resultLabel: "Time to first shortlist",
      result: "12 hrs/week → 20 minutes",
      stack: ["Next.js", "OpenAI", "Postgres", "Bullhorn API"],
      image: "recruitment-screening-dashboard.png",
    },
    {
      client: "Australian property group, 40 agents",
      problem:
        "Listing data lived in three places. Agents updated one, someone else updated another, and the public website was reliably two days behind.",
      built:
        "One internal dashboard that owns the listing record and pushes changes everywhere else automatically. Agents update once, from their phone, and the site is current within a minute.",
      resultLabel: "Listings out of sync",
      result: "2 days behind → under 60 seconds",
      stack: ["React Native", "Node", "Supabase", "REA API"],
      image: "property-listing-sync.png",
    },
    {
      client: "US e-commerce brand, $4M/yr",
      problem:
        "Customer service answered the same forty questions all day — where is my order, can I change the size, what is the return window.",
      built:
        "A support agent wired into their order system that answers those questions with real order data and hands anything unusual straight to a human with the context attached.",
      resultLabel: "Tickets needing a human",
      result: "71% handled without an agent",
      stack: ["Next.js", "Claude API", "Shopify", "Zendesk"],
      image: "support-agent-console.png",
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
    heading: "Two people. You talk to whoever is writing the code.",
    body: "We’re a two-person studio. No account managers, no handoffs, no team you never meet. The person on your kickoff call is the person shipping your software.",
    team: [
      {
        name: "Theekshana Sudeepa",
        role: "Co-founder · Engineering",
        bio: "Ten years building web and mobile products. Spends most of the day in TypeScript and most of the night reading about compilers.",
        // Add a real photo at public/team/theekshana.jpg, then set photo below.
        photo: "",
        initials: "TS",
        links: {
          github: "https://github.com/Lexora-Tech",
          linkedin: "https://www.linkedin.com/in/theekshana-sudeepa",
        },
      },
      {
        // NEEDS_REAL_DATA: real name, role, bio and links for your co-founder.
        name: "Co-founder Name",
        role: "Co-founder · Engineering",
        bio: "One line of real personality here. Something a stranger would remember — not 'passionate about technology'.",
        photo: "",
        initials: "CN",
        links: {
          github: "https://github.com/Lexora-Tech",
          linkedin: "https://www.linkedin.com/company/lexoratech",
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
    emailLabel: "Or just email us:",
  },
} as const;

export type SiteConfig = typeof siteConfig;
