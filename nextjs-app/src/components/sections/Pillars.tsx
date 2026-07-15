import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "@/lib/services";

export function Pillars() {
  return (
    <Section>
      <Reveal>
        <p className="text-eyebrow mb-4">What we do</p>
      </Reveal>
      <Reveal index={1} as="h2" className="text-h2 mb-6 max-w-2xl">
        One team, the whole arc.
      </Reveal>
      <Reveal index={2}>
        <p className="text-body mb-16">
          Most projects die in the handoffs — between the brand agency, the
          dev shop, and the marketing team. We removed the handoffs.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.number} index={i} className="border-t border-line pt-8">
            <span className="text-eyebrow mb-6 block">{pillar.number}</span>
            <h3 className="text-h3 mb-3">{pillar.name}</h3>
            <p className="text-body mb-4 text-[15px]">{pillar.description}</p>
            <p className="text-meta mb-6">{pillar.includes.join(" · ")}</p>
            <Link
              href={pillar.proof.href}
              className="link-reveal text-button text-accent"
            >
              {pillar.proof.label} →
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
