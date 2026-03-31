import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CheckCircle,
  Clock,
  User,
  Phone,
  MapPin,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../contexts/AppContext";

const navigation = [
  { name: "Dashboard", path: "/mitra", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Inventaris", path: "/mitra/inventory", icon: <Package className="w-5 h-5" /> },
  { name: "Pesanan", path: "/mitra/orders", icon: <ShoppingCart className="w-5 h-5" /> },
];

export default function MitraOrders() {
  const { orders: contextOrders, updateOrderStatus } = useApp();
  
  // For demo, we keep the old static orders + add new context orders
  const [staticOrders] = useState([
    {
      id: "ORD-001",
      customer: {
        name: "Budi Santoso",
        phone: "08123456789",
        email: "budi@email.com",
      },
      items: [
        { name: "Roti Tawar", quantity: 3, price: 10000 },
        { name: "Roti Keju", quantity: 2, price: 8000 },
      ],
      total: 46000,
      status: "pending",
      pickupCode: "PICK-ABC123",
      orderTime: "2026-03-31 09:30",
      pickupTime: "2026-03-31 17:00",
    },
    {
      id: "ORD-002",
      customer: {
        name: "Siti Nurhaliza",
        phone: "08198765432",
        email: "siti@email.com",
      },
      items: [{ name: "Salad Bowl", quantity: 2, price: 25000 }],
      total: 50000,
      status: "pending",
      pickupCode: "PICK-XYZ789",
      orderTime: "2026-03-31 10:15",
      pickupTime: "2026-03-31 18:00",
    },
  ]);

  // Combine context orders with static orders
  const allOrders = [
    ...staticOrders,
    ...contextOrders.map((order) => ({
      id: order.id,
      customer: {
        name: order.consumerName,
        phone: "08123456789",
        email: "customer@email.com",
      },
      items: [{ name: order.dealItem, quantity: order.quantity, price: order.price }],
      total: order.price * order.quantity,
      status: order.status,
      pickupCode: `PICK-${order.id.slice(-6)}`,
      orderTime: new Date(order.orderDate).toISOString().slice(0, 16).replace("T", " "),
      pickupTime: new Date(order.orderDate.getTime() + 8 * 60 * 60 * 1000).toISOString().slice(0, 16).replace("T", " "),
      completedTime: order.status === "completed" ? new Date().toISOString().slice(0, 16).replace("T", " ") : undefined,
    })),
  ];

  const handleConfirmPickup = (orderId: string) => {
    updateOrderStatus(orderId, "completed");
    toast.success("Pesanan dikonfirmasi sebagai sudah diambil!", {
      description: "Stok inventory Anda sudah otomatis dikurangi",
      icon: <CheckCircle className="w-5 h-5" />,
    });
  };

  const pendingOrders = allOrders.filter((o) => o.status === "pending");
  const completedOrders = allOrders.filter((o) => o.status === "completed");

  const OrderCard = ({ order }: { order: typeof allOrders[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-lg">Pesanan #{order.id}</h3>
                <Badge
                  variant={order.status === "completed" ? "default" : "secondary"}
                  className={
                    order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }
                >
                  {order.status === "completed"
                    ? "Selesai"
                    : "Menunggu Diambil"}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Dipesan: {order.orderTime}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                Rp {order.total.toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Informasi Pembeli
                </h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-900">{order.customer.name}</p>
                  <p className="text-gray-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {order.customer.phone}
                  </p>
                  <p className="text-gray-600">{order.customer.email}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Kode Pengambilan
                </h4>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="text-2xl font-mono font-bold text-center">
                    {order.pickupCode}
                  </div>
                  <p className="text-xs text-center text-gray-600 mt-1">
                    Jadwal: {order.pickupTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Item Pesanan</h4>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex-1">
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

          {order.status === "pending" ? (
            <Button
              className="w-full"
              onClick={() => handleConfirmPickup(order.id)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Konfirmasi Sudah Diambil (FR-06)
            </Button>
          ) : (
            <div className="text-center py-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
              Diselesaikan: {order.completedTime}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout userType="mitra" userName="Toko Roti Barokah" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Daftar Pesanan Masuk
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola pesanan booking pengambilan makanan (FR-03, FR-06)
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Menunggu ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Selesai ({completedOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tidak Ada Pesanan Pending
                  </h3>
                  <p className="text-gray-600">
                    Pesanan baru akan muncul di sini
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Belum Ada Pesanan Selesai
                  </h3>
                  <p className="text-gray-600">
                    Riwayat pesanan yang sudah diselesaikan akan muncul di sini
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