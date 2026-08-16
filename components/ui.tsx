import type { ReactNode } from "react";

export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ── Section shell ────────────────────────────────────────────────────────── */

export function Section({
  id,
  children,
  className,
  label,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("px-6 py-16 sm:px-8 md:py-32", className)}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "heading-tight max-w-[22ch] text-3xl leading-[1.1] text-balance sm:text-4xl md:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────────────── */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded font-medium transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

  const variants = {
    primary: "bg-accent text-ink hover:bg-[#6bc490]",
    secondary:
      "border border-hairline bg-transparent text-paper hover:bg-white/[0.06]",
  } as const;

  const sizes = {
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-[0.95rem]",
  } as const;

  return (
    <a
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/* ── Placeholder screenshot block ─────────────────────────────────────────── */

/**
 * Solid dark block with a hairline border and a centered filename label.
 * Swap for `next/image` once real screenshots exist — see README.
 */
export function ScreenshotPlaceholder({
  filename,
  alt,
}: {
  filename: string;
  alt: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="dot-grid flex aspect-[16/10] w-full items-center justify-center rounded border border-hairline bg-surface shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]"
    >
      <span className="rounded border border-hairline bg-ink/70 px-3 py-1.5 font-mono text-[0.7rem] text-muted">
        {filename}
      </span>
    </div>
  );
}
