import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Calculator } from "@/components/Calculator";
import { Offer } from "@/components/Offer";
import { CaseStudies } from "@/components/CaseStudies";
import { WhyUs } from "@/components/WhyUs";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { About } from "@/components/About";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

/**
 * All copy lives in `app/site-config.ts`. Edit there, not here.
 *
 * Section order answers the buyer's objections in the order they occur:
 * do they understand my problem → what is it costing me → can they actually
 * build → why them and not an agency → are they real people → what will this
 * cost and how badly can it go wrong.
 *
 * The calculator sits deliberately between Problem and Offer: the visitor
 * quantifies their own loss, and only then meets the price.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Problem />
        <Calculator />
        <Offer />
        <CaseStudies />
        <WhyUs />
        <Services />
        <Process />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
