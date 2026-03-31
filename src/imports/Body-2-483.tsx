import svgPaths from "./svg-kkgai4ntim";
import imgCommunityImpact from "figma:asset/521e369e47eacc72faf4fcfb018ce46b2efbb9f2.png";

function CommunityImpact() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Community impact">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-full left-[-29.77%] max-w-none top-0 w-[159.53%]" src={imgCommunityImpact} />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center" data-name="Container">
      <CommunityImpact />
      <div className="absolute inset-0" data-name="Tonal Overlay" style={{ backgroundImage: "linear-gradient(46.7637deg, rgba(23, 68, 19, 0.6) 0%, rgba(23, 68, 19, 0) 100%)" }} />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[25.488px] relative shrink-0 w-[25.493px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.4932 25.4885">
        <g id="Container">
          <path d={svgPaths.p1e45c380} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white tracking-[-0.75px] w-[157px]">
        <p className="leading-[36px]">ShareMeal</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-white w-full">
        <p className="leading-[60px] mb-0">Bersama Kurangi</p>
        <p className="leading-[60px] mb-0">Limbah, Berbagi</p>
        <p className="leading-[60px]">Berkah.</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[rgba(255,255,255,0.9)] w-full">
        <p className="leading-[29.25px] mb-0">Bergabunglah dengan ekosistem pangan berkelanjutan</p>
        <p className="leading-[29.25px] mb-0">kami. Berikan dampak nyata bagi bumi dan sesama melalui</p>
        <p className="leading-[29.25px]">langkah sederhana menyelamatkan surplus makanan.</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start max-w-[512px] relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-[64.95px]">
        <p className="leading-[36px]">15k+</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[194.3px]">
        <p className="leading-[16px]">Makanan Terselamatkan</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[194.3px]" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] h-[36px] justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-white w-[75.67px]">
        <p className="leading-[36px]">200+</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start opacity-80 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white tracking-[1.2px] uppercase w-[93.14px]">
        <p className="leading-[16px]">Mitra Lokal</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0 w-[93.14px]" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[48px] h-[52px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container10 />
    </div>
  );
}

function ContentOverlay() {
  return (
    <div className="h-full relative shrink-0 w-[463.44px]" data-name="Content Overlay">
      <div className="content-stretch flex flex-col items-start justify-between p-[64px] relative size-full">
        <Container1 />
        <Container4 />
        <Container6 />
      </div>
    </div>
  );
}

function SectionLeftSideVisualImpact() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px overflow-clip relative self-stretch" data-name="Section - Left Side: Visual Impact">
      <Container />
      <ContentOverlay />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Manrope:ExtraBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#174413] text-[30px] w-full">
        <p className="leading-[36px]">Buat Akun Baru</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#41493e] text-[16px] w-full">
        <p className="leading-[24px]">Langkah awal Anda menuju masa depan tanpa limbah.</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Header">
      <Heading1 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137.333 18">
        <g id="Container">
          <path d={svgPaths.p209d4440} fill="var(--fill-0, #174413)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#174413] text-[16px] w-full">
        <p className="leading-[24px]">Mitra</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#41493e] text-[10px] w-full">
        <p className="leading-[12.5px]">Toko atau Restoran</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#edeeed] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#174413] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[22px] relative w-full">
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function LabelMitraCard() {
  return (
    <div className="col-1 content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Label - Mitra Card">
      <BackgroundBorder />
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137.333 16">
        <g id="Container">
          <path d={svgPaths.p85bff00} fill="var(--fill-0, #174413)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#174413] text-[16px] w-full">
        <p className="leading-[24px]">Konsumen</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#41493e] text-[10px] w-full">
        <p className="leading-[12.5px]">Pahlawan Makanan</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#edeeed] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[22px] relative w-full">
        <Container20 />
        <Container21 />
      </div>
    </div>
  );
}

