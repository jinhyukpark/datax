import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";
import { 
  MessageSquare, Send, Zap, Lock, Unlock, Bot, User, 
  MoreVertical, Search, Star, Box, Sparkles, AlertCircle,
  ShoppingBag, CheckCircle2, Crown, Infinity, ChevronDown, Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock Data Types
interface MCPService {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: string;
  status: 'active' | 'inactive';
  isPurchased?: boolean;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
}

export default function AgentChat() {
  const { t } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<'test' | 'production'>('test');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [dailyLimit, setDailyLimit] = useState(30);
  const [usedCount, setUsedCount] = useState(5); // Mock usage
  const [selectedModel, setSelectedModel] = useState("GPT-4o");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // AI Models
  const aiModels = [
    { id: "gpt-4o", name: "GPT-4o" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet" },
    { id: "claude-3-haiku", name: "Claude 3 Haiku" },
    { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro" },
    { id: "gemini-flash", name: "Gemini Flash" },
    { id: "qwen-max", name: "Qwen Max" },
  ];

  // Mock Data
  const bookmarkedMCPs: MCPService[] = [
    {
      id: "mcp-1",
      name: "Financial Data Analyzer",
      provider: "FinTech Sol",
      description: "Real-time financial market analysis and prediction.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=FinTech",
      status: 'active'
    },
    {
      id: "mcp-2",
      name: "Medical Research Assistant",
      provider: "HealthAI",
      description: "Assists with searching medical journals and summarizing papers.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Health",
      status: 'active'
    },
    {
      id: "mcp-3",
      name: "Global Weather Forecaster",
      provider: "MeteoGroup",
      description: "High-precision weather forecasting model access.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Weather",
      status: 'active'
    }
  ];

  const purchasedMCPs: MCPService[] = [
    {
      id: "mcp-pro-1",
      name: "Enterprise Code Reviewer",
      provider: "DevTools Inc",
      description: "Automated code review and security vulnerability scanning.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Code",
      status: 'active',
      isPurchased: true
    },
    {
      id: "mcp-pro-2",
      name: "Legal Document Drafter",
      provider: "LegalTech AI",
      description: "Generates legal contracts and reviews compliance.",
      icon: "https://api.dicebear.com/7.x/shapes/svg?seed=Legal",
      status: 'active',
      isPurchased: true
    }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      role: "assistant",
      content: `Welcome to the Financial Data Analyzer. I can help you analyze market trends, review company financial statements, and provide predictive insights based on historical data.

Here are a few things you can ask me:
- "Analyze the Q3 2024 earnings report for TechCorp."
- "What are the current trends in the renewable energy sector?"
- "Compare the volatility of Bitcoin vs. Gold over the last 6 months."

Please feel free to provide any specific data sets or parameters you'd like me to focus on.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      model: "GPT-4o"
    },
    {
      id: "msg-2",
      role: "user",
      content: "Can you provide a summary of the latest market trends for EV (Electric Vehicle) stocks in the US market?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: "msg-3",
      role: "assistant",
      content: `### EV Market Trends Summary (US Market)

Based on the latest data, the Electric Vehicle (EV) sector in the US is experiencing significant shifts. Here is a comprehensive summary of the current trends:

#### 1. Market Consolidation & Competition
*   **Tesla's Dominance vs. Challengers:** Tesla remains the market leader but is facing stiff competition from legacy automakers like Ford and GM, as well as newer entrants like Rivian and Lucid.
*   **Price Wars:** Aggressive price cuts by major players have squeezed margins across the board, forcing smaller companies to rethink their strategies.

#### 2. Regulatory Impact
*   **Inflation Reduction Act (IRA):** Tax credits continue to be a major driver for consumer adoption, but strict battery sourcing requirements have limited the number of eligible vehicles.
*   **EPA Standards:** Stricter emissions standards are pushing traditional automakers to accelerate their transition to electric fleets.

#### 3. Technological Advancements
*   **Battery Tech:** Solid-state batteries are on the horizon, promising longer range and faster charging times.
*   **Charging Infrastructure:** The adoption of NACS (North American Charging Standard) by major automakers is standardizing the charging experience, reducing range anxiety.

#### 4. Investment Outlook
*   **Volatility:** EV stocks remain highly volatile. While long-term growth prospects are strong, short-term headwinds like high interest rates and supply chain constraints persist.
*   **Sector Rotation:** Investors are increasingly looking at the entire EV ecosystem, including lithium miners, battery manufacturers, and charging network operators, rather than just vehicle manufacturers.

**Recommendation:**
For a balanced portfolio, consider diversifying across established leaders and promising infrastructure plays. Monitor quarterly earnings for updates on production targets and margin improvements.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 29),
      model: "GPT-4o"
    }
  ]);

  useEffect(() => {
    // Select first item by default if nothing selected
    if (!selectedServiceId) {
      if (selectedMode === 'test' && bookmarkedMCPs.length > 0) {
        setSelectedServiceId(bookmarkedMCPs[0].id);
      } else if (selectedMode === 'production' && purchasedMCPs.length > 0) {
        setSelectedServiceId(purchasedMCPs[0].id);
      }
    }
    
    // Scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedMode, selectedServiceId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    if (selectedMode === 'test' && usedCount >= dailyLimit) {
      toast.error(t("Daily limit reached", "일일 제한에 도달했습니다"));
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
    
    if (selectedMode === 'test') {
      setUsedCount(prev => prev + 1);
    }

    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a simulated response from **${getActiveServiceName()}** using the **${selectedModel}** model.

I have received your query:
> ${newMessage.content}

Here is a structured analysis based on your request:

1.  **Context Understanding**: I understand you are asking about...
2.  **Data Processing**: Processing relevant data points...
3.  **Insight Generation**: Based on the analysis, here are the key findings...

(This is a placeholder response to demonstrate the UI flow.)`,
        timestamp: new Date(),
        model: selectedModel
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  const getActiveServiceName = () => {
    const allServices = [...bookmarkedMCPs, ...purchasedMCPs];
    return allServices.find(s => s.id === selectedServiceId)?.name || "AI Agent";
  };

  const activeService = [...bookmarkedMCPs, ...purchasedMCPs].find(s => s.id === selectedServiceId);

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex flex-col container mx-auto px-4 py-6 max-w-7xl min-h-0">
        {/* Notice Alert */}
        <div className="flex-none mb-6">
          <Alert className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300 font-semibold mb-1">
              MCP Testing Environment
            </AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400 text-sm">
              This screen is for testing MCPs and simulates the interaction. It is not the actual service environment. 
              However, for <strong>Purchased Services</strong>, you can test with unlimited usage to fully evaluate the agent's capabilities.
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar - MCP Selection */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            <Card className="flex-1 flex flex-col overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  {t("Agent Selection", "에이전트 선택")}
                </h2>
                
                {/* Mode Toggle */}
                <div className="flex items-center justify-between p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-4">
                  <button
                    onClick={() => {
                      setSelectedMode('test');
                      setSelectedServiceId(bookmarkedMCPs[0]?.id || null);
                    }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all",
                      selectedMode === 'test' 
                        ? "bg-white dark:bg-slate-700 text-primary shadow-sm" 
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <Star className="h-4 w-4" />
                    {t("Test Mode", "테스트 모드")}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMode('production');
                      setSelectedServiceId(purchasedMCPs[0]?.id || null);
                    }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all",
                      selectedMode === 'production' 
                        ? "bg-white dark:bg-slate-700 text-green-600 shadow-sm" 
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                    )}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {t("Production", "실서비스")}
                  </button>
                </div>

                {/* Usage Info */}
                <div className={cn(
                  "p-3 rounded-lg border text-xs flex items-center justify-between",
                  selectedMode === 'test' 
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300"
                    : "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900 text-green-700 dark:text-green-300"
                )}>
                  <span className="flex items-center gap-1.5 font-medium">
                    {selectedMode === 'test' ? <Zap className="h-3.5 w-3.5" /> : <Infinity className="h-3.5 w-3.5" />}
                    {t("Daily Usage", "일일 사용량")}
                  </span>
                  <span className="font-bold">
                    {selectedMode === 'test' ? `${usedCount} / ${dailyLimit}` : t("Unlimited", "무제한")}
                  </span>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-3 space-y-2">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {selectedMode === 'test' 
                      ? t("Bookmarked MCPs", "찜한 MCP 상품")
                      : t("Purchased Services", "구매한 서비스")
                    }
                  </div>
                  
                  {selectedMode === 'test' ? (
                    bookmarkedMCPs.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={cn(
                          "w-full text-left p-3 rounded-xl transition-all border",
                          selectedServiceId === service.id
                            ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-1 ring-blue-300 dark:ring-blue-700"
                            : "bg-white dark:bg-slate-900 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                            <AvatarImage src={service.icon} />
                            <AvatarFallback>{service.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm truncate pr-2">{service.name}</h3>
                              {selectedServiceId === service.id && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">{service.provider}</p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    purchasedMCPs.length > 0 ? (
                      purchasedMCPs.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedServiceId(service.id)}
                          className={cn(
                            "w-full text-left p-3 rounded-xl transition-all border",
                            selectedServiceId === service.id
                              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 ring-1 ring-green-300 dark:ring-green-700"
                              : "bg-white dark:bg-slate-900 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                              <AvatarImage src={service.icon} />
                              <AvatarFallback>{service.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-sm truncate pr-2">{service.name}</h3>
                                {selectedServiceId === service.id && (
                                  <Crown className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400 shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground truncate mt-0.5">{service.provider}</p>
                            </div>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-800">
                        <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-20" />
                        <p className="text-sm">{t("No purchased services", "구매한 서비스가 없습니다")}</p>
                      </div>
                    )
                  )}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3 flex flex-col h-full gap-4">
            <Card className="flex-1 flex flex-col overflow-hidden border-slate-200 dark:border-slate-800 shadow-md">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                    <AvatarImage src={activeService?.icon} />
                    <AvatarFallback><Bot className="h-6 w-6" /></AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold flex items-center gap-2">
                      {activeService?.name || "Select an Agent"}
                      <Badge variant={selectedMode === 'test' ? 'secondary' : 'default'} className={cn(
                        "ml-2 text-[10px] px-1.5 py-0 h-5",
                        selectedMode === 'production' && "bg-green-600 hover:bg-green-700"
                      )}>
                        {selectedMode === 'test' ? 'TEST MODE' : 'PRO'}
                      </Badge>
                    </h2>
                    <p className="text-xs text-muted-foreground">{activeService?.provider || "Please select a service"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 bg-white dark:bg-slate-950 p-4 md:p-6">
                <div className="space-y-8 max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4 w-full",
                        message.role === 'user' ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <Avatar className={cn(
                        "h-8 w-8 shrink-0 mt-1",
                        message.role === 'user' ? "bg-indigo-100 text-indigo-700" : "bg-white border border-slate-200"
                      )}>
                        {message.role === 'user' ? (
                          <User className="h-5 w-5" />
                        ) : (
                          <AvatarImage src={activeService?.icon} />
                        )}
                        <AvatarFallback>
                          {message.role === 'user' ? "Me" : "AI"}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={cn(
                        "flex flex-col gap-1 max-w-[90%]",
                        message.role === 'user' ? "items-end" : "items-start"
                      )}>
                        <div className="flex items-center gap-2 px-1">
                          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                            {message.role === 'user' ? "You" : activeService?.name}
                          </span>
                          {message.role === 'assistant' && message.model && (
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                              {message.model}
                            </span>
                          )}
                        </div>
                        
                        {/* Message Content Style */}
                        {message.role === 'user' ? (
                          <div className="rounded-2xl px-5 py-3 text-sm shadow-sm bg-blue-50 text-slate-900 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-100 dark:border-blue-900 rounded-br-none">
                            {message.content}
                          </div>
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line">
                            {message.content}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-4xl mx-auto space-y-3">
                   {/* Model Selection */}
                   <div className="flex items-center gap-2">
                     <DropdownMenu>
                       <DropdownMenuTrigger asChild>
                         <Button variant="outline" size="sm" className="h-8 gap-2 text-xs font-medium border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-950">
                           <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                           {aiModels.find(m => m.id === selectedModel)?.name || "Select Model"}
                           <ChevronDown className="h-3 w-3 opacity-50" />
                         </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="start" className="w-56">
                         {aiModels.map((model) => (
                           <DropdownMenuItem 
                             key={model.id}
                             onClick={() => setSelectedModel(model.name)}
                             className={cn("flex items-center justify-between text-xs", selectedModel === model.name && "bg-slate-100 dark:bg-slate-800")}
                           >
                             {model.name}
                             {selectedModel === model.name && <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />}
                           </DropdownMenuItem>
                         ))}
                       </DropdownMenuContent>
                     </DropdownMenu>
                   </div>

                   {/* Input Box */}
                   <form onSubmit={handleSendMessage} className="relative flex items-end gap-3 p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                    <div className="flex-1 relative">
                      <Input 
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={
                          !selectedServiceId 
                            ? "Please select an agent first..." 
                            : selectedMode === 'test' && usedCount >= dailyLimit 
                              ? "Daily limit reached for Test Mode" 
                              : `Ask ${activeService?.name || 'Agent'} anything...`
                        }
                        className="w-full border-0 focus-visible:ring-0 px-0 py-2 h-auto max-h-[200px] bg-transparent text-base shadow-none resize-none"
                        disabled={!selectedServiceId || (selectedMode === 'test' && usedCount >= dailyLimit)}
                      />
                    </div>
                    
                    <div className="flex items-center gap-3 pb-1">
                      {selectedMode === 'test' && (
                         <span className={cn(
                           "text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap",
                           usedCount >= dailyLimit ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500"
                         )}>
                           {usedCount}/{dailyLimit}
                         </span>
                      )}
                      
                      <Button 
                        type="submit" 
                        size="icon" 
                        className={cn(
                          "h-9 w-9 rounded-lg shadow-sm transition-all shrink-0",
                          selectedMode === 'production' 
                            ? "bg-green-600 hover:bg-green-700" 
                            : "bg-blue-600 hover:bg-blue-700"
                        )}
                        disabled={!selectedServiceId || !inputMessage.trim() || (selectedMode === 'test' && usedCount >= dailyLimit)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                  <div className="text-center">
                     <p className="text-[10px] text-muted-foreground">
                       {selectedMode === 'test' 
                         ? "Test Mode: Limited availability. Upgrade to Production for full access."
                         : "Production Mode: Enterprise-grade reliability and security."
                       }
                     </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
