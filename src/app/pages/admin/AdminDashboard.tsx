import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  LayoutDashboard,
  Shield,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router";

const navigation = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Verifikasi", path: "/admin/verification", icon: <Shield className="w-5 h-5" /> },
  { name: "Kelola User", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { name: "Edukasi", path: "/admin/education", icon: <BookOpen className="w-5 h-5" /> },
];

export default function AdminDashboard() {
  const stats = {
    totalUsers: 1250,
    pendingVerification: 15,
    activeMitra: 142,
    activeLembaga: 38,
    totalTransactions: 5420,
    foodSaved: 12500,
  };

  const recentActivity = [
    {
      id: 1,
      type: "verification",
      user: "Toko Roti Sejahtera",
      action: "Menunggu verifikasi dokumen",
      time: "5 menit lalu",
      status: "pending",
    },
    {
      id: 2,
      type: "user",
      user: "Budi Santoso",
      action: "Registrasi akun konsumen baru",
      time: "10 menit lalu",
      status: "completed",
    },
    {
      id: 3,
      type: "verification",
      user: "Yayasan Harapan Bangsa",
      action: "Menunggu verifikasi legalitas",
      time: "30 menit lalu",
      status: "pending",
    },
    {
      id: 4,
      type: "report",
      user: "Sistem",
      action: "Laporan penyalahgunaan dari Toko ABC",
      time: "1 jam lalu",
      status: "alert",
    },
    {
      id: 5,
      type: "verification",
      user: "Warung Makan Ibu Rina",
      action: "Dokumen disetujui",
      time: "2 jam lalu",
      status: "completed",
    },
  ];

  const pendingVerifications = [
    {
      id: 1,
      name: "Toko Roti Sejahtera",
      type: "Mitra",
      submittedAt: "2026-03-31 09:00",
      documents: 3,
    },
    {
      id: 2,
      name: "Yayasan Harapan Bangsa",
      type: "Lembaga Sosial",
      submittedAt: "2026-03-31 08:30",
      documents: 4,
    },
    {
      id: 3,
      name: "Healthy Cafe",
      type: "Mitra",
      submittedAt: "2026-03-30 16:45",
      documents: 3,
    },
  ];

  return (
    <DashboardLayout userType="admin" userName="Admin ShareMeal" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-1">
            Kelola sistem, verifikasi akun, dan moderasi platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalUsers}
                </div>
                <div className="text-xs text-gray-600 mt-1">Total User</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.pendingVerification}
                </div>
                <div className="text-xs text-gray-600 mt-1">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.activeMitra}
                </div>
                <div className="text-xs text-gray-600 mt-1">Mitra Aktif</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.activeLembaga}
                </div>
                <div className="text-xs text-gray-600 mt-1">Lembaga Aktif</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalTransactions}
                </div>
                <div className="text-xs text-gray-600 mt-1">Transaksi</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(stats.foodSaved / 1000).toFixed(1)}k
                </div>
                <div className="text-xs text-gray-600 mt-1">Makanan Saved</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Banner */}
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
              <div>
                <div className="font-semibold text-orange-900">
                  {stats.pendingVerification} Pendaftaran Menunggu Verifikasi (FR-18)
                </div>
                <div className="text-sm text-orange-700">
                  Terdapat {stats.pendingVerification} mitra dan lembaga sosial baru
                  yang perlu diverifikasi
                </div>
              </div>
              <Link to="/admin/verification">
                <Button variant="outline" size="sm" className="ml-auto">
                  Verifikasi Sekarang
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending Verifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  Pending Verifikasi (FR-18)
                </CardTitle>
                <Link to="/admin/verification">
                  <Button variant="outline" size="sm">
                    Lihat Semua
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingVerifications.map((verification) => (
                  <div
                    key={verification.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">
                        {verification.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {verification.type} • {verification.documents} dokumen
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Diajukan: {verification.submittedAt}
                      </div>
                    </div>
                    <Button size="sm">Review</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.status === "pending"
                          ? "bg-orange-100"
                          : activity.status === "alert"
                          ? "bg-red-100"
                          : "bg-green-100"
                      }`}
                    >
                      {activity.status === "pending" && (
                        <Clock className="w-4 h-4 text-orange-600" />
                      )}
                      {activity.status === "alert" && (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                      {activity.status === "completed" && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900">
                        {activity.user}
                      </div>
                      <div className="text-sm text-gray-600">{activity.action}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Metrics */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle>Dampak Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {stats.foodSaved.toLocaleString("id-ID")}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Makanan Diselamatkan (kg)
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {(stats.foodSaved * 2.5).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600 mt-2">CO₂ Dikurangi (kg)</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {stats.totalTransactions}
                </div>
                <div className="text-sm text-gray-600 mt-2">Total Transaksi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  Rp {((stats.totalTransactions * 35000) / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-gray-600 mt-2">GMV Platform</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/admin/verification">
                <Button variant="outline" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Verifikasi Akun
                </Button>
              </Link>
              <Link to="/admin/users">
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Kelola User
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                Lihat Laporan
              </Button>
              <Button variant="outline" className="w-full">
                <AlertCircle className="w-4 h-4 mr-2" />
                Moderasi Konten
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
