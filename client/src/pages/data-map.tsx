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

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Data Map</h1>
          <p className="mt-2 text-muted-foreground">Explore the comprehensive catalog of industrial data and AI agents.</p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="rounded-xl border bg-white p-5 shadow-sm dark:bg-slate-900">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <h3 className="font-heading font-semibold">Filters</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Type</label>
                  <div className="space-y-2">
                    {['API', 'Agent', 'Dataset'].map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="rounded border-slate-300"
                          checked={selectedType === type}
                          onChange={() => setSelectedType(selectedType === type ? null : type)}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Price</label>
                  <div className="space-y-2">
                    {['Free', 'Freemium', 'Paid'].map(price => (
                      <label key={price} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                        <input type="checkbox" className="rounded border-slate-300" />
                        {price}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search resources..." 
                  className="pl-10 bg-white dark:bg-slate-900" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Showing {filteredResources.length} results
                </span>
              </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
            
            {filteredResources.length === 0 && (
               <div className="py-20 text-center">
                 <p className="text-muted-foreground">No resources found matching your criteria.</p>
                 <Button variant="link" onClick={() => {setSearchTerm(""); setSelectedType(null);}}>Clear all filters</Button>
               </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
