import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import {
  Eyebrow,
  ScreenshotPlaceholder,
  Section,
  SectionHeading,
  cn,
} from "./ui";
import { Reveal } from "./Reveal";

export function CaseStudies() {
  return (
    <Section id="work" labelledBy="work-heading">
      <Reveal>
        <Eyebrow>{siteConfig.work.eyebrow}</Eyebrow>
        <SectionHeading id="work-heading">
          {siteConfig.work.heading}
        </SectionHeading>
      </Reveal>

      <div className="mt-16 space-y-16 md:mt-20 md:space-y-24">
        {siteConfig.caseStudies.map((study, i) => {
          const imageFirst = i % 2 === 1;
          const image: string = study.image;
          const href: string = study.href;

          return (
            <Reveal
              as="article"
              key={study.title}
              className="border-t border-line pt-12 md:pt-16"
            >
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                <div className={cn("order-2", imageFirst ? "md:order-2" : "md:order-1")}>
                  <p className="t-micro text-faint">{study.client}</p>
                  <h3 className="t-h2 mt-4 max-w-[18ch] text-[1.5rem] sm:text-[1.75rem]">
                    {study.title}
                  </h3>

                  <dl className="mt-7 space-y-5">
                    <div>
                      <dt className="t-micro text-faint">The problem</dt>
                      <dd className="t-small mt-2 max-w-prose text-muted">
                        {study.problem}
                      </dd>
                    </div>
                    <div>
                      <dt className="t-micro text-faint">What we built</dt>
                      <dd className="t-small mt-2 max-w-prose text-muted">
                        {study.built}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8 border-t border-line pt-6">
                    <p className="t-micro text-faint">{study.resultLabel}</p>
                    <p className="tabular mt-3 text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-accent sm:text-[2rem]">
                      {study.result}
                    </p>
                  </div>

                  <ul className="mt-7 flex flex-wrap gap-2" aria-label="Technology used">
                    {study.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-sm border border-line px-2.5 py-1 text-[0.75rem] text-faint"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-1.5 rounded-sm text-[0.8125rem] text-paper underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-paper"
                    >
                      Visit the live site
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>

                <div className={cn("order-1", imageFirst ? "md:order-1" : "md:order-2")}>
                  {image ? (
                    <Image
                      src={`/work/${image}`}
                      alt={`${study.title} — screenshot of the live product. ${study.built}`}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full rounded-2xl border border-line"
                    />
                  ) : (
                    <ScreenshotPlaceholder
                      filename={`${study.client.split(" · ")[0].toLowerCase().replace(/\s+/g, "-")}.png`}
                      alt={`${study.title}. ${study.built}`}
                    />
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
