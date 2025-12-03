import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES, Resource } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { useState } from "react";

const gradients = [
  "bg-gradient-to-br from-purple-500 to-pink-500",
  "bg-gradient-to-br from-blue-500 to-cyan-500",
  "bg-gradient-to-br from-orange-500 to-red-500",
  "bg-gradient-to-br from-emerald-500 to-teal-500",
  "bg-gradient-to-br from-indigo-500 to-purple-600",
  "bg-gradient-to-br from-rose-500 to-pink-600",
];

function PlatformCard({ resource, index }: { resource: Resource; index: number }) {
  const gradient = gradients[index % gradients.length];

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 hover:shadow-md transition-shadow duration-300">
      {/* Top Gradient Section */}
      <div className={cn("relative h-40 p-6 text-white", gradient)}>
        <div className="flex items-start justify-between">
          <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">
            {resource.price}
          </Badge>
          <div className="flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-xs backdrop-blur-sm">
            <Eye className="h-3 w-3" />
            {resource.views > 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views}
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="font-heading text-xl font-bold leading-tight text-white text-shadow-sm">
            {resource.title}
          </h3>
          <p className="mt-1 text-sm text-white/80 font-medium">
            {resource.provider}
          </p>
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="p-6">
        <div className="mb-3">
           <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/50">
             {resource.type === 'API' ? 'Data APIs' : resource.type === 'Agent' ? 'AI Agents' : 'Datasets'}
           </Badge>
        </div>
        
        <Link href={`/resource/${resource.id}`}>
          <a className="mb-2 block font-heading text-lg font-bold text-foreground hover:text-primary">
            {resource.title}
          </a>
        </Link>
        
        <p className="mb-6 line-clamp-3 text-sm text-muted-foreground">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4 mt-auto">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {/* Mocking a formatted date like "November 27, 2025" */}
            {new Date(resource.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          <Link href={`/resource/${resource.id}`}>
            <a className="text-muted-foreground hover:text-primary transition-colors">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Platforms() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories from resources
  const categories = Array.from(new Set(RESOURCES.map(r => r.tags[0])));
  
  // Filter resources based on selection
  const filteredResources = selectedCategory 
    ? RESOURCES.filter(r => r.tags.includes(selectedCategory))
    : RESOURCES;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">Platforms</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and explore comprehensive data resources and AI solutions from leading Korean institutions
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
            All Platforms
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
          {filteredResources.map((resource, index) => (
            <PlatformCard key={resource.id} resource={resource} index={index} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No platforms found for this category.</p>
            <Button variant="link" onClick={() => setSelectedCategory(null)}>Clear filter</Button>
          </div>
        )}
        
        <div className="mt-20 rounded-2xl bg-linear-to-br from-indigo-50 to-purple-50 p-12 text-center dark:from-indigo-950/30 dark:to-purple-950/30">
           <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Share Your Platform</h2>
           <p className="text-muted-foreground max-w-xl mx-auto mb-8">
             Join leading Korean institutions in showcasing your data APIs and AI agents to a wider audience
           </p>
           <Link href="/submit">
             <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
               Submit Your Resource
             </Button>
           </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
