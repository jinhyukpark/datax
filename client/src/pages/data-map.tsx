import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Filter, Database, Bot, FileSpreadsheet, Zap, Globe, Cpu, BarChart3, Truck, Factory, DollarSign, Cloud, ArrowRight, X, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const getCategoryStyles = (category: string) => {
  const styles: Record<string, { header: string, border: string, icon: string, accent: string }> = {
    "Analysis": { header: "bg-blue-600 dark:bg-blue-700", border: "border-blue-600/30 dark:border-blue-500/30", icon: "text-blue-100", accent: "bg-blue-600" },
    "Patent": { header: "bg-indigo-600 dark:bg-indigo-700", border: "border-indigo-600/30 dark:border-indigo-500/30", icon: "text-indigo-100", accent: "bg-indigo-600" },
    "Science": { header: "bg-violet-600 dark:bg-violet-700", border: "border-violet-600/30 dark:border-violet-500/30", icon: "text-violet-100", accent: "bg-violet-600" },
    "Growth": { header: "bg-emerald-600 dark:bg-emerald-700", border: "border-emerald-600/30 dark:border-emerald-500/30", icon: "text-emerald-100", accent: "bg-emerald-600" },
    "Consulting": { header: "bg-teal-600 dark:bg-teal-700", border: "border-teal-600/30 dark:border-teal-500/30", icon: "text-teal-100", accent: "bg-teal-600" },
    "Network": { header: "bg-cyan-600 dark:bg-cyan-700", border: "border-cyan-600/30 dark:border-cyan-500/30", icon: "text-cyan-100", accent: "bg-cyan-600" },
    "Ecosystem": { header: "bg-sky-600 dark:bg-sky-700", border: "border-sky-600/30 dark:border-sky-500/30", icon: "text-sky-100", accent: "bg-sky-600" },
    "News": { header: "bg-orange-600 dark:bg-orange-700", border: "border-orange-600/30 dark:border-orange-500/30", icon: "text-orange-100", accent: "bg-orange-600" },
    "Robot": { header: "bg-red-600 dark:bg-red-700", border: "border-red-600/30 dark:border-red-500/30", icon: "text-red-100", accent: "bg-red-600" },
    "Equipment": { header: "bg-amber-600 dark:bg-amber-700", border: "border-amber-600/30 dark:border-amber-500/30", icon: "text-amber-100", accent: "bg-amber-600" },
    "Startup": { header: "bg-lime-600 dark:bg-lime-700", border: "border-lime-600/30 dark:border-lime-500/30", icon: "text-lime-100", accent: "bg-lime-600" },
    "Investment": { header: "bg-green-600 dark:bg-green-700", border: "border-green-600/30 dark:border-green-500/30", icon: "text-green-100", accent: "bg-green-600" },
    "Innovation": { header: "bg-fuchsia-600 dark:bg-fuchsia-700", border: "border-fuchsia-600/30 dark:border-fuchsia-500/30", icon: "text-fuchsia-100", accent: "bg-fuchsia-600" },
    "Ecommerce": { header: "bg-pink-600 dark:bg-pink-700", border: "border-pink-600/30 dark:border-pink-500/30", icon: "text-pink-100", accent: "bg-pink-600" },
    "Finance": { header: "bg-emerald-600 dark:bg-emerald-700", border: "border-emerald-600/30 dark:border-emerald-500/30", icon: "text-emerald-100", accent: "bg-emerald-600" },
    "M&A": { header: "bg-rose-600 dark:bg-rose-700", border: "border-rose-600/30 dark:border-rose-500/30", icon: "text-rose-100", accent: "bg-rose-600" },
    "Energy": { header: "bg-yellow-600 dark:bg-yellow-700", border: "border-yellow-600/30 dark:border-yellow-500/30", icon: "text-yellow-100", accent: "bg-yellow-600" },
    "Trade": { header: "bg-slate-600 dark:bg-slate-700", border: "border-slate-600/30 dark:border-slate-500/30", icon: "text-slate-100", accent: "bg-slate-600" },
    "Material": { header: "bg-stone-600 dark:bg-stone-700", border: "border-stone-600/30 dark:border-stone-500/30", icon: "text-stone-100", accent: "bg-stone-600" },
    "Industrial": { header: "bg-zinc-600 dark:bg-zinc-700", border: "border-zinc-600/30 dark:border-zinc-500/30", icon: "text-zinc-100", accent: "bg-zinc-600" },
    "Spatial": { header: "bg-neutral-600 dark:bg-neutral-700", border: "border-neutral-600/30 dark:border-neutral-500/30", icon: "text-neutral-100", accent: "bg-neutral-600" },
    "Power": { header: "bg-red-500 dark:bg-red-600", border: "border-red-500/30 dark:border-red-400/30", icon: "text-red-100", accent: "bg-red-500" },
    "R&D": { header: "bg-blue-500 dark:bg-blue-600", border: "border-blue-500/30 dark:border-blue-400/30", icon: "text-blue-100", accent: "bg-blue-500" },
    "Waste": { header: "bg-green-500 dark:bg-green-600", border: "border-green-500/30 dark:border-green-400/30", icon: "text-green-100", accent: "bg-green-500" },
    "Oil": { header: "bg-gray-600 dark:bg-gray-700", border: "border-gray-600/30 dark:border-gray-500/30", icon: "text-gray-100", accent: "bg-gray-600" },
    "AI Assistant": { header: "bg-blue-600 dark:bg-blue-700", border: "border-blue-600/30 dark:border-blue-500/30", icon: "text-blue-100", accent: "bg-blue-600" },
    "Customer Service": { header: "bg-purple-600 dark:bg-purple-700", border: "border-purple-600/30 dark:border-purple-500/30", icon: "text-purple-100", accent: "bg-purple-600" },
    "Manufacturing": { header: "bg-orange-600 dark:bg-orange-700", border: "border-orange-600/30 dark:border-orange-500/30", icon: "text-orange-100", accent: "bg-orange-600" },
    "AI/ML": { header: "bg-indigo-600 dark:bg-indigo-700", border: "border-indigo-600/30 dark:border-indigo-500/30", icon: "text-indigo-100", accent: "bg-indigo-600" },
    "Analytics": { header: "bg-pink-600 dark:bg-pink-700", border: "border-pink-600/30 dark:border-pink-500/30", icon: "text-pink-100", accent: "bg-pink-600" },
    "Financial Services": { header: "bg-teal-600 dark:bg-teal-700", border: "border-teal-600/30 dark:border-teal-500/30", icon: "text-teal-100", accent: "bg-teal-600" },
    "Operations": { header: "bg-cyan-600 dark:bg-cyan-700", border: "border-cyan-600/30 dark:border-cyan-500/30", icon: "text-cyan-100", accent: "bg-cyan-600" },
    "Transport": { header: "bg-sky-600 dark:bg-sky-700", border: "border-sky-600/30 dark:border-sky-500/30", icon: "text-sky-100", accent: "bg-sky-600" },
    "Weather": { header: "bg-yellow-600 dark:bg-yellow-700", border: "border-yellow-600/30 dark:border-yellow-500/30", icon: "text-yellow-100", accent: "bg-yellow-600" },
    "Artificial Intelligence": { header: "bg-violet-600 dark:bg-violet-700", border: "border-violet-600/30 dark:border-violet-500/30", icon: "text-violet-100", accent: "bg-violet-600" },
    "Industrial IoT": { header: "bg-slate-700 dark:bg-slate-800", border: "border-slate-600/30 dark:border-slate-500/30", icon: "text-slate-100", accent: "bg-slate-700" },
  };
  return styles[category] || { header: "bg-slate-700 dark:bg-slate-800", border: "border-slate-600/30 dark:border-slate-500/30", icon: "text-slate-100", accent: "bg-slate-700" };
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

const getTypeIcon = (type: string) => {
  switch (type) {
    case "API": return <Database className="h-5 w-5 text-blue-500" />;
    case "Agent": return <Bot className="h-5 w-5 text-purple-500" />;
    case "Dataset": return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    default: return <Database className="h-5 w-5 text-slate-400" />;
  }
};

const getTypeBadgeStyle = (type: string) => {
  switch (type) {
    case "API": return "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
    case "Agent": return "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";
    case "Dataset": return "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    default: return "bg-slate-50 text-slate-600 border-slate-200";
  }
};

export default function DataMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [modalCategory, setModalCategory] = useState<string | null>(null);
  const [modalSearch, setModalSearch] = useState("");
  const [, navigate] = useLocation();
  const { language, t } = useLanguage();

  const toggleType = (type: string) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const togglePrice = (price: string) => {
    setSelectedPrices(prev => prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]);
  };

  const filteredResources = RESOURCES.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.some(t => t.toLowerCase() === r.type.toLowerCase());
    const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(p => p.toLowerCase() === r.price.toLowerCase());
    return matchesSearch && matchesType && matchesPrice;
  });

  const groupedResources = filteredResources.reduce((acc, resource) => {
    const category = resource.tags[0] || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(resource);
    return acc;
  }, {} as Record<string, typeof filteredResources>);

  const categories = Object.keys(groupedResources);

  const openModal = (category: string) => {
    setModalCategory(category);
    setModalSearch("");
  };

  const closeModal = () => {
    setModalCategory(null);
    setModalSearch("");
  };

  const modalItems = useMemo(() => {
    if (!modalCategory || !groupedResources[modalCategory]) return [];
    const q = modalSearch.toLowerCase();
    if (!q) return groupedResources[modalCategory];
    return groupedResources[modalCategory].filter(r =>
      r.title.toLowerCase().includes(q) ||
      (r.titleKo && r.titleKo.toLowerCase().includes(q)) ||
      r.description.toLowerCase().includes(q) ||
      (r.descriptionKo && r.descriptionKo.toLowerCase().includes(q)) ||
      r.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }, [modalCategory, modalSearch, groupedResources]);

  const modalStyles = modalCategory ? getCategoryStyles(modalCategory) : null;
  const ModalIcon = modalCategory ? getCategoryIcon(modalCategory) : Database;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">{t("Data Map", "데이터 맵")}</h1>
          <p className="mt-2 text-muted-foreground text-balance">{t("Explore the comprehensive catalog of industrial data and AI agents.", "산업 데이터 및 AI 에이전트의 포괄적인 카탈로그를 탐색하세요.")}</p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  {t("CATEGORIES", "카테고리")}
                </div>
                {(selectedTypes.length > 0 || selectedPrices.length > 0) && (
                  <button onClick={() => { setSelectedTypes([]); setSelectedPrices([]); }} className="text-xs text-primary hover:underline">
                    {t("Deselect All", "전체 선택 해제")}
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {['API', 'Agent', 'Dataset'].map(type => (
                  <button key={type} onClick={() => toggleType(type)}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${selectedTypes.includes(type) ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"}`}>
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
                {['Free', 'Paid'].map(price => (
                  <button key={price} onClick={() => togglePrice(price)}
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors ${selectedPrices.includes(price) ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"}`}>
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4 space-y-6">
          {categories.map(category => {
            const styles = getCategoryStyles(category);
            const Icon = getCategoryIcon(category);
            const items = groupedResources[category];

            return (
              <div key={category} className={`break-inside-avoid mb-6 rounded-xl border bg-white shadow-sm overflow-hidden transition-all hover:shadow-md dark:bg-slate-900 ${styles.border}`}>
                <div className={`px-4 py-3 flex items-center justify-between ${styles.header}`}>
                  <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${styles.icon}`} />
                    {category}
                  </h3>
                  <span className="text-xs font-medium text-white/80 bg-black/20 px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>

                <div className="p-2 flex flex-col gap-1">
                  {items.slice(0, 5).map(resource => (
                    <Link key={resource.id} href={`/resource/${resource.id}`}>
                      <a className="group flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          {resource.type === 'API' && <Database className="h-4 w-4 shrink-0 text-blue-500" />}
                          {resource.type === 'Agent' && <Bot className="h-4 w-4 shrink-0 text-purple-500" />}
                          {resource.type === 'Dataset' && <FileSpreadsheet className="h-4 w-4 shrink-0 text-green-500" />}
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate group-hover:text-primary">
                            {language === '한국어' && resource.titleKo ? resource.titleKo : resource.title}
                          </span>
                        </div>
                        <ArrowRight className="h-3 w-3 text-slate-400 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 shrink-0" />
                      </a>
                    </Link>
                  ))}

                  <button
                    data-testid={`view-all-${category}`}
                    onClick={() => openModal(category)}
                    className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-slate-50 hover:text-foreground dark:hover:bg-slate-800 transition-colors border border-dashed border-slate-200 dark:border-slate-700"
                  >
                    {t("View all", "전체 보기")} {items.length} {t("items", "항목")}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">{t("No resources found matching your criteria.", "조건에 맞는 리소스가 없습니다.")}</p>
            <Button variant="link" onClick={() => { setSearchTerm(""); setSelectedTypes([]); setSelectedPrices([]); }}>{t("Clear all filters", "모든 필터 지우기")}</Button>
          </div>
        )}
      </div>

      {/* Category Items Modal */}
      <Dialog open={modalCategory !== null} onOpenChange={(open) => { if (!open) closeModal(); }}>
        <DialogContent className="max-w-lg w-full p-0 gap-0 overflow-hidden rounded-2xl" data-testid="category-modal">
          {/* Modal Header */}
          {modalCategory && modalStyles && (
            <div className={`${modalStyles.header} px-5 py-4 flex items-center justify-between`}>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <ModalIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-white font-bold text-base leading-tight">{modalCategory}</DialogTitle>
                  <p className="text-white/70 text-xs mt-0.5">{groupedResources[modalCategory]?.length} {t("Industrial Data Assets", "산업 데이터 자산")}</p>
                </div>
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                data-testid="modal-search"
                value={modalSearch}
                onChange={e => setModalSearch(e.target.value)}
                placeholder={t("Search resources...", "리소스 검색...")}
                className="pl-9 h-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus-visible:ring-1"
                autoFocus
              />
            </div>
          </div>

          {/* Items List */}
          <div className="overflow-y-auto max-h-[420px] bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
            {modalItems.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                {t("No results found.", "검색 결과가 없습니다.")}
              </div>
            ) : (
              modalItems.map(resource => {
                const displayTitle = language === '한국어' && resource.titleKo ? resource.titleKo : resource.title;
                const displayDesc = language === '한국어' && resource.descriptionKo ? resource.descriptionKo : resource.description;
                return (
                  <button
                    key={resource.id}
                    data-testid={`modal-item-${resource.id}`}
                    onClick={() => { closeModal(); navigate(`/resource/${resource.id}`); }}
                    className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left group"
                  >
                    {/* Thumbnail */}
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${
                      resource.type === 'API' ? 'bg-blue-50 dark:bg-blue-900/20' :
                      resource.type === 'Agent' ? 'bg-purple-50 dark:bg-purple-900/20' :
                      'bg-green-50 dark:bg-green-900/20'
                    }`}>
                      {resource.image ? (
                        <img src={resource.image} alt={displayTitle} className="h-full w-full object-cover rounded-xl" />
                      ) : (
                        getTypeIcon(resource.type)
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-foreground truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {displayTitle}
                        </span>
                        <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4 shrink-0 border font-medium", getTypeBadgeStyle(resource.type))}>
                          {resource.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">
                        {displayDesc}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] text-slate-500 dark:text-slate-400">#{tag}</span>
                        ))}
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 shrink-0 transition-colors" />
                  </button>
                );
              })
            )}
          </div>

          {/* Footer count */}
          {modalItems.length > 0 && (
            <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
              <p className="text-xs text-muted-foreground text-center">
                {modalItems.length} {t("items", "항목")}
                {modalSearch && ` (${t("filtered", "검색 결과")})`}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
