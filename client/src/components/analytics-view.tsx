import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend, Area, AreaChart } from "recharts";
import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, Calendar, Download, Eye, MessageSquare, MousePointerClick, Users, Zap } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

interface AnalyticsViewProps {
  resourceId: string;
  resourceTitle: string;
}

export function AnalyticsView({ resourceId, resourceTitle }: AnalyticsViewProps) {
  const { t } = useLanguage();
  const [period, setPeriod] = useState("30d");

  // Mock Data Generators
  const generateTrafficData = (days: number) => {
    return Array.from({ length: days }).map((_, i) => ({
      date: `Day ${i + 1}`,
      views: Math.floor(Math.random() * 500) + 100,
      unique: Math.floor(Math.random() * 300) + 50,
    }));
  };

  const generateApiData = (days: number) => {
    return Array.from({ length: days }).map((_, i) => ({
      date: `Day ${i + 1}`,
      calls: Math.floor(Math.random() * 5000) + 1000,
      errors: Math.floor(Math.random() * 50),
    }));
  };
  
  const generateReviewData = (days: number) => {
      return Array.from({ length: days }).map((_, i) => ({
        date: `Day ${i + 1}`,
        comments: Math.floor(Math.random() * 10),
        rating: 3 + Math.random() * 2,
      }));
  };

  const trafficData = generateTrafficData(period === "7d" ? 7 : period === "30d" ? 30 : 12);
  const apiData = generateApiData(period === "7d" ? 7 : period === "30d" ? 30 : 12);
  const reviewData = generateReviewData(period === "7d" ? 7 : period === "30d" ? 30 : 12);

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("Analytics Dashboard", "통계 대시보드")}</h2>
          <p className="text-muted-foreground">{resourceTitle}</p>
        </div>
        <div className="flex items-center gap-2">
            <Tabs defaultValue="30d" value={period} onValueChange={setPeriod} className="w-[300px]">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="7d">7 Days</TabsTrigger>
                    <TabsTrigger value="30d">30 Days</TabsTrigger>
                    <TabsTrigger value="1y">1 Year</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground flex items-center text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +201 since last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground flex items-center text-slate-500">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +0.1 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Traffic Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>
              Views and Unique Visitors over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#1e293b' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="views" stroke="#3b82f6" fillOpacity={1} fill="url(#colorViews)" name="Total Views" />
                  <Area type="monotone" dataKey="unique" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUnique)" name="Unique Visitors" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* API Usage Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
            <CardDescription>
              Total calls and error rates
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apiData}>
                  <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend />
                  <Bar dataKey="calls" fill="#10b981" radius={[4, 4, 0, 0]} name="Successful Calls" />
                  <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} name="Errors" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
         {/* Engagement Stats */}
         <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Community Engagement</CardTitle>
                <CardDescription>Review activity and rating trends</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={reviewData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="left" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis yAxisId="right" orientation="right" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 5]} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                            />
                            <Legend />
                            <Line yAxisId="left" type="monotone" dataKey="comments" stroke="#f59e0b" strokeWidth={2} name="New Comments" activeDot={{ r: 8 }} />
                            <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#6366f1" strokeWidth={2} name="Avg Rating" />
                        </LineChart>
                    </ResponsiveContainer>
                 </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
