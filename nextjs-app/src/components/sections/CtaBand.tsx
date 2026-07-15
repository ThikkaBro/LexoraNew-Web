import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <Section className="border-t border-line text-center">
      <Reveal as="h2" className="text-h2 mb-4">
        Tell us what you&apos;re building.
      </Reveal>
      <Reveal index={1}>
        <p className="text-lede mb-10">
          We reply within one business day — usually faster.
        </p>
      </Reveal>
      <Reveal index={2} className="flex flex-col items-center gap-6">
        <Button href="/contact">Start a project</Button>
        <a
          href="mailto:hello@lexoratech.com"
          className="link-reveal font-[var(--font-jetbrains)] text-[13px] tracking-[0.04em] text-text-meta hover:text-text-high"
        >
          hello@lexoratech.com
        </a>
      </Reveal>
    </Section>
  );
}
