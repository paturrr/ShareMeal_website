import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";

const navigation = [
  { name: "Dashboard", path: "/mitra", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Inventaris", path: "/mitra/inventory", icon: <Package className="w-5 h-5" /> },
  { name: "Pesanan", path: "/mitra/orders", icon: <ShoppingCart className="w-5 h-5" /> },
];

export default function MitraDashboard() {
  // Mock data
  const stats = {
    totalProducts: 45,
    activeFlashSale: 12,
    pendingOrders: 8,
    totalRevenue: 2450000,
    foodSaved: 85,
    donationsGiven: 15,
  };

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Budi Santoso",
      items: "Roti Tawar (3 pcs)",
      amount: 25000,
      status: "Menunggu Diambil",
      time: "10 menit lalu",
    },
    {
      id: "ORD-002",
      customer: "Siti Nurhaliza",
      items: "Salad Bowl (2 pcs)",
      amount: 45000,
      status: "Selesai",
      time: "1 jam lalu",
    },
    {
      id: "ORD-003",
      customer: "Ahmad Rizki",
      items: "Sandwich (1 pc)",
      amount: 15000,
      status: "Menunggu Diambil",
      time: "2 jam lalu",
    },
  ];

  const expiringItems = [
    {
      id: 1,
      name: "Roti Keju",
      quantity: 15,
      expiresIn: "2 jam",
      status: "urgent",
    },
    {
      id: 2,
      name: "Salad Caesar",
      quantity: 8,
      expiresIn: "4 jam",
      status: "warning",
    },
    {
      id: 3,
      name: "Sandwich Tuna",
      quantity: 20,
      expiresIn: "6 jam",
      status: "normal",
    },
  ];

  return (
    <DashboardLayout userType="mitra" userName="Toko Roti Barokah" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Mitra</h1>
          <p className="text-gray-600 mt-1">Kelola surplus pangan dan kurangi food waste</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Produk
              </CardTitle>
              <Package className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-gray-500 mt-1">Dalam inventaris</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Flash Sale Aktif
              </CardTitle>
              <TrendingDown className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats.activeFlashSale}
              </div>
              <p className="text-xs text-gray-500 mt-1">Produk dengan diskon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pesanan Pending
              </CardTitle>
              <ShoppingCart className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.pendingOrders}
              </div>
              <p className="text-xs text-gray-500 mt-1">Menunggu pengambilan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Revenue Bulan Ini
              </CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                Rp {stats.totalRevenue.toLocaleString("id-ID")}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +12% dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Makanan Diselamatkan
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.foodSaved}</div>
              <p className="text-xs text-gray-500 mt-1">Total bulan ini</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Donasi Diberikan
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.donationsGiven}
              </div>
              <p className="text-xs text-gray-500 mt-1">Ke lembaga sosial</p>
            </CardContent>
          </Card>
        </div>

        {/* Expiring Items Alert */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <CardTitle>Produk Mendekati Expired</CardTitle>
              </div>
              <Link to="/mitra/inventory">
                <Button variant="outline" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiringItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      Stok: {item.quantity} unit
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-semibold ${
                        item.status === "urgent"
                          ? "text-red-600"
                          : item.status === "warning"
                          ? "text-orange-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {item.expiresIn}
                    </div>
                    <div className="text-xs text-gray-500">sampai expired</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pesanan Terbaru</CardTitle>
              <Link to="/mitra/orders">
                <Button variant="outline" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">
                        {order.customer}
                      </span>
                      <span className="text-sm text-gray-500">#{order.id}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{order.items}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.time}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        Rp {order.amount.toLocaleString("id-ID")}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          order.status === "Selesai"
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                    {order.status !== "Selesai" && (
                      <Button size="sm">Konfirmasi</Button>
                    )}
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
