import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import {
  LayoutDashboard,
  Search,
  History,
  ShoppingBag,
  Wallet,
  CreditCard,
  Building2,
  Smartphone,
  QrCode,
  Clock,
  MapPin,
  CheckCircle,
  ArrowLeft,
  Copy,
  Download,
  BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";
import { useApp } from "../../contexts/AppContext";

const navigation = [
  { name: "Dashboard", path: "/consumer", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Cari Makanan", path: "/consumer/search", icon: <Search className="w-5 h-5" /> },
  { name: "Riwayat", path: "/consumer/history", icon: <History className="w-5 h-5" /> },
  { name: "Edukasi", path: "/consumer/education", icon: <BookOpen className="w-5 h-5" /> },
];

export default function ConsumerCheckout() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getStoreById, bookings, updateBookingStatus } = useApp();

  // Get booking data from URL params
  const bookingId = searchParams.get("bookingId");
  const booking = bookings.find((b) => b.id === bookingId);

  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [countdown, setCountdown] = useState(600); // 10 minutes countdown
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Generate payment reference
  const paymentReference = `PAY-${bookingId?.slice(-8).toUpperCase()}`;
  const qrisValue = `00020101021226670016ID.CO.SHAREMEAL.WWW01189360050300000898840214${paymentReference}0303UMI51440014ID.CO.QRIS.WWW0215ID10211234567890303UMI5204539953033605802ID5913SHAREMEAL APP6007JAKARTA61051234062070703A01630445D3`;

  useEffect(() => {
    if (countdown > 0 && !paymentComplete) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown, paymentComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopyPaymentCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Nomor rekening berhasil disalin!");
  };

  const handleConfirmPayment = () => {
    setPaymentComplete(true);
    if (bookingId) {
      updateBookingStatus(bookingId, "ready");
    }
    toast.success("Pembayaran berhasil dikonfirmasi!", {
      description: "Pesanan Anda sedang diproses oleh penjual",
      icon: <CheckCircle className="w-5 h-5" />,
    });

    setTimeout(() => {
      navigate("/consumer/history");
    }, 2000);
  };

  if (!booking) {
    return (
      <DashboardLayout userType="consumer" userName="Budi Santoso" navigation={navigation}>
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Booking tidak ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Silakan lakukan booking terlebih dahulu
            </p>
            <Button onClick={() => navigate("/consumer/search")}>
              Cari Makanan
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const store = getStoreById(booking.storeId);

  const paymentMethods = [
    {
      id: "qris",
      name: "QRIS",
      icon: <QrCode className="w-5 h-5" />,
      description: "Scan QR untuk bayar",
    },
    {
      id: "gopay",
      name: "GoPay",
      icon: <Wallet className="w-5 h-5" />,
      description: "E-wallet GoPay",
    },
    {
      id: "ovo",
      name: "OVO",
      icon: <Wallet className="w-5 h-5" />,
      description: "E-wallet OVO",
    },
    {
      id: "dana",
      name: "DANA",
      icon: <Smartphone className="w-5 h-5" />,
      description: "E-wallet DANA",
    },
    {
      id: "bca",
      name: "BCA Virtual Account",
      icon: <Building2 className="w-5 h-5" />,
      description: "Transfer bank BCA",
      vaNumber: "7024" + bookingId?.slice(-8),
    },
    {
      id: "mandiri",
      name: "Mandiri Virtual Account",
      icon: <Building2 className="w-5 h-5" />,
      description: "Transfer bank Mandiri",
      vaNumber: "8898" + bookingId?.slice(-8),
    },
    {
      id: "bni",
      name: "BNI Virtual Account",
      icon: <Building2 className="w-5 h-5" />,
      description: "Transfer bank BNI",
      vaNumber: "9881" + bookingId?.slice(-8),
    },
  ];

  const selectedMethod = paymentMethods.find((m) => m.id === paymentMethod);

  return (
    <DashboardLayout userType="consumer" userName="Budi Santoso" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => navigate("/consumer/search")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout Pembayaran</h1>
          <p className="text-gray-600 mt-1">
            Selesaikan pembayaran untuk konfirmasi pesanan (FR-05)
          </p>
        </div>

        {!paymentComplete ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Payment Methods */}
            <div className="lg:col-span-2 space-y-6">
              {/* Timer */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold text-orange-900">
                        Selesaikan pembayaran dalam:
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-orange-600">
                      {formatTime(countdown)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Pilih Metode Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div key={method.id}>
                          <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label
                              htmlFor={method.id}
                              className="flex items-center gap-3 flex-1 cursor-pointer"
                            >
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                {method.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold">{method.name}</div>
                                <div className="text-sm text-gray-600">
                                  {method.description}
                                </div>
                              </div>
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instruksi Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                  {paymentMethod === "qris" && (
                    <div className="space-y-4">
                      <div className="bg-white p-6 border-2 border-dashed border-gray-300 rounded-lg flex justify-center">
                        <QRCodeSVG value={qrisValue} size={200} level="H" />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="font-semibold">Scan QR Code dengan aplikasi:</p>
                        <p className="text-sm text-gray-600">
                          GoPay, OVO, DANA, LinkAja, ShopeePay, atau aplikasi mobile
                          banking lainnya
                        </p>
                      </div>
                      <Separator />
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                        <li>Buka aplikasi e-wallet atau mobile banking</li>
                        <li>Pilih menu Scan QR / QRIS</li>
                        <li>Arahkan kamera ke QR Code di atas</li>
                        <li>Periksa detail pembayaran</li>
                        <li>Konfirmasi pembayaran</li>
                      </ol>
                    </div>
                  )}

                  {["gopay", "ovo", "dana"].includes(paymentMethod) && (
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-600 mb-2">
                          Nomor {selectedMethod?.name}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-2xl font-mono font-bold">
                            0812-3456-7890
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyPaymentCode("081234567890")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator />
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                        <li>Buka aplikasi {selectedMethod?.name}</li>
                        <li>Pilih menu Transfer / Kirim Uang</li>
                        <li>Masukkan nomor tujuan di atas</li>
                        <li>
                          Masukkan nominal:{" "}
                          <strong>Rp {booking.price.toLocaleString("id-ID")}</strong>
                        </li>
                        <li>Periksa detail dan konfirmasi pembayaran</li>
                      </ol>
                    </div>
                  )}

                  {["bca", "mandiri", "bni"].includes(paymentMethod) &&
                    selectedMethod?.vaNumber && (
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <p className="text-sm text-gray-600 mb-2">
                            Nomor Virtual Account
                          </p>
                          <div className="flex items-center justify-center gap-2">
                            <p className="text-2xl font-mono font-bold">
                              {selectedMethod.vaNumber}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleCopyPaymentCode(selectedMethod.vaNumber!)
                              }
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            a.n. ShareMeal Platform
                          </p>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">Via ATM:</p>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                            <li>Pilih menu Transfer</li>
                            <li>Pilih ke Rekening {selectedMethod.name}</li>
                            <li>Masukkan nomor VA di atas</li>
                            <li>Ikuti instruksi hingga selesai</li>
                          </ol>
                        </div>
                        <div className="space-y-2">
                          <p className="font-semibold text-sm">Via Mobile Banking:</p>
                          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                            <li>Buka aplikasi mobile banking</li>
                            <li>Pilih menu Transfer / Bayar</li>
                            <li>Pilih Virtual Account</li>
                            <li>Masukkan nomor VA dan konfirmasi</li>
                          </ol>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>

              {/* Confirm Payment Button */}
              <Button className="w-full h-12" onClick={handleConfirmPayment}>
                <CheckCircle className="w-5 h-5 mr-2" />
                Saya Sudah Bayar
              </Button>
              <p className="text-xs text-center text-gray-500">
                Klik tombol di atas setelah menyelesaikan pembayaran
              </p>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingBag className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold">{booking.storeName}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {store?.address || "Lihat di detail toko"}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Item Pesanan</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{booking.dealItem}</p>
                          <p className="text-sm text-gray-600">
                            Qty: {booking.quantity}
                          </p>
                        </div>
                        <p className="font-semibold">
                          Rp {booking.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Detail Pembayaran</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>Rp {booking.price.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Biaya Admin</span>
                        <span>Rp 0</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-green-600">
                          Rp {booking.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-2">Informasi Pengambilan</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Ambil di Toko</p>
                          <p className="text-gray-600">{booking.storeName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-gray-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Waktu Pengambilan</p>
                          <p className="text-gray-600">
                            {booking.pickupTime || "Hari ini, setelah pembayaran"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Kode Booking:</strong> {booking.id}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Tunjukkan kode ini saat mengambil pesanan
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Payment Success */
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                Pembayaran Berhasil!
              </h2>
              <p className="text-gray-600 mb-6">
                Terima kasih! Pesanan Anda sedang diproses oleh penjual.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-6 max-w-md mx-auto">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Booking ID</span>
                    <span className="font-mono font-semibold">{booking.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Bayar</span>
                    <span className="font-bold text-green-600">
                      Rp {booking.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metode</span>
                    <span className="font-semibold">{selectedMethod?.name}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate("/consumer/history")}>
                  Lihat Riwayat
                </Button>
                <Button variant="outline" onClick={() => navigate("/consumer/search")}>
                  Pesan Lagi
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
