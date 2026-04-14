<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        <form method="get" class="card p-6 space-y-4">
            <div class="flex flex-col gap-3 md:flex-row">
                <input class="input flex-1" type="text" name="search" value="{{ $search }}" placeholder="Cari toko atau jenis makanan...">
                <button class="btn-secondary" type="submit">Cari</button>
            </div>
            <div>
                <div class="mb-3 text-sm font-semibold text-slate-700">Filter Kategori</div>
                <div class="flex flex-wrap gap-2">
                    @foreach ($filters as $filter)
                        <label class="cursor-pointer rounded-full border px-4 py-2 text-sm font-medium {{ in_array($filter['id'], $selectedFilters, true) ? 'border-[#174413] bg-green-50 text-[#174413]' : 'border-slate-200 bg-white text-slate-700' }}">
                            <input type="checkbox" name="filters[]" value="{{ $filter['id'] }}" class="hidden" {{ in_array($filter['id'], $selectedFilters, true) ? 'checked' : '' }}>
                            {{ $filter['icon'] }} {{ $filter['label'] }}
                        </label>
                    @endforeach
                </div>
            </div>
        </form>

        <div class="flex items-center justify-between gap-3">
            <h2 class="text-xl font-semibold">{{ $stores->count() }} toko ditemukan</h2>
            <div class="text-sm text-slate-500">Diurutkan berdasarkan jarak terdekat</div>
        </div>

        @forelse ($stores as $store)
            <div class="card overflow-hidden">
                <div class="grid gap-6 md:grid-cols-[220px_1fr]">
                    <img src="{{ $store['image'] }}" alt="{{ $store['name'] }}" class="h-60 w-full object-cover md:h-full">
                    <div class="p-6">
                        <div class="flex flex-col justify-between gap-4 md:flex-row">
                            <div>
                                <h3 class="text-2xl font-bold">{{ $store['name'] }}</h3>
                                <div class="mt-1 text-slate-600">{{ $store['category'] }}</div>
                                <div class="mt-2 text-sm text-slate-500">{{ $store['address'] }} • <span class="font-semibold text-green-600">{{ $store['distance'] }}</span></div>
                                <div class="mt-3 flex flex-wrap gap-2">@foreach ($store['tags'] as $tag)<span class="badge-blue">{{ ucfirst($tag) }}</span>@endforeach</div>
                            </div>
                            <div class="badge-orange">⭐ {{ $store['rating'] }} ({{ $store['reviews'] }})</div>
                        </div>
                        <div class="mt-6 border-t border-slate-200 pt-4">
                            <div class="mb-3 font-semibold">Flash Sale Aktif ({{ count($store['deals']) }})</div>
                            <div class="space-y-3">
                                @foreach ($store['deals'] as $deal)
                                    <div class="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <div class="font-medium">{{ $deal['item'] }}</div>
                                            <div class="mt-1 text-sm text-slate-600">{{ $deal['expires_in'] }} • Stok: {{ $deal['stock'] }}</div>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <div class="text-right">
                                                <div class="text-lg font-bold text-green-600">Rp {{ number_format($deal['discount_price'], 0, ',', '.') }}</div>
                                                <div class="text-sm text-slate-400 line-through">Rp {{ number_format($deal['original_price'], 0, ',', '.') }}</div>
                                            </div>
                                            <form method="post" action="{{ route('consumer.book') }}">
                                                @csrf
                                                <input type="hidden" name="store_id" value="{{ $store['id'] }}">
                                                <input type="hidden" name="deal_id" value="{{ $deal['id'] }}">
                                                <button class="{{ $deal['stock'] > 0 ? 'btn-primary' : 'btn-secondary cursor-not-allowed opacity-60' }}" type="submit" {{ $deal['stock'] > 0 ? '' : 'disabled' }}>{{ $deal['stock'] > 0 ? 'Booking' : 'Habis' }}</button>
                                            </form>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <div class="card p-12 text-center"><div class="text-lg font-semibold">Tidak Ada Hasil</div><p class="mt-2 text-slate-600">Coba ubah kata kunci atau filter pencarian Anda.</p></div>
        @endforelse
    </x-dashboard-shell>
</x-layouts.app>
