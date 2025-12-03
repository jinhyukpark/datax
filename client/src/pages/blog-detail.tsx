import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link, useRoute } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  Clock, 
  Share2, 
  Bookmark, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon,
  MessageSquare
} from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

// Import hero images (mapped for demo purposes)
import blogHero from "@assets/generated_images/modern_laptop_on_desk_with_code_on_screen.png";
import serverRoom from "@assets/generated_images/server_room_with_glowing_lights.png";
import aiCollab from "@assets/generated_images/abstract_multi-agent_ai_collaboration.png";
import ragConcept from "@assets/generated_images/futuristic_data_retrieval_rag_concept.png";

const imageMap: Record<string, string> = {
  "server_room_with_glowing_lights": serverRoom,
  "abstract_multi-agent_ai_collaboration": aiCollab,
  "futuristic_data_retrieval_rag_concept": ragConcept
};

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");
  const { language } = useLanguage();
  
  // Default to the second post (MCP Server) if no ID or specific ID matches
  const postId = params?.id || "2";
  const post = BLOG_POSTS.find(p => p.id === postId) || BLOG_POSTS[1];
  
  const heroImage = post.image && imageMap[post.image] ? imageMap[post.image] : blogHero;
  
  const displayTitle = language === '한국어' && post.titleKo ? post.titleKo : post.title;
  const displayExcerpt = language === '한국어' && post.excerptKo ? post.excerptKo : post.excerpt;

  // Find next/prev posts
  const currentIndex = BLOG_POSTS.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100">
      <Navbar />
      
      <main className="pb-20">
        {/* Progress Bar (Mock) */}
        <div className="fixed top-0 left-0 h-1 bg-indigo-600 z-[60] w-[30%]" />

        {/* Header Section */}
        <header className="relative pt-12 pb-12 lg:pt-20 lg:pb-16 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                Home
              </Link>
              <span className="text-slate-300">/</span>
              <Link href="/blog" className="hover:text-indigo-600 transition-colors">
                Blog
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-foreground font-medium truncate max-w-[200px]">{post.category}</span>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800">
                {post.category}
              </Badge>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {displayTitle}
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl md:mx-0">
                {displayExcerpt}
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 pt-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
                    <div className="h-full w-full rounded-full bg-white dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                      <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">EM</span>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{post.author}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Editor in Chief</div>
                  </div>
                </div>
                
                <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800" />
                
                <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="container mx-auto px-4 max-w-5xl -mt-8 lg:-mt-12 mb-12 relative z-10">
          <div className="aspect-[21/9] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-900/5 bg-slate-100 dark:bg-slate-800">
            <img 
              src={heroImage} 
              alt={displayTitle} 
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sidebar - Social Share */}
          <div className="hidden lg:block lg:col-span-2 relative">
            <div className="sticky top-32 flex flex-col gap-4 items-end pr-4 border-r border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Share</span>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-500">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-700">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600">
                <LinkIcon className="h-5 w-5" />
              </Button>
              <Separator className="my-2 w-8" />
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-amber-500">
                <Bookmark className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <article className="prose prose-lg prose-slate max-w-none dark:prose-invert 
              prose-headings:font-heading prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-300
              prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-lg
              prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic">
              
              <p className="lead text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-200 mb-8">
                {displayExcerpt} This guide shows a minimal setup that still supports real endpoints and auth.
              </p>

              <h2>Introduction</h2>
              <p>
                The <strong>Model Context Protocol (MCP)</strong> is rapidly becoming the standard for connecting AI models to external tools and data. While the official documentation covers a lot of ground, many developers get stuck on the initial setup.
              </p>
              <p>
                In this tutorial, we'll strip away the complexity and build a production-ready MCP server in just 15 minutes. We'll focus on the core components: the server instance, tool definitions, and the transport layer.
              </p>

              <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl">
                <h4 className="text-indigo-900 dark:text-indigo-100 font-bold text-lg m-0 mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Prerequisites
                </h4>
                <ul className="m-0 pl-5 text-indigo-800 dark:text-indigo-200">
                  <li>Node.js v18 or higher</li>
                  <li>Basic understanding of TypeScript</li>
                  <li>An API key for the service you want to wrap (optional)</li>
                </ul>
              </div>

              <h2>Step 1: Scaffolding the Project</h2>
              <p>
                First, let's create a new directory and initialize a TypeScript project. We'll use <code>ts-node</code> for development to keep things fast.
              </p>
              
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto">
                <code>{`mkdir my-mcp-server
cd my-mcp-server
npm init -y
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node ts-node`}</code>
              </pre>

              <h2>Step 2: Defining Your Tools</h2>
              <p>
                The core of an MCP server is its tools. Tools are functions that the AI model can call. Let's define a simple weather tool using Zod for schema validation.
              </p>

              <blockquote>
                "Tools are the hands of the AI. Without them, models can only think, not act."
                <footer className="text-sm mt-2 text-slate-500">— Sarah Chen, AI Research Lead</footer>
              </blockquote>

              <h2>Step 3: The Server Instance</h2>
              <p>
                Now, let's wire everything up. We'll create an <code>McpServer</code> instance and register our tool.
              </p>

              <h2>Wrapping Up</h2>
              <p>
                You now have a fully functional MCP server running locally. From here, you can add more complex tools, implement authentication middleware, or deploy it to a serverless function.
              </p>
              <p>
                The beauty of MCP is its composability. This server can now be used by any MCP-compliant client, including Claude Desktop, various IDEs, and your own custom agents.
              </p>
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap gap-2">
                {["MCP", "TypeScript", "Tutorial", "AI Agents", "Backend"].map(tag => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300 transition-colors cursor-pointer">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <div className="h-20 w-20 shrink-0 rounded-full bg-slate-200 overflow-hidden ring-4 ring-white dark:ring-slate-800">
                {/* Placeholder avatar */}
                <User className="h-full w-full p-4 text-slate-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{post.author}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Lead Developer Advocate at EM-Data. Passionate about building accessible AI tools and teaching developers how to bridge the gap between models and reality.
                </p>
                <div className="flex justify-center md:justify-start gap-3">
                  <Button variant="outline" size="sm" className="h-8 rounded-full">Follow on X</Button>
                  <Button variant="outline" size="sm" className="h-8 rounded-full">GitHub</Button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {prevPost ? (
                <Link href={`/blog/${prevPost.id}`} className="group block p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 dark:border-slate-800 dark:hover:bg-indigo-900/10 transition-all">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                      Previous Article
                    </div>
                    <div className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {language === '한국어' && prevPost.titleKo ? prevPost.titleKo : prevPost.title}
                    </div>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link href={`/blog/${nextPost.id}`} className="group block p-6 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30 dark:border-slate-800 dark:hover:bg-indigo-900/10 transition-all text-right">
                    <div className="flex items-center justify-end gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Next Article
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {language === '한국어' && nextPost.titleKo ? nextPost.titleKo : nextPost.title}
                    </div>
                </Link>
              ) : <div />}
            </div>
          </div>

          {/* Right Sidebar (Table of Contents - Desktop) */}
          <div className="hidden lg:block lg:col-span-2 relative">
            <div className="sticky top-32 pl-4 border-l border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">On this page</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-indigo-600 font-medium block border-l-2 border-indigo-600 -ml-[17px] pl-4">Introduction</a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Prerequisites</a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Step 1: Scaffolding</a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Step 2: Defining Tools</a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Step 3: Server Instance</a>
                </li>
                <li>
                  <a href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Wrapping Up</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
