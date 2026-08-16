"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Logo } from "./Logo";
import { cn } from "./ui";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the full-screen mobile menu; Escape closes it.
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
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled && !open
          ? "border-b border-line bg-ink/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-shell items-center justify-between px-6 sm:px-8"
      >
        <a href="#top" className="rounded-sm" aria-label={`${siteConfig.company} — home`}>
          <Logo />
        </a>

        <div className="hidden items-center gap-9 md:flex">
          <ul className="flex items-center gap-8">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-sm text-[0.875rem] tracking-[-0.006em] text-muted transition-colors duration-150 hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center rounded bg-paper px-4 text-[0.8125rem] font-medium tracking-[-0.011em] text-ink transition-colors duration-150 hover:bg-white"
          >
            Book a call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 rounded-sm p-2 text-paper md:hidden"
        >
          {open ? (
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-40 flex flex-col bg-ink px-6 pb-10 pt-4 md:hidden"
        >
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-5 text-xl tracking-[-0.025em] text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-8 flex h-12 items-center justify-center rounded bg-paper text-[0.9375rem] font-medium text-ink"
          >
            Book a 30-min call
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 rounded-sm py-2 text-center t-small text-muted"
          >
            {siteConfig.email}
          </a>
        </div>
      )}
    </header>
  );
}
