import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    id: 'no-print',
    label: 'Tanpa Print',
    sublabel: '2 Jam · Digital Only',
    price: '1.000.000',
    desc: 'Cocok untuk event casual tanpa cetak foto.',
    highlight: false,
    emoji: '📱',
  },
  {
    id: '2jam',
    label: 'Paket 2 Jam',
    sublabel: '2 Jam · Cetak 2R atau 4R',
    price: '1.499.000',
    desc: 'Pilihan paling populer untuk semua jenis acara.',
    highlight: true,
    emoji: '⭐',
  },
  {
    id: '3jam',
    label: 'Paket 3 Jam',
    sublabel: '3 Jam · Cetak 2R atau 4R',
    price: '1.849.000',
    desc: 'Ideal untuk pernikahan dan event besar.',
    highlight: false,
    emoji: '🎉',
  },
];

const facilities = [
  'Unlimited Prints', 'Cover Frames', 'Studio Lighting', 'Soft-File',
  'QR Scan', 'Email Sharing', 'Funny Property', 'Sequin Backdrop',
  'Professional Staff', 'Custom Design',
];

export default function PricingSection({ onOpenForm }) {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section id="pricing" className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={titleRef} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-sky-600 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Harga Paket
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-2"
          >
            Waktunya Photobooth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="text-2xl md:text-3xl font-black gradient-text uppercase tracking-wide"
          >
            Price List
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-5 items-start mb-8">
          {plans.map(({ id, label, sublabel, price, desc, highlight, emoji }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col p-7 rounded-3xl ${
                highlight
                  ? 'bg-white border-2 border-sky-400 shadow-2xl shadow-sky-200/50 md:-translate-y-3 z-10'
                  : 'bg-white border border-slate-200 shadow-sm'
              }`}
            >
              {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-brand text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg shadow-sky-300/50 whitespace-nowrap">
                    ⚡ TERLARIS
                  </span>
                </div>
              )}

              <div className="text-2xl mb-3">{emoji}</div>
              <h3 className={`text-lg font-black mb-0.5 ${highlight ? 'gradient-text' : 'text-slate-800'}`}>{label}</h3>
              <p className="text-slate-400 text-xs mb-5">{sublabel}</p>

              <div className="flex items-baseline gap-1 mb-1.5">
                <span className="text-slate-400 text-sm font-medium">Rp</span>
                <span className="text-3xl font-black text-slate-900 tabular-nums">{price}</span>
              </div>
              <p className="text-slate-500 text-xs mb-6 leading-relaxed">{desc}</p>

              <div className={`flex items-center gap-2 text-xs font-semibold mb-6 px-3 py-2 rounded-xl ${
                highlight ? 'bg-sky-50 text-sky-700' : 'bg-slate-50 text-slate-500'
              }`}>
                <Check size={13} />
                Semua 10 fasilitas lengkap termasuk
              </div>

              <button
                onClick={onOpenForm}
                className={`w-full py-3 rounded-xl font-bold text-sm cursor-pointer transition-all duration-200 active:scale-95 ${
                  highlight
                    ? 'gradient-brand text-white shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300/50'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700'
                }`}
              >
                Pilih Paket Ini
              </button>
            </motion.div>
          ))}
        </div>

        {/* Facilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
        >
          <div className="gradient-brand px-6 py-4 flex items-center justify-between">
            <span className="text-white font-black text-base uppercase tracking-wide">
              10 Fasilitas Lengkap di Semua Paket
            </span>
            <span className="text-white/70 text-sm hidden sm:block">Termasuk semua paket ✓</span>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-5 gap-y-3 gap-x-4">
            {facilities.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i }}
                className="flex items-center gap-2"
              >
                <div className="w-4 h-4 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                  <Check size={9} className="text-sky-600" />
                </div>
                <span className="text-slate-700 text-xs font-medium">{f}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.button
            onClick={onOpenForm}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="gradient-brand text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-sky-200 cursor-pointer inline-flex items-center gap-2"
          >
            Pesan Sekarang
            <ArrowRight size={15} />
          </motion.button>
          <p className="text-slate-400 text-xs mt-3">
            Butuh info lebih?{' '}
            <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline font-medium">
              Hubungi via WhatsApp
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
