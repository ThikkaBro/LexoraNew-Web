import { motion } from 'framer-motion';
import { ICON_BOXES } from '../../config/constants';

export default function IconBoxes() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ICON_BOXES.map((box, i) => (
            <motion.div
              key={box.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="w-20 h-20 rounded-2xl bg-lexora-gold/10 flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-lexora-gold/20 group-hover:scale-110 transition-all duration-300">
                {box.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-lexora-gold transition-colors duration-300">
                {box.title}
              </h3>
              <p className="text-lexora-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
                {box.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
