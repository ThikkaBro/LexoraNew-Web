import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-7xl mb-8"
        >
          🎉
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Thank You!</h1>
        <p className="text-lexora-gray-300 text-lg mb-8">
          Your proposal has been submitted successfully. Our team will review it and get back to you within 24 hours.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-lexora-gold text-lexora-black font-bold rounded-xl hover:bg-lexora-gold-light transition-all duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
