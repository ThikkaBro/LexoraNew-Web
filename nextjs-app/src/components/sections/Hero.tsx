import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { WorkspaceMockup } from "@/components/mockups/WorkspaceMockup";

export function Hero() {
  return (
    <section className="pt-16 pb-0 sm:pt-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <Reveal index={0}>
              <p className="text-eyebrow mb-6">
                Full-service studio — Sri Lanka, working worldwide
              </p>
            </Reveal>
            <Reveal index={1} as="h1" className="text-display mb-6">
              We design brands, build software, and make them grow.
            </Reveal>
            <Reveal index={2}>
              <p className="text-lede mb-10 max-w-xl">
                Strategy, identity, web and mobile products, cloud POS, and
                the marketing that follows — one small team that takes ideas
                from first sketch to real revenue.
              </p>
            </Reveal>
            <Reveal index={3} className="flex flex-wrap items-center gap-8">
              <Button href="/contact">Start a project</Button>
              <Button href="/work" variant="ghost">
                See the work →
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal index={2} className="max-h-[420px] overflow-hidden rounded-[12px] lg:max-h-[480px]">
              <BrowserFrame url="apps.lexoratech.com">
                <WorkspaceMockup />
              </BrowserFrame>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
