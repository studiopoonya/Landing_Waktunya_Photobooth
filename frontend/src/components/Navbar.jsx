import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo_1.jpeg';

export default function Navbar({ onOpenForm }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Fitur', href: '#features' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'Paket', href: '#pricing' },
    { label: 'Kontak', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-md shadow-sky-100/60 border-b border-sky-100/50'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Waktunya Photobooth" className="h-10 w-10 object-contain rounded-xl" />
            <div className="leading-tight">
              <span className="block text-base font-black gradient-text">Waktunya</span>
              <span className="block text-xs font-bold text-slate-400 tracking-widest uppercase -mt-0.5">Photobooth</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 hover:text-sky-600 transition-colors duration-200 font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 gradient-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <motion.button
              onClick={onOpenForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="gradient-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-sky-300/50 cursor-pointer"
            >
              Claim Promo
            </motion.button>
          </div>

          <button
            className="md:hidden text-slate-500 hover:text-sky-600 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-50">
        <motion.div
          className="h-full gradient-brand"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-sky-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-slate-600 hover:text-sky-600 text-base transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { onOpenForm(); setMenuOpen(false); }}
                className="gradient-brand text-white py-2.5 rounded-full font-semibold text-sm"
              >
                Claim Promo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
