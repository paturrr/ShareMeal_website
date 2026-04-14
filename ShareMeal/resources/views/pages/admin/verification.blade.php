<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        @php($active = request('tab', $activeTab))
        <div class="card border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">Admin dapat melakukan validasi, menyetujui, atau menolak pendaftaran mitra dan lembaga sosial baru. Pastikan dokumen legalitas lengkap sebelum menyetujui.</div>
        <div class="flex gap-2">
            <a href="{{ route('admin.verification', ['tab' => 'pending']) }}" class="{{ $active === 'pending' ? 'btn-primary' : 'btn-secondary' }}">Pending</a>
            <a href="{{ route('admin.verification', ['tab' => 'approved']) }}" class="{{ $active === 'approved' ? 'btn-primary' : 'btn-secondary' }}">Disetujui</a>
            <a href="{{ route('admin.verification', ['tab' => 'rejected']) }}" class="{{ $active === 'rejected' ? 'btn-primary' : 'btn-secondary' }}">Ditolak</a>
        </div>
        <div class="space-y-4">
            @foreach (collect($applications)->where('status', $active) as $application)
                <div class="card p-6">
                    <div class="flex flex-col justify-between gap-4 md:flex-row"><div><div class="flex items-center gap-3"><h3 class="text-xl font-bold">{{ $application['name'] }}</h3><span class="{{ $application['type'] === 'mitra' ? 'badge-blue' : 'badge-purple' }}">{{ ucfirst($application['type']) }}</span><span class="{{ $application['status'] === 'approved' ? 'badge-green' : ($application['status'] === 'rejected' ? 'badge-red' : 'badge-orange') }}">{{ ucfirst($application['status']) }}</span></div><div class="mt-2 text-sm text-slate-600">{{ $application['business_type'] }}</div></div><div class="text-sm text-slate-500">Diajukan: {{ $application['submitted_at'] }}</div></div>
                    <div class="mt-4 grid gap-4 border-t pt-4 md:grid-cols-2"><div class="text-sm text-slate-600">{{ $application['email'] }}<br>{{ $application['phone'] }}<br>{{ $application['address'] }}</div><div class="text-sm text-slate-600">{{ $application['description'] }}@if(!empty($application['beneficiaries']))<br>Penerima manfaat: {{ $application['beneficiaries'] }} orang@endif</div></div>
                    <div class="mt-4 border-t pt-4"><div class="mb-2 font-semibold">Dokumen Legalitas</div><div class="grid gap-2 md:grid-cols-2">@foreach ($application['documents'] as $document)<div class="rounded-xl bg-slate-50 p-3 text-sm">{{ $document }}</div>@endforeach</div></div>
                    @if ($application['status'] === 'pending')
                        <div class="mt-4 flex flex-col gap-3 md:flex-row">
                            <form method="post" action="{{ route('admin.verification.approve', $application['id']) }}">@csrf<button class="btn-primary" type="submit">Setujui</button></form>
                            <form method="post" action="{{ route('admin.verification.reject', $application['id']) }}" class="flex-1 md:max-w-xl">@csrf<input class="input" type="text" name="reason" placeholder="Alasan penolakan" required><button class="btn-danger mt-3" type="submit">Tolak</button></form>
                        </div>
                    @elseif ($application['status'] === 'rejected' && !empty($application['reject_reason']))
                        <div class="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800"><strong>Alasan:</strong> {{ $application['reject_reason'] }}</div>
                    @endif
                </div>
            @endforeach
        </div>
    </x-dashboard-shell>
</x-layouts.app>
