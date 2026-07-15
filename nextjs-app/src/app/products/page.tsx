import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { WorkspaceMockup } from "@/components/mockups/WorkspaceMockup";
import { StoreMockup } from "@/components/mockups/StoreMockup";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Lexora Workspace and Lexora Store — the products LexoraTech designs, builds, and grows in-house.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our own products"
        title="We ship our own software, too."
        lede="Agencies talk about craft. We prove it in production."
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-eyebrow mb-4">Lexora Workspace</p>
            </Reveal>
            <Reveal index={1} as="h2" className="text-h2 mb-6">
              34+ free browser tools for creators.
            </Reveal>
            <Reveal index={2}>
              <p className="text-body mb-6">
                Image editing, screen recording, PDF utilities, code
                formatting, and a resume builder — running entirely in the
                browser, with no sign-up and no file leaving the device.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="text-meta mb-8">
                Strongest tools: Background Remover · Photo Enhancer · Online
                Whiteboard
              </p>
            </Reveal>
            <Reveal index={4}>
              <Button href="https://apps.lexoratech.com" variant="outline">
                Launch Workspace ↗
              </Button>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal index={2}>
              <BrowserFrame url="apps.lexoratech.com">
                <WorkspaceMockup />
              </BrowserFrame>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal index={2}>
              <BrowserFrame url="lexoratech.store">
                <StoreMockup />
              </BrowserFrame>
            </Reveal>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal>
              <p className="text-eyebrow mb-4">Lexora Store</p>
            </Reveal>
            <Reveal index={1} as="h2" className="text-h2 mb-6">
              Tech gear, delivered island-wide.
            </Reveal>
            <Reveal index={2}>
              <p className="text-body mb-6">
                Power banks, gaming gear, office supplies, and accessories —
                curated instead of a general marketplace, with flash deals
                that refresh daily.
              </p>
            </Reveal>
            <Reveal index={3}>
              <p className="text-meta mb-8">
                Free shipping on orders over Rs 9,999 · island-wide delivery
              </p>
            </Reveal>
            <Reveal index={4}>
              <Button href="https://lexoratech.store" variant="outline">
                Visit Store ↗
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line text-center">
        <Reveal as="p" className="text-lede mx-auto max-w-2xl">
          These products are our lab — every technique we prove here ships in
          client work.
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}
