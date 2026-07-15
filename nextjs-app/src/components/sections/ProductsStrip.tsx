import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function ProductsStrip() {
  return (
    <Section className="border-t border-line">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-eyebrow mb-4">Our own products</p>
          </Reveal>
          <Reveal index={1} as="h2" className="text-h2 mb-6">
            We ship our own software, too.
          </Reveal>
          <Reveal index={2}>
            <p className="text-body">
              Agencies talk about craft. We prove it in production — Lexora
              Workspace serves creators with 30+ free browser tools, and
              Lexora Store delivers tech gear island-wide. When we build for
              you, we build like it&apos;s ours.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-5 lg:items-end">
          <Reveal index={1}>
            <Button href="https://apps.lexoratech.com" variant="outline">
              Launch Workspace ↗
            </Button>
          </Reveal>
          <Reveal index={2}>
            <Button href="https://lexoratech.store" variant="outline">
              Visit Store ↗
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
