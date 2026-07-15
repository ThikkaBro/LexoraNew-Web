import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project with LexoraTech. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <Section className="pt-16 sm:pt-20">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h1 className="text-display mb-6">Start a project.</h1>
          </Reveal>
          <Reveal index={1}>
            <p className="text-lede mb-8">
              We reply within one business day — usually faster.
            </p>
          </Reveal>
          <Reveal index={2}>
            <a
              href="mailto:hello@lexoratech.com"
              className="link-reveal font-[var(--font-jetbrains)] text-[14px] tracking-[0.04em] text-text-meta hover:text-text-high"
            >
              Prefer email? hello@lexoratech.com
            </a>
          </Reveal>
        </div>

        <Reveal index={1} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
