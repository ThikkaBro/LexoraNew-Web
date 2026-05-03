import { motion } from 'framer-motion';

export default function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative bg-glass-light rounded-2xl p-8 md:p-10"
    >
      {/* Quote mark */}
      <div className="absolute top-6 right-8 text-6xl text-lexora-gold/10 font-serif leading-none select-none">
        &ldquo;
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-lexora-gold to-amber-600 flex items-center justify-center text-xl font-bold text-lexora-black overflow-hidden">
          {review.avatar ? (
            <img src={review.avatar} alt={review.client} className="w-full h-full object-cover" />
          ) : (
            review.client.charAt(0)
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{review.project}</h4>
          {review.url ? (
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-lexora-gold hover:underline"
            >
              {review.client}
            </a>
          ) : (
            <p className="text-sm text-lexora-gold">{review.client}</p>
          )}
        </div>
      </div>

      {/* Review text */}
      <p className="text-lexora-gray-300 leading-relaxed italic text-[15px]">
        &ldquo;{review.review}&rdquo;
      </p>

      {/* Rating stars */}
      <div className="mt-6 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-lexora-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </motion.div>
  );
}
