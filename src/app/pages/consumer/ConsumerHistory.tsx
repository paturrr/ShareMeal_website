import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  LayoutDashboard,
  Search,
  History as HistoryIcon,
  Download,
  Star,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../contexts/AppContext";

const navigation = [
  { name: "Dashboard", path: "/consumer", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Cari Makanan", path: "/consumer/search", icon: <Search className="w-5 h-5" /> },
  { name: "Riwayat", path: "/consumer/history", icon: <HistoryIcon className="w-5 h-5" /> },
];

export default function ConsumerHistory() {
  const { bookings, getBookingsByConsumer } = useApp();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Get bookings for current consumer
  const userBookings = getBookingsByConsumer("Budi Santoso");

  const transactions = [
    {
      id: "TRX-001",
      orderId: "ORD-12345",
      date: "2026-03-30 18:30",
      store: "Toko Roti Barokah",
      storeAddress: "Jl. Sudirman No. 123, Jakarta",
      items: [
        { name: "Roti Tawar", quantity: 3, price: 10000 },
        { name: "Roti Keju", quantity: 2, price: 8000 },
      ],
      subtotal: 46000,
      discount: 16000,
      total: 30000,
      status: "completed",
      pickupCode: "PICK-ABC123",
      rating: 5,
      review: "Roti masih fresh dan enak! Senang bisa membantu kurangi food waste.",
    },
    {
      id: "TRX-002",
      orderId: "ORD-12346",
      date: "2026-03-29 12:15",
      store: "Healthy Corner",
      storeAddress: "Jl. Gatot Subroto No. 45, Jakarta",
      items: [{ name: "Salad Bowl Premium", quantity: 2, price: 30000 }],
      subtotal: 90000,
      discount: 30000,
      total: 60000,
      status: "completed",
      pickupCode: "PICK-XYZ789",
      rating: 5,
      review: "Porsi besar dan sayuran masih segar!",
    },
  ];

  // Combine static transactions with real bookings
  const allTransactions = [
    ...transactions,
    ...userBookings.map((booking) => ({
      id: booking.id,
      orderId: booking.id,
      date: new Date(booking.bookingDate).toISOString().slice(0, 16).replace("T", " "),
      store: booking.storeName,
      storeAddress: "Lihat detail di toko",
      items: [{ name: booking.dealItem, quantity: booking.quantity, price: booking.price }],
      subtotal: booking.price * booking.quantity,
      discount: 0,
      total: booking.price * booking.quantity,
      status: booking.status,
      pickupCode: `PICK-${booking.id.slice(-6)}`,
      rating: 0,
      review: "",
    })),
  ];

  const handleDownloadReceipt = (transactionId: string) => {
    toast.success("Bukti transaksi berhasil diunduh!");
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Pilih rating terlebih dahulu");
      return;
    }
    toast.success("Review berhasil dikirim!");
    setIsReviewDialogOpen(false);
    setRating(0);
    setReview("");
  };

  const totalSavings = allTransactions.reduce((sum, t) => sum + t.discount, 0);
  const totalTransactions = allTransactions.length;
  const averageRating =
    allTransactions.filter((t) => t.rating > 0).reduce((sum, t) => sum + t.rating, 0) /
      allTransactions.filter((t) => t.rating > 0).length || 0;

  return (
    <DashboardLayout
      userType="consumer"
      userName="Budi Santoso"
      navigation={navigation}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Riwayat Transaksi
          </h1>
          <p className="text-gray-600 mt-1">
            Manajemen histori & bukti bayar (FR-13)
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {totalTransactions}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Transaksi</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  Rp {totalSavings.toLocaleString("id-ID")}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Hemat</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {averageRating.toFixed(1)} ⭐
                </div>
                <div className="text-sm text-gray-600 mt-1">Rata-rata Rating</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction List */}
        <div className="space-y-4">
          {allTransactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">{transaction.store}</h3>
                        <Badge className="bg-green-100 text-green-700">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Selesai
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {transaction.date}
                        </span>
                        <span>#{transaction.orderId}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {transaction.storeAddress}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        Rp {transaction.total.toLocaleString("id-ID")}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        Rp {transaction.subtotal.toLocaleString("id-ID")}
                      </div>
                      <div className="text-sm text-green-600 font-semibold mt-1">
                        Hemat Rp {transaction.discount.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Item Pesanan</h4>
                    <div className="space-y-2">
                      {transaction.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-sm"
                        >
                          <div>
                            <span className="text-gray-900">{item.name}</span>
                            <span className="text-gray-500"> × {item.quantity}</span>
                          </div>
                          <div className="font-medium">
                            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {transaction.rating > 0 ? (
                    <div className="border-t pt-4 bg-yellow-50 -mx-6 px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">Rating Anda:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= transaction.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          {transaction.review && (
                            <p className="text-sm text-gray-700 italic">
                              "{transaction.review}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t pt-4">
                      <Dialog
                        open={isReviewDialogOpen && selectedOrder === parseInt(transaction.id.split('-')[1])}
                        onOpenChange={(open) => {
                          setIsReviewDialogOpen(open);
                          if (open) {
                            setSelectedOrder(parseInt(transaction.id.split('-')[1]));
                          }
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full">
                            <Star className="w-4 h-4 mr-2" />
                            Berikan Rating & Ulasan (FR-09)
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Rating & Ulasan</DialogTitle>
                            <DialogDescription>
                              Bantu konsumen lain dengan memberi rating dan ulasan
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Rating</Label>
                              <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className="transition-transform hover:scale-110"
                                  >
                                    <Star
                                      className={`w-8 h-8 ${
                                        star <= rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="review">Ulasan (Opsional)</Label>
                              <Textarea
                                id="review"
                                placeholder="Bagikan pengalaman Anda..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                rows={4}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="photo">Upload Foto (FR-09)</Label>
                              <input
                                id="photo"
                                type="file"
                                accept="image/*"
                                className="w-full text-sm"
                                multiple
                              />
                              <p className="text-xs text-gray-500">
                                Upload foto kualitas makanan untuk transparansi
                              </p>
                            </div>
                            <Button onClick={handleSubmitReview} className="w-full">
                              Kirim Review
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}

                  <div className="border-t pt-4 flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleDownloadReceipt(transaction.id)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Unduh Bukti (FR-13)
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Pesan Lagi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}