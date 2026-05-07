import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Berapa lama waktu yang dibutuhkan untuk setup?',
    a: 'Tim kami tiba 30–45 menit sebelum acara dimulai untuk melakukan setup lengkap, termasuk backdrop, lighting, dan peralatan cetak. Anda tidak perlu khawatir tentang persiapan.',
  },
  {
    q: 'Apakah photobooth bisa untuk event outdoor?',
    a: 'Ya, kami melayani event indoor maupun outdoor. Untuk outdoor, kami menyiapkan peralatan yang sesuai kondisi. Pastikan ada area yang cukup (minimal 3×3 meter) dan ada sumber listrik.',
  },
  {
    q: 'Apakah ada minimum durasi sewa?',
    a: 'Paket minimum kami adalah 2 jam. Untuk acara yang membutuhkan waktu lebih singkat, hubungi kami untuk mendiskusikan paket custom.',
  },
  {
    q: 'Bagaimana cara pembayaran dan apakah ada DP?',
    a: 'Kami menerima transfer bank, QRIS, dan e-wallet. DP 50% diperlukan untuk konfirmasi booking, sisanya dilunasi pada hari acara sebelum sesi dimulai.',
  },
  {
    q: 'Apakah bisa cancel atau reschedule?',
    a: 'Reschedule bisa dilakukan maksimal 7 hari sebelum acara tanpa biaya tambahan. Pembatalan 3+ hari sebelum acara mendapat refund 50% DP. Pembatalan H-2 atau kurang tidak dapat direfund.',
  },
  {
    q: 'Berapa ukuran area yang dibutuhkan untuk pemasangan?',
    a: 'Area minimal 3×3 meter untuk setup standar. Untuk paket dengan backdrop sequin dan full setup, kami sarankan area 4×4 meter agar tamu lebih leluasa berfoto.',
  },
  {
    q: 'Apakah file digital diberikan setelah acara?',
    a: 'Ya! Semua foto digital diberikan dalam resolusi tinggi via QR Code yang bisa langsung di-scan di tempat, atau dikirim ke email klien dalam 24 jam setelah acara.',
  },
  {
    q: 'Apakah tersedia area layanan di luar Jabodetabek?',
    a: 'Saat ini kami melayani area Jabodetabek. Untuk event di luar area, silakan hubungi kami — kami bisa diskusikan kemungkinan dan biaya transportasi tambahan.',
  },
];

function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.05 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
        open ? 'border-sky-300 shadow-sm shadow-sky-50' : 'border-slate-100'
      } bg-white`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 cursor-pointer"
      >
        <span className={`font-semibold text-sm leading-snug transition-colors ${open ? 'text-sky-700' : 'text-slate-800'}`}>
          {q}
        </span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          open ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-500'
        }`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  const half = Math.ceil(faqs.length / 2);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={titleRef} className="text-center max-w-xl mx-auto mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="text-sky-600 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Pertanyaan yang{' '}
            <span className="gradient-text">Sering Ditanya</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Tidak menemukan jawaban? Langsung hubungi kami via WhatsApp.
          </motion.p>
        </div>

        {/* Two-column layout on desktop */}
        <div className="grid md:grid-cols-2 gap-3">
          <div className="space-y-3">
            {faqs.slice(0, half).map((faq, i) => (
              <FAQItem key={faq.q} {...faq} index={i} />
            ))}
          </div>
          <div className="space-y-3">
            {faqs.slice(half).map((faq, i) => (
              <FAQItem key={faq.q} {...faq} index={i + half} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-slate-400 text-sm mb-3">Masih ada pertanyaan lain?</p>
          <a
            href="https://wa.me/628123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 gradient-brand text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md shadow-sky-200"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Tanya via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
