import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionLabel from '../ui/SectionLabel';

export default function CompanyShowcase() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lexora-gold/3 blur-[150px]" />
      </div>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <SectionLabel text="Explore our company" className="justify-center" />
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mt-6 mb-10"
        >
          Lexora Tech is a <span className="text-gradient-gold">creative</span> company that
          transforms <span className="text-gradient-gold">ideas</span> into masterpieces.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <p className="text-lexora-gray-300 text-sm">
            Building a portfolio that truly reflects our diversity.
          </p>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/10 text-white font-semibold rounded-xl hover:border-lexora-gold/30 hover:bg-white/5 transition-all duration-300 whitespace-nowrap"
          >
            View Portfolio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
