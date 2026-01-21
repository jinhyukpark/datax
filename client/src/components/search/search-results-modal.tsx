import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Database, Newspaper, BookOpen, Sparkles, ExternalLink, ArrowRight, X, Search, Loader2, Cpu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/language-context";

interface SearchResultsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: string;
}

export function SearchResultsModal({ open, onOpenChange, query }: SearchResultsModalProps) {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (open && query) {
      setIsLoading(true);
      // Simulate AI processing time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [open, query]);

  // Mock Data for Results
  const aiSummary = `
### **${t("Analysis Result", "분석 결과")}**

**"${query}"** ${t(
    "related to your inquiry, here is a summarized insight based on recent industrial data trends.",
    "에 대한 귀하의 질의와 관련하여, 최근 산업 데이터 동향을 바탕으로 요약된 인사이트입니다."
  )}

1.  **${t("Market Overview", "시장 개요")}**: ${t(
    "The sector is experiencing rapid growth driven by AI integration and data democratization.",
    "이 분야는 AI 통합과 데이터 민주화에 힘입어 급격한 성장을 경험하고 있습니다."
  )}
2.  **${t("Key Drivers", "주요 동인")}**: ${t(
    "Increased demand for real-time analytics and autonomous decision-making systems.",
    "실시간 분석 및 자율 의사 결정 시스템에 대한 수요 증가."
  )}
3.  **${t("Opportunities", "기회 요소")}**: ${t(
    "Leveraging cross-domain data for predictive maintenance and personalized customer experiences.",
    "예측 유지 보수 및 개인화된 고객 경험을 위한 교차 도메인 데이터 활용."
  )}

${t(
  "Below are the recommended MCPs, datasets, and resources that can help you explore this topic further.",
  "이 주제를 더 깊이 탐구하는 데 도움이 될 추천 MCP, 데이터셋 및 리소스는 다음과 같습니다."
)}
`;

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
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col p-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <DialogHeader className="p-6 pb-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                {t("AI Smart Search", "AI 스마트 검색")}
                <Badge variant="outline" className="ml-2 font-normal text-xs bg-slate-100 dark:bg-slate-800">
                   Beta
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400">
                {t("Searching for", "검색어")}: <span className="font-semibold text-foreground">"{query}"</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

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
              <div className="p-6 space-y-8">
                {/* 1. AI Answer Section */}
                <section className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
                  
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-slate-100">
                    <Bot className="h-5 w-5 text-indigo-600" />
                    {t("AI Insight", "AI 인사이트")}
                  </h3>
                  
                  <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {aiSummary}
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 2. Related MCPs */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Cpu className="h-4 w-4" />
                      {t("Recommended Agents (MCP)", "추천 에이전트 (MCP)")}
                    </h3>
                    <div className="space-y-3">
                      {relatedMCPs.map((mcp) => (
                        <Card key={mcp.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group border-slate-200 dark:border-slate-800">
                          <div className="p-4 flex items-start gap-3">
                            <Avatar className="h-10 w-10 border border-slate-100">
                              <AvatarImage src={mcp.icon} />
                              <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-sm truncate group-hover:text-indigo-600 transition-colors">{mcp.name}</h4>
                                <Badge variant="secondary" className="text-[10px] h-5 bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                                  {mcp.matchScore}% Match
                                </Badge>
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
                      <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                        {t("View more agents", "에이전트 더 보기")} <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
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
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
