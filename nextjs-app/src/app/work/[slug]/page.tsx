import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { VisualMockup } from "@/components/mockups";
import { CtaBand } from "@/components/sections/CtaBand";
import { caseStudies, getCaseStudy, getAdjacent } from "@/lib/work";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.resultLine,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = getAdjacent(study.slug);

  return (
    <>
      {/* 1. Hero */}
      <Section padBottom={false} className="pt-16 sm:pt-20">
        <Reveal>
          <p className="text-eyebrow mb-6">{study.tags.join(" · ")}</p>
        </Reveal>
        <Reveal index={1} as="h1" className="text-display mb-10 max-w-3xl">
          {study.resultLine}
        </Reveal>
        <Reveal index={2}>
          <BrowserFrame url={study.meta.live?.label}>
            <VisualMockup kind={study.visual} />
          </BrowserFrame>
        </Reveal>
      </Section>

      {/* 2. Meta row */}
      <Section padBottom={false}>
        <Reveal className="flex flex-wrap gap-x-10 gap-y-3 border-y border-line py-6 font-[var(--font-jetbrains)] text-[13px] text-text-meta">
          <span>{study.meta.client}</span>
          <span>{study.meta.year}</span>
          <span>{study.meta.scope}</span>
          {study.meta.live && (
            <a
              href={study.meta.live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-reveal text-accent"
            >
              {study.meta.live.label} ↗
            </a>
          )}
        </Reveal>
      </Section>

      {/* 3. The brief */}
      <Section padBottom={false}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <p className="text-eyebrow">The brief</p>
          </Reveal>
          <Reveal index={1} className="lg:col-span-7">
            <p className="text-lede">{study.brief}</p>
          </Reveal>
        </div>
      </Section>

      {/* 4. The work */}
      <Section>
        <Reveal>
          <p className="text-eyebrow mb-6">The work</p>
        </Reveal>
        <Reveal index={1} className="mb-10">
          <BrowserFrame url={study.meta.live?.label}>
            <VisualMockup kind={study.visual} />
          </BrowserFrame>
        </Reveal>
        <div className="flex flex-col gap-4">
          {study.images.map((image, i) => (
            <Reveal key={image.caption} index={i + 2} className="flex gap-4 border-t border-line pt-4 first:border-t-0 first:pt-0">
              <span className="text-eyebrow shrink-0">{`0${i + 1}`}</span>
              <p className="text-meta">{image.caption}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Key decisions */}
      <Section className="border-t border-line">
        <Reveal>
          <p className="text-eyebrow mb-10">Key decisions</p>
        </Reveal>
        <div className="flex flex-col gap-10">
          {study.decisions.map((decision, i) => (
            <Reveal key={decision.title} index={i} className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              <h3 className="text-h3 lg:col-span-4">{decision.title}</h3>
              <p className="text-body lg:col-span-7">{decision.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6. Outcome */}
      <Section className="border-t border-line">
        <Reveal>
          <p className="text-eyebrow mb-6">Outcome</p>
        </Reveal>
        <Reveal index={1} as="p" className="text-lede mb-10 max-w-2xl">
          {study.outcome.result}
        </Reveal>
        {study.outcome.quote && (
          <Reveal index={2} className="max-w-2xl border-l-2 border-accent pl-8">
            <p className="text-h3 mb-6 font-normal">
              &ldquo;{study.outcome.quote.text}&rdquo;
            </p>
            <p className="text-meta">
              {study.outcome.quote.name} — {study.outcome.quote.role}
            </p>
          </Reveal>
        )}
      </Section>

      {/* 7. Next project */}
      <Link
        href={`/work/${next.slug}`}
        className="card-hover group block border-t border-line"
      >
        <Container className="flex items-center justify-between py-16">
          <div>
            <p className="text-eyebrow mb-4">Next case study</p>
            <span className="text-h2">{next.title}</span>
          </div>
          <span className="text-h2 text-text-meta transition-transform group-hover:translate-x-2">
            →
          </span>
        </Container>
      </Link>

      <CtaBand />
    </>
  );
}
