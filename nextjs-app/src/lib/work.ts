export type CaseStudy = {
  slug: string;
  title: string;
  resultLine: string;
  tags: string[];
  kind: "client" | "product";
  visual: "mhp" | "imw" | "workspace" | "store";
  meta: {
    client: string;
    year: string;
    scope: string;
    live?: { label: string; href: string };
  };
  brief: string;
  images: { caption: string }[];
  decisions: { title: string; body: string }[];
  outcome: {
    result: string;
    quote?: { text: string; name: string; role: string };
  };
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "inner-mental-wellness",
    title: "Inner Mental Wellness",
    resultLine: "Sri Lanka's first Employee Assistance Program, branded and shipped in six days.",
    tags: ["Brand", "Web"],
    kind: "client",
    visual: "imw",
    meta: {
      client: "Inner Mental Wellness",
      year: "2025",
      scope: "Brand identity · Web platform",
      live: { label: "innermentalwellness.com", href: "https://innermentalwellness.com" },
    },
    brief:
      "Inner Mental Wellness set out to be the island's first Employee Assistance Program — confidential counselling and workplace mental health support. Before this project, there was no platform: no way for a company to enrol, no way for an employee to book a session without HR finding out.",
    images: [
      { caption: "The homepage states the one thing that matters first: this is Sri Lanka's first EAP service." },
      { caption: "Booking runs through an encrypted flow — no personal detail reaches HR." },
      { caption: "A corporate dashboard gives HR managers aggregated, anonymised usage data instead of names." },
    ],
    decisions: [
      {
        title: "Anonymity as the starting constraint",
        body: "Every screen was designed backward from one requirement: an employee's HR department should never see who booked a session. That ruled out the obvious approach — a shared company login — in favour of individual, employee-owned accounts with no organisational visibility into identity.",
      },
      {
        title: "Laravel over a page builder",
        body: "The brief called for Stripe billing, video-session scheduling, and encrypted records — enough moving parts that a website builder would have fought us. We built on Laravel and Vue instead, which cost a few extra days up front and saved weeks once the booking logic got complicated.",
      },
      {
        title: "Brand before build",
        body: "We wrote the identity system — the leaf mark, the teal palette, 'Peace of mind, piece of life' — before a single screen was coded, so the interface always had somewhere to land instead of being decorated after the fact.",
      },
    ],
    outcome: {
      result: "Live at innermentalwellness.com with corporate clients onboarded within weeks of launch.",
      quote: {
        text: "They understood that confidentiality wasn't a feature to add later — it had to be the foundation. What they shipped is fast, secure, and exactly what this market needed.",
        name: "Chathuranga Rajapaksha",
        role: "Founder, Inner Mental Wellness",
      },
    },
    featured: true,
  },
  {
    slug: "maga-harunu-paadama",
    title: "Maga Harunu Paadama",
    resultLine: "A child-safety education platform that replaced fragmented outreach with one digital hub.",
    tags: ["Web", "Education"],
    kind: "client",
    visual: "mhp",
    meta: {
      client: "Maga Harunu Paadama",
      year: "2025",
      scope: "Web development",
      live: { label: "magaharunupaadama.com", href: "https://magaharunupaadama.com" },
    },
    brief:
      "Maga Harunu Paadama is a child-focused safety initiative in Sri Lanka. Guidance and resources were spread across ad-hoc channels with no central, always-on place for schools, parents, or staff to find them.",
    images: [
      { caption: "The platform consolidates safety guidance into one always-on hub instead of scattered posts." },
      { caption: "A lightweight CMS lets non-technical staff publish updates without a developer in the loop." },
    ],
    decisions: [
      {
        title: "Plain PHP over a framework",
        body: "The client's hosting and the team's long-term maintenance capacity both pointed away from a heavy framework. We built on PHP and MySQL directly — less fashionable, but something a future maintainer without a JavaScript background can still open and understand.",
      },
      {
        title: "A CMS scoped to one job",
        body: "Rather than a general admin panel, the CMS does exactly one thing: let staff update safety guidance and publish it live. Fewer options meant fewer ways for a non-technical editor to break the page.",
      },
    ],
    outcome: {
      result: "A single secured platform now carries the organisation's safety guidance, live and editable without developer support.",
      quote: {
        text: "This platform changed how we share safety resources. It's fast, secure, and exactly what we needed to reach more families effectively.",
        name: "Chathuranga Rajapaksha",
        role: "Founder, Maga Harunu Paadama",
      },
    },
  },
  {
    slug: "lexora-workspace",
    title: "Lexora Workspace",
    resultLine: "30+ free browser tools for creators, shipped and maintained in-house.",
    tags: ["Product", "Engineering"],
    kind: "product",
    visual: "workspace",
    meta: {
      client: "In-house product",
      year: "2024 — present",
      scope: "Product design · Engineering",
      live: { label: "apps.lexoratech.com", href: "https://apps.lexoratech.com" },
    },
    brief:
      "Creators and developers reach for a dozen different single-purpose sites — an image compressor here, a PDF tool there, most asking for an account or an upload to a stranger's server. We wanted one place that asked for neither.",
    images: [
      { caption: "Tools are grouped by workflow — Design, Video, Audio, Developer, Utilities, Career — not alphabetically." },
      { caption: "Every tool runs in the browser. No sign-up, no file leaves the device." },
    ],
    decisions: [
      {
        title: "Client-side processing, no exceptions",
        body: "Every tool — image compression, background removal, PDF editing — runs locally in the browser. That ruled out several easier server-side implementations, but it means a user's files never touch our infrastructure.",
      },
      {
        title: "Free, with no gated tier",
        body: "We considered a freemium split early on and dropped it. A tool suite people can't trust to stay free doesn't build the habit we wanted — daily, no-thought reach-for-it usage.",
      },
    ],
    outcome: {
      result: "34+ tools live, used daily by creators with zero sign-up friction.",
    },
    featured: true,
  },
  {
    slug: "lexora-store",
    title: "Lexora Store",
    resultLine: "Island-wide e-commerce for tech gear, built and run by the same team that builds client products.",
    tags: ["Product", "E-commerce"],
    kind: "product",
    visual: "store",
    meta: {
      client: "In-house product",
      year: "2024 — present",
      scope: "Product design · Engineering · Fulfilment",
      live: { label: "lexoratech.store", href: "https://lexoratech.store" },
    },
    brief:
      "Sri Lanka's tech accessories market ran through a handful of aging storefronts. We built a faster, cleaner one — and used it to prove out the same commerce patterns we now ship for retail clients.",
    images: [
      { caption: "Featured picks refresh daily instead of sitting static on the homepage." },
      { caption: "Categories are scoped tight — tech accessories, office essentials, paper — not a general marketplace." },
    ],
    decisions: [
      {
        title: "Narrow catalog on purpose",
        body: "We turned down requests to list unrelated categories early on. A tight, curated catalog loads faster and converts better than a wide one — a lesson we now carry into every e-commerce build for clients.",
      },
      {
        title: "Built as a live testbed",
        body: "New checkout flows and performance techniques ship here first, under real transaction volume, before we recommend them to a client.",
      },
    ],
    outcome: {
      result: "Island-wide delivery running on infrastructure now reused across client commerce builds.",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacent(slug: string) {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];
  return next;
}

export function getFeaturedCaseStudies() {
  return caseStudies.filter((c) => c.featured);
}
