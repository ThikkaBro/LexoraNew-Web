import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { type ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}) {
  return (
    <Section padBottom={false}>
      <Reveal>
        <p className="text-eyebrow mb-6">{eyebrow}</p>
      </Reveal>
      <Reveal index={1} as="h1" className="text-display mb-6 max-w-3xl">
        {title}
      </Reveal>
      {lede && (
        <Reveal index={2}>
          <p className="text-lede max-w-2xl">{lede}</p>
        </Reveal>
      )}
    </Section>
  );
}
