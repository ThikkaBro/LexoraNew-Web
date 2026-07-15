import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { pillars } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design, build, and grow — the three pillars LexoraTech works in, expanded with deliverables and proof.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="One team, the whole arc."
        lede="Most projects die in the handoffs — between the brand agency, the dev shop, and the marketing team. We removed the handoffs. No pricing here — the contact form qualifies budget."
      />
      {pillars.map((pillar, i) => (
        <Section key={pillar.number} className={i === 0 ? "" : "border-t border-line"}>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <span className="text-eyebrow mb-6 block">{pillar.number}</span>
              </Reveal>
              <Reveal index={1} as="h2" className="text-h2 mb-4">
                {pillar.name}
              </Reveal>
              <Reveal index={2}>
                <p className="text-body text-[15px]">{pillar.description}</p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal index={1}>
                <p className="text-meta mb-3">Deliverables</p>
              </Reveal>
              <Reveal index={2} as="ul" className="text-body mb-8 flex flex-col gap-2">
                {pillar.deliverables.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-accent">—</span>
                    {item}
                  </li>
                ))}
              </Reveal>
              <Reveal index={3}>
                <p className="text-body mb-8 text-[15px] text-text-meta">{pillar.goodFit}</p>
              </Reveal>
              <Reveal index={4}>
                <Link href={pillar.proof.href} className="link-reveal text-button text-accent">
                  {pillar.proof.label} →
                </Link>
              </Reveal>
            </div>
          </div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
