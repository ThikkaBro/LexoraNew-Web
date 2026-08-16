import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <Section id="process" labelledBy="process-heading">
      <Reveal>
        <Eyebrow>How we work</Eyebrow>
        <SectionHeading id="process-heading">
          You always know the price, the date, and where it stands.
        </SectionHeading>
      </Reveal>

      <ol className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.process.map((step, i) => (
          <Reveal
            as="li"
            key={step.step}
            index={i}
            className="border-t border-line-strong pt-6"
          >
            <p className="tabular t-micro text-faint">{step.step}</p>
            <h3 className="t-h3 mt-5 text-[1.0625rem]">{step.title}</h3>
            <p className="mt-2.5 text-[0.8125rem] leading-[1.6] text-muted">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
