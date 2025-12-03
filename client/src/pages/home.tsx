import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sparkles, Database, Cpu } from "lucide-react";
import { RESOURCES } from "@/lib/data";
import { ResourceCard } from "@/components/ui/resource-card";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/hero_background_with_connecting_data_streams.png";

import { useLanguage } from "@/lib/language-context";

export default function Home() {
  // Get top 8 newest resources
  const featuredResources = RESOURCES.slice(0, 8);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans dark:bg-slate-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 lg:pt-32 lg:pb-20">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-white/90 dark:bg-slate-950/90" />
          <img 
            src={heroBg} 
            alt="Background" 
            className="h-full w-full object-cover opacity-20 blur-xs"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-50 dark:to-slate-950" />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto mb-6 inline-flex items-center rounded-full border bg-white/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm dark:bg-slate-900/50">
            <Sparkles className="mr-2 h-3 w-3 text-accent" />
            <span className="font-medium text-foreground">
              {t("27 new resources added this week", "이번 주 27개의 새로운 리소스가 추가되었습니다")}
            </span>
          </div>
          
          <h1 className="mx-auto mb-6 max-w-4xl font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {t("Industrial Data APIs &", "산업 데이터 API 및")} <br className="hidden sm:block" />
            <span className="text-gradient">{t("AI Agents Marketplace", "AI 에이전트 마켓플레이스")}</span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {t(
              "Discover, connect, and manage premium data APIs and autonomous agents from public institutions and private enterprises.",
              "공공 기관 및 민간 기업의 프리미엄 데이터 API 및 자율 에이전트를 발견, 연결 및 관리하십시오."
            )}
          </p>

          {/* Search Bar */}
          <div className="mx-auto max-w-2xl">
            <div className="relative flex items-center rounded-2xl bg-white p-2 shadow-lg ring-1 ring-slate-200/50 dark:bg-slate-900 dark:ring-slate-800">
              <Search className="ml-4 h-5 w-5 text-muted-foreground shrink-0" />
              <Input 
                type="text" 
                placeholder={t("Search for APIs, agents, or providers...", "API, 에이전트 또는 제공자 검색...")}
                className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base h-12 px-4 placeholder:text-muted-foreground/70"
              />
              <Button size="lg" className="rounded-xl px-8 shrink-0 h-12">
                {t("Search", "검색")}
              </Button>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/data-map?type=all">
              <Button variant="secondary" className="rounded-full px-6">{t("All Resources", "모든 리소스")}</Button>
            </Link>
            <Link href="/data-map?type=api">
              <Button variant="outline" className="rounded-full px-6 gap-2">
                <Database className="h-4 w-4" /> {t("Data APIs", "데이터 API")}
              </Button>
            </Link>
            <Link href="/data-map?type=agent">
              <Button variant="outline" className="rounded-full px-6 gap-2">
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
