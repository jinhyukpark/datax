import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, ArrowRight, Loader2, Save, Info, AlertCircle, CheckCircle2, Upload, Paperclip, Plus, Trash2, Zap, Star, Check, Terminal, Server, FileText, Shield, Calendar, XCircle, CreditCard, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HostedRequestDetailsProps {
  data: any;
  isEditable?: boolean;
  mode?: 'all' | 'application' | 'details';
}

export function HostedRequestDetails({ data, isEditable = false, mode = 'all' }: HostedRequestDetailsProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for form fields (Application Form)
  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    organization: "Climate Research Institute",
    capacity: "50GB",
    updateFreq: "daily",
    contactPerson: "Kim Min-su",
    contactEmail: "minsu.kim@example.com",
    contactPhone: "+82 10-1234-5678",
    useAccountEmail: true
  });

  // State for Data Information Details (Linked Service style fields)
  const [detailsData, setDetailsData] = useState({
    title: data.title || "",
    founder: data.provider || "",
    websiteUrl: "",
    affiliateLink: "",
    demoUrl: "",
    docsUrl: "",
    tagline: "",
    contactEmail: "minsu.kim@example.com",
    contactPhone: "+82 10-1234-5678",
    useAccountEmail: true,
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "",
    discordUrl: "",
    telegramUrl: "",
    category: "Analysis",
    accessModel: "API",
    price: "Free",
    priceAmount: "",
    license: "commercial",
    version: "",
    tags: [] as string[],
    features: [""] as string[],
    useCases: [{ title: "", content: "" }],
    longDescription: data.description || "",
    featuredImages: ["image01.png", "image02.png", "image03.png", "image04.png"] as string[],
    agentLogo: "",
    refundPolicy: data.refundPolicy || "If you are not satisfied with our service, you can request a full refund within 14 days of your purchase. Please contact support for assistance.",
    termsOfService: data.termsOfService || "By using this service, you agree to our terms and conditions. We reserve the right to modify these terms at any time."
  });

  // Terms & Policies State
  const [termsLastUpdated, setTermsLastUpdated] = useState("June 2025");
  const [termsDescription, setTermsDescription] = useState("By using this service, you agree to our terms and conditions. We reserve the right to modify these terms at any time. This agreement outlines the terms and conditions for the provision of hosted data services on the Illunex Platform.");
  const [providedServices, setProvidedServices] = useState([
    "Real-time sentiment analysis",
    "Multi-platform data aggregation",
    "Customizable reporting dashboards",
    "Trend forecasting algorithms",
    "API integration support"
  ]);
  const [servicePeriod, setServicePeriod] = useState([
    "Monthly subscription with automatic renewal",
    "Service available immediately upon payment"
  ]);
  const [licensePricing, setLicensePricing] = useState([
    "Commercial License: Business use permitted",
    "Monthly Fee: $78.00 (Billed monthly)"
  ]);
  const [refundPolicyItems, setRefundPolicyItems] = useState([
    "Full refund within 7 days if service not accessed",
    "Pro-rated refund available for annual plans"
  ]);
  const [expandedApiDoc, setExpandedApiDoc] = useState(false);

  // Terms & Policies Functions
  const addTermItem = (category: "providedServices" | "servicePeriod" | "licensePricing" | "refundPolicyItems") => {
    switch (category) {
      case "providedServices":
        setProvidedServices([...providedServices, ""]);
        break;
      case "servicePeriod":
        setServicePeriod([...servicePeriod, ""]);
        break;
      case "licensePricing":
        setLicensePricing([...licensePricing, ""]);
        break;
      case "refundPolicyItems":
        setRefundPolicyItems([...refundPolicyItems, ""]);
        break;
    }
  };

  const updateTermItem = (category: "providedServices" | "servicePeriod" | "licensePricing" | "refundPolicyItems", index: number, value: string) => {
    switch (category) {
      case "providedServices":
        setProvidedServices(providedServices.map((item, i) => i === index ? value : item));
        break;
      case "servicePeriod":
        setServicePeriod(servicePeriod.map((item, i) => i === index ? value : item));
        break;
      case "licensePricing":
        setLicensePricing(licensePricing.map((item, i) => i === index ? value : item));
        break;
      case "refundPolicyItems":
        setRefundPolicyItems(refundPolicyItems.map((item, i) => i === index ? value : item));
        break;
    }
  };

  const removeTermItem = (category: "providedServices" | "servicePeriod" | "licensePricing" | "refundPolicyItems", index: number) => {
    switch (category) {
      case "providedServices":
        setProvidedServices(providedServices.filter((_, i) => i !== index));
        break;
      case "servicePeriod":
        setServicePeriod(servicePeriod.filter((_, i) => i !== index));
        break;
      case "licensePricing":
        setLicensePricing(licensePricing.filter((_, i) => i !== index));
        break;
      case "refundPolicyItems":
        setRefundPolicyItems(refundPolicyItems.filter((_, i) => i !== index));
        break;
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDetailsChange = (field: string, value: any) => {
    setDetailsData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t("Request updated successfully", "요청이 성공적으로 수정되었습니다."));
    }, 1000);
  };

  const CATEGORIES = [
    "Analysis", "News", "Finance", "Space", "Patent",
    "Science", "Equipment", "Energy", "Waste", "Growth",
    "Startup", "Transaction", "Oil", "Consulting", "Investment",
    "Power", "Network", "Innovation", "Materials", "Enterprise",
    "Ecosystem", "E-commerce", "Robot", "M&A", "R&D"
  ];

  const addFeature = () => {
    if (detailsData.features.length < 5) {
      setDetailsData(prev => ({ ...prev, features: [...prev.features, ""] }));
    }
  };

  const removeFeature = (index: number) => {
    if (detailsData.features.length > 1) {
      setDetailsData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
    }
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...detailsData.features];
    newFeatures[index] = value;
    setDetailsData(prev => ({ ...prev, features: newFeatures }));
  };

  const addUseCase = () => {
    if (detailsData.useCases.length < 5) {
      setDetailsData(prev => ({ ...prev, useCases: [...prev.useCases, { title: "", content: "" }] }));
    }
  };

  const removeUseCase = (index: number) => {
    if (detailsData.useCases.length > 1) {
      setDetailsData(prev => ({ ...prev, useCases: prev.useCases.filter((_, i) => i !== index) }));
    }
  };

  const updateUseCase = (index: number, field: 'title' | 'content', value: string) => {
    const newUseCases = [...detailsData.useCases];
    newUseCases[index] = { ...newUseCases[index], [field]: value };
    setDetailsData(prev => ({ ...prev, useCases: newUseCases }));
  };

  const removeImage = (index: number) => {
    setDetailsData(prev => ({ 
      ...prev, 
      featuredImages: prev.featuredImages.filter((_, i) => i !== index) 
    }));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-slate-950">
      {/* Header Section - Fixed */}
      <div className="px-8 pt-8 pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-950 z-10">
        <h1 className="text-2xl font-bold">Manage <span className="text-indigo-600 dark:text-indigo-400">{detailsData.title}</span></h1>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Status Banners for Non-Editable States */}
        {!isEditable && data.status && data.status !== 'submitted' && (
          <div className="animate-in fade-in slide-in-from-top-2 mb-6">
            {data.status === 'verifying' && (
              <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800 dark:text-blue-300">Under Review</AlertTitle>
                <AlertDescription className="text-blue-700 dark:text-blue-400">
                  This request is currently being verified by our team. You cannot make changes at this time.
                </AlertDescription>
              </Alert>
            )}
            {data.status === 'rejected' && (
              <Alert variant="destructive" className="bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Submission Rejected</AlertTitle>
                <AlertDescription>
                  {data.rejectionReason || "This request was rejected. Please check your notifications for details."}
                </AlertDescription>
              </Alert>
            )}
            {data.status === 'verified' && (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800 dark:text-green-300">Approved</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  This request has been approved and published.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <Tabs defaultValue={mode === 'details' ? 'overview' : 'overview'} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8 mb-6">
            <TabsTrigger 
              value="overview" 
              className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="documentation" 
              className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 text-sm"
            >
              Documentation
            </TabsTrigger>
            <TabsTrigger 
              value="terms" 
              className="rounded-none border-b-2 border-transparent px-4 py-4 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 text-sm"
            >
              Terms & Policies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-1">Info</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Changes to basic information will require re-approval from the administration team.
            </p>
          </div>

          {/* Detailed Data Information Form (Linked Service Style) */}
          
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-300 dark:border-slate-700">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h2 className="text-lg font-bold">Basic Information</h2>
                    <p className="text-xs text-muted-foreground">Tell us about your AI Agent</p>
                  </div>
                </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>AI Agent Name <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.title.length}/35</span>
                </Label>
                <Input value={detailsData.title} onChange={(e) => handleDetailsChange('title', e.target.value)} placeholder="e.g. AutoGPT" className="h-10" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Founders / Company Name</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.founder.length}/50</span>
                </Label>
                <Input value={detailsData.founder} onChange={(e) => handleDetailsChange('founder', e.target.value)} placeholder="e.g. OpenAI" className="h-10" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Website URL <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.websiteUrl.length}/100</span>
                </Label>
                <Input value={detailsData.websiteUrl} onChange={(e) => handleDetailsChange('websiteUrl', e.target.value)} placeholder="https://" className="h-10" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Affiliate Link</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.affiliateLink.length}/300</span>
                </Label>
                <Input value={detailsData.affiliateLink} onChange={(e) => handleDetailsChange('affiliateLink', e.target.value)} placeholder="https://" className="h-10" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Demo URL</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.demoUrl.length}/200</span>
                </Label>
                <Input value={detailsData.demoUrl} onChange={(e) => handleDetailsChange('demoUrl', e.target.value)} placeholder="https://youtube.com/..." className="h-10" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Documentation URL</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.docsUrl.length}/200</span>
                </Label>
                <Input value={detailsData.docsUrl} onChange={(e) => handleDetailsChange('docsUrl', e.target.value)} placeholder="https://docs..." className="h-10" />
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
                                value={detailsData.contactEmail} 
                                onChange={(e) => handleDetailsChange('contactEmail', e.target.value)} 
                                placeholder="email@company.com"
                                className="h-10 bg-white dark:bg-slate-900" 
                                disabled={detailsData.useAccountEmail}
                            />
                            <div className="flex items-center space-x-2 mt-2">
                                <Checkbox 
                                    id="use-account-email-details" 
                                    checked={detailsData.useAccountEmail}
                                    onCheckedChange={(checked) => handleDetailsChange('useAccountEmail', checked)}
                                />
                                <label
                                    htmlFor="use-account-email-details"
                                    className="text-xs text-muted-foreground"
                                >
                                    Use account email (jh.park@illunex.com)
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="font-semibold text-sm">Contact Phone</Label>
                            <Input 
                                value={detailsData.contactPhone} 
                                onChange={(e) => handleDetailsChange('contactPhone', e.target.value)} 
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
                  <Input value={detailsData.linkedinUrl} onChange={(e) => handleDetailsChange('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." className="h-10 bg-white dark:bg-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Twitter URL</Label>
                  <Input value={detailsData.twitterUrl} onChange={(e) => handleDetailsChange('twitterUrl', e.target.value)} placeholder="https://twitter.com/..." className="h-10 bg-white dark:bg-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">GitHub URL</Label>
                  <Input value={detailsData.githubUrl} onChange={(e) => handleDetailsChange('githubUrl', e.target.value)} placeholder="https://github.com/..." className="h-10 bg-white dark:bg-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold text-sm">Discord URL</Label>
                  <Input value={detailsData.discordUrl} onChange={(e) => handleDetailsChange('discordUrl', e.target.value)} placeholder="https://discord.gg/..." className="h-10 bg-white dark:bg-slate-900" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="font-semibold text-sm">Telegram URL</Label>
                  <Input value={detailsData.telegramUrl} onChange={(e) => handleDetailsChange('telegramUrl', e.target.value)} placeholder="https://t.me/..." className="h-10 bg-white dark:bg-slate-900" />
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
                <p className="text-xs text-muted-foreground">Help users find your agent</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-100 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Category <span className="text-red-500">*</span></Label>
              <RadioGroup value={detailsData.category.toLowerCase()} onValueChange={(val) => handleDetailsChange('category', val)} className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-3">
                  {CATEGORIES.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                      <RadioGroupItem value={cat.toLowerCase()} id={`cat-${cat.toLowerCase()}`} className="shrink-0" />
                      <Label htmlFor={`cat-${cat.toLowerCase()}`} className="font-medium text-sm cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">{cat}</Label>
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
                <RadioGroup value={detailsData.accessModel.toLowerCase().replace(' ', '-')} onValueChange={(val) => handleDetailsChange('accessModel', val)} className="gap-2">
                  {["File", "API", "MCP", "AI Agent"].map((type) => (
                    <div key={type} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800">
                      <RadioGroupItem value={type.toLowerCase().replace(' ', '-')} id={`delivery-${type.toLowerCase()}`} />
                      <Label htmlFor={`delivery-${type.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{type}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Pricing <span className="text-red-500">*</span></Label>
                <RadioGroup value={detailsData.price.toLowerCase()} onValueChange={(val) => handleDetailsChange('price', val === 'free' ? 'Free' : 'Paid')} className="gap-2">
                  {["Free", "Paid"].map((p) => (
                    <div key={p} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800">
                      <RadioGroupItem value={p.toLowerCase()} id={`pricing-${p.toLowerCase()}`} />
                      <Label htmlFor={`pricing-${p.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{p}</Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {detailsData.price === 'Paid' && (
                  <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                    <Label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Price (USD)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                      <Input 
                        value={detailsData.priceAmount || ''} 
                        onChange={(e) => handleDetailsChange('priceAmount', e.target.value)}
                        placeholder="0.00" 
                        className="pl-7 h-9"
                        type="number"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="font-semibold text-sm">License</Label>
                    <Select value={detailsData.license} onValueChange={(val) => handleDetailsChange('license', val)}>
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
                    <Input value={detailsData.version} onChange={(e) => handleDetailsChange('version', e.target.value)} placeholder="e.g., v2.4.1" className="h-10" />
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
              <Label className="font-semibold text-sm">Agent Logo <span className="text-red-500">*</span></Label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Click to upload agent logo</p>
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
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.tagline.length}/100</span>
                </Label>
                <Input value={detailsData.tagline} onChange={(e) => handleDetailsChange('tagline', e.target.value)} placeholder="A catchy one-liner for your AI Agent card" className="h-10 bg-white dark:bg-slate-900" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Description <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.longDescription.length}/750</span>
                </Label>
                <Textarea value={detailsData.longDescription} onChange={(e) => handleDetailsChange('longDescription', e.target.value)} placeholder="Describe your AI Agent in detail. What problem does it solve? Who is it for?" className="min-h-[100px] resize-y bg-white dark:bg-slate-900" />
              </div>

              <div className="space-y-3">
                <Label className="font-semibold text-sm">Tags</Label>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="sm" className="h-8 rounded-full border-dashed border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400 bg-white dark:bg-slate-900">
                    <Plus className="h-3 w-3 mr-1" /> New Tag
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Key Features</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.features.length}/5</span>
                </Label>
                <div className="space-y-2">
                  {detailsData.features.map((feature, i) => (
                    <div key={i} className="flex gap-2">
                      <Input value={feature} onChange={(e) => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className="h-10 bg-white dark:bg-slate-900" />
                    </div>
                  ))}
                </div>
                {detailsData.features.length < 5 && (
                  <div onClick={addFeature} className="mt-2 w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg h-10 flex items-center justify-center text-sm text-muted-foreground cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-900 transition-all bg-white dark:bg-slate-900">
                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                  </div>
                )}
                <p className="text-[10px] text-muted-foreground">Add up to 5 key features of your AI Agent.</p>
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Use Cases</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.useCases.length}/5</span>
                </Label>
                <div className="space-y-3">
                  {detailsData.useCases.map((useCase, i) => (
                    <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2 bg-white dark:bg-slate-900">
                      <Input value={useCase.title} onChange={(e) => updateUseCase(i, 'title', e.target.value)} placeholder={`Use Case Title ${i + 1}`} className="h-10 font-medium bg-white dark:bg-slate-900" />
                      <Textarea value={useCase.content} onChange={(e) => updateUseCase(i, 'content', e.target.value)} placeholder="Describe this use case..." className="min-h-[60px] bg-white dark:bg-slate-900" />
                    </div>
                  ))}
                </div>
                {detailsData.useCases.length < 5 && (
                  <div onClick={addUseCase} className="mt-2 w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg h-10 flex items-center justify-center text-sm text-muted-foreground cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-900 transition-all bg-white dark:bg-slate-900">
                    <Plus className="h-4 w-4 mr-2" /> Add Use Case
                  </div>
                )}
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
                {detailsData.featuredImages.map((img, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <Paperclip className="h-4 w-4 text-slate-400 flex-shrink-0" />
                      <span className="text-sm text-slate-600 dark:text-slate-300 truncate">{img}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeImage(i)} className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Documentation Tab */}
        <TabsContent value="documentation" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Quick Start Guide
              </h3>
              <Badge variant="outline">{detailsData.version || "v1.0.0"}</Badge>
            </div>

            {/* Step 1: Installation */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-sm">1</div>
                <h4 className="font-bold">Installation</h4>
              </div>
              <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50">
                <div className="absolute right-4 top-4 text-xs text-slate-400">BASH</div>
                <p className="text-slate-400"># Using npm</p>
                <p className="mb-3">npm install @em-data/sdk</p>
                <p className="text-slate-400"># Using pip (Python)</p>
                <p className="mb-3">pip install em-data-sdk</p>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  SDK를 설치하면 API 클라이언트와 필요한 모든 의존성이 함께 설치됩니다. Node.js 18+ 또는 Python 3.8+ 환경이 필요합니다.
                </p>
              </div>
            </div>

            {/* Step 2: Usage */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-bold text-sm">2</div>
                <h4 className="font-bold">JavaScript / Node.js Integration</h4>
              </div>
              <div className="relative rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-50 overflow-x-auto">
                <div className="absolute right-4 top-4 text-xs text-slate-400">JAVASCRIPT</div>
                <p><span className="text-purple-400">import</span> {"{"} EMDataClient {"}"} <span className="text-purple-400">from</span> <span className="text-green-400">'@em-data/sdk'</span>;</p>
                <br/>
                <p className="text-slate-400">// Initialize the client</p>
                <p><span className="text-purple-400">const</span> client = <span className="text-blue-400">new</span> EMDataClient({"{"}</p>
                <p>&nbsp;&nbsp;apiKey: process.env.<span className="text-orange-400">EM_API_KEY</span>,</p>
                <p>&nbsp;&nbsp;baseUrl: <span className="text-green-400">'{detailsData.websiteUrl || "https://api.example.com"}'</span></p>
                <p>{"}"});</p>
              </div>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  EMDataClient를 초기화할 때 API 키와 기본 URL을 설정합니다. API 키는 환경변수에서 가져오는 것을 권장합니다.
                </p>
              </div>
            </div>

            {/* API Definitions Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Database className="h-5 w-5" />
                API Definitions
              </h3>

              {/* API Function 1 */}
              <div className="rounded-xl border border-slate-200 bg-slate-900 p-6 dark:border-slate-700">
                <h4 className="font-mono font-bold text-white mb-3">get_genre_list</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-slate-400 text-sm w-16 shrink-0">용도</span>
                    <span className="text-slate-300 text-sm">사용 가능한 모든 공연 장르 코드와 이름을 조회합니다. 연극, 뮤지컬, 무용, 클래식, 국악, 대중음악 등의 장르를 제공합니다.</span>
                  </div>
                </div>
              </div>

              {/* API Function 2 */}
              <div className="rounded-xl border border-slate-200 bg-slate-900 p-6 dark:border-slate-700">
                <h4 className="font-mono font-bold text-white mb-3">search_events_by_location</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-slate-400 text-sm w-16 shrink-0">용도</span>
                    <span className="text-slate-300 text-sm">특정 지역과 기간의 공연을 검색합니다. 검색 결과가 없으면 자동으로 구/군 → 시/도 → 전국 순으로 범위를 확장합니다.</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-400 text-sm w-16 shrink-0">파라미터</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">genreCode: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">startDate: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">endDate: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">sidoCode: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">gugunCode: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">limit: number</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Function 3 */}
              <div className="rounded-xl border border-slate-200 bg-slate-900 p-6 dark:border-slate-700">
                <h4 className="font-mono font-bold text-white mb-3">filter_free_events</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-slate-400 text-sm w-16 shrink-0">용도</span>
                    <div className="flex-1">
                      <span className="text-slate-300 text-sm">무료 공연을 우선 검색합니다 (항상 오늘부터 30일 이내). 무료 공연이 5개 미만이면 저렴한 유료 공연으로 자동 보충합니다.</span>
                      <br />
                      <span className="text-amber-400 text-sm">startDate/endDate는 무시...</span>
                      <button 
                        onClick={() => setExpandedApiDoc(!expandedApiDoc)}
                        className="text-blue-400 text-xs ml-2 hover:underline"
                      >
                        {expandedApiDoc ? '접기' : '더 보기'}
                      </button>
                      {expandedApiDoc && (
                        <div className="mt-3 p-3 bg-slate-800 rounded-lg text-slate-300 text-sm">
                          이 함수는 항상 오늘 날짜부터 30일 이내의 무료 공연만 검색하므로, startDate와 endDate 파라미터는 무시됩니다. 
                          검색 결과에서 무료 공연이 5개 미만인 경우, 자동으로 저렴한 유료 공연을 추가하여 최소 5개의 결과를 반환합니다.
                          genreCode와 sidoCode를 활용하여 원하는 장르와 지역으로 필터링할 수 있습니다.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-slate-400 text-sm w-16 shrink-0">파라미터</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">genreCode: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">startDate: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">endDate: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">sidoCode: string</Badge>
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 font-mono text-xs">limit: number</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">3</div>
                <h4 className="font-bold">Full Documentation</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                For complete API reference, guides, and tutorials, please visit our documentation portal.
              </p>
              <Button variant="outline" className="gap-2" onClick={() => window.open(detailsData.docsUrl || "#", "_blank")}>
                View Documentation <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Terms & Policies Tab */}
        <TabsContent value="terms" className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/30 dark:to-slate-900/50 p-6 border border-indigo-100 dark:border-indigo-900">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Detailed Terms of Service</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Label className="text-xs text-slate-500">Last updated:</Label>
                  <Input 
                    value={termsLastUpdated} 
                    onChange={(e) => setTermsLastUpdated(e.target.value)}
                    className="h-7 w-32 text-xs border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
            </div>
            <Textarea 
              value={termsDescription}
              onChange={(e) => setTermsDescription(e.target.value)}
              className="min-h-[80px] bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 text-sm italic text-slate-600 dark:text-slate-400 rounded-xl"
              placeholder="Enter terms description..."
            />
          </div>

          <div className="text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Service Guidelines</span>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Provided Services</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addTermItem("providedServices")}
                    className="text-indigo-600 hover:text-indigo-700 h-8"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                  {providedServices.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 group">
                      <div className="h-2 w-2 rounded-full bg-indigo-400 shrink-0" />
                      <Input 
                        value={item}
                        onChange={(e) => updateTermItem("providedServices", idx, e.target.value)}
                        className="h-8 text-sm border-slate-100 dark:border-slate-700 flex-1"
                        placeholder="Enter service..."
                      />
                      <button 
                        onClick={() => removeTermItem("providedServices", idx)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Service Period</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addTermItem("servicePeriod")}
                    className="text-cyan-600 hover:text-cyan-700 h-8"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2 mt-3">
                  {servicePeriod.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 group">
                      <div className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                      <Input 
                        value={item}
                        onChange={(e) => updateTermItem("servicePeriod", idx, e.target.value)}
                        className="h-8 text-sm border-slate-100 dark:border-slate-700 flex-1"
                        placeholder="Enter period info..."
                      />
                      <button 
                        onClick={() => removeTermItem("servicePeriod", idx)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-amber-200 dark:border-amber-800 p-6 bg-amber-50/30 dark:bg-amber-950/20">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900 flex items-center justify-center shrink-0">
                <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">License & Pricing</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addTermItem("licensePricing")}
                    className="text-amber-600 hover:text-amber-700 h-8"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2 mt-3">
                  {licensePricing.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 group">
                      <div className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                      <Input 
                        value={item}
                        onChange={(e) => updateTermItem("licensePricing", idx, e.target.value)}
                        className="h-8 text-sm border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 flex-1"
                        placeholder="Enter license/pricing info..."
                      />
                      <button 
                        onClick={() => removeTermItem("licensePricing", idx)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Refund Policy</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => addTermItem("refundPolicyItems")}
                    className="text-green-600 hover:text-green-700 h-8"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
                <div className="space-y-2 mt-3">
                  {refundPolicyItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 group">
                      <div className="h-2 w-2 rounded-full bg-green-400 shrink-0" />
                      <Input 
                        value={item}
                        onChange={(e) => updateTermItem("refundPolicyItems", idx, e.target.value)}
                        className="h-8 text-sm border-slate-100 dark:border-slate-700 flex-1"
                        placeholder="Enter refund policy..."
                      />
                      <button 
                        onClick={() => removeTermItem("refundPolicyItems", idx)}
                        className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 transition-all"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      </div>

      {isEditable && (
        <div className="px-8 py-6 border-t bg-slate-50/50 shrink-0 flex justify-end gap-3 z-10">
          <Button variant="outline" onClick={() => {}} className="rounded-xl px-6">
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-10 gap-2 font-bold shadow-lg shadow-indigo-500/20">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
