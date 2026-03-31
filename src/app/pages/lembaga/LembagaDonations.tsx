import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  LayoutDashboard,
  Heart,
  Package,
  Clock,
  MapPin,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", path: "/lembaga", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Donasi", path: "/lembaga/donations", icon: <Heart className="w-5 h-5" /> },
];

export default function LembagaDonations() {
  const [donations, setDonations] = useState([
    {
      id: "DON-001",
      store: {
        name: "Toko Roti Barokah",
        address: "Jl. Sudirman No. 123, Jakarta",
        phone: "021-12345678",
      },
      items: [
        { name: "Roti Tawar", quantity: 15 },
        { name: "Roti Keju", quantity: 10 },
      ],
      distance: "2.5 km",
      availableUntil: "2026-03-31 20:00",
      status: "available",
      claimedAt: null,
      trackingStatus: null,
    },
    {
      id: "DON-002",
      store: {
        name: "Healthy Corner",
        address: "Jl. Gatot Subroto No. 45, Jakarta",
        phone: "021-87654321",
      },
      items: [
        { name: "Salad Bowl", quantity: 8 },
        { name: "Sandwich", quantity: 7 },
      ],
      distance: "3.2 km",
      availableUntil: "2026-03-31 19:00",
      status: "available",
      claimedAt: null,
      trackingStatus: null,
    },
    {
      id: "DON-003",
      store: {
        name: "Dapur Nusantara",
        address: "Jl. Thamrin No. 78, Jakarta",
        phone: "021-11223344",
      },
      items: [{ name: "Lunch Box Komplit", quantity: 20 }],
      distance: "1.8 km",
      availableUntil: "2026-03-31 21:00",
      status: "claimed",
      claimedAt: "2026-03-31 14:30",
      trackingStatus: "in-transit",
    },
    {
      id: "DON-004",
      store: {
        name: "Toko Roti Barokah",
        address: "Jl. Sudirman No. 123, Jakarta",
        phone: "021-12345678",
      },
      items: [
        { name: "Roti Tawar", quantity: 30 },
        { name: "Croissant", quantity: 15 },
      ],
      distance: "2.5 km",
      availableUntil: "2026-03-30 18:00",
      status: "completed",
      claimedAt: "2026-03-30 15:00",
      trackingStatus: "delivered",
      deliveredAt: "2026-03-30 17:30",
    },
    {
      id: "DON-005",
      store: {
        name: "Healthy Corner",
        address: "Jl. Gatot Subroto No. 45, Jakarta",
        phone: "021-87654321",
      },
      items: [{ name: "Salad Bowl Premium", quantity: 20 }],
      distance: "3.2 km",
      availableUntil: "2026-03-29 19:00",
      status: "completed",
      claimedAt: "2026-03-29 16:00",
      trackingStatus: "delivered",
      deliveredAt: "2026-03-29 18:45",
    },
  ]);

  const handleClaimDonation = (id: string) => {
    setDonations(
      donations.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "claimed",
              claimedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
              trackingStatus: "confirmed",
            }
          : d
      )
    );
    toast.success("Donasi berhasil diklaim! Tunggu konfirmasi dari mitra.");
  };

  const handleConfirmReceived = (id: string) => {
    setDonations(
      donations.map((d) =>
        d.id === id
          ? {
              ...d,
              status: "completed",
              trackingStatus: "delivered",
              deliveredAt: new Date().toISOString().slice(0, 16).replace("T", " "),
            }
          : d
      )
    );
    toast.success("Donasi dikonfirmasi sudah diterima!");
  };

  const availableDonations = donations.filter((d) => d.status === "available");
  const claimedDonations = donations.filter((d) => d.status === "claimed");
  const completedDonations = donations.filter((d) => d.status === "completed");

  const getTrackingStatusInfo = (status: string | null) => {
    switch (status) {
      case "confirmed":
        return {
          label: "Dikonfirmasi Mitra",
          color: "text-blue-600",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "in-transit":
        return {
          label: "Dalam Perjalanan",
          color: "text-orange-600",
          icon: <Truck className="w-4 h-4" />,
        };
      case "delivered":
        return {
          label: "Sudah Diterima",
          color: "text-green-600",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      default:
        return {
          label: "Menunggu Konfirmasi",
          color: "text-gray-600",
          icon: <Clock className="w-4 h-4" />,
        };
    }
  };

  const DonationCard = ({ donation }: { donation: typeof donations[0] }) => {
    const trackingInfo = getTrackingStatusInfo(donation.trackingStatus);

    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold">{donation.store.name}</h3>
                  {donation.status === "available" && (
                    <Badge className="bg-green-100 text-green-700">
                      <Package className="w-3 h-3 mr-1" />
                      Tersedia
                    </Badge>
                  )}
                  {donation.status === "claimed" && (
                    <Badge className="bg-blue-100 text-blue-700">
                      <Clock className="w-3 h-3 mr-1" />
                      Diproses
                    </Badge>
                  )}
                  {donation.status === "completed" && (
                    <Badge className="bg-purple-100 text-purple-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Selesai
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {donation.store.address}
                  </span>
                  <span>• {donation.distance}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">#{donation.id}</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Item Donasi</h4>
              <div className="space-y-2">
                {donation.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded"
                  >
                    <span className="text-gray-900">{item.name}</span>
                    <span className="font-medium">{item.quantity} unit</span>
                  </div>
                ))}
              </div>
            </div>

            {donation.status === "available" && (
              <>
                <div className="border-t pt-4 flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-600 font-medium">
                    Tersedia sampai: {donation.availableUntil}
                  </span>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleClaimDonation(donation.id)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Klaim Donasi (FR-15)
                </Button>
              </>
            )}

            {donation.status === "claimed" && (
              <>
                <div className="border-t pt-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {trackingInfo.icon}
                      <span className={`font-semibold ${trackingInfo.color}`}>
                        Status: {trackingInfo.label}
                      </span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Diklaim: {donation.claimedAt}
                    </p>
                    <p className="text-sm text-blue-800 mt-1">
                      Tracking Logistik Donasi (FR-16)
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Hubungi Mitra
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleConfirmReceived(donation.id)}
                  >
                    Konfirmasi Diterima
                  </Button>
                </div>
              </>
            )}

            {donation.status === "completed" && (
              <div className="border-t pt-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">
                      Donasi Sudah Diterima
                    </span>
                  </div>
                  <div className="text-sm text-green-800 space-y-1">
                    <p>Diklaim: {donation.claimedAt}</p>
                    <p>Diterima: {donation.deliveredAt}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500">
              Kontak Mitra: {donation.store.phone}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout
      userType="lembaga"
      userName="Yayasan Peduli Anak"
      navigation={navigation}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Donasi</h1>
          <p className="text-gray-600 mt-1">
            Klaim & tracking donasi makanan (FR-15, FR-16, FR-17)
          </p>
        </div>

        {/* Info Banner */}
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-purple-800">
                <strong>Sistem First-Come, First-Served:</strong> Donasi tersedia
                dapat diklaim oleh lembaga terverifikasi dengan prinsip siapa cepat
                dia dapat. Pastikan Anda siap menerima donasi sebelum melakukan klaim.
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Tersedia ({availableDonations.length})
            </TabsTrigger>
            <TabsTrigger value="claimed" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Diproses ({claimedDonations.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Riwayat ({completedDonations.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {availableDonations.length > 0 ? (
              availableDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tidak Ada Donasi Tersedia
                  </h3>
                  <p className="text-gray-600">
                    Donasi baru akan muncul di sini saat mitra menyediakan surplus
                    makanan
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="claimed" className="space-y-4">
            {claimedDonations.length > 0 ? (
              claimedDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tidak Ada Donasi Diproses
                  </h3>
                  <p className="text-gray-600">
                    Donasi yang sudah diklaim akan muncul di sini
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedDonations.length > 0 ? (
              completedDonations.map((donation) => (
                <DonationCard key={donation.id} donation={donation} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Belum Ada Riwayat
                  </h3>
                  <p className="text-gray-600">
                    Riwayat donasi yang sudah diterima akan muncul di sini
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
