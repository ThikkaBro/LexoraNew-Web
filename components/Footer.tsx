import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { currentYear } from "@/lib/site-date";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-shell px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* The slogan lives here, not in the hero — brand furniture, not
                the value proposition. */}
            <a href="#top" className="rounded-sm" aria-label={`${siteConfig.company} — home`}>
              <Logo tagline />
            </a>
            <p className="mt-6 text-[0.8125rem] text-muted">
              {siteConfig.locationLine}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-1.5 inline-block rounded-sm text-[0.8125rem] text-muted transition-colors duration-150 hover:text-paper"
            >
              {siteConfig.email}
            </a>
          </div>

          <nav aria-label="Footer" className="flex items-center gap-1 sm:-mr-2">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.company} on LinkedIn`}
              className="rounded-sm p-2 text-faint transition-colors duration-150 hover:text-paper"
            >
              <Linkedin size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.company} on GitHub`}
              className="rounded-sm p-2 text-faint transition-colors duration-150 hover:text-paper"
            >
              <Github size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.75rem] text-faint">
            © {currentYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <Link
            href="/privacy"
            className="rounded-sm text-[0.75rem] text-faint transition-colors duration-150 hover:text-paper"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
