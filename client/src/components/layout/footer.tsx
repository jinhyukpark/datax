import { Link } from "wouter";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer>
      {/* ── Top section: light background ── */}
      <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-8 py-10">
          <div className="grid grid-cols-2 gap-16 max-w-2xl">
            {/* Left: Logo + description */}
            <div className="space-y-3">
              <Logo />
              <p className="text-sm text-muted-foreground leading-relaxed">
                산업용 데이터 API 및 자율 에이전트를 위한 프리미엄<br />
                마켓플레이스. 기업과 데이터 리소스를 연결합니다.
              </p>
            </div>

            {/* Right: Platform links */}
            <div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-3">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/data-map" className="hover:text-primary transition-colors">Data Map</Link></li>
                <li><Link href="/platforms" className="hover:text-primary transition-colors">Platforms</Link></li>
                <li><Link href="/news" className="hover:text-primary transition-colors">News</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/advertise" className="hover:text-primary transition-colors">Advertise</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

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
            상주주소: 경기도 고양시 덕양구 정발산로 180, 제5동 베르메르-빌딩(정발동)&nbsp;&nbsp;|&nbsp;&nbsp;대표 070-4441-4580&nbsp;&nbsp;|&nbsp;&nbsp;help@illunex.com&nbsp;&nbsp;|&nbsp;&nbsp;국내 적용처&nbsp;&nbsp;|&nbsp;&nbsp;사업자등록번호 936-88-02029&nbsp;&nbsp;|&nbsp;&nbsp;통신판매 제2024-고양덕양구-2798호
          </p>

          {/* Copyright */}
          <p className="text-xs text-slate-500">Copyright 2025 illunex. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
