<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard — FotoBooth Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-neutral-950 text-white">

{{-- Navbar --}}
<header class="border-b border-white/8 bg-neutral-900/80 backdrop-blur sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
            </div>
            <span class="font-bold text-white">FotoBooth <span class="text-white/40 font-normal text-sm">Admin</span></span>
        </div>
        <div class="flex items-center gap-3">
            <span class="text-white/40 text-sm hidden sm:block">{{ session('admin_email') }}</span>
            <form method="POST" action="{{ route('admin.logout') }}">
                @csrf
                <button class="text-white/50 hover:text-white text-sm border border-white/10 px-3 py-1.5 rounded-lg hover:border-white/25 transition-colors">
                    Keluar
                </button>
            </form>
        </div>
    </div>
</header>

<main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">

    {{-- Flash message --}}
    @if (session('success'))
        <div class="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3">
            {{ session('success') }}
        </div>
    @endif

    {{-- Stats --}}
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="bg-white/5 border border-white/8 rounded-2xl p-5">
            <p class="text-white/40 text-xs uppercase tracking-widest mb-1">Total Leads</p>
            <p class="text-3xl font-black text-white">{{ $total }}</p>
        </div>
        <div class="bg-white/5 border border-white/8 rounded-2xl p-5">
            <p class="text-white/40 text-xs uppercase tracking-widest mb-1">Hari Ini</p>
            <p class="text-3xl font-black text-white">{{ \App\Models\Lead::whereDate('created_at', today())->count() }}</p>
        </div>
        <div class="bg-white/5 border border-white/8 rounded-2xl p-5">
            <p class="text-white/40 text-xs uppercase tracking-widest mb-1">Bulan Ini</p>
            <p class="text-3xl font-black text-white">{{ \App\Models\Lead::whereMonth('created_at', now()->month)->count() }}</p>
        </div>
    </div>

    {{-- Toolbar --}}
    <div class="bg-white/5 border border-white/8 rounded-2xl p-4 mb-4">
        <form method="GET" action="{{ route('admin.dashboard') }}" class="flex flex-col sm:flex-row gap-3">
            <input
                type="text"
                name="search"
                value="{{ request('search') }}"
                placeholder="Cari nama, email, nomor HP..."
                class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-rose-500 transition-colors"
            >
            <input type="date" name="from" value="{{ request('from') }}"
                class="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-rose-500 transition-colors">
            <input type="date" name="until" value="{{ request('until') }}"
                class="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-rose-500 transition-colors">
            <button type="submit" class="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                Filter
            </button>
            @if(request()->hasAny(['search','from','until']))
                <a href="{{ route('admin.dashboard') }}" class="border border-white/10 hover:border-white/25 text-white/60 hover:text-white px-4 py-2.5 rounded-xl text-sm transition-colors text-center">
                    Reset
                </a>
            @endif
        </form>
    </div>

    {{-- Actions bar --}}
    <div class="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div class="flex gap-2" id="bulk-actions" style="display:none!important">
            <form method="POST" action="{{ route('admin.leads.bulk-delete') }}" id="bulk-delete-form">
                @csrf
                <div id="bulk-ids"></div>
                <button type="submit"
                    onclick="return confirm('Hapus data yang dipilih?')"
                    class="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-lg text-sm transition-colors">
                    Hapus Dipilih (<span id="selected-count">0</span>)
                </button>
            </form>
        </div>
        <div class="ml-auto">
            <a href="{{ route('admin.leads.export') }}"
                class="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-sm transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Export Excel
            </a>
        </div>
    </div>

    {{-- Table --}}
    <div class="bg-white/5 border border-white/8 rounded-2xl overflow-hidden">
        @if($leads->isEmpty())
            <div class="text-center py-16 text-white/30">
                <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                </svg>
                <p class="text-sm">Belum ada data lead</p>
            </div>
        @else
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="border-b border-white/8 text-white/40 text-xs uppercase tracking-wide">
                            <th class="px-4 py-3 text-left">
                                <input type="checkbox" id="check-all" class="rounded accent-rose-500 cursor-pointer">
                            </th>
                            <th class="px-4 py-3 text-left">#</th>
                            <th class="px-4 py-3 text-left">Nama</th>
                            <th class="px-4 py-3 text-left">Nomor HP</th>
                            <th class="px-4 py-3 text-left">Email</th>
                            <th class="px-4 py-3 text-left">Tanggal Submit</th>
                            <th class="px-4 py-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        @foreach ($leads as $lead)
                            <tr class="hover:bg-white/3 transition-colors group">
                                <td class="px-4 py-3">
                                    <input type="checkbox" class="row-check rounded accent-rose-500 cursor-pointer" value="{{ $lead->id }}">
                                </td>
                                <td class="px-4 py-3 text-white/30">{{ $lead->id }}</td>
                                <td class="px-4 py-3 font-medium text-white">{{ $lead->name }}</td>
                                <td class="px-4 py-3 text-white/70 font-mono text-xs">{{ $lead->phone }}</td>
                                <td class="px-4 py-3 text-white/70">{{ $lead->email }}</td>
                                <td class="px-4 py-3 text-white/50">
                                    {{ $lead->created_at->timezone('Asia/Jakarta')->format('d M Y, H:i') }}
                                </td>
                                <td class="px-4 py-3 text-center">
                                    <form method="POST" action="{{ route('admin.leads.destroy', $lead) }}"
                                        onsubmit="return confirm('Hapus lead {{ addslashes($lead->name) }}?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit"
                                            class="text-white/25 hover:text-rose-400 transition-colors p-1 rounded-lg hover:bg-rose-500/10"
                                            title="Hapus">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                            </svg>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            {{-- Pagination --}}
            @if($leads->hasPages())
                <div class="px-4 py-4 border-t border-white/8">
                    {{ $leads->links('admin.pagination') }}
                </div>
            @endif
        @endif
    </div>

</main>

<script>
    const checkAll  = document.getElementById('check-all');
    const rowChecks = document.querySelectorAll('.row-check');
    const bulkBar   = document.getElementById('bulk-actions');
    const countEl   = document.getElementById('selected-count');
    const bulkIds   = document.getElementById('bulk-ids');

    function updateBulkBar() {
        const checked = [...rowChecks].filter(c => c.checked);
        if (checked.length > 0) {
            bulkBar.style.removeProperty('display');
            countEl.textContent = checked.length;
            bulkIds.innerHTML = checked.map(c =>
                `<input type="hidden" name="ids[]" value="${c.value}">`
            ).join('');
        } else {
            bulkBar.style.display = 'none';
        }
    }

    checkAll.addEventListener('change', () => {
        rowChecks.forEach(c => c.checked = checkAll.checked);
        updateBulkBar();
    });

    rowChecks.forEach(c => c.addEventListener('change', updateBulkBar));
</script>

</body>
</html>
