import { Check } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { ButtonLink, Section } from "./ui";
import { Reveal } from "./Reveal";

export function Offer() {
  const { offer } = siteConfig;

  return (
    <Section id="offer" labelledBy="offer-heading">
      <Reveal>
        <div className="lit-edge mx-auto max-w-3xl rounded-2xl border border-line-strong bg-surface">
          <div className="border-b border-line px-7 py-7 sm:px-10 sm:py-9">
            <p className="t-micro text-accent">{offer.label}</p>

            <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
              <h2 id="offer-heading" className="t-h2">
                {offer.title}
              </h2>
              <p className="flex items-baseline gap-2">
                <span className="tabular text-[2.25rem] font-semibold leading-none tracking-[-0.04em]">
                  {offer.price}
                </span>
                <span className="t-small text-muted">{offer.priceNote}</span>
              </p>
            </div>

            <p className="t-body mt-5 max-w-prose text-muted">
              {offer.description}
            </p>
          </div>

          <ul className="grid gap-3.5 px-7 py-8 sm:px-10">
            {offer.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <Check
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-paper"
                />
                <span className="t-small text-paper/85">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-5 border-t border-line px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <ButtonLink href={siteConfig.bookingUrl} size="lg" external>
              {offer.cta}
            </ButtonLink>
            <p className="max-w-[36ch] text-[0.8125rem] leading-relaxed text-faint">
              {offer.guarantee}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
