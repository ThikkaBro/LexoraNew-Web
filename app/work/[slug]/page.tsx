import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/app/site-config";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ButtonLink, ScreenshotPlaceholder } from "@/components/ui";

/**
 * One indexable page per project.
 *
 * A single-page site can realistically rank for a single keyword cluster.
 * These give each project its own URL, title, description and structured
 * data, so "employee assistance program platform development" and "browser
 * based image tools" compete on separate pages instead of fighting each
 * other for the same one.
 */

type Params = { params: { slug: string } };

const findStudy = (slug: string) =>
  siteConfig.caseStudies.find((s) => s.slug === slug);

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace)}…`;
}

export function generateStaticParams() {
  return siteConfig.caseStudies.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const study = findStudy(params.slug);
  if (!study) return {};

  const url = `${siteConfig.domain}/work/${study.slug}`;
  // Google truncates search-result descriptions past ~155-160 characters,
  // usually mid-word — cut at the nearest word boundary, not a hard slice.
  const description = truncateAtWord(study.problem, 155);
  // Facebook/LinkedIn allow roughly double that before truncating, so the
  // share card can carry the outcome too, not just the problem.
  const ogDescription = truncateAtWord(`${study.problem} ${study.built}`, 300);

  return {
    title: study.title,
    description,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      url,
      title: `${study.title} — ${siteConfig.company}`,
      description: ogDescription,
      siteName: siteConfig.company,
      images: study.image
        ? [{ url: `/work/${study.image}`, width: 1600, height: 1000, alt: study.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.title} — ${siteConfig.company}`,
      description,
    },
  };
}

export default function CaseStudyPage({ params }: Params) {
  const study = findStudy(params.slug);
  if (!study) notFound();

  const image: string = study.image;
  const href: string = study.href;
  const orgId = `${siteConfig.domain}/#organization`;
  const url = `${siteConfig.domain}/work/${study.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: study.title,
        headline: study.title,
        description: `${study.problem} ${study.built}`,
        url,
        creator: { "@id": orgId },
        provider: { "@id": orgId },
        about: study.client,
        keywords: [...study.stack],
        ...(image && { image: `${siteConfig.domain}/work/${image}` }),
        ...(href && { sameAs: [href] }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.domain,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `${siteConfig.domain}/#work`,
          },
          { "@type": "ListItem", position: 3, name: study.title },
        ],
      },
    ],
  };

  const others = siteConfig.caseStudies.filter((s) => s.slug !== study.slug);

  return (
    <>
      <Nav />
      <main id="main">
        <article className="px-6 pb-20 pt-32 sm:px-8 md:pt-40">
          <div className="mx-auto w-full max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-10">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded-sm text-[0.8125rem] text-muted transition-colors duration-150 hover:text-paper"
              >
                <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
                All work
              </Link>
            </nav>

            <p className="t-micro text-faint">{study.client}</p>
            <h1 className="t-h2 mt-5 text-balance text-[1.75rem] sm:text-[2.25rem]">
              {study.title}
            </h1>

            <div className="mt-10">
              {image ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={`/work/${image}`}
                    alt={`${study.title} — screenshot of the live product. ${study.built}`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <ScreenshotPlaceholder
                  filename={`${study.slug}.png`}
                  alt={`${study.title}. ${study.built}`}
                />
              )}
            </div>

            <div className="mt-12 space-y-10">
              <section>
                <h2 className="t-micro text-faint">The problem</h2>
                <p className="t-body mt-3 max-w-prose text-muted">
                  {study.problem}
                </p>
              </section>

              <section>
                <h2 className="t-micro text-faint">What we built</h2>
                <p className="t-body mt-3 max-w-prose text-muted">
                  {study.built}
                </p>
              </section>
            </div>

            <div className="mt-12 border-t border-line pt-8">
              <p className="t-micro text-faint">{study.resultLabel}</p>
              <p className="tabular mt-3 text-[2rem] font-semibold leading-none tracking-[-0.04em] text-accent">
                {study.result}
              </p>
            </div>

            <div className="mt-10">
              <h2 className="t-micro text-faint">Built with</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-line px-2.5 py-1 text-[0.75rem] text-faint"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            {href && (
              <p className="mt-10">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-sm text-[0.875rem] text-paper underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:decoration-paper"
                >
                  Visit the live site
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </p>
            )}

            {/* CTA — every page has to be able to close, not just the home page. */}
            <aside className="lit-edge mt-16 rounded-2xl border border-line-strong bg-surface p-7 sm:p-9">
              <h2 className="t-h3 text-[1.125rem]">
                Got something similar you want built?
              </h2>
              <p className="t-small mt-3 max-w-prose text-muted">
                {siteConfig.offer.title} is {siteConfig.offer.price}{" "}
                {siteConfig.offer.priceNote} — working software in five working
                days, or you don&rsquo;t pay the second half.
              </p>
              <div className="mt-7">
                <ButtonLink href={siteConfig.bookingUrl} external>
                  {siteConfig.offer.cta}
                </ButtonLink>
              </div>
            </aside>

            {/* Internal linking: keeps crawlers moving between project pages. */}
            <nav aria-label="More work" className="mt-16 border-t border-line pt-8">
              <h2 className="t-micro text-faint">More work</h2>
              <ul className="mt-5 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/work/${o.slug}`}
                      className="group flex items-baseline justify-between gap-6 rounded-sm py-1"
                    >
                      <span className="text-[0.9375rem] tracking-[-0.012em] text-paper">
                        {o.title}
                      </span>
                      <span className="shrink-0 text-[0.75rem] text-faint">
                        {o.result}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </article>
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
