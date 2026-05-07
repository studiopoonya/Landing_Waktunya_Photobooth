import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

import { ArrowRight, MessageCircle } from 'lucide-react';

const floatingFrames = [
  { emoji: '📸', rotate: '-12deg', delay: 0,   top: '8%',  left: '6%',  size: 56 },
  { emoji: '🎉', rotate:   '8deg', delay: 0.2, top: '12%', right: '8%', size: 44 },
  { emoji: '✨', rotate:  '-6deg', delay: 0.4, bottom: '12%', left: '10%', size: 48 },
  { emoji: '💙', rotate:  '12deg', delay: 0.6, bottom: '8%',  right: '6%', size: 44 },
];

export default function CTASection({ onOpenForm }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="contact" className="py-24 md:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 md:px-16 py-16 md:py-20 text-center"
        >
          {/* Static gradient overlay */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-500" />

          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />

          {/* Gradient blobs with parallax */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating decorations */}
          {floatingFrames.map(({ emoji, rotate, delay, size, ...pos }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={inView ? { opacity: 1, scale: 1, rotate } : {}}
              transition={{ delay: 0.3 + delay, type: 'spring', stiffness: 200, damping: 15 }}
              className="absolute hidden md:flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 animate-float-slow"
              style={{ ...pos, width: size, height: size, animationDelay: `${i * 0.7}s` }}
            >
              <span style={{ fontSize: size * 0.45 }}>{emoji}</span>
            </motion.div>
          ))}

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
              className="text-5xl mb-5 animate-bounce-soft inline-block"
            >
              📸
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.18 }}
              className="text-sky-400 text-sm font-bold uppercase tracking-widest mb-3"
            >
              Jangan Lewatkan
            </motion.p>

            {/* Word-by-word title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              {['Siap', 'Membuat', 'Acara', 'Anda'].map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block mr-[0.22em]"
                >
                  {w}
                </motion.span>
              ))}
              <br className="hidden sm:block" />
              {['Tak', 'Terlupakan?'].map((w, i) => (
                <motion.span
                  key={w}
                  initial={{ opacity: 0, y: 18 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.52 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block mr-[0.22em] ${i === 1 ? 'text-sky-400' : ''}`}
                >
                  {w}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75 }}
              className="text-slate-400 text-base md:text-lg mb-10 max-w-md mx-auto"
            >
              Hubungi kami sekarang. Promo terbatas untuk 20 pemesan pertama bulan ini!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.85 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <motion.button
                onClick={onOpenForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="gradient-brand btn-shimmer btn-glow text-white font-bold px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-sky-900/50"
              >
                Claim Promo Sekarang
                <ArrowRight size={15} />
              </motion.button>
              <motion.a
                href="https://wa.me/628123456789"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.7)' }}
                className="border-2 border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={15} />
                WhatsApp Kami
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
