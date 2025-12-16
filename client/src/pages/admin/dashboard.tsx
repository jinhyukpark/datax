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
  Calendar as CalendarIcon
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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addDays, format, subMonths, subYears } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";

// Mock Data Generators based on timeframe
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
  let baseStorage = 50; // Base storage in TB
  
  if (timeframe === 'daily') {
    return Array.from({ length: 14 }).map((_, i) => {
      baseStorage += Math.random() * 0.5;
      return {
        date: format(addDays(new Date(), i - 13), 'MM/dd'),
        storage: Number(baseStorage.toFixed(2))
      };
    });
  } else if (timeframe === 'monthly') {
    baseStorage = 30;
    return Array.from({ length: 12 }).map((_, i) => {
      baseStorage += Math.random() * 5;
      return {
        date: format(subMonths(new Date(), 11 - i), 'MMM'),
        storage: Number(baseStorage.toFixed(2))
      };
    });
  } else {
    baseStorage = 10;
    return Array.from({ length: 5 }).map((_, i) => {
      baseStorage += Math.random() * 20;
      return {
        date: format(subYears(new Date(), 4 - i), 'yyyy'),
        storage: Number(baseStorage.toFixed(2))
      };
    });
  }
};

const SUBMISSION_STATUS_DATA = [
  { name: 'Approved', value: 45, color: '#22c55e' },
  { name: 'Pending', value: 12, color: '#eab308' },
  { name: 'Rejected', value: 8, color: '#ef4444' },
];

const SUMMARY_METRICS = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last period", icon: DollarSign, color: "text-green-600 bg-green-100 dark:bg-green-900/20" },
  { title: "Data Sales", value: "1,234", change: "+180 since last period", icon: ShoppingCart, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20" },
  { title: "Active Users", value: "573", change: "+201 since last period", icon: Users, color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20" },
  { title: "Pending Requests", value: "12", change: "4 new requests today", icon: FileText, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/20" },
  { title: "Ad Revenue", value: "$12,450", change: "+15% from last period", icon: Megaphone, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20" },
  { title: "Blog Posts", value: "84", change: "+2 this period", icon: FileText, color: "text-pink-600 bg-pink-100 dark:bg-pink-900/20" },
  { title: "Comments", value: "2,345", change: "+45 today", icon: MessageSquare, color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20" },
  { title: "Avg. Visit Time", value: "4m 32s", change: "+12s from last period", icon: Activity, color: "text-slate-600 bg-slate-100 dark:bg-slate-800" },
];

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'yearly'>('daily');
  const [date, setDate] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  // Derived state (simulating data fetching based on filters)
  const trafficData = generateTrafficData(timeframe);
  const revenueData = generateRevenueData(timeframe);
  const storageData = generateStorageData(timeframe);

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
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {SUMMARY_METRICS.map((metric, index) => (
            <Card key={index} className="border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${metric.color}`}>
                  <metric.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Revenue Chart */}
          <Card className="col-span-4 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Revenue Overview ({timeframe})</CardTitle>
              <CardDescription>
                Revenue from Data Sales vs Advertising based on selected period
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={revenueData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Bar dataKey="dataSales" name="Data Sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="adSales" name="Ad Revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Traffic Chart */}
          <Card className="col-span-3 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>User Traffic ({timeframe})</CardTitle>
              <CardDescription>
                Unique visitors based on selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trafficData}>
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Storage Capacity Chart */}
          <Card className="col-span-2 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Data Storage Growth ({timeframe})</CardTitle>
              <CardDescription>
                Total accumulated data volume in TB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={storageData}>
                  <defs>
                    <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `${value}TB`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="storage" 
                    stroke="#f59e0b" 
                    fillOpacity={1} 
                    fill="url(#colorStorage)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Submission Status Pie Chart */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Submission Status</CardTitle>
              <CardDescription>Distribution of data submission requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SUBMISSION_STATUS_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {SUBMISSION_STATUS_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
          
        {/* Recent Activity List */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform events and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "Kim Min-su", action: "purchased", target: "Corporate Growth Data", time: "2 mins ago" },
                { user: "Tech Corp", action: "submitted", target: "New API Resource", time: "15 mins ago" },
                { user: "Lee Ji-won", action: "commented on", target: "Smart Factory Blog", time: "1 hour ago" },
                { user: "Global Systems", action: "paid for", target: "Banner Advertisement", time: "3 hours ago" },
                { user: "Park Sung-hoon", action: "registered", target: "New Account", time: "5 hours ago" },
                { user: "Vision AI", action: "updated", target: "Defect Detection Model", time: "1 day ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <p className="text-sm">
                      <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-primary">{activity.target}</span>
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
