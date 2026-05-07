import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut, Search, Download, Trash2, Users, CalendarDays,
  TrendingUp, ChevronLeft, ChevronRight, X, Loader2, RefreshCw,
} from 'lucide-react';
import {
  fetchStats, fetchLeads, deleteLead, bulkDeleteLeads,
  fetchAllLeadsForExport, downloadCSV, adminLogout,
} from './adminApi';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium ${
        type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
      }`}
    >
      {message}
      <button onClick={onClose}><X size={14} /></button>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const navigate  = useNavigate();
  const [stats,   setStats]   = useState({ total: 0, today: 0, week: 0 });
  const [leads,   setLeads]   = useState({ data: [], last_page: 1, current_page: 1, total: 0 });
  const [search,  setSearch]  = useState('');
  const [from,    setFrom]    = useState('');
  const [to,      setTo]      = useState('');
  const [page,    setPage]    = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [toast,   setToast]   = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // { ids, label }
  const searchTimer = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const loadStats = useCallback(async () => {
    try { setStats(await fetchStats()); } catch {}
  }, []);

  const loadLeads = useCallback(async (p = page) => {
    setLoading(true);
    setSelected(new Set());
    try {
      const data = await fetchLeads({ search, from, to, page: p });
      setLeads(data);
    } catch {}
    finally { setLoading(false); }
  }, [search, from, to, page]);

  useEffect(() => { loadStats(); }, [loadStats]);

  useEffect(() => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => { setPage(1); loadLeads(1); }, 400);
    return () => clearTimeout(searchTimer.current);
  }, [search, from, to]); // eslint-disable-line

  useEffect(() => { loadLeads(page); }, [page]); // eslint-disable-line

  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/login', { replace: true });
  };

  const confirmAndDelete = (ids, label) => setConfirmDelete({ ids, label });

  const executeDelete = async () => {
    const { ids } = confirmDelete;
    setConfirmDelete(null);
    try {
      if (ids.length === 1) {
        await deleteLead(ids[0]);
      } else {
        await bulkDeleteLeads(ids);
      }
      showToast(`${ids.length} data berhasil dihapus.`);
      loadStats();
      loadLeads(page);
    } catch {
      showToast('Gagal menghapus data.', 'error');
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const all = await fetchAllLeadsForExport();
      downloadCSV(all);
      showToast('Export CSV berhasil!');
    } catch {
      showToast('Export gagal.', 'error');
    } finally {
      setExporting(false);
    }
  };

  const toggleAll = () => {
    if (selected.size === leads.data.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(leads.data.map(l => l.id)));
    }
  };

  const toggleOne = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const fmtDate = (d) => new Date(d).toLocaleDateString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users,         color: 'text-sky-500',    bg: 'bg-sky-50' },
    { label: 'Hari Ini',    value: stats.today, icon: CalendarDays,  color: 'text-violet-500', bg: 'bg-violet-50' },
    { label: 'Minggu Ini',  value: stats.week,  icon: TrendingUp,    color: 'text-emerald-500',bg: 'bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center text-sm">📸</div>
            <div>
              <span className="font-black text-slate-900 text-sm">Waktunya Photobooth</span>
              <span className="text-slate-400 text-xs ml-2">Admin Panel</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-rose-600 transition-colors font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm"
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={22} className={color} />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{value}</div>
                <div className="text-slate-400 text-xs font-medium mt-0.5">{label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-52">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Cari nama, email, atau nomor HP..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-sky-400 focus:bg-white transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Date filters */}
            <input
              type="date"
              value={from}
              onChange={e => { setFrom(e.target.value); setPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-sky-400 transition-colors"
            />
            <span className="text-slate-400 text-sm">—</span>
            <input
              type="date"
              value={to}
              onChange={e => { setTo(e.target.value); setPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-sky-400 transition-colors"
            />

            <div className="flex items-center gap-2 ml-auto">
              {/* Bulk delete */}
              {selected.size > 0 && (
                <button
                  onClick={() => confirmAndDelete([...selected], `${selected.size} data`)}
                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors"
                >
                  <Trash2 size={14} />
                  Hapus ({selected.size})
                </button>
              )}
              {/* Export */}
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                Export CSV
              </button>
              {/* Refresh */}
              <button
                onClick={() => { loadStats(); loadLeads(page); }}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-500 transition-colors"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="pl-5 pr-3 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={leads.data.length > 0 && selected.size === leads.data.length}
                      onChange={toggleAll}
                      className="rounded accent-sky-500 cursor-pointer"
                    />
                  </th>
                  <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">#</th>
                  <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Nama</th>
                  <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Nomor HP</th>
                  <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal</th>
                  <th className="px-4 py-3.5 w-12" />
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400">
                      <Loader2 size={22} className="animate-spin mx-auto mb-2" />
                      <p className="text-sm">Memuat data...</p>
                    </td>
                  </tr>
                ) : leads.data.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-400">
                      <div className="text-3xl mb-2">📭</div>
                      <p className="text-sm">Tidak ada data ditemukan.</p>
                    </td>
                  </tr>
                ) : (
                  leads.data.map((lead, i) => {
                    const rowNum = (leads.current_page - 1) * 15 + i + 1;
                    const isSelected = selected.has(lead.id);
                    return (
                      <tr
                        key={lead.id}
                        className={`border-b border-slate-100 transition-colors ${
                          isSelected ? 'bg-sky-50/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="pl-5 pr-3 py-3.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleOne(lead.id)}
                            className="rounded accent-sky-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 font-medium">{rowNum}</td>
                        <td className="px-4 py-3.5 font-semibold text-slate-800">{lead.name}</td>
                        <td className="px-4 py-3.5 text-slate-600 font-mono text-xs">{lead.phone}</td>
                        <td className="px-4 py-3.5 text-slate-600">{lead.email}</td>
                        <td className="px-4 py-3.5 text-slate-400 text-xs whitespace-nowrap">{fmtDate(lead.created_at)}</td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={() => confirmAndDelete([lead.id], `"${lead.name}"`)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && leads.last_page > 1 && (
            <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-sm">
              <span className="text-slate-400">
                Total <span className="font-semibold text-slate-700">{leads.total}</span> data
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={leads.current_page === 1}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: leads.last_page }, (_, i) => i + 1)
                  .filter(p => Math.abs(p - leads.current_page) <= 2 || p === 1 || p === leads.last_page)
                  .reduce((acc, p, i, arr) => {
                    if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '...' ? (
                      <span key={`ellipsis-${i}`} className="px-1 text-slate-400">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors ${
                          p === leads.current_page
                            ? 'gradient-brand text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                <button
                  onClick={() => setPage(p => Math.min(leads.last_page, p + 1))}
                  disabled={leads.current_page === leads.last_page}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Confirm delete modal */}
      <AnimatePresence>
        {confirmDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              onClick={() => setConfirmDelete(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center mb-4">
                  <Trash2 size={22} className="text-rose-500" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Hapus Data?</h3>
                <p className="text-slate-500 text-sm mb-5">
                  Data {confirmDelete.label} akan dihapus permanen dan tidak bisa dikembalikan.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={executeDelete}
                    className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm transition-colors"
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toast && (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
