import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResourceCard } from "@/components/ui/resource-card";
import { RESOURCES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

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

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4 space-y-6">
          {categories.map(category => (
            <div key={category} className="break-inside-avoid mb-6">
              <div className="mb-3 flex items-center justify-between px-1">
                <h3 className="font-heading text-lg font-semibold capitalize text-foreground">
                  {category}
                </h3>
                <span className="text-xs text-muted-foreground">
                  {groupedResources[category].length} items
                </span>
              </div>
              
              <div className="space-y-3">
                {groupedResources[category].map(resource => (
                  <div key={resource.id} className="group relative rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-slate-900">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                         {resource.type === 'API' && <div className="h-2 w-2 rounded-full bg-blue-500" />}
                         {resource.type === 'Agent' && <div className="h-2 w-2 rounded-full bg-purple-500" />}
                         {resource.type === 'Dataset' && <div className="h-2 w-2 rounded-full bg-green-500" />}
                         <span className="text-xs font-medium text-muted-foreground">{resource.type}</span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                        resource.price === 'Paid' 
                          ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300' 
                          : 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {resource.price}
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-foreground group-hover:text-primary line-clamp-1">
                      {resource.title}
                    </h4>
                    
                    <a href={`/resource/${resource.id}`} className="absolute inset-0 z-10" />
                  </div>
                ))}
              </div>
            </div>
          ))}
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
