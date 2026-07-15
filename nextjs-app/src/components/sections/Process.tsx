import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  {
    name: "Discover",
    body: "A short call and a written brief. Scope, timeline, and what success looks like — agreed before any money moves.",
  },
  {
    name: "Design and build",
    body: "Weekly demos, not monthly surprises. You see real progress, in your timezone, every week.",
  },
  {
    name: "Launch and grow",
    body: "We ship, measure, and stay for the growth work.",
  },
];

export function Process() {
  return (
    <Section className="border-t border-line">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.name} index={i}>
            <span className="text-eyebrow mb-6 block">{`0${i + 1}`}</span>
            <h3 className="text-h3 mb-3">{step.name}</h3>
            <p className="text-body text-[15px]">{step.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
