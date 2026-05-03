import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from '../ui/SectionLabel';
import { subscribeNewsletterDebounced } from '../../services/api';
import { validateNewsletter } from '../../utils/validators';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateNewsletter(email);
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await subscribeNewsletterDebounced(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-lexora-dark to-lexora-black border border-white/5 p-12 md:p-16 lg:p-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-lexora-gold/5 blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <SectionLabel text="Newsletter" />
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black mt-4 mb-8"
            >
              Subscribe <span className="text-gradient-gold">our</span> newsletter
            </motion.h2>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex gap-3 mb-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); setStatus(null); }}
                placeholder="Enter your email"
                className="input-lexora flex-1"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-lexora-gold text-lexora-black font-bold rounded-xl hover:bg-lexora-gold-light transition-all duration-300 disabled:opacity-50 cursor-pointer"
              >
                {loading ? '...' : '→'}
              </button>
            </motion.form>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {status === 'success' && <p className="text-green-400 text-sm">Successfully subscribed!</p>}
            {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Try again.</p>}
            <p className="text-lexora-gray-400 text-xs mt-4">
              By clicking submit, you agree to the rules for processing personal data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
