import Link from "next/link";
import { Container } from "@/components/ui/Container";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const social = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Lexora-Tech/61573037507493/",
    path: "M13.5 9H15V6.5h-1.5C11.6 6.5 10.5 7.6 10.5 9v1.5H9V13h1.5v6H13v-6h1.7l.3-2.5h-2V9c0-.3.2-.5.5-.5Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lexora_tech/",
    path: "M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm0 6.27a2.47 2.47 0 1 1 0-4.94 2.47 2.47 0 0 1 0 4.94Zm4.85-6.42a.89.89 0 1 1-1.77 0 .89.89 0 0 1 1.77 0ZM19.94 8.5a5.6 5.6 0 0 0-1.53-3.96A5.6 5.6 0 0 0 14.45 3c-1.5-.09-6 -.09-7.5 0a5.6 5.6 0 0 0-3.96 1.53A5.6 5.6 0 0 0 1.46 8.5c-.09 1.5-.09 6 0 7.5a5.6 5.6 0 0 0 1.53 3.96 5.6 5.6 0 0 0 3.96 1.53c1.5.09 6 .09 7.5 0a5.6 5.6 0 0 0 3.96-1.53 5.6 5.6 0 0 0 1.53-3.96c.09-1.5.09-5.99 0-7.5Zm-2 9.13a3.19 3.19 0 0 1-1.8 1.8c-1.24.5-4.19.38-5.64.38s-4.4.12-5.64-.38a3.19 3.19 0 0 1-1.8-1.8C2.56 16.4 2.68 13.44 2.68 12s-.12-4.4.38-5.64a3.19 3.19 0 0 1 1.8-1.8C6.1 4.06 9.05 4.18 10.5 4.18s4.4-.12 5.64.38a3.19 3.19 0 0 1 1.8 1.8c.5 1.24.38 4.19.38 5.64s.12 4.4-.38 5.63Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/Lexora-Tech",
    path: "M6.94 8.5H4.5V19h2.44V8.5ZM5.72 4.5a1.41 1.41 0 1 0 0 2.82 1.41 1.41 0 0 0 0-2.82ZM19.5 19h-2.44v-5.6c0-1.34-.48-2.25-1.68-2.25-.92 0-1.46.62-1.7 1.22-.09.21-.11.51-.11.81V19h-2.44s.03-9.72 0-10.5h2.44v1.49a2.42 2.42 0 0 1 2.2-1.21c1.6 0 2.8 1.05 2.8 3.3V19Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCA-NVZ5FieP8uE1nYyfhRSw",
    path: "M21.6 8.2a2.8 2.8 0 0 0-1.97-2C18.05 5.75 12 5.75 12 5.75s-6.05 0-7.63.45A2.8 2.8 0 0 0 2.4 8.2C2 9.8 2 12 2 12s0 2.2.4 3.8a2.8 2.8 0 0 0 1.97 2c1.58.45 7.63.45 7.63.45s6.05 0 7.63-.45a2.8 2.8 0 0 0 1.97-2c.4-1.6.4-3.8.4-3.8s0-2.2-.4-3.8ZM10 14.7V9.3l5.2 2.7-5.2 2.7Z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-10 py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <span className="text-h3 font-[var(--font-sora)] text-text-high">
            LexoraTech
          </span>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-reveal text-button text-text-body hover:text-text-high"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-text-meta transition-colors hover:text-accent"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-meta md:flex-row md:items-center">
          <p>© 2026 LexoraTech</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-reveal hover:text-text-high">
              Privacy
            </Link>
            <Link href="/terms" className="link-reveal hover:text-text-high">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
