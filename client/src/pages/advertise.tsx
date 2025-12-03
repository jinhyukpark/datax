import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Zap, ExternalLink, Eye, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Advertise() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            {t("Make your", "당신의")} <span className="text-gradient">{t("data resource", "데이터 리소스를")}</span> {t("stand out", "돋보이게 만드세요")}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            {t("Showcase your AI tools to thousands of visitors and get more users and growth for your business with premium listings on Data-X.", "Data-X의 프리미엄 리스팅으로 수천 명의 방문자에게 AI 도구를 선보이고 더 많은 사용자와 비즈니스 성장을 달성하세요.")}
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { label: t("Outbound clicks per month", "월간 아웃바운드 클릭 수"), value: "7,000+", icon: ExternalLink },
            { label: t("Page views per month", "월간 페이지 조회수"), value: "60,000", icon: Eye },
            { label: t("Active users per month", "월간 활성 사용자 수"), value: "15,000+", icon: TrendingUp },
          ].map((stat) => (
            <Card key={stat.label} className="flex flex-col items-center p-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="font-heading text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Pricing */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Plan Card */}
          <div className="relative rounded-2xl bg-linear-to-b from-indigo-500 to-purple-600 p-1 shadow-xl">
            <div className="h-full rounded-xl bg-white p-8 dark:bg-slate-900">
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-bold">{t("Premium Listing", "프리미엄 리스팅")}</h3>
                <p className="text-muted-foreground">{t("Maximum visibility package", "최대 노출 패키지")}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-primary">$39</span>
                  <span className="text-muted-foreground">{t("/month", "/월")}</span>
                </div>
              </div>

              <ul className="mb-8 space-y-4">
                {[
                  t("20,000+ guaranteed targeted impressions", "20,000회 이상의 타겟 노출 보장"),
                  t("Featured spot at the top of homepage", "홈페이지 상단 추천 스팟 노출"),
                  t("Top position in your category on Data Map", "데이터 맵 카테고리 내 최상위 노출"),
                  t("Premium highlight on Data Map", "데이터 맵 프리미엄 하이라이트"),
                  t("Premium badge on your listing", "리스팅에 프리미엄 배지 부여"),
                  t("Write your own description", "직접 작성하는 상세 설명")
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-lg font-semibold text-white hover:opacity-90">
                {t("Get Started - $39/month", "시작하기 - $39/월")}
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
             <h3 className="font-heading text-xl font-bold">{t("Preview your Premium Listing", "프리미엄 리스팅 미리보기")}</h3>
             
             <Card className="border-2 border-purple-100 bg-purple-50/50 p-6 dark:border-purple-900/50 dark:bg-purple-900/10">
               <div className="mb-4 flex items-start justify-between">
                 <div className="flex items-center gap-3">
                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-xs">
                     <Zap className="h-6 w-6 text-purple-500" />
                   </div>
                   <div>
                     <h4 className="font-bold text-foreground">AutoGen Multi-Agent Framework</h4>
                     <div className="flex gap-2">
                        <span className="text-xs text-purple-600 font-medium">{t("Premium Partner", "프리미엄 파트너")}</span>
                     </div>
                   </div>
                 </div>
                 <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">{t("FEATURED", "추천")}</span>
               </div>
               <p className="text-sm text-muted-foreground">
                 {t("Microsoft's powerful framework for building conversational AI agents that can collaborate, reason, and execute complex tasks through multi-turn conversations.", "대화형 AI 에이전트를 구축하기 위한 Microsoft의 강력한 프레임워크로, 멀티 턴 대화를 통해 협업하고 추론하며 복잡한 작업을 실행할 수 있습니다.")}
               </p>
             </Card>

             <div className="rounded-xl bg-amber-50 p-6 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/20">
               <div className="flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-500 font-semibold">
                 <Zap className="h-5 w-5" /> {t("Premium Benefits Active", "프리미엄 혜택 적용 중")}
               </div>
               <ul className="space-y-2 text-sm text-amber-800/80 dark:text-amber-200/80">
                 <li>• {t("Featured badge prominently displayed", "추천 배지 눈에 띄게 표시")}</li>
                 <li>• {t("Appears first in search results", "검색 결과 최상단 노출")}</li>
                 <li>• {t("Enhanced visual highlighting", "시각적 하이라이트 강화")}</li>
                 <li>• {t("Priority placement in categories", "카테고리 내 우선 배치")}</li>
               </ul>
             </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
