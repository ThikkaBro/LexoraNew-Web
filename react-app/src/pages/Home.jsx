import Hero from '../components/sections/Hero';
import IconBoxes from '../components/sections/IconBoxes';
import ServicesGrid from '../components/sections/ServicesGrid';
import StatsCounters from '../components/sections/StatsCounters';
import ContactCTA from '../components/sections/ContactCTA';
import AboutUs from '../components/sections/AboutUs';
import Reviews from '../components/sections/Reviews';
import CompanyShowcase from '../components/sections/CompanyShowcase';
import Newsletter from '../components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <IconBoxes />
      <ServicesGrid />
      <StatsCounters />
      <ContactCTA />
      <AboutUs />
      <Reviews />
      <CompanyShowcase />
      <Newsletter />
    </>
  );
}
