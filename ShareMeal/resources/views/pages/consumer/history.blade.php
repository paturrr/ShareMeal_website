<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        <div class="grid gap-4 md:grid-cols-3">
            <div class="stat-card"><div class="text-3xl font-bold text-green-600">{{ $stats['total_transactions'] }}</div><div class="mt-1 text-sm text-slate-600">Total Transaksi</div></div>
            <div class="stat-card"><div class="text-3xl font-bold text-blue-600">Rp {{ number_format($stats['total_savings'], 0, ',', '.') }}</div><div class="mt-1 text-sm text-slate-600">Total Hemat</div></div>
            <div class="stat-card"><div class="text-3xl font-bold text-yellow-500">{{ number_format($stats['average_rating'], 1) }} ⭐</div><div class="mt-1 text-sm text-slate-600">Rata-rata Rating</div></div>
        </div>

        <div class="space-y-4">
            @foreach ($transactions as $transaction)
                <div class="card p-6">
                    <div class="flex flex-col justify-between gap-4 md:flex-row">
                        <div>
                            <div class="flex flex-wrap items-center gap-3"><h3 class="text-xl font-bold">{{ $transaction['store'] }}</h3><span class="badge-green">{{ ucfirst($transaction['status']) }}</span></div>
                            <div class="mt-2 text-sm text-slate-500">{{ $transaction['date'] }} • #{{ $transaction['order_id'] }}</div>
                            <div class="mt-1 text-sm text-slate-500">{{ $transaction['store_address'] }}</div>
                        </div>
                        <div class="text-right"><div class="text-2xl font-bold">Rp {{ number_format($transaction['total'], 0, ',', '.') }}</div><div class="text-sm text-slate-400 line-through">Rp {{ number_format($transaction['subtotal'], 0, ',', '.') }}</div><div class="text-sm font-semibold text-green-600">Hemat Rp {{ number_format($transaction['discount'], 0, ',', '.') }}</div></div>
                    </div>
                    <div class="mt-4 border-t pt-4 space-y-2">
                        @foreach ($transaction['items'] as $item)
                            <div class="flex items-center justify-between text-sm"><div>{{ $item['name'] }} × {{ $item['quantity'] }}</div><div class="font-medium">Rp {{ number_format($item['price'] * $item['quantity'], 0, ',', '.') }}</div></div>
                        @endforeach
                    </div>
                    @if (($transaction['rating'] ?? 0) > 0)
                        <div class="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-slate-700"><div class="font-semibold">Rating Anda: {{ str_repeat('★', (int) $transaction['rating']) }}</div>@if(!empty($transaction['review']))<div class="mt-2 italic">"{{ $transaction['review'] }}"</div>@endif</div>
                    @else
                        <form method="post" action="{{ route('consumer.history.review') }}" class="mt-4 space-y-3 rounded-xl border border-slate-200 p-4">
                            @csrf
                            <input type="hidden" name="transaction_id" value="{{ $transaction['id'] }}">
                            <div>
                                <label class="mb-2 block text-sm font-semibold">Rating</label>
                                <select name="rating" class="select" required><option value="">Pilih rating</option>@for($i=1; $i<=5; $i++)<option value="{{ $i }}">{{ $i }} bintang</option>@endfor</select>
                            </div>
                            <div>
                                <label class="mb-2 block text-sm font-semibold">Ulasan</label>
                                <textarea name="review" class="textarea" placeholder="Bagikan pengalaman Anda..."></textarea>
                            </div>
                            <button class="btn-primary" type="submit">Kirim Review</button>
                        </form>
                    @endif
                </div>
            @endforeach
        </div>
    </x-dashboard-shell>
</x-layouts.app>
