import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.company} — ${siteConfig.tagline}`,
    short_name: siteConfig.seo.shortTitle,
    description: siteConfig.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#08090A",
    theme_color: "#08090A",
    icons: [
      {
        src: "/brand/lexoratech-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
