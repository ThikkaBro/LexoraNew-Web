import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

export function Process() {
  return (
    <Section id="process" label="How we work">
      <Reveal>
        <Eyebrow>How we work</Eyebrow>
        <SectionHeading>
          You always know the price, the date, and where it stands.
        </SectionHeading>
      </Reveal>

      <ol className="mt-16 grid gap-px overflow-hidden rounded border border-hairline bg-[rgba(255,255,255,0.08)] md:grid-cols-4">
        {siteConfig.process.map((step, i) => (
          <Reveal as="li" key={step.step} index={i} className="bg-ink p-7">
            <p className="font-mono text-xs text-accent">{step.step}</p>
            <h3 className="mt-4 text-lg font-medium tracking-[-0.01em] text-paper">
              {step.title}
            </h3>
            <p className="mt-2.5 text-sm leading-[1.6] text-muted">
              {step.body}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
