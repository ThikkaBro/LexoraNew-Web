import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Section className="flex flex-col items-center pt-24 pb-24 text-center sm:pt-32">
      <p className="text-eyebrow mb-6">404</p>
      <h1 className="text-display mb-6">This page didn&apos;t ship.</h1>
      <p className="text-lede mb-10 max-w-md">
        The link&apos;s broken or the page moved. Everything else on the site
        still works.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Button href="/">Back to home</Button>
        <Button href="/work" variant="ghost">
          See the work →
        </Button>
      </div>
    </Section>
  );
}
