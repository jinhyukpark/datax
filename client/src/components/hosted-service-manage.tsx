import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Activity, Server, Key, Shield, RefreshCw, Power, Settings, Globe, Database, Copy, Check, ShieldCheck, Upload, Paperclip, Save, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLanguage } from "@/lib/language-context";

interface HostedServiceManageProps {
  data: any;
}

const mockMetrics = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 500) + 100,
  latency: Math.floor(Math.random() * 50) + 10,
  cpu: Math.floor(Math.random() * 40) + 10,
}));

export function HostedServiceManage({ data }: HostedServiceManageProps) {
  const { t } = useLanguage();
  const [copiedKey, setCopiedKey] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  // Form State
  const [tags, setTags] = useState<string[]>(data.tags || ["AI", "Data"]);
  const [features, setFeatures] = useState<string[]>(data.features || ["Real-time Processing", "Secure API", "Scalable Infrastructure"]);
  const [useCases, setUseCases] = useState<{ title: string; content: string }[]>(
    data.useCases?.map((u: any) => ({ title: u, content: "" })) || [{ title: "Enterprise Analytics", content: "Process large-scale data for enterprise insights." }]
  );
  const [featuredImages, setFeaturedImages] = useState<string[]>(["dashboard-preview.png", "api-schema.png"]);
  const [agentLogo, setAgentLogo] = useState<string>(data.logo || "");
  
  // Form field values
  const [formValues, setFormValues] = useState({
    name: data.title || "",
    website: data.websiteUrl || "",
    tagline: data.description || "",
    description: data.longDescription || data.description || "",
  });

  const [contactEmail, setContactEmail] = useState(data.ownerEmail || "");
  const [useAccountEmail, setUseAccountEmail] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const ACCOUNT_EMAIL = "jh.park@illunex.com";

  const CATEGORIES = [
    "Analysis", "News", "Finance", "Space", "Patent",
    "Science", "Equipment", "Energy", "Waste", "Growth",
    "Startup", "Transaction", "Oil", "Consulting", "Investment",
    "Power", "Network", "Innovation", "Materials", "Enterprise",
    "Ecosystem", "E-commerce", "Robot", "M&A", "R&D"
  ];

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

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Service information updated successfully");
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

      <Tabs defaultValue="general" className="flex-1">
        <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-4 pb-10">
          <form onSubmit={handleGeneralSubmit} className="space-y-6">
            <div className="space-y-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h2 className="text-lg font-bold">Basic Information</h2>
                  <p className="text-xs text-muted-foreground">Manage your service details</p>
                </div>
              </div>

              {/* Basic Info Fields */}
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="flex justify-between font-semibold text-sm">
                    <span>Service Name <span className="text-red-500">*</span></span>
                    <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{formValues.name.length}/35</span>
                  </Label>
                  <Input 
                    id="name" 
                    value={formValues.name}
                    onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                    placeholder="e.g. AutoGPT" 
                    maxLength={35} 
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="founder" className="flex justify-between font-semibold text-sm">
                    <span>Owner / Company Name</span>
                    <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/50</span>
                  </Label>
                  <Input id="founder" defaultValue={data.owner} placeholder="e.g. OpenAI" maxLength={50} />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="website" className="flex justify-between font-semibold text-sm">
                    <span>Website URL <span className="text-red-500">*</span></span>
                    <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{formValues.website.length}/100</span>
                  </Label>
                  <Input 
                    id="website" 
                    value={formValues.website}
                    onChange={(e) => setFormValues({...formValues, website: e.target.value})}
                    placeholder="https://" 
                    maxLength={100} 
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="affiliate" className="flex justify-between font-semibold text-sm">
                    <span>Affiliate Link</span>
                    <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/300</span>
                  </Label>
                  <Input id="affiliate" placeholder="https://" maxLength={300} />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="demo" className="flex justify-between font-semibold text-sm">
                    <span>Demo URL</span>
                    <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/200</span>
                  </Label>
                  <Input id="demo" defaultValue={data.demoUrl} placeholder="https://youtube.com/..." maxLength={200} />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="docs" className="flex justify-between font-semibold text-sm">
                    <span>Documentation URL</span>
                    <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/200</span>
                  </Label>
                  <Input id="docs" defaultValue={data.docsUrl} placeholder="https://docs..." maxLength={200} />
                </div>
              </div>

              {/* Contact Email */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="flex justify-between items-center font-semibold text-sm">
                        <span className="flex items-center gap-2">Contact Email <span className="text-red-500">*</span></span>
                      </Label>
                      <div className="space-y-2">
                        <Input 
                          id="contact-email" 
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="email@company.com"
                          disabled={useAccountEmail}
                        />
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="use-account-email" 
                            checked={useAccountEmail}
                            onCheckedChange={(checked) => {
                              setUseAccountEmail(checked as boolean);
                              if (checked) setContactEmail(ACCOUNT_EMAIL);
                            }}
                          />
                          <label
                            htmlFor="use-account-email"
                            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                          >
                            Use account email ({ACCOUNT_EMAIL})
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="font-semibold text-sm">
                        Contact Phone
                      </Label>
                      <Input id="contact-phone" type="tel" placeholder="+82 10-1234-5678" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Header */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h2 className="text-lg font-bold">Social Presence</h2>
                  <p className="text-xs text-muted-foreground">Where can users find you?</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="font-semibold text-sm">LinkedIn URL</Label>
                  <Input id="linkedin" defaultValue={data.socialLinks?.linkedin} placeholder="https://linkedin.com/in/..." maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="font-semibold text-sm">Twitter URL</Label>
                  <Input id="twitter" defaultValue={data.socialLinks?.twitter} placeholder="https://twitter.com/..." maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github" className="font-semibold text-sm">GitHub URL</Label>
                  <Input id="github" defaultValue={data.socialLinks?.github} placeholder="https://github.com/..." maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discord" className="font-semibold text-sm">Discord URL</Label>
                  <Input id="discord" defaultValue={data.socialLinks?.discord} placeholder="https://discord.gg/..." maxLength={100} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="telegram" className="font-semibold text-sm">Telegram URL</Label>
                  <Input id="telegram" defaultValue={data.socialLinks?.telegram} placeholder="https://t.me/..." maxLength={100} />
                </div>
              </div>

              {/* Section 3: Classification */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h2 className="text-lg font-bold">Classification</h2>
                  <p className="text-xs text-muted-foreground">Service categorization</p>
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Category <span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue="analysis" className="gap-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {CATEGORIES.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                        <RadioGroupItem value={cat.toLowerCase()} id={`cat-${cat.toLowerCase()}`} />
                        <Label htmlFor={`cat-${cat.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{cat}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Delivery Type & Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Delivery Type <span className="text-red-500">*</span></Label>
                  <RadioGroup defaultValue={data.type === 'MCP' ? 'mcp' : data.type === 'AGENT' ? 'ai-agent' : 'api'} className="gap-2">
                    {["File", "API", "MCP", "AI Agent"].map((type) => (
                      <div key={type} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                        <RadioGroupItem value={type.toLowerCase().replace(' ', '-')} id={`delivery-${type.toLowerCase()}`} />
                        <Label htmlFor={`delivery-${type.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{type}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Pricing <span className="text-red-500">*</span></Label>
                  <RadioGroup defaultValue="paid" className="gap-2">
                    {["Free", "Paid"].map((p) => (
                      <div key={p} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                        <RadioGroupItem value={p.toLowerCase()} id={`pricing-${p.toLowerCase()}`} />
                        <Label htmlFor={`pricing-${p.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{p}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {/* License & Version */}
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
                      <SelectItem value="apache-2.0">Apache 2.0</SelectItem>
                      <SelectItem value="gpl-3.0">GPL 3.0</SelectItem>
                      <SelectItem value="proprietary">Proprietary</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Version</Label>
                  <Input placeholder="e.g., v2.4.1" defaultValue="v1.0.0" />
                </div>
              </div>

              {/* Section 4: Details & Assets */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h2 className="text-lg font-bold">Details & Assets</h2>
                  <p className="text-xs text-muted-foreground">Make your listing stand out</p>
                </div>
              </div>

              {/* Agent Logo */}
              <div className="space-y-3">
                <Label className="font-semibold text-sm">Service Logo <span className="text-red-500">*</span></Label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-900/50">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Click to upload logo</p>
                      <p className="text-xs text-muted-foreground">Recommended: 512×512px (Square)</p>
                      <p className="text-xs text-muted-foreground">SVG, PNG, JPG, WEBP</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Tagline <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{formValues.tagline.length}/100</span>
                </Label>
                <Input 
                  value={formValues.tagline} 
                  onChange={(e) => setFormValues({...formValues, tagline: e.target.value})}
                  placeholder="A catchy one-liner for your service" 
                />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Description <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{formValues.description.length}/750</span>
                </Label>
                <Textarea 
                  value={formValues.description} 
                  onChange={(e) => setFormValues({...formValues, description: e.target.value})}
                  placeholder="Describe your service in detail..." 
                  className="min-h-[100px] resize-y" 
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button type="submit" className="gap-2 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

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
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Requests per hour over the last 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockMetrics}>
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