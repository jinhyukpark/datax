import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Mail, 
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
import greenTechPreview1 from "@assets/preview-green-1.jpg";
import greenTechPreview2 from "@assets/preview-green-2.jpg";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { toast } from "sonner";
import { Send, Reply, User, ChevronDown } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Review } from "@shared/schema";
import { RESOURCES, type Resource } from "@/lib/data";
import { DialogDescription } from "@/components/ui/dialog";

function getYoutubeEmbedUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return null;
}

function isYoutubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/.test(url);
}

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
  const { language, t } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({
    title: '',
    type: '',
    content: '',
    contact: ''
  });
  const [supportSubmitting, setSupportSubmitting] = useState(false);
  const [demoVideoOpen, setDemoVideoOpen] = useState(false);
  const [purchaseCheckOpen, setPurchaseCheckOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Try to fetch from API, but fall back to mock data
  const { data: apiResource, isLoading } = useQuery<Resource>({
    queryKey: [`/api/resources/${params?.id}`],
    enabled: !!params?.id,
  });

  // Fall back to mock data if API returns nothing
  const resource = apiResource || RESOURCES.find(r => r.id === params?.id);

  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: [`/api/resources/${params?.id}/reviews`],
    enabled: !!params?.id,
  });

  // Use mock reviews from resource if available, or API reviews
  const mockReviews = resource?.reviews || [];
  const displayReviews = reviews.length > 0 
    ? reviews.map(review => ({ ...review, id: review.id.toString() }))
    : mockReviews;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? t("Removed from favorites", "즐겨찾기에서 제거되었습니다") : t("Added to favorites", "즐겨찾기에 추가되었습니다"));
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!resource) return <div className="flex items-center justify-center min-h-screen">Resource not found</div>;

  const providerName = resource.provider;

  const displayTitle = language === '한국어' && resource.titleKo ? resource.titleKo : resource.title;
  const displayDesc = language === '한국어' && resource.descriptionKo ? resource.descriptionKo : resource.description;
  const displayTagline = language === '한국어' && resource.taglineKo ? resource.taglineKo : resource.tagline;
  const displayFeatures = language === '한국어' && resource.featuresKo ? (resource.featuresKo as string[]) : (resource.features as string[] || []);
  const displayUseCases = language === '한국어' && resource.useCasesKo ? (resource.useCasesKo as string[]) : (resource.useCases as string[] || []);

  const previewImages = [
    { src: greenTechPreview1, label: "Preview 1", views: resource.views || 0 },
    { src: greenTechPreview2, label: "Preview 2", views: Math.floor((resource.views || 0) * 0.85) },
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
                  "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 border-emerald-200"
                )}>
                  {resource.price === 'Paid' ? (
                    <>
                      <Server className="mr-1 h-3 w-3" />
                      {t("Hosting", "Hosting")}
                    </>
                  ) : (
                    <>
                      <LinkIcon className="mr-1 h-3 w-3" />
                      {t("Linked", "Linked")}
                    </>
                  )}
                </Badge>
                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700">
                  {resource.type.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  {resource.provider}
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-amber-500">
                  {displayReviews.length > 0 ? (
                    <>
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{(displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length).toFixed(1)}</span>
                      <span className="text-muted-foreground font-normal">({displayReviews.length} reviews)</span>
                    </>
                  ) : (
                    <>
                      <Star className="h-3.5 w-3.5 text-slate-300" />
                      <span className="text-muted-foreground font-normal">{t("No reviews", "리뷰 없음")}</span>
                    </>
                  )}
                  <button 
                    onClick={toggleFavorite}
                    className={cn(
                      "ml-4 flex items-center gap-1.5 px-2 py-1 rounded-md transition-all duration-300",
                      isFavorite 
                        ? "text-pink-600 dark:text-pink-400" 
                        : "text-slate-400 hover:text-pink-500 dark:text-slate-500 dark:hover:text-pink-400"
                    )}
                    aria-label={t("Toggle Favorite", "즐겨찾기 토글")}
                  >
                    <Heart className={cn("h-4.5 w-4.5 stroke-[2.5px]", isFavorite && "fill-current")} />
                    <span className="text-xs font-semibold uppercase tracking-tight">{t("Favorite", "즐겨찾기")}</span>
                  </button>
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
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800">
                    <div className="text-xs font-semibold text-indigo-600/70 dark:text-indigo-400/70 uppercase tracking-wider mb-1">
                      {resource.priceAmount === "Free" ? t("Price", "가격") : t("Subscription", "구독 요금")}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                        {resource.priceAmount === "Free" ? t("Free", "무료") : (resource.priceAmount || "$78.00")}
                      </span>
                      {resource.priceAmount !== "Free" && (
                        <span className="text-sm text-indigo-600/60 dark:text-indigo-400/60">/mo</span>
                      )}
                    </div>
                  </div>
                  {resource.type === "Dataset" && resource.price === "Paid" ? (
                    <Button
                      size="lg"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20"
                      onClick={() => setPurchaseCheckOpen(true)}
                      data-testid="button-purchase-hosting"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t("Purchase", "구매하기")}
                    </Button>
                  ) : (
                    <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20" asChild>
                      <a href={resource.websiteUrl || "#"} target="_blank" rel="noopener noreferrer">
                        {resource.priceAmount === "Free" ? (
                          <>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {t("Get Started", "시작하기")}
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            {t("Purchase", "구매하기")}
                          </>
                        )}
                      </a>
                    </Button>
                  )}
                </div>
              ) : (
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20" asChild>
                  <a href={resource.websiteUrl || resource.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("Access Resource", "리소스 접근")}
                  </a>
                </Button>
              )}
              {resource.demoUrl && (
                resource.demoUrl && isYoutubeUrl(resource.demoUrl) ? (
                  <Button variant="outline" className="border-slate-200 dark:border-slate-800" onClick={() => setDemoVideoOpen(true)} data-testid="button-view-demo">
                    <Eye className="mr-2 h-4 w-4" />
                    {t("View Demo", "데모 보기")}
                  </Button>
                ) : (
                  <Button variant="outline" className="border-slate-200 dark:border-slate-800" asChild data-testid="button-view-demo">
                    <a href={resource.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="mr-2 h-4 w-4" />
                      {t("View Demo", "데모 보기")}
                    </a>
                  </Button>
                )
              )}
              
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
                  value="terms-pricing" 
                  className="rounded-none border-b-2 border-transparent px-6 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                >
                  {resource.price === 'Paid' ? t("Terms & Policies", "이용약관 및 정책") : t("Pricing", "요금")}
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews" 
                  className="rounded-none border-b-2 border-transparent px-6 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                >
                  {t("Reviews", "리뷰")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* MCP Sample Prompts Section */}
                {resource.type === "Agent" && (
                  <div className="not-prose mb-8">
                    <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border border-indigo-100 dark:border-indigo-900/50 p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{t("Try asking...", "이렇게 물어보세요...")}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{t("Example conversations with this MCP", "이 MCP와의 대화 예시")}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(language === '한국어' && resource.samplePromptsKo ? resource.samplePromptsKo : resource.samplePrompts || [
                          t("How can you help me?", "어떻게 도와줄 수 있어?"),
                          t("What are your main capabilities?", "주요 기능이 뭐야?"),
                          t("Show me an example", "예시를 보여줘"),
                          t("Get started with a demo", "데모로 시작하기")
                        ]).slice(0, 5).map((prompt, idx) => (
                          <button
                            key={idx}
                            className="group flex items-center gap-3 p-4 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all text-left"
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                              <span className="text-sm font-bold">{idx + 1}</span>
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              "{prompt}"
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

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
                    {resource.quickStartGuide && resource.quickStartGuide.steps.length > 0 && (
                      <Badge variant="outline">v2.1.0</Badge>
                    )}
                  </div>

                  {resource.quickStartGuide && resource.quickStartGuide.steps.length > 0 ? (
                    resource.quickStartGuide.steps.map((step, index) => {
                      const colors = [
                        { bg: 'bg-indigo-100 dark:bg-indigo-900/50', text: 'text-indigo-600 dark:text-indigo-400', descBg: 'bg-blue-50 dark:bg-blue-900/20', descBorder: 'border-blue-100 dark:border-blue-800', descText: 'text-blue-700 dark:text-blue-300' },
                        { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-600 dark:text-yellow-400', descBg: 'bg-yellow-50 dark:bg-yellow-900/20', descBorder: 'border-yellow-100 dark:border-yellow-800', descText: 'text-yellow-700 dark:text-yellow-300' },
                        { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-600 dark:text-green-400', descBg: 'bg-green-50 dark:bg-green-900/20', descBorder: 'border-green-100 dark:border-green-800', descText: 'text-green-700 dark:text-green-300' },
                        { bg: 'bg-blue-100 dark:bg-blue-900/50', text: 'text-blue-600 dark:text-blue-400', descBg: 'bg-blue-50 dark:bg-blue-900/20', descBorder: 'border-blue-100 dark:border-blue-800', descText: 'text-blue-700 dark:text-blue-300' },
                        { bg: 'bg-purple-100 dark:bg-purple-900/50', text: 'text-purple-600 dark:text-purple-400', descBg: 'bg-purple-50 dark:bg-purple-900/20', descBorder: 'border-purple-100 dark:border-purple-800', descText: 'text-purple-700 dark:text-purple-300' },
                      ];
                      const color = colors[index % colors.length];
                      return (
                        <div key={index} className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`h-8 w-8 rounded-full ${color.bg} flex items-center justify-center ${color.text} font-bold text-sm`}>{index + 1}</div>
                            <h4 className="font-bold">{step.title}</h4>
                          </div>
                          <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50 overflow-x-auto">
                            <div className="absolute right-4 top-4 text-xs text-slate-400">{step.codeLanguage}</div>
                            <pre className="whitespace-pre-wrap">{step.code}</pre>
                          </div>
                          {step.description && (
                            <div className={`mt-4 p-3 ${color.descBg} rounded-lg border ${color.descBorder}`}>
                              <p className={`text-sm ${color.descText}`}>{step.description}</p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    /* Empty state: no guide notice + official docs links in one card */
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                      {/* Top: notice */}
                      <div className="flex flex-col items-center gap-3 bg-slate-50 dark:bg-slate-900/40 px-8 py-8 text-center border-b border-slate-200 dark:border-slate-700">
                        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Terminal className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">등록된 퀵스타트 가이드가 없습니다</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 leading-relaxed">
                            서비스 제공자가 아직 퀵스타트 가이드를 등록하지 않았습니다.<br />
                            아래 공식 문서에서 각 플랫폼의 MCP 연동 방법을 직접 확인하세요.
                          </p>
                        </div>
                      </div>
                      {/* Bottom: official doc links */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-900/20">
                        <a
                          href="https://platform.openai.com/docs/guides/tools-remote-mcp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 px-6 py-5 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors group"
                        >
                          <div className="h-10 w-10 shrink-0 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-lg">🤖</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">ChatGPT MCP 공식 가이드</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">OpenAI 공식 문서 →</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-green-500 transition-colors shrink-0" />
                        </a>
                        <a
                          href="https://docs.anthropic.com/en/docs/agents-and-tools/mcp"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 px-6 py-5 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-colors group"
                        >
                          <div className="h-10 w-10 shrink-0 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-lg">🧠</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">Claude MCP 공식 가이드</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Anthropic 공식 문서 →</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-orange-400 transition-colors shrink-0" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* API Definitions Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Code className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                    <h3 className="text-xl font-bold">API Definitions</h3>
                  </div>

                  {resource.apiDefinitions && resource.apiDefinitions.apis.length > 0 ? (
                    <div className="space-y-4">
                      {resource.apiDefinitions.apis.map((api, index) => (
                        <div key={index} className="rounded-xl bg-slate-900 p-5 space-y-4">
                          <h4 className="font-mono font-bold text-white text-base">{api.name}</h4>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">용도</p>
                            <p className="text-sm text-slate-200 leading-relaxed">{api.description}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-2">파라미터</p>
                            {api.parameters && api.parameters.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {api.parameters.map((p, i) => (
                                  <span key={i} className="inline-flex items-center px-3 py-1.5 bg-slate-700 rounded-full text-xs font-mono text-slate-300">
                                    {p.name}: {p.type}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-xs text-slate-500 italic">No parameters required</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 p-10 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Code className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No API Definitions available</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">The provider has not added API definitions for this service yet.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Full Documentation Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-xl font-bold">Full Documentation</h3>
                  </div>

                  {resource.fullDocumentation ? (
                    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50/50 to-white p-6 dark:border-slate-800 dark:from-slate-900/50 dark:to-slate-950">
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                        {resource.fullDocumentation.description}
                      </p>
                      <a href={resource.fullDocumentation.url} target="_blank" rel="noopener noreferrer">
                        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                          <ExternalLink className="h-4 w-4" />
                          {resource.fullDocumentation.buttonText}
                        </Button>
                      </a>
                    </div>
                  ) : (
                    <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 p-10 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No Full Documentation available</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">The provider has not added full documentation for this service yet.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </TabsContent>

              <TabsContent value="terms-pricing" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {resource.price === 'Paid' ? (
                  (resource.termsOfService || resource.providedServices || resource.pricingPlans) ? (
                  <div className="space-y-10">
                    {/* Detailed Terms - Now at the top with enhanced design */}
                    <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-8 shadow-sm dark:border-indigo-900/20 dark:from-indigo-900/10 dark:to-slate-950">
                      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-indigo-100/20 blur-3xl dark:bg-indigo-900/10" />
                      
                      <div className="relative flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm dark:bg-indigo-900 dark:text-indigo-400">
                            <ShieldCheck className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-indigo-950 dark:text-indigo-100">{t("Detailed Terms of Service", "상세 이용약관")}</h3>
                            <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70">{t("Last updated: June 2025", "최종 업데이트: 2025년 6월")}</p>
                          </div>
                        </div>
                        
                        <div className="rounded-2xl bg-white/80 backdrop-blur-md p-6 border border-indigo-50/50 shadow-inner dark:bg-slate-900/80 dark:border-indigo-900/30">
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line text-sm md:text-base italic">
                            {resource.termsOfService || t("By using this service, you agree to our terms and conditions. We reserve the right to modify these terms at any time. This agreement outlines the terms and conditions for the provision of hosted data services on the Illunex Platform.", "본 서비스를 이용함으로써 귀하는 당사의 이용약관에 동의하게 됩니다. 당사는 언제든지 본 약관을 수정할 권리를 보유합니다. 본 계약은 Illunex 플랫폼에서 제공되는 호스팅 데이터 서비스의 제공에 관한 약관을 규정합니다.")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{t("Service Guidelines", "서비스 가이드라인")}</h4>
                        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
                      </div>
                      
                      {/* Modern List Layout */}
                      <div className="grid grid-cols-1 gap-4">
                        {/* Provided Services */}
                        <div className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-indigo-900/50">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform dark:bg-blue-900/30 dark:text-blue-400">
                            <Zap className="h-6 w-6" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{t("Provided Services", "제공 서비스")}</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                              {(displayFeatures && displayFeatures.length > 0 ? displayFeatures : [t("Enterprise-grade data analysis", "엔터프라이즈급 데이터 분석"), t("REST API access", "REST API 접근")]).map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Provided Period */}
                        <div className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-purple-900/50">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform dark:bg-purple-900/30 dark:text-purple-400">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{t("Service Period", "제공 기간")}</h3>
                            <ul className="space-y-3">
                              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                <span>{t("Monthly subscription with automatic renewal", "매월 자동 갱신되는 월간 구독 서비스")}</span>
                              </li>
                              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                <span>{t("Service available immediately upon payment", "결제 즉시 서비스 이용 가능")}</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* License & Pricing Details */}
                        <div className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-amber-200 hover:shadow-md transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-amber-900/50">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform dark:bg-amber-900/30 dark:text-amber-400">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{t("License & Pricing", "라이선스 및 가격 정보")}</h3>
                            <ul className="space-y-3">
                              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                <span>{t("Commercial License: Business use permitted", "상업용 라이선스: 비즈니스 용도 사용 가능")}</span>
                              </li>
                              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                <div className="flex items-baseline gap-2">
                                  <span className="font-bold text-indigo-700 dark:text-indigo-300">
                                    {t("Monthly Fee", "월 이용료")}: {resource.priceAmount || "$78.00"}
                                  </span>
                                  <span className="text-xs text-slate-400">(Billed monthly)</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Refund Policy */}
                        <div className="group flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:border-emerald-900/50">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform dark:bg-emerald-900/30 dark:text-emerald-400">
                            <CheckCircle2 className="h-6 w-6" />
                          </div>
                          <div className="flex-1 space-y-3">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{t("Refund Policy", "환불 정책")}</h3>
                            <ul className="space-y-3">
                              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                <span>{t("Full refund within 7 days if service not accessed", "서비스 미사용 시 7일 이내 전액 환불")}</span>
                              </li>
                              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                                <span>{t("Pro-rated refund available for annual plans", "연간 플랜의 경우 잔여 기간에 대한 부분 환불 가능")}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Terms of Service Empty State */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="h-5 w-5 text-indigo-600" />
                          <h3 className="text-xl font-bold">{t("Terms of Service", "이용약관")}</h3>
                        </div>
                        <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 p-10 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <ShieldCheck className="h-6 w-6 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("No Terms of Service available", "이용약관이 등록되지 않았습니다")}</p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t("The provider has not added terms of service for this resource yet.", "제공자가 아직 이 서비스에 대한 이용약관을 등록하지 않았습니다.")}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Service Guidelines Empty State */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-blue-600" />
                          <h3 className="text-xl font-bold">{t("Service Guidelines", "서비스 가이드라인")}</h3>
                        </div>
                        <div className="rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 p-10 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                              <Zap className="h-6 w-6 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t("No Service Guidelines available", "서비스 가이드라인이 등록되지 않았습니다")}</p>
                              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{t("Service details such as provided services, pricing, and refund policies have not been configured yet.", "제공 서비스, 가격 정책, 환불 정책 등의 세부 사항이 아직 등록되지 않았습니다.")}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="space-y-8">
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900/50">
                      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-green-900/20 mb-6">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">Free Forever</h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                        This resource is part of our open data initiative and is free to use for both personal and commercial projects.
                      </p>
                      <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 px-8" asChild>
                         <a href={resource.websiteUrl || resource.demoUrl || "#"} target="_blank" rel="noopener noreferrer">
                          {t("Get Started Now", "지금 시작하기")}
                         </a>
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews" className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {displayReviews.length > 0 ? (
                  <>
                    {/* Header Section */}
                    <div className="flex flex-col gap-0.5 max-w-4xl">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="text-4xl font-bold text-slate-900 dark:text-white leading-none">
                            {(displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length).toFixed(1)}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium mt-1">out of 5</span>
                        </div>
                        <div className="flex-1 flex items-center gap-3">
                          <div className="relative h-2 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                            <div className="absolute left-0 top-0 h-full bg-amber-400 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.4)]" style={{ width: `${(displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length / 5) * 100}%` }}></div>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{displayReviews.length} {displayReviews.length === 1 ? 'rating' : 'ratings'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Write Review Section */}
                    <div className="p-6 rounded-[24px] bg-slate-50/80 border border-slate-200 shadow-sm dark:bg-slate-900/40 dark:border-slate-800">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-base">{t("Write a Review", "리뷰 작성")}</h4>
                            <p className="text-xs text-slate-500">{t("Share your experience with this resource", "이 서비스에 대한 경험을 공유해 주세요")}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1 text-slate-200">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 hover:text-amber-400 cursor-pointer transition-colors" />)}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium mr-1">{t("Click to rate", "클릭하여 평가")}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Textarea 
                          placeholder={t("Write your review here...", "리뷰를 작성해 주세요...")}
                          className="min-h-[100px] rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 text-sm" 
                        />
                        
                        <div className="flex justify-end">
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-2.5 h-auto text-sm font-bold shadow-lg shadow-indigo-100 dark:shadow-none">
                            <Send className="mr-2 h-4 w-4" />
                            {t("Submit Review", "리뷰 등록")}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-8 mt-12">
                      {displayReviews.map((review) => (
                    <div key={review.id} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold dark:bg-slate-800 text-sm">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-900 dark:text-white leading-tight text-sm">{review.user}</h5>
                            <p className="text-[11px] text-slate-400">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {review.comment}
                      </p>

                      {review.reply && (
                        <div className="mt-3 ml-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 dark:bg-slate-900/40 dark:border-slate-800/50 relative overflow-hidden">
                          {/* Colored accent line on the left */}
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500"></div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Reply className="h-3 w-3 text-indigo-500 rotate-180" />
                              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{providerName}</span>
                              <Badge className="bg-indigo-100 text-indigo-700 text-[8px] h-3.5 px-1 dark:bg-indigo-900/40 dark:text-indigo-300">Publisher</Badge>
                              <span className="text-[10px] text-slate-400">{review.replyDate || '1 day ago'}</span>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {review.reply}
                          </p>
                        </div>
                      )}

                      {!review.reply && (
                        <div className="flex items-center gap-1.5 group cursor-pointer w-fit">
                          <Reply className="h-3 w-3 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                          <span className="text-[11px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">Reply</span>
                        </div>
                      )}
                    </div>
                  ))}
                    </div>
                  </>
                ) : (
                  <div className="space-y-8">
                    {/* Empty Reviews State */}
                    <div className="rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 py-16 px-8 text-center">
                      <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
                        <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <MessageSquare className="h-8 w-8 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">{t("No Reviews Yet", "아직 리뷰가 없습니다")}</p>
                          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 leading-relaxed">
                            {t("Be the first to share your experience with this service. Your feedback helps others make informed decisions.", "이 서비스에 대한 경험을 처음으로 공유해 주세요. 여러분의 피드백은 다른 사용자들의 선택에 도움이 됩니다.")}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {[1, 2, 3, 4, 5].map(i => (
                            <Star key={i} className="h-6 w-6 text-slate-200 dark:text-slate-700" />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Write Review Section (still shown in empty state) */}
                    <div className="p-6 rounded-[24px] bg-slate-50/80 border border-slate-200 shadow-sm dark:bg-slate-900/40 dark:border-slate-800">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-base">{t("Write the First Review", "첫 리뷰를 작성해 주세요")}</h4>
                            <p className="text-xs text-slate-500">{t("Share your experience with this resource", "이 서비스에 대한 경험을 공유해 주세요")}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center gap-1 text-slate-200">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-5 w-5 hover:text-amber-400 cursor-pointer transition-colors" />)}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium mr-1">{t("Click to rate", "클릭하여 평가")}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Textarea 
                          placeholder={t("Write your review here...", "리뷰를 작성해 주세요...")}
                          className="min-h-[100px] rounded-xl border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 text-sm" 
                        />
                        
                        <div className="flex justify-end">
                          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-6 py-2.5 h-auto text-sm font-bold shadow-lg shadow-indigo-100 dark:shadow-none">
                            <Send className="mr-2 h-4 w-4" />
                            {t("Submit Review", "리뷰 등록")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Resource Metadata Card */}
            <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
              <CardContent className="p-0">
                <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
                  <h3 className="font-bold text-foreground">Resource Details</h3>
                </div>
                <div className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-y-5">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</p>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Database className="h-3.5 w-3.5 text-indigo-500" />
                        {resource.type.toUpperCase()}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Published</p>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                        2025-07-13
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Access Model</p>
                      <Badge variant="secondary" className="font-bold text-[10px] uppercase">{resource.type}</Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Industry</p>
                      <p className="text-sm font-semibold">Horizontal</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">License</p>
                      <p className="text-sm font-semibold">Commercial</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Version</p>
                      <p className="text-sm font-semibold">v2.4.1</p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Social Presence</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-200 hover:border-blue-400 hover:text-blue-500 dark:border-slate-800">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-200 hover:border-sky-400 hover:text-sky-500 dark:border-slate-800">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-200 hover:border-slate-900 hover:text-slate-900 dark:border-slate-800">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {["Analysis", "Social", "Trend", "Marketing", "Data"].map(tag => (
                        <Badge key={tag} variant="outline" className="bg-slate-50/50 text-slate-600 dark:bg-slate-800/30 dark:text-slate-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Provider Info Card */}
            <Card className="overflow-hidden border-slate-200 shadow-sm dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl dark:bg-indigo-900/30 dark:text-indigo-400">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Social Trend Co.</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-green-500" />
                      Verified Publisher
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Social Trend Co. is a leading provider of real-time social data analytics, helping businesses understand market sentiment and consumer behavior.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <Globe className="h-3.5 w-3.5 text-slate-400" />
                      socialtrend.com
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      contact@socialtrend.com
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-slate-200 dark:border-slate-800" asChild>
                    <a href={resource.websiteUrl || "#"} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Support Information */}
            <div className="p-6 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/30">
              <h4 className="font-bold mb-2">Need help?</h4>
              <p className="text-sm text-indigo-100 mb-4 leading-relaxed">
                Our support team is available 24/7 to help you with any integration issues.
              </p>
              <Button 
                className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold border-none"
                onClick={() => setSupportDialogOpen(true)}
              >
                Contact Support
              </Button>
            </div>

            {/* Contact Support Dialog */}
            <Dialog open={supportDialogOpen} onOpenChange={setSupportDialogOpen}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-xl">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-indigo-600" />
                    </div>
                    관리자에게 도움 요청
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label className="font-medium">제목 <span className="text-red-500">*</span></Label>
                    <Input
                      value={supportForm.title}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="요청 제목을 입력하세요"
                      data-testid="input-support-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">도움 요청 타입 <span className="text-red-500">*</span></Label>
                    <Select value={supportForm.type} onValueChange={(val) => setSupportForm(prev => ({ ...prev, type: val }))}>
                      <SelectTrigger data-testid="select-support-type">
                        <SelectValue placeholder="요청 타입을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="integration">Integration 문의</SelectItem>
                        <SelectItem value="bug">버그 리포트</SelectItem>
                        <SelectItem value="billing">결제 / 구독 문의</SelectItem>
                        <SelectItem value="feature">기능 요청</SelectItem>
                        <SelectItem value="general">일반 문의</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">내용 <span className="text-red-500">*</span></Label>
                    <Textarea
                      value={supportForm.content}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="도움이 필요한 내용을 상세히 작성해주세요"
                      className="min-h-[120px]"
                      data-testid="textarea-support-content"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-medium">연락받을 이메일 또는 연락처 <span className="text-red-500">*</span></Label>
                    <Input
                      value={supportForm.contact}
                      onChange={(e) => setSupportForm(prev => ({ ...prev, contact: e.target.value }))}
                      placeholder="이메일 또는 전화번호를 입력하세요"
                      data-testid="input-support-contact"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSupportDialogOpen(false)}>취소</Button>
                  <Button 
                    disabled={!supportForm.title || !supportForm.type || !supportForm.content || !supportForm.contact || supportSubmitting}
                    onClick={() => {
                      setSupportSubmitting(true);
                      setTimeout(() => {
                        setSupportSubmitting(false);
                        setSupportDialogOpen(false);
                        setSupportForm({ title: '', type: '', content: '', contact: '' });
                        toast.success('도움 요청이 성공적으로 전송되었습니다. 관리자가 확인 후 연락드리겠습니다.');
                      }, 1000);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                    data-testid="button-support-submit"
                  >
                    {supportSubmitting ? "전송 중..." : "Submit"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* ── Purchase Check Modal (Hosting Dataset only) ── */}
      <Dialog open={purchaseCheckOpen} onOpenChange={setPurchaseCheckOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              관리자 협의 확인
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-4">
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 space-y-2">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <Info className="h-4 w-4 shrink-0" />
                Hosting 데이터 구매 안내
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
                관리자와의 메일을 통한 협의를 통해 <strong>데이터 필드 범위, 데이터 수량, 기간 및 조건, 제공 방식</strong> 등을 확정한 뒤, 데이터 생성 및 전달이 진행됩니다.
              </p>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium text-center pt-1">
              관리자와 메일 협의가 완료되셨나요?
            </p>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
              data-testid="button-purchase-check-confirmed"
              onClick={() => {
                setPurchaseCheckOpen(false);
                setPaymentModalOpen(true);
              }}
            >
              <CheckCircle2 className="h-4 w-4" />
              협의가 완료되었습니다 — 결제하기
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              data-testid="button-purchase-check-no-email"
              onClick={() => {
                setPurchaseCheckOpen(false);
                setSupportForm({ title: `[데이터 구매 협의] ${resource.title}`, type: 'general', content: '', contact: '' });
                setSupportDialogOpen(true);
              }}
            >
              <Mail className="h-4 w-4" />
              아직 메일을 보내지 않았습니다
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Payment Modal ── */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0">
                <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              결제
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-4">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{resource.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{resource.provider}</p>
                </div>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  {resource.priceAmount || "협의 금액"}
                </span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700" />
              <p className="text-xs text-muted-foreground">
                관리자 협의 내용에 따라 최종 금액이 결정됩니다. 결제 후 데이터 생성 및 전달이 진행됩니다.
              </p>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">카드 번호</Label>
                <Input placeholder="0000 0000 0000 0000" data-testid="input-card-number" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">유효기간</Label>
                  <Input placeholder="MM / YY" data-testid="input-card-expiry" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">CVC</Label>
                  <Input placeholder="000" data-testid="input-card-cvc" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">카드 소유자 이름</Label>
                <Input placeholder="이름을 입력하세요" data-testid="input-card-holder" />
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button variant="outline" onClick={() => setPaymentModalOpen(false)} className="sm:flex-1">취소</Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white gap-2 sm:flex-1"
              data-testid="button-payment-submit"
              onClick={() => {
                setPaymentModalOpen(false);
                toast.success('결제가 완료되었습니다. 데이터 생성 및 전달이 시작됩니다.');
              }}
            >
              <CreditCard className="h-4 w-4" />
              결제 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* YouTube Demo Video Popup */}
      {resource.demoUrl && isYoutubeUrl(resource.demoUrl) && (
        <Dialog open={demoVideoOpen} onOpenChange={(open) => { setDemoVideoOpen(open); }}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none rounded-2xl" data-testid="dialog-demo-video">
            <DialogHeader className="sr-only">
              <DialogTitle>{resource.title} - Demo</DialogTitle>
              <DialogDescription>Demo video for {resource.title}</DialogDescription>
            </DialogHeader>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {demoVideoOpen && (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={getYoutubeEmbedUrl(resource.demoUrl!) || ''}
                  title={`${resource.title} Demo Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  frameBorder="0"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      <Footer />
    </div>
  );
}
