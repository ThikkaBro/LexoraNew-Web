import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "About",
  description:
    "LexoraTech is a small, founder-led studio in Sri Lanka working with clients here and overseas.",
};

const principles = [
  {
    title: "Proof over promises",
    body: "Every claim on this site links to something you can click — a live product, a shipped case study, a named client. We'd rather show four projects we can stand behind than list forty we can't name. When we say we cover design, build, and growth, Lexora Workspace and Lexora Store are the evidence: our own products, designed, built, and grown by the same team that would work on yours.",
  },
  {
    title: "Small on purpose",
    body: "We haven't hired our way past the point where the founders stop touching the work. That's deliberate. When you work with LexoraTech, you talk to the people writing the code and making the design calls — not an account manager relaying messages between you and someone else's team. It caps how many projects we take at once. We think that's the right trade.",
  },
  {
    title: "We stay after launch",
    body: "A shipped product with no one watching it is a liability, not a win. We stay for the growth work — the campaigns, the social presence, the data that tells us what to build next — because we built the product and know it better than anyone we could hand it off to. Launch is the middle of the relationship, not the end.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A small studio, run by the people doing the work."
        lede="LexoraTech is run by its two founders. No account managers, no handoffs — you talk directly to the people designing and writing the code. We're based in Sri Lanka and work with clients here and overseas."
      />
      <Section>
        <div className="flex flex-col gap-16">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} index={i} className="grid grid-cols-1 gap-4 border-t border-line pt-10 lg:grid-cols-12">
              <h2 className="text-h3 lg:col-span-4">{principle.title}</h2>
              <p className="text-body lg:col-span-7">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
