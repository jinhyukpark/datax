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
import { ArrowRight, Camera, CreditCard, Download, Eye, Heart, History, Key, Package, Settings, Share2, User, CheckCircle2, Circle, Loader2, BarChart2, Clock, XCircle, AlertCircle, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Resource } from "@/lib/data";
import { SubmitForm } from "@/components/submit-form";

export default function MyPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  
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
      unreadReviews: 3
    },
    {
      id: "m2",
      title: "Korean Coffee Consumption Trends",
      description: "Market research data on coffee consumption habits across age groups.",
      views: 890,
      downloads: 120,
      status: "Active",
      date: "2025-10-22",
      unreadReviews: 0
    }
  ];

  // Mock Requested Data
  const requestedData = [
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
  ];

  // Calculate statistics
  const pendingRequestsCount = requestedData.filter(r => r.status === 'submitted' || r.status === 'verifying').length;
  const approvedDataCount = myData.length;
  const totalUnreadReviews = myData.reduce((acc, curr) => acc + curr.unreadReviews, 0);

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
                <Button variant="ghost" className="w-full justify-start gap-3 h-10 px-4 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50">
                  <Settings className="h-4 w-4" /> 
                  <span className="font-medium text-sm">{t("Settings", "설정")}</span>
                </Button>
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
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4 hidden sm:inline" />
                  {t("Profile", "프로필")}
                </TabsTrigger>
                <TabsTrigger value="favorites" className="gap-2">
                  <Heart className="h-4 w-4 hidden sm:inline" />
                  {t("Favorites", "즐겨찾기")}
                </TabsTrigger>
                <TabsTrigger value="purchases" className="gap-2">
                  <CreditCard className="h-4 w-4 hidden sm:inline" />
                  {t("Purchases", "구매 내역")}
                </TabsTrigger>
                <TabsTrigger value="my-data" className="gap-2">
                  <Share2 className="h-4 w-4 hidden sm:inline" />
                  {t("My Data", "공유 데이터")}
                </TabsTrigger>
              </TabsList>

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
                  </CardContent>
                </Card>
              </TabsContent>

              {/* My Shared Data Tab */}
              <TabsContent value="my-data">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{t("My Data", "나의 데이터")}</h2>
                    <p className="text-muted-foreground text-sm">{t("Manage your shared data and view requests.", "공유한 데이터 및 요청 상태를 관리하세요.")}</p>
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
                                <h3 className="text-lg font-bold hover:text-primary cursor-pointer">{item.title}</h3>
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
                                <DialogContent className="sm:max-w-[600px]">
                                  <DialogHeader>
                                    <DialogTitle>{t("Data Analytics", "데이터 분석")}</DialogTitle>
                                  </DialogHeader>
                                  <div className="py-6">
                                    <div className="h-[200px] w-full bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6">
                                      <BarChart2 className="h-16 w-16 text-slate-300 dark:text-slate-600" />
                                      <span className="sr-only">Analytics Chart Placeholder</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                      <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                        <div className="text-2xl font-bold text-primary">{item.views}</div>
                                        <div className="text-xs text-muted-foreground">Total Views</div>
                                      </div>
                                      <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                        <div className="text-2xl font-bold text-blue-600">{item.downloads}</div>
                                        <div className="text-xs text-muted-foreground">Downloads</div>
                                      </div>
                                      <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                                        <div className="text-2xl font-bold text-green-600">4.8</div>
                                        <div className="text-xs text-muted-foreground">Rating</div>
                                      </div>
                                    </div>
                                  </div>
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
                              
                              <div className="flex flex-col justify-start min-w-[120px]">
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
