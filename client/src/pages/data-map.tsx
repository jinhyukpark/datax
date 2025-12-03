import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Database, Bot, FileSpreadsheet, Zap, Globe, Cpu, BarChart3, Truck, Factory, DollarSign, Cloud, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

// Updated Bold Style Helpers
const getCategoryStyles = (category: string) => {
  const styles: Record<string, { header: string, border: string, icon: string }> = {
    "AI Assistant": { 
      header: "bg-blue-600 dark:bg-blue-700", 
      border: "border-blue-600/30 dark:border-blue-500/30",
      icon: "text-blue-100" 
    },
    "Customer Service": { 
      header: "bg-purple-600 dark:bg-purple-700", 
      border: "border-purple-600/30 dark:border-purple-500/30",
      icon: "text-purple-100"
    },
    "Manufacturing": { 
      header: "bg-orange-600 dark:bg-orange-700", 
      border: "border-orange-600/30 dark:border-orange-500/30",
      icon: "text-orange-100"
    },
    "AI/ML": { 
      header: "bg-indigo-600 dark:bg-indigo-700", 
      border: "border-indigo-600/30 dark:border-indigo-500/30",
      icon: "text-indigo-100"
    },
    "Analytics": { 
      header: "bg-pink-600 dark:bg-pink-700", 
      border: "border-pink-600/30 dark:border-pink-500/30",
      icon: "text-pink-100"
    },
    "Finance": { 
      header: "bg-emerald-600 dark:bg-emerald-700", 
      border: "border-emerald-600/30 dark:border-emerald-500/30",
      icon: "text-emerald-100"
    },
    "Financial Services": { 
      header: "bg-teal-600 dark:bg-teal-700", 
      border: "border-teal-600/30 dark:border-teal-500/30",
      icon: "text-teal-100"
    },
    "Operations": { 
      header: "bg-cyan-600 dark:bg-cyan-700", 
      border: "border-cyan-600/30 dark:border-cyan-500/30",
      icon: "text-cyan-100"
    },
    "Transport": { 
      header: "bg-sky-600 dark:bg-sky-700", 
      border: "border-sky-600/30 dark:border-sky-500/30",
      icon: "text-sky-100"
    },
    "Weather": { 
      header: "bg-yellow-600 dark:bg-yellow-700", 
      border: "border-yellow-600/30 dark:border-yellow-500/30",
      icon: "text-yellow-100"
    },
    "Artificial Intelligence": { 
      header: "bg-violet-600 dark:bg-violet-700", 
      border: "border-violet-600/30 dark:border-violet-500/30",
      icon: "text-violet-100"
    },
    "Industrial IoT": { 
      header: "bg-slate-700 dark:bg-slate-800", 
      border: "border-slate-600/30 dark:border-slate-500/30",
      icon: "text-slate-100"
    },
  };
  return styles[category] || { 
    header: "bg-slate-700 dark:bg-slate-800", 
    border: "border-slate-600/30 dark:border-slate-500/30", 
    icon: "text-slate-100" 
  };
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "AI Assistant": return Bot;
    case "Customer Service": return Zap;
    case "Manufacturing": return Factory;
    case "AI/ML": return Cpu;
    case "Analytics": return BarChart3;
    case "Finance": return DollarSign;
    case "Financial Services": return DollarSign;
    case "Operations": return Cloud;
    case "Transport": return Truck;
    case "Transportation": return Truck;
    case "Weather": return Cloud;
    default: return Database;
  }
};

export default function DataMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { language, t } = useLanguage();

  const filteredResources = RESOURCES.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? r.type.toLowerCase() === selectedType.toLowerCase() : true;
    return matchesSearch && matchesType;
  });

  const groupedResources = filteredResources.reduce((acc, resource) => {
    const category = resource.tags[0] || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {} as Record<string, typeof filteredResources>);

  const categories = Object.keys(groupedResources);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">{t("Data Map", "데이터 맵")}</h1>
          <p className="mt-2 text-muted-foreground">{t("Explore the comprehensive catalog of industrial data and AI agents.", "산업 데이터 및 AI 에이전트의 포괄적인 카탈로그를 탐색하세요.")}</p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  {t("CATEGORIES", "카테고리")}
                </div>
                <button 
                  onClick={() => setSelectedType(null)}
                  className="text-xs text-primary hover:underline"
                >
                  {t("Deselect All", "전체 선택 해제")}
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['API', 'Agent', 'Dataset'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(selectedType === type ? null : type)}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                      selectedType === type 
                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-px bg-slate-200 dark:bg-slate-800 self-stretch hidden md:block" />

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <span>$</span> {t("PRICING", "가격")}
              </div>
              <div className="flex flex-wrap gap-2">
                {['Free', 'Paid', 'Freemium'].map(price => (
                  <button
                    key={price}
                    className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Grid - Category Cards */}
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4 space-y-6">
          {categories.map(category => {
            const styles = getCategoryStyles(category);
            const Icon = getCategoryIcon(category);
            
            return (
              <div key={category} className={`break-inside-avoid mb-6 rounded-xl border bg-white shadow-sm overflow-hidden transition-all hover:shadow-md dark:bg-slate-900 ${styles.border}`}>
                {/* Bold Header */}
                <div className={`px-4 py-3 flex items-center justify-between ${styles.header}`}>
                  <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${styles.icon}`} />
                    {category}
                  </h3>
                  <span className="text-xs font-medium text-white/80 bg-black/20 px-2 py-0.5 rounded-full">
                    {groupedResources[category].length}
                  </span>
                </div>
                
                {/* List Items */}
                <div className="p-2 flex flex-col gap-1">
                  {groupedResources[category].map(resource => (
                    <Link key={resource.id} href={`/resource/${resource.id}`}>
                      <a className="group flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Icon based on type */}
                          {resource.type === 'API' && <Database className="h-4 w-4 shrink-0 text-blue-500" />}
                          {resource.type === 'Agent' && <Bot className="h-4 w-4 shrink-0 text-purple-500" />}
                          {resource.type === 'Dataset' && <FileSpreadsheet className="h-4 w-4 shrink-0 text-green-500" />}
                          
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate group-hover:text-primary">
                            {language === '한국어' && resource.titleKo ? resource.titleKo : resource.title}
                          </span>
                        </div>
                        
                        {/* Arrow appears on hover */}
                        <ArrowRight className="h-3 w-3 text-slate-400 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </a>
                    </Link>
                  ))}
                  
                  <button className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-slate-50 hover:text-foreground dark:hover:bg-slate-800 transition-colors">
                    {t("View all", "전체 보기")} {groupedResources[category].length} {t("items", "항목")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">{t("No resources found matching your criteria.", "조건에 맞는 리소스가 없습니다.")}</p>
              <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedType(null);}}>{t("Clear all filters", "모든 필터 지우기")}</Button>
            </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
