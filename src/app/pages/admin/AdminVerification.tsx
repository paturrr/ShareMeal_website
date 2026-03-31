import { DashboardLayout } from "../../components/DashboardLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  LayoutDashboard,
  Shield,
  Users,
  CheckCircle,
  XCircle,
  FileText,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { name: "Verifikasi", path: "/admin/verification", icon: <Shield className="w-5 h-5" /> },
  { name: "Kelola User", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
];

export default function AdminVerification() {
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Toko Roti Sejahtera",
      type: "mitra",
      email: "roti.sejahtera@email.com",
      phone: "021-12345678",
      address: "Jl. Sudirman No. 100, Jakarta Pusat",
      submittedAt: "2026-03-31 09:00",
      documents: [
        { name: "SIUP", url: "#", status: "uploaded" },
        { name: "NIB", url: "#", status: "uploaded" },
        { name: "Sertifikat Halal", url: "#", status: "uploaded" },
      ],
      status: "pending",
      businessType: "Bakery & Pastry",
      description: "Toko roti dengan 3 cabang di Jakarta",
    },
    {
      id: 2,
      name: "Yayasan Harapan Bangsa",
      type: "lembaga",
      email: "yayasan.harapan@email.com",
      phone: "021-87654321",
      address: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
      submittedAt: "2026-03-31 08:30",
      documents: [
        { name: "Akta Pendirian", url: "#", status: "uploaded" },
        { name: "SK Kemenkumham", url: "#", status: "uploaded" },
        { name: "NPWP Lembaga", url: "#", status: "uploaded" },
        { name: "Surat Domisili", url: "#", status: "uploaded" },
      ],
      status: "pending",
      businessType: "Panti Asuhan",
      description: "Yayasan panti asuhan dengan 80 anak asuh",
      beneficiaries: 80,
    },
    {
      id: 3,
      name: "Healthy Cafe",
      type: "mitra",
      email: "healthy.cafe@email.com",
      phone: "021-11223344",
      address: "Jl. Thamrin No. 78, Jakarta Pusat",
      submittedAt: "2026-03-30 16:45",
      documents: [
        { name: "SIUP", url: "#", status: "uploaded" },
        { name: "NIB", url: "#", status: "uploaded" },
        { name: "Sertifikat Halal", url: "#", status: "uploaded" },
      ],
      status: "pending",
      businessType: "Healthy Food & Cafe",
      description: "Cafe dengan menu healthy food dan organic",
    },
    {
      id: 4,
      name: "Warung Makan Ibu Rina",
      type: "mitra",
      email: "warung.rina@email.com",
      phone: "021-99887766",
      address: "Jl. Mangga Dua No. 23, Jakarta Utara",
      submittedAt: "2026-03-30 10:00",
      documents: [
        { name: "SIUP", url: "#", status: "uploaded" },
        { name: "NIB", url: "#", status: "uploaded" },
      ],
      status: "approved",
      approvedAt: "2026-03-30 14:00",
      businessType: "Warung Makan",
      description: "Warung makan dengan masakan rumahan",
    },
    {
      id: 5,
      name: "Yayasan Cahaya Kasih",
      type: "lembaga",
      email: "cahaya.kasih@email.com",
      phone: "021-55667788",
      address: "Jl. Raya Bogor No. 150, Jakarta Timur",
      submittedAt: "2026-03-29 15:30",
      documents: [
        { name: "Akta Pendirian", url: "#", status: "uploaded" },
        { name: "SK Kemenkumham", url: "#", status: "uploaded" },
      ],
      status: "rejected",
      rejectedAt: "2026-03-30 09:00",
      rejectReason: "Dokumen akta pendirian tidak lengkap dan tidak jelas",
      businessType: "Panti Jompo",
      description: "Panti jompo dengan 50 lansia",
      beneficiaries: 50,
    },
  ]);

  const handleApprove = (id: number) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? {
              ...app,
              status: "approved",
              approvedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
            }
          : app
      )
    );
    toast.success("Aplikasi disetujui!");
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Alasan penolakan harus diisi");
      return;
    }

    if (selectedApplication) {
      setApplications(
        applications.map((app) =>
          app.id === selectedApplication
            ? {
                ...app,
                status: "rejected",
                rejectedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
                rejectReason,
              }
            : app
        )
      );
      toast.success("Aplikasi ditolak");
      setIsRejectDialogOpen(false);
      setRejectReason("");
      setSelectedApplication(null);
    }
  };

  const pendingApplications = applications.filter((app) => app.status === "pending");
  const approvedApplications = applications.filter((app) => app.status === "approved");
  const rejectedApplications = applications.filter((app) => app.status === "rejected");

  const ApplicationCard = ({ application }: { application: typeof applications[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold">{application.name}</h3>
                <Badge
                  variant="outline"
                  className={
                    application.type === "mitra"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-purple-50 text-purple-700 border-purple-200"
                  }
                >
                  {application.type === "mitra" ? "Mitra" : "Lembaga Sosial"}
                </Badge>
                {application.status === "pending" && (
                  <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
                )}
                {application.status === "approved" && (
                  <Badge className="bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Disetujui
                  </Badge>
                )}
                {application.status === "rejected" && (
                  <Badge className="bg-red-100 text-red-700">
                    <XCircle className="w-3 h-3 mr-1" />
                    Ditolak
                  </Badge>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-2">{application.businessType}</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-600">{application.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-600">{application.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-600">{application.address}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-gray-600">
                <strong>Deskripsi:</strong> {application.description}
              </div>
              {application.beneficiaries && (
                <div className="text-gray-600">
                  <strong>Penerima Manfaat:</strong> {application.beneficiaries} orang
                </div>
              )}
              <div className="text-xs text-gray-500">
                Diajukan: {application.submittedAt}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Dokumen Legalitas (FR-14)
            </h4>
            <div className="grid md:grid-cols-2 gap-2">
              {application.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded"
                >
                  <span className="text-sm font-medium">{doc.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Uploaded
                    </Badge>
                    <Button size="sm" variant="ghost">
                      Lihat
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {application.status === "approved" && (
            <div className="border-t pt-4 bg-green-50 -mx-6 px-6 py-4">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <div>
                  <div className="font-semibold">Disetujui</div>
                  <div className="text-sm">Tanggal: {application.approvedAt}</div>
                </div>
              </div>
            </div>
          )}

          {application.status === "rejected" && (
            <div className="border-t pt-4 bg-red-50 -mx-6 px-6 py-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-semibold text-red-900">Ditolak</div>
                  <div className="text-sm text-red-800 mt-1">
                    Tanggal: {application.rejectedAt}
                  </div>
                  <div className="text-sm text-red-800 mt-2">
                    <strong>Alasan:</strong> {application.rejectReason}
                  </div>
                </div>
              </div>
            </div>
          )}

          {application.status === "pending" && (
            <div className="border-t pt-4 flex gap-3">
              <Button
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={() => handleApprove(application.id)}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Setujui (FR-18)
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                onClick={() => {
                  setSelectedApplication(application.id);
                  setIsRejectDialogOpen(true);
                }}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Tolak (FR-18)
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout userType="admin" userName="Admin ShareMeal" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Verifikasi Mitra & Lembaga Sosial
          </h1>
          <p className="text-gray-600 mt-1">
            Sistem approval & verifikasi admin (FR-18, FR-14)
          </p>
        </div>

        {/* Info Banner */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>Proses Verifikasi (FR-18):</strong> Admin dapat melakukan
                validasi, menyetujui, atau menolak pendaftaran mitra dan lembaga sosial
                baru. Pastikan semua dokumen legalitas lengkap dan valid sebelum
                menyetujui.
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Pending ({pendingApplications.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Disetujui ({approvedApplications.length})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Ditolak ({rejectedApplications.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingApplications.length > 0 ? (
              pendingApplications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tidak Ada Aplikasi Pending
                  </h3>
                  <p className="text-gray-600">
                    Aplikasi baru akan muncul di sini
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {approvedApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tolak Aplikasi</DialogTitle>
              <DialogDescription>
                Berikan alasan penolakan yang jelas agar aplikant dapat memperbaiki
                dokumen mereka
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Alasan Penolakan</Label>
                <Textarea
                  id="reason"
                  placeholder="Jelaskan mengapa aplikasi ditolak..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsRejectDialogOpen(false);
                    setRejectReason("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={handleReject}
                >
                  Tolak Aplikasi
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
