import { motion } from 'framer-motion';

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl bg-glass-light p-8 cursor-pointer transition-all duration-500"
    >
      {/* Gradient border glow on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      {/* Icon */}
      <div className="text-4xl mb-5">{service.icon}</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-lexora-gold transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-lexora-gray-300 leading-relaxed line-clamp-3">
        {service.description}
      </p>

      {/* Arrow indicator */}
      <div className="mt-6 flex items-center gap-2 text-lexora-gold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
        <span className="text-sm font-medium">Learn more</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Subtle bottom border */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </motion.div>
  );
}
