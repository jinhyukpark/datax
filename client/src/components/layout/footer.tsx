import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer>
      {/* ── Bottom section: dark navy ── */}
      <div className="bg-[#1e2436] dark:bg-slate-950">
        <div className="container mx-auto px-8 py-8 text-center space-y-3">
          {/* Logo */}
          <div className="flex justify-center mb-1">
            <Logo light />
          </div>

          {/* Policy links */}
          <div className="flex items-center justify-center text-xs">
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-0.5">개인정보 이용약관</a>
            <span className="text-slate-600">|</span>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-0.5">서비스 이용약관</a>
            <span className="text-slate-600">|</span>
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-0.5">환불정책</a>
          </div>

          {/* Company info */}
          <p className="text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto">
            (주)일루넥스 | 경기도 고양시 덕양구 향기로 180, 10층 에프1005호~1012호(향동동) | 문의 070-4441-4580 / help@illunex.com | 대표 박진혁 | 사업자등록번호 638-88-01059 | 통신판매업 제2024-고양덕양구-2786호
          </p>

          {/* Copyright */}
          <p className="text-xs text-slate-500">Copyright© 2025 illunex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
