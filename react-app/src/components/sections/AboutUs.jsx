import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';

export default function AboutUs() {
  return (
    <section className="py-24 lg:py-32 relative" id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionLabel text="About us" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black mt-4 mb-6"
            >
              Discover Our <span className="text-gradient-gold">Company</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lexora-gray-300 leading-relaxed"
            >
              Welcome to <span className="text-lexora-gold font-semibold">Lexora Tech</span> where
              your ideas come to life. We specialize in crafting unique brands, captivating
              advertising campaigns, and effective digital strategies.
            </motion.p>
          </div>

          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lexora-gray-300 text-lg leading-relaxed mb-6"
            >
              Our team of talented designers, copywriters, and marketers works with passion and
              dedication to make your business stand out. We take the time to understand your vision
              and tailor our approach to ensure your message resonates with your target audience.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lexora-gray-300 text-lg leading-relaxed"
            >
              Our goal is to help you build an emotional connection with your audience using
              cutting-edge tools and approaches. We combine our expertise with your unique insights,
              creating compelling narratives that not only engage but also inspire. Trust us with your
              idea, and we&apos;ll transform it into a successful project that will impress both you and
              your clients, driving growth and lasting impact.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
