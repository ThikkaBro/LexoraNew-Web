import { Bot, LayoutDashboard, ShoppingCart, Smartphone } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section, SectionHeading } from "./ui";
import { Reveal } from "./Reveal";

const icons = { Bot, LayoutDashboard, Smartphone, ShoppingCart } as const;

export function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <Reveal>
        <Eyebrow>Capabilities</Eyebrow>
        <SectionHeading id="services-heading" className="sr-only">
          What we build
        </SectionHeading>
      </Reveal>

      <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.services.map((service, i) => {
          const Icon = icons[service.icon as keyof typeof icons];
          return (
            <Reveal
              as="li"
              key={service.title}
              index={i}
              className="border-b border-line py-7 sm:border-b-0 sm:pr-8 lg:pr-10"
            >
              <Icon
                size={17}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-faint"
              />
              <h3 className="mt-4 text-[0.9375rem] font-medium tracking-[-0.012em]">
                {service.title}
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-[1.6] text-muted">
                {service.body}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
