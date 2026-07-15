import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const siteUrl = "https://lexoratech.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LexoraTech — Design, build, and grow, under one team",
    template: "%s — LexoraTech",
  },
  description:
    "LexoraTech is a full-service creative and engineering studio in Sri Lanka. Brand strategy, UI/UX, web and mobile products, POS software, and the marketing that follows.",
  openGraph: {
    title: "LexoraTech — Design, build, and grow, under one team",
    description:
      "Brand strategy, UI/UX, web and mobile products, POS software, and the marketing that follows — one small team that takes ideas from first sketch to real revenue.",
    url: siteUrl,
    siteName: "LexoraTech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LexoraTech — Design, build, and grow, under one team",
    description:
      "Brand strategy, UI/UX, web and mobile products, POS software, and the marketing that follows.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-canvas">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
