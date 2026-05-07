import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const photos = [
  { id: 1, bg: 'from-sky-400 to-blue-600',      label: 'Wedding',     emoji: '💍', span: 'md:col-span-2 md:row-span-2' },
  { id: 2, bg: 'from-violet-400 to-purple-600', label: 'Corporate',   emoji: '💼', span: '' },
  { id: 3, bg: 'from-amber-400 to-orange-500',  label: 'Birthday',    emoji: '🎂', span: '' },
  { id: 4, bg: 'from-emerald-400 to-teal-600',  label: 'Graduation',  emoji: '🎓', span: '' },
  { id: 5, bg: 'from-pink-400 to-rose-500',     label: 'Family',      emoji: '👨‍👩‍👧‍👦', span: '' },
];

export default function GallerySection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="gallery" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={titleRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              className="text-sky-600 text-sm font-semibold uppercase tracking-widest mb-3"
            >
              Portofolio
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
            >
              Momen yang Telah<br />Kami{' '}
              <span className="gradient-text">Abadikan</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base max-w-xs sm:text-right"
          >
            Ratusan acara berkesan yang telah kami layani di seluruh Indonesia.
          </motion.p>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]">
          {photos.map(({ id, bg, label, emoji, span }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl ${span} group cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${bg}`} />

              {/* Subtle texture */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.6) 1px, transparent 1px)', backgroundSize: '18px 18px' }}
              />

              {/* Center emoji */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl opacity-30 group-hover:opacity-50 transition-opacity">{emoji}</span>
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white text-sm font-semibold">{label}</span>
              </div>

              {/* Top badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                  {label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
