<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div class="card p-5"><div class="text-sm text-slate-500">Total Produk</div><div class="mt-2 text-3xl font-bold">{{ $stats['total_products'] }}</div></div>
            <div class="card p-5"><div class="text-sm text-slate-500">Flash Sale Aktif</div><div class="mt-2 text-3xl font-bold text-orange-600">{{ $stats['active_flash_sale'] }}</div></div>
            <div class="card p-5"><div class="text-sm text-slate-500">Pesanan Pending</div><div class="mt-2 text-3xl font-bold text-blue-600">{{ $stats['pending_orders'] }}</div></div>
            <div class="card p-5"><div class="text-sm text-slate-500">Revenue Bulan Ini</div><div class="mt-2 text-3xl font-bold text-green-600">Rp {{ number_format($stats['total_revenue'], 0, ',', '.') }}</div></div>
            <div class="card p-5"><div class="text-sm text-slate-500">Makanan Diselamatkan</div><div class="mt-2 text-3xl font-bold text-emerald-600">{{ $stats['food_saved'] }}</div></div>
            <div class="card p-5"><div class="text-sm text-slate-500">Donasi Diberikan</div><div class="mt-2 text-3xl font-bold text-purple-600">{{ $stats['donations_given'] }}</div></div>
        </div>

        <div class="card p-6">
            <div class="mb-4 flex items-center justify-between"><h2 class="text-xl font-bold">Produk Mendekati Expired</h2><a href="{{ route('mitra.inventory') }}" class="btn-secondary">Lihat Semua</a></div>
            <div class="space-y-3">
                @foreach ([['Roti Keju', 15, '2 jam', 'text-red-600'], ['Salad Caesar', 8, '4 jam', 'text-orange-600'], ['Sandwich Tuna', 20, '6 jam', 'text-yellow-600']] as $item)
                    <div class="rounded-xl bg-slate-50 p-4"><div class="flex items-center justify-between gap-4"><div><div class="font-semibold">{{ $item[0] }}</div><div class="text-sm text-slate-500">Stok: {{ $item[1] }} unit</div></div><div class="text-right {{ $item[3] }} font-semibold">{{ $item[2] }}</div></div></div>
                @endforeach
            </div>
        </div>

        <div class="card p-6">
            <div class="mb-4 flex items-center justify-between"><h2 class="text-xl font-bold">Pesanan Terbaru</h2><a href="{{ route('mitra.orders') }}" class="btn-secondary">Lihat Semua</a></div>
            <div class="space-y-3">
                @foreach ([['Budi Santoso', 'Roti Tawar (3 pcs)', 25000, 'Menunggu Diambil'], ['Siti Nurhaliza', 'Salad Bowl (2 pcs)', 45000, 'Selesai'], ['Ahmad Rizki', 'Sandwich (1 pc)', 15000, 'Menunggu Diambil']] as $order)
                    <div class="rounded-xl border border-slate-200 p-4"><div class="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><div class="font-semibold">{{ $order[0] }}</div><div class="text-sm text-slate-500">{{ $order[1] }}</div></div><div class="flex items-center gap-4"><div class="text-right"><div class="font-semibold text-green-600">Rp {{ number_format($order[2], 0, ',', '.') }}</div><div class="text-xs {{ $order[3] === 'Selesai' ? 'text-green-600' : 'text-orange-600' }}">{{ $order[3] }}</div></div></div></div></div>
                @endforeach
            </div>
        </div>
    </x-dashboard-shell>
</x-layouts.app>
