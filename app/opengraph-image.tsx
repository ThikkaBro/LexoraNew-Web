import { ImageResponse } from "next/og";
import { siteConfig } from "./site-config";

export const runtime = "edge";
export const alt = `${siteConfig.company} — ${siteConfig.hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time — no external image assets, no stock photography. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0B",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.14em",
            color: "#FAFAFA",
            fontWeight: 600,
          }}
        >
          {siteConfig.company}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#FAFAFA",
            fontWeight: 600,
            maxWidth: 900,
          }}
        >
          {siteConfig.hero.headline}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#A1A1AA" }}>
          {siteConfig.offer.title} — {siteConfig.offer.price}{" "}
          {siteConfig.offer.priceNote}
        </div>
      </div>
    ),
    size,
  );
}
