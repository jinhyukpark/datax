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
import { ArrowRight, Camera, CreditCard, Download, Eye, Heart, History, Key, Package, Share2, User, CheckCircle2, Circle, Loader2, BarChart2, Clock, XCircle, AlertCircle, MessageSquare, Send, ShoppingCart, Server, Trash2, Megaphone, Layout, PanelRight, Star, Activity, FileText, Database, Zap, Power, Plus, ShieldCheck, Link2, Shield, Calendar, Upload, Paperclip, Terminal, Building2, Globe, Mail, ImagePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Resource } from "@/lib/data";
import { SubmitForm } from "@/components/submit-form";
import { AnalyticsView } from "@/components/analytics-view";
import { HostedRequestDetails } from "@/components/hosted-request-details";
import { HostedServiceManage } from "@/components/hosted-service-manage";
import { HostedServiceLogs } from "@/components/hosted-service-logs";
import { HostedServiceReviews } from "@/components/hosted-service-reviews";
import { GeneralRequestDetails } from "@/components/general-request-details";
import { ContractDetailsDialog } from "@/components/contract-details-dialog";
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
  const [myPurchases, setMyPurchases] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<any>(null);
  const [pricingType, setPricingType] = useState<"Paid" | "Free">("Paid");
  const [expandedApiDocs, setExpandedApiDocs] = useState<{ filter_free_events: boolean }>({ filter_free_events: false });
  const [tryAskingQuestions, setTryAskingQuestions] = useState<string[]>([
    "Find researchers specializing in renewable energy",
    "Who are the top AI researchers in Korea?",
    "Match me with experts in quantum computing",
    "Show scientists working on climate change solutions"
  ]);
  const [pricingPlans, setPricingPlans] = useState([
    {
      id: "p1",
      name: "Starter",
      price: "29",
      features: ["1,000 Requests", "Standard Support", "Basic Analytics"],
      recommended: false
    },
    {
      id: "p2",
      name: "Pro",
      price: "78",
      features: ["50,000 Requests", "Priority Support", "Advanced Analytics", "SLA Guarantee"],
      recommended: true
    },
    {
      id: "p3",
      name: "Enterprise",
      price: "127",
      features: ["Unlimited Requests", "Priority Support", "Advanced Analytics", "SLA Guarantee", "Custom Integration"],
      recommended: false
    }
  ]);
  const [freePricingText, setFreePricingText] = useState("This resource is part of our open data initiative and is free to use for both personal and commercial projects.");

  // Linked Service Documentation State - Dynamic Quick Start Items
  const [linkedQuickStartItems, setLinkedQuickStartItems] = useState([
    {
      id: 'qs1',
      title: 'Installation',
      codeLanguage: 'BASH',
      code: `# Using npm
npm install @em-data/sdk

# Using pip (Python)
pip install em-data-sdk`,
      description: "SDK를 설치하면 API 클라이언트와 필요한 모든 의존성이 함께 설치됩니다. Node.js 18+ 또는 Python 3.8+ 환경이 필요합니다."
    },
    {
      id: 'qs2',
      title: 'JavaScript / Node.js Integration',
      codeLanguage: 'JAVASCRIPT',
      code: `import { EMDataClient } from '@em-data/sdk';

// Initialize the client
const client = new EMDataClient({
  apiKey: process.env.EM_API_KEY,
  baseUrl: 'https://data.seoul.go.kr'
});`,
      description: "EMDataClient를 초기화할 때 API 키와 기본 URL을 설정합니다. API 키는 환경변수에서 가져오는 것을 권장합니다."
    }
  ]);

  const addLinkedQuickStartItem = () => {
    setLinkedQuickStartItems([...linkedQuickStartItems, {
      id: `qs${Date.now()}`,
      title: 'New Step',
      codeLanguage: 'BASH',
      code: '',
      description: ''
    }]);
  };

  const removeLinkedQuickStartItem = (id: string) => {
    setLinkedQuickStartItems(linkedQuickStartItems.filter(item => item.id !== id));
  };

  const updateLinkedQuickStartItem = (id: string, field: string, value: string) => {
    setLinkedQuickStartItems(linkedQuickStartItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const [linkedApiDefinitions, setLinkedApiDefinitions] = useState([
    {
      id: 'api1',
      name: 'get_genre_list',
      description: '사용 가능한 모든 공연 장르 코드와 이름을 조회합니다. 연극, 뮤지컬, 무용, 클래식, 국악, 대중음악 등의 장르를 제공합니다.',
      parameters: [] as string[]
    },
    {
      id: 'api2',
      name: 'search_events_by_location',
      description: '특정 지역과 기간의 공연을 검색합니다. 검색 결과가 없으면 자동으로 구/군 → 시/도 → 전국 순으로 범위를 확장합니다.',
      parameters: ['genreCode: string', 'startDate: string', 'endDate: string', 'sidoCode: string', 'gugunCode: string', 'limit: number']
    },
    {
      id: 'api3',
      name: 'filter_free_events',
      description: '무료 공연을 우선 검색합니다 (항상 오늘부터 30일 이내). 무료 공연이 5개 미만이면 저렴한 유료 공연으로 자동 보충합니다. 이 함수는 항상 오늘 날짜부터 30일 이내의 무료 공연만 검색하므로, startDate와 endDate 파라미터는 무시됩니다. 검색 결과에서 무료 공연이 5개 미만인 경우, 자동으로 저렴한 유료 공연을 추가하여 최소 5개의 결과를 반환합니다.',
      parameters: ['genreCode: string', 'startDate: string', 'endDate: string', 'sidoCode: string', 'limit: number']
    }
  ]);

  const addLinkedApiDefinition = () => {
    setLinkedApiDefinitions([...linkedApiDefinitions, {
      id: `api${Date.now()}`,
      name: 'new_function',
      description: '',
      parameters: []
    }]);
  };

  const removeLinkedApiDefinition = (id: string) => {
    setLinkedApiDefinitions(linkedApiDefinitions.filter(api => api.id !== id));
  };

  const updateLinkedApiDefinition = (id: string, field: string, value: any) => {
    setLinkedApiDefinitions(linkedApiDefinitions.map(api => 
      api.id === id ? { ...api, [field]: value } : api
    ));
  };

  const addLinkedParameter = (apiId: string) => {
    setLinkedApiDefinitions(linkedApiDefinitions.map(api => 
      api.id === apiId ? { ...api, parameters: [...api.parameters, 'param: type'] } : api
    ));
  };

  const removeLinkedParameter = (apiId: string, paramIndex: number) => {
    setLinkedApiDefinitions(linkedApiDefinitions.map(api => 
      api.id === apiId ? { ...api, parameters: api.parameters.filter((_, i) => i !== paramIndex) } : api
    ));
  };

  const updateLinkedParameter = (apiId: string, paramIndex: number, value: string) => {
    setLinkedApiDefinitions(linkedApiDefinitions.map(api => 
      api.id === apiId ? { ...api, parameters: api.parameters.map((p, i) => i === paramIndex ? value : p) } : api
    ));
  };

  // Full Documentation State
  const [fullDocEnabled, setFullDocEnabled] = useState(true);
  const [quickStartEnabled, setQuickStartEnabled] = useState(true);
  const [apiDefEnabled, setApiDefEnabled] = useState(true);
  const [fullDocData, setFullDocData] = useState({
    description: "For complete API reference, guides, and tutorials, please visit our documentation portal.",
    buttonText: "View Documentation",
    url: ""
  });
  const [docPreviewOpen, setDocPreviewOpen] = useState(false);
  const [pricingPreviewOpen, setPricingPreviewOpen] = useState(false);

  const addPlan = () => {
    const newId = `p${Date.now()}`;
    setPricingPlans([...pricingPlans, {
      id: newId,
      name: "New Plan",
      price: "0",
      features: ["New Feature"],
      recommended: false
    }]);
  };

  const removePlan = (id: string) => {
    setPricingPlans(pricingPlans.filter(p => p.id !== id));
  };

  const updatePlan = (id: string, field: string, value: any) => {
    setPricingPlans(pricingPlans.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addFeature = (planId: string) => {
    setPricingPlans(pricingPlans.map(p => 
      p.id === planId ? { ...p, features: [...p.features, "New Feature"] } : p
    ));
  };

  const updateFeature = (planId: string, featureIndex: number, value: string) => {
    setPricingPlans(pricingPlans.map(p => {
      if (p.id === planId) {
        const newFeatures = [...p.features];
        newFeatures[featureIndex] = value;
        return { ...p, features: newFeatures };
      }
      return p;
    }));
  };

  const removeFeature = (planId: string, featureIndex: number) => {
    setPricingPlans(pricingPlans.map(p => {
      if (p.id === planId) {
        return { ...p, features: p.features.filter((_, i) => i !== featureIndex) };
      }
      return p;
    }));
  };

  const openEditDialog = (platform: any) => {
    setEditingPlatform(platform);
    setIsDialogOpen(true);
  };
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

  // Mock My Shared Data (Approved) - matches submit form fields
  const myData = [
    {
      id: "m1",
      title: "Seoul Public Transport Usage 2024",
      description: "Comprehensive analysis of public transport usage patterns in Seoul.",
      longDescription: "Comprehensive analysis of public transport usage patterns in Seoul, including bus, subway, and taxi data across all districts.",
      views: 1250,
      downloads: 340,
      status: "Active",
      date: "2025-09-15",
      unreadReviews: 3,
      totalReviews: 12,
      provider: "Seoul Metro Data",
      founder: "Seoul Metropolitan Government",
      type: "Dataset",
      price: "Free",
      tags: ["Transport", "Seoul", "Public"],
      publishedDate: "2025-09-15",
      tagline: "Real-time public transport analytics for Seoul",
      websiteUrl: "https://data.seoul.go.kr",
      affiliateLink: "",
      demoUrl: "https://youtube.com/demo123",
      docsUrl: "https://docs.seoul.go.kr/transport",
      contactEmail: "data@seoul.go.kr",
      contactPhone: "+82 2-1234-5678",
      linkedinUrl: "https://linkedin.com/company/seoul-metro",
      twitterUrl: "https://twitter.com/seoulmetro",
      githubUrl: "https://github.com/seoul-data",
      discordUrl: "",
      telegramUrl: "",
      category: "Analysis",
      accessModel: "API",
      license: "open-source",
      version: "v1.2.0",
      features: ["Real-time tracking", "Historical data", "API access"],
      useCases: ["Urban planning", "Traffic analysis", "Research"]
    },
    {
      id: "m2",
      title: "Korean Coffee Consumption Trends",
      description: "Market research data on coffee consumption habits across age groups.",
      longDescription: "Market research data on coffee consumption habits across age groups in South Korea, covering major brands and regional preferences.",
      views: 890,
      downloads: 120,
      status: "Active",
      date: "2025-10-22",
      unreadReviews: 0,
      totalReviews: 5,
      provider: "K-Market Research",
      founder: "K-Market Research Inc.",
      type: "Dataset",
      price: "Paid",
      tags: ["Coffee", "Consumption", "Market"],
      publishedDate: "2025-10-22",
      tagline: "Comprehensive coffee market insights for Korea",
      websiteUrl: "https://kmarketresearch.com",
      affiliateLink: "https://partner.kmarketresearch.com/ref123",
      demoUrl: "",
      docsUrl: "https://docs.kmarketresearch.com",
      contactEmail: "info@kmarketresearch.com",
      contactPhone: "+82 10-9876-5432",
      linkedinUrl: "https://linkedin.com/company/kmarket",
      twitterUrl: "",
      githubUrl: "",
      discordUrl: "https://discord.gg/kmarket",
      telegramUrl: "https://t.me/kmarket",
      category: "Finance",
      accessModel: "File",
      license: "commercial",
      version: "v2.4.1",
      features: ["Quarterly reports", "Regional breakdown", "Trend analysis"],
      useCases: ["Market research", "Business planning", "Investment analysis"]
    }
  ];

  // Mock Requested Data - includes all submit form fields
  const [requestedData, setRequestedData] = useState([
    {
      id: "r1",
      title: "Global EV Market Analysis AI Agent",
      description: "AI Agent that aggregates and analyzes global electric vehicle market trends.",
      longDescription: "Comprehensive AI agent for analyzing global EV market trends, including sales data, charging infrastructure, and policy impacts across major markets.",
      dates: {
        submitted: "2025-12-14",
        verifying: "2025-12-15",
        verified: null,
        rejected: null
      },
      status: "verifying",
      step: 2,
      provider: "EV Analytics Corp",
      founder: "EV Analytics Inc.",
      type: "AI Agent",
      price: "Paid",
      tags: ["EV", "Market Analysis", "Automotive"],
      publishedDate: "2025-12-14",
      tagline: "AI-powered electric vehicle market intelligence",
      websiteUrl: "https://evanalytics.ai",
      affiliateLink: "",
      demoUrl: "https://youtube.com/evdemo",
      docsUrl: "https://docs.evanalytics.ai",
      contactEmail: "contact@evanalytics.ai",
      contactPhone: "+1 555-123-4567",
      linkedinUrl: "https://linkedin.com/company/evanalytics",
      twitterUrl: "https://twitter.com/evanalytics",
      githubUrl: "https://github.com/evanalytics",
      discordUrl: "",
      telegramUrl: "",
      category: "Analysis",
      accessModel: "AI Agent",
      license: "commercial",
      version: "v1.0.0",
      features: ["Real-time market tracking", "Predictive analytics", "Custom reports"],
      useCases: ["Investment research", "Market entry strategy", "Competitive analysis"],
      agentLogo: "ev-agent-logo.png",
      featuredImages: ["ev-featured-01.png", "ev-featured-02.png"]
    },
    {
      id: "r2",
      title: "Medical Image Diagnostic Helper",
      description: "Assistant AI for preliminary analysis of X-ray images.",
      longDescription: "AI-powered diagnostic assistant that helps healthcare professionals with preliminary analysis of X-ray images, supporting faster and more accurate diagnoses.",
      dates: {
        submitted: "2025-12-10",
        verifying: null,
        verified: null,
        rejected: null
      },
      status: "submitted",
      step: 1,
      provider: "MedTech AI",
      founder: "MedTech AI Solutions",
      type: "AI Agent",
      price: "Paid",
      tags: ["Medical", "Imaging", "Diagnostics"],
      publishedDate: "2025-12-10",
      tagline: "AI-assisted medical imaging analysis",
      websiteUrl: "https://medtechai.com",
      affiliateLink: "",
      demoUrl: "",
      docsUrl: "https://docs.medtechai.com",
      contactEmail: "support@medtechai.com",
      contactPhone: "+1 555-987-6543",
      linkedinUrl: "https://linkedin.com/company/medtechai",
      twitterUrl: "",
      githubUrl: "",
      discordUrl: "",
      telegramUrl: "",
      category: "Analysis",
      accessModel: "API",
      license: "proprietary",
      version: "v0.9.0",
      features: ["X-ray analysis", "Anomaly detection", "Report generation"],
      useCases: ["Hospital diagnostics", "Clinic support", "Research"],
      agentLogo: "medtech-logo.png",
      featuredImages: ["medtech-screen-01.png"]
    },
    {
      id: "r3",
      title: "Crypto Trading Bot V2",
      description: "Automated trading bot for cryptocurrency markets with risk management.",
      longDescription: "Advanced cryptocurrency trading bot with built-in risk management, supporting multiple exchanges and trading strategies.",
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
      ],
      provider: "CryptoBot Labs",
      founder: "CryptoBot Labs LLC",
      type: "AI Agent",
      price: "Paid",
      tags: ["Crypto", "Trading", "Bot"],
      publishedDate: "2025-12-01",
      tagline: "Automated crypto trading with smart risk management",
      websiteUrl: "https://cryptobotlabs.io",
      affiliateLink: "https://ref.cryptobotlabs.io/partner",
      demoUrl: "https://youtube.com/cryptobot",
      docsUrl: "https://docs.cryptobotlabs.io",
      contactEmail: "dev@cryptobotlabs.io",
      contactPhone: "",
      linkedinUrl: "",
      twitterUrl: "https://twitter.com/cryptobotlabs",
      githubUrl: "https://github.com/cryptobotlabs",
      discordUrl: "https://discord.gg/cryptobot",
      telegramUrl: "https://t.me/cryptobotlabs",
      category: "Finance",
      accessModel: "API",
      license: "mit",
      version: "v2.0.0",
      features: ["Multi-exchange support", "Risk management", "Backtesting"],
      useCases: ["Algorithmic trading", "Portfolio management", "Market making"],
      agentLogo: "crypto-bot-logo.png",
      featuredImages: ["crypto-dashboard.png", "crypto-trades.png", "crypto-analytics.png"]
    },
    {
      id: "r4",
      title: "Real-time Traffic Optimization AI",
      description: "AI system for optimizing traffic signal timings based on real-time flow data.",
      longDescription: "Intelligent traffic management system that uses AI to optimize signal timings in real-time, reducing congestion and improving traffic flow.",
      dates: {
        submitted: "2025-11-15",
        verifying: "2025-11-16",
        verified: "2025-11-18",
        rejected: null
      },
      status: "verified",
      step: 3,
      provider: "Smart City AI",
      founder: "Smart City Solutions Inc.",
      type: "AI Agent",
      price: "Free",
      tags: ["Traffic", "Smart City", "Optimization"],
      publishedDate: "2025-11-15",
      tagline: "AI-driven traffic flow optimization",
      websiteUrl: "https://smartcityai.com",
      affiliateLink: "",
      demoUrl: "https://youtube.com/smartcityai",
      docsUrl: "https://docs.smartcityai.com",
      contactEmail: "hello@smartcityai.com",
      contactPhone: "+82 2-5555-1234",
      linkedinUrl: "https://linkedin.com/company/smartcityai",
      twitterUrl: "https://twitter.com/smartcityai",
      githubUrl: "https://github.com/smartcityai",
      discordUrl: "",
      telegramUrl: "",
      category: "Analysis",
      accessModel: "MCP",
      license: "open-source",
      version: "v1.5.2",
      features: ["Real-time optimization", "Predictive modeling", "Dashboard"],
      useCases: ["City planning", "Traffic management", "Emergency routing"],
      agentLogo: "traffic-ai-logo.png",
      featuredImages: ["traffic-map.png", "traffic-dashboard.png"]
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
      pricingType: "Paid",
      price: "$49",
      uptime: "99.99%",
      nextBilling: "2026-01-20",
      type: "DATA",
      unreadReviews: 3
    },
    {
      id: "ha2",
      title: "Bio-Medical Research Corpus",
      description: "Annotated corpus for biomedical NLP research and training.",
      status: "Active",
      endpoint: "https://api.platform.com/v1/biomed",
      region: "Asia-Pacific (Seoul)",
      pricingType: "Paid",
      price: "$199",
      uptime: "99.95%",
      nextBilling: "2026-01-15",
      type: "AGENT",
      unreadReviews: 0
    },
    {
      id: "ha3",
      title: "Stock Market Tick Stream",
      description: "Real-time stock market data stream via WebSocket.",
      status: "Active",
      endpoint: "wss://api.platform.com/v1/stream",
      region: "US-West (Oregon)",
      pricingType: "Free",
      price: "Free",
      uptime: "99.99%",
      nextBilling: "2026-01-25",
      type: "MCP",
      unreadReviews: 5
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
                        <Label htmlFor="department">{t("Department", "부서")}</Label>
                        <Input id="department" defaultValue="" placeholder={t("Enter your department", "부서를 입력하세요")} />
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
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {t("Organization Information", "조직 정보")}
                    </CardTitle>
                    <CardDescription>
                      {t("Register and manage your organization details.", "조직 정보를 등록하고 관리하세요.")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative h-24 w-24 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden group cursor-pointer hover:border-indigo-400 transition-colors">
                          <ImagePlus className="h-8 w-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                          <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" data-testid="input-org-thumbnail" />
                        </div>
                        <span className="text-xs text-muted-foreground">{t("Org Thumbnail", "조직 썸네일")}</span>
                      </div>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="org-name" className="flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5 text-slate-500" />
                            {t("Company Name", "기업명")}
                          </Label>
                          <Input id="org-name" placeholder={t("Enter company name", "기업명을 입력하세요")} data-testid="input-org-name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="org-email" className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-slate-500" />
                            {t("Representative Email", "대표 이메일")}
                          </Label>
                          <Input id="org-email" type="email" placeholder={t("Enter representative email", "대표 이메일을 입력하세요")} data-testid="input-org-email" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="org-website" className="flex items-center gap-1.5">
                            <Globe className="h-3.5 w-3.5 text-slate-500" />
                            {t("Company Website URL", "기업 홈페이지 URL")}
                          </Label>
                          <Input id="org-website" type="url" placeholder="https://www.example.com" data-testid="input-org-website" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="org-description" className="flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-slate-500" />
                            {t("Company Description", "기업 설명")}
                          </Label>
                          <Textarea id="org-description" placeholder={t("Briefly describe your company", "기업에 대해 간략히 설명해주세요")} className="min-h-[80px]" data-testid="textarea-org-description" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button data-testid="button-save-org">{t("Save Organization Info", "조직 정보 저장")}</Button>
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
                                    <span className="font-medium">{item.usage?.toLocaleString()} / {item.limit?.toLocaleString()} calls (month)</span>
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
                              {item.status === 'Expired' ? (
                                <Button 
                                  className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={() => setLocation(`/resource/${item.resourceId}`)}
                                >
                                  <CreditCard className="h-4 w-4" />
                                  {t("Repurchase", "재구매하기")}
                                </Button>
                              ) : (
                                <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                                  <Download className="h-4 w-4" />
                                  {t("Download Latest", "최신 버전 다운로드")}
                                </Button>
                              )}
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
                            <div className="space-y-3">
                              <h4 className="text-sm font-medium text-muted-foreground">{t("Authentication", "인증 관리")}</h4>
                              <div className="px-3 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-2">
                                {/* URL */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-muted-foreground w-16 shrink-0">URL</span>
                                  <code className="flex-1 bg-white dark:bg-slate-950 px-2 py-1.5 rounded border border-slate-200 dark:border-slate-800 font-mono text-xs truncate">
                                    {item.type === 'MCP' ? 'https://mcp.em-data.io/v1/smart-contract-auditor' : 'https://agent.em-data.io/v1/wemeet-science'}
                                  </code>
                                  <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0">
                                    <Share2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                                {/* Client ID */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-muted-foreground w-16 shrink-0">Client ID</span>
                                  <code className="flex-1 bg-white dark:bg-slate-950 px-2 py-1.5 rounded border border-slate-200 dark:border-slate-800 font-mono text-xs">
                                    {item.type === 'MCP' ? 'mcp-client-9a2b4c8d' : 'agent-client-7c3d1f9e'}
                                  </code>
                                  <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0">
                                    <Share2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                                {/* Agent Key */}
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium text-muted-foreground w-16 shrink-0">Key</span>
                                  <code className="flex-1 bg-white dark:bg-slate-950 px-2 py-1.5 rounded border border-slate-200 dark:border-slate-800 font-mono text-xs">
                                    {item.apiKey}
                                  </code>
                                  <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0">
                                    <Share2 className="h-3.5 w-3.5" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs text-purple-600 hover:text-purple-700 px-2">Regenerate</Button>
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
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-1">{t("Linked Service", "연동 서비스")}</h2>
                  <p className="text-muted-foreground text-sm">{t("Manage your linked data services and view request status.", "연동 데이터 서비스 및 요청 상태를 관리하세요.")}</p>
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
                                  <DialogContent className="sm:max-w-[900px] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col">
                                    <SubmitForm 
                                      initialData={item as Resource} 
                                      mode="edit-approved" 
                                      defaultTab="overview"
                                      onSuccess={() => {}}
                                      className="h-full flex flex-col"
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
                              <Button variant="outline" size="sm" className="w-full" onClick={() => openEditDialog(item)}>
                                {t("Edit", "수정")}
                              </Button>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div className="relative w-full">
                                    <Button variant="outline" size="sm" className="w-full">
                                      Reviews
                                    </Button>
                                    {(item as any).unreadReviews > 0 && (
                                      <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white dark:border-slate-900 z-10">
                                        {(item as any).unreadReviews}
                                      </span>
                                    )}
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                                  <HostedServiceReviews />
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
                                
                                {/* Progress Bar - Linked Service */}
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
                                  <DialogContent className="max-w-3xl max-h-[90vh] p-0 flex flex-col overflow-hidden">
                                    <div className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-slate-950 shrink-0">
                                      <DialogTitle className="text-xl font-bold">
                                        {t("Request Details", "신청 상세")}
                                      </DialogTitle>
                                      <div className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider mr-6">
                                        <Link2 className="h-3 w-3" />
                                        {t("Linked Service", "연동 서비스")}
                                      </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-6">
                                      <GeneralRequestDetails data={item} status={item.step === 1 ? "submitted" : undefined} />
                                    </div>
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
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-1">{t("Hosted Data Services", "호스팅 데이터 서비스")}</h2>
                  <p className="text-muted-foreground text-sm">{t("Manage your hosted data services and view request status.", "호스팅 데이터 서비스 및 요청 상태를 관리하세요.")}</p>
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
                                      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                                        <HostedRequestDetails data={item} />
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                    {item.status}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
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
                                    <p className="text-xs text-muted-foreground">Pricing</p>
                                    <div className="flex items-center gap-1.5">
                                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                                        (item as any).pricingType === 'Paid' 
                                          ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800' 
                                          : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800'
                                      }`}>
                                        {(item as any).pricingType}
                                      </span>
                                      {(item as any).pricingType === 'Paid' && (item as any).price && (
                                        <span className="font-medium text-sm">{(item as any).price}</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Uptime (30d)</p>
                                    <p className="font-medium text-green-600">{item.uptime}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Next Bill</p>
                                    <p className="font-medium">{item.nextBilling}</p>
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

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full">
                                      {t("Edit", "편집")}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl h-[85vh] p-0 gap-0 overflow-hidden flex flex-col">
                                    <div className="h-full flex flex-col">
                                      <HostedRequestDetails data={item} isEditable={true} mode="details" />
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <div className="relative w-full">
                                      <Button variant="outline" size="sm" className="w-full">
                                        Reviews
                                      </Button>
                                      {(item as any).unreadReviews > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-white dark:border-slate-900 z-10">
                                          {(item as any).unreadReviews}
                                        </span>
                                      )}
                                    </div>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                                    <HostedServiceReviews />
                                  </DialogContent>
                                </Dialog>
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
                                
                                {/* Progress Bar - Hosted Service */}
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
                                  <DialogContent className="max-w-3xl max-h-[90vh] p-0 flex flex-col overflow-hidden">
                                    <div className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-slate-950 shrink-0">
                                      <DialogTitle className="text-xl font-bold">
                                        {t("Request Details", "신청 상세")}
                                      </DialogTitle>
                                      <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider mr-6">
                                        <ShieldCheck className="h-3 w-3" />
                                        {t("Hosted Service", "호스티드 서비스")}
                                      </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-6">
                                      <GeneralRequestDetails data={item} status={item.step === 1 ? "submitted" : undefined} />
                                    </div>
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
            <DialogHeader className="px-8 pt-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold">
                  Manage <span className="text-indigo-600">{editingPlatform?.title || "Resource"}</span>
                </DialogTitle>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="px-8 bg-slate-50/50 border-b border-slate-100">
                <Tabs defaultValue="pricing" className="w-full">
                  <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8">
                    <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm">Overview</TabsTrigger>
                    <TabsTrigger value="documentation" className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm">Documentation</TabsTrigger>
                    <TabsTrigger value="try-asking" className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm">Try Asking</TabsTrigger>
                    <TabsTrigger value="pricing" className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm">Pricing</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-0">
                    <ScrollArea className="h-[60vh]">
                      <div className="py-8 pr-8 space-y-8">
                        {/* Info Banner */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-1">Info</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            Changes to basic information will require re-approval from the administration team.
                          </p>
                        </div>

                        {/* Section 1: Basic Information */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                            <div>
                              <h2 className="text-lg font-bold">Basic Information</h2>
                              <p className="text-xs text-muted-foreground">Tell us about your service</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Service Name <span className="text-red-500">*</span></span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{(editingPlatform?.title || "").length}/35</span>
                              </Label>
                              <Input value={editingPlatform?.title || ""} placeholder="e.g. Data Analytics API" className="h-10" />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Founders / Company Name</span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{(editingPlatform?.provider || "").length}/50</span>
                              </Label>
                              <Input value={editingPlatform?.provider || ""} placeholder="e.g. Tech Corp" className="h-10" />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Website URL <span className="text-red-500">*</span></span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{(editingPlatform?.websiteUrl || "").length}/100</span>
                              </Label>
                              <Input value={editingPlatform?.websiteUrl || ""} placeholder="https://" className="h-10" />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Affiliate Link</span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/300</span>
                              </Label>
                              <Input placeholder="https://" className="h-10" />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Demo URL</span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{(editingPlatform?.demoUrl || "").length}/200</span>
                              </Label>
                              <Input value={editingPlatform?.demoUrl || ""} placeholder="https://youtube.com/..." className="h-10" />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Documentation URL</span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{(editingPlatform?.docsUrl || "").length}/200</span>
                              </Label>
                              <Input value={editingPlatform?.docsUrl || ""} placeholder="https://docs..." className="h-10" />
                            </div>

                            {/* Contact Information Subsection */}
                            <div className="mt-4 pt-6 border-t border-slate-300 dark:border-slate-700">
                              <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-4">
                                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                                  <h3 className="font-semibold text-sm">Contact Information</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label className="flex justify-between items-center font-semibold text-sm">
                                      <span>Contact Email <span className="text-red-500">*</span></span>
                                    </Label>
                                    <Input 
                                      value={editingPlatform?.contactEmail || ""}
                                      placeholder="email@company.com"
                                      className="h-10 bg-white dark:bg-slate-900" 
                                    />
                                    <div className="flex items-center space-x-2 mt-2">
                                      <Checkbox id="linked-use-account-email" />
                                      <label
                                        htmlFor="linked-use-account-email"
                                        className="text-xs text-muted-foreground"
                                      >
                                        Use account email (jh.park@illunex.com)
                                      </label>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="font-semibold text-sm">Contact Phone</Label>
                                    <Input 
                                      placeholder="+82 10-1234-5678"
                                      className="h-10 bg-white dark:bg-slate-900" 
                                    />
                                  </div>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-4">
                                  Important notifications about your service will be sent to these contact details.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Social Presence */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                            <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
                            <div>
                              <h2 className="text-lg font-bold">Social Presence</h2>
                              <p className="text-xs text-muted-foreground">Where can users find you?</p>
                            </div>
                          </div>

                          <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="font-semibold text-sm">LinkedIn URL</Label>
                                <Input placeholder="https://linkedin.com/in/..." className="h-10 bg-white dark:bg-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <Label className="font-semibold text-sm">Twitter URL</Label>
                                <Input placeholder="https://twitter.com/..." className="h-10 bg-white dark:bg-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <Label className="font-semibold text-sm">GitHub URL</Label>
                                <Input placeholder="https://github.com/..." className="h-10 bg-white dark:bg-slate-900" />
                              </div>
                              <div className="space-y-2">
                                <Label className="font-semibold text-sm">Discord URL</Label>
                                <Input placeholder="https://discord.gg/..." className="h-10 bg-white dark:bg-slate-900" />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <Label className="font-semibold text-sm">Telegram URL</Label>
                                <Input placeholder="https://t.me/..." className="h-10 bg-white dark:bg-slate-900" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Section 3: Classification */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
                            <div>
                              <h2 className="text-lg font-bold">Classification</h2>
                              <p className="text-xs text-muted-foreground">Help users find your service</p>
                            </div>
                          </div>

                          <div className="space-y-3 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                            <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Category <span className="text-red-500">*</span></Label>
                            <RadioGroup defaultValue={editingPlatform?.type?.toLowerCase() || "analysis"} className="w-full">
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
                                {["Analysis", "News", "Finance", "Space", "Patent", "Science", "Equipment", "Energy", "Waste", "Growth", "Startup", "Transaction", "Oil", "Consulting", "Investment", "Power", "Network", "Innovation", "Materials", "Enterprise", "Ecosystem", "E-commerce", "Robot", "M&A", "R&D"].map((cat) => (
                                  <div key={cat} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                    <RadioGroupItem value={cat.toLowerCase()} id={`linked-cat-${cat.toLowerCase()}`} className="shrink-0" />
                                    <Label htmlFor={`linked-cat-${cat.toLowerCase()}`} className="font-medium text-sm cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">{cat}</Label>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                            <div className="mt-2">
                              <Input placeholder="Enter custom category" className="h-10 bg-white dark:bg-slate-900" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                              <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Delivery Type <span className="text-red-500">*</span></Label>
                              <RadioGroup defaultValue="api" className="gap-2">
                                {["File", "API", "MCP", "AI Agent"].map((type) => (
                                  <div key={type} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800">
                                    <RadioGroupItem value={type.toLowerCase().replace(' ', '-')} id={`linked-delivery-${type.toLowerCase()}`} />
                                    <Label htmlFor={`linked-delivery-${type.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{type}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>

                            <div className="space-y-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                              <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Pricing <span className="text-red-500">*</span></Label>
                              <RadioGroup defaultValue={editingPlatform?.price?.toLowerCase() || "free"} className="gap-2">
                                {["Free", "Paid"].map((p) => (
                                  <div key={p} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800">
                                    <RadioGroupItem value={p.toLowerCase()} id={`linked-pricing-${p.toLowerCase()}`} />
                                    <Label htmlFor={`linked-pricing-${p.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{p}</Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="font-semibold text-sm">License</Label>
                              <Select defaultValue="commercial">
                                <SelectTrigger className="h-10">
                                  <SelectValue placeholder="Select license" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="commercial">Commercial</SelectItem>
                                  <SelectItem value="open-source">Open Source</SelectItem>
                                  <SelectItem value="mit">MIT</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="font-semibold text-sm">Version</Label>
                              <Input placeholder="e.g., v2.4.1" className="h-10" />
                            </div>
                          </div>
                        </div>

                        {/* Section 4: Details & Assets */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-sm">4</div>
                            <div>
                              <h2 className="text-lg font-bold">Details & Assets</h2>
                              <p className="text-xs text-muted-foreground">Make your listing stand out</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="font-semibold text-sm">Service Logo <span className="text-red-500">*</span></Label>
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center">
                                  <Upload className="h-6 w-6 text-slate-400" />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">Click to upload service logo</p>
                                  <p className="text-xs text-muted-foreground">Recommended: 512×512px (Square)</p>
                                  <p className="text-xs text-muted-foreground">SVG, PNG, JPG, WEBP</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Tagline <span className="text-red-500">*</span></span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{(editingPlatform?.tagline || "").length}/100</span>
                              </Label>
                              <Input value={editingPlatform?.tagline || ""} placeholder="A catchy one-liner for your service card" className="h-10 bg-white dark:bg-slate-900" />
                            </div>

                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Description <span className="text-red-500">*</span></span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{(editingPlatform?.description || "").length}/750</span>
                              </Label>
                              <Textarea value={editingPlatform?.description || ""} placeholder="Describe your service in detail. What problem does it solve? Who is it for?" className="min-h-[100px] resize-y bg-white dark:bg-slate-900" />
                            </div>

                            <div className="space-y-3">
                              <Label className="font-semibold text-sm">Tags</Label>
                              <div className="flex items-center gap-2 flex-wrap">
                                {editingPlatform?.tags?.map((tag: string, i: number) => (
                                  <span key={i} className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-sm border border-slate-200 dark:border-slate-700">#{tag}</span>
                                ))}
                                <Button variant="outline" size="sm" className="h-8 rounded-full border-dashed border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 bg-white dark:bg-slate-900">
                                  <Plus className="h-3 w-3 mr-1" /> New Tag
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Key Features</span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/5</span>
                              </Label>
                              <div className="space-y-2">
                                <Input placeholder="Feature 1" className="h-10 bg-white dark:bg-slate-900" />
                              </div>
                              <div className="mt-2 w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg h-10 flex items-center justify-center text-sm text-muted-foreground cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-900 transition-all bg-white dark:bg-slate-900">
                                <Plus className="h-4 w-4 mr-2" /> Add Feature
                              </div>
                              <p className="text-[10px] text-muted-foreground">Add up to 5 key features of your service.</p>
                            </div>

                            <div className="space-y-3">
                              <Label className="flex justify-between font-semibold text-sm">
                                <span>Use Cases</span>
                                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/5</span>
                              </Label>
                              <div className="mt-2 w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg h-10 flex items-center justify-center text-sm text-muted-foreground cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-900 transition-all bg-white dark:bg-slate-900">
                                <Plus className="h-4 w-4 mr-2" /> Add Use Case
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="font-semibold text-sm">Featured Image</Label>
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer mb-4">
                              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                              <p className="text-sm font-medium">Click to upload or drag and drop</p>
                              <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 800×400px)</p>
                            </div>
                            
                            <div className="space-y-2">
                              {["image01.png", "image02.png", "image03.png", "image04.png"].map((img, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                                  <div className="flex items-center gap-2 overflow-hidden">
                                    <Paperclip className="h-4 w-4 text-slate-400 flex-shrink-0" />
                                    <span className="text-sm text-slate-600 dark:text-slate-300 truncate">{img}</span>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="documentation" className="mt-0">
                    <ScrollArea className="h-[60vh]">
                      <div className="py-8 pr-8 space-y-6">
                        {/* Quick Start Guide Section with Toggle */}
                        <div className={cn(
                          "rounded-xl border p-6 space-y-4",
                          quickStartEnabled ? "border-slate-200 bg-white dark:bg-slate-950" : "border-slate-200 bg-slate-50 dark:bg-slate-900/50"
                        )}>
                          <div className="flex items-center justify-between">
                            <h3 className={cn("text-xl font-bold flex items-center gap-2", !quickStartEnabled && "text-slate-400")}>
                              <Terminal className={cn("h-5 w-5", !quickStartEnabled && "text-slate-400")} />
                              Quick Start Guide
                            </h3>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline">v1.0.0</Badge>
                              <span className={cn(
                                "text-sm font-medium",
                                quickStartEnabled ? "text-blue-600" : "text-slate-400"
                              )}>
                                {quickStartEnabled ? "Enabled" : "Disabled"}
                              </span>
                              <Switch checked={quickStartEnabled} onCheckedChange={setQuickStartEnabled} />
                            </div>
                          </div>

                          {quickStartEnabled ? (
                            <>
                              {linkedQuickStartItems.map((item, index) => {
                                const colors = [
                                  { bg: 'bg-indigo-100', text: 'text-indigo-600' },
                                  { bg: 'bg-yellow-100', text: 'text-yellow-600' },
                                  { bg: 'bg-green-100', text: 'text-green-600' },
                                  { bg: 'bg-blue-100', text: 'text-blue-600' },
                                  { bg: 'bg-purple-100', text: 'text-purple-600' },
                                ];
                                const color = colors[index % colors.length];
                                
                                return (
                                  <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-100 dark:bg-slate-900 p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3 flex-1">
                                        <div className={`h-8 w-8 rounded-full ${color.bg} flex items-center justify-center ${color.text} font-bold text-sm shrink-0`}>{index + 1}</div>
                                        <Input
                                          value={item.title}
                                          onChange={(e) => updateLinkedQuickStartItem(item.id, 'title', e.target.value)}
                                          className="font-bold bg-white border-slate-300"
                                          placeholder="Step title..."
                                        />
                                      </div>
                                      <Button variant="ghost" size="icon" onClick={() => removeLinkedQuickStartItem(item.id)} className="text-slate-400 hover:text-red-400 h-8 w-8 ml-2">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Label className="text-xs text-slate-500">Code Language:</Label>
                                        <Input
                                          value={item.codeLanguage}
                                          onChange={(e) => updateLinkedQuickStartItem(item.id, 'codeLanguage', e.target.value.toUpperCase())}
                                          className="h-7 text-xs w-24 bg-white border-slate-300"
                                          placeholder="BASH"
                                        />
                                      </div>
                                      <Textarea 
                                        value={item.code}
                                        onChange={(e) => updateLinkedQuickStartItem(item.id, 'code', e.target.value)}
                                        className="font-mono text-sm bg-slate-900 text-slate-50 border-slate-700 min-h-[100px]"
                                        placeholder="# Code..."
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-xs text-slate-500">Description</Label>
                                      <Textarea 
                                        value={item.description}
                                        onChange={(e) => updateLinkedQuickStartItem(item.id, 'description', e.target.value)}
                                        className="text-sm bg-white border-slate-300 min-h-[60px]"
                                        placeholder="Step description..."
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                              <Button variant="outline" size="sm" onClick={addLinkedQuickStartItem} className="w-full gap-1 border-dashed">
                                <Plus className="h-4 w-4" /> Add Step
                              </Button>
                            </>
                          ) : (
                            <div className="py-4 text-center">
                              <p className="text-sm text-slate-400">
                                This section is disabled and will not be displayed in the documentation.
                              </p>
                              <p className="text-xs text-slate-300 mt-1">
                                Enable to show the Quick Start Guide on your service page.
                              </p>
                            </div>
                          )}
                        </div>

                        {/* API Definitions Section with Toggle */}
                        <div className={cn(
                          "rounded-xl border p-6 space-y-4",
                          apiDefEnabled ? "border-slate-200 bg-white dark:bg-slate-950" : "border-slate-200 bg-slate-50 dark:bg-slate-900/50"
                        )}>
                          <div className="flex items-center justify-between">
                            <h3 className={cn("text-lg font-bold flex items-center gap-2", !apiDefEnabled && "text-slate-400")}>
                              <Database className={cn("h-5 w-5", !apiDefEnabled && "text-slate-400")} />
                              API Definitions
                            </h3>
                            <div className="flex items-center gap-3">
                              <span className={cn(
                                "text-sm font-medium",
                                apiDefEnabled ? "text-blue-600" : "text-slate-400"
                              )}>
                                {apiDefEnabled ? "Enabled" : "Disabled"}
                              </span>
                              <Switch checked={apiDefEnabled} onCheckedChange={setApiDefEnabled} />
                            </div>
                          </div>

                          {apiDefEnabled ? (
                            <>
                              {linkedApiDefinitions.map((api) => (
                                <div key={api.id} className="rounded-xl border border-slate-200 bg-slate-900 p-6 space-y-4">
                                  <div className="flex items-center justify-between">
                                    <Input
                                      value={api.name}
                                      onChange={(e) => updateLinkedApiDefinition(api.id, 'name', e.target.value)}
                                      className="font-mono font-bold text-white bg-transparent border-slate-700 w-auto flex-1 mr-4"
                                      placeholder="function_name"
                                    />
                                    <Button variant="ghost" size="icon" onClick={() => removeLinkedApiDefinition(api.id)} className="text-slate-400 hover:text-red-400 h-8 w-8">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  <div className="space-y-3">
                                    <div className="flex gap-3">
                                      <span className="text-slate-400 text-sm w-16 shrink-0">용도</span>
                                      <div className="flex-1">
                                        <Textarea 
                                          value={api.description}
                                          onChange={(e) => updateLinkedApiDefinition(api.id, 'description', e.target.value)}
                                          className="text-sm bg-slate-800 text-slate-300 border-slate-700 min-h-[80px]"
                                          placeholder="API 용도를 설명하세요..."
                                        />
                                      </div>
                                    </div>
                                    <div className="flex gap-3">
                                      <span className="text-slate-400 text-sm w-16 shrink-0">파라미터</span>
                                      <div className="flex-1 space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                          {api.parameters.map((param, paramIndex) => (
                                            <div key={paramIndex} className="flex items-center gap-1 bg-slate-800 rounded px-2 py-1">
                                              <Input
                                                value={param}
                                                onChange={(e) => updateLinkedParameter(api.id, paramIndex, e.target.value)}
                                                className="h-6 text-xs font-mono bg-transparent border-none text-slate-300 w-28 p-0"
                                                placeholder="param: type"
                                              />
                                              <button onClick={() => removeLinkedParameter(api.id, paramIndex)} className="text-slate-500 hover:text-red-400">
                                                <XCircle className="h-3 w-3" />
                                              </button>
                                            </div>
                                          ))}
                                          <Button variant="ghost" size="sm" onClick={() => addLinkedParameter(api.id)} className="h-7 text-xs text-slate-400 hover:text-white">
                                            <Plus className="h-3 w-3 mr-1" /> Add Param
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <Button variant="outline" size="sm" onClick={addLinkedApiDefinition} className="w-full gap-1 border-dashed">
                                <Plus className="h-4 w-4" /> Add API
                              </Button>
                            </>
                          ) : (
                            <div className="py-4 text-center">
                              <p className="text-sm text-slate-400">
                                This section is disabled and will not be displayed in the documentation.
                              </p>
                              <p className="text-xs text-slate-300 mt-1">
                                Enable to show API Definitions on your service page.
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Full Documentation Section with Toggle */}
                        <div className={cn(
                          "rounded-xl border p-6 space-y-4",
                          fullDocEnabled ? "border-slate-200 bg-white dark:bg-slate-950" : "border-slate-200 bg-slate-50 dark:bg-slate-900/50"
                        )}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <h4 className={cn("font-bold flex items-center gap-2", !fullDocEnabled && "text-slate-400")}>
                                <FileText className={cn("h-5 w-5", !fullDocEnabled && "text-slate-400")} />
                                Full Documentation
                              </h4>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={cn(
                                "text-sm font-medium",
                                fullDocEnabled ? "text-blue-600" : "text-slate-400"
                              )}>
                                {fullDocEnabled ? "Enabled" : "Disabled"}
                              </span>
                              <Switch checked={fullDocEnabled} onCheckedChange={setFullDocEnabled} />
                            </div>
                          </div>
                          
                          {fullDocEnabled ? (
                            <div className="space-y-4 pt-2">
                              <div className="space-y-2">
                                <Label className="text-xs text-slate-500">Description</Label>
                                <Textarea
                                  value={fullDocData.description}
                                  onChange={(e) => setFullDocData(prev => ({ ...prev, description: e.target.value }))}
                                  className="text-sm bg-white border-slate-300 min-h-[60px]"
                                  placeholder="Documentation description..."
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-xs text-slate-500">Button Text</Label>
                                  <Input
                                    value={fullDocData.buttonText}
                                    onChange={(e) => setFullDocData(prev => ({ ...prev, buttonText: e.target.value }))}
                                    className="bg-white border-slate-300"
                                    placeholder="View Documentation"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-xs text-slate-500">Documentation URL</Label>
                                  <Input
                                    value={fullDocData.url}
                                    onChange={(e) => setFullDocData(prev => ({ ...prev, url: e.target.value }))}
                                    className="bg-white border-slate-300"
                                    placeholder="https://docs.example.com"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="py-4 text-center">
                              <p className="text-sm text-slate-400">
                                This section is disabled and will not be displayed in the documentation.
                              </p>
                              <p className="text-xs text-slate-300 mt-1">
                                Enable to add a link to your full documentation portal.
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Preview Button */}
                        <div className="flex justify-center pt-4">
                          <Button variant="outline" onClick={() => setDocPreviewOpen(true)} className="gap-2">
                            <Eye className="h-4 w-4" /> Preview Documentation
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                    
                    {/* Documentation Preview Dialog */}
                    <Dialog open={docPreviewOpen} onOpenChange={setDocPreviewOpen}>
                      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle>Documentation Preview</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[65vh] pr-4">
                          <div className="space-y-6 py-4">
                            {quickStartEnabled && (
                            <>
                            <div className="flex items-center justify-between">
                              <h3 className="text-xl font-bold flex items-center gap-2">
                                <Terminal className="h-5 w-5" />
                                Quick Start Guide
                              </h3>
                              <Badge variant="outline">v1.0.0</Badge>
                            </div>

                            {/* Preview Quick Start Items */}
                            {linkedQuickStartItems.map((item, index) => {
                              const colors = [
                                { bg: 'bg-indigo-100', text: 'text-indigo-600', descBg: 'bg-blue-50', descBorder: 'border-blue-100', descText: 'text-blue-700' },
                                { bg: 'bg-yellow-100', text: 'text-yellow-600', descBg: 'bg-yellow-50', descBorder: 'border-yellow-100', descText: 'text-yellow-700' },
                                { bg: 'bg-green-100', text: 'text-green-600', descBg: 'bg-green-50', descBorder: 'border-green-100', descText: 'text-green-700' },
                                { bg: 'bg-blue-100', text: 'text-blue-600', descBg: 'bg-blue-50', descBorder: 'border-blue-100', descText: 'text-blue-700' },
                                { bg: 'bg-purple-100', text: 'text-purple-600', descBg: 'bg-purple-50', descBorder: 'border-purple-100', descText: 'text-purple-700' },
                              ];
                              const color = colors[index % colors.length];
                              
                              return (
                                <div key={item.id} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className={`h-8 w-8 rounded-full ${color.bg} flex items-center justify-center ${color.text} font-bold text-sm`}>{index + 1}</div>
                                    <h4 className="font-bold">{item.title}</h4>
                                  </div>
                                  <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50 overflow-x-auto">
                                    <div className="absolute right-4 top-4 text-xs text-slate-400">{item.codeLanguage}</div>
                                    <pre className="whitespace-pre-wrap">{item.code}</pre>
                                  </div>
                                  {item.description && (
                                    <div className={`mt-4 p-3 ${color.descBg} rounded-lg border ${color.descBorder}`}>
                                      <p className={`text-sm ${color.descText}`}>{item.description}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                            </>
                            )}

                            {/* Preview API Definitions */}
                            {apiDefEnabled && (
                            <div className="space-y-4">
                              <h3 className="text-lg font-bold flex items-center gap-2">
                                <Database className="h-5 w-5" />
                                API Definitions
                              </h3>
                              {linkedApiDefinitions.map((api) => (
                                <div key={api.id} className="rounded-xl border border-slate-200 bg-slate-900 p-6">
                                  <h4 className="font-mono font-bold text-white mb-3">{api.name}</h4>
                                  <div className="space-y-3">
                                    <div className="flex gap-3">
                                      <span className="text-slate-400 text-sm w-16 shrink-0">용도</span>
                                      <span className="text-slate-300 text-sm">{api.description}</span>
                                    </div>
                                    {api.parameters.length > 0 && (
                                      <div className="flex gap-3">
                                        <span className="text-slate-400 text-sm w-16 shrink-0">파라미터</span>
                                        <div className="flex flex-wrap gap-2">
                                          {api.parameters.map((param, i) => (
                                            <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">{param}</Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            )}

                            {/* Preview Full Documentation */}
                            {fullDocEnabled && (
                              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">{linkedQuickStartItems.length + 1}</div>
                                  <h4 className="font-bold">Full Documentation</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">{fullDocData.description}</p>
                                <Button variant="outline" className="gap-2" onClick={() => fullDocData.url && window.open(fullDocData.url, "_blank")}>
                                  {fullDocData.buttonText} <ArrowRight className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </TabsContent>

                  <TabsContent value="try-asking" className="mt-0">
                    <ScrollArea className="h-[60vh]">
                      <div className="py-8 pr-8 space-y-8">
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mb-2">
                          <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-1">Info</h4>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            Configure example questions that users can try with your AI Agent or MCP. These will be displayed on the service detail page to help users understand what your service can do.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3 pb-4 border-b border-slate-300 dark:border-slate-700">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center">
                              <MessageSquare className="h-4 w-4" />
                            </div>
                            <div>
                              <h2 className="text-lg font-bold">Try Asking Questions</h2>
                              <p className="text-xs text-muted-foreground">Add example prompts users can try (max 5)</p>
                            </div>
                          </div>

                          {/* Preview */}
                          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border border-indigo-100 dark:border-indigo-900/50 p-5">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Preview</p>
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
                                <MessageSquare className="h-4 w-4" />
                              </div>
                              <div>
                                <h3 className="font-bold text-sm">Try asking...</h3>
                                <p className="text-[10px] text-slate-500">Example conversations with this service</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {tryAskingQuestions.filter(q => q.trim()).map((question, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50">
                                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                                    <span className="text-xs font-bold">{idx + 1}</span>
                                  </div>
                                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">"{question}"</span>
                                </div>
                              ))}
                              {tryAskingQuestions.filter(q => q.trim()).length === 0 && (
                                <p className="text-xs text-slate-400 italic col-span-2 text-center py-4">No questions added yet</p>
                              )}
                            </div>
                          </div>

                          {/* Editable List */}
                          <div className="space-y-3">
                            {tryAskingQuestions.map((question, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 font-bold text-sm">
                                  {idx + 1}
                                </div>
                                <Input
                                  value={question}
                                  onChange={(e) => {
                                    const updated = [...tryAskingQuestions];
                                    updated[idx] = e.target.value;
                                    setTryAskingQuestions(updated);
                                  }}
                                  placeholder={`Enter example question ${idx + 1}`}
                                  className="flex-1 h-10"
                                  data-testid={`input-try-asking-${idx}`}
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                                  onClick={() => {
                                    setTryAskingQuestions(tryAskingQuestions.filter((_, i) => i !== idx));
                                  }}
                                  data-testid={`btn-remove-try-asking-${idx}`}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          {tryAskingQuestions.length < 5 && (
                            <Button
                              variant="outline"
                              className="w-full border-dashed gap-2"
                              onClick={() => setTryAskingQuestions([...tryAskingQuestions, ""])}
                              data-testid="btn-add-try-asking"
                            >
                              <Plus className="h-4 w-4" /> Add Question
                            </Button>
                          )}
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="pricing" className="mt-0">
                    <ScrollArea className="h-[60vh]">
                      <div className="py-8 pr-8 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Pricing Policy</h3>
                            <p className="text-sm text-slate-500">Choose between paid plans or a free service model.</p>
                          </div>
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
                      <button
                        onClick={() => setPricingType("Paid")}
                        className={cn(
                          "px-6 py-2 text-sm font-bold rounded-lg transition-all",
                          pricingType === "Paid" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        Paid Plans
                      </button>
                      <button
                        onClick={() => setPricingType("Free")}
                        className={cn(
                          "px-6 py-2 text-sm font-bold rounded-lg transition-all",
                          pricingType === "Free" ? "bg-white text-green-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                        )}
                      >
                        Free Forever
                      </button>
                    </div>
                  </div>

                  {pricingType === "Paid" ? (
                    <div className="space-y-6 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-500 italic">Define your pricing plans. You can add or remove plans as needed.</p>
                        <Button onClick={addPlan} variant="outline" className="gap-2 border-slate-200">
                          <Plus className="h-4 w-4 text-indigo-500" /> Add Plan
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {pricingPlans.map((plan) => (
                          <div 
                            key={plan.id}
                            className={cn(
                              "relative flex flex-col p-6 rounded-2xl border transition-all",
                              plan.recommended 
                                ? "border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/10" 
                                : "border-slate-200 bg-white"
                            )}
                          >
                            {plan.recommended && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                              </div>
                            )}
                            
                            <button 
                              onClick={() => removePlan(plan.id)}
                              className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                            <div className="space-y-4 mb-6">
                              <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold text-slate-400 uppercase">Plan Name</Label>
                                <Input 
                                  value={plan.name} 
                                  onChange={(e) => updatePlan(plan.id, "name", e.target.value)}
                                  className="font-bold border-slate-100"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <Label className="text-[10px] font-bold text-slate-400 uppercase">Monthly Price ($)</Label>
                                <div className="flex items-center gap-2">
                                  <div className="relative flex-1">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">$</span>
                                    <Input 
                                      value={plan.price} 
                                      onChange={(e) => updatePlan(plan.id, "price", e.target.value)}
                                      className="pl-7 font-bold border-slate-100"
                                    />
                                  </div>
                                  <span className="text-sm text-slate-400 font-medium">/mo</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 flex-1">
                              <Label className="text-[10px] font-bold text-slate-400 uppercase">Features</Label>
                              <div className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 group">
                                    <div className="h-5 w-5 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                                    </div>
                                    <Input 
                                      value={feature} 
                                      onChange={(e) => updateFeature(plan.id, idx, e.target.value)}
                                      className="h-8 text-xs border-slate-100"
                                    />
                                    <button 
                                      onClick={() => removeFeature(plan.id, idx)}
                                      className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                                    >
                                      <XCircle className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ))}
                                <button 
                                  onClick={() => addFeature(plan.id)}
                                  className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors mt-2 pl-1"
                                >
                                  + Add Feature
                                </button>
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                id={`rec-${plan.id}`}
                                checked={plan.recommended}
                                onChange={(e) => updatePlan(plan.id, "recommended", e.target.checked)}
                                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label htmlFor={`rec-${plan.id}`} className="text-xs font-medium text-slate-600 cursor-pointer">
                                Recommended Plan
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto">
                      <div className="p-10 rounded-3xl border border-dashed border-green-200 bg-green-50/30 text-center space-y-6">
                        <div className="mx-auto h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-sm">
                          <Zap className="h-8 w-8" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-xl font-bold text-slate-900">Free Forever Content</h4>
                          <p className="text-sm text-slate-500">Enter the description that will be shown to users for this free resource.</p>
                        </div>
                        <Textarea 
                          value={freePricingText}
                          onChange={(e) => setFreePricingText(e.target.value)}
                          className="min-h-[120px] rounded-2xl border-slate-200 text-sm leading-relaxed p-4 text-center italic shadow-inner bg-white"
                          placeholder="Enter free service description..."
                        />
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Preview: This will be shown in the "Pricing" tab</p>
                      </div>
                    </div>
                  )}
                        
                        {/* Preview Button */}
                        <div className="flex justify-center pt-4">
                          <Button variant="outline" onClick={() => setPricingPreviewOpen(true)} className="gap-2">
                            <Eye className="h-4 w-4" /> Preview Pricing
                          </Button>
                        </div>
                      </div>
                    </ScrollArea>
                    
                    {/* Pricing Preview Dialog */}
                    <Dialog open={pricingPreviewOpen} onOpenChange={setPricingPreviewOpen}>
                      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
                        <DialogHeader>
                          <DialogTitle>Pricing Preview</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[65vh] pr-4">
                          <div className="py-4">
                            {pricingType === "Paid" ? (
                              <div className="space-y-6">
                                <div className="text-center mb-8">
                                  <h3 className="text-2xl font-bold">Choose Your Plan</h3>
                                  <p className="text-sm text-slate-500 mt-2">Select the plan that best fits your needs</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {pricingPlans.map((plan) => (
                                    <div 
                                      key={plan.id}
                                      className={cn(
                                        "relative flex flex-col p-6 rounded-2xl border transition-all",
                                        plan.recommended 
                                          ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50/30 scale-105" 
                                          : "border-slate-200 bg-white"
                                      )}
                                    >
                                      {plan.recommended && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                          Most Popular
                                        </div>
                                      )}
                                      <div className="text-center mb-4">
                                        <h4 className="text-lg font-bold">{plan.name}</h4>
                                        <div className="mt-2">
                                          <span className="text-3xl font-bold">${plan.price}</span>
                                          <span className="text-slate-500">/mo</span>
                                        </div>
                                      </div>
                                      <div className="space-y-3 flex-1">
                                        {plan.features.map((feature, idx) => (
                                          <div key={idx} className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                          </div>
                                        ))}
                                      </div>
                                      <Button 
                                        className={cn(
                                          "mt-6 w-full",
                                          plan.recommended ? "bg-indigo-600 hover:bg-indigo-700" : ""
                                        )}
                                        variant={plan.recommended ? "default" : "outline"}
                                      >
                                        Get Started
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="max-w-xl mx-auto text-center space-y-6 py-8">
                                <div className="mx-auto h-20 w-20 rounded-2xl bg-green-100 flex items-center justify-center text-green-600">
                                  <Zap className="h-10 w-10" />
                                </div>
                                <div>
                                  <h3 className="text-2xl font-bold text-green-600">Free Forever</h3>
                                  <p className="text-slate-600 mt-4 leading-relaxed">{freePricingText}</p>
                                </div>
                                <Button className="bg-green-600 hover:bg-green-700">
                                  Get Started for Free
                                </Button>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </TabsContent>
                </Tabs>
              </div>

              <DialogFooter className="px-8 py-6 border-t bg-slate-50/50 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl px-6">Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-10 gap-2 font-bold shadow-lg shadow-indigo-500/20">
                  <CreditCard className="h-4 w-4" /> Save Changes
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      
      <Footer />
    </div>
  );
}
