import { Plus } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

/**
 * Native <details>/<summary> accordion — keyboard accessible and screen-reader
 * correct with no JavaScript, which keeps this section off the critical path.
 */
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <div className="grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-16">
        <Reveal>
          <div className="md:sticky md:top-28">
            <Eyebrow>Questions</Eyebrow>
            <SectionHeading id="faq-heading" className="text-[1.5rem] sm:text-[1.75rem]">
              The things buyers actually ask us.
            </SectionHeading>
          </div>
        </Reveal>

        <Reveal index={1}>
          <div className="border-t border-line">
            {siteConfig.faq.map((item) => (
              <details key={item.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[0.9375rem] font-medium tracking-[-0.012em] text-paper transition-colors duration-150 hover:text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="t-small max-w-prose pb-6 pr-10 text-muted">
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
