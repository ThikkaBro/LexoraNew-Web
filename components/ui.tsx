import type { ReactNode } from "react";

export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ── Section shell ────────────────────────────────────────────────────────── */

/**
 * Every section shares one container and one vertical rhythm. `divider` draws
 * the hairline that separates sections — structure comes from the rules and the
 * whitespace, not from boxing each block in a card.
 */
export function Section({
  id,
  children,
  className,
  labelledBy,
  divider = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(divider && "border-t border-line", className)}
    >
      <div className="mx-auto w-full max-w-shell px-6 py-20 sm:px-8 md:py-section">
        {children}
      </div>
    </section>
  );
}

/** Small caps label above a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="t-micro mb-6 text-faint">{children}</p>;
}

export function SectionHeading({
  children,
  id,
  className,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h2 id={id} className={cn("t-h2 max-w-[20ch] text-balance", className)}>
      {children}
    </h2>
  );
}

/** Standfirst paragraph under a section heading. */
export function Standfirst({ children }: { children: ReactNode }) {
  return (
    <p className="t-lead mt-5 max-w-[52ch] text-pretty text-muted">{children}</p>
  );
}

/* ── Buttons ──────────────────────────────────────────────────────────────── */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  className?: string;
};

/**
 * Primary is near-white on near-black. A single high-contrast surface reads as
 * more considered than a coloured button, and keeps the one accent free for the
 * proof numbers.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded font-medium tracking-[-0.011em] transition-colors duration-150 ease-out";

  const variants = {
    primary: "bg-paper text-ink hover:bg-white",
    secondary:
      "border border-line-strong text-paper hover:border-white/25 hover:bg-white/[0.04]",
  } as const;

  const sizes = {
    sm: "h-9 px-4 text-[0.8125rem]",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-6 text-[0.9375rem]",
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
 * Solid dark panel with a hairline border and a centered filename label.
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
      className="lit-edge flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-line bg-surface"
    >
      <span className="rounded-sm border border-line px-2.5 py-1 font-mono text-[0.6875rem] text-faint">
        {filename}
      </span>
    </div>
  );
}
