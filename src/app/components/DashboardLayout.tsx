import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import Icon from "../../imports/Icon";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "mitra" | "consumer" | "lembaga" | "admin";
  userName: string;
  navigation: Array<{
    name: string;
    path: string;
    icon: React.ReactNode;
  }>;
}

export function DashboardLayout({
  children,
  userType,
  userName,
  navigation,
}: DashboardLayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8">
                <Icon />
              </div>
              <span className="text-xl font-bold" style={{ color: '#174413' }}>ShareMeal</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500 capitalize">{userType}</div>
              </div>
              <Link to="/login">
                <Button variant="outline" size="sm" className="hidden md:flex">
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </Button>
              </Link>
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
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link key={item.path} to={item.path}>
                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-green-50 text-green-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
              <div className="bg-white w-64 h-full p-4">
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-900">{userName}</div>
                  <div className="text-xs text-gray-500 capitalize">{userType}</div>
                </div>
                <nav className="space-y-2">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-green-50 text-green-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-6">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}