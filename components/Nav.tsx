"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { cn } from "./ui";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the full-screen mobile menu, and allow Escape to close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-150",
        scrolled && !open
          ? "border-b border-hairline bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8"
      >
        <a
          href="#top"
          className="rounded text-sm font-semibold tracking-[0.14em] text-paper"
        >
          {siteConfig.company}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded text-sm text-muted transition-colors duration-150 hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-accent px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:bg-[#6bc490]"
          >
            Book a Call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 rounded p-2 text-paper md:hidden"
        >
          {open ? (
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-40 flex flex-col bg-ink px-6 pb-10 pt-6 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded py-4 text-2xl heading-tight text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-8 rounded bg-accent px-5 py-4 text-center text-base font-medium text-ink"
          >
            Book a Call
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 rounded py-2 text-center text-sm text-muted"
          >
            {siteConfig.email}
          </a>
        </div>
      )}
    </header>
  );
}
