import { Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/app/site-config";

export function Footer() {
  return (
    <footer className="px-6 py-14 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a
            href="#top"
            className="rounded text-sm font-semibold tracking-[0.14em] text-paper"
          >
            {siteConfig.company}
          </a>
          <p className="mt-3 text-sm text-muted">{siteConfig.locationLine}</p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-1 inline-block rounded text-sm text-muted transition-colors duration-150 hover:text-paper"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.company} on LinkedIn`}
            className="rounded p-2 text-muted transition-colors duration-150 hover:text-paper"
          >
            <Linkedin size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.company} on GitHub`}
            className="rounded p-2 text-muted transition-colors duration-150 hover:text-paper"
          >
            <Github size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-hairline pt-6">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.company}
        </p>
      </div>
    </footer>
  );
}
