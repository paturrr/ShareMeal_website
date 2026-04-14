<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        @php
            $pendingCount = collect($applications)->where('status', 'pending')->count();
            $totalUsers = collect($users)->count();
            $activeMitra = collect($users)->where('type', 'mitra')->where('status', 'active')->count();
            $activeLembaga = collect($users)->where('type', 'lembaga')->where('status', 'active')->count();
        @endphp
        <div class="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
            <div class="stat-card"><div class="text-2xl font-bold text-blue-600">{{ $totalUsers }}</div><div class="mt-1 text-xs text-slate-600">Total User</div></div>
            <div class="stat-card"><div class="text-2xl font-bold text-orange-600">{{ $pendingCount }}</div><div class="mt-1 text-xs text-slate-600">Pending</div></div>
            <div class="stat-card"><div class="text-2xl font-bold text-green-600">{{ $activeMitra }}</div><div class="mt-1 text-xs text-slate-600">Mitra Aktif</div></div>
            <div class="stat-card"><div class="text-2xl font-bold text-purple-600">{{ $activeLembaga }}</div><div class="mt-1 text-xs text-slate-600">Lembaga Aktif</div></div>
            <div class="stat-card"><div class="text-2xl font-bold text-blue-600">5420</div><div class="mt-1 text-xs text-slate-600">Transaksi</div></div>
            <div class="stat-card"><div class="text-2xl font-bold text-green-600">12.5k</div><div class="mt-1 text-xs text-slate-600">Makanan Saved</div></div>
        </div>
        <div class="card border-orange-200 bg-orange-50 p-5"><div class="font-semibold text-orange-900">{{ $pendingCount }} pendaftaran menunggu verifikasi.</div><div class="mt-1 text-sm text-orange-700">Terdapat mitra dan lembaga sosial baru yang perlu diverifikasi.</div></div>
        <div class="grid gap-6 xl:grid-cols-2">
            <div class="card p-6"><div class="mb-4 flex items-center justify-between"><h2 class="text-xl font-bold">Pending Verifikasi</h2><a href="{{ route('admin.verification') }}" class="btn-secondary">Lihat Semua</a></div><div class="space-y-3">@foreach (collect($applications)->where('status', 'pending')->take(3) as $application)<div class="rounded-xl border border-slate-200 p-4"><div class="font-semibold">{{ $application['name'] }}</div><div class="mt-1 text-sm text-slate-500">{{ ucfirst($application['type']) }} • {{ count($application['documents']) }} dokumen</div><div class="mt-1 text-xs text-slate-400">Diajukan: {{ $application['submitted_at'] }}</div></div>@endforeach</div></div>
            <div class="card p-6"><h2 class="text-xl font-bold">Aktivitas Terbaru</h2><div class="mt-4 space-y-3">@foreach ([['Toko Roti Sejahtera','Menunggu verifikasi dokumen','pending'],['Budi Santoso','Registrasi akun konsumen baru','completed'],['Sistem','Laporan penyalahgunaan dari Toko ABC','alert']] as $activity)<div class="rounded-xl bg-slate-50 p-4"><div class="font-semibold">{{ $activity[0] }}</div><div class="mt-1 text-sm text-slate-600">{{ $activity[1] }}</div><div class="mt-2 text-xs {{ $activity[2] === 'alert' ? 'text-red-600' : ($activity[2] === 'pending' ? 'text-orange-600' : 'text-green-600') }}">{{ ucfirst($activity[2]) }}</div></div>@endforeach</div></div>
        </div>
        <div class="card p-6"><h2 class="text-xl font-bold">Aksi Cepat</h2><div class="mt-4 grid gap-4 md:grid-cols-4"><a href="{{ route('admin.verification') }}" class="btn-secondary text-center">Verifikasi Akun</a><a href="{{ route('admin.users') }}" class="btn-secondary text-center">Kelola User</a><a href="{{ route('admin.education') }}" class="btn-secondary text-center">Edukasi</a><button type="button" class="btn-secondary">Laporan</button></div></div>
    </x-dashboard-shell>
</x-layouts.app>
