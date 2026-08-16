import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

/**
 * Native <details>/<summary> accordion — keyboard accessible and screen-reader
 * correct with no JavaScript, which keeps this section off the critical path.
 */
export function Faq() {
  return (
    <Section id="faq" label="Frequently asked questions">
      <div className="grid gap-12 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
        <Reveal>
          <div className="md:sticky md:top-28">
            <Eyebrow>Questions</Eyebrow>
            <SectionHeading className="text-2xl sm:text-3xl md:text-4xl">
              The things buyers actually ask us.
            </SectionHeading>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="border-t border-hairline">
            {siteConfig.faq.map((item) => (
              <details
                key={item.q}
                className="group border-b border-hairline"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[1.0625rem] font-medium text-paper transition-colors duration-150 hover:text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-transform duration-150 group-open:rotate-180"
                  />
                </summary>
                <p className="max-w-prose pb-7 pr-8 text-[0.95rem] leading-[1.65] text-muted">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
