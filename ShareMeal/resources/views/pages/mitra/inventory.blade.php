<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        <div class="card p-6">
            <h2 class="text-xl font-bold">Tambah Produk Baru</h2>
            <form method="post" action="{{ route('mitra.inventory.store') }}" class="mt-4 grid gap-4 md:grid-cols-2">
                @csrf
                <div><label class="mb-2 block text-sm font-semibold">Nama Produk</label><input class="input" name="name" required></div>
                <div><label class="mb-2 block text-sm font-semibold">Kategori</label><select class="select" name="category"><option>Bakery</option><option>Healthy</option><option>Meal</option><option>Snack</option><option>Beverage</option></select></div>
                <div><label class="mb-2 block text-sm font-semibold">Harga Normal</label><input class="input" type="number" name="price" required></div>
                <div><label class="mb-2 block text-sm font-semibold">Stok</label><input class="input" type="number" name="stock" required></div>
                <div><label class="mb-2 block text-sm font-semibold">Waktu Expired</label><input class="input" type="datetime-local" name="expires_at" required></div>
                <div class="md:col-span-2"><label class="mb-2 block text-sm font-semibold">Deskripsi & Kondisi</label><textarea class="textarea" name="description"></textarea></div>
                <div class="md:col-span-2"><button class="btn-primary" type="submit">Simpan Produk</button></div>
            </form>
        </div>

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            @foreach ($products as $product)
                <div class="card overflow-hidden">
                    <img src="{{ $product['image'] }}" alt="{{ $product['name'] }}" class="h-48 w-full object-cover">
                    <div class="p-5">
                        <div class="flex items-start justify-between gap-4">
                            <div><h3 class="text-lg font-semibold">{{ $product['name'] }}</h3><div class="text-sm text-slate-500">{{ $product['category'] }}</div></div>
                            @if ($product['status'] === 'flash-sale')<span class="badge-red">Flash Sale</span>@else<span class="badge-blue">Normal</span>@endif
                        </div>
                        <div class="mt-3 text-sm text-orange-600">Expired: {{ $product['expires_at'] }}</div>
                        <div class="mt-3 flex items-center justify-between"><div>@if($product['discount_price'] > 0)<div class="text-lg font-bold text-green-600">Rp {{ number_format($product['discount_price'], 0, ',', '.') }}</div><div class="text-sm text-slate-400 line-through">Rp {{ number_format($product['price'], 0, ',', '.') }}</div>@else<div class="text-lg font-bold">Rp {{ number_format($product['price'], 0, ',', '.') }}</div>@endif</div><div class="text-sm font-medium">Stok: {{ $product['stock'] }}</div></div>
                        <div class="mt-4 flex flex-wrap gap-2">
                            @if ($product['status'] === 'normal')
                                <form method="post" action="{{ route('mitra.inventory.flash-sale', $product['id']) }}">@csrf<button class="btn-primary" type="submit">Set Flash Sale</button></form>
                            @else
                                <span class="badge-orange">Timer Aktif</span>
                            @endif
                            <form method="post" action="{{ route('mitra.inventory.delete', $product['id']) }}">@csrf<button class="btn-danger" type="submit">Hapus</button></form>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="card border-blue-200 bg-blue-50 p-6 text-sm text-blue-900">Sistem klasifikasi otomatis akan membantu memindahkan produk mendekati expired ke mode jual atau donasi sesuai kelayakan.</div>
    </x-dashboard-shell>
</x-layouts.app>
