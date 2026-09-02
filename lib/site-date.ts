import { siteConfig } from "@/app/site-config";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DATES THAT LOOK AFTER THEMSELVES
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  THE TRAP THIS AVOIDS. Every page here is statically prerendered, so a bare
 *  `new Date()` in a component runs once — at build time — and then never
 *  again. The copyright year was doing exactly that: it would have kept saying
 *  the old year through January and beyond, until someone happened to deploy.
 *  A stale date on a page whose whole pitch is "we ship fast" is a bad look,
 *  and nobody would notice for weeks.
 *
 *  THE FIX HAS TWO HALVES, AND BOTH ARE NEEDED:
 *
 *    1. These helpers, which read the clock in a fixed timezone.
 *    2. `export const revalidate` in `app/layout.tsx`, which tells Next.js to
 *       regenerate the pages daily. Without it these functions still only run
 *       at build time and nothing changes. Do not remove it.
 *
 *  The pages stay static and CDN-cached either way, so none of this costs
 *  anything at request time or shows up in a Lighthouse score.
 *
 *  WHY A FIXED TIMEZONE. Build and render happen on servers set to UTC, so
 *  around midnight the month or year would flip at a different moment than it
 *  does for the people running the business. Pinning it removes the question.
 */

const { timeZone, rollToNextMonthAfterDay } = siteConfig.availability;

/** Today's date as the business's own calendar sees it. */
function today(): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(new Date());

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);

  return { year: get("year"), month: get("month"), day: get("day") };
}

/** The year for the copyright line. */
export function currentYear(): number {
  return today().year;
}

/**
 * The month to advertise availability for.
 *
 * Rolls to the next month once past `rollToNextMonthAfterDay`, because
 * "available for new projects — August" on the 29th of August is a promise
 * about two days, and reads as either careless or misleading. Late in the
 * month the honest answer is next month.
 */
export function availabilityMonth(): string {
  const { year, month, day } = today();

  // Intl months are 1-based here; Date's are 0-based. Passing 12 as the
  // 0-based index rolls into January of the following year on its own.
  const index = day > rollToNextMonthAfterDay ? month : month - 1;

  return new Intl.DateTimeFormat("en-GB", { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, index, 1)),
  );
}

/** Fills `{month}` in any string from the site config. */
export function withAvailabilityMonth(template: string): string {
  return template.replace(/\{month\}/g, availabilityMonth());
}
