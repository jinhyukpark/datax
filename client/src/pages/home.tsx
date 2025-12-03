import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Database, Cpu, CheckCircle } from "lucide-react";
import { RESOURCES } from "@/lib/data";
import { ResourceCard } from "@/components/ui/resource-card";
import { Link } from "wouter";
import heroDashboardImg from "@assets/generated_images/modern_data_analytics_dashboard_ui.png";

import { useLanguage } from "@/lib/language-context";

export default function Home() {
  // Get top 8 newest resources
  const featuredResources = RESOURCES.slice(0, 8);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#8B5CF6] pt-20 pb-32 lg:pt-32 lg:pb-48">
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <div className="max-w-2xl text-left">
              <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
                {t("Centralize Data, Then", "데이터를 중앙화하고,")} <br />
                {t("Monitor, Share & Take", "모니터링하고, 공유하며")} <br />
                {t("Action, Faster", "더 빠르게 실행하세요")}
              </h1>
              
              <p className="mb-8 text-lg text-purple-100 leading-relaxed max-w-xl">
                {t(
                  "Discover, connect, and manage premium data APIs and autonomous agents from public institutions and private enterprises. Transform data chaos into a competitive advantage.",
                  "공공 기관 및 민간 기업의 프리미엄 데이터 API 및 자율 에이전트를 발견, 연결 및 관리하십시오. 데이터 혼란을 경쟁 우위로 전환하세요."
                )}
              </p>

              {/* Search Bar - Integrated into new design */}
              <div className="relative max-w-lg mb-8">
                <div className="relative flex items-center rounded-lg bg-white p-1 shadow-lg">
                  <Search className="ml-3 h-5 w-5 text-slate-400 shrink-0" />
                  <Input 
                    type="text" 
                    placeholder={t("Search for APIs, agents...", "API, 에이전트 검색...")}
                    className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12 px-3 placeholder:text-slate-400"
                  />
                  <Button size="lg" className="rounded-md px-6 h-10 bg-blue-500 hover:bg-blue-600 text-white font-medium">
                    {t("Search", "검색")}
                  </Button>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-purple-100 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Unlimited users</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Secure Protocols</span>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={heroDashboardImg} 
                  alt="Dashboard Preview" 
                  className="w-full rounded-lg shadow-inner"
                />
                {/* Floating badge example */}
                <div className="absolute top-6 left-6 bg-white rounded-lg p-3 shadow-lg animate-float-slow">
                  <div className="text-xs text-gray-500 font-medium">Growth</div>
                  <div className="text-lg font-bold text-green-600">+24.5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curved Bottom Shape */}
        <div className="absolute bottom-0 left-0 right-0">
           <svg viewBox="0 0 1440 120" className="w-full h-[60px] sm:h-[100px] fill-slate-50/50 dark:fill-slate-950 block" preserveAspectRatio="none">
             <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,60 L1440,120 L0,120 Z"></path>
           </svg>
        </div>
      </section>

      {/* Quick Categories - Moved below hero */}
      <section className="container mx-auto px-4 -mt-8 relative z-10 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/data-map?type=all">
            <Button variant="secondary" className="rounded-full px-6 h-12 bg-white shadow-lg hover:bg-slate-50 border border-slate-100 text-slate-700 font-medium dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">{t("All Resources", "모든 리소스")}</Button>
          </Link>
          <Link href="/data-map?type=api">
            <Button variant="outline" className="rounded-full px-6 h-12 gap-2 border-slate-200 bg-white/90 shadow-md hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:hover:bg-slate-800">
              <Database className="h-4 w-4" /> {t("Data APIs", "데이터 API")}
            </Button>
          </Link>
          <Link href="/data-map?type=agent">
            <Button variant="outline" className="rounded-full px-6 h-12 gap-2 border-slate-200 bg-white/90 shadow-md hover:bg-white hover:border-purple-200 hover:text-purple-600 transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:hover:bg-slate-800">
              <Cpu className="h-4 w-4" /> {t("AI Agents", "AI 에이전트")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Resources Grid */}
      <section className="container mx-auto px-4 pt-4 pb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-foreground">{t("Featured Resources", "추천 리소스")}</h2>
          <div className="flex items-center gap-2">
            <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs">
              <option>{t("Newest", "최신순")}</option>
              <option>{t("Popular", "인기순")}</option>
              <option>{t("Trending", "트렌딩")}</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/data-map">
            <Button variant="outline" size="lg" className="gap-2">
              {t("View All Resources", "모든 리소스 보기")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
