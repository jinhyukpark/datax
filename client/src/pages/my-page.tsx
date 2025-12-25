import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ResourceCard } from "@/components/ui/resource-card";
import { RESOURCES } from "@/lib/data";
import { ArrowRight, Camera, CreditCard, Download, Eye, Heart, History, Key, Package, Share2, User, CheckCircle2, Circle, Loader2, BarChart2, Clock, XCircle, AlertCircle, MessageSquare, Send, ShoppingCart, Server, Trash2, Megaphone, Layout, PanelRight, Star, Activity, FileText, Database, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Resource } from "@/lib/data";
import { SubmitForm } from "@/components/submit-form";
import { AnalyticsView } from "@/components/analytics-view";
import { HostedRequestDetails } from "@/components/hosted-request-details";
import { HostedServiceManage } from "@/components/hosted-service-manage";
import { HostedServiceLogs } from "@/components/hosted-service-logs";
import { GeneralRequestDetails } from "@/components/general-request-details";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { format, differenceInDays } from "date-fns";

export default function MyPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [myPurchases, setMyPurchases] = useState<any[]>([]);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedPaymentItem, setSelectedPaymentItem] = useState<string | null>(null);
  
  // Payment Form State
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: ""
  });

  useEffect(() => {
    const stored = localStorage.getItem('my_purchases');
    if (stored) {
      setMyPurchases(JSON.parse(stored));
    }
  }, []);

  const openPaymentDialog = (id: string) => {
    setSelectedPaymentItem(id);
    setPaymentInfo({ cardNumber: "", expiryDate: "", cvc: "", cardholderName: "" }); // Reset form
    setPaymentDialogOpen(true);
  };

  const handlePayConfirm = () => {
    if (!selectedPaymentItem) return;
    
    const updated = myPurchases.map(p => p.id === selectedPaymentItem ? {...p, status: 'Completed'} : p);
    setMyPurchases(updated);
    localStorage.setItem('my_purchases', JSON.stringify(updated));
    setPaymentDialogOpen(false);
    toast.success(t("Payment successful!", "결제가 완료되었습니다!"));
  };
  
  // Mock User Data
  const [user, setUser] = useState({
    name: "Kim Min-su",
    email: "minsu.kim@example.com",
    avatar: "https://github.com/shadcn.png",
    company: "Data Innovation Lab",
    role: "Data Analyst"
  });

  // Mock Favorites (using existing resources)
  const favorites = RESOURCES.slice(0, 3);

  // Mock Purchase History
  const purchases = [
    {
      id: "p1",
      resourceId: "4",
      title: "Corporate Growth Big Data Center",
      date: "2025-11-20",
      price: "₩150,000",
      status: "Completed"
    },
    {
      id: "p2",
      resourceId: "10",
      title: "K-tools Smart Equipment Management Platform",
      date: "2025-10-05",
      price: "₩50,000",
      status: "Completed"
    }
  ];

  // Mock My Shared Data (Approved)
  const myData = [
    {
      id: "m1",
      title: "Seoul Public Transport Usage 2024",
      description: "Comprehensive analysis of public transport usage patterns in Seoul.",
      views: 1250,
      downloads: 340,
      status: "Active",
      date: "2025-09-15",
      unreadReviews: 3,
      totalReviews: 12,
      // Missing Resource fields
      provider: "Seoul Metro Data",
      type: "Dataset",
      price: "Free",
      tags: ["Transport", "Seoul", "Public"],
      publishedDate: "2025-09-15"
    },
    {
      id: "m2",
      title: "Korean Coffee Consumption Trends",
      description: "Market research data on coffee consumption habits across age groups.",
      views: 890,
      downloads: 120,
      status: "Active",
      date: "2025-10-22",
      unreadReviews: 0,
      totalReviews: 5,
      // Missing Resource fields
      provider: "K-Market Research",
      type: "Dataset",
      price: "Paid",
      tags: ["Coffee", "Consumption", "Market"],
      publishedDate: "2025-10-22"
    }
  ];

  // Mock Requested Data
  const [requestedData, setRequestedData] = useState([
    {
      id: "r1",
      title: "Global EV Market Analysis AI Agent",
      description: "AI Agent that aggregates and analyzes global electric vehicle market trends.",
      dates: {
        submitted: "2025-12-14",
        verifying: "2025-12-15",
        verified: null,
        rejected: null
      },
      status: "verifying", // submitted, verifying, verified, rejected
      step: 2
    },
    {
      id: "r2",
      title: "Medical Image Diagnostic Helper",
      description: "Assistant AI for preliminary analysis of X-ray images.",
      dates: {
        submitted: "2025-12-10",
        verifying: null,
        verified: null,
        rejected: null
      },
      status: "submitted",
      step: 1
    },
    {
      id: "r3",
      title: "Crypto Trading Bot V2",
      description: "Automated trading bot for cryptocurrency markets with risk management.",
      dates: {
        submitted: "2025-12-01",
        verifying: "2025-12-03",
        verified: null,
        rejected: "2025-12-05"
      },
      status: "rejected",
      step: 3, 
      rejectionReason: "Security vulnerability detected in dependency scan. Please update libraries.",
      messages: [
        { sender: "admin", text: "We found a critical vulnerability in the 'crypto-js' version you are using.", date: "2025-12-05 14:30" },
        { sender: "user", text: "I will update the package and resubmit.", date: "2025-12-05 15:45" }
      ]
    },
    {
      id: "r4",
      title: "Real-time Traffic Optimization AI",
      description: "AI system for optimizing traffic signal timings based on real-time flow data.",
      dates: {
        submitted: "2025-11-15",
        verifying: "2025-11-16",
        verified: "2025-11-18",
        rejected: null
      },
      status: "verified",
      step: 3
    }
  ]);

  const handleDeleteRequest = (id: string) => {
    setRequestedData(requestedData.filter(item => item.id !== id));
    toast.success("Submission request cancelled successfully");
  };

  // Mock Hosted Data Requests
  const [hostedDataRequests, setHostedDataRequests] = useState([
    {
      id: "h1",
      title: "Global Weather Historical Data",
      description: "Hosting request for 50TB of historical weather data from 1950-2024.",
      dates: {
        submitted: "2025-12-16",
        verifying: "2025-12-17",
        verified: null,
        rejected: null
      },
      status: "verifying",
      step: 2
    },
     {
      id: "h2",
      title: "Financial Market Tick Data",
      description: "High-frequency trading data hosting for major global exchanges.",
      dates: {
        submitted: "2025-12-18",
        verifying: null,
        verified: null,
        rejected: null
      },
      status: "submitted",
      step: 1
    },
    {
      id: "h3",
      title: "Blockchain Transaction Archive",
      description: "Full archival node hosting for Ethereum and Solana chains.",
      dates: {
        submitted: "2025-12-05",
        verifying: "2025-12-06",
        verified: null,
        rejected: "2025-12-08"
      },
      status: "rejected",
      step: 3,
      rejectionReason: "Storage requirements exceed current tier limits. Please upgrade to Enterprise plan.",
      messages: [
        { sender: "admin", text: "Your request requires 100TB+ storage which is only available on Enterprise plans.", date: "2025-12-08 09:30" },
        { sender: "user", text: "I see, I will contact sales for an upgrade.", date: "2025-12-08 10:15" }
      ]
    }
  ]);

  const handleDeleteHostedRequest = (id: string) => {
    setHostedDataRequests(hostedDataRequests.filter(item => item.id !== id));
    toast.success("Hosting request cancelled successfully");
  };

  const hostedDataApprovedMock = [
    {
      id: "ha1",
      title: "Global Weather Historical Data",
      description: "Complete historical weather data from major global stations (1980-2024).",
      status: "Active",
      endpoint: "https://api.platform.com/v1/weather",
      region: "US-East (N. Virginia)",
      tier: "Pro Plan",
      uptime: "99.99%",
      nextBilling: "2026-01-20",
      type: "DATA"
    },
    {
      id: "ha2",
      title: "Bio-Medical Research Corpus",
      description: "Annotated corpus for biomedical NLP research and training.",
      status: "Active",
      endpoint: "https://api.platform.com/v1/biomed",
      region: "Asia-Pacific (Seoul)",
      tier: "Enterprise",
      uptime: "99.95%",
      nextBilling: "2026-01-15",
      type: "AGENT"
    },
    {
      id: "ha3",
      title: "Stock Market Tick Stream",
      description: "Real-time stock market data stream via WebSocket.",
      status: "Active",
      endpoint: "wss://api.platform.com/v1/stream",
      region: "US-West (Oregon)",
      tier: "Enterprise",
      uptime: "99.99%",
      nextBilling: "2026-01-25",
      type: "MCP"
    }
  ];

  const hostedDataApproved: any[] = [];

  // Calculate statistics
  const pendingRequestsCount = requestedData.filter(r => r.status === 'submitted' || r.status === 'verifying').length;
  const approvedDataCount = myData.length;
  const totalUnreadReviews = myData.reduce((acc, curr) => acc + curr.unreadReviews, 0);

  // Mock Usage Statistics
  const [usageStats] = useState([
    {
      id: "u1",
      resourceId: "1",
      title: "Social Trend Analysis",
      type: "API",
      status: "Active",
      apiKey: "sk-live-5f...9a2b",
      usage: 45210,
      limit: 50000,
      resetDate: "2026-01-01"
    },
    {
      id: "u2",
      resourceId: "10",
      title: "K-tools Smart Equipment Management Platform",
      type: "Dataset",
      status: "Active",
      lastUpdate: "2025-12-20",
      lastDownload: "2025-12-24 14:30",
      downloadCount: 12
    },
    {
      id: "u3",
      resourceId: "3",
      title: "Wemeet Science Agent",
      type: "Agent",
      status: "Active",
      apiKey: "sk-agent-7c...3d1f",
      transactions: 1240,
      lastActive: "2025-12-25 09:15"
    },
    {
      id: "u4",
      resourceId: "5",
      title: "Smart Contract Auditor",
      type: "MCP",
      status: "Active",
      apiKey: "sk-mcp-9a...2b4c",
      transactions: 850,
      lastActive: "2025-12-26 10:20"
    },
    {
      id: "u5",
      resourceId: "8",
      title: "Quarterly Financial Reports (2024 Q1)",
      type: "Dataset",
      status: "Expired",
      lastUpdate: "2024-04-01",
      lastDownload: "2024-04-10 11:20",
      downloadCount: 3
    }
  ]);

  const [usageFilter, setUsageFilter] = useState("ALL");

  const filteredUsageStats = usageStats.filter(item => {
    if (usageFilter === "ALL") return true;
    return item.type.toUpperCase() === usageFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / User Profile Summary */}
          <div className="w-full md:w-1/4 space-y-6">
            <Card className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm">
              <CardContent className="pt-8 flex flex-col items-center text-center pb-6">
                <div className="relative mb-4 group">
                  <Avatar className="h-24 w-24 cursor-pointer border-4 border-white dark:border-slate-900 shadow-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>KM</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-1 right-1 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-sm">
                    <Camera className="h-3.5 w-3.5" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-3">{user.email}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {user.role}
                </span>

                {/* Statistics */}
                <div className="grid grid-cols-3 gap-2 w-full mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-50">{pendingRequestsCount}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Pending</span>
                  </div>
                  <div className="flex flex-col items-center border-l border-r border-slate-100 dark:border-slate-800">
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-50">{approvedDataCount}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Approved</span>
                  </div>
                  <div className="flex flex-col items-center relative">
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-50">{totalUnreadReviews}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Messages</span>
                    {totalUnreadReviews > 0 && (
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              </CardContent>
              
              <div className="bg-slate-50 dark:bg-slate-900/50 p-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" className="w-full justify-start gap-3 h-10 px-4 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                  <ArrowRight className="h-4 w-4 rotate-180" /> 
                  <span className="font-medium text-sm">{t("Log out", "로그아웃")}</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">{t("My Page", "마이 페이지")}</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-8">
                <TabsList className="flex w-full min-w-max justify-start p-1">
                  <TabsTrigger value="profile" className="gap-2 px-6">
                    <User className="h-4 w-4 hidden sm:inline" />
                    {t("Profile", "프로필")}
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="gap-2 px-6">
                    <Heart className="h-4 w-4 hidden sm:inline" />
                    {t("Favorites", "즐겨찾기")}
                  </TabsTrigger>
                  <TabsTrigger value="purchases" className="gap-2 px-6">
                    <CreditCard className="h-4 w-4 hidden sm:inline" />
                    {t("Purchases", "구매 내역")}
                  </TabsTrigger>
                  <TabsTrigger value="usage-status" className="gap-2 px-6">
                    <Activity className="h-4 w-4 hidden sm:inline" />
                    {t("Usage Status", "이용 현황")}
                  </TabsTrigger>
                  <TabsTrigger value="my-data" className="gap-2 px-6">
                    <Share2 className="h-4 w-4 hidden sm:inline" />
                    {t("Linked Service", "연동 서비스")}
                  </TabsTrigger>
                  <TabsTrigger value="hosted-data" className="gap-2 px-6">
                    <Server className="h-4 w-4 hidden sm:inline" />
                    {t("Hosted Service", "호스팅 서비스")}
                  </TabsTrigger>
                </TabsList>
              </ScrollArea>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("Account Information", "계정 정보")}</CardTitle>
                    <CardDescription>
                      {t("Update your profile details and manage your account settings.", "프로필 정보를 업데이트하고 계정 설정을 관리하세요.")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("Full Name", "이름")}</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t("Email", "이메일")}</Label>
                        <Input id="email" defaultValue={user.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">{t("Company", "회사/소속")}</Label>
                        <Input id="company" defaultValue={user.company} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">{t("Role", "직책")}</Label>
                        <Input id="role" defaultValue={user.role} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>{t("Save Changes", "변경사항 저장")}</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("Security", "보안")}</CardTitle>
                    <CardDescription>
                      {t("Manage your password and account security.", "비밀번호 및 계정 보안을 관리하세요.")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">{t("Current Password", "현재 비밀번호")}</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">{t("New Password", "새 비밀번호")}</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">{t("Confirm Password", "비밀번호 확인")}</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" className="gap-2">
                      <Key className="h-4 w-4" /> {t("Change Password", "비밀번호 변경")}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Favorites Tab */}
              <TabsContent value="favorites">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2">{t("Favorite Resources", "관심 상품")}</h2>
                  <p className="text-muted-foreground">{t("Data products you have bookmarked.", "즐겨찾기한 데이터 상품 목록입니다.")}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </TabsContent>

              {/* Usage Status Tab */}
              <TabsContent value="usage-status">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">{t("Resource Usage Status", "리소스 이용 현황")}</h2>
                  <p className="text-muted-foreground">{t("Monitor your usage, manage API keys, and download updates.", "사용량을 모니터링하고 API 키를 관리하며 업데이트를 다운로드하세요.")}</p>
                </div>

                <div className="flex space-x-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto">
                  {["ALL", "DATA", "API", "MCP", "AGENT"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setUsageFilter(type)}
                      className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative whitespace-nowrap ${
                        usageFilter === type
                          ? "text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border-x border-t border-slate-200 dark:border-slate-800 -mb-1.5 pb-2.5 z-10"
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {type === "DATA" ? "Dataset" : type === "AGENT" ? "Agent" : type}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  {filteredUsageStats.length > 0 ? (
                    filteredUsageStats.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            item.type === 'API' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                            item.type === 'Dataset' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                          }`}>
                            {item.type === 'API' ? <Server className="h-5 w-5" /> :
                             item.type === 'Dataset' ? <Database className="h-5 w-5" /> :
                             <Zap className="h-5 w-5" />}
                          </div>
                          <div>
                            <h3 className="font-semibold text-base">{item.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-medium">{item.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${
                            item.status === 'Active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            <span className={`mr-1.5 h-2 w-2 rounded-full ${item.status === 'Active' ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                            {item.status}
                          </span>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        {item.type === 'API' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-4">{t("Usage Overview", "사용량 개요")}</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.usage?.toLocaleString()} / {item.limit?.toLocaleString()} calls</span>
                                    <span className="text-muted-foreground">{Math.round((item.usage! / item.limit!) * 100)}%</span>
                                  </div>
                                  <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-blue-600 rounded-full transition-all" 
                                      style={{ width: `${(item.usage! / item.limit!) * 100}%` }}
                                    ></div>
                                  </div>
                                  <p className="text-xs text-muted-foreground text-right pt-1">
                                    Resets on {item.resetDate}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-sm font-medium text-muted-foreground">{t("API Configuration", "API 설정")}</h4>
                              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">API Key</span>
                                  <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600 hover:text-blue-700">Roll Key</Button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 bg-white dark:bg-slate-950 px-3 py-2 rounded border border-slate-200 dark:border-slate-800 font-mono text-sm">
                                    {item.apiKey}
                                  </code>
                                  <Button size="icon" variant="outline" className="h-9 w-9">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.type === 'Dataset' && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center gap-3 mb-2">
                                <Clock className="h-5 w-5 text-emerald-500" />
                                <span className="font-medium text-sm text-muted-foreground">{t("Last Update", "최근 업데이트")}</span>
                              </div>
                              <p className="text-lg font-bold">{item.lastUpdate}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                              <div className="flex items-center gap-3 mb-2">
                                <History className="h-5 w-5 text-blue-500" />
                                <span className="font-medium text-sm text-muted-foreground">{t("Last Download", "최근 다운로드")}</span>
                              </div>
                              <p className="text-lg font-bold">{item.lastDownload}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm text-muted-foreground">{t("Total Downloads", "총 다운로드")}</span>
                                <span className="font-bold">{item.downloadCount}</span>
                              </div>
                              <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                                <Download className="h-4 w-4" />
                                {t("Download Latest", "최신 버전 다운로드")}
                              </Button>
                            </div>
                          </div>
                        )}

                        {(item.type === 'Agent' || item.type === 'MCP') && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-4">{t("Activity", "활동")}</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30">
                                    <div className="text-sm text-muted-foreground mb-1">Total Transactions</div>
                                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">{item.transactions?.toLocaleString()}</div>
                                  </div>
                                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                                    <div className="text-sm text-muted-foreground mb-1">Last Active</div>
                                    <div className="text-lg font-semibold">{item.lastActive}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <h4 className="text-sm font-medium text-muted-foreground">{t("Authentication", "인증 관리")}</h4>
                              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Agent Key</span>
                                  <Button variant="ghost" size="sm" className="h-6 text-xs text-purple-600 hover:text-purple-700">Regenerate</Button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <code className="flex-1 bg-white dark:bg-slate-950 px-3 py-2 rounded border border-slate-200 dark:border-slate-800 font-mono text-sm">
                                    {item.apiKey}
                                  </code>
                                  <Button size="icon" variant="outline" className="h-9 w-9">
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    ))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground bg-slate-50/50 rounded-lg border border-dashed border-slate-200">
                      <p>{t("No resources found for this category.", "해당 카테고리의 리소스가 없습니다.")}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Purchases Tab */}
              <TabsContent value="purchases">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("Purchase History", "구매 내역")}</CardTitle>
                    <CardDescription>
                      {t("View your transaction history and access purchased data.", "거래 내역을 확인하고 구매한 데이터에 액세스하세요.")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="data-products" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="data-products">{t("Data Products", "데이터 상품")}</TabsTrigger>
                        <TabsTrigger value="advertising">{t("Advertising", "광고")}</TabsTrigger>
                      </TabsList>

                      <TabsContent value="data-products">
                        <div className="rounded-md border">
                          <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                            <div className="col-span-6 md:col-span-5">{t("Product", "상품명")}</div>
                            <div className="col-span-3 md:col-span-2">{t("Date", "날짜")}</div>
                            <div className="col-span-3 md:col-span-2">{t("Amount", "금액")}</div>
                            <div className="hidden md:col-span-2 md:block">{t("Status", "상태")}</div>
                            <div className="hidden md:col-span-1 md:block text-center">{t("Action", "관리")}</div>
                          </div>
                          <div className="divide-y">
                            {purchases.map((item) => (
                              <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                <div className="col-span-6 md:col-span-5 font-medium truncate">{item.title}</div>
                                <div className="col-span-3 md:col-span-2 text-muted-foreground">{item.date}</div>
                                <div className="col-span-3 md:col-span-2 font-medium">{item.price}</div>
                                <div className="hidden md:col-span-2 md:block">
                                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 shadow hover:bg-green-100/80">
                                    {item.status}
                                  </span>
                                </div>
                                <div className="hidden md:col-span-1 md:block text-center">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="advertising">
                        <div className="space-y-8">
                          {/* Empty State (Always visible as requested) */}
                          <div className="text-center py-12 text-muted-foreground border-b border-dashed border-slate-200 dark:border-slate-800">
                            <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-20" />
                            <p>{t("No advertising history found.", "광고 구매 내역이 없습니다.")}</p>
                            <Button variant="link" onClick={() => setLocation('/advertise')}>
                              {t("Browse Ad Products", "광고 상품 둘러보기")}
                            </Button>
                          </div>

                          {/* Purchase List (Visible for demo) */}
                          <div>
                            <h3 className="text-sm font-semibold mb-4 text-muted-foreground">Publisher Preview: Purchased Items</h3>
                            <div className="rounded-md border">
                              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                                <div className="col-span-6 md:col-span-5">{t("Product", "상품명")}</div>
                                <div className="col-span-3 md:col-span-2">{t("Duration", "기간")}</div>
                                <div className="col-span-3 md:col-span-2">{t("Amount", "금액")}</div>
                                <div className="hidden md:col-span-2 md:block">{t("Status", "상태")}</div>
                                <div className="hidden md:col-span-1 md:block text-center">{t("Action", "관리")}</div>
                              </div>
                              <div className="divide-y">
                                {/* Mock Item 1 */}
                                <div className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                  <div className="col-span-6 md:col-span-5">
                                    <div className="font-medium truncate">Banner Ad</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">Oct 01 - Oct 31</div>
                                  </div>
                                  <div className="col-span-3 md:col-span-2 text-muted-foreground">30 days</div>
                                  <div className="col-span-3 md:col-span-2 font-medium">₩316,000</div>
                                  <div className="hidden md:col-span-2 md:block">
                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 shadow">
                                      Active
                                    </span>
                                  </div>
                                  <div className="hidden md:col-span-1 md:block text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50">
                                      <Megaphone className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                {/* Mock Item 2 */}
                                <div className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                  <div className="col-span-6 md:col-span-5">
                                    <div className="font-medium truncate">Listing Ad</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">Sep 15 - Sep 22</div>
                                  </div>
                                  <div className="col-span-3 md:col-span-2 text-muted-foreground">7 days</div>
                                  <div className="col-span-3 md:col-span-2 font-medium">₩69,000</div>
                                  <div className="hidden md:col-span-2 md:block">
                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 shadow">
                                      Completed
                                    </span>
                                  </div>
                                  <div className="hidden md:col-span-1 md:block text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50">
                                      <Layout className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                {/* Mock Item 3 */}
                                <div className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                  <div className="col-span-6 md:col-span-5">
                                    <div className="font-medium truncate">Agent Sidebar Ad</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">Nov 01 - Nov 07</div>
                                  </div>
                                  <div className="col-span-3 md:col-span-2 text-muted-foreground">7 days</div>
                                  <div className="col-span-3 md:col-span-2 font-medium">₩59,000</div>
                                  <div className="hidden md:col-span-2 md:block">
                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 shadow">
                                      Scheduled
                                    </span>
                                  </div>
                                  <div className="hidden md:col-span-1 md:block text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-pink-500 bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50">
                                      <PanelRight className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                {/* Mock Item 4 */}
                                <div className="grid grid-cols-12 gap-4 p-4 items-center text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                  <div className="col-span-6 md:col-span-5">
                                    <div className="font-medium truncate">Sponsor Logo</div>
                                    <div className="text-xs text-muted-foreground mt-0.5">Dec 01 - Dec 31</div>
                                  </div>
                                  <div className="col-span-3 md:col-span-2 text-muted-foreground">30 days</div>
                                  <div className="col-span-3 md:col-span-2 font-medium">₩116,000</div>
                                  <div className="hidden md:col-span-2 md:block">
                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 shadow">
                                      Active
                                    </span>
                                  </div>
                                  <div className="hidden md:col-span-1 md:block text-center">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50">
                                      <Star className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>

              <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{t("Enter Payment Details", "결제 정보 입력")}</DialogTitle>
                    <DialogDescription>
                      {t("Secure payment processing for your advertising purchase.", "광고 구매를 위한 안전한 결제 처리를 위해 정보를 입력하세요.")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="mp-card-number">{t("Card Number", "카드 번호")}</Label>
                      <Input 
                        id="mp-card-number" 
                        placeholder="0000 0000 0000 0000" 
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="mp-expiry">{t("Expiry Date", "유효기간")}</Label>
                        <Input 
                          id="mp-expiry" 
                          placeholder="MM/YY" 
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mp-cvc">{t("CVC", "CVC")}</Label>
                        <Input 
                          id="mp-cvc" 
                          placeholder="123" 
                          value={paymentInfo.cvc}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cvc: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mp-name">{t("Cardholder Name", "카드 소유자 이름")}</Label>
                      <Input 
                        id="mp-name" 
                        placeholder="John Doe" 
                        value={paymentInfo.cardholderName}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                      {t("Cancel", "취소")}
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={handlePayConfirm}>
                      {t("Confirm Payment", "결제 확인")}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* My Shared Data Tab */}
              <TabsContent value="my-data">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{t("Linked Service", "연동 서비스")}</h2>
                    <p className="text-muted-foreground text-sm">{t("Manage your linked data services and view request status.", "연동 데이터 서비스 및 요청 상태를 관리하세요.")}</p>
                  </div>
                  <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700" onClick={() => setLocation('/submit')}>
                    <Package className="h-4 w-4" />
                    {t("Upload New Data", "새 데이터 업로드")}
                  </Button>
                </div>

                <Tabs defaultValue="approved" className="w-full">
                  <div className="border-b border-slate-200 dark:border-slate-800 mb-6">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent rounded-none">
                      <TabsTrigger 
                        value="approved" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 font-semibold text-muted-foreground data-[state=active]:text-primary"
                      >
                        {t("Approved", "승인됨")}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="request" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 font-semibold text-muted-foreground data-[state=active]:text-primary"
                      >
                        {t("Request", "승인요청")}
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  {/* Approved Tab Content */}
                  <TabsContent value="approved" className="mt-0">
                    <div className="grid grid-cols-1 gap-4">
                      {myData.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="p-6 flex-grow">
                              <div className="flex justify-between items-start mb-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <h3 className="text-lg font-bold hover:text-primary cursor-pointer">{item.title}</h3>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[900px] h-[90vh] overflow-y-auto">
                                    <SubmitForm 
                                      initialData={item as Resource} 
                                      mode="edit-approved" 
                                      defaultTab="overview"
                                      onSuccess={() => {}}
                                    />
                                  </DialogContent>
                                </Dialog>
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                  {item.status}
                                </span>
                              </div>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
                              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <History className="h-4 w-4" />
                                  <span>{item.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{item.views} views</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Download className="h-4 w-4" />
                                  <span>{item.downloads} downloads</span>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div className={`flex items-center gap-1 font-medium cursor-pointer hover:underline transition-colors ${
                                      (item as any).unreadReviews > 0 ? "text-red-600" : "text-muted-foreground hover:text-primary"
                                    }`}>
                                      <MessageSquare className="h-4 w-4" />
                                      <span>
                                        {(item as any).unreadReviews > 0 
                                          ? `${(item as any).unreadReviews} unread of ${(item as any).totalReviews || 0} messages`
                                          : `${(item as any).totalReviews || 0} messages`
                                        }
                                      </span>
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[900px] h-[90vh] overflow-y-auto">
                                    <SubmitForm 
                                      initialData={item as Resource} 
                                      mode="edit-approved" 
                                      defaultTab="reviews"
                                      onSuccess={() => {}}
                                    />
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-900 p-6 flex flex-row md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l min-w-[140px]">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div className="relative w-full">
                                    <Button variant="outline" size="sm" className="w-full">
                                      {t("Edit", "수정")}
                                    </Button>
                                    {(item as any).unreadReviews > 0 && (
                                      <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white dark:border-slate-900">
                                        {(item as any).unreadReviews}
                                      </span>
                                    )}
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[900px] h-[90vh] overflow-y-auto">
                                  <SubmitForm 
                                    initialData={item as Resource} 
                                    mode="edit-approved" 
                                    defaultTab="overview"
                                    onSuccess={() => {
                                      // In a real app, refresh data
                                      // For now, close dialog is handled inside SubmitForm or we could use state
                                    }}
                                  />
                                </DialogContent>
                              </Dialog>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="w-full gap-2">
                                    <BarChart2 className="h-3 w-3" />
                                    {t("Analytics", "통계")}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[1000px] h-[90vh] overflow-y-auto">
                                    <AnalyticsView resourceId={item.id} resourceTitle={item.title} />
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Request Tab Content */}
                  <TabsContent value="request" className="mt-0">
                    <div className="space-y-4">
                      {requestedData.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 justify-between">
                              <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-bold">{item.title}</h3>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {item.dates.submitted}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-6">{item.description}</p>
                                
                                {/* Progress Bar */}
                                <div className="relative pb-10">
                                  {/* Line - positioned at center of h-8 (32px) circle. Top should be 14px (16px center - 2px half height) */}
                                  <div className="absolute top-[14px] left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                  <div 
                                    className={`absolute top-[14px] left-0 h-1 rounded-full transition-all duration-500 ${item.status === 'rejected' ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: item.status === 'rejected' ? '100%' : item.step === 1 ? '0%' : item.step === 2 ? '50%' : '100%' }}
                                  />
                                  
                                  <div className="relative flex justify-between w-full">
                                    {/* Step 1: Submitted */}
                                    <div className="flex flex-col items-center gap-2">
                                      <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-950 ${item.step >= 1 || item.status === 'rejected' ? 'border-green-500 text-green-500' : 'border-slate-200 text-slate-300'}`}>
                                        <CheckCircle2 className="h-4 w-4" />
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className={`text-xs font-medium ${item.step >= 1 || item.status === 'rejected' ? 'text-green-600' : 'text-muted-foreground'}`}>
                                          {t("Submitted", "제출완료")}
                                        </span>
                                        {item.dates.submitted && <span className="text-[10px] text-muted-foreground mt-0.5">{item.dates.submitted}</span>}
                                      </div>
                                    </div>

                                    {/* Step 2: Verifying */}
                                    <div className="flex flex-col items-center gap-2">
                                      <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-950 ${
                                        item.status === 'rejected' ? 'border-green-500 text-green-500' :
                                        item.step === 2 ? 'border-blue-500 text-blue-500 animate-pulse' : 
                                        item.step > 2 ? 'border-green-500 text-green-500' : 
                                        'border-slate-200 text-slate-300'
                                      }`}>
                                        {item.step === 2 && item.status !== 'rejected' ? <Loader2 className="h-4 w-4 animate-spin" /> : 
                                         (item.step > 2 || item.status === 'rejected') ? <CheckCircle2 className="h-4 w-4" /> :
                                         <Circle className="h-4 w-4" />}
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className={`text-xs font-medium ${item.step === 2 && item.status !== 'rejected' ? 'text-blue-600' : (item.step > 2 || item.status === 'rejected') ? 'text-green-600' : 'text-muted-foreground'}`}>
                                          {t("Verifying", "검증중")}
                                        </span>
                                        {item.dates.verifying && <span className="text-[10px] text-muted-foreground mt-0.5">{item.dates.verifying}</span>}
                                      </div>
                                    </div>

                                    {/* Step 3: Verified / Rejected */}
                                    <div className="flex flex-col items-center gap-2">
                                      <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-950 ${
                                        item.status === 'rejected' ? 'border-red-500 text-red-500' :
                                        item.step === 3 ? 'border-green-500 text-green-500' : 'border-slate-200 text-slate-300'
                                      }`}>
                                        {item.status === 'rejected' ? <XCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className={`text-xs font-medium ${item.status === 'rejected' ? 'text-red-600' : item.step === 3 ? 'text-green-600' : 'text-muted-foreground'}`}>
                                          {item.status === 'rejected' ? t("Rejected", "반려됨") : t("Verified", "검증완료")}
                                        </span>
                                        {item.status === 'rejected' && item.dates.rejected && <span className="text-[10px] text-red-400 mt-0.5">{item.dates.rejected}</span>}
                                        {item.status !== 'rejected' && item.dates.verified && <span className="text-[10px] text-muted-foreground mt-0.5">{item.dates.verified}</span>}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Rejection Details */}
                                {item.status === 'rejected' && (
                                  <div className="mt-6 animate-in fade-in slide-in-from-top-2">
                                    <Alert variant="destructive" className="mb-4 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900">
                                      <AlertCircle className="h-4 w-4" />
                                      <AlertTitle>Submission Rejected</AlertTitle>
                                      <AlertDescription>
                                        {item.rejectionReason}
                                      </AlertDescription>
                                    </Alert>
                                    
                                    <div className="flex gap-3">
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                                            Edit & Resubmit
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl h-[90vh] p-0">
                                          <ScrollArea className="h-full max-h-[90vh]">
                                            <div className="p-6 md:p-8">
                                              <SubmitForm />
                                            </div>
                                          </ScrollArea>
                                        </DialogContent>
                                      </Dialog>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="sm" className="gap-2">
                                            <MessageSquare className="h-4 w-4" /> Message Admin
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[500px]">
                                          <DialogHeader>
                                            <DialogTitle>Messages</DialogTitle>
                                          </DialogHeader>
                                          <div className="flex flex-col h-[400px]">
                                            <ScrollArea className="flex-1 p-4 border rounded-md mb-4 bg-slate-50 dark:bg-slate-900">
                                              <div className="space-y-4">
                                                {item.messages?.map((msg, idx) => (
                                                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-slate-800 border'}`}>
                                                      <p>{msg.text}</p>
                                                      <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>{msg.date}</p>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </ScrollArea>
                                            <div className="flex gap-2">
                                              <Input placeholder="Type your message..." />
                                              <Button size="icon">
                                                <Send className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </div>
                                )}

                              </div>
                              
                              <div className="flex flex-col justify-start min-w-[140px] gap-2">
                                <div className={`rounded-lg p-3 text-center ${item.status === 'rejected' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-slate-50 dark:bg-slate-900'}`}>
                                  <div className="text-xs text-muted-foreground mb-1">Current Status</div>
                                  <div className={`font-bold ${
                                    item.status === 'rejected' ? 'text-red-600' : 
                                    item.step === 2 ? 'text-blue-600' : 'text-green-600'
                                  }`}>
                                    {item.status === 'rejected' ? 'Rejected' : 
                                     item.step === 1 ? 'Submitted' : 
                                     item.step === 2 ? 'Under Review' : 'Approved'}
                                  </div>
                                </div>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full">
                                      {t("View Details", "상세 보기")}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                    <GeneralRequestDetails data={item} />
                                  </DialogContent>
                                </Dialog>

                                {item.step === 1 && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="sm" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 dark:border-red-900/50 dark:hover:bg-red-900/20">
                                        <Trash2 className="h-3 w-3 mr-2" />
                                        {t("Cancel", "신청 취소")}
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>{t("Cancel Request?", "신청을 취소하시겠습니까?")}</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          {t("Are you sure you want to cancel this submission? This action cannot be undone.", "이 제출을 취소하시겠습니까? 이 작업은 되돌릴 수 없습니다.")}
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>{t("Keep Request", "유지하기")}</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDeleteRequest(item.id)}>
                                          {t("Yes, Cancel", "네, 취소합니다")}
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              {/* Hosted Data Tab */}
              <TabsContent value="hosted-data">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{t("Hosted Data Services", "호스팅 데이터 서비스")}</h2>
                    <p className="text-muted-foreground text-sm">{t("Manage your hosted data services and view request status.", "호스팅 데이터 서비스 및 요청 상태를 관리하세요.")}</p>
                  </div>
                  <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={() => setLocation('/submit')}>
                    <Server className="h-4 w-4" />
                    {t("New Hosting Request", "새 호스팅 요청")}
                  </Button>
                </div>

                <Tabs defaultValue="request" className="w-full">
                  <div className="border-b border-slate-200 dark:border-slate-800 mb-6">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent rounded-none">
                      <TabsTrigger 
                        value="approved" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 font-semibold text-muted-foreground data-[state=active]:text-primary"
                      >
                        {t("Approved", "승인됨")}
                      </TabsTrigger>
                      <TabsTrigger 
                        value="request" 
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 font-semibold text-muted-foreground data-[state=active]:text-primary"
                      >
                        {t("Request", "승인요청")}
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  {/* Approved Tab Content */}
                  <TabsContent value="approved" className="mt-0">
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 mb-8">
                      <Server className="mx-auto h-12 w-12 mb-4 opacity-20" />
                      <h3 className="text-lg font-medium text-muted-foreground">{t("No active hosted services", "활성 호스팅 서비스가 없습니다")}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{t("Your approved hosted services will appear here.", "승인된 호스팅 서비스가 여기에 표시됩니다.")}</p>
                    </div>

                    <div className="space-y-4 opacity-75">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded rounded-md border border-amber-200">
                          DEV PREVIEW
                        </span>
                        <span className="text-xs text-muted-foreground">
                          These items are shown for design verification.
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {hostedDataApprovedMock.map((item) => (
                          <Card key={item.id} className="overflow-hidden border-slate-200 dark:border-slate-800">
                            <div className="flex flex-col md:flex-row">
                              <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                    {item.type && (
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                        item.type === 'MCP' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800' :
                                        item.type === 'DATA' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' :
                                        'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800'
                                      }`}>
                                        {item.type}
                                      </span>
                                    )}
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-primary">
                                          <Eye className="h-3 w-3" />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <HostedRequestDetails data={item} />
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {item.status}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Endpoint</p>
                                    <div className="flex items-center gap-1 font-mono text-xs bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                                      {item.endpoint}
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Region</p>
                                    <p className="font-medium">{item.region}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Plan Tier</p>
                                    <p className="font-medium">{item.tier}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Uptime (30d)</p>
                                    <p className="font-medium text-green-600">{item.uptime}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-900 p-6 flex flex-row md:flex-col justify-center gap-2 border-t md:border-t-0 md:border-l min-w-[160px]">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full">
                                      Manage
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-5xl h-[90vh] p-6">
                                    <HostedServiceManage data={item} />
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full">
                                      View Logs
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none">
                                    <HostedServiceLogs serviceName={item.title} />
                                  </DialogContent>
                                </Dialog>
                                
                                <p className="text-[10px] text-muted-foreground text-center mt-2">
                                  Next bill: {item.nextBilling}
                                </p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Request Tab Content */}
                  <TabsContent value="request" className="mt-0">
                    <div className="space-y-4">
                      {hostedDataRequests.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6 justify-between">
                              <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-bold">{item.title}</h3>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> {item.dates.submitted}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-6">{item.description}</p>
                                
                                {/* Progress Bar */}
                                <div className="relative pb-10">
                                  {/* Line */}
                                  <div className="absolute top-[14px] left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                                  <div 
                                    className={`absolute top-[14px] left-0 h-1 rounded-full transition-all duration-500 ${item.status === 'rejected' ? 'bg-red-500' : 'bg-green-500'}`}
                                    style={{ width: item.status === 'rejected' ? '100%' : item.step === 1 ? '0%' : item.step === 2 ? '50%' : '100%' }}
                                  />
                                  
                                  <div className="relative flex justify-between w-full">
                                    {/* Step 1: Submitted */}
                                    <div className="flex flex-col items-center gap-2">
                                      <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-950 ${item.step >= 1 || item.status === 'rejected' ? 'border-green-500 text-green-500' : 'border-slate-200 text-slate-300'}`}>
                                        <CheckCircle2 className="h-4 w-4" />
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className={`text-xs font-medium ${item.step >= 1 || item.status === 'rejected' ? 'text-green-600' : 'text-muted-foreground'}`}>
                                          {t("Submitted", "제출완료")}
                                        </span>
                                        {item.dates.submitted && <span className="text-[10px] text-muted-foreground mt-0.5">{item.dates.submitted}</span>}
                                      </div>
                                    </div>

                                    {/* Step 2: Verifying */}
                                    <div className="flex flex-col items-center gap-2">
                                      <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-950 ${
                                        item.status === 'rejected' ? 'border-green-500 text-green-500' :
                                        item.step === 2 ? 'border-blue-500 text-blue-500 animate-pulse' : 
                                        item.step > 2 ? 'border-green-500 text-green-500' : 
                                        'border-slate-200 text-slate-300'
                                      }`}>
                                        {item.step === 2 && item.status !== 'rejected' ? <Loader2 className="h-4 w-4 animate-spin" /> : 
                                         (item.step > 2 || item.status === 'rejected') ? <CheckCircle2 className="h-4 w-4" /> :
                                         <Circle className="h-4 w-4" />}
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className={`text-xs font-medium ${item.step === 2 && item.status !== 'rejected' ? 'text-blue-600' : (item.step > 2 || item.status === 'rejected') ? 'text-green-600' : 'text-muted-foreground'}`}>
                                          {t("Verifying", "검증중")}
                                        </span>
                                        {item.dates.verifying && <span className="text-[10px] text-muted-foreground mt-0.5">{item.dates.verifying}</span>}
                                      </div>
                                    </div>

                                    {/* Step 3: Verified / Rejected */}
                                    <div className="flex flex-col items-center gap-2">
                                      <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 bg-white dark:bg-slate-950 ${
                                        item.status === 'rejected' ? 'border-red-500 text-red-500' :
                                        item.step === 3 ? 'border-green-500 text-green-500' : 'border-slate-200 text-slate-300'
                                      }`}>
                                        {item.status === 'rejected' ? <XCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                                      </div>
                                      <div className="flex flex-col items-center">
                                        <span className={`text-xs font-medium ${item.status === 'rejected' ? 'text-red-600' : item.step === 3 ? 'text-green-600' : 'text-muted-foreground'}`}>
                                          {item.status === 'rejected' ? t("Rejected", "반려됨") : t("Verified", "검증완료")}
                                        </span>
                                        {item.status === 'rejected' && item.dates.rejected && <span className="text-[10px] text-red-400 mt-0.5">{item.dates.rejected}</span>}
                                        {item.status !== 'rejected' && item.dates.verified && <span className="text-[10px] text-muted-foreground mt-0.5">{item.dates.verified}</span>}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Rejection Details */}
                                {item.status === 'rejected' && (
                                  <div className="mt-6 animate-in fade-in slide-in-from-top-2">
                                    <Alert variant="destructive" className="mb-4 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900">
                                      <AlertCircle className="h-4 w-4" />
                                      <AlertTitle>Submission Rejected</AlertTitle>
                                      <AlertDescription>
                                        {item.rejectionReason}
                                      </AlertDescription>
                                    </Alert>
                                    
                                    <div className="flex gap-3">
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                                            Edit & Resubmit
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl h-[90vh] p-0">
                                          <ScrollArea className="h-full max-h-[90vh]">
                                            <div className="p-6 md:p-8">
                                              <SubmitForm />
                                            </div>
                                          </ScrollArea>
                                        </DialogContent>
                                      </Dialog>
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button variant="outline" size="sm" className="gap-2">
                                            <MessageSquare className="h-4 w-4" /> Message Admin
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[500px]">
                                          <DialogHeader>
                                            <DialogTitle>Messages</DialogTitle>
                                          </DialogHeader>
                                          <div className="flex flex-col h-[400px]">
                                            <ScrollArea className="flex-1 p-4 border rounded-md mb-4 bg-slate-50 dark:bg-slate-900">
                                              <div className="space-y-4">
                                                {item.messages?.map((msg, idx) => (
                                                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-slate-800 border'}`}>
                                                      <p>{msg.text}</p>
                                                      <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-muted-foreground'}`}>{msg.date}</p>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </ScrollArea>
                                            <div className="flex gap-2">
                                              <Input placeholder="Type your message..." />
                                              <Button size="icon">
                                                <Send className="h-4 w-4" />
                                              </Button>
                                            </div>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex flex-col justify-start min-w-[140px] gap-2">
                                <div className={`rounded-lg p-3 text-center ${item.status === 'rejected' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-slate-50 dark:bg-slate-900'}`}>
                                  <div className="text-xs text-muted-foreground mb-1">Current Status</div>
                                  <div className={`font-bold ${
                                    item.status === 'rejected' ? 'text-red-600' : 
                                    item.step === 2 ? 'text-blue-600' : 'text-green-600'
                                  }`}>
                                    {item.status === 'rejected' ? 'Rejected' : 
                                     item.step === 1 ? 'Submitted' : 
                                     item.step === 2 ? 'Under Review' : 'Approved'}
                                  </div>
                                </div>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full">
                                      {t("View Details", "상세 보기")}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                     <HostedRequestDetails data={item} isEditable={item.status === 'submitted'} />
                                  </DialogContent>
                                </Dialog>

                                {item.step === 1 && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="sm" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 dark:border-red-900/50 dark:hover:bg-red-900/20">
                                        <Trash2 className="h-3 w-3 mr-2" />
                                        {t("Cancel", "신청 취소")}
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>{t("Cancel Request?", "신청을 취소하시겠습니까?")}</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          {t("Are you sure you want to cancel this hosting request? This action cannot be undone.", "이 호스팅 요청을 취소하시겠습니까? 이 작업은 되돌릴 수 없습니다.")}
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>{t("Keep Request", "유지하기")}</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDeleteHostedRequest(item.id)}>
                                          {t("Yes, Cancel", "네, 취소합니다")}
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
