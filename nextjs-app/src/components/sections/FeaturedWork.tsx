import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WorkCard } from "@/components/ui/WorkCard";
import { getFeaturedCaseStudies } from "@/lib/work";

export function FeaturedWork() {
  const studies = getFeaturedCaseStudies();

  return (
    <Section>
      <Reveal>
        <p className="text-eyebrow mb-10">Case studies</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {studies.map((study, i) => (
          <Reveal key={study.slug} index={i}>
            <WorkCard study={study} />
          </Reveal>
        ))}
      </div>

      <Reveal index={2} className="mt-12">
        <Button href="/work" variant="ghost">
          All work →
        </Button>
      </Reveal>
    </Section>
  );
}
