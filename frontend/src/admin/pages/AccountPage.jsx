import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Trash2, KeyRound, Loader2, X, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { fetchAccounts, createAccount, deleteAccount, updatePassword } from '../adminApi';

function fmtDate(d) {
  return new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AccountPage({ showToast }) {
  const [accounts, setAccounts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [modal,    setModal]    = useState(null); // 'add' | { type:'password', id }
  const [confirm,  setConfirm]  = useState(null); // { id, name }
  const [form,     setForm]     = useState({ name: '', email: '', password: '' });
  const [newPass,  setNewPass]  = useState('');
  const [saving,   setSaving]   = useState(false);
  const [showPw,   setShowPw]   = useState(false);

  const load = async () => {
    try {
      const data = await fetchAccounts();
      setAccounts(Array.isArray(data) ? data : []);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await createAccount(form);
      const data = await res.json();
      if (!res.ok) {
        const msg = data.errors ? Object.values(data.errors).flat()[0] : data.message;
        showToast(msg, 'error');
        return;
      }
      showToast('Admin berhasil ditambahkan!');
      setModal(null);
      setForm({ name: '', email: '', password: '' });
      load();
    } catch {
      showToast('Gagal menambahkan admin.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm) return;
    setSaving(true);
    try {
      const res = await deleteAccount(confirm.id);
      const data = await res.json();
      if (!res.ok) { showToast(data.message, 'error'); return; }
      showToast('Admin berhasil dihapus.');
      setConfirm(null);
      load();
    } catch {
      showToast('Gagal menghapus.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!modal?.id) return;
    setSaving(true);
    try {
      const res = await updatePassword(modal.id, newPass);
      const data = await res.json();
      if (!res.ok) { showToast(data.message, 'error'); return; }
      showToast('Password berhasil diubah!');
      setModal(null);
      setNewPass('');
    } catch {
      showToast('Gagal mengubah password.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-slate-900">Account</h1>
        <button
          onClick={() => setModal('add')}
          className="flex items-center gap-2 gradient-brand text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm"
        >
          <UserPlus size={15} />
          Tambah Admin
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-16 flex items-center justify-center text-slate-400">
            <Loader2 size={22} className="animate-spin" />
          </div>
        ) : accounts.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <div className="text-3xl mb-2">👤</div>
            <p className="text-sm">Belum ada admin.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Nama</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Dibuat</th>
                <th className="px-5 py-3.5 w-24" />
              </tr>
            </thead>
            <tbody>
              {accounts.map(acc => (
                <tr key={acc.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 gradient-brand rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {acc.name[0].toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-800">{acc.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500">{acc.email}</td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs">{fmtDate(acc.created_at)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 justify-end">
                      <button
                        onClick={() => { setModal({ type: 'password', id: acc.id, name: acc.name }); setNewPass(''); setShowPw(false); }}
                        className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Ganti password"
                      >
                        <KeyRound size={14} />
                      </button>
                      <button
                        onClick={() => setConfirm({ id: acc.id, name: acc.name })}
                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus admin"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Add / Change Password */}
      <AnimatePresence>
        {modal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => setModal(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 gradient-brand rounded-xl flex items-center justify-center">
                      {modal === 'add' ? <UserPlus size={16} className="text-white" /> : <ShieldCheck size={16} className="text-white" />}
                    </div>
                    <h3 className="font-black text-slate-900">
                      {modal === 'add' ? 'Tambah Admin' : `Ganti Password`}
                    </h3>
                  </div>
                  <button onClick={() => setModal(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                    <X size={18} />
                  </button>
                </div>

                {modal === 'add' ? (
                  <form onSubmit={handleAdd} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Nama</label>
                      <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        required placeholder="Nama lengkap"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Email</label>
                      <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        required placeholder="admin@email.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Password</label>
                      <div className="relative">
                        <input type={showPw ? 'text' : 'password'} value={form.password}
                          onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                          required minLength={6} placeholder="Min. 6 karakter"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:border-sky-400 transition-colors" />
                        <button type="button" onClick={() => setShowPw(p => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                          {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" disabled={saving}
                      className="w-full gradient-brand text-white py-3 rounded-xl font-bold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
                      Tambah Admin
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <p className="text-sm text-slate-500">Ganti password untuk <span className="font-semibold text-slate-700">{modal.name}</span></p>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Password Baru</label>
                      <div className="relative">
                        <input type={showPw ? 'text' : 'password'} value={newPass}
                          onChange={e => setNewPass(e.target.value)}
                          required minLength={6} placeholder="Min. 6 karakter"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-10 text-sm outline-none focus:border-sky-400 transition-colors" />
                        <button type="button" onClick={() => setShowPw(p => !p)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                          {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" disabled={saving}
                      className="w-full gradient-brand text-white py-3 rounded-xl font-bold text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                      {saving ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
                      Simpan Password
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirm Delete */}
      <AnimatePresence>
        {confirm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={() => setConfirm(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
                  <Trash2 size={22} className="text-rose-500" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Hapus Admin?</h3>
                <p className="text-slate-500 text-sm mb-5">
                  Akun <span className="font-semibold">{confirm.name}</span> akan dihapus permanen.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirm(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">
                    Batal
                  </button>
                  <button onClick={handleDelete} disabled={saving}
                    className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm transition-colors disabled:opacity-60">
                    {saving ? <Loader2 size={14} className="animate-spin mx-auto" /> : 'Ya, Hapus'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
