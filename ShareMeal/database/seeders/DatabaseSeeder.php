<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Booking;
use App\Models\Deal;
use App\Models\Donation;
use App\Models\DonationItem;
use App\Models\InventoryProduct;
use App\Models\Store;
use App\Models\User;
use App\Models\VerificationApplication;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        DB::transaction(function () {
            DonationItem::query()->delete();
            Donation::query()->delete();
            Booking::query()->delete();
            Deal::query()->delete();
            InventoryProduct::query()->delete();
            VerificationApplication::query()->delete();
            Article::query()->delete();
            Store::query()->delete();
            User::query()->delete();

            $users = collect(config('sharemeal.users'))->mapWithKeys(function ($user) {
                $model = User::query()->create([
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'password' => Hash::make('password'),
                    'role' => $user['type'],
                    'phone' => $user['phone'] ?? null,
                    'status' => $user['status'] ?? 'active',
                    'organization_name' => in_array($user['type'], ['mitra', 'lembaga'], true) ? $user['name'] : null,
                    'joined_at' => $user['joined_at'] ?? now()->toDateString(),
                    'transactions_count' => $user['transactions'] ?? 0,
                    'warnings_count' => $user['warnings'] ?? 0,
                    'is_verified' => $user['verified'] ?? false,
                    'last_warning_at' => $user['last_warning'] ?? null,
                    'warning_reason' => $user['warning_reason'] ?? null,
                    'blocked_at' => $user['blocked_at'] ?? null,
                    'block_reason' => $user['block_reason'] ?? null,
                ]);

                return [$user['name'] => $model];
            });

            foreach (config('sharemeal.stores') as $storeData) {
                $owner = $users->get($storeData['name']);
                $store = Store::query()->create([
                    'owner_user_id' => $owner?->id,
                    'name' => $storeData['name'],
                    'category' => $storeData['category'],
                    'distance' => $storeData['distance'],
                    'rating' => $storeData['rating'],
                    'reviews_count' => $storeData['reviews'],
                    'address' => $storeData['address'],
                    'image' => $storeData['image'],
                    'is_favorite' => $storeData['is_favorite'],
                    'tags' => $storeData['tags'],
                ]);

                foreach ($storeData['deals'] as $dealData) {
                    $store->deals()->create([
                        'id' => $dealData['id'],
                        'item' => $dealData['item'],
                        'original_price' => $dealData['original_price'],
                        'discount_price' => $dealData['discount_price'],
                        'stock' => $dealData['stock'],
                        'expires_in' => $dealData['expires_in'],
                    ]);
                }
            }

            $storesByName = Store::query()->get()->keyBy('name');

            foreach (config('sharemeal.inventory_products') as $productData) {
                InventoryProduct::query()->create([
                    'id' => $productData['id'],
                    'store_id' => $storesByName->get('Toko Roti Barokah')?->id,
                    'name' => $productData['name'],
                    'category' => $productData['category'],
                    'price' => $productData['price'],
                    'discount_price' => $productData['discount_price'],
                    'stock' => $productData['stock'],
                    'expires_at' => Carbon::parse($productData['expires_at']),
                    'status' => $productData['status'],
                    'image' => $productData['image'],
                    'description' => $productData['description'] ?? null,
                ]);
            }

            foreach (config('sharemeal.transactions') as $transaction) {
                $consumer = $users->get('Budi Santoso');
                $store = $storesByName->get($transaction['store']);
                Booking::query()->create([
                    'id' => $transaction['id'],
                    'store_id' => $store?->id,
                    'deal_id' => optional($store?->deals()->first())->id,
                    'consumer_user_id' => $consumer?->id,
                    'store_name' => $transaction['store'],
                    'deal_item' => $transaction['items'][0]['name'],
                    'price' => $transaction['items'][0]['price'],
                    'quantity' => $transaction['items'][0]['quantity'],
                    'status' => $transaction['status'],
                    'consumer_name' => 'Budi Santoso',
                    'booking_date' => Carbon::parse($transaction['date']),
                    'pickup_time' => 'Hari ini, setelah pembayaran',
                    'rating' => $transaction['rating'] ?? 0,
                    'review' => $transaction['review'] ?? null,
                    'pickup_code' => $transaction['pickup_code'] ?? null,
                ]);
            }

            foreach (config('sharemeal.static_orders') as $order) {
                $consumer = $users->get($order['customer']['name']);
                $store = $storesByName->get('Toko Roti Barokah');

                Booking::query()->create([
                    'id' => $order['id'],
                    'store_id' => $store?->id,
                    'deal_id' => optional($store?->deals()->first())->id,
                    'consumer_user_id' => $consumer?->id,
                    'store_name' => $store?->name ?? 'Toko Roti Barokah',
                    'deal_item' => $order['items'][0]['name'],
                    'price' => $order['items'][0]['price'],
                    'quantity' => $order['items'][0]['quantity'],
                    'status' => $order['status'],
                    'consumer_name' => $order['customer']['name'],
                    'booking_date' => Carbon::parse($order['order_time']),
                    'pickup_time' => $order['pickup_time'],
                    'pickup_code' => $order['pickup_code'],
                ]);
            }

            foreach (config('sharemeal.donations') as $donationData) {
                $store = $storesByName->get($donationData['store']['name']);
                $donation = Donation::query()->create([
                    'id' => $donationData['id'],
                    'store_id' => $store?->id,
                    'distance' => $donationData['distance'],
                    'available_until' => Carbon::parse($donationData['available_until']),
                    'status' => $donationData['status'],
                    'claimed_at' => $donationData['claimed_at'] ? Carbon::parse($donationData['claimed_at']) : null,
                    'tracking_status' => $donationData['tracking_status'],
                    'delivered_at' => $donationData['delivered_at'] ? Carbon::parse($donationData['delivered_at']) : null,
                ]);

                foreach ($donationData['items'] as $item) {
                    $donation->items()->create($item);
                }
            }

            foreach (config('sharemeal.applications') as $applicationData) {
                $linkedUser = $users->get($applicationData['name']);
                VerificationApplication::query()->create([
                    'user_id' => $linkedUser?->id,
                    'name' => $applicationData['name'],
                    'type' => $applicationData['type'],
                    'email' => $applicationData['email'],
                    'phone' => $applicationData['phone'],
                    'address' => $applicationData['address'],
                    'submitted_at' => Carbon::parse($applicationData['submitted_at']),
                    'status' => $applicationData['status'],
                    'business_type' => $applicationData['business_type'],
                    'description' => $applicationData['description'] ?? null,
                    'beneficiaries' => $applicationData['beneficiaries'] ?? null,
                    'documents' => $applicationData['documents'],
                    'approved_at' => isset($applicationData['approved_at']) ? Carbon::parse($applicationData['approved_at']) : null,
                    'rejected_at' => isset($applicationData['rejected_at']) ? Carbon::parse($applicationData['rejected_at']) : null,
                    'reject_reason' => $applicationData['reject_reason'] ?? null,
                ]);
            }

            foreach (config('sharemeal.articles') as $articleData) {
                Article::query()->create([
                    'id' => $articleData['id'],
                    'title' => $articleData['title'],
                    'category' => $articleData['category'],
                    'status' => $articleData['status'],
                    'published_on' => $articleData['date'] ?? null,
                    'author' => $articleData['author'],
                    'content' => $articleData['content'],
                    'image' => $articleData['image'] ?? null,
                    'read_time' => $articleData['read_time'] ?? null,
                ]);
            }
        });
    }
}
