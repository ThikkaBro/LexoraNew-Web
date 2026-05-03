import { motion } from 'framer-motion';
import SectionLabel from '../components/ui/SectionLabel';
import { REVIEWS } from '../config/constants';

const projects = [
  {
    title: 'Maga Harunu Paadama',
    category: 'Web Application',
    description: 'A comprehensive educational platform — Sri Lanka\'s Missed Lesson Project. Full-stack development with custom CMS.',
    url: 'https://magaharunupaadama.com',
    gradient: 'from-blue-600 to-cyan-500',
    icon: '📚',
  },
  {
    title: 'Inner Mental Wellness',
    category: 'Corporate Website',
    description: 'Sri Lanka\'s First Employee Assistance Program (EAP) service. Professional corporate identity with mental health focus.',
    url: 'https://innermentalwellness.com',
    gradient: 'from-emerald-600 to-teal-500',
    icon: '🧠',
  },
];

export default function Portfolio() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <SectionLabel text="Our Work" />
          <h1 className="text-5xl md:text-7xl font-black mt-4 mb-6">
            Featured <span className="text-gradient-gold">Projects</span>
          </h1>
          <p className="text-lexora-gray-300 text-lg max-w-2xl">
            A showcase of our finest work — each project a testament to our commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="group block bg-glass-light rounded-3xl overflow-hidden border border-white/5 hover:border-lexora-gold/20 transition-all duration-500"
            >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <span className="text-7xl">{project.icon}</span>
              </div>
              <div className="p-8">
                <span className="text-xs text-lexora-gold font-semibold tracking-wider uppercase">{project.category}</span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-3 group-hover:text-lexora-gold transition-colors">{project.title}</h3>
                <p className="text-lexora-gray-300 text-sm leading-relaxed">{project.description}</p>
                <div className="mt-6 flex items-center gap-2 text-lexora-gold text-sm font-medium">
                  <span>View Project</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Client Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black">What Our <span className="text-gradient-gold">Clients</span> Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-glass-light rounded-2xl p-8"
            >
              <p className="text-lexora-gray-300 italic mb-4">&ldquo;{review.review}&rdquo;</p>
              <p className="text-lexora-gold font-semibold">{review.client}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
