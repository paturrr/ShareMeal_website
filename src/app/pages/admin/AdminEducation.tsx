import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import {
  LayoutDashboard,
  Shield,
  Users,
  BookOpen,
  Plus,
  Pencil,
  Trash2,
  Search,
  Eye,
  FileText
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Verifikasi", path: "/admin/verification", icon: <Shield className="w-5 h-5" /> },
  { name: "Kelola User", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { name: "Edukasi", path: "/admin/education", icon: <BookOpen className="w-5 h-5" /> },
];

const initialArticles = [
  {
    id: 1,
    title: "5 Cara Mengurangi Food Waste di Rumah",
    category: "Tips",
    status: "Published",
    date: "2026-03-25",
    author: "Admin System",
    content: "Langkah-langkah praktis untuk mengurangi food waste yang bisa dimulai dari dapur Anda sendiri...",
  },
  {
    id: 2,
    title: "Dampak Sampah Makanan Terhadap Perubahan Iklim",
    category: "Artikel",
    status: "Published",
    date: "2026-03-28",
    author: "Admin System",
    content: "Tahukah Anda bahwa sampah makanan berkontribusi besar terhadap gas rumah kaca? Berikut adalah faktanya...",
  },
  {
    id: 3,
    title: "Panduan Donasi Makanan Aman",
    category: "Panduan",
    status: "Draft",
    date: "2026-04-01",
    author: "Admin System",
    content: "Sebelum mendonasikan makanan, ada beberapa standar keamanan pangan yang perlu diperhatikan...",
  }
];

export default function AdminEducation() {
  const [articles, setArticles] = useState(initialArticles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "Draft",
    content: ""
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenDialog = (article = null) => {
    if (article) {
      setCurrentArticle(article);
      setFormData({
        title: article.title,
        category: article.category,
        status: article.status,
        content: article.content
      });
    } else {
      setCurrentArticle(null);
      setFormData({
        title: "",
        category: "Tips",
        status: "Draft",
        content: ""
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveArticle = () => {
    if (!formData.title || !formData.category || !formData.content) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    if (currentArticle) {
      // Edit
      setArticles(articles.map(a => a.id === currentArticle.id ? { ...a, ...formData } : a));
      toast.success("Artikel berhasil diperbarui");
    } else {
      // Add
      const newArticle = {
        id: articles.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0],
        author: "Admin System",
      };
      setArticles([newArticle, ...articles]);
      toast.success("Artikel baru berhasil ditambahkan");
    }
    setIsDialogOpen(false);
  };

  const handleDeleteClick = (article: any) => {
    setCurrentArticle(article);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setArticles(articles.filter(a => a.id !== currentArticle.id));
    toast.success("Artikel berhasil dihapus");
    setIsDeleteDialogOpen(false);
  };

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout userType="admin" userName="Admin ShareMeal" navigation={navigation}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edukasi Lingkungan</h1>
            <p className="text-gray-600 mt-1">
              Kelola artikel, tips, dan panduan edukasi seputar food waste (FR-19)
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="bg-[#174413] hover:bg-[#174413]/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Tulis Artikel
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Artikel</p>
                <h3 className="text-2xl font-bold text-gray-900">{articles.length}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Published</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === "Published").length}
                </h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Drafts</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {articles.filter(a => a.status === "Draft").length}
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CMS Table Area */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <CardTitle>Daftar Konten</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari artikel..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="m-0">
                <ArticleList 
                  articles={filteredArticles} 
                  onEdit={handleOpenDialog} 
                  onDelete={handleDeleteClick} 
                />
              </TabsContent>
              <TabsContent value="published" className="m-0">
                <ArticleList 
                  articles={filteredArticles.filter(a => a.status === "Published")} 
                  onEdit={handleOpenDialog} 
                  onDelete={handleDeleteClick} 
                />
              </TabsContent>
              <TabsContent value="draft" className="m-0">
                <ArticleList 
                  articles={filteredArticles.filter(a => a.status === "Draft")} 
                  onEdit={handleOpenDialog} 
                  onDelete={handleDeleteClick} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Dialog for Create/Edit */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>{currentArticle ? "Edit Artikel" : "Tulis Artikel Baru"}</DialogTitle>
              <DialogDescription>
                Buat konten edukatif untuk meningkatkan kesadaran tentang food waste.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Judul Artikel</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  placeholder="Masukkan judul artikel"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Kategori</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData({...formData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tips">Tips & Trik</SelectItem>
                      <SelectItem value="Artikel">Artikel Edukasi</SelectItem>
                      <SelectItem value="Berita">Berita</SelectItem>
                      <SelectItem value="Panduan">Panduan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label>Status Publikasi</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Simpan sebagai Draft</SelectItem>
                      <SelectItem value="Published">Publish Sekarang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="content">Konten</Label>
                <Textarea 
                  id="content" 
                  rows={8}
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})} 
                  placeholder="Tulis konten artikel di sini..."
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSaveArticle} className="bg-[#174413] hover:bg-[#174413]/90 text-white">
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Hapus Artikel</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus artikel "{currentArticle?.title}"? Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Ya, Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </DashboardLayout>
  );
}

function ArticleList({ articles, onEdit, onDelete }: { articles: any[], onEdit: (a: any) => void, onDelete: (a: any) => void }) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>Tidak ada artikel yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <div key={article.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-1 mb-4 sm:mb-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900">{article.title}</h3>
              <Badge variant={article.status === "Published" ? "default" : "secondary"} 
                     className={article.status === "Published" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                {article.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-3">
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {article.category}
              </span>
              <span>•</span>
              <span>{article.date}</span>
              <span>•</span>
              <span>Oleh: {article.author}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 line-clamp-1">{article.content}</p>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={() => onEdit(article)}>
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => onDelete(article)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
