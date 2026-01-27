import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Activity, Server, Key, Shield, RefreshCw, Power, Settings, Globe, Database, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface HostedServiceManageProps {
  data: any;
}


export function HostedServiceManage({ data }: HostedServiceManageProps) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");

  const generateMockData = (range: string) => {
    const data = [];
    switch(range) {
      case "7d":
        for (let i = 0; i < 7; i++) {
          data.push({
            time: `Day ${i + 1}`,
            requests: Math.floor(Math.random() * 5000) + 1000,
            latency: Math.floor(Math.random() * 40) + 20,
          });
        }
        break;
      case "1m":
        for (let i = 0; i < 30; i += 2) {
           data.push({
            time: `${i + 1}th`,
            requests: Math.floor(Math.random() * 8000) + 2000,
            latency: Math.floor(Math.random() * 50) + 20,
          });
        }
        break;
      case "6m":
        const months6 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        months6.forEach(m => {
          data.push({
            time: m,
            requests: Math.floor(Math.random() * 50000) + 10000,
            latency: Math.floor(Math.random() * 60) + 30,
          });
        });
        break;
      case "1y":
        const months12 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months12.forEach(m => {
          data.push({
            time: m,
            requests: Math.floor(Math.random() * 100000) + 20000,
            latency: Math.floor(Math.random() * 70) + 30,
          });
        });
        break;
      default:
         for (let i = 0; i < 24; i++) {
          data.push({
            time: `${i}:00`,
            requests: Math.floor(Math.random() * 500) + 100,
            latency: Math.floor(Math.random() * 50) + 10,
          });
         }
    }
    return data;
  };

  const currentData = generateMockData(timeRange);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
    toast.success("API Key copied to clipboard");
  };

  const handlePowerToggle = () => {
    setIsRunning(!isRunning);
    toast.success(`Service ${!isRunning ? 'started' : 'stopped'} successfully`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {data.title}
            <Badge variant={isRunning ? "default" : "destructive"} className={isRunning ? "bg-green-500 hover:bg-green-600" : ""}>
              {isRunning ? "Running" : "Stopped"}
            </Badge>
          </h2>
          <p className="text-muted-foreground text-sm mt-1">{data.endpoint}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("Service refreshing...")}>
            <RefreshCw className="mr-2 h-4 w-4" /> Restart
          </Button>
          <Button variant={isRunning ? "destructive" : "default"} onClick={handlePowerToggle}>
            <Power className="mr-2 h-4 w-4" /> {isRunning ? "Stop" : "Start"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245.9K</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45ms</div>
                <p className="text-xs text-muted-foreground">-2ms from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12%</div>
                <p className="text-xs text-muted-foreground">Normal load</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.uptime || "99.9%"}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Requests over time</CardDescription>
                </div>
                <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  {["7d", "1m", "6m", "1y"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setTimeRange(r)}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        timeRange === r 
                          ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm" 
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-300"
                      }`}
                    >
                      {r === "7d" ? "7 Days" : r === "1m" ? "1 Month" : r === "6m" ? "6 Months" : "1 Year"}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <Tooltip />
                  <Line type="monotone" dataKey="requests" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>Manage your service environment configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>NODE_ENV</Label>
                <Input defaultValue="production" />
              </div>
              <div className="grid gap-2">
                <Label>MAX_CONNECTIONS</Label>
                <Input defaultValue="1000" />
              </div>
              <div className="grid gap-2">
                <Label>LOG_LEVEL</Label>
                <Input defaultValue="info" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instance Settings</CardTitle>
              <CardDescription>Configure compute resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Scaling</Label>
                  <p className="text-sm text-muted-foreground">Automatically scale instances based on load</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Window</Label>
                  <p className="text-sm text-muted-foreground">Allow system updates during off-peak hours</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys and access tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Production API Key</Label>
                <div className="flex gap-2">
                  <Input value="sk_prod_51Mxxxxxxxxxxxxxxxxxxxxx" readOnly className="font-mono" />
                  <Button size="icon" variant="outline" onClick={() => copyToClipboard("sk_prod_51Mxxxxxxxxxxxxxxxxxxxxx")}>
                    {copiedKey ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Never share your production API key.</p>
              </div>
              <Button variant="outline" className="text-red-600 hover:text-red-600 hover:bg-red-50">Roll Key</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>IP Whitelist</CardTitle>
              <CardDescription>Restrict access to specific IP addresses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="0.0.0.0/0" />
                <Button>Add</Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded text-sm">
                  <span>192.168.1.0/24</span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500"><Settings className="h-3 w-3" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4 mt-4">
           <Card>
            <CardHeader>
              <CardTitle>Server Information</CardTitle>
              <CardDescription>Details about the compute instance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label>Hostname</Label>
                   <Input value="srv-a1.hosted-service.com" readOnly />
                 </div>
                 <div className="space-y-2">
                   <Label>IP Address</Label>
                   <Input value="10.0.12.45" readOnly />
                 </div>
                 <div className="space-y-2">
                   <Label>OS</Label>
                   <Input value="Ubuntu 22.04 LTS" readOnly />
                 </div>
                 <div className="space-y-2">
                   <Label>Kernel</Label>
                   <Input value="5.15.0-91-generic" readOnly />
                 </div>
              </div>
            </CardContent>
           </Card>

           <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>Connection details for the hosted database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label>Host</Label>
                   <Input value="db.hosted-service.com" readOnly />
                 </div>
                 <div className="space-y-2">
                   <Label>Port</Label>
                   <Input value="5432" readOnly />
                 </div>
                 <div className="space-y-2">
                   <Label>Database</Label>
                   <Input value="user_db_prod" readOnly />
                 </div>
                 <div className="space-y-2">
                   <Label>Username</Label>
                   <Input value="admin_user" readOnly />
                 </div>
              </div>
              <Button variant="outline" className="w-full mt-2">
                <Database className="mr-2 h-4 w-4" /> Open Database Explorer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}