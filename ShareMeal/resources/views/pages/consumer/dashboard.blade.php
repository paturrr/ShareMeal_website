<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        <div class="grid gap-4 md:grid-cols-4">
            <div class="stat-card"><div class="text-3xl font-bold text-green-600">{{ $stats['saved_meals'] }}</div><div class="mt-1 text-sm text-slate-600">Makanan Diselamatkan</div></div>
            <div class="stat-card"><div class="text-3xl font-bold text-blue-600">Rp {{ number_format($stats['money_saved'] / 1000, 0) }}k</div><div class="mt-1 text-sm text-slate-600">Uang Dihemat</div></div>
            <div class="stat-card"><div class="text-3xl font-bold text-emerald-600">{{ $stats['co2_reduced'] }} kg</div><div class="mt-1 text-sm text-slate-600">CO₂ Dikurangi</div></div>
            <div class="stat-card"><div class="text-3xl font-bold text-purple-600">{{ $stats['favorite_stores'] }}</div><div class="mt-1 text-sm text-slate-600">Toko Favorit</div></div>
        </div>

        <div class="card border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-5">
            <div class="font-semibold text-orange-900">3 Flash Sale Baru dari Toko Favorit!</div>
            <div class="mt-1 text-sm text-orange-700">Notifikasi push real-time untuk update stok makanan surplus.</div>
        </div>

        <section>
            <div class="mb-4 flex items-center justify-between gap-3">
                <h2 class="text-2xl font-bold">Flash Sale Terdekat</h2>
                <a href="{{ route('consumer.search') }}" class="btn-secondary">Lihat Semua</a>
            </div>
            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                @foreach ($flashSales as $sale)
                    <div class="card overflow-hidden">
                        <div class="relative h-52">
                            <img src="{{ $sale['image'] }}" alt="{{ $sale['item'] }}" class="h-full w-full object-cover">
                            <span class="badge-red absolute right-3 top-3">-{{ $sale['discount'] }}%</span>
                            <span class="absolute bottom-3 left-3 rounded-lg bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow">{{ $sale['expires_in'] }}</span>
                        </div>
                        <div class="p-5">
                            <h3 class="text-lg font-semibold">{{ $sale['item'] }}</h3>
                            <div class="mt-1 text-sm text-slate-600">{{ $sale['store'] }} • {{ $sale['distance'] }}</div>
                            <div class="mt-3 text-sm text-slate-600">Rating {{ $sale['rating'] }} • Stok {{ $sale['stock'] }}</div>
                            <div class="mt-4 flex items-end justify-between gap-4">
                                <div>
                                    <div class="text-2xl font-bold text-green-600">Rp {{ number_format($sale['discount_price'], 0, ',', '.') }}</div>
                                    <div class="text-sm text-slate-400 line-through">Rp {{ number_format($sale['original_price'], 0, ',', '.') }}</div>
                                </div>
                                <form method="post" action="{{ route('consumer.book') }}">
                                    @csrf
                                    <input type="hidden" name="store_id" value="{{ $sale['store_id'] }}">
                                    <input type="hidden" name="deal_id" value="{{ $sale['id'] }}">
                                    <button class="btn-primary" type="submit">Booking</button>
                                </form>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>

        <section class="card p-6">
            <div class="mb-4 flex items-center justify-between gap-3">
                <h2 class="text-xl font-bold">Toko Favorit</h2>
                <button class="btn-secondary" type="button">Kelola</button>
            </div>
            <div class="space-y-3">
                @foreach ($favoriteStores as $store)
                    <div class="rounded-xl bg-slate-50 p-4">
                        <div class="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                            <div>
                                <div class="font-semibold text-slate-900">{{ $store['name'] }}</div>
                                <div class="mt-1 text-sm text-slate-600">{{ $store['category'] }} • {{ $store['distance'] }} • ⭐ {{ $store['rating'] }}</div>
                            </div>
                            <span class="badge-green">{{ $store['active_deals'] }} deals aktif</span>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>
    </x-dashboard-shell>
</x-layouts.app>
