import { Link } from "react-router";
import { Button } from "./ui/button";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { useState } from "react";
import Icon from "../../imports/Icon";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8">
              <Icon />
            </div>
            <span className="text-xl font-bold" style={{ color: '#174413' }}>ShareMeal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/#eksplorasi" className="text-gray-700 hover:text-green-600 font-medium">
              Eksplorasi
            </a>
            <a href="/#fitur" className="text-gray-700 hover:text-green-600 font-medium">
              Fitur
            </a>
            <a href="/#bergabung" className="text-gray-700 hover:text-green-600 font-medium">
              Bergabung
            </a>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 ml-4 pl-6 border-l border-gray-200">
              <Link to="/consumer" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-9 h-9 bg-[#174413] text-white rounded-full flex items-center justify-center font-bold text-sm">
                  KS
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-900 leading-none">Konsumen</span>
                  <span className="text-xs text-gray-500 mt-1">Dashboard</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                to="/consumer/search"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cari Makanan
              </Link>
              <Link
                to="/consumer"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Untuk Konsumen
              </Link>
              <Link
                to="/mitra"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Untuk Mitra
              </Link>
              <Link
                to="/lembaga"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Untuk Lembaga
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Masuk
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Daftar</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}