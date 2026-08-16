import { Check } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { ButtonLink, Section } from "./ui";
import { Reveal } from "./Reveal";

export function Offer() {
  const { offer } = siteConfig;

  return (
    <Section id="offer" label="Our entry offer" className="py-12 md:py-20">
      <Reveal>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded border border-accent/25 bg-surface p-8 sm:p-12">
          {/* A single soft wash so this card reads as the most important block. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(125,211,160,0.12),transparent_70%)]"
          />

          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {offer.label}
            </p>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <h2 className="heading-tight text-3xl sm:text-4xl">
                {offer.title}
              </h2>
              <p className="text-3xl font-semibold tracking-[-0.03em] text-accent sm:text-4xl">
                {offer.price}
                <span className="ml-2 text-sm font-normal tracking-normal text-muted">
                  {offer.priceNote}
                </span>
              </p>
            </div>

            <p className="mt-5 max-w-prose text-[1.0625rem] leading-[1.6] text-muted">
              {offer.description}
            </p>

            <ul className="mt-8 space-y-3.5">
              {offer.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <Check
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <span className="text-[0.95rem] leading-[1.6] text-paper/90">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
              <ButtonLink href={siteConfig.calendly} size="lg" external>
                {offer.cta}
              </ButtonLink>
              <p className="max-w-[34ch] text-sm leading-relaxed text-muted">
                {offer.guarantee}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
