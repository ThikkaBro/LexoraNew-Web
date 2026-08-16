/**
 * The previous PHP site had 43 URLs in its sitemap, all of them indexed by
 * Google. This site would 404 every one of them, throwing away years of
 * accumulated link equity and leaving a wall of errors in Search Console.
 * These permanent redirects map each old URL to the closest equivalent.
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

  // Portfolio → selected work. The two old project pages map to the matching
  // case study page, so their inbound links land on equivalent content rather
  // than a generic anchor — that is what preserves ranking.
  ["/portfolio.php", "/#work"],
  ["/live-demos.php", "/#work"],
  ["/project1.php", "/work/national-child-safeguarding-platform"],
  ["/project2.php", "/work/employee-assistance-program-platform"],

  // Company
  ["/about.php", "/#about"],

  // Anything that used to capture a lead → the booking CTA
  ["/contact.php", "/#contact"],
  ["/quote.php", "/#contact"],
  ["/thank-you.php", "/#contact"],

  // Editorial — no blog on the new site, so send these to the top
  ["/blog.php", "/"],
  ["/publication.php", "/"],

  // Legal. The privacy policy has a real equivalent now; terms does not.
  ["/privacy-policy.php", "/privacy"],
  ["/terms-and-conditons.php", "/privacy"],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true, // 308 — Google treats this exactly like a 301
    }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
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
