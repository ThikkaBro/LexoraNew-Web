import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "./site-config";
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
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
      sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
      founder: siteConfig.about.team.map((p) => ({
        "@type": "Person",
        name: p.name,
        jobTitle: p.role,
        description: p.bio,
        worksFor: { "@id": orgId },
        sameAs: [p.links.linkedin, p.links.github],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
