import { ArrowLeftRight, FileSearch, MessageSquareWarning } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading, Standfirst } from "./ui";
import { Reveal } from "./Reveal";

const icons = {
  ArrowLeftRight,
  FileSearch,
  MessageSquareWarning,
} as const;

export function Problem() {
  const { problem } = siteConfig;

  return (
    <Section id="problem" labelledBy="problem-heading">
      <Reveal>
        <Eyebrow>{problem.eyebrow}</Eyebrow>
        <SectionHeading id="problem-heading" className="max-w-[24ch]">
          {problem.heading}
        </SectionHeading>
        <Standfirst>{problem.body}</Standfirst>
      </Reveal>

      <ul className="mt-16 grid gap-x-12 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {problem.items.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <Reveal as="li" key={item.title} index={i}>
              <Icon
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-faint"
              />
              <h3 className="t-h3 mt-4">{item.title}</h3>
              <p className="t-small mt-2 max-w-prose text-muted">{item.body}</p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
