import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-green-600 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <Button size="lg">
              <Home className="w-5 h-5 mr-2" />
              Kembali ke Beranda
            </Button>
          </Link>
          <Link to="/consumer/search">
            <Button size="lg" variant="outline">
              <Search className="w-5 h-5 mr-2" />
              Cari Makanan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