function LabelKonsumenCard() {
  return (
    <div className="col-2 content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Label - Konsumen Card">
      <BackgroundBorder1 />
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[20.5px] relative shrink-0 w-full" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 137.333 20.5">
        <g id="Container">
          <path d={svgPaths.p2897c480} fill="var(--fill-0, #174413)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#174413] text-[16px] w-full">
        <p className="leading-[24px]">Lembaga</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#41493e] text-[10px] w-full">
        <p className="leading-[12.5px]">Organisasi Sosial</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Container26 />
        <Container27 />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-[#edeeed] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[22px] relative w-full">
        <Container24 />
        <Container25 />
      </div>
    </div>
  );
}

function LabelLembagaSosialCard() {
  return (
    <div className="col-3 content-stretch flex flex-col items-start justify-center justify-self-stretch relative row-1 self-start shrink-0" data-name="Label - Lembaga Sosial Card">
      <BackgroundBorder2 />
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_120.50px] relative shrink-0 w-full" data-name="Container">
      <LabelMitraCard />
      <LabelKonsumenCard />
      <LabelLembagaSosialCard />
    </div>
  );
}

function RoleSelectionEditorialAsymmetryCardLayout() {
  return (
    <div className="content-stretch flex flex-col gap-[16.5px] items-start relative shrink-0 w-full" data-name="Role Selection: Editorial Asymmetry Card Layout">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#174413] text-[14px] tracking-[1.4px] uppercase w-[152.61px]">
        <p className="leading-[20px]">Pilih Peran Anda</p>
      </div>
      <Container15 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c0c9bb] text-[16px] w-full">
        <p className="leading-[normal]">John Doe</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[#e7e8e7] content-stretch flex items-start justify-center left-0 overflow-clip px-[20px] py-[18px] right-0 rounded-[12px] top-[24px]" data-name="Input">
      <Container29 />
    </div>
  );
}

function Container28() {
  return (
    <div className="col-1 h-[80px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] left-[4px] not-italic text-[#41493e] text-[12px] top-[7.5px] tracking-[0.6px] uppercase w-[104.94px]">
        <p className="leading-[16px]">Nama Lengkap</p>
      </div>
      <Input />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c0c9bb] text-[16px] w-full">
        <p className="leading-[normal]">email@contoh.com</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute bg-[#e7e8e7] content-stretch flex items-start justify-center left-0 overflow-clip px-[20px] py-[18px] right-0 rounded-[12px] top-[24px]" data-name="Input">
      <Container31 />
    </div>
  );
}

function Container30() {
  return (
    <div className="col-2 h-[80px] justify-self-stretch relative row-1 shrink-0" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] left-[4px] not-italic text-[#41493e] text-[12px] top-[7.5px] tracking-[0.6px] uppercase w-[40.17px]">
        <p className="leading-[16px]">Email</p>
      </div>
      <Input1 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c0c9bb] text-[16px] w-full">
        <p className="leading-[normal]">••••••••</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="absolute bg-[#e7e8e7] content-stretch flex items-start justify-center left-0 overflow-clip px-[20px] py-[18px] right-0 rounded-[12px] top-[24px]" data-name="Input">
      <Container33 />
    </div>
  );
}

function Container32() {
  return (
    <div className="col-1 h-[80px] justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] left-[4px] not-italic text-[#41493e] text-[12px] top-[7.5px] tracking-[0.6px] uppercase w-[78.27px]">
        <p className="leading-[16px]">Kata Sandi</p>
      </div>
      <Input2 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#c0c9bb] text-[16px] w-full">
        <p className="leading-[normal]">••••••••</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="absolute bg-[#e7e8e7] content-stretch flex items-start justify-center left-0 overflow-clip px-[20px] py-[18px] right-0 rounded-[12px] top-[24px]" data-name="Input">
      <Container35 />
    </div>
  );
}

function Container34() {
  return (
    <div className="col-2 h-[80px] justify-self-stretch relative row-2 shrink-0" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] left-[4px] not-italic text-[#41493e] text-[12px] top-[7.5px] tracking-[0.6px] uppercase w-[163.2px]">
        <p className="leading-[16px]">Konfirmasi Kata Sandi</p>
      </div>
      <Input3 />
    </div>
  );
}

