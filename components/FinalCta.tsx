import { siteConfig } from "@/app/site-config";
import { ButtonLink } from "./ui";
import { Reveal } from "./Reveal";

export function FinalCta() {
  const { finalCta } = siteConfig;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto w-full max-w-shell px-6 py-24 sm:px-8 md:py-section">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="contact-heading" className="t-h2 text-balance">
              {finalCta.heading}
            </h2>
            <p className="t-lead mx-auto mt-5 max-w-[48ch] text-balance text-muted">
              {finalCta.body}
            </p>

            <div className="mt-9 flex justify-center">
              <ButtonLink href={siteConfig.bookingUrl} size="lg" external>
                {finalCta.cta}
              </ButtonLink>
            </div>

            <p className="mt-7 text-[0.8125rem] text-faint">
              {finalCta.emailLabel}{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="rounded-sm text-paper underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-paper"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
