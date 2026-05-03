import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { submitContactDebounced } from '../services/api';
import { validateContactForm } from '../utils/validators';
import { COMPANY } from '../config/constants';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateContactForm(form);
    if (!isValid) { setErrors(validationErrors); return; }
    setLoading(true);
    try {
      await submitContactDebounced(form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: '📞', title: 'Call', lines: [COMPANY.phone.office, COMPANY.phone.support] },
    { icon: '✉️', title: 'Write', lines: [COMPANY.email.contact, COMPANY.email.info] },
    { icon: '📍', title: 'Visit', lines: [COMPANY.address.city, `${COMPANY.address.country}, ${COMPANY.address.zip}`] },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-lexora-gold mb-4">Contact</p>
          <h1 className="text-5xl md:text-7xl font-black">
            Get in <span className="text-gradient-gold">touch</span>
          </h1>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-glass-light rounded-2xl p-8 text-center"
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              {item.lines.map((line) => (
                <p key={line} className="text-lexora-gray-300 text-sm">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-center mb-12"
          >
            Let&apos;s <span className="text-gradient-gold">talk</span>
          </motion.h2>

          {status === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-12 bg-glass-light rounded-2xl">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-lexora-gray-300">We&apos;ll get back to you shortly.</p>
              <button onClick={() => setStatus(null)} className="mt-6 text-lexora-gold hover:underline cursor-pointer">Send another</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input name="name" placeholder="What's your name" value={form.name} onChange={handleChange} error={errors.name} />
                <Input name="email" type="email" placeholder="Your Email" value={form.email} onChange={handleChange} error={errors.email} />
              </div>
              <Textarea name="message" placeholder="Tell us about your project" value={form.message} onChange={handleChange} error={errors.message} rows={5} />
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-lexora-gray-400">*We promise not to disclose your personal information.</p>
                <Button type="submit" loading={loading}>Send Message</Button>
              </div>
              {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
