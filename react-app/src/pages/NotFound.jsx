import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-8xl md:text-9xl font-black text-gradient-gold mb-4">404</h1>
        <p className="text-2xl font-bold text-white mb-2">Page Not Found</p>
        <p className="text-lexora-gray-300 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-lexora-gold text-lexora-black font-bold rounded-xl hover:bg-lexora-gold-light transition-all duration-300"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
