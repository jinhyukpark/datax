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
  Activity
} from "lucide-react";
import { 
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

// Mock Data
const TRAFFIC_DATA = [
  { date: "12/01", visitors: 1200 },
  { date: "12/02", visitors: 1350 },
  { date: "12/03", visitors: 1100 },
  { date: "12/04", visitors: 1600 },
  { date: "12/05", visitors: 1900 },
  { date: "12/06", visitors: 2100 },
  { date: "12/07", visitors: 2400 },
  { date: "12/08", visitors: 2200 },
  { date: "12/09", visitors: 2600 },
  { date: "12/10", visitors: 2800 },
  { date: "12/11", visitors: 2500 },
  { date: "12/12", visitors: 3000 },
  { date: "12/13", visitors: 3200 },
  { date: "12/14", visitors: 3500 },
];

const REVENUE_DATA = [
  { month: "Jun", dataSales: 4000, adSales: 2400 },
  { month: "Jul", dataSales: 3000, adSales: 1398 },
  { month: "Aug", dataSales: 2000, adSales: 9800 },
  { month: "Sep", dataSales: 2780, adSales: 3908 },
  { month: "Oct", dataSales: 1890, adSales: 4800 },
  { month: "Nov", dataSales: 2390, adSales: 3800 },
  { month: "Dec", dataSales: 3490, adSales: 4300 },
];

const SUBMISSION_STATUS_DATA = [
  { name: 'Approved', value: 45, color: '#22c55e' },
  { name: 'Pending', value: 12, color: '#eab308' },
  { name: 'Rejected', value: 8, color: '#ef4444' },
];

const SUMMARY_METRICS = [
  { title: "Total Revenue", value: "$45,231.89", change: "+20.1% from last month", icon: DollarSign, color: "text-green-600 bg-green-100 dark:bg-green-900/20" },
  { title: "Data Sales", value: "1,234", change: "+180 since last hour", icon: ShoppingCart, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20" },
  { title: "Active Users", value: "573", change: "+201 since last hour", icon: Users, color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20" },
  { title: "Pending Requests", value: "12", change: "4 new requests today", icon: FileText, color: "text-amber-600 bg-amber-100 dark:bg-amber-900/20" },
  { title: "Ad Revenue", value: "$12,450", change: "+15% from last month", icon: Megaphone, color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20" },
  { title: "Blog Posts", value: "84", change: "+2 this week", icon: FileText, color: "text-pink-600 bg-pink-100 dark:bg-pink-900/20" },
  { title: "Comments", value: "2,345", change: "+45 today", icon: MessageSquare, color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/20" },
  { title: "Avg. Visit Time", value: "4m 32s", change: "+12s from last week", icon: Activity, color: "text-slate-600 bg-slate-100 dark:bg-slate-800" },
];

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
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
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Monthly revenue from Data Sales vs Advertising
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={REVENUE_DATA}>
                  <XAxis 
                    dataKey="month" 
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
              <CardTitle>User Traffic</CardTitle>
              <CardDescription>
                Daily unique visitors over the last 14 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={TRAFFIC_DATA}>
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
          {/* Submission Status Pie Chart */}
          <Card className="col-span-1 border-slate-200 dark:border-slate-800">
            <CardHeader>
              <CardTitle>Submission Status</CardTitle>
              <CardDescription>Distribution of data submission requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
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
          
          {/* Recent Activity List (Placeholder) */}
          <Card className="col-span-2 border-slate-200 dark:border-slate-800">
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
      </div>
    </AdminLayout>
  );
}
