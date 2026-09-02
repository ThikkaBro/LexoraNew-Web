import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * ⚠️ NOT LEGAL ADVICE. This describes what the site actually does today:
 * no analytics, no cookies set by us, one outbound booking link, and the AI
 * assistant panel (see the "When you use the assistant" section below).
 * If you add analytics or another form, this page must change.
 * Have a lawyer review it before you rely on it for UK/EU clients.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.company} handles personal data. We set no cookies, run no analytics, and collect nothing directly through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const updated = "16 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <article className="px-6 pb-20 pt-32 sm:px-8 md:pt-40">
          <div className="mx-auto w-full max-w-2xl">
            <nav aria-label="Breadcrumb" className="mb-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-sm text-[0.8125rem] text-muted transition-colors duration-150 hover:text-paper"
              >
                <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
                Home
              </Link>
            </nav>

            <h1 className="t-h2 text-[1.75rem] sm:text-[2.25rem]">
              Privacy Policy
            </h1>
            <p className="t-small mt-4 text-faint">Last updated {updated}</p>

            <div className="mt-12 space-y-10">
              <section>
                <h2 className="t-h3">The short version</h2>
                <p className="t-body mt-3 text-muted">
                  This website sets no cookies and runs no analytics or
                  tracking. We cannot identify you from visiting it. It has one
                  optional feature that collects anything: the assistant panel
                  in the corner, and only if you type into it. Everything else
                  — the email link, the booking link — is entirely your choice.
                </p>
              </section>

              <section>
                <h2 className="t-h3">What this site collects</h2>
                <p className="t-body mt-3 text-muted">
                  Nothing, unless you use the assistant panel. There is no
                  contact form, no newsletter signup, and no advertising or
                  analytics script on any page.
                </p>
                <p className="t-body mt-3 text-muted">
                  Our hosting provider, Vercel, processes standard server logs
                  including IP address, browser type and requested URL, in order
                  to serve the site and protect it from abuse. We do not use
                  those logs to build a profile of you.
                </p>
              </section>

              <section>
                <h2 className="t-h3">When you use the assistant</h2>
                <p className="t-body mt-3 text-muted">
                  The panel in the corner of the page answers questions using
                  only what is published on this site. It is optional and it
                  collects nothing until you type a message and send it.
                </p>
                <p className="t-body mt-3 text-muted">
                  What happens when you do: the message and the conversation so
                  far are sent to our server, and from there to the AI provider
                  that generates the reply, which processes it under its own
                  terms and does not use it to train its models. Your
                  conversation is held in your own browser for the length of the
                  visit and is gone when you close the tab. We do not store
                  transcripts on our servers; we do record the number of tokens
                  each request used, so we can see what the feature costs, and
                  that record contains no message content.
                </p>
                <p className="t-body mt-3 text-muted">
                  Your IP address is used to count requests and stop the feature
                  being abused, and is not linked to anything else. Please do not
                  type anything confidential into it — it is a website FAQ, not a
                  secure channel.
                </p>
                <p className="t-body mt-3 text-muted">
                  If you choose to leave your name and email so a person can
                  reply, those details and the recent part of the conversation
                  are sent to us, and to nowhere else. We use them only to
                  answer you. Ask us and we will delete them.
                </p>
              </section>

              <section>
                <h2 className="t-h3">When you book a call</h2>
                <p className="t-body mt-3 text-muted">
                  Our booking link takes you to a third-party scheduling service.
                  If you book, you give that service your name, email address and
                  anything you type into the booking form, and it shares those
                  details with us so we can meet you. That service operates under
                  its own privacy policy, which you should read before booking.
                </p>
                <p className="t-body mt-3 text-muted">
                  We use those details only to hold the call and to follow up on
                  it. We do not sell them, and we do not add you to any marketing
                  list without you asking.
                </p>
              </section>

              <section>
                <h2 className="t-h3">When you email us</h2>
                <p className="t-body mt-3 text-muted">
                  Our email runs on Google Workspace. Messages you send us are
                  stored there so we can reply and keep a record of the work. We
                  keep enquiry correspondence for as long as it is commercially
                  useful, and delete it on request.
                </p>
              </section>

              <section>
                <h2 className="t-h3">Client project data</h2>
                <p className="t-body mt-3 text-muted">
                  During a project we may be given access to systems containing
                  personal data belonging to your business. In that relationship
                  you are the data controller and we act as a processor on your
                  written instructions. We can sign a data processing agreement,
                  and we do not retain copies of client data after handover
                  unless you ask us to.
                </p>
              </section>

              <section>
                <h2 className="t-h3">Your rights</h2>
                <p className="t-body mt-3 text-muted">
                  If you are in the UK or the European Economic Area, the UK GDPR
                  and EU GDPR give you the right to ask what personal data we
                  hold about you, to have it corrected or erased, and to object
                  to how we use it. Email us and we will respond within 30 days.
                  You may also complain to your national data protection
                  authority.
                </p>
              </section>

              <section>
                <h2 className="t-h3">Where your data goes</h2>
                <p className="t-body mt-3 text-muted">
                  We are based in {siteConfig.location} and work with clients
                  worldwide, so data you send us is accessed from Sri Lanka. Our
                  hosting, email and scheduling providers operate their own
                  international transfer safeguards.
                </p>
              </section>

              <section>
                <h2 className="t-h3">Contact</h2>
                <p className="t-body mt-3 text-muted">
                  Questions about this policy, or any request about your data,
                  go to{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="rounded-sm text-paper underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-paper"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
