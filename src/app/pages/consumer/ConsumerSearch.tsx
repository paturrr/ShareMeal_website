import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import {
  LayoutDashboard,
  Search as SearchIcon,
  History,
  MapPin,
  Filter,
  Clock,
  Star,
  Heart,
  Navigation,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../contexts/AppContext";

const navigation = [
  { name: "Dashboard", path: "/consumer", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Cari Makanan", path: "/consumer/search", icon: <SearchIcon className="w-5 h-5" /> },
  { name: "Riwayat", path: "/consumer/history", icon: <History className="w-5 h-5" /> },
];

export default function ConsumerSearch() {
  const { stores, addBooking } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    { id: "halal", label: "Halal", icon: "🕌" },
    { id: "vegan", label: "Vegan", icon: "🌱" },
    { id: "bakery", label: "Bakery", icon: "🍞" },
    { id: "healthy", label: "Healthy", icon: "🥗" },
    { id: "indonesian", label: "Indonesian", icon: "🍜" },
    { id: "western", label: "Western", icon: "🍔" },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((f) => f !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleFavorite = (storeId: number) => {
    toast.success("Toko ditambahkan ke favorit!");
  };

  const handleGetLocation = () => {
    toast.success("Lokasi Anda terdeteksi!");
  };

  const handleBooking = (storeId: number, storeName: string, dealId: number, dealItem: string, price: number) => {
    const success = addBooking(storeId, dealId, 1, "Budi Santoso");
    
    if (success) {
      toast.success(
        `Booking berhasil! ${dealItem} dari ${storeName}`,
        {
          description: `Total: Rp ${price.toLocaleString("id-ID")}. Pesanan Anda sudah dikirim ke penjual!`,
          duration: 5000,
          icon: <ShoppingCart className="w-5 h-5" />,
        }
      );
    } else {
      toast.error("Booking gagal! Stok tidak tersedia.", {
        description: "Silakan coba produk lain atau hubungi penjual.",
      });
    }
  };

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      searchQuery === "" ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.every((filter) => store.tags.includes(filter));

    return matchesSearch && matchesFilters;
  });

  return (
    <DashboardLayout
      userType="consumer"
      userName="Budi Santoso"
      navigation={navigation}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Cari Makanan Terdekat
          </h1>
          <p className="text-gray-600 mt-1">
            Location-Based Search & Filter Kategori (FR-07, FR-10)
          </p>
        </div>

        {/* Search & Location */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Cari toko atau jenis makanan..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button onClick={handleGetLocation}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Lokasi Saya
                </Button>
              </div>

              {/* Filter Categories (FR-10) */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">
                    Filter Kategori
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedFilters.includes(filter.id)
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span className="mr-1">{filter.icon}</span>
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filteredStores.length} toko ditemukan
            </h2>
            <div className="text-sm text-gray-600">
              Diurutkan berdasarkan jarak terdekat
            </div>
          </div>

          {filteredStores.map((store) => (
            <Card key={store.id} className="overflow-hidden">
              <div className="grid md:grid-cols-[200px_1fr] gap-6">
                <div className="relative h-48 md:h-auto">
                  <ImageWithFallback
                    src={store.image}
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(store.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        store.isFavorite
                          ? "fill-red-600 text-red-600"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {store.name}
                          </h3>
                          <p className="text-gray-600">{store.category}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{store.rating}</span>
                          <span className="text-sm text-gray-600">
                            ({store.reviews})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{store.address}</span>
                        <span className="font-semibold text-green-600">
                          • {store.distance}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {store.tags.map((tag) => {
                          const filter = filters.find((f) => f.id === tag);
                          return (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {filter?.icon} {filter?.label}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">
                        Flash Sale Aktif ({store.deals.length})
                      </h4>
                      <div className="space-y-2">
                        {store.deals.map((deal) => (
                          <div
                            key={deal.id}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="font-medium">{deal.item}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-orange-600" />
                                <span className="text-orange-600">
                                  {deal.expiresIn}
                                </span>
                                <span>• Stok: {deal.stock}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">
                                  Rp {deal.discountPrice.toLocaleString("id-ID")}
                                </div>
                                <div className="text-sm text-gray-500 line-through">
                                  Rp {deal.originalPrice.toLocaleString("id-ID")}
                                </div>
                              </div>
                              <Button
                                size="sm"
                                disabled={deal.stock === 0}
                                onClick={() =>
                                  handleBooking(store.id, store.name, deal.id, deal.item, deal.discountPrice)
                                }
                                className={deal.stock === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300" : ""}
                              >
                                {deal.stock === 0 ? "Habis" : "Booking"}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak Ada Hasil
              </h3>
              <p className="text-gray-600">
                Coba ubah kata kunci atau filter pencarian Anda
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}