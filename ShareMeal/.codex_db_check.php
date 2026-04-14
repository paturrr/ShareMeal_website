<?php
require 'vendor/autoload.php';
$app = require 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
echo 'users=' . App\Models\User::count() . PHP_EOL;
echo 'stores=' . App\Models\Store::count() . PHP_EOL;
echo 'bookings=' . App\Models\Booking::count() . PHP_EOL;
echo 'donations=' . App\Models\Donation::count() . PHP_EOL;
echo 'articles=' . App\Models\Article::count() . PHP_EOL;
