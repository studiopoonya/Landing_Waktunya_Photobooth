@if ($paginator->hasPages())
    <div class="flex items-center justify-between text-sm">
        <span class="text-white/30">
            Menampilkan {{ $paginator->firstItem() }}–{{ $paginator->lastItem() }} dari {{ $paginator->total() }} data
        </span>
        <div class="flex gap-1">
            {{-- Previous --}}
            @if ($paginator->onFirstPage())
                <span class="px-3 py-1.5 text-white/20 border border-white/8 rounded-lg">←</span>
            @else
                <a href="{{ $paginator->previousPageUrl() }}" class="px-3 py-1.5 text-white/60 hover:text-white border border-white/8 hover:border-white/20 rounded-lg transition-colors">←</a>
            @endif

            {{-- Pages --}}
            @foreach ($elements as $element)
                @if (is_string($element))
                    <span class="px-3 py-1.5 text-white/30">{{ $element }}</span>
                @endif
                @if (is_array($element))
                    @foreach ($element as $page => $url)
                        @if ($page == $paginator->currentPage())
                            <span class="px-3 py-1.5 bg-rose-500 text-white rounded-lg font-medium">{{ $page }}</span>
                        @else
                            <a href="{{ $url }}" class="px-3 py-1.5 text-white/60 hover:text-white border border-white/8 hover:border-white/20 rounded-lg transition-colors">{{ $page }}</a>
                        @endif
                    @endforeach
                @endif
            @endforeach

            {{-- Next --}}
            @if ($paginator->hasMorePages())
                <a href="{{ $paginator->nextPageUrl() }}" class="px-3 py-1.5 text-white/60 hover:text-white border border-white/8 hover:border-white/20 rounded-lg transition-colors">→</a>
            @else
                <span class="px-3 py-1.5 text-white/20 border border-white/8 rounded-lg">→</span>
            @endif
        </div>
    </div>
@endif
