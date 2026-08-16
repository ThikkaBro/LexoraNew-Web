import { Bot, LayoutDashboard, ShoppingCart, Smartphone } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Eyebrow, Section } from "./ui";
import { Reveal } from "./Reveal";

const icons = { Bot, LayoutDashboard, Smartphone, ShoppingCart } as const;

export function Services() {
  return (
    <Section id="services" label="Services" className="py-16 md:py-24">
      <Reveal>
        <Eyebrow>Also on the menu</Eyebrow>
      </Reveal>

      <ul className="mt-8 grid gap-px overflow-hidden rounded border border-hairline bg-[rgba(255,255,255,0.08)] sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.services.map((service, i) => {
          const Icon = icons[service.icon as keyof typeof icons];
          return (
            <Reveal as="li" key={service.title} index={i} className="bg-ink p-6">
              <Icon
                size={18}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-muted"
              />
              <h3 className="mt-4 text-sm font-medium text-paper">
                {service.title}
              </h3>
              <p className="mt-1.5 text-sm leading-[1.6] text-muted">
                {service.body}
              </p>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
