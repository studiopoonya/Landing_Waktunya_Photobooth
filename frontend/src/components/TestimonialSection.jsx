import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rina Anggraini',
    role: 'Bride',
    event: 'Pernikahan Grand Hyatt',
    avatar: 'RA',
    gradient: 'from-pink-400 to-rose-500',
    rating: 5,
    text: 'Photobooth-nya keren banget! Semua tamu antri buat foto. Setup cepat dan operatornya super ramah dan sabar. Fotonya bagus-bagus semua!',
  },
  {
    name: 'Hendra Wijaya',
    role: 'HR Manager',
    event: 'Annual Company Event',
    avatar: 'HW',
    gradient: 'from-sky-400 to-blue-600',
    rating: 5,
    text: 'Sudah 3x pakai untuk acara kantor. Frame custom sesuai branding perusahaan dan hasilnya sangat profesional. Semua karyawan senang!',
  },
  {
    name: 'Dewi Kusuma',
    role: 'Event Organizer',
    event: 'Birthday Party VIP',
    avatar: 'DK',
    gradient: 'from-amber-400 to-orange-500',
    rating: 5,
    text: 'GIF dan AI filter-nya jadi daya tarik utama di acara! Tamu langsung bisa share ke medsos. Foto instan bikin semua happy pulang bawa kenangan.',
  },
];

const ratingBars = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
];

function Stars({ count, size = 13 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} className="text-amber-400 fill-amber-400" />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={titleRef} className="text-center max-w-xl mx-auto mb-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-sky-600 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Testimoni
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Apa Kata{' '}
            <span className="gradient-text">Mereka</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Kepuasan pelanggan adalah prioritas utama kami.
          </motion.p>
        </div>

        {/* Aggregate rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-5 flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900 leading-none mb-1">4.9</div>
              <Stars count={5} size={14} />
              <div className="text-slate-400 text-xs mt-1.5">2.000+ ulasan</div>
            </div>
            <div className="w-px h-14 bg-slate-100" />
            <div className="space-y-1.5">
              {ratingBars.map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 w-3 text-right">{stars}</span>
                  <Star size={10} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 * (5 - stars) }}
                      className="h-full bg-amber-400 rounded-full"
                    />
                  </div>
                  <span className="text-xs text-slate-300 w-6">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(({ name, role, event, avatar, gradient, rating, text }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:shadow-sky-50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div className="absolute top-4 right-5 text-6xl font-black text-slate-100 leading-none select-none pointer-events-none">
                "
              </div>

              <Stars count={rating} />

              <p className="text-slate-600 text-sm leading-relaxed mt-4 mb-6 relative z-10">
                "{text}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm`}>
                  {avatar}
                </div>
                <div>
                  <div className="text-slate-800 font-semibold text-sm">{name}</div>
                  <div className="text-slate-400 text-xs">{role} · {event}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
