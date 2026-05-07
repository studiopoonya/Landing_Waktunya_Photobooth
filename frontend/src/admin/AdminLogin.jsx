import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { adminLogin, setToken } from './adminApi';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const set = (f) => (e) => {
    setForm(prev => ({ ...prev, [f]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Email dan password wajib diisi.'); return; }
    setLoading(true);
    try {
      const res = await adminLogin(form.email, form.password);
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Login gagal.'); return; }
      setToken(data.token);
      navigate('/admin', { replace: true });
    } catch {
      setError('Tidak dapat terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/50">
          {/* Logo area */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-sky-500/30">
              <span className="text-2xl">📸</span>
            </div>
            <h1 className="text-xl font-black text-white">Waktunya Photobooth</h1>
            <p className="text-slate-500 text-sm mt-1">Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="admin@fotobooth.id"
                  disabled={loading}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder-slate-600 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={set('password')}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-slate-800 border border-slate-700 focus:border-sky-500 rounded-xl pl-10 pr-11 py-3 text-white text-sm placeholder-slate-600 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose-400 text-xs text-center bg-rose-500/10 border border-rose-500/20 rounded-lg py-2.5 px-3"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="gradient-brand text-white py-3.5 rounded-xl font-bold text-sm mt-1 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-lg shadow-sky-900/40"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" />Masuk...</> : 'Masuk'}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          &copy; {new Date().getFullYear()} Waktunya Photobooth
        </p>
      </motion.div>
    </div>
  );
}
