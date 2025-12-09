import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResourceCard } from "@/components/ui/resource-card";
import { RESOURCES } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("New Arrivals", "신규 데이터")}</h1>
            <p className="text-muted-foreground">
              {t("Discover the latest data products and services added to our platform.", "플랫폼에 새로 추가된 데이터 상품과 서비스를 만나보세요.")}
            </p>
          </div>
          
          <Button variant="outline" className="gap-2">
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
