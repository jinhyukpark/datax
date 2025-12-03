import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES, PROVIDER_DESCRIPTIONS, PROVIDER_TAGLINES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, Calendar, MapPin, Globe, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { useState } from "react";

import { useLanguage } from "@/lib/language-context";

const gradients = [
  "bg-gradient-to-br from-purple-500 to-pink-500",
  "bg-gradient-to-br from-blue-500 to-cyan-500",
  "bg-gradient-to-br from-orange-500 to-red-500",
  "bg-gradient-to-br from-emerald-500 to-teal-500",
  "bg-gradient-to-br from-indigo-500 to-purple-600",
  "bg-gradient-to-br from-rose-500 to-pink-600",
];

interface ProviderStats {
  provider: string;
  totalViews: number;
  resourceCount: number;
  categories: string[];
}

function PlatformCard({ stats, index }: { stats: ProviderStats; index: number }) {
  const gradient = gradients[index % gradients.length];
  const { t } = useLanguage();
  
  const description = PROVIDER_DESCRIPTIONS[stats.provider] || 
    `A trusted provider of high-quality data resources. ${stats.provider} is committed to delivering reliable, scalable solutions.`;
  
  const tagline = PROVIDER_TAGLINES[stats.provider] || "Enterprise Data Solutions";

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Top Gradient Section */}
      <div className={cn("relative h-32 p-6 text-white", gradient)}>
        <div className="flex items-start justify-between">
          <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 backdrop-blur-sm">
            {stats.categories[0] || "Technology"}
          </Badge>
          <div className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 text-xs backdrop-blur-sm font-medium">
            <Eye className="h-3 w-3" />
            {stats.totalViews > 1000 ? `${(stats.totalViews / 1000).toFixed(1)}k` : stats.totalViews}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative">
        {/* Logo (Overlapping) */}
        <div className="absolute -top-10 left-6 h-20 w-20 rounded-xl bg-white shadow-md p-1 flex items-center justify-center border border-slate-100 dark:bg-slate-800 dark:border-slate-700">
           <div className="h-full w-full rounded-lg bg-slate-50 flex items-center justify-center dark:bg-slate-900">
             <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-heading">
               {stats.provider.charAt(0)}
             </span>
           </div>
        </div>

        <div className="pt-12">
          <Link href={`/publisher/${encodeURIComponent(stats.provider)}`}>
            <a className="block mb-1">
              <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-indigo-600 transition-colors">
                {stats.provider}
              </h3>
            </a>
          </Link>
          
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            {tagline}
          </p>
          
          <p className="mb-6 line-clamp-3 text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {stats.categories.slice(0, 3).map(cat => (
              <Badge key={cat} variant="secondary" className="text-xs font-normal bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {cat}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-slate-100 dark:border-slate-800 pt-4 mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                {stats.resourceCount} Resources
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                HQ
              </div>
            </div>
            
            <Link href={`/publisher/${encodeURIComponent(stats.provider)}`}>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20">
                View Profile <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Platforms() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useLanguage();

  // Get unique categories from resources
  const categories = Array.from(new Set(RESOURCES.map(r => r.tags[0])));
  
  // Group resources by provider to calculate stats
  const providerStatsMap = new Map<string, ProviderStats>();
  
  RESOURCES.forEach(resource => {
    if (!providerStatsMap.has(resource.provider)) {
      providerStatsMap.set(resource.provider, {
        provider: resource.provider,
        totalViews: 0,
        resourceCount: 0,
        categories: []
      });
    }
    
    const stats = providerStatsMap.get(resource.provider)!;
    stats.totalViews += resource.views;
    stats.resourceCount += 1;
    // Add tags as categories if not present
    resource.tags.forEach(tag => {
      if (!stats.categories.includes(tag)) {
        stats.categories.push(tag);
      }
    });
  });

  const allProviders = Array.from(providerStatsMap.values());

  // Filter providers based on selection
  const filteredProviders = selectedCategory 
    ? allProviders.filter(p => p.categories.includes(selectedCategory))
    : allProviders;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">{t("Platforms", "플랫폼")}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("Discover the organizations powering the next generation of industrial data and AI", "차세대 산업 데이터와 AI를 주도하는 조직을 발견하세요")}
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              selectedCategory === null
                ? "bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            )}
          >
            {t("All Platforms", "모든 플랫폼")}
          </button>
          
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                selectedCategory === category
                  ? "bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map((stats, index) => (
            <PlatformCard key={stats.provider} stats={stats} index={index} />
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">{t("No platforms found for this category.", "이 카테고리에 대한 플랫폼을 찾을 수 없습니다.")}</p>
            <Button variant="link" onClick={() => setSelectedCategory(null)}>{t("Clear filter", "필터 지우기")}</Button>
          </div>
        )}
        
        <div className="mt-20 rounded-2xl bg-linear-to-br from-indigo-50 to-purple-50 p-12 text-center dark:from-indigo-950/30 dark:to-purple-950/30">
           <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{t("Are you a Data Provider?", "데이터 제공자이신가요?")}</h2>
           <p className="text-muted-foreground max-w-xl mx-auto mb-8">
             {t("Join our network of verified institutions and showcase your data APIs to thousands of developers", "검증된 기관 네트워크에 참여하여 수천 명의 개발자에게 데이터 API를 선보이세요")}
           </p>
           <Link href="/submit">
             <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
               {t("Become a Partner", "파트너 되기")}
             </Button>
           </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
