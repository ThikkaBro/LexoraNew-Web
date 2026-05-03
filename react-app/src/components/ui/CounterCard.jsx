import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';

export default function CounterCard({ stat, index }) {
  const { count, ref } = useCountUp(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-center p-8"
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-3">
        <span className="text-white">{count}</span>
        <span className="text-lexora-gold">{stat.suffix}</span>
      </div>
      <p className="text-lexora-gray-300 text-sm md:text-base uppercase tracking-widest font-medium">
        {stat.label}
      </p>
    </motion.div>
  );
}
