import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import {
  LayoutDashboard,
  Search,
  History,
  Heart,
  MapPin,
  Clock,
  Star,
  TrendingDown,
  Bell,
} from "lucide-react";
import { Link } from "react-router";

const navigation = [
  { name: "Dashboard", path: "/consumer", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Cari Makanan", path: "/consumer/search", icon: <Search className="w-5 h-5" /> },
  { name: "Riwayat", path: "/consumer/history", icon: <History className="w-5 h-5" /> },
];

export default function ConsumerDashboard() {
  const stats = {
    savedMeals: 24,
    moneySaved: 350000,
    co2Reduced: 15.5,
    favoriteStores: 8,
  };

  const flashSales = [
    {
      id: 1,
      store: "Toko Roti Barokah",
      distance: "0.5 km",
      item: "Roti Tawar",
      originalPrice: 15000,
      discountPrice: 10000,
      discount: 33,
      stock: 15,
      expiresIn: "2 jam",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1666114170628-b34b0dcc21aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyeSUyMHNob3B8ZW58MXx8fHwxNzc0OTc0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      store: "Healthy Corner",
      distance: "1.2 km",
      item: "Salad Bowl Premium",
      originalPrice: 45000,
      discountPrice: 30000,
      discount: 33,
      stock: 8,
      expiresIn: "3 jam",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1654458804670-2f4f26ab3154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBzYWxhZCUyMGhlYWx0aHl8ZW58MXx8fHwxNzc0OTc0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      store: "Dapur Nusantara",
      distance: "0.8 km",
      item: "Lunch Box Komplit",
      originalPrice: 50000,
      discountPrice: 35000,
      discount: 30,
      stock: 12,
      expiresIn: "4 jam",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1543352632-fea6d4f83e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVwYXJlZCUyMG1lYWwlMjBsdW5jaCUyMGJveHxlbnwxfHx8fDE3NzQ5NzQzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const favoriteStores = [
    {
      id: 1,
      name: "Toko Roti Barokah",
      category: "Bakery",
      distance: "0.5 km",
      rating: 4.8,
      activeDeals: 5,
    },
    {
      id: 2,
      name: "Healthy Corner",
      category: "Healthy Food",
      distance: "1.2 km",
      rating: 4.9,
      activeDeals: 3,
    },
    {
      id: 3,
      name: "Dapur Nusantara",
      category: "Indonesian Food",
      distance: "0.8 km",
      rating: 4.7,
      activeDeals: 7,
    },
  ];

  return (
    <DashboardLayout
      userType="consumer"
      userName="Budi Santoso"
      navigation={navigation}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Konsumen</h1>
          <p className="text-gray-600 mt-1">
            Hemat uang dan selamatkan lingkungan
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {stats.savedMeals}
                </div>
                <div className="text-sm text-gray-600 mt-1">Makanan Diselamatkan</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  Rp {(stats.moneySaved / 1000).toFixed(0)}k
                </div>
                <div className="text-sm text-gray-600 mt-1">Uang Dihemat</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {stats.co2Reduced} kg
                </div>
                <div className="text-sm text-gray-600 mt-1">CO₂ Dikurangi</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {stats.favoriteStores}
                </div>
                <div className="text-sm text-gray-600 mt-1">Toko Favorit</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Banner */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-orange-900">
                  3 Flash Sale Baru dari Toko Favorit! (FR-11)
                </div>
                <div className="text-sm text-orange-700">
                  Notifikasi push real-time untuk update stok makanan surplus
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Flash Sales */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Flash Sale Terdekat</h2>
            <Link to="/consumer/search">
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Lihat Semua
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashSales.map((sale) => (
              <Card key={sale.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={sale.image}
                    alt={sale.item}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-red-600">
                    -{sale.discount}%
                  </Badge>
                  <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-600" />
                    <span className="text-orange-600">{sale.expiresIn}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{sale.item}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{sale.store}</span>
                        <span>• {sale.distance}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{sale.rating}</span>
                      <span className="text-sm text-gray-500">
                        • Stok: {sale.stock}
                      </span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          Rp {sale.discountPrice.toLocaleString("id-ID")}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          Rp {sale.originalPrice.toLocaleString("id-ID")}
                        </div>
                      </div>
                      <Button size="sm">
                        <TrendingDown className="w-4 h-4 mr-1" />
                        Booking
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Favorite Stores (FR-12) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Toko Favorit (FR-12)
              </CardTitle>
              <Button variant="outline" size="sm">
                Kelola
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {favoriteStores.map((store) => (
                <div
                  key={store.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{store.name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-3 mt-1">
                      <span>{store.category}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {store.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {store.rating}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {store.activeDeals} deals aktif
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
