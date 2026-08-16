import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        surface: "#0E0E10",
        paper: "#FAFAFA",
        muted: "#A1A1AA",
        accent: {
          DEFAULT: "#7DD3A0",
          soft: "rgba(125, 211, 160, 0.12)",
        },
        hairline: "rgba(255,255,255,0.08)",
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "12px",
        xl: "12px",
        "2xl": "12px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};

export default config;
