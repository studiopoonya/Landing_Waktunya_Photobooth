import { motion } from 'framer-motion';
import { Camera, Star } from 'lucide-react';

export default function HeroVisual() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto select-none flex items-center justify-center">

      {/* Glow */}
      <div className="absolute w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-70 pointer-events-none" />

      {/* ── Back card left (Wedding) ── */}
      <motion.div
        initial={{ opacity: 0, rotate: -14 }}
        animate={{ opacity: 1, rotate: -14, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 0.5, duration: 0.5 },
          rotate:  { delay: 0.5, duration: 0.5 },
          y: { repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 },
        }}
        className="absolute"
        style={{ left: '8%', top: '12%' }}
      >
        <PhotoCard gradient="from-violet-400 to-purple-600" emoji="💍" label="Wedding" size={{ w: 120, h: 155 }} />
      </motion.div>

      {/* ── Back card right (Party) ── */}
      <motion.div
        initial={{ opacity: 0, rotate: 13 }}
        animate={{ opacity: 1, rotate: 13, y: [0, -10, 0] }}
        transition={{
          opacity: { delay: 0.65, duration: 0.5 },
          rotate:  { delay: 0.65, duration: 0.5 },
          y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.8 },
        }}
        className="absolute"
        style={{ right: '7%', bottom: '14%' }}
      >
        <PhotoCard gradient="from-amber-400 to-orange-500" emoji="🎊" label="Party" size={{ w: 120, h: 155 }} />
      </motion.div>

      {/* ── Main front card ── */}
      <motion.div
        initial={{ opacity: 0, rotate: -4 }}
        animate={{ opacity: 1, rotate: -4, y: [0, -8, 0] }}
        transition={{
          opacity: { delay: 0.3, duration: 0.5 },
          rotate:  { delay: 0.3, duration: 0.5 },
          y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.3 },
        }}
        className="relative z-10"
      >
        <PhotoCard
          gradient="from-pink-400 via-rose-400 to-pink-600"
          emoji="📸" label="Waktunya Photobooth"
          size={{ w: 152, h: 196 }}
          main
        />
      </motion.div>

      {/* ── Chip: Cetak Instan ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          y: { repeat: Infinity, duration: 3.2, ease: 'easeInOut', delay: 1 },
        }}
        className="absolute bottom-14 left-8 bg-white rounded-2xl px-3.5 py-2.5 shadow-xl border border-slate-100 flex items-center gap-2.5 z-20"
      >
        <div className="w-7 h-7 gradient-brand rounded-lg flex items-center justify-center flex-shrink-0">
          <Camera size={13} className="text-white" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-800 leading-none">Cetak Instan</div>
          <div className="text-[10px] text-slate-400 mt-0.5">dalam 10 detik</div>
        </div>
      </motion.div>

      {/* ── Chip: Rating ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 5, 0] }}
        transition={{
          opacity: { delay: 1.1, duration: 0.5 },
          y: { repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 1.1 },
        }}
        className="absolute top-10 right-6 bg-white rounded-2xl px-3.5 py-2.5 shadow-xl border border-slate-100 flex items-center gap-2.5 z-20"
      >
        <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
          <Star size={13} className="text-amber-400 fill-amber-400" />
        </div>
        <div>
          <div className="text-xs font-bold text-slate-800 leading-none">Rating 4.9/5</div>
          <div className="text-[10px] text-slate-400 mt-0.5">2.000+ pelanggan</div>
        </div>
      </motion.div>
    </div>
  );
}

function PhotoCard({ gradient, emoji, label, size, main = false }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        width: size.w,
        height: size.h,
        boxShadow: main ? '0 20px 60px rgba(0,0,0,0.18)' : '0 8px 28px rgba(0,0,0,0.13)',
      }}
    >
      <div
        className={`bg-gradient-to-br ${gradient} relative overflow-hidden`}
        style={{ height: size.h * 0.8 }}
      >
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '10px 10px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center" style={{ fontSize: main ? 44 : 30 }}>
          {emoji}
        </div>
      </div>
      <div className="flex items-center justify-center" style={{ height: size.h * 0.2 }}>
        <p className="font-bold text-slate-400 uppercase tracking-widest text-center px-2" style={{ fontSize: main ? 9 : 8 }}>
          {label}
        </p>
      </div>
    </div>
  );
}
