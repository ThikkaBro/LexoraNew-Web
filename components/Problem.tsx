import { ArrowLeftRight, FileSearch, MessageSquareWarning } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const icons = {
  ArrowLeftRight,
  FileSearch,
  MessageSquareWarning,
} as const;

export function Problem() {
  const { problem } = siteConfig;

  return (
    <Section id="problem" label="The problem">
      <Reveal>
        <SectionHeading className="max-w-[26ch]">
          {problem.heading}
        </SectionHeading>
        <p className="mt-6 max-w-prose text-[1.0625rem] leading-[1.6] text-muted">
          {problem.body}
        </p>
      </Reveal>

      <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {problem.items.map((item, i) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <Reveal as="li" key={item.title} index={i}>
              <Icon
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-accent"
              />
              <h3 className="mt-4 text-base font-medium text-paper">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-[1.6] text-muted">
                {item.body}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
