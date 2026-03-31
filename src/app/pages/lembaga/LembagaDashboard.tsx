import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  LayoutDashboard,
  Heart,
  Package,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";

const navigation = [
  { name: "Dashboard", path: "/lembaga", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Donasi", path: "/lembaga/donations", icon: <Heart className="w-5 h-5" /> },
];

export default function LembagaDashboard() {
  const stats = {
    totalDonations: 156,
    activeDonations: 8,
    beneficiaries: 120,
    thisMonth: 45,
  };

  const verificationStatus = {
    status: "verified",
    verifiedAt: "2026-01-15",
    documents: [
      { name: "Akta Pendirian", status: "approved" },
      { name: "SK Kemenkumham", status: "approved" },
      { name: "NPWP Lembaga", status: "approved" },
    ],
  };

  const availableDonations = [
    {
      id: 1,
      store: "Toko Roti Barokah",
      items: "Roti Tawar, Roti Keju",
      quantity: 25,
      location: "Jl. Sudirman No. 123, Jakarta",
      distance: "2.5 km",
      availableUntil: "2026-03-31 20:00",
      status: "available",
    },
    {
      id: 2,
      store: "Healthy Corner",
      items: "Salad Bowl, Sandwich",
      quantity: 15,
      location: "Jl. Gatot Subroto No. 45, Jakarta",
      distance: "3.2 km",
      availableUntil: "2026-03-31 19:00",
      status: "available",
    },
    {
      id: 3,
      store: "Dapur Nusantara",
      items: "Lunch Box Komplit",
      quantity: 20,
      location: "Jl. Thamrin No. 78, Jakarta",
      distance: "1.8 km",
      availableUntil: "2026-03-31 21:00",
      status: "available",
    },
  ];

  const recentDonations = [
    {
      id: "DON-001",
      store: "Toko Roti Barokah",
      items: "Roti Tawar (30 pcs)",
      date: "2026-03-30",
      status: "delivered",
    },
    {
      id: "DON-002",
      store: "Healthy Corner",
      items: "Salad Bowl (20 pcs)",
      date: "2026-03-29",
      status: "delivered",
    },
    {
      id: "DON-003",
      store: "Dapur Nusantara",
      items: "Lunch Box (25 pcs)",
      date: "2026-03-28",
      status: "delivered",
    },
  ];

  return (
    <DashboardLayout
      userType="lembaga"
      userName="Yayasan Peduli Anak"
      navigation={navigation}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Lembaga Sosial
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola penerimaan donasi makanan
          </p>
        </div>

        {/* Verification Status (FR-14) */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-green-900 mb-1">
                  Lembaga Terverifikasi (FR-14)
                </h3>
                <p className="text-sm text-green-800 mb-3">
                  Status legalitas Anda telah diverifikasi oleh admin sejak{" "}
                  {verificationStatus.verifiedAt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {verificationStatus.documents.map((doc, index) => (
                    <Badge
                      key={index}
                      className="bg-white text-green-700 border-green-300"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {doc.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {stats.totalDonations}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Donasi</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {stats.activeDonations}
                </div>
                <div className="text-sm text-gray-600 mt-1">Aktif</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {stats.beneficiaries}
                </div>
                <div className="text-sm text-gray-600 mt-1">Penerima Manfaat</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {stats.thisMonth}
                </div>
                <div className="text-sm text-gray-600 mt-1">Bulan Ini</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Donations (FR-15) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                <CardTitle>Donasi Tersedia (FR-15)</CardTitle>
              </div>
              <Link to="/lembaga/donations">
                <Button variant="outline" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <strong>Sistem First-Come, First-Served:</strong> Klaim donasi
                    tersedia untuk lembaga terverifikasi dengan prinsip siapa cepat
                    dia dapat.
                  </div>
                </div>
              </div>

              {availableDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {donation.store}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {donation.items} ({donation.quantity} unit)
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                      <span>📍 {donation.location}</span>
                      <span>• {donation.distance}</span>
                      <span className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-3 h-3" />
                        Sampai {donation.availableUntil}
                      </span>
                    </div>
                  </div>
                  <Button>
                    <Heart className="w-4 h-4 mr-2" />
                    Klaim Donasi
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Donations (FR-17) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Riwayat Penerimaan Donasi (FR-17)</CardTitle>
              <Link to="/lembaga/donations">
                <Button variant="outline" size="sm">
                  Lihat Semua
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {donation.store}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {donation.items}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {donation.date}
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Diterima
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Section */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Dampak Positif Bulan Ini
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.thisMonth}
                    </div>
                    <div className="text-gray-600">Donasi Diterima</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {stats.beneficiaries}
                    </div>
                    <div className="text-gray-600">Orang Terbantu</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      <TrendingUp className="w-6 h-6 inline" />
                    </div>
                    <div className="text-gray-600">+25% vs Bulan Lalu</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
