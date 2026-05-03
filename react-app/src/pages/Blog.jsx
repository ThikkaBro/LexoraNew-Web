import { motion } from 'framer-motion';

export default function Blog() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-lexora-gold mb-4">Blog</p>
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Latest <span className="text-gradient-gold">Insights</span>
          </h1>
          <p className="text-lexora-gray-300 text-lg mb-12">Coming soon — stay tuned for articles on design, tech, and creativity.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-glass-light rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-lexora-gold/10 to-purple-600/10 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <div className="p-6">
                <span className="text-xs text-lexora-gold">Coming Soon</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">Blog Post {i}</h3>
                <p className="text-sm text-lexora-gray-300">Content coming soon...</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
