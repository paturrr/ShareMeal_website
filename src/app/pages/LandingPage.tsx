import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Button } from "../components/ui/button";
import {
  ShoppingBag,
  Store,
  Heart,
  TrendingDown,
  Users,
  MapPin,
  Clock,
  Tag,
  Shield,
  Award,
  CheckCircle,
  Timer,
  Search,
  Star,
  Leaf,
} from "lucide-react";
import Icon from "../../imports/Icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Selamatkan Makanan,
                <span className="text-green-600"> Selamatkan Bumi</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                ShareMeal menghubungkan bisnis pangan dengan konsumen dan lembaga
                sosial untuk mengurangi food waste dan membangun ekosistem pangan
                yang berkelanjutan.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Mulai Sekarang
                  </Button>
                </Link>
                <Link to="/consumer/search">
                  <Button size="lg" variant="outline">
                    Cari Makanan
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1563485571829-7032f428f3ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZm9vZCUyMHdhc3RlJTIwcmVkdWN0aW9ufGVufDF8fHx8MTc3NDk3NDI4M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fresh food"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600">500+</div>
              <div className="text-gray-600 mt-2">Mitra Toko</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">50K+</div>
              <div className="text-gray-600 mt-2">Pengguna Aktif</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">100K+</div>
              <div className="text-gray-600 mt-2">Makanan Terselamatkan</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">200+</div>
              <div className="text-gray-600 mt-2">Lembaga Sosial</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="eksplorasi" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Bagaimana Cara Kerjanya?
            </h2>
            <p className="text-xl text-gray-600">
              Platform tiga arah yang menghubungkan semua pihak
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Store className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Untuk Mitra</CardTitle>
                <CardDescription>Pelaku Usaha Pangan</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Kelola inventaris surplus makanan</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Atur flash sale otomatis</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Donasikan makanan ke lembaga sosial</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Kurangi food waste & biaya TPA</span>
                  </li>
                </ul>
                <Link to="/mitra">
                  <Button className="w-full mt-6" variant="outline">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Untuk Konsumen</CardTitle>
                <CardDescription>Pembeli Cerdas</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Beli makanan berkualitas dengan harga diskon</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Cari toko terdekat dengan GPS</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Notifikasi flash sale real-time</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Berkontribusi kurangi food waste</span>
                  </li>
                </ul>
                <Link to="/consumer">
                  <Button className="w-full mt-6" variant="outline">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Untuk Lembaga Sosial</CardTitle>
                <CardDescription>Penerima Donasi</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Terima donasi makanan layak konsumsi</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Klaim donasi first-come first-served</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Tracking logistik real-time</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Riwayat penerimaan lengkap</span>
                  </li>
                </ul>
                <Link to="/lembaga">
                  <Button className="w-full mt-6" variant="outline">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="fitur" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-xl text-gray-600">
              Teknologi canggih untuk distribusi pangan berkelanjutan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flash Sale Timer</h3>
              <p className="text-gray-600">
                Countdown otomatis untuk makanan near-expired dengan diskon bertahap
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location-Based Search</h3>
              <p className="text-gray-600">
                Temukan toko terdekat dengan teknologi GPS real-time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rating & Review</h3>
              <p className="text-gray-600">
                Sistem rating transparan dengan upload foto bukti kualitas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verifikasi Admin</h3>
              <p className="text-gray-600">
                Semua mitra dan lembaga terverifikasi untuk keamanan maksimal
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kurangi Food Waste</h3>
              <p className="text-gray-600">
                Distribusi otomatis ke "Jual" atau "Donasi" berdasarkan kelayakan
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Cabang</h3>
              <p className="text-gray-600">
                Kelola inventaris berbagai cabang dalam satu akun induk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1593113702251-272b1bc414a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBjaGFyaXR5JTIwaGVscGluZ3xlbnwxfHx8fDE3NzQ5NzQyODN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Food donation"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
                <span className="text-green-600 font-semibold">DAMPAK POSITIF</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Bersama Membangun Masa Depan Berkelanjutan
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                ShareMeal tidak hanya mengurangi food waste, tetapi juga membantu
                lembaga sosial mendapatkan akses pangan berkualitas dan memberikan
                peluang konsumen untuk berkontribusi pada lingkungan.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Kurangi Limbah TPA</div>
                    <div className="text-gray-600">
                      Mencegah ton makanan berakhir di tempat pemrosesan akhir
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Bantu Lembaga Sosial</div>
                    <div className="text-gray-600">
                      Distribusi makanan layak konsumsi ke panti asuhan dan yayasan
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold">Hemat Biaya Operasional</div>
                    <div className="text-gray-600">
                      Mitra menghemat biaya pembuangan dan dapatkan tambahan pendapatan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="bergabung" className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Siap Bergabung dengan ShareMeal?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Jadilah bagian dari gerakan mengurangi food waste di Indonesia
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Daftar Sekarang
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-green-700 hover:text-white"
              >
                Sudah Punya Akun
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6">
                  <Icon />
                </div>
                <span className="font-bold text-white">ShareMeal</span>
              </div>
              <p className="text-sm">
                Platform digital untuk mengoptimalkan pemanfaatan surplus pangan
                dan mengurangi food waste.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Untuk Pengguna</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/consumer" className="hover:text-green-500">
                    Konsumen
                  </Link>
                </li>
                <li>
                  <Link to="/mitra" className="hover:text-green-500">
                    Mitra Toko
                  </Link>
                </li>
                <li>
                  <Link to="/lembaga" className="hover:text-green-500">
                    Lembaga Sosial
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-500">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-green-500">
                    Kebijakan Privasi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-500">
                    Syarat & Ketentuan
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 ShareMeal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}