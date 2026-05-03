import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import { submitQuoteDebounced } from '../services/api';
import { validateQuoteForm } from '../utils/validators';
import { QUOTE_SERVICES, BUDGET_OPTIONS } from '../config/constants';

export default function Quote() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    budget: 'TBD', services: [], message: '',
    web_other: '', mobile_other: '', pos_other: '',
    ui_other: '', brand_other: '', marketing_other: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleCheckbox = (value) => {
    const updated = form.services.includes(value)
      ? form.services.filter((s) => s !== value)
      : [...form.services, value];
    setForm({ ...form, services: updated });
    setErrors({ ...errors, services: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: v } = validateQuoteForm(form);
    if (!isValid) { setErrors(v); return; }
    setLoading(true);
    setSubmitError('');
    try {
      await submitQuoteDebounced(form);
      navigate('/thank-you');
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-lexora-gold mb-4">Start a Project</p>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Let&apos;s Build <span className="text-gradient-gold">Something Great</span>
          </h1>
          <p className="text-lexora-gray-300 text-lg max-w-2xl">
            Tell us about your project goals, and we will get back to you with a proposal.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Step 1: Contact Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-lexora-gold/10 flex items-center justify-center text-lexora-gold text-sm font-bold">01</span>
              Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="name" placeholder="Your Name *" value={form.name} onChange={handleChange} error={errors.name} />
              <Input name="email" type="email" placeholder="Your Email *" value={form.email} onChange={handleChange} error={errors.email} />
              <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} error={errors.phone} />
              <Input name="company" placeholder="Company / Organization" value={form.company} onChange={handleChange} />
            </div>
          </motion.div>

          {/* Step 2: Services */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-lexora-gold/10 flex items-center justify-center text-lexora-gold text-sm font-bold">02</span>
              How can we help?
            </h3>
            {errors.services && <p className="text-red-400 text-sm mb-4">{errors.services}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(QUOTE_SERVICES).map(([key, category]) => (
                <div key={key} className="bg-glass-light rounded-2xl p-6">
                  <h4 className="text-base font-bold text-white mb-4">{category.title}</h4>
                  <div className="space-y-3">
                    {category.options.map((opt) => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          form.services.includes(opt)
                            ? 'bg-lexora-gold border-lexora-gold'
                            : 'border-white/20 group-hover:border-lexora-gold/50'
                        }`}>
                          {form.services.includes(opt) && (
                            <svg className="w-3 h-3 text-lexora-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <input type="checkbox" className="hidden" checked={form.services.includes(opt)} onChange={() => handleCheckbox(opt)} />
                        <span className="text-sm text-lexora-gray-300 group-hover:text-white transition-colors">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    name={category.otherField}
                    placeholder="Other requirements..."
                    value={form[category.otherField]}
                    onChange={handleChange}
                    className="input-lexora mt-4 text-sm py-2.5"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 3: Budget & Message */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-lexora-gold/10 flex items-center justify-center text-lexora-gold text-sm font-bold">03</span>
              Project Details
            </h3>
            <p className="text-sm text-lexora-gray-400 mb-4">Estimated Budget</p>
            <div className="flex flex-wrap gap-3 mb-8">
              {BUDGET_OPTIONS.map((opt) => (
                <label key={opt.value} className="cursor-pointer">
                  <input type="radio" name="budget" value={opt.value} checked={form.budget === opt.value} onChange={handleChange} className="hidden peer" />
                  <span className="inline-block px-5 py-2.5 rounded-xl border border-white/10 text-sm text-lexora-gray-300 peer-checked:bg-lexora-gold peer-checked:text-lexora-black peer-checked:border-lexora-gold peer-checked:font-bold transition-all duration-300 hover:border-lexora-gold/30">
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
            <Textarea name="message" placeholder="Tell us more about your project..." value={form.message} onChange={handleChange} rows={3} />
          </motion.div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" loading={loading}>Submit Proposal</Button>
          </div>
          {submitError && <p className="text-red-400 text-sm text-right">{submitError}</p>}
        </form>
      </div>
    </div>
  );
}
