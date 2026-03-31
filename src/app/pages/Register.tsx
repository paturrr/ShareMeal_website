import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import svgPaths from "../../imports/svg-kkgai4ntim";
import imgCommunityImpact from "figma:asset/521e369e47eacc72faf4fcfb018ce46b2efbb9f2.png";
import Icon from "../../imports/Icon";

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("mitra");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast.error("Anda harus menyetujui Syarat & Ketentuan");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password tidak cocok");
      return;
    }

    if (formData.name && formData.email && formData.password) {
      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } else {
      toast.error("Semua field harus diisi");
    }
  };

  return (
    <div className="bg-[#f9f9f8] min-h-screen flex">
      {/* Left Side - Visual Impact */}
      <div className="bg-[#174413] flex-1 min-w-0 relative hidden lg:flex items-start justify-start overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img 
              alt="" 
              className="absolute h-full left-[-30%] max-w-none top-0 w-[160%]" 
              src={imgCommunityImpact} 
            />
          </div>
          <div 
            className="absolute inset-0" 
            style={{ backgroundImage: "linear-gradient(46.7637deg, rgba(23, 68, 19, 0.6) 0%, rgba(23, 68, 19, 0) 100%)" }}
          />
        </div>

        {/* Content */}
        <div className="h-full flex flex-col items-start justify-between p-16 pl-12 relative z-10 w-[463.44px]">
          {/* Top - Logo */}
          <div className="flex items-center gap-3 w-full">
            <div className="w-[25.493px] h-[25.488px]">
              <Icon />
            </div>
            <div className="flex flex-col font-['Manrope',sans-serif] font-extrabold text-[30px] text-white leading-[36px] tracking-[-0.75px]">
              <p>ShareMeal</p>
            </div>
          </div>

          {/* Middle - Heading & Description */}
          <div className="flex flex-col gap-6 max-w-[512px] w-full">
            <div className="flex flex-col font-['Manrope',sans-serif] font-extrabold text-[48px] text-white leading-[60px]">
              <p className="mb-0">Bersama Kurangi</p>
              <p className="mb-0">Limbah, Berbagi</p>
              <p>Berkah.</p>
            </div>
            <div className="flex flex-col font-['Inter',sans-serif] text-[18px] text-[rgba(255,255,255,0.9)] leading-[29.25px]">
              <p className="mb-0">Bergabunglah dengan ekosistem pangan berkelanjutan</p>
              <p className="mb-0">kami. Berikan dampak nyata bagi bumi dan sesama melalui</p>
              <p>langkah sederhana menyelamatkan surplus makanan.</p>
            </div>
          </div>

          {/* Bottom - Stats */}
          <div className="flex gap-12 h-[52px] items-start w-full">
            <div className="flex flex-col items-start w-[194.3px]">
              <div className="font-['Manrope',sans-serif] font-extrabold text-[30px] text-white leading-[36px]">
                <p>15k+</p>
              </div>
              <div className="font-['Inter',sans-serif] text-[12px] text-white opacity-80 tracking-[1.2px] uppercase leading-[16px]">
                <p>Makanan Terselamatkan</p>
              </div>
            </div>
            <div className="flex flex-col items-start w-[93.14px]">
              <div className="font-['Manrope',sans-serif] font-extrabold text-[30px] text-white leading-[36px]">
                <p>200+</p>
              </div>
              <div className="font-['Inter',sans-serif] text-[12px] text-white opacity-80 tracking-[1.2px] uppercase leading-[16px]">
                <p>Mitra Lokal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="bg-white flex-1 min-w-0 flex items-center justify-center">
        <div className="w-full max-w-[576px] px-6 py-8 lg:px-16 lg:py-10">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-[30px] font-['Manrope',sans-serif] font-extrabold text-[#174413] leading-[36px]">
              Buat Akun Baru
            </h2>
            <p className="text-[16px] font-['Inter',sans-serif] font-medium text-[#41493e] leading-[24px]">
              Langkah awal Anda menuju masa depan tanpa limbah.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="flex flex-col gap-8">
            {/* Role Selection */}
            <div className="flex flex-col gap-4">
              <div className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#174413] tracking-[1.4px] uppercase leading-[20px]">
                <p>Pilih Peran Anda</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {/* Mitra Card */}
                <button
                  type="button"
                  onClick={() => setUserType("mitra")}
                  className={`bg-[#edeeed] rounded-xl p-5 flex flex-col gap-3 items-start border-2 transition-colors ${
                    userType === "mitra" ? "border-[#174413]" : "border-transparent"
                  }`}
                >
                  <div className="h-[18px] w-full">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137.333 18">
                      <path d={svgPaths.p209d4440} fill="#174413" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#174413] leading-[24px]">
                      Mitra
                    </p>
                    <p className="font-['Inter',sans-serif] text-[10px] text-[#41493e] leading-[12.5px]">
                      Toko atau Restoran
                    </p>
                  </div>
                </button>

                {/* Konsumen Card */}
                <button
                  type="button"
                  onClick={() => setUserType("consumer")}
                  className={`bg-[#edeeed] rounded-xl p-5 flex flex-col gap-3 items-start border-2 transition-colors ${
                    userType === "consumer" ? "border-[#174413]" : "border-transparent"
                  }`}
                >
                  <div className="h-[16px] w-full">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137.333 16">
                      <path d={svgPaths.p85bff00} fill="#174413" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#174413] leading-[24px]">
                      Konsumen
                    </p>
                    <p className="font-['Inter',sans-serif] text-[10px] text-[#41493e] leading-[12.5px]">
                      Pahlawan Makanan
                    </p>
                  </div>
                </button>

                {/* Lembaga Card */}
                <button
                  type="button"
                  onClick={() => setUserType("lembaga")}
                  className={`bg-[#edeeed] rounded-xl p-5 flex flex-col gap-3 items-start border-2 transition-colors ${
                    userType === "lembaga" ? "border-[#174413]" : "border-transparent"
                  }`}
                >
                  <div className="h-[20.5px] w-full">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137.333 20.5">
                      <path d={svgPaths.p2897c480} fill="#174413" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#174413] leading-[24px]">
                      Lembaga
                    </p>
                    <p className="font-['Inter',sans-serif] text-[10px] text-[#41493e] leading-[12.5px]">
                      Organisasi Sosial
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Input Fields - Grid 2 Columns */}
            <div className="flex flex-col gap-5">
              {/* Nama Lengkap */}
              <div className="relative h-[80px]">
                <label className="absolute left-1 top-2 font-['Inter',sans-serif] font-semibold text-[12px] text-[#41493e] tracking-[0.6px] uppercase leading-[16px]">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="absolute top-6 left-0 right-0 bg-[#e7e8e7] rounded-xl px-5 py-[18px] text-[16px] font-['Inter',sans-serif] text-[#191c1c] placeholder:text-[#c0c9bb] outline-none focus:ring-2 focus:ring-[#174413]"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative h-[80px]">
                <label className="absolute left-1 top-2 font-['Inter',sans-serif] font-semibold text-[12px] text-[#41493e] tracking-[0.6px] uppercase leading-[16px]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@contoh.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="absolute top-6 left-0 right-0 bg-[#e7e8e7] rounded-xl px-5 py-[18px] text-[16px] font-['Inter',sans-serif] text-[#191c1c] placeholder:text-[#c0c9bb] outline-none focus:ring-2 focus:ring-[#174413]"
                  required
                />
              </div>

              {/* Kata Sandi */}
              <div className="relative h-[80px]">
                <label className="absolute left-1 top-2 font-['Inter',sans-serif] font-semibold text-[12px] text-[#41493e] tracking-[0.6px] uppercase leading-[16px]">
                  Kata Sandi
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="absolute top-6 left-0 right-0 bg-[#e7e8e7] rounded-xl px-5 py-[18px] pr-12 text-[16px] font-['Inter',sans-serif] text-[#191c1c] placeholder:text-[#c0c9bb] outline-none focus:ring-2 focus:ring-[#174413]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[46px] -translate-y-1/2 text-[#717a6d] hover:text-[#174413]"
                >
                  {showPassword ? (
                    <EyeOff className="w-[18.33px] h-[12.5px]" />
                  ) : (
                    <Eye className="w-[18.33px] h-[12.5px]" />
                  )}
                </button>
              </div>

              {/* Konfirmasi Kata Sandi */}
              <div className="relative h-[80px]">
                <label className="absolute left-1 top-2 font-['Inter',sans-serif] font-semibold text-[12px] text-[#41493e] tracking-[0.6px] uppercase leading-[16px]">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="absolute top-6 left-0 right-0 bg-[#e7e8e7] rounded-xl px-5 py-[18px] pr-12 text-[16px] font-['Inter',sans-serif] text-[#191c1c] placeholder:text-[#c0c9bb] outline-none focus:ring-2 focus:ring-[#174413]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-[46px] -translate-y-1/2 text-[#717a6d] hover:text-[#174413]"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-[18.33px] h-[12.5px]" />
                  ) : (
                    <Eye className="w-[18.33px] h-[12.5px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="relative h-[45.5px] flex items-start">
              <div className="pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-5 h-5 rounded border border-[#c0c9bb] bg-white cursor-pointer"
                />
              </div>
              <label 
                htmlFor="terms"
                className="ml-4 font-['Inter',sans-serif] text-[14px] text-[#41493e] leading-[22.75px] cursor-pointer"
              >
                Saya menyetujui{" "}
                <Link to="#" className="font-semibold text-[#174413] hover:underline">
                  Syarat & Ketentuan
                </Link>
                {" "}serta{" "}
                <Link to="#" className="font-semibold text-[#174413] hover:underline">
                  Kebijakan Privasi
                </Link>
                {" "}yang berlaku di ShareMeal.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-full px-6 py-5 font-['Manrope',sans-serif] font-bold text-[18px] text-white leading-[28px] text-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
              style={{ backgroundImage: "linear-gradient(135deg, rgb(23, 68, 19) 0%, rgb(47, 92, 40) 100%)" }}
            >
              Daftar Sekarang
            </button>

            {/* Footer Link */}
            <div className="text-center pt-4">
              <span className="font-['Inter',sans-serif] text-[16px] text-[#41493e] leading-[24px]">
                Sudah punya akun?{" "}
              </span>
              <Link 
                to="/login" 
                className="font-['Inter',sans-serif] font-semibold text-[16px] text-[#174413] leading-[24px] hover:underline"
              >
                Masuk ke Sini
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}