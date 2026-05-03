import { motion } from 'framer-motion';
import { SERVICES } from '../config/constants';
import SectionLabel from '../components/ui/SectionLabel';
import ServiceCard from '../components/ui/ServiceCard';

export default function Services() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <SectionLabel text="What we do" />
          <h1 className="text-5xl md:text-7xl font-black mt-4 mb-6">
            Our <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="text-lexora-gray-300 text-lg max-w-2xl">
            We offer comprehensive digital solutions to transform your business presence and drive growth.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
