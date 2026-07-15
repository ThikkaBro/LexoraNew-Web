import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCard } from "@/components/ui/WorkCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { caseStudies } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from LexoraTech — brand and web builds for Sri Lankan clients, and the products we ship ourselves.",
};

export default function WorkIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="Brand, product, and the software behind them."
        lede="Client builds and the products we ship ourselves — same team, same standard."
      />
      <Section>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} index={i}>
              <WorkCard study={study} />
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
