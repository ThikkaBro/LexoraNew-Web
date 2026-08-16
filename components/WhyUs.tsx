import { Check, Minus } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading, Standfirst } from "./ui";
import { Reveal } from "./Reveal";

/**
 * Two-column comparison. Built as a <dl> rather than a <table> so it can
 * genuinely reflow: each row is a self-contained card on mobile, and
 * `lg:contents` dissolves the wrapper on desktop so the dt/dd land directly
 * in the grid. No horizontal scrolling, no duplicated markup.
 */
export function WhyUs() {
  const { whyUs } = siteConfig;

  return (
    <Section id="why-us" labelledBy="why-us-heading">
      <Reveal>
        <Eyebrow>{whyUs.eyebrow}</Eyebrow>
        <SectionHeading id="why-us-heading" className="max-w-[24ch]">
          {whyUs.heading}
        </SectionHeading>
        <Standfirst>{whyUs.standfirst}</Standfirst>
      </Reveal>

      <Reveal index={1}>
        <dl className="mt-14 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* Column headers — desktop only; on mobile each cell is labelled. */}
          <div className="hidden lg:contents">
            <div aria-hidden="true" className="border-b border-line-strong" />
            <div className="border-b border-line-strong bg-surface px-6 py-4">
              <p className="t-micro text-accent">{whyUs.columns.ours}</p>
            </div>
            <div className="border-b border-line-strong px-6 py-4">
              <p className="t-micro text-faint">{whyUs.columns.theirs}</p>
            </div>
          </div>

          {whyUs.rows.map((row) => (
            <div
              key={row.label}
              className="mb-8 rounded-2xl border border-line lg:mb-0 lg:contents"
            >
              <dt className="border-b border-line px-5 py-4 text-[0.9375rem] font-medium tracking-[-0.012em] text-paper lg:border-line/70 lg:px-0 lg:py-6 lg:pr-8">
                {row.label}
              </dt>

              <dd className="border-b border-line bg-surface px-5 py-4 lg:border-line/70 lg:px-6 lg:py-6">
                <p className="t-micro mb-2 text-accent lg:hidden">
                  {whyUs.columns.ours}
                </p>
                <div className="flex gap-2.5">
                  <Check
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="mt-[3px] shrink-0 text-accent"
                  />
                  <span className="text-[0.8125rem] leading-[1.6] text-paper/90">
                    {row.ours}
                  </span>
                </div>
              </dd>

              <dd className="px-5 py-4 lg:border-b lg:border-line/70 lg:px-6 lg:py-6">
                <p className="t-micro mb-2 text-faint lg:hidden">
                  {whyUs.columns.theirs}
                </p>
                <div className="flex gap-2.5">
                  <Minus
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="mt-[3px] shrink-0 text-faint"
                  />
                  <span className="text-[0.8125rem] leading-[1.6] text-muted">
                    {row.theirs}
                  </span>
                </div>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-prose text-[0.8125rem] leading-relaxed text-faint">
          {whyUs.footnote}
        </p>
      </Reveal>
    </Section>
  );
}
