import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Database, Newspaper, BookOpen, Sparkles, ExternalLink, ArrowRight, X, Search, Loader2, Cpu, Send, CornerDownLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from "@/lib/language-context";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea } from "@/components/ui/textarea";

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
  const aiSummary = `
## **${t("Analysis Result", "분석 결과 보고서")}**

**"${query}"** ${t(
    "related to your inquiry, here is a summarized insight based on recent industrial data trends.",
    "에 대한 귀하의 질의와 관련하여, 최신 산업 데이터 트렌드와 심층 분석을 바탕으로 도출된 핵심 인사이트를 제공합니다."
  )}

### **1. ${t("Market Overview", "시장 현황 및 개요")}**
${t(
    "The sector is experiencing rapid growth driven by AI integration and data democratization.",
    "현재 해당 산업 분야는 **인공지능(AI) 기술의 전면적인 통합**과 **데이터 민주화(Data Democratization)** 흐름에 힘입어 폭발적인 성장세를 기록하고 있습니다. 특히, 기존의 전통적인 데이터 처리 방식에서 벗어나 실시간 스트리밍 데이터 분석과 엣지 컴퓨팅 기술이 결합되면서 시장의 패러다임이 급격히 변화하고 있습니다."
  )}

> **핵심 포인트:** 2025년 4분기 기준, 전년 대비 데이터 처리 효율성이 약 **40% 향상**되었으며, 기업들의 관련 솔루션 도입률은 **2.5배 증가**했습니다.

### **2. ${t("Key Drivers", "주요 성장 동인")}**
*   **실시간 분석 수요 급증:** 의사결정 속도를 높이기 위해 실시간 데이터 파이프라인 구축이 필수가 되었습니다.
*   **자율 의사결정 시스템(Autonomous Decision Systems):** 인간의 개입을 최소화하고 AI 에이전트가 주도적으로 판단하는 시스템이 도입되고 있습니다.
*   **규제 완화 및 표준화:** 국가 간 데이터 교환 표준(Data Exchange Standards)이 정립되면서 글로벌 시장 진출 장벽이 낮아졌습니다.

### **3. ${t("Opportunities", "전략적 기회 요소")}**
${t(
    "Leveraging cross-domain data for predictive maintenance and personalized customer experiences.",
    "**교차 도메인 데이터(Cross-domain Data)의 활용**이 새로운 비즈니스 기회를 창출하고 있습니다. 특히 제조, 물류, 금융 데이터가 결합된 융합 서비스 모델이 주목받고 있으며, 이를 통해 예측 유지 보수(Predictive Maintenance) 및 초개인화된 고객 경험(Hyper-personalized CX) 제공이 가능해졌습니다."
  )}

### **4. ${t("Future Outlook", "향후 전망")}**
향후 12~24개월 내에 생성형 AI 모델이 산업 데이터 분석의 표준 인터페이스로 자리 잡을 것으로 예상됩니다. 특히, **멀티 에이전트 시스템(Multi-Agent Systems)**의 발전으로 복잡한 공급망 관리와 리스크 분석이 완전 자동화될 전망입니다.

---

${t(
  "Below are the recommended MCPs, datasets, and resources that can help you explore this topic further.",
  "위 분석 내용을 바탕으로, 귀하의 프로젝트에 즉시 적용 가능한 **추천 MCP(Model Context Protocol)**, **고품질 데이터셋**, 그리고 **최신 레퍼런스**를 아래와 같이 선별하였습니다."
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
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <DialogHeader className="p-6 pb-0 bg-white dark:bg-slate-900 flex-shrink-0 z-20 border-none">
          <div className="flex items-center gap-3">
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
            </div>
          </div>
        </DialogHeader>

        {/* Search Query Input - Sticky at Top */}
        <div className="bg-white dark:bg-slate-900 px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex-shrink-0 z-10 shadow-sm">
            <div className="relative">
                <Textarea 
                    placeholder={t("Ask a follow-up question...", "추가 질문을 입력하세요...")}
                    className="min-h-[60px] pr-12 resize-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-500 text-base"
                    value={followUpQuery}
                    onChange={(e) => setFollowUpQuery(e.target.value)}
                />
                <Button 
                    size="icon" 
                    className="absolute right-3 top-3 h-8 w-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
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
              <div className="p-6 space-y-8 pb-20">
                {/* 1. AI Answer Section */}
                <section className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <Bot className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                      {t("AI Insight", "AI 인사이트")}
                    </h3>
                  </div>
                  
                  <div className="prose prose-slate dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-slate-100
                    prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-800 prose-h2:pb-2
                    prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                    prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-8 prose-p:tracking-wide
                    prose-li:text-slate-600 dark:prose-li:text-slate-300 prose-li:leading-7
                    prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-bold
                    prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 dark:prose-blockquote:bg-indigo-900/20 prose-blockquote:pl-4 prose-blockquote:py-1 prose-blockquote:italic
                    ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {aiSummary}
                    </ReactMarkdown>
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
