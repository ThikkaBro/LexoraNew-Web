import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Monochrome ground. Everything is greyscale except `accent`,
           which appears on exactly four elements across the whole page. */
        ink: "#08090A",
        surface: "#0D0E10",
        raised: "#121316",
        paper: "#F7F8F8",
        muted: "#8A8F98",
        /* Lightest text tone on the page. Held at 4.75:1 against `ink` so
           11–13px labels still clear WCAG AA. Do not darken this. */
        faint: "#787D87",
        accent: "#7EA6FF",
        line: "rgba(255,255,255,0.07)",
        "line-strong": "rgba(255,255,255,0.13)",
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "8px",
        xl: "10px",
        "2xl": "12px",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.16em" }],
      },
      maxWidth: {
        prose: "65ch",
        shell: "68rem",
      },
      spacing: {
        section: "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
