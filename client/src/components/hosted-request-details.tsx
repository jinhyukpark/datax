import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, ArrowRight, Loader2, Save, Info, AlertCircle, CheckCircle2, Upload, Paperclip, Plus, Trash2, Zap, Star, Check, Terminal } from "lucide-react";
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
    agentLogo: ""
  });

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
      {/* Header Section with Hosted Service Indicator - Fixed */}
      <div className="flex flex-col items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-950 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-center">Manage <span className="text-indigo-600 dark:text-indigo-400">{detailsData.title}</span></h1>
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800 px-2 py-0.5 text-xs">
            Hosted Service
          </Badge>
        </div>
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
          <TabsList className={`grid w-full grid-cols-3 mb-8 h-auto p-0 bg-transparent gap-0`}>
            <TabsTrigger 
              value="overview" 
              className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 text-xs sm:text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="documentation" 
              className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 text-xs sm:text-sm"
            >
              Documentation
            </TabsTrigger>
            <TabsTrigger 
              value="pricing" 
              className="rounded-none border-b-2 border-transparent px-2 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 text-xs sm:text-sm"
            >
              Pricing
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
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
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
              <div className="mt-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
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
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h2 className="text-lg font-bold">Social Presence</h2>
                <p className="text-xs text-muted-foreground">Where can users find you?</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold text-sm">LinkedIn URL</Label>
                <Input value={detailsData.linkedinUrl} onChange={(e) => handleDetailsChange('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." className="h-10" />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-sm">Twitter URL</Label>
                <Input value={detailsData.twitterUrl} onChange={(e) => handleDetailsChange('twitterUrl', e.target.value)} placeholder="https://twitter.com/..." className="h-10" />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-sm">GitHub URL</Label>
                <Input value={detailsData.githubUrl} onChange={(e) => handleDetailsChange('githubUrl', e.target.value)} placeholder="https://github.com/..." className="h-10" />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold text-sm">Discord URL</Label>
                <Input value={detailsData.discordUrl} onChange={(e) => handleDetailsChange('discordUrl', e.target.value)} placeholder="https://discord.gg/..." className="h-10" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="font-semibold text-sm">Telegram URL</Label>
                <Input value={detailsData.telegramUrl} onChange={(e) => handleDetailsChange('telegramUrl', e.target.value)} placeholder="https://t.me/..." className="h-10" />
              </div>
            </div>
          </div>

          {/* Section 3: Classification */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h2 className="text-lg font-bold">Classification</h2>
                <p className="text-xs text-muted-foreground">Help users find your agent</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
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
              <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
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

              <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
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
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h2 className="text-lg font-bold">Details & Assets</h2>
                <p className="text-xs text-muted-foreground">Make your listing stand out</p>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-semibold text-sm">Agent Logo <span className="text-red-500">*</span></Label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
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

            <div className="space-y-3">
              <Label className="flex justify-between font-semibold text-sm">
                <span>Tagline <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.tagline.length}/100</span>
              </Label>
              <Input value={detailsData.tagline} onChange={(e) => handleDetailsChange('tagline', e.target.value)} placeholder="A catchy one-liner for your AI Agent card" className="h-10" />
            </div>

            <div className="space-y-3">
              <Label className="flex justify-between font-semibold text-sm">
                <span>Description <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.longDescription.length}/750</span>
              </Label>
              <Textarea value={detailsData.longDescription} onChange={(e) => handleDetailsChange('longDescription', e.target.value)} placeholder="Describe your AI Agent in detail. What problem does it solve? Who is it for?" className="min-h-[100px] resize-y" />
            </div>

            <div className="space-y-3">
                <Label className="font-semibold text-sm">Tags</Label>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 rounded-full border-dashed border-slate-300 text-slate-500 hover:text-slate-700 hover:border-slate-400">
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
                    <Input value={feature} onChange={(e) => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className="h-10" />
                  </div>
                ))}
              </div>
              {detailsData.features.length < 5 && (
                <div onClick={addFeature} className="mt-2 w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg h-10 flex items-center justify-center text-sm text-muted-foreground cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all">
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
                  <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50/50 dark:bg-slate-900/50">
                    <Input value={useCase.title} onChange={(e) => updateUseCase(i, 'title', e.target.value)} placeholder={`Use Case Title ${i + 1}`} className="h-10 font-medium" />
                    <Textarea value={useCase.content} onChange={(e) => updateUseCase(i, 'content', e.target.value)} placeholder="Describe this use case..." className="min-h-[60px]" />
                  </div>
                ))}
              </div>
              {detailsData.useCases.length < 5 && (
                <div onClick={addUseCase} className="mt-2 w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg h-10 flex items-center justify-center text-sm text-muted-foreground cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all">
                  <Plus className="h-4 w-4 mr-2" /> Add Use Case
                </div>
              )}
            </div>

            <div className="space-y-3">
                <Label className="font-semibold text-sm">Featured Image</Label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900/80 transition-colors cursor-pointer mb-4">
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

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Free Tier</h3>
                <div className="text-3xl font-bold mb-4">$0 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                <p className="text-sm text-muted-foreground mb-6">Perfect for testing and personal projects.</p>
                <Button className="w-full mb-6" variant="outline">Current Plan</Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> 1,000 API calls / month</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Basic support</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Community access</li>
                </ul>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 text-indigo-700 dark:text-indigo-300">Pro Tier</h3>
                <div className="text-3xl font-bold mb-4">$49 <span className="text-sm font-normal text-muted-foreground">/ month</span></div>
                <p className="text-sm text-muted-foreground mb-6">For professional developers and small teams.</p>
                <Button className="w-full mb-6 bg-indigo-600 hover:bg-indigo-700 text-white">Upgrade</Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> 100,000 API calls / month</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Priority support</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> Advanced analytics</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-indigo-500" /> SLA Guarantee</li>
                </ul>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">Custom</div>
                <p className="text-sm text-muted-foreground mb-6">For large scale applications and organizations.</p>
                <Button className="w-full mb-6" variant="outline">Contact Sales</Button>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Unlimited API calls</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Dedicated account manager</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Custom integrations</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> On-premise deployment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>

      {isEditable && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0 flex justify-end gap-3 z-10">
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                Submit Agent
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
