import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { LegalSection } from "@/components/ui/LegalSection";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How LexoraTech collects, uses, and protects personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" lede="Effective 18 October 2025." />
      <Section>
        <div className="max-w-3xl">
          <LegalSection title="1. Information we collect">
            <p>
              <strong className="text-text-high">Contact form.</strong> When you
              send a message through our contact page, we collect the
              information you provide — name, email address, company, and
              message content.
            </p>
            <p>
              <strong className="text-text-high">Usage data.</strong> We
              automatically collect technical information when you visit the
              site, such as IP address, browser type, pages visited, and
              referral source.
            </p>
            <p>
              <strong className="text-text-high">Cookies.</strong> We use
              cookies and similar technologies to remember preferences and
              analyse usage.
            </p>
          </LegalSection>

          <LegalSection title="2. How we use your information">
            <ul className="flex flex-col gap-2">
              <li>To respond to inquiries and provide support.</li>
              <li>To send important notices about policy or service changes.</li>
              <li>To operate, maintain, and improve the site.</li>
              <li>To prevent fraud and protect the security of our services.</li>
            </ul>
            <p>
              We use personal information only for purposes consistent with
              this policy unless we give notice and obtain consent.
            </p>
          </LegalSection>

          <LegalSection title="3. Sharing and disclosure">
            <p>We do not sell personal information. We may share it:</p>
            <ul className="flex flex-col gap-2">
              <li>With service providers who perform work on our behalf — hosting, analytics, email delivery.</li>
              <li>When required by law or to protect the rights and safety of LexoraTech or others.</li>
              <li>As part of a merger, acquisition, or asset sale, with notice where required by law.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Security">
            <p>
              We take reasonable administrative, technical, and physical
              measures to protect personal information. No online service is
              completely secure, and we can&apos;t guarantee absolute
              security.
            </p>
          </LegalSection>

          <LegalSection title="5. Data retention">
            <p>
              We keep personal data only as long as necessary for the
              purpose it was collected for, or to meet legal obligations.
              When it&apos;s no longer needed, we delete or anonymise it.
            </p>
          </LegalSection>

          <LegalSection title="6. Your rights">
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="flex flex-col gap-2">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete data.</li>
              <li>Request deletion, subject to legal exceptions.</li>
              <li>Object to or restrict processing.</li>
              <li>Request data portability.</li>
            </ul>
          </LegalSection>

          <LegalSection title="7. Children's privacy">
            <p>
              This site is not intended for children under 13. We do not
              knowingly collect information from children under 13. Contact
              us if you believe we have, and we will remove it.
            </p>
          </LegalSection>

          <LegalSection title="8. International transfers">
            <p>
              LexoraTech is based in Sri Lanka. Information collected
              through the site may be processed and stored in Sri Lanka or
              other countries with different data protection laws.
            </p>
          </LegalSection>

          <LegalSection title="9. Changes to this policy">
            <p>
              We may update this policy from time to time. Material changes
              will be posted here with an updated effective date.
            </p>
          </LegalSection>

          <LegalSection title="10. Contact us">
            <p>Questions about this policy or our data practices:</p>
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
