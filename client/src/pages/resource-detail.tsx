import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES } from "@/lib/data";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, Eye, Calendar, CheckCircle2, ShieldCheck, Zap, Tag, Building2, Globe } from "lucide-react";
import heroBg from "@assets/generated_images/hero_background_with_connecting_data_streams.png";

// Import generated images
import aiAgentIcon from "@assets/generated_images/ai_agent_icon_abstract.png";
import iotDataIcon from "@assets/generated_images/iot_data_icon_abstract.png";
import financialDataIcon from "@assets/generated_images/financial_data_icon_abstract.png";

const imageMap: Record<string, string> = {
  "ai_agent_icon_abstract": aiAgentIcon,
  "iot_data_icon_abstract": iotDataIcon,
  "financial_data_icon_abstract": financialDataIcon
};

export default function ResourceDetail() {
  const [, params] = useRoute("/resource/:id");
  const resource = RESOURCES.find(r => r.id === params?.id);

  if (!resource) return <div>Resource not found</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/">
            <a className="hover:text-primary">홈</a>
          </Link>
          <span>&gt;</span>
          <Link href="/platforms">
            <a className="hover:text-primary">플랫폼</a>
          </Link>
          <span>&gt;</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">{resource.title}</span>
        </div>

        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-6">
            {/* Thumbnail */}
            <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg border bg-slate-900 shadow-sm">
               {resource.image && imageMap[resource.image] ? (
                <img src={imageMap[resource.image]} alt="" className="h-full w-full object-cover" />
               ) : (
                 <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
                   <Zap className="h-8 w-8 text-muted-foreground" />
                 </div>
               )}
            </div>
            
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                {resource.title}
              </h1>
              
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                  <Building2 className="h-4 w-4" />
                  {resource.provider}
                </div>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300">
                  {resource.type.toUpperCase()}
                </Badge>
                <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-300">
                  {resource.price}
                </Badge>
                <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300">
                  {resource.tags[0]}
                </Badge>
                
                <div className="ml-2 flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> {resource.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {resource.publishedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 shadow-sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            플랫폼 열기
          </Button>
        </div>

        {/* Hero Image */}
        <div className="mb-8 overflow-hidden rounded-2xl border bg-slate-900 shadow-sm">
          <div className="relative aspect-[21/9] w-full">
             <img 
               src={heroBg} 
               alt="Hero" 
               className="absolute inset-0 h-full w-full object-cover opacity-80"
             />
             <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-md">
               <Eye className="mr-1.5 inline-block h-3 w-3" />
               {resource.views} views
             </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-8 shadow-sm">
              <h2 className="mb-6 font-heading text-xl font-bold">플랫폼 소개</h2>
              
              <div className="prose max-w-none text-foreground dark:prose-invert">
                <h3 className="text-lg font-semibold"># {resource.title}: {resource.description}</h3>
                
                <p className="italic text-muted-foreground my-4">
                  "Harness the power of artificial intelligence to make smarter, faster, and more profitable financial decisions in today's complex markets."
                </p>
                
                <div className="text-sm text-muted-foreground mb-6">
                  **Published:** {resource.publishedDate} • **Author:** Michael Rodriguez, Quantitative Analyst
                </div>
                
                <hr className="my-6 border-slate-200 dark:border-slate-800" />
                
                <h4 className="text-lg font-bold mt-8 mb-4">## The $7 Trillion Question</h4>
                
                <p className="mb-4">
                  Every trading day, over **$7 trillion** flows through global financial markets. Within this massive ocean of capital, opportunities appear and disappear in milliseconds.
                </p>
                
                <p className="mb-6 font-medium">
                  **The question is:** How do you find the signals in all that noise?
                </p>
                
                <p className="mb-4">
                  Traditional financial analysis - spreadsheets, manual research, gut feelings - simply can't keep up with:
                </p>
                
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  <li>**24/7 global markets** that never sleep</li>
                  <li>**Millions of data points** updated every second</li>
                  <li>**Complex correlations** between assets, sectors, and economies</li>
                  <li>**Breaking news** that can move markets in real-time</li>
                </ul>
                
                <p>
                  Enter the age of **AI-powered financial intelligence**.
                </p>
              </div>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="p-6 shadow-sm">
              <h3 className="mb-4 font-heading font-bold">빠른 정보</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-muted-foreground">운영</span>
                  <span className="font-medium text-right">{resource.provider}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-muted-foreground">유형</span>
                  <span className="font-medium uppercase">{resource.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-muted-foreground">요금</span>
                  <span className="font-medium capitalize">{resource.price}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-muted-foreground">카테고리</span>
                  <span className="font-medium">{resource.tags[0]}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-muted-foreground">게시</span>
                  <span className="font-medium">{resource.publishedDate}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">조회수</span>
                  <span className="font-medium">{resource.views}</span>
                </div>
              </div>
            </Card>

            {/* Tags */}
            <Card className="p-6 shadow-sm">
              <h3 className="mb-4 font-heading font-bold flex items-center gap-2">
                <Tag className="h-4 w-4" /> 태그
              </h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map(tag => (
                   <Badge key={tag} variant="secondary" className="font-normal px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                     {tag}
                   </Badge>
                ))}
                <Badge variant="secondary" className="font-normal px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                  {resource.price}
                </Badge>
                <Badge variant="secondary" className="font-normal px-3 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                  platform
                </Badge>
              </div>
            </Card>

            {/* CTA Card */}
            <Card className="p-6 shadow-sm">
              <h3 className="mb-4 font-heading font-bold">바로가기</h3>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base shadow-sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                플랫폼 열기
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
