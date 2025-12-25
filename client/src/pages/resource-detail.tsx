import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES } from "@/lib/data";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CreditCard
} from "lucide-react";
import heroBg from "@assets/generated_images/hero_background_with_connecting_data_streams.png";
import { useLanguage } from "@/lib/language-context";

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
                  value="pricing" 
                  className="rounded-none border-b-2 border-transparent px-6 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400"
                >
                  {t("Pricing", "요금")}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {displayUseCases.map((useCase, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3.5 rounded-lg bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100/50 dark:border-blue-800/30">
                            <Check className="h-4 w-4 text-blue-500 shrink-0" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{useCase}</span>
                          </div>
                        ))}
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

              <TabsContent value="documentation" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Quick Start
                    </h3>
                    <Badge variant="outline">v2.1.0</Badge>
                  </div>
                  <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50">
                    <div className="absolute right-4 top-4 text-xs text-slate-400">BASH</div>
                    <p className="mb-2 text-slate-400"># Install the SDK</p>
                    <p className="mb-4">npm install @em-data/sdk</p>
                    <p className="mb-2 text-slate-400"># Initialize client</p>
                    <p>
                      <span className="text-purple-400">const</span> client = <span className="text-blue-400">new</span> EMDataClient({"{"}
                      <br/>&nbsp;&nbsp;apiKey: <span className="text-green-400">'YOUR_API_KEY'</span>
                      <br/>{"}"});
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <h3 className="font-bold">Endpoints</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-blue-500 hover:bg-blue-600">GET</Badge>
                        <code className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded dark:bg-slate-800">/v1/resources/list</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Retrieve a paginated list of available resources matching the filter criteria.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-green-500 hover:bg-green-600">POST</Badge>
                        <code className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded dark:bg-slate-800">/v1/agents/interact</code>
                      </div>
                      <p className="text-sm text-muted-foreground">Send a prompt to the AI agent and receive a streamed response.</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
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

                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-slate-100 pb-6 last:border-0 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                          <div>
                            <p className="text-sm font-medium">User {review}</p>
                            <p className="text-xs text-muted-foreground">2 days ago</p>
                          </div>
                        </div>
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This resource has significantly improved our workflow. The integration was straightforward and the documentation is excellent. Highly recommended for teams looking to scale.
                      </p>
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
                      {resource.founder && (
                         <p className="text-xs text-muted-foreground mt-0.5">Founder: {resource.founder}</p>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-xs h-8" asChild>
                    <Link href={`/publisher/${encodeURIComponent(resource.provider)}`}>
                      View Publisher Profile
                    </Link>
                  </Button>
                  
                  {resource.contactEmail && (
                    <Button variant="ghost" size="sm" className="w-full text-xs h-8 mt-2" asChild>
                      <a href={`mailto:${resource.contactEmail}`}>
                        Contact Publisher
                      </a>
                    </Button>
                  )}
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

