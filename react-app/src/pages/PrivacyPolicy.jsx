import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-black mb-8">Privacy <span className="text-gradient-gold">Policy</span></h1>
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-lexora-gray-300 leading-relaxed">
              At Lexora Tech, we take your privacy seriously. This page will contain our full privacy policy.
              We are committed to protecting your personal information and your right to privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
