import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  LayoutDashboard,
  Search,
  History,
  BookOpen,
  Leaf,
  Droplets,
  Award,
  ChevronRight,
  Clock,
  User,
  Share2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router";

const navigation = [
  { name: "Dashboard", path: "/consumer", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Cari Makanan", path: "/consumer/search", icon: <Search className="w-5 h-5" /> },
  { name: "Riwayat", path: "/consumer/history", icon: <History className="w-5 h-5" /> },
  { name: "Edukasi", path: "/consumer/education", icon: <BookOpen className="w-5 h-5" /> },
];

const publishedArticles = [
  {
    id: 1,
    title: "5 Cara Mengurangi Food Waste di Rumah",
    category: "Tips",
    date: "25 Mar 2026",
    author: "Tim ShareMeal",
    readTime: "3 min read",
    content: "Langkah-langkah praktis untuk mengurangi food waste yang bisa dimulai dari dapur Anda sendiri. Salah satu caranya adalah dengan merencanakan menu mingguan...",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Dampak Sampah Makanan Terhadap Perubahan Iklim",
    category: "Artikel",
    date: "28 Mar 2026",
    author: "Pakar Lingkungan",
    readTime: "5 min read",
    content: "Tahukah Anda bahwa sampah makanan berkontribusi besar terhadap gas rumah kaca? Jika sampah makanan adalah sebuah negara, ia akan menjadi penghasil emisi terbesar ketiga di dunia...",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Panduan Menyimpan Sayur dan Buah Agar Tahan Lama",
    category: "Panduan",
    date: "30 Mar 2026",
    author: "Chef Budi",
    readTime: "4 min read",
    content: "Banyak sayuran dan buah yang terbuang karena cara penyimpanan yang salah. Pelajari trik menyimpan bahan makanan agar tetap segar berminggu-minggu...",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Mengenal Perbedaan Best Before dan Expired Date",
    category: "Edukasi",
    date: "01 Apr 2026",
    author: "BPOM Info",
    readTime: "3 min read",
    content: "Sering membuang makanan karena sudah melewati tanggal 'Best Before'? Tunggu dulu! Pahami perbedaan kedua istilah ini agar tidak membuang makanan yang masih sangat layak konsumsi...",
    image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&q=80&w=800",
  }
];

export default function ConsumerEducation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", "Tips", "Artikel", "Panduan", "Edukasi"];

  const filteredArticles = publishedArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Semua" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShare = (title: string) => {
    toast.success(`Tautan untuk "${title}" berhasil disalin!`);
  };

  return (
    <DashboardLayout userType="consumer" userName="Konsumen" navigation={navigation}>
      <div className="space-y-6">
        {/* Header section */}
        <div className="bg-[#174413] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="relative z-10 md:w-2/3">
            <Badge className="bg-green-500 hover:bg-green-600 text-white mb-4 border-none">
              Edukasi Lingkungan (FR-08)
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Mari Bersama Kurangi Food Waste
            </h1>
            <p className="text-green-100 text-lg mb-6 max-w-xl">
              Tingkatkan pengetahuanmu tentang dampak sampah makanan dan temukan tips praktis 
              untuk mulai menyelamatkan makanan hari ini.
            </p>
            <div className="flex w-full max-w-md items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  type="text" 
                  placeholder="Cari artikel atau topik..." 
                  className="pl-10 bg-white text-gray-900 border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-16 -bottom-16 opacity-10">
            <Leaf className="w-64 h-64" />
          </div>
          <div className="absolute right-32 top-8 opacity-20">
            <Droplets className="w-24 h-24" />
          </div>
        </div>

        {/* Stats / Impact gamification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-green-800 font-medium">Artikel Dibaca</p>
                <h3 className="text-xl font-bold text-green-950">12 Artikel</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-blue-800 font-medium">Level Edukasi</p>
                <h3 className="text-xl font-bold text-blue-950">Food Saver Pro</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-orange-100">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-orange-700" />
              </div>
              <div>
                <p className="text-sm text-orange-800 font-medium">Poin Pengetahuan</p>
                <h3 className="text-xl font-bold text-orange-950">350 Poin</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "bg-[#174413] hover:bg-[#174413]/90" : "bg-white"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Article Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <Card key={article.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow group">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white border-none shadow-sm backdrop-blur-sm">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 mb-3 gap-3">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" /> {article.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                    {article.content}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <Button variant="ghost" size="sm" className="text-[#174413] hover:text-[#174413]/80 hover:bg-green-50 p-0 px-2 h-8">
                      Baca Selengkapnya <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-[#174413] hover:bg-green-50"
                      onClick={() => handleShare(article.title)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Tidak ada artikel</h3>
            <p className="text-gray-500">Tidak dapat menemukan artikel yang sesuai dengan pencarian Anda.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("Semua");
              }}
            >
              Reset Pencarian
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
