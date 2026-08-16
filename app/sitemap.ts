import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";

/**
 * Every indexable URL. Case study pages are listed individually — they are
 * the pages that give this site more than one shot at ranking.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteConfig.domain,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...siteConfig.caseStudies.map((s) => ({
      url: `${siteConfig.domain}/work/${s.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteConfig.domain}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
