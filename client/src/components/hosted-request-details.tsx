import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, ArrowRight, Loader2, Save, Info, AlertCircle, CheckCircle2, Upload, Paperclip, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HostedRequestDetailsProps {
  data: any;
  isEditable?: boolean;
}

export function HostedRequestDetails({ data, isEditable = false }: HostedRequestDetailsProps) {
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
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "",
    discordUrl: "",
    telegramUrl: "",
    category: "Analysis",
    accessModel: "API",
    price: "Free",
    license: "commercial",
    version: "",
    tags: [] as string[],
    features: [""] as string[],
    useCases: [{ title: "", content: "" }],
    longDescription: data.description || "",
    featuredImages: [] as string[],
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

  return (
    <div className="space-y-6">
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

      <Tabs defaultValue="application" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="application">Application Form</TabsTrigger>
          <TabsTrigger value="details">Data Information Details</TabsTrigger>
        </TabsList>

        <TabsContent value="application" className="space-y-8">
          {/* Section Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
             <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
             <div>
               <h2 className="text-lg font-bold">Hosted Data Service Request</h2>
               <p className="text-xs text-muted-foreground">Submitted information about your dataset</p>
             </div>
          </div>

          {/* Basic Info Fields */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-3">
              <Label htmlFor="data-name" className="flex justify-between font-semibold text-sm">
                 <span>Data Name <span className="text-red-500">*</span></span>
              </Label>
              <Input 
                id="data-name" 
                value={formData.title} 
                onChange={(e) => handleChange('title', e.target.value)}
                readOnly={!isEditable} 
                disabled={!isEditable} 
                className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
              />
            </div>

            <div className="space-y-3">
               <Label htmlFor="data-desc" className="flex justify-between font-semibold text-sm">
                 <span>Description <span className="text-red-500">*</span></span>
               </Label>
               <Textarea 
                 id="data-desc" 
                 value={formData.description} 
                 onChange={(e) => handleChange('description', e.target.value)}
                 readOnly={!isEditable} 
                 disabled={!isEditable} 
                 className={`min-h-[100px] resize-y ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
               />
            </div>

            <div className="space-y-3">
              <Label htmlFor="organization" className="flex justify-between font-semibold text-sm">
                 <span>Organization / Institution <span className="text-red-500">*</span></span>
              </Label>
              <Input 
                id="organization" 
                value={formData.organization} 
                onChange={(e) => handleChange('organization', e.target.value)}
                readOnly={!isEditable} 
                disabled={!isEditable} 
                className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                  <Label htmlFor="capacity" className="flex justify-between font-semibold text-sm">
                     <span>Data Capacity (Volume)</span>
                  </Label>
                  <Input 
                    id="capacity" 
                    value={formData.capacity} 
                    onChange={(e) => handleChange('capacity', e.target.value)}
                    readOnly={!isEditable} 
                    disabled={!isEditable} 
                    className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
                  />
              </div>
              <div className="space-y-3">
                  <Label htmlFor="frequency" className="flex justify-between font-semibold text-sm">
                     <span>Update Frequency</span>
                  </Label>
                  <Select 
                    value={formData.updateFreq} 
                    onValueChange={(val) => handleChange('updateFreq', val)}
                    disabled={!isEditable}
                  >
                    <SelectTrigger className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`}>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">{t("1 Day", "1일")}</SelectItem>
                      <SelectItem value="weekly">{t("7 Days", "7일")}</SelectItem>
                      <SelectItem value="monthly">{t("1 Month", "한달")}</SelectItem>
                      <SelectItem value="6months">{t("6 Months", "6개월")}</SelectItem>
                      <SelectItem value="yearly">{t("12 Months", "12개월")}</SelectItem>
                      <SelectItem value="other">{t("Other", "기타")}</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="contact-person" className="flex justify-between font-semibold text-sm">
                 <span>Contact Person <span className="text-red-500">*</span></span>
              </Label>
              <Input 
                id="contact-person" 
                value={formData.contactPerson} 
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                readOnly={!isEditable} 
                disabled={!isEditable} 
                className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="contact-email" className="flex justify-between font-semibold text-sm">
                   <span>Contact Email <span className="text-red-500">*</span></span>
                </Label>
                <div className="space-y-2">
                  <Input 
                    id="contact-email" 
                    value={formData.contactEmail} 
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    readOnly={!isEditable || formData.useAccountEmail}
                    disabled={!isEditable || formData.useAccountEmail}
                    className={`h-10 ${!isEditable || formData.useAccountEmail ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
                  />
                  <div className={`flex items-center space-x-2 ${!isEditable ? 'opacity-50' : ''}`}>
                    <Checkbox 
                      id="use-account-email-hosted" 
                      checked={formData.useAccountEmail}
                      onCheckedChange={(checked) => handleChange('useAccountEmail', checked)}
                      disabled={!isEditable}
                    />
                    <label
                      htmlFor="use-account-email-hosted"
                      className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                    >
                      Use account email
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="contact-phone" className="flex justify-between font-semibold text-sm">
                   <span>Contact Phone</span>
                </Label>
                <Input 
                  id="contact-phone" 
                  value={formData.contactPhone} 
                  onChange={(e) => handleChange('contactPhone', e.target.value)}
                  readOnly={!isEditable} 
                  disabled={!isEditable} 
                  className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-8">
          {/* Detailed Data Information Form (Linked Service Style) */}
          
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h2 className="text-lg font-bold">Basic Information</h2>
                <p className="text-xs text-muted-foreground">General information about the service</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Service Name <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.title.length}/35</span>
                </Label>
                <Input value={detailsData.title} onChange={(e) => handleDetailsChange('title', e.target.value)} className="h-10" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Founders / Company Name</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.founder.length}/50</span>
                </Label>
                <Input value={detailsData.founder} onChange={(e) => handleDetailsChange('founder', e.target.value)} className="h-10" />
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
              <RadioGroup value={detailsData.category.toLowerCase()} onValueChange={(val) => handleDetailsChange('category', val)} className="gap-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {CATEGORIES.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800">
                      <RadioGroupItem value={cat.toLowerCase()} id={`cat-${cat.toLowerCase()}`} />
                      <Label htmlFor={`cat-${cat.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{cat}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
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
                <RadioGroup value={detailsData.price.toLowerCase()} onValueChange={(val) => handleDetailsChange('price', val)} className="gap-2">
                  {["Free", "Paid"].map((p) => (
                    <div key={p} className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white dark:hover:bg-slate-800">
                      <RadioGroupItem value={p.toLowerCase()} id={`pricing-${p.toLowerCase()}`} />
                      <Label htmlFor={`pricing-${p.toLowerCase()}`} className="font-medium text-sm cursor-pointer">{p}</Label>
                    </div>
                  ))}
                </RadioGroup>
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
              <Label className="flex justify-between font-semibold text-sm">
                <span>Key Features</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.features.length}/5</span>
              </Label>
              <div className="space-y-2">
                {detailsData.features.map((feature, i) => (
                  <div key={i} className="flex gap-2">
                    <Input value={feature} onChange={(e) => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} className="h-10" />
                    {detailsData.features.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {detailsData.features.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={addFeature} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Feature
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <Label className="flex justify-between font-semibold text-sm">
                <span>Use Cases</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.useCases.length}/5</span>
              </Label>
              <div className="space-y-3">
                {detailsData.useCases.map((useCase, i) => (
                  <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2 relative group">
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {detailsData.useCases.length > 1 && (
                         <Button type="button" variant="ghost" size="icon" onClick={() => removeUseCase(i)} className="h-6 w-6 text-muted-foreground hover:text-red-500">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <Input value={useCase.title} onChange={(e) => updateUseCase(i, 'title', e.target.value)} placeholder={`Use Case Title ${i + 1}`} className="h-10 font-medium" />
                    <Textarea value={useCase.content} onChange={(e) => updateUseCase(i, 'content', e.target.value)} placeholder="Describe this use case..." className="min-h-[60px]" />
                  </div>
                ))}
              </div>
              {detailsData.useCases.length < 5 && (
                <Button type="button" variant="outline" size="sm" onClick={addUseCase} className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" /> Add Use Case
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {isEditable && (
        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button onClick={handleUpdate} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Request
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
