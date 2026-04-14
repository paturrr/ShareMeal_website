<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        @php
            $all = collect($allArticles);
            $publishedCount = $all->where('status', 'Published')->count();
            $draftCount = $all->where('status', 'Draft')->count();
        @endphp
        <div class="flex flex-col gap-4 xl:flex-row">
            <div class="card flex-1 p-6">
                <h2 class="text-xl font-bold">Tulis Artikel Baru</h2>
                <form method="post" action="{{ route('admin.education.store') }}" class="mt-4 grid gap-4">
                    @csrf
                    <div><label class="mb-2 block text-sm font-semibold">Judul Artikel</label><input class="input" type="text" name="title" required></div>
                    <div class="grid gap-4 md:grid-cols-2"><div><label class="mb-2 block text-sm font-semibold">Kategori</label><select class="select" name="category"><option>Tips</option><option>Artikel</option><option>Panduan</option><option>Edukasi</option></select></div><div><label class="mb-2 block text-sm font-semibold">Status</label><select class="select" name="status"><option>Draft</option><option>Published</option></select></div></div>
                    <div><label class="mb-2 block text-sm font-semibold">Konten</label><textarea class="textarea" name="content" required></textarea></div>
                    <button class="btn-primary" type="submit">Simpan Artikel</button>
                </form>
            </div>
            <div class="grid flex-1 gap-4 md:grid-cols-3 xl:grid-cols-1">
                <div class="card p-5"><div class="text-sm text-slate-500">Total Artikel</div><div class="mt-2 text-2xl font-bold">{{ $all->count() }}</div></div>
                <div class="card p-5"><div class="text-sm text-slate-500">Published</div><div class="mt-2 text-2xl font-bold text-green-600">{{ $publishedCount }}</div></div>
                <div class="card p-5"><div class="text-sm text-slate-500">Draft</div><div class="mt-2 text-2xl font-bold text-orange-600">{{ $draftCount }}</div></div>
            </div>
        </div>
        <form method="get" class="card p-6"><div class="grid gap-4 md:grid-cols-[1fr_220px_auto]"><input class="input" type="text" name="search" value="{{ $search }}" placeholder="Cari artikel..."><select class="select" name="tab"><option value="all" {{ $tab === 'all' ? 'selected' : '' }}>Semua</option><option value="published" {{ $tab === 'published' ? 'selected' : '' }}>Published</option><option value="draft" {{ $tab === 'draft' ? 'selected' : '' }}>Draft</option></select><button class="btn-primary" type="submit">Terapkan</button></div></form>
        <div class="space-y-4">
            @foreach ($articles as $article)
                <div class="card p-6">
                    <div class="flex flex-col justify-between gap-4 lg:flex-row">
                        <div class="flex-1">
                            <div class="flex flex-wrap items-center gap-3">
                                <h3 class="text-lg font-semibold">{{ $article['title'] }}</h3>
                                <span class="{{ $article['status'] === 'Published' ? 'badge-green' : 'badge-orange' }}">{{ $article['status'] }}</span>
                            </div>
                            <div class="mt-2 text-sm text-slate-500">{{ $article['category'] }} • {{ $article['date'] }} • {{ $article['author'] }}</div>
                            <p class="mt-3 text-sm text-slate-600">{{ $article['content'] }}</p>
                        </div>
                        <div class="w-full lg:w-[24rem]">
                            <form method="post" action="{{ route('admin.education.update', $article['id']) }}" class="space-y-3">
                                @csrf
                                <input class="input" type="text" name="title" value="{{ $article['title'] }}">
                                <div class="grid grid-cols-2 gap-3">
                                    <select class="select" name="category">
                                        <option {{ $article['category'] === 'Tips' ? 'selected' : '' }}>Tips</option>
                                        <option {{ $article['category'] === 'Artikel' ? 'selected' : '' }}>Artikel</option>
                                        <option {{ $article['category'] === 'Panduan' ? 'selected' : '' }}>Panduan</option>
                                        <option {{ $article['category'] === 'Edukasi' ? 'selected' : '' }}>Edukasi</option>
                                    </select>
                                    <select class="select" name="status">
                                        <option {{ $article['status'] === 'Draft' ? 'selected' : '' }}>Draft</option>
                                        <option {{ $article['status'] === 'Published' ? 'selected' : '' }}>Published</option>
                                    </select>
                                </div>
                                <textarea class="textarea" name="content">{{ $article['content'] }}</textarea>
                                <button class="btn-primary" type="submit">Update</button>
                            </form>
                            <form method="post" action="{{ route('admin.education.delete', $article['id']) }}" class="mt-3">
                                @csrf
                                <button class="btn-danger" type="submit">Hapus</button>
                            </form>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </x-dashboard-shell>
</x-layouts.app>
