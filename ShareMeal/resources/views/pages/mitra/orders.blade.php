<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        @php
            $allOrders = collect($orders)->map(function ($order) {
                return [
                    'id' => $order['id'],
                    'customer' => ['name' => $order['consumer_name'], 'phone' => '08123456789', 'email' => 'customer@email.com'],
                    'items' => [['name' => $order['deal_item'], 'quantity' => $order['quantity'], 'price' => $order['price']]],
                    'total' => $order['price'] * $order['quantity'],
                    'status' => $order['status'],
                    'pickup_code' => 'PICK-' . strtoupper(substr($order['id'], -6)),
                    'order_time' => $order['order_date'],
                    'pickup_time' => date('Y-m-d H:i', strtotime($order['order_date'] . ' +8 hours')),
                ];
            });
            $pending = $allOrders->where('status', 'pending');
            $completed = $allOrders->where('status', 'completed');
            $active = request('tab', $activeTab);
        @endphp
        <div class="flex gap-2">
            <a href="{{ route('mitra.orders', ['tab' => 'pending']) }}" class="{{ $active === 'pending' ? 'btn-primary' : 'btn-secondary' }}">Menunggu ({{ $pending->count() }})</a>
            <a href="{{ route('mitra.orders', ['tab' => 'completed']) }}" class="{{ $active === 'completed' ? 'btn-primary' : 'btn-secondary' }}">Selesai ({{ $completed->count() }})</a>
        </div>
        <div class="space-y-4">
            @foreach (($active === 'completed' ? $completed : $pending) as $order)
                <div class="card p-6">
                    <div class="flex flex-col justify-between gap-4 md:flex-row">
                        <div><div class="flex items-center gap-3"><h3 class="text-xl font-bold">Pesanan #{{ $order['id'] }}</h3><span class="{{ $order['status'] === 'completed' ? 'badge-green' : 'badge-orange' }}">{{ $order['status'] === 'completed' ? 'Selesai' : 'Menunggu Diambil' }}</span></div><div class="mt-2 text-sm text-slate-500">Dipesan: {{ $order['order_time'] }}</div></div>
                        <div class="text-right text-2xl font-bold text-green-600">Rp {{ number_format($order['total'], 0, ',', '.') }}</div>
                    </div>
                    <div class="mt-4 grid gap-4 border-t pt-4 md:grid-cols-2">
                        <div><div class="font-semibold">Informasi Pembeli</div><div class="mt-2 text-sm text-slate-600">{{ $order['customer']['name'] }}<br>{{ $order['customer']['phone'] }}<br>{{ $order['customer']['email'] }}</div></div>
                        <div><div class="font-semibold">Kode Pengambilan</div><div class="mt-2 rounded-xl bg-slate-100 p-4 text-center font-mono text-2xl font-bold">{{ $order['pickup_code'] }}</div><div class="mt-2 text-sm text-slate-500">Jadwal: {{ $order['pickup_time'] }}</div></div>
                    </div>
                    <div class="mt-4 border-t pt-4 space-y-2">@foreach ($order['items'] as $item)<div class="flex justify-between text-sm"><div>{{ $item['name'] }} × {{ $item['quantity'] }}</div><div class="font-medium">Rp {{ number_format($item['price'] * $item['quantity'], 0, ',', '.') }}</div></div>@endforeach</div>
                    @if ($order['status'] === 'pending')
                        <form method="post" action="{{ route('mitra.orders.confirm', $order['id']) }}" class="mt-4">@csrf<button class="btn-primary w-full" type="submit">Konfirmasi Sudah Diambil</button></form>
                    @endif
                </div>
            @endforeach
        </div>
    </x-dashboard-shell>
</x-layouts.app>
