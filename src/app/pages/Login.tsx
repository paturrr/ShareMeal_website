import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import svgPaths from "../../imports/svg-tdywmsvgrt";
import imgBackground from "figma:asset/ee94f8f13d6e475e3ecfb4e393cd2db969689772.png";
import imgUser1 from "figma:asset/f79ebe08cb9e28b280a13ac6e064290b2f293399.png";
import imgUser2 from "figma:asset/c0ce498cb8126cb73c86f93c431340286849b391.png";
import imgUser3 from "figma:asset/02fd3d3ef765c9baed2589fa3568329886920c62.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("consumer");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      toast.success("Login berhasil!");
      
      // Redirect based on user type
      switch (userType) {
        case "consumer":
          navigate("/consumer");
          break;
        case "mitra":
          navigate("/mitra");
          break;
        case "lembaga":
          navigate("/lembaga");
          break;
        case "admin":
          navigate("/admin");
          break;
      }
    } else {
      toast.error("Email dan password harus diisi");
    }
  };

  return (
    <div className="bg-[#f9f9f8] min-h-screen flex flex-col items-start relative">
      {/* Main Content */}
      <div className="flex w-full min-h-screen">
        {/* Visual Column (Left Side) */}
        <div className="bg-[#174413] flex-1 min-w-0 overflow-hidden relative hidden lg:flex items-start justify-center">
          {/* Background Image */}
          <div className="absolute inset-0 mix-blend-multiply opacity-80">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img 
                alt="" 
                className="absolute h-full left-[-30%] max-w-none top-0 w-[160%]" 
                src={imgBackground} 
              />
            </div>
          </div>

          {/* Decorative Overlay */}
          <div className="absolute bottom-0 right-0 w-[240px] h-[240px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 240 240">
              <g opacity="0.2">
                <path d={svgPaths.p3f951880} fill="#191C1C" />
              </g>
            </svg>
          </div>

          {/* Content */}
          <div className="flex-1 h-full flex flex-col items-start justify-between p-16 relative z-10">
            {/* Top Content */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col w-full">
                <h1 className="text-[48px] font-['Manrope',sans-serif] font-extrabold text-[#bcf0ae] leading-[60px] tracking-[-1.2px]">
                  ShareMeal
                </h1>
              </div>
              <div className="flex flex-col max-w-[448px] opacity-90">
                <p className="text-[18px] font-['Inter',sans-serif] font-medium text-white leading-[28px]">
                  Cultivating a zero-waste future through the art of surplus distribution.
                </p>
              </div>
            </div>

            {/* Bottom Card */}
            <div className="backdrop-blur-[10px] bg-[rgba(249,249,248,0.8)] flex flex-col gap-[14.8px] max-w-[448px] p-8 rounded-2xl border border-[rgba(255,255,255,0.1)]">
              {/* The Living Pantry Section */}
              <div className="flex items-center gap-4">
                <div className="w-[21.24px] h-[21.24px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.2443 21.2404">
                    <path d={svgPaths.p3f7ba400} fill="#174413" />
                  </svg>
                </div>
                <h2 className="text-[20px] font-['Manrope',sans-serif] font-bold text-[#174413] leading-[28px]">
                  The Living Pantry
                </h2>
              </div>

              <p className="text-[14px] font-['Inter',sans-serif] text-[#41493e] leading-[22.75px]">
                Join thousands of community members turning food surplus into shared nourishment. Simple, sustainable, and purely impactful.
              </p>

              {/* User Avatars */}
              <div className="flex items-center gap-2 pt-2">
                <div className="flex items-center pr-3">
                  <div className="relative rounded-full size-8 mr-[-12px]">
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser1} />
                    </div>
                    <div className="absolute border-2 border-[#f9f9f8] inset-0 rounded-full" />
                  </div>
                  <div className="relative rounded-full size-8 mr-[-12px]">
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser2} />
                    </div>
                    <div className="absolute border-2 border-[#f9f9f8] inset-0 rounded-full" />
                  </div>
                  <div className="relative rounded-full size-8 mr-[-12px]">
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgUser3} />
                    </div>
                    <div className="absolute border-2 border-[#f9f9f8] inset-0 rounded-full" />
                  </div>
                </div>
                <div className="pl-2">
                  <p className="text-[12px] font-['Inter',sans-serif] font-semibold text-[#174413] tracking-[0.6px] uppercase leading-[16px]">
                    Bergabung Bersama Kami
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Column (Right Side) */}
        <div className="bg-[#f9f9f8] flex-1 min-w-0 flex items-center justify-center">
          <div className="w-full max-w-[580px] px-6 py-8 lg:px-16 lg:py-10">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-6">
              <h2 className="text-[32px] font-['Manrope',sans-serif] font-bold text-[#191c1c] leading-[38px] tracking-[-0.9px]">
                Selamat Datang
              </h2>
              <p className="text-[15px] font-['Inter',sans-serif] text-[#41493e] leading-[22px]">
                Silakan masuk untuk melanjutkan perjalanan keberlanjutan Anda.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {/* User Type Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-['Inter',sans-serif] font-semibold text-[#191c1c] tracking-[0.35px] leading-[18px]">
                  Tipe Pengguna
                </label>
                <div className="relative">
                  <select
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full bg-[#e7e8e7] rounded-xl px-11 py-3.5 text-[15px] font-['Inter',sans-serif] text-[#191c1c] appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#174413]"
                  >
                    <option value="consumer">Konsumen</option>
                    <option value="mitra">Mitra</option>
                    <option value="lembaga">Lembaga Sosial</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717a6d]">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0 1c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-['Inter',sans-serif] font-semibold text-[#191c1c] tracking-[0.35px] leading-[18px]">
                  Alamat Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#e7e8e7] rounded-xl pl-11 pr-4 py-3.5 text-[15px] font-['Inter',sans-serif] text-[#191c1c] placeholder:text-[#717a6d] outline-none focus:ring-2 focus:ring-[#174413]"
                    required
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-[15px] h-3 text-[#717a6d]" />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-['Inter',sans-serif] font-semibold text-[#191c1c] tracking-[0.35px] leading-[18px]">
                    Kata Sandi
                  </label>
                  <Link to="#" className="text-[11px] font-['Inter',sans-serif] font-semibold text-[#174413] tracking-[0.5px] uppercase leading-[14px] hover:underline">
                    Lupa Kata Sandi?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#e7e8e7] rounded-xl pl-11 pr-12 py-3.5 text-[15px] font-['Inter',sans-serif] text-[#191c1c] placeholder:text-[#717a6d] outline-none focus:ring-2 focus:ring-[#174413]"
                    required
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-3 h-[15.75px] text-[#717a6d]" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#717a6d] hover:text-[#174413]"
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18.33px] h-[12.5px]" />
                    ) : (
                      <Eye className="w-[18.33px] h-[12.5px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center mt-1">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-md border border-[#c0c9bb] bg-white cursor-pointer"
                />
                <label 
                  htmlFor="remember"
                  className="ml-2.5 text-[13px] font-['Inter',sans-serif] font-medium text-[#41493e] leading-[18px] cursor-pointer"
                >
                  Ingat Saya
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl px-6 py-3.5 text-[16px] font-['Inter',sans-serif] font-semibold text-white leading-[24px] text-center shadow-[0px_10px_15px_-3px_rgba(23,68,19,0.1),0px_4px_6px_-4px_rgba(23,68,19,0.1)] mt-2"
                style={{ backgroundImage: "linear-gradient(135deg, rgb(23, 68, 19) 0%, rgb(47, 92, 40) 100%)" }}
              >
                Masuk
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center justify-center py-5 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex-1 h-px border-t border-[#c0c9bb] opacity-30" />
              </div>
              <div className="bg-[#f9f9f8] px-4 relative z-10">
                <p className="text-[11px] font-['Inter',sans-serif] font-semibold text-[#717a6d] tracking-[2.2px] uppercase leading-[14px]">
                  Atau Masuk Dengan
                </p>
              </div>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* Google Button */}
              <button className="bg-white border border-[rgba(192,201,187,0.2)] rounded-xl px-4 py-3 flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-colors">
                <div className="w-5 h-5">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p29ad9380} fill="#4285F4" />
                    <path d={svgPaths.p73c0a80} fill="#34A853" />
                    <path d={svgPaths.p15c0f980} fill="#FBBC05" />
                    <path d={svgPaths.p3d0b3f00} fill="#EA4335" />
                  </svg>
                </div>
                <span className="text-[13px] font-['Inter',sans-serif] font-semibold text-[#191c1c] leading-[18px]">
                  Google
                </span>
              </button>

              {/* Apple Button */}
              <button className="bg-white border border-[rgba(192,201,187,0.2)] rounded-xl px-4 py-3 flex items-center justify-center gap-2.5 hover:bg-gray-50 transition-colors">
                <div className="w-5 h-5">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <g clipPath="url(#clip0_apple)">
                      <path d={svgPaths.p15b6240} fill="#191C1C" />
                    </g>
                    <defs>
                      <clipPath id="clip0_apple">
                        <rect fill="white" height="20" width="20" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="text-[13px] font-['Inter',sans-serif] font-semibold text-[#191c1c] leading-[18px]">
                  Apple
                </span>
              </button>
            </div>

            {/* Footer Text */}
            <div className="text-center pt-4">
              <span className="text-[15px] font-['Inter',sans-serif] font-medium text-[#41493e] leading-[22px]">
                Belum punya akun?{" "}
              </span>
              <Link 
                to="/register" 
                className="text-[15px] font-['Inter',sans-serif] font-semibold text-[#174413] leading-[22px] hover:underline"
              >
                Daftar sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global Visual Anchor (Bottom Left) */}
      <div className="hidden lg:flex absolute bottom-8 left-8 items-center gap-2 opacity-60">
        <div className="w-[11.667px] h-[11.667px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p6b57380} fill="#BCF0AE" />
          </svg>
        </div>
        <p className="text-[12px] font-['Manrope',sans-serif] font-semibold text-[#bcf0ae] tracking-[1.2px] uppercase leading-[16px]">
          2024 ShareMeal. Cultivating a zero-waste future.
        </p>
      </div>
    </div>
  );
}