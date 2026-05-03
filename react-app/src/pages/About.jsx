import { motion } from 'framer-motion';
import AboutUsSection from '../components/sections/AboutUs';
import StatsCounters from '../components/sections/StatsCounters';
import Reviews from '../components/sections/Reviews';

export default function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-lexora-gold mb-4">About Us</p>
          <h1 className="text-5xl md:text-7xl font-black">
            Our <span className="text-gradient-gold">Story</span>
          </h1>
        </motion.div>
      </div>
      <AboutUsSection />
      <StatsCounters />
      <Reviews />
    </div>
  );
}
