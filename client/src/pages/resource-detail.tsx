import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES } from "@/lib/data";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  ExternalLink, 
  Eye, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Tag, 
  Building2, 
  Globe, 
  Star, 
  Code, 
  Server, 
  Layout,
  MessageSquare,
  Terminal,
  Database,
  Linkedin,
  Twitter,
  Github,
  Link as LinkIcon,
  Briefcase,
  Check,
  ShoppingCart,
  CreditCard,
  Heart,
  Info,
  FileText
} from "lucide-react";
import heroBg from "@assets/generated_images/hero_background_with_connecting_data_streams.png";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Send, Reply, User, ChevronDown } from "lucide-react";

// Import generated images
import aiAgentIcon from "@assets/generated_images/ai_agent_icon_abstract.png";
import iotDataIcon from "@assets/generated_images/iot_data_icon_abstract.png";
import financialDataIcon from "@assets/generated_images/financial_data_icon_abstract.png";

const imageMap: Record<string, string> = {
  "ai_agent_icon_abstract": aiAgentIcon,
  "iot_data_icon_abstract": iotDataIcon,
  "financial_data_icon_abstract": financialDataIcon
};

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ResourceDetail() {
  const [, params] = useRoute("/resource/:id");
  const resource = RESOURCES.find(r => r.id === params?.id);
  const { language, t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? t("Removed from favorites", "즐겨찾기에서 제거되었습니다") : t("Added to favorites", "즐겨찾기에 추가되었습니다"));
  };

  if (!resource) return <div>Resource not found</div>;

  const displayTitle = language === '한국어' && resource.titleKo ? resource.titleKo : resource.title;
  const displayDesc = language === '한국어' && resource.descriptionKo ? resource.descriptionKo : resource.description;
  const displayTagline = language === '한국어' && resource.taglineKo ? resource.taglineKo : resource.tagline;
  const displayFeatures = language === '한국어' && resource.featuresKo ? resource.featuresKo : resource.features;
  const displayUseCases = language === '한국어' && resource.useCasesKo ? resource.useCasesKo : resource.useCases;

  const previewImages = [
    { src: heroBg, label: "Interactive Dashboard View", views: resource.views },
    { src: heroBg, label: "Data Analytics Panel", views: Math.floor(resource.views * 0.85) },
    { src: heroBg, label: "API Integration Topology", views: Math.floor(resource.views * 0.7) },
    { src: heroBg, label: "Real-time Monitoring", views: Math.floor(resource.views * 0.6) },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Thumbnail */}
            <div className="h-24 w-24 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-2xl border bg-white p-2 shadow-sm dark:bg-slate-900">
               {resource.image && imageMap[resource.image] ? (
                <img src={imageMap[resource.image]} alt="" className="h-full w-full object-contain rounded-xl" />
               ) : (
                 <div className="flex h-full w-full items-center justify-center bg-slate-100 rounded-xl dark:bg-slate-800">
                   <Zap className="h-8 w-8 text-muted-foreground" />
                 </div>
               )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge variant="outline" className={cn(
                  "border-blue-200 dark:border-blue-800",
                  resource.price === 'Paid' ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300" : 
                  resource.price === 'Free' ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" :
                  "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                )}>
                  {resource.price === 'Paid' ? <CreditCard className="mr-1 h-3 w-3" /> : null}
                  {resource.price}
                </Badge>
                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700">
                  {resource.type.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  {resource.provider}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span>4.8</span>
                  <span className="text-muted-foreground font-normal">(124 reviews)</span>
                </div>
              </div>

              <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl tracking-tight mb-3">
                {displayTitle}
              </h1>
              
              {displayTagline && (
                <p className="text-xl font-medium text-indigo-600 dark:text-indigo-400 mb-4">
                  {displayTagline}
                </p>
              )}
              
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                {displayDesc}
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 md:min-w-[200px]">
              {resource.price === 'Paid' ? (
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20" asChild>
                  <a href={resource.websiteUrl || "#"} target="_blank" rel="noopener noreferrer">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {t("Purchase", "구매하기")}
                  </a>
                </Button>
              ) : (
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20" asChild>
                  <a href={resource.websiteUrl || resource.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("Access Resource", "리소스 접근")}
                  </a>
                </Button>
              )}
              {resource.demoUrl && (
                <Button variant="outline" className="border-slate-200 dark:border-slate-800" asChild>
                  <a href={resource.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    {t("View Demo", "데모 보기")}
                  </a>
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className={cn(
                  "border-slate-200 dark:border-slate-800 transition-colors",
                  isFavorite && "border-pink-200 bg-pink-50 text-pink-600 hover:bg-pink-100 hover:text-pink-700 dark:bg-pink-900/20 dark:border-pink-800 dark:text-pink-400"
                )}
                onClick={toggleFavorite}
              >
                <Heart className={cn("mr-2 h-4 w-4", isFavorite && "fill-current")} />
                {isFavorite ? t("Saved", "저장됨") : t("Favorite", "즐겨찾기")}
              </Button>

              <div className="flex items-center justify-center gap-2 rounded-md border border-green-200 bg-green-50 py-2.5 text-sm font-medium text-green-700 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
                <ShieldCheck className="h-4 w-4" />
                {t("Verified Provider", "인증된 제공자")}
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column - Tabs & Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hero Image Carousel */}
            <Carousel className="w-full group">
              <CarouselContent>
                {previewImages.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm dark:border-slate-800">
                      <div className="relative aspect-video w-full">
                         <img 
                           src={img.src} 
                           alt={img.label} 
                           className="absolute inset-0 h-full w-full object-cover opacity-90"
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                         <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                           <div className="text-white">
                             <p className="text-xs font-medium opacity-70 mb-1">
                               Preview {index + 1} of {previewImages.length}
                             </p>
                             <p className="font-bold text-lg tracking-tight">{img.label}</p>
                           </div>
                           <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white hover:bg-black/60 transition-colors">
                             <Eye className="mr-1.5 h-3 w-3" />
                             {img.views.toLocaleString()} views
                           </Badge>
                         </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-black/20 border-white/20 text-white hover:bg-black/40 hover:border-white/40 opacity-0 group-hover:opacity-100 transition-all" />
              <CarouselNext className="right-4 bg-black/20 border-white/20 text-white hover:bg-black/40 hover:border-white/40 opacity-0 group-hover:opacity-100 transition-all" />
            </Carousel>

            {/* Tabs Interface */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b border-slate-200 bg-transparent p-0 h-auto rounded-none dark:border-slate-800 mb-6">
                <TabsTrigger 
                  value="overview" 
                  className="rounded-none border-b-2 border-transparent px-6 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                >
                  {t("Overview", "개요")}
                </TabsTrigger>
                <TabsTrigger 
                  value="documentation" 
                  className="rounded-none border-b-2 border-transparent px-6 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                >
                  {t("Documentation", "문서")}
                </TabsTrigger>
                <TabsTrigger 
                  value="terms" 
                  className="rounded-none border-b-2 border-transparent px-6 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                >
                  {t("Terms & Policies", "이용약관 및 정책")}
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="rounded-none border-b-2 border-transparent px-6 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                >
                  {t("Reviews", "리뷰")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="prose prose-slate max-w-none dark:prose-invert">
                  <h3>About this resource</h3>
                  <p>
                    {displayDesc} This comprehensive solution provides enterprise-grade capabilities for organizations looking to scale their operations efficiently. Built on modern architecture, it ensures high availability, robust security, and seamless integration with your existing technology stack.
                  </p>
                  
                  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                    <Card className="border-l-4 border-l-indigo-500 shadow-sm">
                      <CardContent className="p-4 pt-6">
                        <div className="mb-2 flex items-center gap-2 font-bold text-foreground">
                          <Zap className="h-5 w-5 text-indigo-500" />
                          High Performance
                        </div>
                        <p className="text-sm text-muted-foreground">Optimized for low-latency processing with 99.99% uptime SLA guarantee.</p>
                      </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-emerald-500 shadow-sm">
                      <CardContent className="p-4 pt-6">
                        <div className="mb-2 flex items-center gap-2 font-bold text-foreground">
                          <ShieldCheck className="h-5 w-5 text-emerald-500" />
                          Enterprise Security
                        </div>
                        <p className="text-sm text-muted-foreground">SOC2 Type II certified with end-to-end encryption and role-based access control.</p>
                      </CardContent>
                    </Card>
                  </div>

                  {displayFeatures && displayFeatures.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4 text-foreground">
                        {t("Key Features", "주요 기능")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {displayFeatures.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3.5 rounded-lg bg-green-50/80 dark:bg-green-900/20 border border-green-100/50 dark:border-green-800/30">
                            <Star className="h-4 w-4 text-green-500 shrink-0" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {displayUseCases && displayUseCases.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4 text-foreground">
                        {t("Use Cases", "활용 사례")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayUseCases.map((useCase, idx) => {
                          const useCaseDescriptions: Record<string, { en: string; ko: string }> = {
                            "Brand monitoring": { en: "Track brand mentions, sentiment, and reputation across social platforms in real-time.", ko: "소셜 플랫폼에서 브랜드 언급, 감정, 평판을 실시간으로 추적합니다." },
                            "Campaign performance tracking": { en: "Measure and analyze marketing campaign effectiveness with detailed metrics and ROI insights.", ko: "상세한 지표와 ROI 인사이트로 마케팅 캠페인 효과를 측정하고 분석합니다." },
                            "Market research": { en: "Gain comprehensive market insights through trend analysis and consumer behavior data.", ko: "트렌드 분석과 소비자 행동 데이터를 통해 종합적인 시장 인사이트를 얻습니다." },
                            "Competitor analysis": { en: "Monitor competitor activities, strategies, and market positioning to stay ahead.", ko: "경쟁사 활동, 전략, 시장 포지셔닝을 모니터링하여 앞서 나갑니다." },
                            "Crisis management": { en: "Detect and respond to potential PR crises early with real-time alert systems.", ko: "실시간 알림 시스템으로 잠재적 PR 위기를 조기에 감지하고 대응합니다." },
                            "특허 검색": { en: "Search patents using visual similarity matching and AI-powered analysis.", ko: "시각적 유사성 매칭과 AI 기반 분석을 사용하여 특허를 검색합니다." },
                            "디자인 침해 분석": { en: "Identify potential design infringements through comprehensive image comparison.", ko: "포괄적인 이미지 비교를 통해 잠재적 디자인 침해를 식별합니다." },
                            "기술 트렌드 분석": { en: "Analyze technology trends and innovation patterns across industries.", ko: "산업 전반의 기술 트렌드와 혁신 패턴을 분석합니다." },
                          };
                          const desc = useCaseDescriptions[useCase];
                          const description = desc ? (language === '한국어' ? desc.ko : desc.en) : t("Leverage this capability to enhance your business operations and decision-making.", "이 기능을 활용하여 비즈니스 운영과 의사결정을 개선하세요.");
                          
                          return (
                            <div key={idx} className="p-4 rounded-lg bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100/50 dark:border-blue-800/30">
                              <div className="flex items-center gap-3 mb-2">
                                <Check className="h-4 w-4 text-blue-500 shrink-0" />
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{useCase}</span>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 ml-7 leading-relaxed">{description}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {!displayFeatures && !displayUseCases && (
                    <>
                      <h3>Key Capabilities</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Real-time data processing</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Advanced analytics dashboard</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Automated reporting workflows</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Custom API integrations</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> 24/7 technical support</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Comprehensive documentation</li>
                      </ul>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="documentation" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* Quick Start Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Quick Start Guide
                    </h3>
                    <Badge variant="outline">v2.1.0</Badge>
                  </div>

                  {/* Step 1: Installation */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">1</div>
                      <h4 className="font-bold">Installation</h4>
                    </div>
                    <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50">
                      <div className="absolute right-4 top-4 text-xs text-slate-400">BASH</div>
                      <p className="text-slate-400"># Using npm</p>
                      <p className="mb-3">npm install @em-data/sdk</p>
                      <p className="text-slate-400"># Using pip (Python)</p>
                      <p className="mb-3">pip install em-data-sdk</p>
                      <p className="text-slate-400"># Using Maven (Java)</p>
                      <p>&lt;dependency&gt;</p>
                      <p>&nbsp;&nbsp;&lt;groupId&gt;com.emdata&lt;/groupId&gt;</p>
                      <p>&nbsp;&nbsp;&lt;artifactId&gt;em-data-sdk&lt;/artifactId&gt;</p>
                      <p>&nbsp;&nbsp;&lt;version&gt;2.1.0&lt;/version&gt;</p>
                      <p>&lt;/dependency&gt;</p>
                    </div>
                  </div>

                  {/* Step 2: JavaScript Integration */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-bold text-sm">2</div>
                      <h4 className="font-bold">JavaScript / Node.js Integration</h4>
                    </div>
                    <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50 overflow-x-auto">
                      <div className="absolute right-4 top-4 text-xs text-slate-400">JAVASCRIPT</div>
                      <p><span className="text-purple-400">import</span> {"{"} EMDataClient {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'@em-data/sdk'</span>;</p>
                      <br/>
                      <p className="text-slate-400">// Initialize the client</p>
                      <p><span className="text-purple-400">const</span> client = <span className="text-blue-400">new</span> EMDataClient({"{"}</p>
                      <p>&nbsp;&nbsp;apiKey: process.env.<span className="text-orange-400">EM_API_KEY</span>,</p>
                      <p>&nbsp;&nbsp;baseUrl: <span className="text-green-400">'https://api.emdata.io'</span></p>
                      <p>{"}"});</p>
                      <br/>
                      <p className="text-slate-400">// Fetch resources</p>
                      <p><span className="text-purple-400">const</span> resources = <span className="text-purple-400">await</span> client.resources.list({"{"}</p>
                      <p>&nbsp;&nbsp;category: <span className="text-green-400">'analysis'</span>,</p>
                      <p>&nbsp;&nbsp;limit: <span className="text-orange-400">10</span></p>
                      <p>{"}"});</p>
                      <br/>
                      <p>console.log(resources.data);</p>
                    </div>
                  </div>

                  {/* Step 3: Python Integration */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">3</div>
                      <h4 className="font-bold">Python Integration</h4>
                    </div>
                    <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50 overflow-x-auto">
                      <div className="absolute right-4 top-4 text-xs text-slate-400">PYTHON</div>
                      <p><span className="text-purple-400">from</span> em_data <span className="text-purple-400">import</span> EMDataClient</p>
                      <p><span className="text-purple-400">import</span> os</p>
                      <br/>
                      <p className="text-slate-400"># Initialize the client</p>
                      <p>client = EMDataClient(</p>
                      <p>&nbsp;&nbsp;api_key=os.environ[<span className="text-green-400">"EM_API_KEY"</span>],</p>
                      <p>&nbsp;&nbsp;base_url=<span className="text-green-400">"https://api.emdata.io"</span></p>
                      <p>)</p>
                      <br/>
                      <p className="text-slate-400"># Fetch resources</p>
                      <p>resources = client.resources.list(</p>
                      <p>&nbsp;&nbsp;category=<span className="text-green-400">"analysis"</span>,</p>
                      <p>&nbsp;&nbsp;limit=<span className="text-orange-400">10</span></p>
                      <p>)</p>
                      <br/>
                      <p><span className="text-purple-400">for</span> resource <span className="text-purple-400">in</span> resources.data:</p>
                      <p>&nbsp;&nbsp;print(resource.name, resource.category)</p>
                    </div>
                  </div>

                  {/* Step 4: Java Integration */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 font-bold text-sm">4</div>
                      <h4 className="font-bold">Java Integration</h4>
                    </div>
                    <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50 overflow-x-auto">
                      <div className="absolute right-4 top-4 text-xs text-slate-400">JAVA</div>
                      <p><span className="text-purple-400">import</span> com.emdata.EMDataClient;</p>
                      <p><span className="text-purple-400">import</span> com.emdata.models.Resource;</p>
                      <p><span className="text-purple-400">import</span> com.emdata.models.ResourceListResponse;</p>
                      <br/>
                      <p><span className="text-purple-400">public class</span> <span className="text-blue-400">Example</span> {"{"}</p>
                      <p>&nbsp;&nbsp;<span className="text-purple-400">public static void</span> main(String[] args) {"{"}</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">// Initialize client</span></p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;EMDataClient client = <span className="text-blue-400">new</span> EMDataClient.Builder()</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.apiKey(System.getenv(<span className="text-green-400">"EM_API_KEY"</span>))</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.baseUrl(<span className="text-green-400">"https://api.emdata.io"</span>)</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.build();</p>
                      <br/>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400">// Fetch resources</span></p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;ResourceListResponse response = client.resources()</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.list(<span className="text-green-400">"analysis"</span>, <span className="text-orange-400">10</span>);</p>
                      <br/>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">for</span> (Resource r : response.getData()) {"{"}</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(r.getName());</p>
                      <p>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</p>
                      <p>&nbsp;&nbsp;{"}"}</p>
                      <p>{"}"}</p>
                    </div>
                  </div>
                </div>

                {/* Endpoints Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">API Endpoints</h3>
                  
                  {/* GET /v1/resources/list */}
                  <Collapsible defaultOpen={false}>
                    <Card className="overflow-hidden">
                      <CollapsibleTrigger className="w-full text-left">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-blue-500 hover:bg-blue-600">GET</Badge>
                              <code className="text-sm font-mono font-bold">/v1/resources/list</code>
                            </div>
                            <p className="text-sm text-muted-foreground">Retrieve a paginated list of available resources matching the filter criteria.</p>
                          </div>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-6">
                          <div>
                            <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                              <span className="h-5 w-5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs">Q</span>
                              Query Parameters
                            </h5>
                            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                  <tr>
                                    <th className="text-left px-4 py-2 font-medium">Parameter</th>
                                    <th className="text-left px-4 py-2 font-medium">Type</th>
                                    <th className="text-left px-4 py-2 font-medium">Required</th>
                                    <th className="text-left px-4 py-2 font-medium">Description</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                  <tr><td className="px-4 py-2 font-mono text-xs">category</td><td className="px-4 py-2">string</td><td className="px-4 py-2">No</td><td className="px-4 py-2 text-muted-foreground">Filter by resource category</td></tr>
                                  <tr><td className="px-4 py-2 font-mono text-xs">limit</td><td className="px-4 py-2">integer</td><td className="px-4 py-2">No</td><td className="px-4 py-2 text-muted-foreground">Max results (default: 20, max: 100)</td></tr>
                                  <tr><td className="px-4 py-2 font-mono text-xs">offset</td><td className="px-4 py-2">integer</td><td className="px-4 py-2">No</td><td className="px-4 py-2 text-muted-foreground">Pagination offset</td></tr>
                                  <tr><td className="px-4 py-2 font-mono text-xs">sort</td><td className="px-4 py-2">string</td><td className="px-4 py-2">No</td><td className="px-4 py-2 text-muted-foreground">Sort field (created_at, name, rating)</td></tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                              <span className="h-5 w-5 rounded bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">R</span>
                              Response
                            </h5>
                            <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-50 overflow-x-auto">
                              <div className="absolute right-4 top-4 text-xs text-slate-400">JSON</div>
                              <pre>{`{
  "success": true,
  "data": [
    {
      "id": "res_abc123",
      "name": "Market Analysis Agent",
      "category": "analysis",
      "description": "AI-powered market analysis",
      "rating": 4.8,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0,
    "has_more": true
  }
}`}</pre>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  {/* POST /v1/agents/interact */}
                  <Collapsible defaultOpen={false}>
                    <Card className="overflow-hidden">
                      <CollapsibleTrigger className="w-full text-left">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-green-500 hover:bg-green-600">POST</Badge>
                              <code className="text-sm font-mono font-bold">/v1/agents/interact</code>
                            </div>
                            <p className="text-sm text-muted-foreground">Send a prompt to the AI agent and receive a streamed response.</p>
                          </div>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-6">
                          <div>
                            <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                              <span className="h-5 w-5 rounded bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs">B</span>
                              Request Body
                            </h5>
                            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                  <tr>
                                    <th className="text-left px-4 py-2 font-medium">Field</th>
                                    <th className="text-left px-4 py-2 font-medium">Type</th>
                                    <th className="text-left px-4 py-2 font-medium">Required</th>
                                    <th className="text-left px-4 py-2 font-medium">Description</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                  <tr><td className="px-4 py-2 font-mono text-xs">agent_id</td><td className="px-4 py-2">string</td><td className="px-4 py-2">Yes</td><td className="px-4 py-2 text-muted-foreground">Target agent identifier</td></tr>
                                  <tr><td className="px-4 py-2 font-mono text-xs">prompt</td><td className="px-4 py-2">string</td><td className="px-4 py-2">Yes</td><td className="px-4 py-2 text-muted-foreground">User input message</td></tr>
                                  <tr><td className="px-4 py-2 font-mono text-xs">stream</td><td className="px-4 py-2">boolean</td><td className="px-4 py-2">No</td><td className="px-4 py-2 text-muted-foreground">Enable streaming (default: true)</td></tr>
                                  <tr><td className="px-4 py-2 font-mono text-xs">context</td><td className="px-4 py-2">object</td><td className="px-4 py-2">No</td><td className="px-4 py-2 text-muted-foreground">Additional context data</td></tr>
                                  <tr><td className="px-4 py-2 font-mono text-xs">max_tokens</td><td className="px-4 py-2">integer</td><td className="px-4 py-2">No</td><td className="px-4 py-2 text-muted-foreground">Max response tokens (default: 1024)</td></tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                              <span className="h-5 w-5 rounded bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">R</span>
                              Response
                            </h5>
                            <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-50 overflow-x-auto">
                              <div className="absolute right-4 top-4 text-xs text-slate-400">JSON</div>
                              <pre>{`{
  "success": true,
  "data": {
    "id": "msg_xyz789",
    "agent_id": "agent_abc123",
    "content": "Based on the market analysis...",
    "tokens_used": 256,
    "model": "gpt-4-turbo",
    "created_at": "2024-01-15T10:35:00Z"
  },
  "usage": {
    "prompt_tokens": 45,
    "completion_tokens": 256,
    "total_tokens": 301
  }
}`}</pre>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  {/* GET /v1/agents/:id */}
                  <Collapsible defaultOpen={false}>
                    <Card className="overflow-hidden">
                      <CollapsibleTrigger className="w-full text-left">
                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-blue-500 hover:bg-blue-600">GET</Badge>
                              <code className="text-sm font-mono font-bold">/v1/agents/:id</code>
                            </div>
                            <p className="text-sm text-muted-foreground">Retrieve detailed information about a specific agent.</p>
                          </div>
                          <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-6">
                          <div>
                            <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                              <span className="h-5 w-5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xs">P</span>
                              Path Parameters
                            </h5>
                            <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-800">
                                  <tr>
                                    <th className="text-left px-4 py-2 font-medium">Parameter</th>
                                    <th className="text-left px-4 py-2 font-medium">Type</th>
                                    <th className="text-left px-4 py-2 font-medium">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr><td className="px-4 py-2 font-mono text-xs">id</td><td className="px-4 py-2">string</td><td className="px-4 py-2 text-muted-foreground">Unique agent identifier (e.g., agent_abc123)</td></tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                              <span className="h-5 w-5 rounded bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">R</span>
                              Response
                            </h5>
                            <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-50 overflow-x-auto">
                              <div className="absolute right-4 top-4 text-xs text-slate-400">JSON</div>
                              <pre>{`{
  "success": true,
  "data": {
    "id": "agent_abc123",
    "name": "Market Analysis Agent",
    "description": "AI-powered market analysis tool",
    "version": "2.1.0",
    "capabilities": ["analysis", "prediction", "reporting"],
    "pricing": {
      "model": "per_request",
      "base_cost": 0.002
    },
    "stats": {
      "total_requests": 15420,
      "avg_response_time": 1.2,
      "uptime": 99.9
    }
  }
}`}</pre>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {resource.accessModel === "AI Agent" ? (
                  /* Terms and Policies Content for Hosted Service / AI Agents */
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{t("Terms of Service", "이용약관")}</h2>
                          <p className="text-sm text-muted-foreground">{t("Please review the terms for using this service.", "서비스 이용을 위한 약관을 확인해주세요.")}</p>
                        </div>
                      </div>

                      <div className="prose prose-slate max-w-none dark:prose-invert">
                        <p>
                          {t("By accessing and using this AI Agent service, you agree to comply with the following terms and conditions. These terms govern your access to and use of the services provided.", "본 AI 에이전트 서비스에 접근하고 사용함으로써 귀하는 다음 이용약관을 준수할 것에 동의합니다. 이 약관은 제공된 서비스에 대한 귀하의 접근 및 사용을 규율합니다.")}
                        </p>
                        <ul>
                          <li>{t("Usage is limited to the scope defined in your subscription plan.", "사용은 구독 요금제에 정의된 범위로 제한됩니다.")}</li>
                          <li>{t("You may not resell or redistribute the service without explicit permission.", "명시적인 허가 없이 서비스를 재판매하거나 재배포할 수 없습니다.")}</li>
                          <li>{t("We reserve the right to modify or terminate the service for any reason, without notice at any time.", "우리는 언제든지 어떤 이유로든 통지 없이 서비스를 수정하거나 종료할 권리가 있습니다.")}</li>
                          <li>{t("You agree not to use the service for any illegal or unauthorized purpose.", "귀하는 불법적이거나 승인되지 않은 목적으로 서비스를 사용하지 않을 것에 동의합니다.")}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{t("Refund Policy", "환불 정책")}</h2>
                          <p className="text-sm text-muted-foreground">{t("Our policy regarding refunds and cancellations.", "환불 및 취소에 관한 정책입니다.")}</p>
                        </div>
                      </div>

                      <div className="prose prose-slate max-w-none dark:prose-invert">
                        <p>
                          {t("We want you to be satisfied with our service. If you are not completely happy, please review our refund policy below.", "우리는 귀하가 서비스에 만족하기를 바랍니다. 완전히 만족하지 않으시면 아래 환불 정책을 확인해주세요.")}
                        </p>
                        <p>
                          {t("You may request a full refund within 14 days of your initial purchase if the service usage does not exceed 10% of the allocated quota. Refund requests must be submitted via the support channel.", "서비스 사용량이 할당된 쿼터의 10%를 초과하지 않는 경우, 최초 구매일로부터 14일 이내에 전액 환불을 요청할 수 있습니다. 환불 요청은 지원 채널을 통해 제출해야 합니다.")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                         <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">{t("Licensing", "라이센싱")}</h2>
                          <p className="text-sm text-muted-foreground">{t("Details about the software license.", "소프트웨어 라이센스에 대한 세부 정보입니다.")}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">{t("Commercial License", "상용 라이센스")}</h4>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">Active</Badge>
                         </div>
                         <p className="text-sm text-muted-foreground mb-4">
                           {t("This license grants you the right to use the software for commercial purposes, including integration into your own products and services.", "이 라이센스는 귀하의 제품 및 서비스에 통합하는 것을 포함하여 상업적 목적으로 소프트웨어를 사용할 수 있는 권한을 부여합니다.")}
                         </p>
                         <div className="text-xs text-slate-500 font-mono bg-slate-100 dark:bg-slate-900 p-3 rounded">
                            License ID: LIC-2025-XXXX-YYYY
                         </div>
                      </div>
                    </div>
                  </div>
                ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {['Starter', 'Pro', 'Enterprise'].map((plan, i) => (
                    <Card key={plan} className={`relative ${i === 1 ? 'border-indigo-600 shadow-lg ring-1 ring-indigo-600' : ''}`}>
                      {i === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">{plan}</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold">${i * 49 + 29}</span>
                          <span className="text-muted-foreground">/mo</span>
                        </div>
                        <ul className="space-y-3 text-sm mb-6">
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> {i === 0 ? '1,000' : i === 1 ? '50,000' : 'Unlimited'} Requests</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> {i === 0 ? 'Standard' : 'Priority'} Support</li>
                          <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> {i > 0 ? 'Advanced' : 'Basic'} Analytics</li>
                          {i > 0 && <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> SLA Guarantee</li>}
                          {i > 1 && <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Custom Integration</li>}
                        </ul>
                        <Button className={`w-full ${i === 1 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : ''}`} variant={i === 1 ? 'default' : 'outline'}>
                          Choose {plan}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-foreground">4.8</div>
                      <div className="text-sm text-muted-foreground">out of 5</div>
                    </div>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                      <div className="h-full bg-amber-400 w-[85%]" />
                    </div>
                    <div className="text-sm text-muted-foreground">124 ratings</div>
                  </div>

                  {/* Review Writing Form - Visible for logged-in users */}
                  <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                        <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{t("Write a Review", "리뷰 작성")}</p>
                        <p className="text-xs text-muted-foreground">{t("Share your experience with this resource", "이 리소스에 대한 경험을 공유해주세요")}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} className="p-1 hover:scale-110 transition-transform" data-testid={`rating-star-${star}`}>
                          <Star className="h-5 w-5 text-slate-300 hover:text-amber-400 dark:text-slate-600" />
                        </button>
                      ))}
                      <span className="text-xs text-muted-foreground ml-2 self-center">{t("Click to rate", "클릭하여 평가")}</span>
                    </div>
                    <Textarea 
                      placeholder={t("Write your review here...", "리뷰 내용을 입력해주세요...")}
                      className="mb-3 resize-none bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-700"
                      rows={3}
                      data-testid="input-review"
                    />
                    <div className="flex justify-end">
                      <Button 
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                        data-testid="button-submit-review"
                        onClick={() => toast.success(t("Review submitted successfully!", "리뷰가 성공적으로 등록되었습니다!"))}
                      >
                        <Send className="h-4 w-4" />
                        {t("Submit Review", "리뷰 등록")}
                      </Button>
                    </div>
                  </div>

                  {/* Reviews List with Reply functionality */}
                  {[
                    { id: 1, user: "John Kim", date: "2 days ago", rating: 5, content: "This resource has significantly improved our workflow. The integration was straightforward and the documentation is excellent. Highly recommended for teams looking to scale.", hasReply: true, reply: { author: resource?.provider || "Publisher", content: "Thank you for your kind review! We're thrilled to hear that the integration was smooth. Let us know if you need any further assistance.", date: "1 day ago" } },
                    { id: 2, user: "Sarah Lee", date: "1 week ago", rating: 4, content: "Great product overall. The API is well-designed and the response times are impressive. Would love to see more documentation on advanced use cases.", hasReply: false },
                    { id: 3, user: "Mike Park", date: "2 weeks ago", rating: 5, content: "Excellent support and reliable service. We've been using it for 3 months now with zero downtime.", hasReply: false }
                  ].map((review) => (
                    <div key={review.id} className="border-b border-slate-100 pb-6 last:border-0 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{review.user}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-700'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {review.content}
                      </p>
                      
                      {/* Publisher Reply */}
                      {review.hasReply && review.reply && (
                        <div className="ml-6 mt-3 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20 border-l-2 border-indigo-500">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                              <Reply className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{review.reply.author}</span>
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-indigo-100 text-indigo-700 dark:bg-indigo-800/50 dark:text-indigo-300">Publisher</Badge>
                            <span className="text-xs text-muted-foreground">{review.reply.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{review.reply.content}</p>
                        </div>
                      )}
                      
                      {/* Reply Button for Owner (demo) */}
                      {!review.hasReply && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-muted-foreground hover:text-indigo-600 gap-1 mt-2"
                          data-testid={`button-reply-${review.id}`}
                          onClick={() => toast.info(t("Reply feature available for resource owners", "리소스 소유자만 답변을 남길 수 있습니다"))}
                        >
                          <Reply className="h-3 w-3" />
                          {t("Reply", "답변하기")}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Summary Card */}
            <Card className="shadow-sm border-slate-200 dark:border-slate-800 lg:sticky lg:top-24">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-heading font-bold text-lg">{t("Resource Details", "리소스 상세")}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">{t("Type", "유형")}</p>
                      <p className="font-medium flex items-center gap-2">
                        {resource.type === 'API' ? <Server className="h-4 w-4 text-slate-400" /> : 
                         resource.type === 'Agent' ? <Zap className="h-4 w-4 text-slate-400" /> : 
                         <Database className="h-4 w-4 text-slate-400" />}
                        {resource.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">{t("Published", "게시일")}</p>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        {resource.publishedDate}
                      </p>
                    </div>
                    
                    {resource.accessModel && (
                      <div>
                        <p className="text-muted-foreground mb-1">{t("Access Model", "접근 모델")}</p>
                        <Badge variant="outline" className="font-medium">{resource.accessModel}</Badge>
                      </div>
                    )}
                    
                    {resource.industry && (
                      <div>
                        <p className="text-muted-foreground mb-1">{t("Industry", "산업 분야")}</p>
                        <p className="font-medium">{resource.industry}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-muted-foreground mb-1">{t("License", "라이선스")}</p>
                      <p className="font-medium">Commercial</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">{t("Version", "버전")}</p>
                      <p className="font-medium">v2.4.1</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800" />
                
                {resource.socialLinks && Object.keys(resource.socialLinks).length > 0 && (
                  <>
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        {t("Social Presence", "소셜 미디어")}
                      </h4>
                      <div className="flex gap-2">
                        {resource.socialLinks.linkedin && (
                          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                            <a href={resource.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4 text-blue-700" />
                            </a>
                          </Button>
                        )}
                        {resource.socialLinks.twitter && (
                          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                            <a href={resource.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                              <Twitter className="h-4 w-4 text-sky-500" />
                            </a>
                          </Button>
                        )}
                        {resource.socialLinks.github && (
                          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                            <a href={resource.socialLinks.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {resource.socialLinks.discord && (
                          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                            <a href={resource.socialLinks.discord} target="_blank" rel="noopener noreferrer">
                              <MessageSquare className="h-4 w-4 text-indigo-500" />
                            </a>
                          </Button>
                        )}
                        {resource.socialLinks.telegram && (
                          <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                            <a href={resource.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                              <MessageSquare className="h-4 w-4 text-blue-400" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="h-px bg-slate-100 dark:bg-slate-800" />
                  </>
                )}

                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {t("Tags", "태그")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map(tag => (
                       <Badge key={tag} variant="secondary" className="font-normal bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                         {tag}
                       </Badge>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm text-xl font-bold text-indigo-600 dark:bg-slate-800">
                      {resource.provider.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{resource.provider}</p>
                      <p className="text-xs text-muted-foreground">Verified Publisher</p>
                      {resource.contactEmail && (
                         <p className="text-xs text-muted-foreground mt-0.5">{resource.contactEmail}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs h-8" asChild>
                    <a href={resource.websiteUrl || `https://${resource.provider.toLowerCase().replace(/\s+/g, '')}.com`} target="_blank" rel="noopener noreferrer">
                      {t("Visit Website", "웹사이트 방문")}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

