import { siteConfig } from "@/app/site-config";
import { Eyebrow, ScreenshotPlaceholder, Section, SectionHeading, cn } from "./ui";
import { Reveal } from "./Reveal";

export function CaseStudies() {
  return (
    <Section id="work" label="Selected work">
      <Reveal>
        <Eyebrow>Selected work</Eyebrow>
        <SectionHeading>Three problems, and what we did about them.</SectionHeading>
      </Reveal>

      <div className="mt-20 space-y-24 md:space-y-32">
        {siteConfig.caseStudies.map((study, i) => {
          const imageFirst = i % 2 === 1;

          return (
            <Reveal as="article" key={study.client}>
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <div
                  className={cn(
                    imageFirst ? "md:order-2" : "md:order-1",
                    "order-2",
                  )}
                >
                  <p className="text-sm text-muted">{study.client}</p>

                  <h3 className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    The problem
                  </h3>
                  <p className="mt-2 max-w-prose text-[0.95rem] leading-[1.6] text-paper/90">
                    {study.problem}
                  </p>

                  <h3 className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    What we built
                  </h3>
                  <p className="mt-2 max-w-prose text-[0.95rem] leading-[1.6] text-paper/90">
                    {study.built}
                  </p>

                  <div className="mt-8 border-t border-hairline pt-6">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                      {study.resultLabel}
                    </p>
                    <p className="heading-tight mt-2 text-2xl text-accent sm:text-[1.75rem]">
                      {study.result}
                    </p>
                  </div>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {study.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded border border-hairline px-2.5 py-1 text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={cn(
                    imageFirst ? "md:order-1" : "md:order-2",
                    "order-1",
                  )}
                >
                  <ScreenshotPlaceholder
                    filename={study.image}
                    alt={`Interface screenshot from the ${study.client} project: ${study.built}`}
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
