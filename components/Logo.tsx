import { siteConfig } from "@/app/site-config";
import { cn } from "./ui";

/**
 * The LexoraTech "L" mark, reconstructed as pure geometry so it stays sharp at
 * any size, inherits `currentColor`, and costs no network request.
 *
 * To use the official artwork instead, drop `lexoratech-mark.svg` into
 * `public/brand/` and swap this <svg> for an <Image>. See README.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M0 0
           A29.3 29.3 0 0 1 29.3 29.3
           L29.3 57.6
           A14 14 0 0 0 43.3 71.6
           L71.6 71.6
           A28.4 28.4 0 0 1 100 100
           L29.3 100
           A29.3 29.3 0 0 1 0 70.7
           Z"
      />
    </svg>
  );
}

/**
 * Mark + wordmark lockup. `tagline` shows the studio slogan beneath — used in
 * the footer only, never in the nav, where it would compete with the H1.
 */
export function Logo({
  className,
  tagline = false,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-[1.15em] w-[1.15em] shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">
          {siteConfig.wordmark}
        </span>
        {tagline && (
          <span className="mt-1 text-[0.6875rem] font-normal tracking-[0.01em] text-faint">
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
