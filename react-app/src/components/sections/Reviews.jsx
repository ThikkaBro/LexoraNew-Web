import { motion } from 'framer-motion';
import { REVIEWS } from '../../config/constants';
import SectionLabel from '../ui/SectionLabel';
import ReviewCard from '../ui/ReviewCard';

export default function Reviews() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel text="Reviews" className="justify-center" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mt-4"
          >
            Customer Voices: <br />
            Hear What <span className="text-gradient-gold">They Say</span>!
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
