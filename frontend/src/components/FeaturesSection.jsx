import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Printer, Palette, Clock, Shield, Smile } from 'lucide-react';

const features = [
  { icon: Zap,     title: 'Teknologi AI',           desc: 'Filter dan efek berbasis AI untuk hasil foto yang memukau secara otomatis.',               color: 'text-amber-500',  bg: 'bg-amber-50',   border: 'border-amber-100'  },
  { icon: Printer, title: 'Cetak Instan',            desc: 'Hasil cetak kualitas profesional dalam hitungan detik langsung di lokasi.',                color: 'text-sky-500',    bg: 'bg-sky-50',     border: 'border-sky-100'    },
  { icon: Palette, title: 'Custom Frame',            desc: 'Frame & template unik disesuaikan dengan tema dan branding acara Anda.',                    color: 'text-violet-500', bg: 'bg-violet-50',  border: 'border-violet-100' },
  { icon: Clock,   title: 'Setup 30 Menit',          desc: 'Tim profesional kami siap setup sebelum acara dimulai tanpa mengganggu persiapan Anda.',   color: 'text-emerald-500',bg: 'bg-emerald-50', border: 'border-emerald-100'},
  { icon: Shield,  title: 'Garansi Kepuasan',        desc: 'Tidak puas? Kami kembalikan 100% biaya sewa tanpa pertanyaan.',                            color: 'text-cyan-500',   bg: 'bg-cyan-50',    border: 'border-cyan-100'   },
  { icon: Smile,   title: 'Operator Berpengalaman',  desc: 'Operator ramah & profesional memastikan tamu Anda berfoto dengan nyaman.',                 color: 'text-pink-500',   bg: 'bg-pink-50',    border: 'border-pink-100'   },
];

export default function FeaturesSection() {
  const titleRef  = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  /* Split title for word-by-word reveal */
  const titleWords = ['Bukan', 'Sekadar'];

  return (
    <section id="features" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={titleRef} className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-sky-600 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Kenapa Memilih Kami
          </motion.p>

          {/* Word-by-word section title */}
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            {titleWords.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 20 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.22em]"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block gradient-text"
            >
              Photobooth
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.45 }}
            className="text-slate-500 text-lg"
          >
            Kami menghadirkan pengalaman fotografi premium yang membuat setiap acara tak terlupakan.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc, color, bg, border }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`bg-white rounded-2xl p-6 border ${border} shadow-sm hover:shadow-lg card-glow transition-all duration-300 group`}
            >
              <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110`}>
                <Icon size={20} className={color} />
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
