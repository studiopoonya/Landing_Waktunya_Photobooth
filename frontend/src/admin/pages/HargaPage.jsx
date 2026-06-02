import { useState, useEffect } from 'react';
import { Save, Loader2, Star } from 'lucide-react';
import { getSetting, updateSetting } from '../adminApi';

const defaultPackages = [
  { id: 'no-print', emoji: '📱', label: 'Tanpa Print', sublabel: '2 Jam · Digital Only', price: '1.000.000', desc: 'Cocok untuk event casual tanpa cetak foto.', highlight: false },
  { id: '2jam',     emoji: '⭐', label: 'Paket 2 Jam', sublabel: '2 Jam · Cetak 2R atau 4R', price: '1.499.000', desc: 'Pilihan paling populer untuk semua jenis acara.', highlight: true },
  { id: '3jam',     emoji: '🎉', label: 'Paket 3 Jam', sublabel: '3 Jam · Cetak 2R atau 4R', price: '1.849.000', desc: 'Ideal untuk pernikahan dan event besar.', highlight: false },
];

export default function HargaPage({ showToast }) {
  const [packages, setPackages] = useState(defaultPackages);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);

  useEffect(() => {
    getSetting('packages')
      .then(data => { if (data) setPackages(data); })
      .finally(() => setLoading(false));
  }, []);

  const update = (idx, field, value) => {
    setPackages(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const setHighlight = (idx) => {
    setPackages(prev => prev.map((p, i) => ({ ...p, highlight: i === idx })));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSetting('packages', packages);
      showToast('Harga berhasil disimpan!');
    } catch {
      showToast('Gagal menyimpan.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 size={24} className="animate-spin text-slate-400" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-black text-slate-900">Harga Paket</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 gradient-brand text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Simpan
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {packages.map((pkg, idx) => (
          <div key={pkg.id} className={`bg-white rounded-2xl border-2 p-5 space-y-4 ${pkg.highlight ? 'border-sky-400 shadow-lg shadow-sky-100' : 'border-slate-200'}`}>

            {/* Highlight toggle */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Paket {idx + 1}</span>
              <button
                onClick={() => setHighlight(idx)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                  pkg.highlight ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-500 hover:bg-sky-50 hover:text-sky-600'
                }`}
              >
                <Star size={11} fill={pkg.highlight ? 'currentColor' : 'none'} />
                {pkg.highlight ? 'Terlaris' : 'Set Terlaris'}
              </button>
            </div>

            {/* Emoji */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Emoji</label>
              <input value={pkg.emoji} onChange={e => update(idx, 'emoji', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-sky-400 transition-colors" />
            </div>

            {/* Label */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Paket</label>
              <input value={pkg.label} onChange={e => update(idx, 'label', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-sky-400 transition-colors" />
            </div>

            {/* Sublabel */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Sub-label</label>
              <input value={pkg.sublabel} onChange={e => update(idx, 'sublabel', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-sky-400 transition-colors" />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Harga (tanpa Rp)</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 font-medium">Rp</span>
                <input value={pkg.price} onChange={e => update(idx, 'price', e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-sky-400 transition-colors font-mono" />
              </div>
            </div>

            {/* Desc */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label>
              <textarea value={pkg.desc} onChange={e => update(idx, 'desc', e.target.value)} rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-sky-400 transition-colors resize-none" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-slate-400 text-xs mt-4">
        Perubahan akan langsung tampil di landing page setelah disimpan.
      </p>
    </div>
  );
}
