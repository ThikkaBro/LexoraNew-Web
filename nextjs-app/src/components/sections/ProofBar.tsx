import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies } from "@/lib/work";

export function ProofBar() {
  return (
    <Section>
      <Reveal>
        <p className="text-eyebrow mb-8">Selected work</p>
      </Reveal>
      <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
        {caseStudies.map((study, i) => (
          <Reveal key={study.slug} index={i}>
            <Link
              href={`/work/${study.slug}`}
              className="link-reveal text-h3 text-text-body hover:text-text-high"
            >
              {study.title}
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
