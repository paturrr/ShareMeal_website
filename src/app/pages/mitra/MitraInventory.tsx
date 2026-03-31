import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Plus,
  Edit,
  Trash2,
  Clock,
  AlertCircle,
  Bell,
  CheckCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../contexts/AppContext";

const navigation = [
  { name: "Dashboard", path: "/mitra", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Inventaris", path: "/mitra/inventory", icon: <Package className="w-5 h-5" /> },
  { name: "Pesanan", path: "/mitra/orders", icon: <ShoppingCart className="w-5 h-5" /> },
];

export default function MitraInventory() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Roti Tawar",
      category: "Bakery",
      price: 15000,
      discountPrice: 10000,
      stock: 25,
      expiresAt: "2026-04-01 18:00",
      status: "flash-sale",
      image: "https://images.unsplash.com/photo-1666114170628-b34b0dcc21aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyeSUyMHNob3B8ZW58MXx8fHwxNzc0OTc0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Salad Bowl",
      category: "Healthy",
      price: 35000,
      discountPrice: 25000,
      stock: 12,
      expiresAt: "2026-04-01 15:00",
      status: "flash-sale",
      image: "https://images.unsplash.com/photo-1654458804670-2f4f26ab3154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBzYWxhZCUyMGhlYWx0aHl8ZW58MXx8fHwxNzc0OTc0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Lunch Box",
      category: "Meal",
      price: 45000,
      discountPrice: 30000,
      stock: 8,
      expiresAt: "2026-04-01 20:00",
      status: "flash-sale",
      image: "https://images.unsplash.com/photo-1543352632-fea6d4f83e78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVwYXJlZCUyMG1lYWwlMjBsdW5jaCUyMGJveHxlbnwxfHx8fDE3NzQ5NzQzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      name: "Roti Keju",
      category: "Bakery",
      price: 12000,
      discountPrice: 0,
      stock: 30,
      expiresAt: "2026-04-02 10:00",
      status: "normal",
      image: "https://images.unsplash.com/photo-1666114170628-b34b0dcc21aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyeSUyMHNob3B8ZW58MXx8fHwxNzc0OTc0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Bakery",
    price: "",
    stock: "",
    expiresAt: "",
    description: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.expiresAt) {
      toast.error("Semua field harus diisi");
      return;
    }

    const product = {
      id: products.length + 1,
      name: newProduct.name,
      category: newProduct.category,
      price: parseInt(newProduct.price),
      discountPrice: 0,
      stock: parseInt(newProduct.stock),
      expiresAt: newProduct.expiresAt,
      status: "normal",
      image: "https://images.unsplash.com/photo-1666114170628-b34b0dcc21aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMHBhc3RyeSUyMHNob3B8ZW58MXx8fHwxNzc0OTc0Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    };

    setProducts([...products, product]);
    setIsAddDialogOpen(false);
    setNewProduct({
      name: "",
      category: "Bakery",
      price: "",
      stock: "",
      expiresAt: "",
      description: "",
    });
    toast.success("Produk berhasil ditambahkan");
  };

  const handleSetFlashSale = (id: number) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, status: "flash-sale", discountPrice: Math.floor(p.price * 0.7) }
          : p
      )
    );
    toast.success("Flash sale diaktifkan!");
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success("Produk dihapus");
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours > 0 ? `${hours} jam` : "< 1 jam";
  };

  return (
    <DashboardLayout userType="mitra" userName="Toko Roti Barokah" navigation={navigation}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manajemen Inventaris Surplus
            </h1>
            <p className="text-gray-600 mt-1">
              Kelola stok makanan near-expired (FR-01, FR-02, FR-04)
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Produk
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tambah Produk Baru</DialogTitle>
                <DialogDescription>
                  Upload produk surplus untuk dijual atau didonasikan
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Produk</Label>
                  <Input
                    id="name"
                    placeholder="Contoh: Roti Tawar"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bakery">Bakery</SelectItem>
                      <SelectItem value="Healthy">Healthy</SelectItem>
                      <SelectItem value="Meal">Meal</SelectItem>
                      <SelectItem value="Snack">Snack</SelectItem>
                      <SelectItem value="Beverage">Beverage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Harga Normal</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="15000"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stok</Label>
                    <Input
                      id="stock"
                      type="number"
                      placeholder="20"
                      value={newProduct.stock}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, stock: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Waktu Expired</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={newProduct.expiresAt}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, expiresAt: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi & Kondisi</Label>
                  <Textarea
                    id="description"
                    placeholder="Jelaskan kondisi produk..."
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo">Upload Foto Produk</Label>
                  <Input id="photo" type="file" accept="image/*" />
                  <p className="text-xs text-gray-500">
                    Upload foto kondisi produk untuk transparansi
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddProduct} className="flex-1">
                    Simpan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="flex-1"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.status === "flash-sale" && (
                  <Badge className="absolute top-2 right-2 bg-red-600">
                    Flash Sale
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-orange-600 font-medium">
                      Expired: {getTimeRemaining(product.expiresAt)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      {product.discountPrice > 0 ? (
                        <>
                          <div className="text-lg font-bold text-green-600">
                            Rp {product.discountPrice.toLocaleString("id-ID")}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            Rp {product.price.toLocaleString("id-ID")}
                          </div>
                        </>
                      ) : (
                        <div className="text-lg font-bold">
                          Rp {product.price.toLocaleString("id-ID")}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Stok: {product.stock}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {product.status === "normal" ? (
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleSetFlashSale(product.id)}
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Set Flash Sale
                      </Button>
                    ) : (
                      <Badge variant="outline" className="flex-1 justify-center py-2">
                        <Clock className="w-3 h-3 mr-1" />
                        Timer Aktif
                      </Badge>
                    )}
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Sistem Klasifikasi Otomatis (FR-04)
                </h3>
                <p className="text-sm text-blue-800">
                  Produk akan otomatis dikategorikan ke "Jual" (Flash Sale) atau
                  "Donasi" berdasarkan waktu expired dan kelayakan. Produk yang
                  mendekati batas waktu namun masih layak konsumsi akan masuk sistem
                  donasi untuk lembaga sosial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}