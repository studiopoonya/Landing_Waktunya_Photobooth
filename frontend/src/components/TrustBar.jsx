import { motion } from 'framer-motion';

const stats = [
  { value: '500+',       label: 'Event Sukses',    icon: '🎉' },
  { value: '5 Thn',      label: 'Pengalaman',      icon: '⭐' },
  { value: '4.9',        label: 'Rating',          icon: '🏆' },
  { value: '2000+',      label: 'Pelanggan Puas',  icon: '💙' },
  { value: 'Jabodetabek',label: 'Area Layanan',    icon: '📍' },
];

export default function TrustBar() {
  return (
    <div className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {stats.map(({ value, label, icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex items-center gap-2.5"
            >
              <span className="text-xl">{icon}</span>
              <div>
                <span className="text-white font-black text-base">{value}</span>
                <span className="text-slate-400 text-sm ml-1.5">{label}</span>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden sm:block w-px h-5 bg-slate-700 ml-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
