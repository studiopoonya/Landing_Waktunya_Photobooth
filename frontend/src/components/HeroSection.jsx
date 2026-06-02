import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Camera } from 'lucide-react';
import HeroVisual from './HeroVisual';

const stats = [
  { value: '500+',   label: 'Sesi Foto' },
  { value: '2.000+', label: 'Pelanggan Puas' },
  { value: '4.9★',   label: 'Rating' },
];

const badges = ['Cetak Instan', 'AI Filter', 'Custom Frame'];

/* Word-by-word headline data */
const line1 = [
  { text: 'Abadikan', gradient: false },
  { text: 'Momen',    gradient: true  },
];
const line2 = [
  { text: 'Terbaik',  gradient: false },
  { text: 'Anda',     gradient: false },
];

const polaroids = [
  { bg: 'from-sky-400 to-blue-600',     rotate: '-6deg',  delay: 0.4, dx: -64, dy: 8  },
  { bg: 'from-violet-400 to-purple-600',rotate: '3deg',   delay: 0.5, dx: 0,   dy: -16 },
  { bg: 'from-pink-400 to-rose-500',    rotate: '9deg',   delay: 0.6, dx: 64,  dy: 12  },
];

function WordReveal({ words, baseDelay = 0 }) {
  return (
    <>
      {words.map(({ text, gradient }, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-block ${gradient ? 'gradient-text' : ''} ${i < words.length - 1 ? 'mr-[0.22em]' : ''}`}
        >
          {text}
        </motion.span>
      ))}
    </>
  );
}

export default function HeroSection({ onOpenForm }) {
  const { scrollY: motionScrollY } = useScroll();
  const blob1Y = useTransform(motionScrollY, [0, 600], [0, -60]);
  const blob2Y = useTransform(motionScrollY, [0, 600], [0, -30]);

  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">

      {/* Parallax background blobs */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-50 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none"
      />
      <motion.div
        style={{ y: blob2Y }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-50 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">

          {/* LEFT: text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold px-4 py-2 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Promo Terbatas — Hemat 40%
            </motion.div>

            {/* Headline — word by word */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
              <span className="block">
                <WordReveal words={line1} baseDelay={0.1} />
              </span>
              <span className="block">
                <WordReveal words={line2} baseDelay={0.35} />
              </span>
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md"
            >
              Photobooth harga terjangkau dengan kualitas premium dan hasil cetak event.
              Sempurna untuk pernikahan, ulang tahun &amp; corporate event.
            </motion.p>

            {/* Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {badges.map((b, i) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  <CheckCircle size={12} className="text-sky-500" />
                  {b}
                </motion.span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <motion.button
                onClick={onOpenForm}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="gradient-brand btn-shimmer btn-glow text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-200 cursor-pointer flex items-center justify-center gap-2"
              >
                Claim Promo Sekarang
                <ArrowRight size={16} />
              </motion.button>
              <motion.a
                href="#gallery"
                whileHover={{ scale: 1.02, borderColor: 'rgba(56,189,248,0.6)' }}
                className="border border-slate-200 text-slate-700 hover:text-sky-700 px-7 py-3.5 rounded-xl font-semibold text-sm text-center transition-colors"
              >
                Lihat Galeri
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="flex gap-8 pt-6 border-t border-slate-100"
            >
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95 + i * 0.08 }}
                >
                  <div className="text-2xl font-black text-slate-900">{value}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Hero Visual — desktop */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <HeroVisual />
          </motion.div>

          {/* Mobile: polaroid stack */}
          <div className="lg:hidden flex justify-center">
            <div className="relative w-64 h-52">
              {polaroids.map(({ bg, rotate, delay, dx, dy }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute w-32 h-40 bg-gradient-to-br ${bg} rounded-2xl shadow-xl`}
                  style={{
                    left: '50%', top: '50%',
                    marginLeft: -64 + dx, marginTop: -80 + dy,
                    rotate,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-5xl text-white/20 select-none">📷</div>
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-white/10 backdrop-blur-sm rounded-b-2xl" />
                </motion.div>
              ))}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl px-4 py-2 shadow-lg border border-slate-100 flex items-center gap-2 whitespace-nowrap z-20"
              >
                <Camera size={13} className="text-sky-500" />
                <span className="text-xs font-bold text-slate-700">Cetak instan dalam 10 detik</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
