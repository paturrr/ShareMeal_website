@props(['shell'])

<div class="page-shell">
    <header class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div class="container-shell flex h-16 items-center justify-between gap-4">
            <a href="{{ route('home') }}" class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#174413] text-lg font-black text-white">S</div>
                <div>
                    <div class="text-lg font-bold text-[#174413]">ShareMeal</div>
                    <div class="text-[11px] uppercase tracking-[0.2em] text-slate-400">{{ $shell['type'] }}</div>
                </div>
            </a>
            <div class="flex items-center gap-3">
                <div class="hidden text-right md:block">
                    <div class="text-sm font-semibold text-slate-900">{{ $shell['userName'] }}</div>
                    <div class="text-xs capitalize text-slate-500">{{ $shell['type'] }}</div>
                </div>
                <form method="post" action="{{ route('logout') }}">
                    @csrf
                    <button class="btn-secondary" type="submit">Keluar</button>
                </form>
            </div>
        </div>
    </header>

    <div class="container-shell py-8">
        <div class="flex flex-col gap-8 lg:flex-row">
            <aside class="w-full lg:w-64 lg:flex-shrink-0">
                <div class="card sticky top-24 p-4">
                    <nav class="space-y-2">
                        @foreach ($shell['navigation'] as $item)
                            <a href="{{ route($item['route']) }}" class="dashboard-link {{ request()->routeIs($item['route']) ? 'dashboard-link-active' : '' }} block">{{ $item['label'] }}</a>
                        @endforeach
                    </nav>
                </div>
            </aside>

            <main class="min-w-0 flex-1 space-y-6">
                <div>
                    <h1 class="section-title">{{ $shell['title'] }}</h1>
                    <p class="section-subtitle">{{ $shell['subtitle'] }}</p>
                </div>
                {{ $slot }}
            </main>
        </div>
    </div>
</div>
