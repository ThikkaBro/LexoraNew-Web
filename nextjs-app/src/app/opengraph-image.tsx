import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0c10",
          color: "rgba(255,255,255,0.95)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "120px",
            height: "1px",
            marginBottom: "48px",
            background:
              "linear-gradient(90deg, #6366f1, #8b93f8, #a78bfa)",
          }}
        />
        <div style={{ display: "flex", fontSize: 64, fontWeight: 600, marginBottom: "24px" }}>
          LexoraTech
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,0.7)", maxWidth: "820px" }}>
          Design, build, and grow, under one team.
        </div>
      </div>
    ),
    { ...size }
  );
}
