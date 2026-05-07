import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CalendarCheck, PackageCheck, Camera, ImageDown } from 'lucide-react';

const steps = [
  {
    icon: CalendarCheck,
    step: '01',
    title: 'Booking',
    desc: 'Pilih paket, tentukan tanggal acara, dan hubungi kami via WhatsApp atau isi form. Konfirmasi dalam 1×24 jam.',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
  },
  {
    icon: PackageCheck,
    step: '02',
    title: 'Persiapan',
    desc: 'Tim kami mendesain custom frame sesuai tema acara Anda. Setup peralatan 30 menit sebelum acara dimulai.',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
  },
  {
    icon: Camera,
    step: '03',
    title: 'Sesi Foto',
    desc: 'Tamu bebas berfoto sepuasnya! Operator kami siap membantu, dengan properti lucu dan lighting profesional.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: ImageDown,
    step: '04',
    title: 'Cetak & Share',
    desc: 'Foto langsung dicetak di tempat dan file digital dikirim via QR Code atau email. Kenangan siap dibawa pulang!',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
];

export default function HowItWorks() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={titleRef} className="text-center max-w-xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-sky-600 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Cara Kerja
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Mudah dalam{' '}
            <span className="gradient-text">4 Langkah</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Proses booking sampai sesi foto berjalan sangat simpel dan profesional.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-sky-200 via-violet-200 to-amber-200 z-0" />

          {steps.map(({ icon: Icon, step, title, desc, color, bg, border }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <div className={`w-24 h-24 ${bg} border-2 ${border} rounded-2xl flex items-center justify-center mb-5 shadow-sm relative`}>
                <Icon size={32} className={color} />
                {/* Step number */}
                <span className="absolute -top-2 -right-2 w-6 h-6 gradient-brand rounded-full text-white text-xs font-black flex items-center justify-center shadow-md">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-800 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
