import { useState, useEffect } from 'react';
import { Save, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';
import { getSetting, updateSetting } from '../adminApi';

const defaultPromo = {
  tagline:         'Jangan Lewatkan',
  title:           'Siap Membuat Acara Anda Tak Terlupakan?',
  description:     'Hubungi kami sekarang. Promo terbatas untuk 20 pemesan pertama bulan ini!',
  discount_label:  'Hemat 40%',
  discount_amount: '15K',
  button_text:     'Claim Promo Sekarang',
  active:          true,
};

export default function PromoPage({ showToast }) {
  const [promo,   setPromo]   = useState(defaultPromo);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    getSetting('promo')
      .then(data => { if (data) setPromo(data); })
      .finally(() => setLoading(false));
  }, []);

  const update = (field, value) => setPromo(prev => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSetting('promo', promo);
      showToast('Promo berhasil disimpan!');
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
        <h1 className="text-xl font-black text-slate-900">Promo</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 gradient-brand text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm disabled:opacity-60"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Simpan
        </button>
      </div>

      <div className="max-w-xl space-y-5">

        {/* Active toggle */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-800 text-sm">Status Promo</p>
            <p className="text-xs text-slate-400 mt-0.5">Tampilkan atau sembunyikan banner promo di landing page</p>
          </div>
          <button onClick={() => update('active', !promo.active)} className="transition-colors">
            {promo.active
              ? <ToggleRight size={36} className="text-sky-500" />
              : <ToggleLeft  size={36} className="text-slate-300" />
            }
          </button>
        </div>

        {/* Form fields */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Tagline (atas judul)</label>
            <input value={promo.tagline} onChange={e => update('tagline', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Judul</label>
            <input value={promo.title} onChange={e => update('title', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label>
            <textarea value={promo.description} onChange={e => update('description', e.target.value)} rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Label Diskon (badge navbar)</label>
              <input value={promo.discount_label} onChange={e => update('discount_label', e.target.value)}
                placeholder="Hemat 40%"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Nominal Diskon (form)</label>
              <div className="flex items-center gap-2">
                <input value={promo.discount_amount} onChange={e => update('discount_amount', e.target.value)}
                  placeholder="15K"
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Teks Tombol</label>
            <input value={promo.button_text} onChange={e => update('button_text', e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-sky-400 transition-colors" />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-slate-900 rounded-2xl p-5 text-white">
          <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">Preview</p>
          <span className="text-sky-400 text-xs font-bold uppercase tracking-widest">{promo.tagline}</span>
          <h3 className="text-lg font-black mt-1 mb-1">{promo.title}</h3>
          <p className="text-slate-400 text-xs mb-3">{promo.description}</p>
          <span className="gradient-brand text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block">
            {promo.button_text}
          </span>
        </div>

        <p className="text-slate-400 text-xs">
          Perubahan akan langsung tampil di landing page setelah disimpan.
        </p>
      </div>
    </div>
  );
}
