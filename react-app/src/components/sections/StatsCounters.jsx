import { STATS } from '../../config/constants';
import CounterCard from '../ui/CounterCard';

export default function StatsCounters() {
  return (
    <section className="py-20 lg:py-28 relative">
      {/* Decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-lexora-gold/20" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {STATS.map((stat, i) => (
            <CounterCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
