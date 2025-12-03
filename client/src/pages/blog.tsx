import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BLOG_POSTS } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-slate-400">News, tutorials, and deep dives on data platforms and AI agents.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <a className="group block h-full">
                <Card className="h-full overflow-hidden border-white/10 bg-white/5 transition-colors hover:border-white/20 hover:bg-white/10">
                  <div className={cn("h-48 w-full bg-gradient-to-br", post.imageGradient)}>
                    <div className="flex h-full items-end p-6">
                      <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm border-none">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="mb-3 font-heading text-xl font-bold leading-tight group-hover:text-primary-foreground">
                      {post.title}
                    </h2>
                    <p className="mb-6 line-clamp-3 text-sm text-slate-400">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-foreground group-hover:underline">
                        Read more <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
