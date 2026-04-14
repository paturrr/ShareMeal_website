<x-layouts.app :title="$shell['title'] . ' - ShareMeal'">
    <x-dashboard-shell :shell="$shell">
        <div class="relative overflow-hidden rounded-[2rem] bg-[#174413] p-8 text-white">
            <div class="relative z-10 max-w-3xl">
                <span class="badge bg-green-500 text-white">Edukasi Lingkungan</span>
                <h2 class="mt-4 text-4xl font-bold">Mari Bersama Kurangi Food Waste</h2>
                <p class="mt-3 text-lg text-green-100">Tingkatkan pengetahuanmu tentang dampak sampah makanan dan temukan tips praktis untuk mulai menyelamatkan makanan hari ini.</p>
                <form method="get" class="mt-6 max-w-xl"><input class="input border-white/20 bg-white text-slate-900" type="text" name="search" value="{{ $search }}" placeholder="Cari artikel atau topik..."><input type="hidden" name="category" value="{{ $category }}"></form>
            </div>
            <div class="absolute -bottom-16 -right-12 text-[12rem] font-black text-white/10">S</div>
        </div>

        <div class="grid gap-4 md:grid-cols-3">
            <div class="card p-5"><div class="text-sm font-medium text-green-800">Artikel Dibaca</div><div class="mt-2 text-2xl font-bold">12 Artikel</div></div>
            <div class="card p-5"><div class="text-sm font-medium text-blue-800">Level Edukasi</div><div class="mt-2 text-2xl font-bold">Food Saver Pro</div></div>
            <div class="card p-5"><div class="text-sm font-medium text-orange-800">Poin Pengetahuan</div><div class="mt-2 text-2xl font-bold">350 Poin</div></div>
        </div>

        <div class="flex flex-wrap gap-2">
            @foreach ($categories as $item)
                <a href="{{ route('consumer.education', ['search' => $search, 'category' => $item]) }}" class="{{ $category === $item ? 'btn-primary' : 'btn-secondary' }}">{{ $item }}</a>
            @endforeach
        </div>

        @if ($articles->isNotEmpty())
            <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                @foreach ($articles as $article)
                    <article class="card overflow-hidden">
                        <img src="{{ $article['image'] }}" alt="{{ $article['title'] }}" class="h-48 w-full object-cover">
                        <div class="p-5">
                            <div class="badge-blue">{{ $article['category'] }}</div>
                            <div class="mt-3 flex gap-3 text-xs text-slate-500"><span>{{ $article['author'] }}</span><span>{{ $article['read_time'] }}</span></div>
                            <h3 class="mt-3 text-lg font-bold">{{ $article['title'] }}</h3>
                            <p class="mt-2 text-sm text-slate-600">{{ $article['content'] }}</p>
                            <div class="mt-4 flex items-center justify-between"><button class="btn-secondary" type="button">Baca Selengkapnya</button><button class="text-sm font-semibold text-[#174413]" type="button">Bagikan</button></div>
                        </div>
                    </article>
                @endforeach
            </div>
        @else
            <div class="card p-12 text-center"><div class="text-lg font-semibold">Tidak ada artikel</div><p class="mt-2 text-slate-600">Tidak dapat menemukan artikel yang sesuai dengan pencarian Anda.</p></div>
        @endif
    </x-dashboard-shell>
</x-layouts.app>
