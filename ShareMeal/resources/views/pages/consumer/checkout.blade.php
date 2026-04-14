<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        @if (!$booking)
            <div class="card p-12 text-center"><div class="text-lg font-semibold">Booking tidak ditemukan</div><p class="mt-2 text-slate-600">Silakan lakukan booking terlebih dahulu.</p><a href="{{ route('consumer.search') }}" class="btn-primary mt-6">Cari Makanan</a></div>
        @else
            @php($selectedMethodData = collect($paymentMethods)->firstWhere('id', $selectedMethod) ?? $paymentMethods[0])
            <div class="grid gap-6 lg:grid-cols-3">
                <div class="space-y-6 lg:col-span-2">
                    <div class="card border-orange-200 bg-orange-50 p-4"><div class="font-semibold text-orange-900">Selesaikan pembayaran dalam 10 menit.</div><div class="mt-1 text-sm text-orange-700">Referensi pembayaran: {{ $paymentReference }}</div></div>
                    <div class="card p-6">
                        <h2 class="text-xl font-bold">Pilih Metode Pembayaran</h2>
                        <form method="get" action="{{ route('consumer.checkout') }}" class="mt-4 space-y-3">
                            <input type="hidden" name="bookingId" value="{{ $booking['id'] }}">
                            @foreach ($paymentMethods as $method)
                                <label class="flex cursor-pointer items-center gap-3 rounded-xl border p-4 {{ $selectedMethod === $method['id'] ? 'border-[#174413] bg-green-50' : 'border-slate-200' }}">
                                    <input type="radio" name="method" value="{{ $method['id'] }}" {{ $selectedMethod === $method['id'] ? 'checked' : '' }} onchange="this.form.submit()">
                                    <div>
                                        <div class="font-semibold">{{ $method['name'] }}</div>
                                        <div class="text-sm text-slate-500">{{ $method['description'] }}</div>
                                    </div>
                                </label>
                            @endforeach
                        </form>
                    </div>
                    <div class="card p-6">
                        <h2 class="text-xl font-bold">Instruksi Pembayaran</h2>
                        <div class="mt-4 space-y-3 text-sm text-slate-600">
                            <div class="rounded-xl bg-slate-50 p-4">
                                <div class="font-semibold text-slate-900">{{ $selectedMethodData['name'] }}</div>
                                @if ($selectedMethod === 'qris')
                                    <div class="mt-2">Scan QRIS di aplikasi pembayaran pilihan Anda dan konfirmasi transaksi.</div>
                                @elseif (in_array($selectedMethod, ['gopay', 'ovo', 'dana'], true))
                                    <div class="mt-2">Transfer ke nomor <span class="font-mono font-bold">0812-3456-7890</span> lalu tekan tombol konfirmasi.</div>
                                @else
                                    <div class="mt-2">Gunakan virtual account <span class="font-mono font-bold">7024{{ strtoupper(substr($booking['id'], -8)) }}</span> untuk menyelesaikan pembayaran.</div>
                                @endif
                            </div>
                            <ol class="list-decimal space-y-2 pl-5">
                                <li>Buka aplikasi pembayaran atau mobile banking.</li>
                                <li>Pilih metode {{ $selectedMethodData['name'] }}.</li>
                                <li>Masukkan nominal Rp {{ number_format($booking['price'] * $booking['quantity'], 0, ',', '.') }}.</li>
                                <li>Periksa detail pembayaran dan lakukan konfirmasi.</li>
                            </ol>
                        </div>
                    </div>
                    <form method="post" action="{{ route('consumer.checkout.confirm') }}">
                        @csrf
                        <input type="hidden" name="booking_id" value="{{ $booking['id'] }}">
                        <button class="btn-primary w-full py-4" type="submit">Saya Sudah Bayar</button>
                    </form>
                </div>
                <div>
                    <div class="card sticky top-24 p-6">
                        <h2 class="text-xl font-bold">Ringkasan Pesanan</h2>
                        <div class="mt-4 space-y-4 text-sm">
                            <div><div class="font-semibold">{{ $booking['store_name'] }}</div><div class="text-slate-500">{{ $store['address'] ?? 'Lihat di detail toko' }}</div></div>
                            <div class="border-t pt-4"><div class="font-semibold">{{ $booking['deal_item'] }}</div><div class="text-slate-500">Qty: {{ $booking['quantity'] }}</div></div>
                            <div class="border-t pt-4 space-y-2"><div class="flex justify-between"><span class="text-slate-500">Subtotal</span><span>Rp {{ number_format($booking['price'] * $booking['quantity'], 0, ',', '.') }}</span></div><div class="flex justify-between"><span class="text-slate-500">Biaya Admin</span><span>Rp 0</span></div><div class="flex justify-between text-lg font-bold"><span>Total</span><span class="text-green-600">Rp {{ number_format($booking['price'] * $booking['quantity'], 0, ',', '.') }}</span></div></div>
                            <div class="rounded-xl bg-blue-50 p-4 text-blue-800"><div class="font-semibold">Kode Booking</div><div class="mt-1 font-mono text-sm">{{ $booking['id'] }}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    </x-dashboard-shell>
</x-layouts.app>
