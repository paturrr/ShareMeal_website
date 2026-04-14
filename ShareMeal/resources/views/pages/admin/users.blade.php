<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        @php
            $stats = [
                'total' => collect($allUsers)->count(),
                'consumers' => collect($allUsers)->where('type', 'consumer')->count(),
                'mitra' => collect($allUsers)->where('type', 'mitra')->count(),
                'lembaga' => collect($allUsers)->where('type', 'lembaga')->count(),
                'active' => collect($allUsers)->where('status', 'active')->count(),
                'warned' => collect($allUsers)->where('status', 'warned')->count(),
                'blocked' => collect($allUsers)->where('status', 'blocked')->count(),
            ];
        @endphp
        <div class="grid gap-4 md:grid-cols-4 xl:grid-cols-7">@foreach (['total' => 'Total User', 'consumers' => 'Konsumen', 'mitra' => 'Mitra', 'lembaga' => 'Lembaga', 'active' => 'Aktif', 'warned' => 'Warning', 'blocked' => 'Blocked'] as $key => $label)<div class="stat-card"><div class="text-2xl font-bold">{{ $stats[$key] }}</div><div class="mt-1 text-xs text-slate-600">{{ $label }}</div></div>@endforeach</div>
        <form method="get" class="card p-6"><div class="grid gap-4 md:grid-cols-[1fr_220px_220px_auto]"><input class="input" type="text" name="search" value="{{ $search }}" placeholder="Cari nama atau email..."><select class="select" name="type"><option value="all">Semua Tipe</option><option value="consumer" {{ $type === 'consumer' ? 'selected' : '' }}>Konsumen</option><option value="mitra" {{ $type === 'mitra' ? 'selected' : '' }}>Mitra</option><option value="lembaga" {{ $type === 'lembaga' ? 'selected' : '' }}>Lembaga</option></select><select class="select" name="status"><option value="all">Semua Status</option><option value="active" {{ $status === 'active' ? 'selected' : '' }}>Aktif</option><option value="warned" {{ $status === 'warned' ? 'selected' : '' }}>Warning</option><option value="blocked" {{ $status === 'blocked' ? 'selected' : '' }}>Blocked</option></select><button class="btn-primary" type="submit">Filter</button></div></form>
        <div class="space-y-4">
            @forelse ($users as $user)
                <div class="card p-6">
                    <div class="flex flex-col justify-between gap-4 md:flex-row"><div><div class="flex flex-wrap items-center gap-3"><h3 class="text-xl font-bold">{{ $user['name'] }}</h3><span class="{{ $user['type'] === 'consumer' ? 'badge-blue' : ($user['type'] === 'mitra' ? 'badge-green' : 'badge-purple') }}">{{ ucfirst($user['type']) }}</span><span class="{{ $user['status'] === 'active' ? 'badge-green' : ($user['status'] === 'warned' ? 'badge-orange' : 'badge-red') }}">{{ ucfirst($user['status']) }}</span></div><div class="mt-2 text-sm text-slate-600">{{ $user['email'] }} • {{ $user['phone'] }} • Bergabung: {{ $user['joined_at'] }}</div></div><div class="text-right"><div class="text-2xl font-bold text-green-600">{{ $user['transactions'] }}</div><div class="text-xs text-slate-500">Transaksi</div></div></div>
                    @if (!empty($user['warning_reason']))<div class="mt-4 rounded-xl bg-orange-50 p-4 text-sm text-orange-800">Peringatan terakhir: {{ $user['warning_reason'] }}</div>@endif
                    @if (!empty($user['block_reason']))<div class="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800">Alasan blokir: {{ $user['block_reason'] }}</div>@endif
                    <div class="mt-4 flex flex-wrap gap-2 border-t pt-4">
                        @if ($user['status'] === 'active')
                            <form method="post" action="{{ route('admin.users.warn', $user['id']) }}">@csrf<button class="btn-secondary" type="submit">Beri Peringatan</button></form>
                            <form method="post" action="{{ route('admin.users.block', $user['id']) }}" class="flex gap-2">@csrf<input class="input" type="text" name="reason" placeholder="Alasan blokir" required><button class="btn-danger" type="submit">Blokir</button></form>
                        @elseif ($user['status'] === 'warned')
                            <form method="post" action="{{ route('admin.users.block', $user['id']) }}" class="flex gap-2">@csrf<input class="input" type="text" name="reason" placeholder="Alasan blokir" required><button class="btn-danger" type="submit">Blokir</button></form>
                        @else
                            <form method="post" action="{{ route('admin.users.unblock', $user['id']) }}">@csrf<button class="btn-primary" type="submit">Buka Blokir</button></form>
                        @endif
                    </div>
                </div>
            @empty
                <div class="card p-12 text-center"><div class="text-lg font-semibold">Tidak Ada User Ditemukan</div><p class="mt-2 text-slate-600">Coba ubah filter atau kata kunci pencarian.</p></div>
            @endforelse
        </div>
    </x-dashboard-shell>
</x-layouts.app>
