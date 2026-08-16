import { siteConfig } from "@/app/site-config";
import { ButtonLink } from "./ui";
import { Reveal } from "./Reveal";

export function Hero() {
  const { hero } = siteConfig;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-14 pt-24 sm:px-8"
    >
      {/* Faint dot grid, faded out toward the edges. Decorative only. */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(125,211,160,0.09),transparent_65%)] blur-2xl"
      />

      <div className="relative mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded border border-hairline px-3 py-1.5 text-xs text-muted">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            {hero.pill}
          </p>
        </Reveal>

        <Reveal index={1}>
          <h1 className="heading-tight mt-8 text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[1.02]">
            {hero.headline}
          </h1>
        </Reveal>

        <Reveal index={2}>
          <p className="mx-auto mt-7 max-w-[46ch] text-balance text-lg leading-[1.6] text-muted">
            {hero.subhead}
          </p>
        </Reveal>

        <Reveal index={3}>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={siteConfig.calendly} size="lg" external>
              {hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="#work" variant="secondary" size="lg">
              {hero.secondaryCta}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal index={4}>
          <p className="mx-auto mt-10 max-w-[52ch] text-sm leading-relaxed text-muted/80">
            {hero.trustRow}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
