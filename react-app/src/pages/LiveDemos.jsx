import { motion } from 'framer-motion';

export default function LiveDemos() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-lexora-gold mb-4">Showcase</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Live <span className="text-gradient-gold">Demos</span>
          </h1>
          <p className="text-lexora-gray-300 text-lg">Interactive demonstrations of our work — coming soon.</p>
        </motion.div>
      </div>
    </div>
  );
}
