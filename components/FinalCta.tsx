import { siteConfig } from "@/app/site-config";
import { ButtonLink } from "./ui";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const { finalCta } = siteConfig;

  return (
    <section
      id="contact"
      aria-label="Get in touch"
      className="border-y border-hairline bg-surface px-6 py-24 sm:px-8 md:py-32"
    >
      <Reveal>
        <div className="mx-auto w-full max-w-3xl text-center">
          <h2 className="heading-tight text-balance text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            {finalCta.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-balance text-[1.0625rem] leading-[1.6] text-muted">
            {finalCta.body}
          </p>

          <div className="mt-10 flex justify-center">
            <ButtonLink href={siteConfig.calendly} size="lg" external>
              {finalCta.cta}
            </ButtonLink>
          </div>

          <p className="mt-8 text-sm text-muted">
            {finalCta.emailLabel}{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded text-paper underline decoration-hairline underline-offset-4 transition-colors duration-150 hover:decoration-accent"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
