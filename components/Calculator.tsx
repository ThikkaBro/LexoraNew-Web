"use client";

import { useId, useMemo, useState } from "react";
import { siteConfig } from "@/app/site-config";
import { ButtonLink, Eyebrow, Section, SectionHeading, Standfirst } from "./ui";
import { Reveal } from "./Reveal";

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
}) {
  const id = useId();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.8125rem] text-muted">
          {label}
        </label>
        <span className="tabular text-[0.9375rem] font-medium text-paper">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-input mt-3 w-full"
      />
    </div>
  );
}

export function Calculator() {
  const { calculator, offer } = siteConfig;
  const { fields } = calculator;

  const [hours, setHours] = useState<number>(fields.hours.initial);
  const [people, setPeople] = useState<number>(fields.people.initial);
  const [rate, setRate] = useState<number>(fields.rate.initial);

  const { annual, payback } = useMemo(() => {
    const annualCost = hours * people * rate * calculator.workingWeeks;
    // Conservative on purpose — we only count half the time as recoverable.
    const dailySaving = annualCost / 2 / calculator.workingDays;
    return {
      annual: annualCost,
      payback: dailySaving > 0 ? offer.priceValue / dailySaving : Infinity,
    };
  }, [hours, people, rate, calculator, offer.priceValue]);

  const paybackText =
    payback < 1
      ? "under a working day"
      : `${Math.ceil(payback)} working day${Math.ceil(payback) === 1 ? "" : "s"}`;

  return (
    <Section id="calculator" labelledBy="calculator-heading">
      <Reveal>
        <Eyebrow>{calculator.eyebrow}</Eyebrow>
        <SectionHeading id="calculator-heading" className="max-w-[22ch]">
          {calculator.heading}
        </SectionHeading>
        <Standfirst>{calculator.standfirst}</Standfirst>
      </Reveal>

      <Reveal index={1}>
        <div className="lit-edge mt-14 grid overflow-hidden rounded-2xl border border-line-strong bg-surface md:grid-cols-2">
          {/* Controls */}
          <div className="grid gap-8 border-b border-line p-7 sm:p-10 md:border-b-0 md:border-r">
            <Slider
              label={fields.hours.label}
              value={hours}
              onChange={setHours}
              min={fields.hours.min}
              max={fields.hours.max}
              step={fields.hours.step}
              display={`${hours} ${fields.hours.suffix}`}
            />
            <Slider
              label={fields.people.label}
              value={people}
              onChange={setPeople}
              min={fields.people.min}
              max={fields.people.max}
              step={fields.people.step}
              display={`${people}`}
            />
            <Slider
              label={fields.rate.label}
              value={rate}
              onChange={setRate}
              min={fields.rate.min}
              max={fields.rate.max}
              step={fields.rate.step}
              display={`${fields.rate.prefix}${rate}/hr`}
            />
          </div>

          {/* Result */}
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="t-micro text-faint">{calculator.resultLabel}</p>

            {/* aria-live so the figure is announced as the sliders move. */}
            <output
              aria-live="polite"
              className="tabular mt-4 block text-[clamp(2.25rem,7vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-accent"
            >
              {money(annual)}
            </output>
            <p className="mt-2 text-[0.8125rem] text-muted">
              {calculator.resultSuffix}
            </p>

            <p className="t-small mt-8 border-t border-line pt-6 text-muted">
              {calculator.paybackLead}{" "}
              <span className="text-paper">
                {offer.title} {calculator.paybackTail} {paybackText}
              </span>
              .
            </p>

            <div className="mt-7">
              <ButtonLink href={siteConfig.bookingUrl} external>
                {calculator.cta}
              </ButtonLink>
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-prose text-[0.75rem] leading-relaxed text-faint">
          {calculator.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
