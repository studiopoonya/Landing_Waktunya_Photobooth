import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

const samples = [
  {
    label: 'AI Beauty Filter',
    beforeColor: 'from-slate-300 to-slate-400',
    afterColor: 'from-sky-400 to-blue-600',
    beforeLabel: 'Original',
    afterLabel: 'After AI Filter',
  },
  {
    label: 'Custom Frame',
    beforeColor: 'from-slate-300 to-slate-400',
    afterColor: 'from-violet-400 to-purple-600',
    beforeLabel: 'Original',
    afterLabel: 'With Custom Frame',
  },
  {
    label: 'GIF Boomerang',
    beforeColor: 'from-slate-300 to-slate-400',
    afterColor: 'from-amber-400 to-orange-500',
    beforeLabel: 'Static Photo',
    afterLabel: 'GIF Boomerang',
  },
];

function SliderCard({ beforeColor, afterColor, beforeLabel, afterLabel }) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const getPos = useCallback((clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e) => { if (dragging.current) getPos(e.clientX); };
  const onMouseUp   = () => { dragging.current = false; };
  const onTouchMove = (e) => { getPos(e.touches[0].clientX); };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-sm border border-slate-100"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
    >
      {/* After (full) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${afterColor}`}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.6) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/20 text-6xl">✨</span>
        </div>
        <span className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
          {afterLabel}
        </span>
      </div>

      {/* Before (clipped left) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${beforeColor}`}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,.3) 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/20 text-6xl">📷</span>
        </div>
        <span className="absolute bottom-3 left-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium">
          {beforeLabel}
        </span>
      </div>

      {/* Divider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${pos}%` }} />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-sky-400 z-10"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal size={14} className="text-sky-600" />
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={titleRef} className="text-center max-w-xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-sky-600 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Lihat Perbedaannya
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Sebelum &{' '}
            <span className="gradient-text">Sesudah</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Geser slider untuk melihat transformasi foto dengan teknologi kami.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {samples.map(({ label, beforeColor, afterColor, beforeLabel, afterLabel }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12 }}
            >
              <SliderCard
                beforeColor={beforeColor}
                afterColor={afterColor}
                beforeLabel={beforeLabel}
                afterLabel={afterLabel}
              />
              <p className="text-center text-slate-600 text-sm font-semibold mt-3">{label}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-slate-400 text-xs mt-8"
        >
          * Geser handle kiri-kanan untuk membandingkan
        </motion.p>
      </div>
    </section>
  );
}
