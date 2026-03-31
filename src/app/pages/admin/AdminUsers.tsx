import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  LayoutDashboard,
  Shield,
  Users,
  Search,
  Ban,
  CheckCircle,
  AlertTriangle,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Verifikasi", path: "/admin/verification", icon: <Shield className="w-5 h-5" /> },
  { name: "Kelola User", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
];

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi@email.com",
      phone: "08123456789",
      type: "consumer",
      status: "active",
      joinedAt: "2026-01-15",
      transactions: 24,
      warnings: 0,
    },
    {
      id: 2,
      name: "Toko Roti Barokah",
      email: "roti.barokah@email.com",
      phone: "021-12345678",
      type: "mitra",
      status: "active",
      joinedAt: "2026-01-10",
      transactions: 156,
      warnings: 0,
      verified: true,
    },
    {
      id: 3,
      name: "Yayasan Peduli Anak",
      email: "yayasan.peduli@email.com",
      phone: "021-87654321",
      type: "lembaga",
      status: "active",
      joinedAt: "2026-02-01",
      transactions: 45,
      warnings: 0,
      verified: true,
    },
    {
      id: 4,
      name: "Siti Nurhaliza",
      email: "siti@email.com",
      phone: "08198765432",
      type: "consumer",
      status: "active",
      joinedAt: "2026-02-20",
      transactions: 12,
      warnings: 0,
    },
    {
      id: 5,
      name: "Healthy Corner",
      email: "healthy.corner@email.com",
      phone: "021-11223344",
      type: "mitra",
      status: "active",
      joinedAt: "2026-01-25",
      transactions: 98,
      warnings: 0,
      verified: true,
    },
    {
      id: 6,
      name: "Ahmad Rizki",
      email: "ahmad@email.com",
      phone: "08156781234",
      type: "consumer",
      status: "warned",
      joinedAt: "2026-03-01",
      transactions: 8,
      warnings: 2,
      lastWarning: "2026-03-28",
      warningReason: "Tidak mengambil pesanan yang sudah dibooking (2x)",
    },
    {
      id: 7,
      name: "Toko ABC",
      email: "toko.abc@email.com",
      phone: "021-99887766",
      type: "mitra",
      status: "blocked",
      joinedAt: "2026-02-15",
      transactions: 32,
      warnings: 3,
      blockedAt: "2026-03-30",
      blockReason: "Menjual makanan yang sudah tidak layak konsumsi (pelanggaran berat)",
      verified: true,
    },
  ]);

  const handleBlockUser = () => {
    if (!blockReason.trim()) {
      toast.error("Alasan sanksi harus diisi");
      return;
    }

    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser
            ? {
                ...user,
                status: "blocked",
                blockedAt: new Date().toISOString().slice(0, 10),
                blockReason,
              }
            : user
        )
      );
      toast.success("User berhasil diblokir");
      setIsBlockDialogOpen(false);
      setBlockReason("");
      setSelectedUser(null);
    }
  };

  const handleUnblockUser = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: "active",
              blockedAt: undefined,
              blockReason: undefined,
            }
          : user
      )
    );
    toast.success("User berhasil di-unblock");
  };

  const handleWarnUser = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUsers(
        users.map((u) =>
          u.id === userId
            ? {
                ...u,
                status: "warned",
                warnings: (u.warnings || 0) + 1,
                lastWarning: new Date().toISOString().slice(0, 10),
              }
            : u
        )
      );
      toast.success("Peringatan diberikan kepada user");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = filterType === "all" || user.type === filterType;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalUsers: users.length,
    consumers: users.filter((u) => u.type === "consumer").length,
    mitra: users.filter((u) => u.type === "mitra").length,
    lembaga: users.filter((u) => u.type === "lembaga").length,
    active: users.filter((u) => u.status === "active").length,
    warned: users.filter((u) => u.status === "warned").length,
    blocked: users.filter((u) => u.status === "blocked").length,
  };

  return (
    <DashboardLayout userType="admin" userName="Admin ShareMeal" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Data User</h1>
          <p className="text-gray-600 mt-1">
            Kelola akun & moderasi pelanggaran (FR-20, FR-21)
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <div className="text-xs text-gray-600 mt-1">Total User</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.consumers}
                </div>
                <div className="text-xs text-gray-600 mt-1">Konsumen</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.mitra}</div>
                <div className="text-xs text-gray-600 mt-1">Mitra</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.lembaga}
                </div>
                <div className="text-xs text-gray-600 mt-1">Lembaga</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stats.active}
                </div>
                <div className="text-xs text-gray-600 mt-1">Aktif</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {stats.warned}
                </div>
                <div className="text-xs text-gray-600 mt-1">Warning</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.blocked}
                </div>
                <div className="text-xs text-gray-600 mt-1">Blocked</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Cari nama atau email..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Tipe User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="consumer">Konsumen</SelectItem>
                  <SelectItem value="mitra">Mitra</SelectItem>
                  <SelectItem value="lembaga">Lembaga</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="warned">Warning</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* User List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-xl font-bold">{user.name}</h3>
                        <Badge
                          variant="outline"
                          className={
                            user.type === "consumer"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : user.type === "mitra"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                          }
                        >
                          {user.type === "consumer"
                            ? "Konsumen"
                            : user.type === "mitra"
                            ? "Mitra"
                            : "Lembaga"}
                        </Badge>
                        {user.verified && (
                          <Badge className="bg-blue-100 text-blue-700">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        {user.status === "active" && (
                          <Badge className="bg-green-100 text-green-700">Aktif</Badge>
                        )}
                        {user.status === "warned" && (
                          <Badge className="bg-orange-100 text-orange-700">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {user.warnings} Peringatan
                          </Badge>
                        )}
                        {user.status === "blocked" && (
                          <Badge className="bg-red-100 text-red-700">
                            <Ban className="w-3 h-3 mr-1" />
                            Diblokir
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Bergabung: {user.joinedAt}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {user.transactions}
                      </div>
                      <div className="text-xs text-gray-600">Transaksi</div>
                    </div>
                  </div>

                  {user.status === "warned" && user.warningReason && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-semibold text-orange-900">
                            Peringatan Terakhir: {user.lastWarning}
                          </div>
                          <div className="text-sm text-orange-800 mt-1">
                            {user.warningReason}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {user.status === "blocked" && user.blockReason && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Ban className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-semibold text-red-900">
                            Diblokir: {user.blockedAt}
                          </div>
                          <div className="text-sm text-red-800 mt-1">
                            <strong>Alasan:</strong> {user.blockReason}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t pt-4 flex flex-wrap gap-2">
                    {user.status === "active" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-orange-600 text-orange-600 hover:bg-orange-50"
                          onClick={() => handleWarnUser(user.id)}
                        >
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Beri Peringatan
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setSelectedUser(user.id);
                            setIsBlockDialogOpen(true);
                          }}
                        >
                          <Ban className="w-4 h-4 mr-2" />
                          Blokir Akun (FR-21)
                        </Button>
                      </>
                    )}
                    {user.status === "warned" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setSelectedUser(user.id);
                          setIsBlockDialogOpen(true);
                        }}
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Blokir Akun (FR-21)
                      </Button>
                    )}
                    {user.status === "blocked" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleUnblockUser(user.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Buka Blokir
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Lihat Detail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tidak Ada User Ditemukan
              </h3>
              <p className="text-gray-600">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </CardContent>
          </Card>
        )}

        {/* Block Dialog */}
        <Dialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Blokir Akun User (FR-21)</DialogTitle>
              <DialogDescription>
                Berikan alasan pemblokiran yang jelas. User tidak akan bisa mengakses
                platform setelah diblokir.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blockReason">Alasan Pemblokiran</Label>
                <Textarea
                  id="blockReason"
                  placeholder="Jelaskan alasan pemblokiran..."
                  value={blockReason}
                  onChange={(e) => setBlockReason(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsBlockDialogOpen(false);
                    setBlockReason("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleBlockUser}
                >
                  Blokir Akun
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
