<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        @php($active = request('tab', $activeTab))
        <div class="card border-purple-200 bg-purple-50 p-4 text-sm text-purple-800">Sistem first-come, first-served berlaku untuk semua donasi. Pastikan lembaga siap menerima sebelum melakukan klaim.</div>
        <div class="flex gap-2">
            <a href="{{ route('lembaga.donations', ['tab' => 'available']) }}" class="{{ $active === 'available' ? 'btn-primary' : 'btn-secondary' }}">Tersedia</a>
            <a href="{{ route('lembaga.donations', ['tab' => 'claimed']) }}" class="{{ $active === 'claimed' ? 'btn-primary' : 'btn-secondary' }}">Diproses</a>
            <a href="{{ route('lembaga.donations', ['tab' => 'completed']) }}" class="{{ $active === 'completed' ? 'btn-primary' : 'btn-secondary' }}">Riwayat</a>
        </div>
        <div class="space-y-4">
            @foreach (collect($donations)->where('status', $active === 'claimed' ? 'claimed' : ($active === 'completed' ? 'completed' : 'available')) as $donation)
                <div class="card p-6">
                    <div class="flex flex-col justify-between gap-4 md:flex-row"><div><div class="flex items-center gap-3"><h3 class="text-xl font-bold">{{ $donation['store']['name'] }}</h3>@if($donation['status']==='available')<span class="badge-green">Tersedia</span>@elseif($donation['status']==='claimed')<span class="badge-blue">Diproses</span>@else<span class="badge-purple">Selesai</span>@endif</div><div class="mt-2 text-sm text-slate-500">{{ $donation['store']['address'] }} • {{ $donation['distance'] }}</div></div><div class="text-sm text-slate-500">#{{ $donation['id'] }}</div></div>
                    <div class="mt-4 border-t pt-4 space-y-2">@foreach ($donation['items'] as $item)<div class="flex justify-between rounded-xl bg-slate-50 p-3 text-sm"><span>{{ $item['name'] }}</span><span class="font-medium">{{ $item['quantity'] }} unit</span></div>@endforeach</div>
                    @if ($donation['status'] === 'available')
                        <div class="mt-4 flex items-center justify-between gap-4"><div class="text-sm text-orange-600">Tersedia sampai: {{ $donation['available_until'] }}</div><form method="post" action="{{ route('lembaga.donations.claim', $donation['id']) }}">@csrf<button class="btn-primary" type="submit">Klaim Donasi</button></form></div>
                    @elseif ($donation['status'] === 'claimed')
                        <div class="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">Diklaim: {{ $donation['claimed_at'] }} • Status: {{ $donation['tracking_status'] }}</div>
                        <form method="post" action="{{ route('lembaga.donations.complete', $donation['id']) }}" class="mt-4">@csrf<button class="btn-primary" type="submit">Konfirmasi Diterima</button></form>
                    @else
                        <div class="mt-4 rounded-xl bg-green-50 p-4 text-sm text-green-800">Diklaim: {{ $donation['claimed_at'] }} • Diterima: {{ $donation['delivered_at'] }}</div>
                    @endif
                </div>
            @endforeach
        </div>
    </x-dashboard-shell>
</x-layouts.app>
