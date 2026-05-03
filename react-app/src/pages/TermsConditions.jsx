import { motion } from 'framer-motion';

export default function TermsConditions() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-black mb-8">Terms & <span className="text-gradient-gold">Conditions</span></h1>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-lexora-gray-300 leading-relaxed">
              These terms and conditions govern your use of Lexora Tech services. Full terms will be available here.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
