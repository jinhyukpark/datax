import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Database, Bot, FileSpreadsheet, Zap, Globe, Cpu, BarChart3, Truck, Factory, DollarSign, Cloud } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// Helper to get color based on category
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "AI Assistant": "border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
    "Customer Service": "border-purple-200 bg-purple-50/50 dark:border-purple-900/50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300",
    "Manufacturing": "border-orange-200 bg-orange-50/50 dark:border-orange-900/50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300",
    "AI/ML": "border-indigo-200 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300",
    "Analytics": "border-pink-200 bg-pink-50/50 dark:border-pink-900/50 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300",
    "Finance": "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300",
    "Operations": "border-cyan-200 bg-cyan-50/50 dark:border-cyan-900/50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300",
    "Transport": "border-sky-200 bg-sky-50/50 dark:border-sky-900/50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-300",
    "Weather": "border-yellow-200 bg-yellow-50/50 dark:border-yellow-900/50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300",
    "Financial Services": "border-teal-200 bg-teal-50/50 dark:border-teal-900/50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300",
    "Artificial Intelligence": "border-violet-200 bg-violet-50/50 dark:border-violet-900/50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300",
    "Industrial IoT": "border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300",
  };
  return colors[category] || "border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300";
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
    case "Operations": return Cloud; // approximate
    case "Transport": return Truck;
    case "Transportation": return Truck;
    case "Weather": return Cloud;
    default: return Database;
  }
};

export default function DataMap() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

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
          <h1 className="font-heading text-3xl font-bold text-foreground">Data Map</h1>
          <p className="mt-2 text-muted-foreground">Explore the comprehensive catalog of industrial data and AI agents.</p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  CATEGORIES
                </div>
                <button 
                  onClick={() => setSelectedType(null)}
                  className="text-xs text-primary hover:underline"
                >
                  Deselect All
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
                <span>$</span> PRICING
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
            const styles = getCategoryColor(category);
            const Icon = getCategoryIcon(category);
            
            return (
              <div key={category} className={cn("break-inside-avoid mb-6 rounded-xl border p-5 shadow-sm transition-all", styles)}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-heading text-lg font-bold flex items-center gap-2">
                    <span className="opacity-70"><Icon className="h-4 w-4" /></span>
                    {category} 
                    <span className="text-sm opacity-60 font-normal ml-1">({groupedResources[category].length})</span>
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {groupedResources[category].map(resource => (
                    <Link key={resource.id} href={`/resource/${resource.id}`}>
                      <a className="group flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:scale-105 dark:bg-black/40 dark:text-slate-200 dark:hover:bg-black/60 ring-1 ring-transparent hover:ring-slate-200 dark:hover:ring-slate-700">
                        {/* Mini Type Indicator */}
                        <span className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          resource.type === 'API' ? "bg-blue-500" : 
                          resource.type === 'Agent' ? "bg-purple-500" : "bg-green-500"
                        )} />
                        <span className="truncate max-w-[140px]">{resource.title}</span>
                      </a>
                    </Link>
                  ))}
                  
                  <button className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-current opacity-60 hover:opacity-100 transition-opacity">
                    See more...
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No resources found matching your criteria.</p>
              <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedType(null);}}>Clear all filters</Button>
            </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
