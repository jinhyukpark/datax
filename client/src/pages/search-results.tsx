import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, Database, Newspaper, Sparkles, ExternalLink, ArrowRight, Loader2, Cpu, Send, Target, Lightbulb, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/language-context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";
import TextareaAutosize from "react-textarea-autosize";

export default function SearchResultsPage() {
  const { t } = useLanguage();
  const [location, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Parse query from URL
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q") || "";
  
  const [followUpQuery, setFollowUpQuery] = useState(query);

  useEffect(() => {
    if (query) {
      setFollowUpQuery(query);
      setIsLoading(true);
      // Simulate AI processing time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  const handleFollowUpSearch = () => {
    if (followUpQuery.trim() && followUpQuery !== query) {
        setLocation(`/search?q=${encodeURIComponent(followUpQuery)}`);
    }
  };

  // Mock Data for Results
  const aiSummary = t(
    `### **1. AI 인사이트 및 활용 가이드**
    
**"${query}"**에 대한 분석 결과를 바탕으로, 아래에 추천해 드린 리소스들을 어떻게 활용하면 좋은지 정리해 드립니다.

*   먼저, 하단에 추천된 **Financial Data Analyzer** MCP를 활용하시면 실시간 시장 데이터를 빠르게 수집하고 분석 모델을 돌려보실 수 있습니다.
*   특히, **Global Market Trends** 에이전트와 함께 사용하면 거시적인 시장 흐름과 미시적인 금융 데이터를 교차 검증하여 더욱 정교한 예측이 가능해집니다.

### **2. 데이터 통합 전략**

**관련 데이터** 섹션에 있는 'Global EV Sales 2024' 데이터셋은 현재 전기차 시장의 수요 예측에 핵심적인 지표가 될 수 있습니다.
여기에 'Consumer Sentiment Index' API를 연동하여 소비자들의 심리 지수까지 반영한다면 분석의 정확도를 약 **40% 이상 향상**시킬 수 있을 것으로 예상됩니다.

### **3. 참고 문헌 활용**

**뉴스 및 인사이트**에 추천된 테크 데일리(TechDaily)의 기사와 DevLog의 블로그 포스트는 최신 산업 표준과 MCP 통합 가이드를 다루고 있어, 초기 시스템 구축 시 참고하시면 시행착오를 크게 줄일 수 있습니다.

현재 제공된 결과는 귀하의 의도와 **약 95% 일치**하는 것으로 판단됩니다. 추가적인 데이터 소싱이 필요하시다면 언제든 말씀해 주세요.`,
    `### **1. AI Insights & Usage Guide**

Based on the analysis results for **"${query}"**, here is a summary of how to utilize the recommended resources below.

*   First, you can use the **Financial Data Analyzer** MCP recommended at the bottom to quickly collect real-time market data and run analysis models.
*   In particular, using it with the **Global Market Trends** agent allows you to cross-validate macroscopic market trends with microscopic financial data for more precise predictions.

### **2. Data Integration Strategy**

The 'Global EV Sales 2024' dataset in the **Related Data** section can be a key indicator for demand forecasting in the EV market.
Integrating the 'Consumer Sentiment Index' API to reflect consumer sentiment could improve analysis accuracy by over **40%**.

### **3. Reference Utilization**

The articles from TechDaily and blog posts from DevLog recommended in **News & Insights** cover the latest industry standards and MCP integration guides, which can significantly reduce trial and error during initial system setup.

The current results are estimated to match your intent by **approximately 95%**. Please let me know if you need additional data sourcing.`
  );

  const aiSuggestion = t(
    `현재 결과도 유의미하지만, 경쟁사 분석을 위해 **'Global Competitor Analysis'** 관련 데이터나, 원자재 가격 변동성을 추적할 수 있는 **'Commodity Price Index'** 데이터를 추가로 확보하신다면, 공급망 리스크 관리 측면에서도 훨씬 더 완성도 높은 산업 분석 리포트를 작성하실 수 있을 것입니다.`,
    `While the current results are significant, acquiring **'Global Competitor Analysis'** data or **'Commodity Price Index'** data to track raw material price volatility would allow you to create a much more complete industrial analysis report, especially in terms of supply chain risk management.`
  );

  const relatedMCPs = [
    {
      id: "mcp-1",
      name: "Financial Data Analyzer",
      provider: "FinTech Sol",
      description: "Real-time market analysis and prediction model.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=FinTech",
      matchScore: 98
    },
    {
      id: "mcp-2",
      name: "Global Market Trends",
      provider: "BizIntel",
      description: "Comprehensive report generation agent for global markets.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Biz",
      matchScore: 92
    },
    {
      id: "mcp-3",
      name: "Supply Chain Optimizer",
      provider: "LogiTech",
      description: "AI-driven logistics and supply chain optimization tool.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Logi",
      matchScore: 88
    },
    {
      id: "mcp-4",
      name: "Risk Assessment Bot",
      provider: "SecureCorp",
      description: "Automated risk evaluation for investment portfolios.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Secure",
      matchScore: 85
    },
    {
      id: "mcp-5",
      name: "Competitor Intel Scout",
      provider: "MarketWatch",
      description: "Tracks and analyzes competitor activities and strategies.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Market",
      matchScore: 82
    },
    {
      id: "mcp-6",
      name: "Regulatory Compliance",
      provider: "LegalAI",
      description: "Monitors and alerts on relevant regulatory changes.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Legal",
      matchScore: 79
    },
    {
      id: "mcp-7",
      name: "ESG Impact Tracker",
      provider: "GreenData",
      description: "Analyzes environmental, social, and governance metrics.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Green",
      matchScore: 75
    }
  ];

  const relatedData = [
    {
      id: "data-1",
      title: "Global EV Sales 2024",
      provider: "AutoStats",
      type: "Dataset",
      format: "JSON, CSV"
    },
    {
      id: "data-2",
      title: "Consumer Sentiment Index",
      provider: "MarketPulse",
      type: "API",
      format: "REST"
    }
  ];

  const relatedContent = [
    {
      type: "News",
      title: "AI Agents Revolutionizing Finance",
      source: "TechDaily",
      date: "2 hours ago",
      url: "#"
    },
    {
      type: "Blog",
      title: "How to integrate MCPs into your workflow",
      source: "DevLog",
      date: "1 day ago",
      url: "#"
    },
    {
      type: "News",
      title: "New Standards for Industrial Data Exchange",
      source: "DataWorld",
      date: "3 days ago",
      url: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden min-h-[80vh] flex flex-col">
            
            {/* Header Area */}
            <div className="p-6 pb-0 bg-white dark:bg-slate-900 flex-shrink-0 z-20">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-5 w-5" />
                </div>
                <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                    {t("AI Smart Search", "AI 스마트 검색")}
                    <Badge variant="outline" className="ml-2 font-normal text-xs bg-slate-100 dark:bg-slate-800">
                    Beta
                    </Badge>
                </h1>
                </div>
            </div>
            </div>

            {/* Search Input Area */}
            <div className="bg-white dark:bg-slate-900 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0 z-10">
                <div className="relative">
                    <TextareaAutosize 
                        placeholder={t("Ask a follow-up question...", "추가 질문을 입력하세요...")}
                        className="w-full flex rounded-md border border-input px-4 py-3 shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-12 resize-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-500 text-base min-h-[44px]"
                        minRows={1}
                        maxRows={4}
                        value={followUpQuery}
                        onChange={(e) => setFollowUpQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleFollowUpSearch();
                            }
                        }}
                    />
                    <Button 
                        size="icon" 
                        className="absolute right-3 top-2 h-8 w-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
                        disabled={!followUpQuery.trim() || followUpQuery === query}
                        onClick={handleFollowUpSearch}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative">
            {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-10 min-h-[400px]">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-indigo-600 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                </div>
                <p className="mt-6 text-lg font-medium text-slate-600 dark:text-slate-300 animate-pulse">
                    {t("Analyzing query...", "질의를 분석하고 있습니다...")}
                </p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
                    {t("Connecting to knowledge base & MCPs...", "지식 베이스 및 MCP에 연결 중...")}
                </p>
                </div>
            ) : (
                <div className="p-6 pb-20">
                    {/* 1. AI Answer Section - Conversational Style */}
                    <div className="flex gap-4 mb-8 max-w-4xl">
                    <div className="flex-shrink-0 mt-1">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                        <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                        <div className="prose prose-slate dark:prose-invert max-w-none 
                        prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:my-2
                        prose-strong:text-indigo-700 dark:prose-strong:text-indigo-400 prose-strong:font-bold
                        prose-ul:my-2 prose-li:my-0.5
                        [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-800 dark:[&>h3]:text-slate-100 [&>h3]:mt-6 [&>h3]:mb-3 [&>h3:first-child]:mt-0
                        [&>p>strong]:font-bold [&>p>strong]:text-indigo-700 dark:[&>p>strong]:text-indigo-400
                        ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {aiSummary}
                        </ReactMarkdown>
                        </div>

                        <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 rounded-lg overflow-hidden">
                        <div className="px-4 py-2 bg-amber-100/50 dark:bg-amber-900/40 border-b border-amber-100 dark:border-amber-900/30 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-400 fill-amber-100 dark:fill-amber-900/50" />
                            <span className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
                                {t("Additional Suggestion", "추가 제언")}
                            </span>
                        </div>
                        <div className="p-4 prose prose-sm prose-amber dark:prose-invert max-w-none prose-p:my-0 prose-p:leading-relaxed">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {aiSuggestion}
                            </ReactMarkdown>
                        </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800 text-sm font-medium">
                            <Target className="h-4 w-4" />
                            {t("Achievability Indicator", "달성 가능지표")}: 92%
                        </div>
                        <span className="text-xs text-slate-400">
                            {t("Based on available resources", "가용 리소스 기반 산출")}
                        </span>
                        </div>
                    </div>
                    </div>

                    <Separator className="mb-8" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 2. Related MCPs */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        {t("Recommended Agents (MCP)", "추천 에이전트 (MCP)")}
                        </h3>
                        <div className="space-y-3">
                        {relatedMCPs.slice(0, 5).map((mcp) => (
                            <Card key={mcp.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group border-slate-200 dark:border-slate-800">
                            <div className="p-4 flex items-start gap-3">
                                <Avatar className="h-10 w-10 border border-slate-100">
                                <AvatarImage src={mcp.icon} />
                                <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-sm truncate group-hover:text-indigo-600 transition-colors">{mcp.name}</h4>
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                    {mcp.description}
                                </p>
                                <div className="flex items-center text-[10px] text-slate-400">
                                    <span>by {mcp.provider}</span>
                                </div>
                                </div>
                            </div>
                            </Card>
                        ))}
                        {relatedMCPs.length > 5 && (
                            <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                            {t("View more agents", "에이전트 더 보기")} <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                        )}
                        </div>
                    </div>

                    {/* 3. Related Data */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        {t("Related Data", "관련 데이터")}
                        </h3>
                        <div className="space-y-3">
                        {relatedData.map((data) => (
                            <Card key={data.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group border-slate-200 dark:border-slate-800">
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-[10px] font-normal">
                                    {data.type}
                                </Badge>
                                <span className="text-[10px] text-slate-400 font-mono">{data.format}</span>
                                </div>
                                <h4 className="font-semibold text-sm mb-1 group-hover:text-indigo-600 transition-colors">{data.title}</h4>
                                <p className="text-xs text-muted-foreground mb-3">
                                Provider: {data.provider}
                                </p>
                                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] text-slate-400">Updated 2d ago</span>
                                <ExternalLink className="h-3 w-3 text-slate-300 group-hover:text-indigo-400" />
                                </div>
                            </div>
                            </Card>
                        ))}
                        <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                            {t("View more data", "데이터 더 보기")} <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                        </div>
                    </div>

                    {/* 4. News & Blogs */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Newspaper className="h-4 w-4" />
                        {t("News & Insights", "뉴스 및 인사이트")}
                        </h3>
                        <div className="space-y-3">
                        {relatedContent.map((item, idx) => (
                            <a key={idx} href={item.url} className="block group">
                            <Card className="hover:bg-slate-50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 transition-colors">
                                <div className="p-3">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Badge variant="secondary" className={
                                    item.type === 'News' 
                                        ? "bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200 text-[10px] px-1.5 py-0 h-5"
                                        : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 text-[10px] px-1.5 py-0 h-5"
                                    }>
                                    {item.type}
                                    </Badge>
                                    <span className="text-[10px] text-slate-400">{item.date}</span>
                                </div>
                                <h4 className="text-sm font-medium leading-tight group-hover:text-indigo-600 transition-colors mb-1">
                                    {item.title}
                                </h4>
                                <span className="text-[10px] text-slate-500">{item.source}</span>
                                </div>
                            </Card>
                            </a>
                        ))}
                        <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                            {t("View more content", "콘텐츠 더 보기")} <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                        </div>
                    </div>
                    </div>
                </div>
            )}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}