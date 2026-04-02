import AdminLayout from "./admin-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  FileText, 
  MessageSquare, 
  Megaphone,
  TrendingUp,
  Activity,
  Calendar as CalendarIcon,
  Server,
  Link2,
  ShoppingBag,
  Megaphone as MegaphoneIcon,
  Inbox,
} from "lucide-react";
import { 
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { addDays, format, subMonths, subYears } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

const generateTrafficData = (timeframe: 'daily' | 'monthly' | 'yearly') => {
  if (timeframe === 'daily') {
    return Array.from({ length: 14 }).map((_, i) => ({
      date: format(addDays(new Date(), i - 13), 'MM/dd'),
      visitors: Math.floor(Math.random() * 2000) + 1000
    }));
  } else if (timeframe === 'monthly') {
    return Array.from({ length: 12 }).map((_, i) => ({
      date: format(subMonths(new Date(), 11 - i), 'MMM'),
      visitors: Math.floor(Math.random() * 50000) + 20000
    }));
  } else {
    return Array.from({ length: 5 }).map((_, i) => ({
      date: format(subYears(new Date(), 4 - i), 'yyyy'),
      visitors: Math.floor(Math.random() * 500000) + 200000
    }));
  }
};

const generateRevenueData = (timeframe: 'daily' | 'monthly' | 'yearly') => {
  if (timeframe === 'daily') {
    return Array.from({ length: 7 }).map((_, i) => ({
      name: format(addDays(new Date(), i - 6), 'MM/dd'),
      dataSales: Math.floor(Math.random() * 500) + 100,
      adSales: Math.floor(Math.random() * 300) + 50
    }));
  } else if (timeframe === 'monthly') {
    return Array.from({ length: 12 }).map((_, i) => ({
      name: format(subMonths(new Date(), 11 - i), 'MMM'),
      dataSales: Math.floor(Math.random() * 5000) + 1000,
      adSales: Math.floor(Math.random() * 3000) + 500
    }));
  } else {
    return Array.from({ length: 5 }).map((_, i) => ({
      name: format(subYears(new Date(), 4 - i), 'yyyy'),
      dataSales: Math.floor(Math.random() * 50000) + 10000,
      adSales: Math.floor(Math.random() * 30000) + 5000
    }));
  }
};

const generateStorageData = (timeframe: 'daily' | 'monthly' | 'yearly') => {
  let baseStorage = 50;
  if (timeframe === 'daily') {
    return Array.from({ length: 14 }).map((_, i) => {
      baseStorage += Math.random() * 0.5;
      return { date: format(addDays(new Date(), i - 13), 'MM/dd'), storage: Number(baseStorage.toFixed(2)) };
    });
  } else if (timeframe === 'monthly') {
    baseStorage = 30;
    return Array.from({ length: 12 }).map((_, i) => {
      baseStorage += Math.random() * 5;
      return { date: format(subMonths(new Date(), 11 - i), 'MMM'), storage: Number(baseStorage.toFixed(2)) };
    });
  } else {
    baseStorage = 10;
    return Array.from({ length: 5 }).map((_, i) => {
      baseStorage += Math.random() * 20;
      return { date: format(subYears(new Date(), 4 - i), 'yyyy'), storage: Number(baseStorage.toFixed(2)) };
    });
  }
};

// Submission status data split by service type
const HOSTED_STATUS_DATA = [
  { name: 'Approved', value: 28, color: '#22c55e' },
  { name: 'Pending', value: 7, color: '#eab308' },
  { name: 'Rejected', value: 5, color: '#ef4444' },
];

const LINKED_STATUS_DATA = [
  { name: 'Approved', value: 17, color: '#22c55e' },
  { name: 'Pending', value: 5, color: '#eab308' },
  { name: 'Rejected', value: 3, color: '#ef4444' },
];

const SUMMARY_METRICS = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last period", icon: DollarSign, color: "text-green-600 bg-green-100 dark:bg-green-900/20" },
  { title: "Data Sales", value: "1,234", change: "+180 since last period", icon: ShoppingCart, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20" },
  { title: "Active Users", value: "573", change: "+201 since last period", icon: Users, color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20" },
  { title: "Ad Revenue", value: "$12,450", change: "+15% from last period", icon: Megaphone, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20" },
  { title: "Blog Posts", value: "84", change: "+2 this period", icon: FileText, color: "text-pink-600 bg-pink-100 dark:bg-pink-900/20" },
  { title: "Comments", value: "2,345", change: "+45 today", icon: MessageSquare, color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20" },
  { title: "Avg. Visit Time", value: "4m 32s", change: "+12s from last period", icon: Activity, color: "text-slate-600 bg-slate-100 dark:bg-slate-800" },
];

// Recent Activity data per category
const ACTIVITY_PURCHASES = [
  { user: "김민수", target: "Corporate Growth Data", price: "$78/mo", time: "2분 전", avatar: "KM" },
  { user: "이지원", target: "Social Trend Analysis API", price: "$29/mo", time: "31분 전", avatar: "LJ" },
  { user: "박성훈", target: "Image-based Patent Analysis", price: "$127/mo", time: "1시간 전", avatar: "PS" },
  { user: "Acme Corp", target: "Smart Factory Sensor Grid", price: "Free", time: "3시간 전", avatar: "AC" },
  { user: "최유진", target: "Wemeet Science Dataset", price: "$29/mo", time: "5시간 전", avatar: "CY" },
  { user: "장현우", target: "KIRIA Robot Platform", price: "$78/mo", time: "1일 전", avatar: "JH" },
];

const ACTIVITY_ADS = [
  { user: "Global Systems", target: "메인 페이지 배너 광고", detail: "728×90 · 30일", price: "$450", time: "3시간 전", avatar: "GS" },
  { user: "Vision AI", target: "사이드바 광고 슬롯 A", detail: "300×250 · 14일", price: "$210", time: "6시간 전", avatar: "VA" },
  { user: "TechCorp Inc.", target: "뉴스레터 스폰서십", detail: "주 1회 · 4주", price: "$320", time: "1일 전", avatar: "TC" },
  { user: "스타트업허브", target: "검색 결과 상단 배너", detail: "970×90 · 7일", price: "$180", time: "2일 전", avatar: "SH" },
];

const ACTIVITY_INQUIRIES = [
  { user: "이서연", email: "seoyeon.lee@corp.io", target: "Image-based Patent Analysis", type: "Integration 문의", time: "14분 전", avatar: "LS", replied: false },
  { user: "최유진", email: "yujin.choi@research.ac.kr", target: "Wemeet Science", type: "기능 요청", time: "1시간 전", avatar: "CY", replied: false },
  { user: "윤소희", email: "sohee.yoon@fintech.io", target: "Startup Ecosystem Network", type: "결제 / 구독 문의", time: "4시간 전", avatar: "YS", replied: false },
  { user: "한예린", email: "yerin.han@university.edu", target: "Wemeet Science", type: "일반 문의", time: "1일 전", avatar: "HY", replied: true },
  { user: "강도현", email: "dohyun.kang@mfg.co.kr", target: "K-tools Smart Equipment", type: "버그 리포트", time: "2일 전", avatar: "KD", replied: true },
];

const inquiryTypeBadge = (type: string) => {
  if (type === "결제 / 구독 문의") return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400";
  if (type === "Integration 문의") return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400";
  if (type === "버그 리포트") return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400";
  if (type === "기능 요청") return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400";
  return "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300";
};

function AvatarBubble({ label, color }: { label: string; color: string }) {
  return (
    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${color}`}>
      {label}
    </div>
  );
}

const AVATAR_COLORS = [
  "bg-indigo-500", "bg-blue-500", "bg-emerald-500", "bg-amber-500",
  "bg-rose-500", "bg-purple-500", "bg-teal-500", "bg-pink-500",
];

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  const [pendingTab, setPendingTab] = useState<'hosted' | 'linked'>('hosted');
  const [submissionTab, setSubmissionTab] = useState<'hosted' | 'linked'>('hosted');
  const [activityTab, setActivityTab] = useState<'purchase' | 'ad' | 'inquiry'>('purchase');

  const trafficData = generateTrafficData(timeframe);
  const revenueData = generateRevenueData(timeframe);
  const storageData = generateStorageData(timeframe);

  const hostedPending = HOSTED_STATUS_DATA.find(d => d.name === 'Pending')?.value ?? 0;
  const linkedPending = LINKED_STATUS_DATA.find(d => d.name === 'Pending')?.value ?? 0;
  const hostedTotal = HOSTED_STATUS_DATA.reduce((s, d) => s + d.value, 0);
  const linkedTotal = LINKED_STATUS_DATA.reduce((s, d) => s + d.value, 0);

  const submissionData = submissionTab === 'hosted' ? HOSTED_STATUS_DATA : LINKED_STATUS_DATA;

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">

        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">View by:</span>
            <Select value={timeframe} onValueChange={(v: any) => setTimeframe(v)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button id="date" variant="outline"
                  className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? <>{format(date.from, "LLL dd, y")} – {format(date.to, "LLL dd, y")}</> : format(date.from, "LLL dd, y")
                  ) : <span>Pick a date range</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SUMMARY_METRICS.map((metric, index) => (
            <Card key={index} className="border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${metric.color}`}>
                  <metric.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{metric.change}</p>
              </CardContent>
            </Card>
          ))}

          {/* Pending Requests card - split by service type */}
          <Card className="border-amber-200 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-900/5 md:col-span-2 lg:col-span-4">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Pending Requests
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">승인 대기 중인 서비스 신청 현황</CardDescription>
                </div>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 border text-sm font-bold px-3">
                  총 {hostedPending + linkedPending}건
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {/* Hosted */}
                <div className={cn(
                  "rounded-xl border-2 p-4 transition-all cursor-pointer",
                  pendingTab === 'hosted'
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-600"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-300"
                )} onClick={() => setPendingTab('hosted')}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hosted Service</p>
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{hostedPending}건</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {HOSTED_STATUS_DATA.map(d => (
                      <div key={d.name} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <span className="h-2 w-2 rounded-full inline-block" style={{ background: d.color }} />
                          {d.name}
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Linked */}
                <div className={cn(
                  "rounded-xl border-2 p-4 transition-all cursor-pointer",
                  pendingTab === 'linked'
                    ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/10 dark:border-indigo-600"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-300"
                )} onClick={() => setPendingTab('linked')}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-9 w-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Link2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Linked Service</p>
                      <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{linkedPending}건</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {LINKED_STATUS_DATA.map(d => (
                      <div key={d.name} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <span className="h-2 w-2 rounded-full inline-block" style={{ background: d.color }} />
                          {d.name}
                        </span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Revenue Overview ({timeframe})</CardTitle>
              <CardDescription>Revenue from Data Sales vs Advertising based on selected period</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Bar dataKey="dataSales" name="Data Sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="adSales" name="Ad Revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>User Traffic ({timeframe})</CardTitle>
              <CardDescription>Unique visitors based on selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trafficData}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Storage */}
          <Card className="col-span-2 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Data Storage Growth ({timeframe})</CardTitle>
              <CardDescription>Total accumulated data volume in TB</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={storageData}>
                  <defs>
                    <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}TB`} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="storage" stroke="#f59e0b" fillOpacity={1} fill="url(#colorStorage)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Submission Status — split by Hosted / Linked */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle>Submission Status</CardTitle>
              <CardDescription>서비스 유형별 신청 현황</CardDescription>
              <div className="flex rounded-lg border overflow-hidden w-fit mt-1">
                <button
                  className={cn("px-3 py-1 text-xs font-semibold flex items-center gap-1.5 transition-colors",
                    submissionTab === 'hosted' ? "bg-blue-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800")}
                  onClick={() => setSubmissionTab('hosted')}
                >
                  <Server className="h-3 w-3" /> Hosted
                </button>
                <button
                  className={cn("px-3 py-1 text-xs font-semibold flex items-center gap-1.5 transition-colors",
                    submissionTab === 'linked' ? "bg-indigo-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800")}
                  onClick={() => setSubmissionTab('linked')}
                >
                  <Link2 className="h-3 w-3" /> Linked
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground mb-1 text-center">
                총 {submissionTab === 'hosted' ? hostedTotal : linkedTotal}건
              </div>
              <div className="h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={submissionData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={5} dataKey="value">
                      {submissionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity — 3 tabs */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>최근 플랫폼 활동 내역</CardDescription>
              </div>
              <div className="flex rounded-xl border overflow-hidden bg-slate-50 dark:bg-slate-800 p-1 gap-1">
                <button
                  data-testid="tab-activity-purchase"
                  onClick={() => setActivityTab('purchase')}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    activityTab === 'purchase'
                      ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  상품구매
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    activityTab === 'purchase' ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "bg-slate-200 text-slate-500 dark:bg-slate-700")}>
                    {ACTIVITY_PURCHASES.length}
                  </span>
                </button>
                <button
                  data-testid="tab-activity-ad"
                  onClick={() => setActivityTab('ad')}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    activityTab === 'ad'
                      ? "bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  <MegaphoneIcon className="h-3.5 w-3.5" />
                  광고신청
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    activityTab === 'ad' ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300" : "bg-slate-200 text-slate-500 dark:bg-slate-700")}>
                    {ACTIVITY_ADS.length}
                  </span>
                </button>
                <button
                  data-testid="tab-activity-inquiry"
                  onClick={() => setActivityTab('inquiry')}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    activityTab === 'inquiry'
                      ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  )}
                >
                  <Inbox className="h-3.5 w-3.5" />
                  문의
                  <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    activityTab === 'inquiry' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-slate-200 text-slate-500 dark:bg-slate-700")}>
                    {ACTIVITY_INQUIRIES.length}
                  </span>
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* 상품구매 */}
            {activityTab === 'purchase' && (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {ACTIVITY_PURCHASES.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0" data-testid={`activity-purchase-${i}`}>
                    <div className="flex items-center gap-3">
                      <AvatarBubble label={item.avatar} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.user}</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">{item.target}</span> 구매
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.price}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 광고신청 */}
            {activityTab === 'ad' && (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {ACTIVITY_ADS.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0" data-testid={`activity-ad-${i}`}>
                    <div className="flex items-center gap-3">
                      <AvatarBubble label={item.avatar} color={AVATAR_COLORS[(i + 2) % AVATAR_COLORS.length]} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.user}</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-purple-600 dark:text-purple-400 font-medium">{item.target}</span>
                          <span className="ml-1 text-slate-400">· {item.detail}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.price}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 문의 */}
            {activityTab === 'inquiry' && (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {ACTIVITY_INQUIRIES.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0" data-testid={`activity-inquiry-${i}`}>
                    <div className="flex items-center gap-3">
                      <AvatarBubble label={item.avatar} color={AVATAR_COLORS[(i + 4) % AVATAR_COLORS.length]} />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.user}</p>
                          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4 border font-medium", inquiryTypeBadge(item.type))}>
                            {item.type}
                          </Badge>
                          {item.replied ? (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border font-medium bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400">
                              답장완료
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border font-medium bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400">
                              대기중
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{item.target}</span>
                          <span className="ml-1">· {item.email}</span>
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground shrink-0 ml-3">{item.time}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}
