import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "./site-config";
import { Assistant } from "@/components/assistant/Assistant";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const { domain, company, seo } = siteConfig;

export const metadata: Metadata = {
  metadataBase: new URL(domain),
  title: {
    default: seo.title,
    template: `%s — ${company}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: company,
  category: "technology",
  authors: [{ name: company, url: domain }],
  creator: company,
  publisher: company,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    /* One English page serving several English-speaking markets. x-default
       catches everything else so no market gets excluded from the index. */
    languages: {
      "x-default": "/",
      en: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    /* Signals to crawlers that this page is intended for these markets too. */
    alternateLocale: ["en_GB", "en_AU", "en_CA", "en_IE", "en_NZ"],
    url: domain,
    siteName: company,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

/**
 * Regenerate every page once a day.
 *
 * This is what keeps the hero's availability month and the footer's copyright
 * year current. Without it both are frozen at whatever they were when the site
 * was last deployed, because static pages run their code exactly once, at
 * build time. Applies to every route beneath this layout.
 *
 * Pages remain static and CDN-cached — this costs one regeneration per page
 * per day, not one per visitor, and changes nothing a Lighthouse run measures.
 */
export const revalidate = 86400;

export const viewport: Viewport = {
  themeColor: "#08090A",
  colorScheme: "dark",
};

/* ── Structured data ────────────────────────────────────────────────────────
   One @graph with cross-referenced @ids beats several disconnected blocks:
   search engines can resolve the organisation, the site, the service catalogue,
   the people and the FAQ as a single entity graph. */

const orgId = `${domain}/#organization`;
const siteId = `${domain}/#website`;
const pageId = `${domain}/#webpage`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": orgId,
      name: company,
      legalName: siteConfig.legalName,
      alternateName: siteConfig.tagline,
      slogan: siteConfig.tagline,
      description: seo.description,
      url: domain,
      email: siteConfig.email,
      logo: {
        "@type": "ImageObject",
        url: `${domain}/brand/lexoratech-mark.svg`,
        caption: `${company} logo`,
      },
      image: `${domain}/opengraph-image`,
      foundingDate: siteConfig.foundingDate,
      numberOfEmployees: { "@type": "QuantitativeValue", value: 2 },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Colombo",
        addressCountry: "LK",
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Netherlands" },
      ],
      knowsAbout: [...seo.keywords],
      /* Explicit contact point with the languages and hours a foreign buyer
         cares about. Also feeds Google's knowledge panel. */
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        url: siteConfig.bookingUrl,
        availableLanguage: ["en", "si"],
        areaServed: ["US", "GB", "AU", "NL", "CA", "IE", "NZ", "EU"],
      },
      sameAs: [
        siteConfig.social.linkedin,
        siteConfig.social.github,
        /* Our own products, so search engines connect the three domains
           in both directions rather than only via `owns`. */
        ...siteConfig.products.map((p) => p.url),
      ],
      founder: siteConfig.about.team.map((p) => ({
        "@type": "Person",
        name: p.name,
        jobTitle: p.role,
        description: p.bio,
        worksFor: { "@id": orgId },
        /* The personal domain is the canonical page for the person; the
           profiles alongside it are what let Google resolve them as one
           entity across sites. */
        url: p.links.website,
        sameAs: [p.links.linkedin, p.links.github, p.links.website],
      })),
      makesOffer: {
        "@type": "Offer",
        name: siteConfig.offer.title,
        description: siteConfig.offer.description,
        price: "1500",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        seller: { "@id": orgId },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services",
        itemListElement: siteConfig.services.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.body,
            provider: { "@id": orgId },
          },
        })),
      },
      /* Our own products, declared as owned SoftwareApplications. This is what
         ties lexoratech.com, apps.lexoratech.com and nimithi.com together as
         one entity for search engines instead of three unrelated domains. */
      owns: siteConfig.products.map((p) => ({
        "@type": "SoftwareApplication",
        name: p.name,
        description: p.description,
        url: p.url,
        applicationCategory: p.category,
        operatingSystem: "Web browser",
        author: { "@id": orgId },
        publisher: { "@id": orgId },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: domain,
      name: company,
      description: seo.description,
      publisher: { "@id": orgId },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: domain,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": siteId },
      about: { "@id": orgId },
      inLanguage: "en",
      primaryImageOfPage: `${domain}/opengraph-image`,
    },
    {
      "@type": "FAQPage",
      "@id": `${domain}/#faq`,
      isPartOf: { "@id": pageId },
      mainEntity: siteConfig.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>
        {children}
        {/* Lazy-loaded chat assistant. Ships a button; the panel is a separate
            chunk fetched on demand. See components/assistant/Assistant.tsx. */}
        <Assistant />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
