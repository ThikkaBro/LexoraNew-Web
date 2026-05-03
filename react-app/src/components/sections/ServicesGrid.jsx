import { motion } from 'framer-motion';
import { SERVICES } from '../../config/constants';
import SectionLabel from '../ui/SectionLabel';
import ServiceCard from '../ui/ServiceCard';

export default function ServicesGrid() {
  return (
    <section className="py-24 lg:py-32 relative" id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel text="Our Services" className="justify-center" />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mt-4"
          >
            We generate <span className="text-gradient-gold">unique</span> ideas
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
