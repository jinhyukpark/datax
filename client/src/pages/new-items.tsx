import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResourceCard } from "@/components/ui/resource-card";
import { RESOURCES } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from '@assets/generated_images/abstract_future_data_banner.png';

export default function NewItems() {
  const { t } = useLanguage();

  // Sort resources by date (descending) and take top 20
  const newResources = [...RESOURCES].sort((a, b) => {
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  }).slice(0, 20);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Featured Hero Banner */}
        <div className="w-full h-48 md:h-64 rounded-xl overflow-hidden mb-8 relative shadow-lg">
          <img 
            src={heroImage} 
            alt="New Arrivals Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6 md:p-8">
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{t("New Arrivals", "신규 데이터")}</h1>
              <p className="text-white/90 text-sm md:text-base max-w-2xl">
                {t("Discover the latest data products and services added to our platform.", "플랫폼에 새로 추가된 데이터 상품과 서비스를 만나보세요.")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="text-sm text-muted-foreground">
            {t(`Showing ${newResources.length} new items`, `총 ${newResources.length}개의 신규 아이템`)}
          </div>
          
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-900">
            <ArrowUpDown className="h-4 w-4" />
            {t("Sort by Date", "날짜순 정렬")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
