import { Link } from "react-router";
import { Button } from "./ui/button";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { useState } from "react";
import Icon from "../../imports/Icon";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
            <a 
              href="#eksplorasi" 
              onClick={(e) => handleSmoothScroll(e, 'eksplorasi')}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Eksplorasi
            </a>
            <a 
              href="#fitur" 
              onClick={(e) => handleSmoothScroll(e, 'fitur')}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Fitur
            </a>
            <a 
              href="#bergabung" 
              onClick={(e) => handleSmoothScroll(e, 'bergabung')}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
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
              <a
                href="#eksplorasi"
                onClick={(e) => {
                  handleSmoothScroll(e, 'eksplorasi');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-600"
              >
                Eksplorasi
              </a>
              <a
                href="#fitur"
                onClick={(e) => {
                  handleSmoothScroll(e, 'fitur');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-600"
              >
                Fitur
              </a>
              <a
                href="#bergabung"
                onClick={(e) => {
                  handleSmoothScroll(e, 'bergabung');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-green-600"
              >
                Bergabung
              </a>
              <Link
                to="/consumer"
                className="text-gray-700 hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="border-t pt-4">
                <Link to="/consumer/search" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">
                    Cari Makanan
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}