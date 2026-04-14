<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        <div class="card border-green-200 bg-green-50 p-6">
            <div class="text-lg font-semibold text-green-900">Lembaga Terverifikasi</div>
            <div class="mt-1 text-sm text-green-800">Status legalitas Anda telah diverifikasi oleh admin sejak 2026-01-15.</div>
        </div>
        <div class="grid gap-4 md:grid-cols-4">
            <div class="stat-card"><div class="text-3xl font-bold text-purple-600">156</div><div class="mt-1 text-sm text-slate-600">Total Donasi</div></div>
            <div class="stat-card"><div class="text-3xl font-bold text-orange-600">8</div><div class="mt-1 text-sm text-slate-600">Aktif</div></div>
            <div class="stat-card"><div class="text-3xl font-bold text-blue-600">120</div><div class="mt-1 text-sm text-slate-600">Penerima Manfaat</div></div>
            <div class="stat-card"><div class="text-3xl font-bold text-green-600">45</div><div class="mt-1 text-sm text-slate-600">Bulan Ini</div></div>
        </div>
        <div class="card p-6">
            <div class="mb-4 flex items-center justify-between"><h2 class="text-xl font-bold">Donasi Tersedia</h2><a href="{{ route('lembaga.donations') }}" class="btn-secondary">Lihat Semua</a></div>
            <div class="space-y-3">
                @foreach (collect($donations)->where('status', 'available')->take(3) as $donation)
                    <div class="rounded-xl border border-slate-200 p-4"><div class="flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><div class="font-semibold">{{ $donation['store']['name'] }}</div><div class="mt-1 text-sm text-slate-600">@foreach($donation['items'] as $item){{ $item['name'] }} ({{ $item['quantity'] }} pcs){{ !$loop->last ? ', ' : '' }}@endforeach</div><div class="mt-2 text-xs text-slate-500">{{ $donation['store']['address'] }} • {{ $donation['distance'] }} • Sampai {{ $donation['available_until'] }}</div></div><form method="post" action="{{ route('lembaga.donations.claim', $donation['id']) }}">@csrf<button class="btn-primary" type="submit">Klaim Donasi</button></form></div></div>
                @endforeach
            </div>
        </div>
        <div class="card p-6"><h2 class="text-xl font-bold">Riwayat Penerimaan Donasi</h2><div class="mt-4 space-y-3">@foreach (collect($donations)->where('status', 'completed') as $donation)<div class="rounded-xl bg-slate-50 p-4"><div class="flex items-center justify-between"><div><div class="font-semibold">{{ $donation['store']['name'] }}</div><div class="mt-1 text-sm text-slate-500">Diterima: {{ $donation['delivered_at'] }}</div></div><span class="badge-green">Diterima</span></div></div>@endforeach</div></div>
    </x-dashboard-shell>
</x-layouts.app>