function InputFieldsTheGhostBorderRuleAppliedOnFocusViaPrimaryContainerGlow() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__80px_80px] relative shrink-0 w-full" data-name="Input Fields: The Ghost Border Rule applied on focus via primary-container glow">
      <Container28 />
      <Container30 />
      <Container32 />
      <Container34 />
    </div>
  );
}

function InputMargin() {
  return (
    <div className="absolute content-stretch flex flex-col h-[24px] items-start left-[4px] pt-[4px] top-0 w-[20px]" data-name="Input:margin">
      <div className="bg-white relative rounded-[4px] shrink-0 size-[20px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#c0c9bb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[36px] pb-[0.625px] pr-[36.78px] top-[-1.13px]" data-name="Label">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[46px] justify-center leading-[0] not-italic relative shrink-0 text-[#41493e] text-[14px] w-[435.22px]">
        <p className="mb-0">
          <span className="leading-[22.75px]">{`Saya menyetujui `}</span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.75px] not-italic text-[#174413]">{`Syarat & Ketentuan`}</span>
          <span className="leading-[22.75px]">{` serta `}</span>
          <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.75px] not-italic text-[#174413]">Kebijakan Privasi</span>
          <span className="leading-[22.75px]">{` yang`}</span>
        </p>
        <p className="leading-[22.75px]">berlaku di ShareMeal.</p>
      </div>
    </div>
  );
}

function PoliciesCheckbox() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Policies & Checkbox">
      <InputMargin />
      <Label />
    </div>
  );
}

function ButtonRegisterCtaSignatureTextureGradient() {
  return (
    <div className="bg-gradient-to-r content-stretch flex from-[#174413] items-center justify-center py-[20px] relative rounded-[9999px] shrink-0 to-[#2f5c28] w-full" data-name="Button - Register CTA: Signature Texture Gradient">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" data-name="Button - Register CTA: Signature Texture Gradient:shadow" />
      <div className="flex flex-col font-['Manrope:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white w-[141.13px]">
        <p className="leading-[28px]">Daftar Sekarang</p>
      </div>
    </div>
  );
}

function FooterLink() {
  return (
    <div className="content-stretch flex gap-[4px] items-start justify-center leading-[0] not-italic pt-[16px] relative shrink-0 text-[16px] text-center w-full" data-name="Footer Link">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[24px] justify-center relative shrink-0 text-[#41493e] w-[152.7px]">
        <p className="leading-[24px]">{`Sudah punya akun? `}</p>
      </div>
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[24px] justify-center relative shrink-0 text-[#174413] w-[106.48px]">
        <p className="leading-[24px]">Masuk ke Sini</p>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Form">
      <RoleSelectionEditorialAsymmetryCardLayout />
      <InputFieldsTheGhostBorderRuleAppliedOnFocusViaPrimaryContainerGlow />
      <PoliciesCheckbox />
      <ButtonRegisterCtaSignatureTextureGradient />
      <FooterLink />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-start max-w-[576px] min-h-px min-w-px pb-[16px] relative" data-name="Container">
      <Header />
      <Form />
    </div>
  );
}

function SectionRightSideRegistrationForm() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative self-stretch" data-name="Section - Right Side: Registration Form">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[64px] relative size-full">
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function MainShellSuppressionThisIsAFocusedTransactionalJourneyRegisterSoGlobalNavigationIsSuppr() {
  return (
    <div className="content-stretch flex h-[1021px] items-start min-h-[1021px] relative shrink-0 w-full" data-name="Main - Shell Suppression: This is a focused transactional journey (Register), so global navigation is suppr...">
      <SectionLeftSideVisualImpact />
      <SectionRightSideRegistrationForm />
    </div>
  );
}

export default function Body() {
  return (
    <div className="bg-[#f9f9f8] content-stretch flex flex-col items-start relative size-full" data-name="Body">
      <MainShellSuppressionThisIsAFocusedTransactionalJourneyRegisterSoGlobalNavigationIsSuppr />
    </div>
  );
}