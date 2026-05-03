import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionLabel from '../ui/SectionLabel';

export default function ContactCTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-lexora-gold/3 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel text="Contact" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mt-4 mb-8"
            >
              Let&apos;s <span className="text-gradient-gold">make</span> an{' '}
              <span className="text-gradient-gold">impact</span> together.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lexora-gray-300 text-lg leading-relaxed mb-8"
            >
              Welcome to <span className="text-lexora-gold font-semibold">Lexora Tech</span> where
              your ideas come to life. We specialize in crafting unique brands, captivating
              advertising campaigns, and effective digital strategies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lexora-gold text-lexora-black font-bold rounded-xl hover:bg-lexora-gold-light transition-all duration-300 hover:scale-105"
              >
                Get a Quote
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/10 text-white font-semibold rounded-xl hover:border-lexora-gold/30 transition-all duration-300"
              >
                Write to us
              </Link>
            </motion.div>
          </div>

          {/* Decorative card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-lexora-gold/10 to-purple-600/10 border border-white/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="text-7xl mb-6">🚀</div>
                  <p className="text-2xl font-bold text-white mb-2">Ready to launch?</p>
                  <p className="text-lexora-gray-300">We accept requests 24/7</p>
                </div>
              </div>
              {/* Floating shapes */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute top-8 right-8 w-12 h-12 border border-lexora-gold/20 rounded-xl"
              />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-12 left-8 w-8 h-8 bg-lexora-gold/10 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
