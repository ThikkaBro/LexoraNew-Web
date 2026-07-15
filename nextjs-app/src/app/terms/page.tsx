import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalSection } from "@/components/ui/LegalSection";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms governing your use of the LexoraTech website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms and conditions" lede="Effective 18 October 2025." />
      <Section>
        <div className="max-w-3xl">
          <LegalSection title="1. Use of the website">
            <p>You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="flex flex-col gap-2">
              <li>Use the site in a way that violates applicable laws.</li>
              <li>Harm, disable, overburden, or impair the site.</li>
              <li>Attempt unauthorised access to the site or its systems.</li>
              <li>Use bots or scrapers without permission.</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. Intellectual property">
            <p>
              All content on this site — text, graphics, logos, and code —
              is the property of LexoraTech or its licensors and is
              protected by copyright. You may not reproduce, distribute, or
              create derivative works from it without written consent.
            </p>
          </LegalSection>

          <LegalSection title="3. User content">
            <p>
              If you submit content through the site — feedback, comments,
              inquiries — you grant us a non-exclusive, royalty-free
              licence to use it in connection with our business. You are
              responsible for ensuring your content doesn&apos;t violate any
              law or infringe on third-party rights.
            </p>
          </LegalSection>

          <LegalSection title="4. Third-party links">
            <p>
              This site may link to third-party sites we don&apos;t control.
              We&apos;re not responsible for their content or privacy
              practices.
            </p>
          </LegalSection>

          <LegalSection title="5. Disclaimer of warranties">
            <p>
              The site is provided &ldquo;as is&rdquo; without warranties of
              any kind. We don&apos;t guarantee the site will be error-free,
              secure, or uninterrupted. Use is at your own risk.
            </p>
          </LegalSection>

          <LegalSection title="6. Limitation of liability">
            <p>
              To the fullest extent permitted by law, LexoraTech is not
              liable for indirect, incidental, or consequential damages
              arising from your use of the site.
            </p>
          </LegalSection>

          <LegalSection title="7. Termination">
            <p>
              We may suspend or terminate your access to the site at any
              time, without notice, if we believe you&apos;ve violated these
              terms or applicable law.
            </p>
          </LegalSection>

          <LegalSection title="8. Changes to these terms">
            <p>
              We may update these terms from time to time. Changes will be
              posted here with an updated effective date.
            </p>
          </LegalSection>

          <LegalSection title="9. Governing law">
            <p>
              These terms are governed by the laws of Sri Lanka. Disputes
              are subject to the exclusive jurisdiction of the courts of
              Sri Lanka.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact us">
            <p>Questions about these terms:</p>
            <p>
              Email: hello@lexoratech.com
              <br />
              Phone: +94 72 058 1042
              <br />
              Address: Gampaha Town, Sri Lanka, 11000
            </p>
          </LegalSection>
        </div>
      </Section>
    </>
  );
}
