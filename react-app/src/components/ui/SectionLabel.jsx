import { motion } from 'framer-motion';

export default function SectionLabel({ text, className = '' }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`
        text-xs font-semibold tracking-[0.3em] uppercase
        text-lexora-gold mb-4 ${className}
      `}
    >
      <span className="inline-flex items-center gap-3">
        <span className="w-8 h-px bg-lexora-gold/60" />
        {text}
        <span className="w-8 h-px bg-lexora-gold/60" />
      </span>
    </motion.p>
  );
}
