import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Database, Newspaper, BookOpen, Sparkles, ExternalLink, ArrowRight, X, Search, Loader2, Cpu, Send, CornerDownLeft, Target, Lightbulb, TrendingUp, CheckCircle2, Zap, FileCheck, Layers, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/language-context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";
import TextareaAutosize from "react-textarea-autosize";

interface SearchResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
}

export function SearchResultsModal({ open, onOpenChange, query }: SearchResultsModalProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [followUpQuery, setFollowUpQuery] = useState(query);

  useEffect(() => {
    if (open && query) {
      setFollowUpQuery(query);
      setIsLoading(true);
      // Simulate AI processing time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [open, query]);

  // Mock Data for Results - Enhanced and Expanded
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <DialogHeader className="p-8 pb-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex-shrink-0 z-20 border-b border-slate-200/50 dark:border-slate-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold flex items-center gap-3 text-slate-900 dark:text-slate-100">
                  {t("AI Smart Search", "AI 스마트 검색")}
                  <Badge className="ml-2 font-semibold text-xs bg-indigo-600 text-white border-0 shadow-sm">
                    Beta
                  </Badge>
                </DialogTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {t("Intelligent analysis powered by AI", "AI 기반 지능형 분석")}
                </p>
              </div>
            </div>
            {query && (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                <Search className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium truncate max-w-xs">
                  "{query}"
                </span>
              </div>
            )}
          </div>
        </DialogHeader>

        {/* Search Query Input - Enhanced */}
        <div className="bg-white/50 dark:bg-slate-900/50 px-8 py-5 border-b border-slate-200/50 dark:border-slate-800/50 flex-shrink-0 z-10 backdrop-blur-sm">
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="h-5 w-5" />
                </div>
                <TextareaAutosize 
                    placeholder={t("Ask a follow-up question...", "추가 질문을 입력하세요...")}
                    className="w-full flex rounded-xl border-2 border-slate-200 dark:border-slate-700 px-12 py-4 shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 pr-14 resize-none bg-white dark:bg-slate-800 text-base min-h-[56px] transition-all"
                    minRows={1}
                    maxRows={4}
                    value={followUpQuery}
                    onChange={(e) => setFollowUpQuery(e.target.value)}
                />
                <Button 
                    size="icon" 
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
                    disabled={!followUpQuery.trim() || followUpQuery === query}
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </div>

        <div className="flex-1 overflow-hidden relative">
          {isLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm z-10">
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
            <ScrollArea className="h-full">
              <div className="p-8 pb-20">
                {/* 1. AI Answer Section - Enhanced Professional Style */}
                <div className="mb-10">
                  <div className="flex gap-5 mb-6">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="mb-4 flex items-center gap-3">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          {t("Analysis Results", "분석 결과")}
                        </h2>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span className="text-xs font-semibold">95% {t("Match", "일치")}</span>
                        </div>
                      </div>
                      
                      <div className="prose prose-slate dark:prose-invert max-w-none 
                        prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:my-3 prose-p:text-[15px]
                        prose-strong:text-indigo-700 dark:prose-strong:text-indigo-400 prose-strong:font-bold
                        prose-ul:my-3 prose-li:my-1.5 prose-li:text-[15px]
                        [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-900 dark:[&>h3]:text-slate-100 [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:first-child]:mt-0
                        [&>h3]:flex [&>h3]:items-center [&>h3]:gap-2
                        [&>p>strong]:font-bold [&>p>strong]:text-indigo-700 dark:[&>p>strong]:text-indigo-400
                        bg-slate-50/50 dark:bg-slate-800/30 rounded-xl p-6 border border-slate-200/50 dark:border-slate-700/50
                      ">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {aiSummary}
                        </ReactMarkdown>
                      </div>

                      <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800/50 rounded-xl overflow-hidden shadow-sm">
                        <div className="px-5 py-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 border-b border-amber-200 dark:border-amber-800/50 flex items-center gap-2.5">
                          <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 fill-amber-200 dark:fill-amber-900/50" />
                          <span className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                            {t("Additional Suggestion", "추가 제언")}
                          </span>
                        </div>
                        <div className="p-5 prose prose-sm prose-amber dark:prose-invert max-w-none prose-p:my-0 prose-p:leading-relaxed prose-p:text-[14px]">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {aiSuggestion}
                          </ReactMarkdown>
                        </div>
                      </div>

                      {/* Metrics Section - Enhanced */}
                      <div className="mt-8 pt-8 border-t-2 border-slate-200 dark:border-slate-800">
                        <div className="mb-4 flex items-start gap-2">
                          <Info className="h-4 w-4 text-slate-500 dark:text-slate-400 mt-0.5" />
                          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {t(
                              "Achievability indicates the possibility of answering this question based on currently available data, MCPs, and content on the platform. This is a feasibility indicator, and decision-making typically requires the following additional metrics.",
                              "달성률은 현재 플랫폼에 존재하는 데이터·MCP·콘텐츠 기준으로 이 질문에 답할 수 있는 가능성을 나타냅니다. 이는 가능성 지표이며, 의사결정에는 아래 추가 지표들이 필요합니다."
                            )}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* 1. Achievability */}
                          <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                                  <Target className="h-4 w-4 text-green-700 dark:text-green-400" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                    {t("Achievability", "달성 가능성")}
                                  </h4>
                                  <p className="text-[10px] text-slate-600 dark:text-slate-400">
                                    {t("Feasibility Indicator", "가능성 지표")}
                                  </p>
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="flex items-baseline gap-2 mb-2">
                                  <span className="text-2xl font-bold text-green-700 dark:text-green-400">92%</span>
                                </div>
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                {t("Based on available resources", "가용 리소스 기반")}
                              </p>
                            </div>
                          </Card>

                          {/* 2. Completeness Score */}
                          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                                  <FileCheck className="h-4 w-4 text-blue-700 dark:text-blue-400" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                    {t("Completeness", "완성도")}
                                  </h4>
                                  <p className="text-[10px] text-slate-600 dark:text-slate-400">
                                    {t("Decision-Ready Score", "의사결정 준비도")}
                                  </p>
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="flex items-baseline gap-2 mb-2">
                                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">68%</span>
                                </div>
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '68%' }}></div>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                                  {t("Missing Elements", "누락 요소")}:
                                </p>
                                <div className="flex flex-wrap gap-1.5">
                                  <Badge variant="outline" className="text-[9px] px-1.5 py-0.5 h-5 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">
                                    {t("Competitor Data", "경쟁사 데이터")}
                                  </Badge>
                                  <Badge variant="outline" className="text-[9px] px-1.5 py-0.5 h-5 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">
                                    {t("Commodity Prices", "원자재 가격")}
                                  </Badge>
                                  <Badge variant="outline" className="text-[9px] px-1.5 py-0.5 h-5 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30">
                                    {t("Policy/Regulation", "정책/규제")}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </Card>

                          {/* 3. Data Coverage Index */}
                          <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                                  <Layers className="h-4 w-4 text-purple-700 dark:text-purple-400" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                    {t("Data Coverage", "데이터 커버리지")}
                                  </h4>
                                  <p className="text-[10px] text-slate-600 dark:text-slate-400">
                                    {t("Coverage Index", "커버리지 지수")}
                                  </p>
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="flex items-baseline gap-2 mb-2">
                                  <span className="text-2xl font-bold text-purple-700 dark:text-purple-400">75%</span>
                                </div>
                                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{t("Market", "시장")}</span>
                                  <div className="flex-1 mx-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                                  </div>
                                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">90%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{t("Technology", "기술")}</span>
                                  <div className="flex-1 mx-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                                  </div>
                                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">85%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{t("Supply Chain", "공급망")}</span>
                                  <div className="flex-1 mx-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '60%' }}></div>
                                  </div>
                                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">60%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{t("Demand", "수요")}</span>
                                  <div className="flex-1 mx-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                                  </div>
                                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">80%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] text-slate-600 dark:text-slate-400">{t("Regulation", "규제")}</span>
                                  <div className="flex-1 mx-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 rounded-full" style={{ width: '40%' }}></div>
                                  </div>
                                  <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">40%</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="mb-10 bg-slate-200 dark:bg-slate-700" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* 2. Related MCPs - Enhanced */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                        <Cpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                        {t("Recommended Agents (MCP)", "추천 에이전트 (MCP)")}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {relatedMCPs.slice(0, 5).map((mcp) => (
                        <Card key={mcp.id} className="overflow-hidden hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                          <div className="p-4">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="h-12 w-12 border-2 border-slate-200 dark:border-slate-700 shadow-sm">
                                <AvatarImage src={mcp.icon} />
                                <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">AI</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1.5">
                                  <h4 className="font-bold text-sm truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{mcp.name}</h4>
                                  <Badge className="ml-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-0 text-[10px] font-semibold px-1.5 py-0 h-5">
                                    {mcp.matchScore}%
                                  </Badge>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-2.5 leading-relaxed">
                                  {mcp.description}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                                  <span className="font-medium">by {mcp.provider}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                              <div className="flex items-center gap-1.5">
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span className="text-[10px] text-slate-400 font-medium">{t("High Match", "높은 일치도")}</span>
                              </div>
                              <ExternalLink className="h-3.5 w-3.5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                            </div>
                          </div>
                        </Card>
                      ))}
                      {relatedMCPs.length > 5 && (
                        <Button variant="outline" size="sm" className="w-full text-xs font-semibold border-slate-300 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-700">
                          {t("View more agents", "에이전트 더 보기")} <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* 3. Related Data - Enhanced */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                        {t("Related Data", "관련 데이터")}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {relatedData.map((data) => (
                        <Card key={data.id} className="overflow-hidden hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <Badge className={`text-[10px] font-semibold px-2 py-1 ${
                                data.type === 'Dataset' 
                                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-0' 
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0'
                              }`}>
                                {data.type}
                              </Badge>
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{data.format}</span>
                            </div>
                            <h4 className="font-bold text-sm mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{data.title}</h4>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                {t("Provider", "제공자")}:
                              </span>
                              <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{data.provider}</span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                              <div className="flex items-center gap-1.5">
                                <Zap className="h-3 w-3 text-yellow-500" />
                                <span className="text-[10px] text-slate-400 font-medium">{t("Updated 2d ago", "2일 전 업데이트")}</span>
                              </div>
                              <ExternalLink className="h-3.5 w-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                            </div>
                          </div>
                        </Card>
                      ))}
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700">
                        {t("View more data", "데이터 더 보기")} <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>

                  {/* 4. News & Blogs - Enhanced */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <Newspaper className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide">
                        {t("News & Insights", "뉴스 및 인사이트")}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {relatedContent.map((item, idx) => (
                        <a key={idx} href={item.url} className="block group">
                          <Card className="hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700 border-2 border-slate-200 dark:border-slate-800 transition-all bg-white dark:bg-slate-900">
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-2.5">
                                <Badge className={`text-[10px] font-semibold px-2 py-1 border-0 ${
                                  item.type === 'News' 
                                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                }`}>
                                  {item.type}
                                </Badge>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{item.date}</span>
                              </div>
                              <h4 className="text-sm font-bold leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-2">
                                {item.title}
                              </h4>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{item.source}</span>
                                <ExternalLink className="h-3.5 w-3.5 text-slate-300 group-hover:text-orange-500 transition-colors" />
                              </div>
                            </div>
                          </Card>
                        </a>
                      ))}
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold border-slate-300 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-700">
                        {t("View more content", "콘텐츠 더 보기")} <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
