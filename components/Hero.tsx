import { siteConfig } from "@/app/site-config";
import { withAvailabilityMonth } from "@/lib/site-date";
import { ButtonLink } from "./ui";
import { Reveal } from "./Reveal";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-16 pt-24 sm:px-8"
    >
      {/* Fine dot grid, faded out toward the edges. Decorative, no colour. */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_55%_45%_at_50%_42%,black,transparent)]"
      />
      {/* A single hairline horizon under the fold, the only other mark. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />

      <div className="relative mx-auto w-full max-w-3xl text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[0.75rem] tracking-[-0.006em] text-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {withAvailabilityMonth(hero.pill)}
          </p>
        </Reveal>

        <Reveal index={1}>
          <h1 id="hero-heading" className="t-display mt-8 text-balance">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal index={2}>
          <p className="t-lead mx-auto mt-7 max-w-[44ch] text-balance text-muted">
            {hero.subhead}
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={siteConfig.bookingUrl} size="lg" external>
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="#work" variant="secondary" size="lg">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal index={4}>
          <ul className="mt-12 flex flex-col items-center justify-center gap-2 text-[0.8125rem] text-faint sm:flex-row sm:gap-0">
            {hero.trust.map((item, i) => (
              <li key={item} className="flex items-center">
                {i > 0 && (
                  <span aria-hidden="true" className="mx-3 hidden sm:inline">
                    ·
                  </span>
                )}
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
