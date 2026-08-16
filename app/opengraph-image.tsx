import { ImageResponse } from "next/og";
import { siteConfig } from "./site-config";

export const runtime = "edge";
export const alt = `${siteConfig.company} — ${siteConfig.hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The L mark, inlined as a data URI so the card needs no network asset. */
const mark = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23F7F8F8"><path d="M0 0A29.3 29.3 0 0 1 29.3 29.3L29.3 57.6A14 14 0 0 0 43.3 71.6L71.6 71.6A28.4 28.4 0 0 1 100 100L29.3 100A29.3 29.3 0 0 1 0 70.7Z"/></svg>`,
)}`;

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
          background: "#08090A",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width={30} height={30} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#F7F8F8",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.wordmark}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 66,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            color: "#F7F8F8",
            fontWeight: 600,
            maxWidth: 920,
          }}
        >
          {siteConfig.hero.headline}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#8A8F98" }}>
            {siteConfig.seo.ogSubtitle}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#7EA6FF" }}>
            {siteConfig.offer.price}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
