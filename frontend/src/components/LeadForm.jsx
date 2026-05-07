import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function InputField({ icon: Icon, label, id, type = 'text', value, onChange, error, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon size={16} />
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-3 text-slate-800 text-sm placeholder-slate-300 outline-none transition-all duration-200 focus:bg-white ${
            error
              ? 'border-rose-400 focus:border-rose-500'
              : 'border-slate-200 focus:border-sky-400 focus:shadow-sm focus:shadow-sky-100'
          }`}
          {...props}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-rose-500 text-xs mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function PhoneInput({ value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-1.5">Nomor HP</label>
      <div className="flex gap-2">
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 rounded-xl min-w-[72px] justify-center">
          <span className="text-base">🇮🇩</span>
          <span className="text-sm text-slate-700 font-medium">+62</span>
        </div>
        <div className="relative flex-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Phone size={16} />
          </div>
          <input
            type="tel"
            value={value}
            onChange={onChange}
            placeholder="812-3456-7890"
            maxLength={14}
            className={`w-full bg-slate-50 border rounded-xl pl-10 pr-4 py-3 text-slate-800 text-sm placeholder-slate-300 outline-none transition-all duration-200 focus:bg-white ${
              error
                ? 'border-rose-400 focus:border-rose-500'
                : 'border-slate-200 focus:border-sky-400 focus:shadow-sm focus:shadow-sky-100'
            }`}
          />
        </div>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-rose-500 text-xs mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Nama wajib diisi';
  else if (form.name.trim().length < 2) errors.name = 'Nama minimal 2 karakter';

  const rawPhone = form.phone.replace(/\D/g, '');
  if (!rawPhone) errors.phone = 'Nomor HP wajib diisi';
  else if (rawPhone.length < 8 || rawPhone.length > 13) errors.phone = 'Nomor HP tidak valid';
  else if (rawPhone.startsWith('0')) errors.phone = 'Masukkan tanpa angka 0 di awal';

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email) errors.email = 'Email wajib diisi';
  else if (!emailRe.test(form.email)) errors.email = 'Format email tidak valid';

  return errors;
}

export default function LeadForm({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const set = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: `+62${form.phone.replace(/\D/g, '')}`,
          email: form.email.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.errors) {
          setErrors({ name: data.errors.name?.[0], phone: data.errors.phone?.[0], email: data.errors.email?.[0] });
          setStatus('idle');
          return;
        }
        throw new Error();
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setForm({ name: '', phone: '', email: '' }); setErrors({}); setStatus('idle'); }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/50 z-50 backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl shadow-sky-200/50">
              {/* Header */}
              <div className="relative p-6 pb-5 border-b border-slate-100">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X size={18} />
                </button>
                <p className="text-sky-600 text-xs font-bold uppercase tracking-widest mb-1">Penawaran Spesial 🎉</p>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">
                  Claim Now &amp; Get{' '}
                  <span className="gradient-text">Diskon 15K!</span>
                </h2>
                <p className="text-slate-500 text-sm mt-1.5">
                  Isi data di bawah dan tim kami langsung follow-up via WhatsApp.
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-6 gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                      >
                        <CheckCircle size={64} className="text-emerald-500" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Berhasil! 🎊</h3>
                        <p className="text-slate-500 text-sm">
                          Data Anda telah kami terima. Tim kami akan menghubungi Anda dalam 1×24 jam.
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleClose}
                        className="gradient-brand text-white px-6 py-2.5 rounded-full font-semibold text-sm mt-2 cursor-pointer shadow-md shadow-sky-300/40"
                      >
                        Tutup
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <InputField
                        id="name" label="Nama Lengkap" icon={User}
                        value={form.name} onChange={set('name')}
                        placeholder="Budi Santoso" error={errors.name}
                        disabled={status === 'loading'}
                      />
                      <PhoneInput value={form.phone} onChange={set('phone')} error={errors.phone} />
                      <InputField
                        id="email" label="Alamat Email" icon={Mail} type="email"
                        value={form.email} onChange={set('email')}
                        placeholder="budi@email.com" error={errors.email}
                        disabled={status === 'loading'}
                      />

                      {status === 'error' && (
                        <p className="text-rose-500 text-xs text-center bg-rose-50 border border-rose-100 rounded-lg py-2">
                          Terjadi kesalahan. Silakan coba lagi.
                        </p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                        className="bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold text-sm cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2 mt-1 transition-colors"
                      >
                        {status === 'loading' ? (
                          <><Loader2 size={16} className="animate-spin" />Mengirim...</>
                        ) : 'Submit'}
                      </motion.button>

                      <p className="text-slate-400 text-xs text-center leading-relaxed">
                        Dengan mengisi form ini, Anda setuju menerima komunikasi pemasaran via
                        WhatsApp & email. Lihat{' '}
                        <a href="#" className="underline hover:text-sky-600">Kebijakan Privasi</a>{' '}
                        dan{' '}
                        <a href="#" className="underline hover:text-sky-600">Syarat & Ketentuan</a>{' '}
                        kami.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
