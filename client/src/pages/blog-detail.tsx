import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link, useRoute } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, Calendar, ArrowLeft, ArrowRight, Home } from "lucide-react";
import blogHero from "@assets/generated_images/modern_laptop_on_desk_with_code_on_screen.png";

export default function BlogDetail() {
  // In a real app, we would fetch the blog post based on the ID
  // const [, params] = useRoute("/blog/:id");
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/">
            <a className="hover:text-primary flex items-center gap-1"><Home className="h-3 w-3" /> Home</a>
          </Link>
          <span>&gt;</span>
          <Link href="/blog">
            <a className="hover:text-primary">Blog</a>
          </Link>
          <span>&gt;</span>
          <span className="text-foreground font-medium truncate">How to Build an MCP Server in 15 Minutes</span>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="aspect-video w-full overflow-hidden rounded-xl mb-8 bg-slate-100">
            <img 
              src={blogHero} 
              alt="Blog Cover" 
              className="h-full w-full object-cover"
            />
          </div>

          <Badge variant="secondary" className="mb-4 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
            Tutorials
          </Badge>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            How to Build an MCP Server in 15 Minutes
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-slate-100 dark:border-slate-800 pb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>EM-Data Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>2025년 11월 18일</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-slate max-w-none dark:prose-invert mb-16">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            Build an MCP Server in 15 Minutes
          </h3>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            This guide shows a minimal setup that still supports real endpoints and auth.
          </p>

          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Steps</h4>
          
          <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-slate-300 mb-8">
            <li className="pl-2">Scaffold the project</li>
            <li className="pl-2">Define tools</li>
            <li className="pl-2">Add authentication</li>
            <li className="pl-2">Test with a client</li>
          </ol>

          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">Wrapping up</h4>
          
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            You now have a working MCP server with a clean baseline to expand.
          </p>
        </article>

        {/* Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-8">
          <Link href="/blog">
            <a className="group block p-4 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 transition-all">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <ArrowLeft className="h-3 w-3" />
                이전 글
              </div>
              <div className="font-medium text-slate-900 dark:text-slate-50 line-clamp-2 group-hover:text-primary transition-colors">
                Multi-Agent AI Systems: Why Teams of AIs Beat Solo Models
              </div>
            </a>
          </Link>

          <Link href="/blog">
            <a className="group block p-4 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900 transition-all text-right">
              <div className="flex items-center justify-end gap-2 text-xs text-muted-foreground mb-2">
                다음 글
                <ArrowRight className="h-3 w-3" />
              </div>
              <div className="font-medium text-slate-900 dark:text-slate-50 line-clamp-2 group-hover:text-primary transition-colors">
                Is RAG Still Relevant in 2026?
              </div>
            </a>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
