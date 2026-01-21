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
  ShoppingBag, CheckCircle2, Crown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

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
}

export default function AgentChat() {
  const { t } = useLanguage();
  const [selectedMode, setSelectedMode] = useState<'test' | 'production'>('test');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState("");
  const [dailyLimit, setDailyLimit] = useState(30);
  const [usedCount, setUsedCount] = useState(5); // Mock usage
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      content: "Hello! I'm your AI Assistant connected to the selected MCP service. How can I help you analyzing data today?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60)
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
        content: `[${selectedMode === 'test' ? 'Test Mode' : 'Production Mode'}] This is a simulated response from ${getActiveServiceName()}. I received: "${newMessage.content}"`,
        timestamp: new Date()
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
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-6 max-w-7xl h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          
          {/* Sidebar - MCP Selection */}
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            <Card className="flex-1 flex flex-col overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  {t("Agent Selection", "에이전트 선택")}
                </h2>
                
                {/* Mode Toggle */}
                <div className="flex items-center justify-between p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
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

                {selectedMode === 'test' && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900 text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Zap className="h-3.5 w-3.5" />
                      {t("Daily Usage", "일일 사용량")}
                    </span>
                    <span className="font-bold">{usedCount} / {dailyLimit}</span>
                  </div>
                )}
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
              <ScrollArea className="flex-1 bg-slate-50/50 dark:bg-slate-950/50 p-4">
                <div className="space-y-6 max-w-3xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4 w-full",
                        message.role === 'user' ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <Avatar className={cn(
                        "h-8 w-8 shrink-0",
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
                        "flex flex-col gap-1 max-w-[80%]",
                        message.role === 'user' ? "items-end" : "items-start"
                      )}>
                        <div className="flex items-center gap-2 px-1">
                          <span className="text-xs font-medium text-slate-500">
                            {message.role === 'user' ? "You" : activeService?.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className={cn(
                          "rounded-2xl px-4 py-3 text-sm shadow-sm",
                          message.role === 'user' 
                            ? "bg-blue-600 text-white rounded-br-none" 
                            : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tl-none"
                        )}>
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative flex gap-3">
                  <div className="flex-1 relative">
                    <Input 
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={
                        !selectedServiceId 
                          ? "Please select an agent first..." 
                          : selectedMode === 'test' && usedCount >= dailyLimit 
                            ? "Daily limit reached for Test Mode" 
                            : "Type your message here..."
                      }
                      className="pr-12 py-6 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-blue-500 rounded-xl shadow-inner"
                      disabled={!selectedServiceId || (selectedMode === 'test' && usedCount >= dailyLimit)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {selectedMode === 'test' && (
                         <span className={cn(
                           "text-xs px-2 py-0.5 rounded-full",
                           usedCount >= dailyLimit ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-500"
                         )}>
                           {usedCount}/{dailyLimit}
                         </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    size="icon" 
                    className={cn(
                      "h-12 w-12 rounded-xl shadow-md transition-all shrink-0",
                      selectedMode === 'production' 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-blue-600 hover:bg-blue-700"
                    )}
                    disabled={!selectedServiceId || !inputMessage.trim() || (selectedMode === 'test' && usedCount >= dailyLimit)}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
                <div className="text-center mt-2">
                   <p className="text-[10px] text-muted-foreground">
                     {selectedMode === 'test' 
                       ? "Test Mode: Messages may be inaccurate. Usage is limited."
                       : "Production Mode: Enterprise-grade reliability and unlimited access."
                     }
                   </p>
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
