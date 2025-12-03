import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sparkles, Database, Cpu, Activity, Shield, Key } from "lucide-react";
import { RESOURCES } from "@/lib/data";
import { ResourceCard } from "@/components/ui/resource-card";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/hero_background_with_connecting_data_streams.png";
import floatingHeroBg from "@assets/generated_images/abstract_3d_isometric_data_flow_visualization_with_floating_cubes_and_connecting_lines_in_blue_and_purple_gradients_on_white.png";

import { useLanguage } from "@/lib/language-context";

export default function Home() {
  // Get top 8 newest resources
  const featuredResources = RESOURCES.slice(0, 8);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white/80 dark:bg-slate-950/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-slate-50/80 dark:via-slate-950/50 dark:to-slate-950" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808025_1px,transparent_1px),linear-gradient(to_bottom,#80808025_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto mb-8 inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50/80 px-6 py-2 text-sm font-semibold text-indigo-800 shadow-lg shadow-indigo-500/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-indigo-500/20 dark:border-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-100 cursor-default">
            <Sparkles className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600/20" />
            <span className="font-medium">
              {t("27 new resources added this week", "이번 주 27개의 새로운 리소스가 추가되었습니다")}
            </span>
          </div>
          
          <h1 className="mx-auto mb-6 max-w-4xl font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl drop-shadow-sm text-balance">
            {t("Expansion of Industrial Data", "산업데이터의 확장")} <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t("AI Agent Marketplace", "AI 에이전트 마켓 플레이스")}
            </span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl leading-relaxed text-balance">
            {t(
              "Discover, connect, and manage premium data APIs and autonomous agents from public institutions and private enterprises.",
              "공공 기관 및 민간 기업의 프리미엄 데이터 API 및 자율 에이전트를 발견, 연결 및 관리하십시오."
            )}
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl relative z-10">
            <div className="relative rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[3px] shadow-2xl shadow-indigo-500/20 transform transition-transform hover:scale-[1.01]">
              <div className="relative flex items-center rounded-[13px] bg-white p-2 dark:bg-slate-900">
                <Search className="ml-4 h-5 w-5 text-slate-400 shrink-0" />
                <Input 
                  type="text" 
                  placeholder={t("Search for APIs, agents, or providers...", "API, 에이전트 또는 제공자 검색...")}
                  className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-14 px-4 placeholder:text-slate-400"
                />
                <Button size="lg" className="rounded-xl px-8 shrink-0 h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50">
                  {t("Search", "검색")}
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Link href="/data-map?type=all">
              <Button variant="secondary" className="rounded-full px-6 h-10 bg-white shadow-sm hover:bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">{t("All Resources", "모든 리소스")}</Button>
            </Link>
            <Link href="/data-map?type=api">
              <Button variant="outline" className="rounded-full px-6 h-10 gap-2 border-slate-200 bg-white/50 hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:hover:bg-slate-800">
                <Database className="h-4 w-4" /> {t("Data APIs", "데이터 API")}
              </Button>
            </Link>
            <Link href="/data-map?type=agent">
              <Button variant="outline" className="rounded-full px-6 h-10 gap-2 border-slate-200 bg-white/50 hover:bg-white hover:border-purple-200 hover:text-purple-600 transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:hover:bg-slate-800">
                <Cpu className="h-4 w-4" /> {t("AI Agents", "AI 에이전트")}
              </Button>
            </Link>
          </div>
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
