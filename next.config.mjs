/**
 * The previous PHP site had 43 URLs in its sitemap, all of them indexed by
 * Google. This single-page site would 404 every one of them, throwing away
 * years of accumulated link equity and leaving a wall of errors in Search
 * Console. These 301s map each old URL to the closest section instead.
 *
 * Keep them. They cost nothing and they are the difference between carrying
 * your ranking across and starting from zero.
 */
const legacyRedirects = [
  // Entry points
  ["/index.php", "/"],

  // Service pages → the services block
  ["/services.php", "/#services"],
  ["/web-development.php", "/#services"],
  ["/mobile-development.php", "/#services"],
  ["/pos-development.php", "/#services"],
  ["/ui-ux-design.php", "/#services"],
  ["/brand-strategy.php", "/#services"],
  ["/marketing-and-smm.php", "/#services"],

  // Portfolio and the two case studies → selected work
  ["/portfolio.php", "/#work"],
  ["/live-demos.php", "/#work"],
  ["/project1.php", "/#work"],
  ["/project2.php", "/#work"],

  // Company
  ["/about.php", "/#about"],

  // Anything that used to capture a lead → the booking CTA
  ["/contact.php", "/#contact"],
  ["/quote.php", "/#contact"],
  ["/thank-you.php", "/#contact"],

  // Editorial — no blog on the new site, so send these to the top
  ["/blog.php", "/"],
  ["/publication.php", "/"],

  // Legal pages no longer exist. See SETUP.md — if you take on EU/UK clients
  // you will likely want a real privacy policy back at these paths.
  ["/privacy-policy.php", "/"],
  ["/terms-and-conditons.php", "/"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true, // 301 — tells Google to move the ranking signal across
    }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
