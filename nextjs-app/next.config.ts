import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/services.php", destination: "/services", permanent: true },
      { source: "/web-development.php", destination: "/services", permanent: true },
      { source: "/mobile-development.php", destination: "/services", permanent: true },
      { source: "/pos-development.php", destination: "/services", permanent: true },
      { source: "/ui-ux-design.php", destination: "/services", permanent: true },
      { source: "/brand-strategy.php", destination: "/services", permanent: true },
      { source: "/marketing-and-smm.php", destination: "/services", permanent: true },
      { source: "/portfolio.php", destination: "/work", permanent: true },
      { source: "/publication.php", destination: "/work", permanent: true },
      { source: "/project1.php", destination: "/work/maga-harunu-paadama", permanent: true },
      { source: "/project2.php", destination: "/work/inner-mental-wellness", permanent: true },
      { source: "/contact.php", destination: "/contact", permanent: true },
      { source: "/quote.php", destination: "/contact", permanent: true },
      { source: "/process-quote.php", destination: "/contact", permanent: true },
      { source: "/thank-you.php", destination: "/contact", permanent: true },
      { source: "/privacy-policy.php", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditons.php", destination: "/terms", permanent: true },
      { source: "/blog.php", destination: "/", permanent: true },
      { source: "/live-demos.php", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;
