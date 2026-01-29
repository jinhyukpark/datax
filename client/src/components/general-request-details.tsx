import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, Upload, Paperclip, Save, Link2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface GeneralRequestDetailsProps {
  data: any;
  status?: string;
  serviceType?: 'hosted' | 'linked';
}

export function GeneralRequestDetails({ data, status, serviceType }: GeneralRequestDetailsProps) {
  const { t } = useLanguage();
  const isEditable = status === "submitted";
  
  const title = data.title || "";
  const founder = data.founder || data.provider || "";
  const websiteUrl = data.websiteUrl || "";
  const affiliateLink = data.affiliateLink || "";
  const demoUrl = data.demoUrl || "";
  const docsUrl = data.docsUrl || "";
  const tagline = data.tagline || "";
  const contactEmail = data.contactEmail || "";
  const contactPhone = data.contactPhone || "";
  const linkedinUrl = data.linkedinUrl || "";
  const twitterUrl = data.twitterUrl || "";
  const githubUrl = data.githubUrl || "";
  const discordUrl = data.discordUrl || "";
  const telegramUrl = data.telegramUrl || "";
  const category = data.category || "Analysis";
  const accessModel = data.accessModel || "API";
  const price = data.price || "Free";
  const license = data.license || "commercial";
  const version = data.version || "";
  const tags = data.tags || [];
  const features = data.features || [];
  const useCases = data.useCases || [];
  const longDescription = data.longDescription || data.description || "";
  const featuredImages = data.featuredImages || [];

  const CATEGORIES = [
    "Analysis", "News", "Finance", "Space", "Patent",
    "Science", "Equipment", "Energy", "Waste", "Growth",
    "Startup", "Transaction", "Oil", "Consulting", "Investment",
    "Power", "Network", "Innovation", "Materials", "Enterprise",
    "Ecosystem", "E-commerce", "Robot", "M&A", "R&D"
  ];

  return (
    <div className="space-y-8">
      {/* Service Type Header */}
      {serviceType && (
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold">
            {t("Request Details", "신청 상세")}
          </h2>
          <div className={`text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-wider ${
            serviceType === 'hosted' ? 'bg-indigo-600' : 'bg-emerald-600'
          }`}>
            {serviceType === 'hosted' ? (
              <>
                <ShieldCheck className="h-3 w-3" />
                {t("Hosted Service", "호스티드 서비스")}
              </>
            ) : (
              <>
                <Link2 className="h-3 w-3" />
                {t("Linked Service", "연동 서비스")}
              </>
            )}
          </div>
        </div>
      )}

      {/* Section 1: Basic Information */}
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
            <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{title.length}/35</span>
          </Label>
          <Input value={title} readOnly className="h-10" />
        </div>

        <div className="space-y-3">
          <Label className="flex justify-between font-semibold text-sm">
            <span>Founders / Company Name</span>
            <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{founder.length}/50</span>
          </Label>
          <Input value={founder} readOnly className="h-10" />
        </div>

        <div className="space-y-3">
          <Label className="flex justify-between font-semibold text-sm">
            <span>Website URL <span className="text-red-500">*</span></span>
            <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{websiteUrl.length}/100</span>
          </Label>
          <Input value={websiteUrl || "https://"} readOnly className="h-10" />
        </div>

        <div className="space-y-3">
          <Label className="flex justify-between font-semibold text-sm">
            <span>Affiliate Link</span>
            <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{affiliateLink.length}/300</span>
          </Label>
          <Input value={affiliateLink || "https://"} readOnly className="h-10" />
        </div>

        <div className="space-y-3">
          <Label className="flex justify-between font-semibold text-sm">
            <span>Demo URL</span>
            <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{demoUrl.length}/200</span>
          </Label>
          <Input value={demoUrl || "https://youtube.com/..."} readOnly className="h-10" />
        </div>

        <div className="space-y-3">
          <Label className="flex justify-between font-semibold text-sm">
            <span>Documentation URL</span>
            <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{docsUrl.length}/200</span>
          </Label>
          <Input value={docsUrl || "https://docs..."} readOnly className="h-10" />
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="space-y-4">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            Contact Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-semibold text-sm">
                Contact Email <span className="text-red-500">*</span>
              </Label>
              <Input value={contactEmail || "email@company.com"} readOnly className="h-10 bg-white dark:bg-slate-900" />
            </div>
            
            <div className="space-y-2">
              <Label className="font-semibold text-sm">
                Contact Phone
              </Label>
              <Input value={contactPhone || "+82 10-1234-5678"} readOnly className="h-10 bg-white dark:bg-slate-900" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Social Presence */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
        <div>
          <h2 className="text-lg font-bold">Social Presence</h2>
          <p className="text-xs text-muted-foreground">Where can users find you?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-semibold text-sm">LinkedIn URL</Label>
          <Input value={linkedinUrl || "https://linkedin.com/in/..."} readOnly className="h-10" />
        </div>
        <div className="space-y-2">
          <Label className="font-semibold text-sm">Twitter URL</Label>
          <Input value={twitterUrl || "https://twitter.com/..."} readOnly className="h-10" />
        </div>
        <div className="space-y-2">
          <Label className="font-semibold text-sm">GitHub URL</Label>
          <Input value={githubUrl || "https://github.com/..."} readOnly className="h-10" />
        </div>
        <div className="space-y-2">
          <Label className="font-semibold text-sm">Discord URL</Label>
          <Input value={discordUrl || "https://discord.gg/..."} readOnly className="h-10" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label className="font-semibold text-sm">Telegram URL</Label>
          <Input value={telegramUrl || "https://t.me/..."} readOnly className="h-10" />
        </div>
      </div>

      {/* Section 3: Classification */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
        <div>
          <h2 className="text-lg font-bold">Classification</h2>
          <p className="text-xs text-muted-foreground">Help users find your agent</p>
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Category <span className="text-red-500">*</span></Label>
        <RadioGroup value={category.toLowerCase()} className="gap-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center space-x-2 p-1.5 rounded-lg">
                <RadioGroupItem value={cat.toLowerCase()} id={`view-cat-${cat.toLowerCase()}`} disabled />
                <Label htmlFor={`view-cat-${cat.toLowerCase()}`} className="font-medium text-sm">{cat}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Delivery Type & Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Delivery Type <span className="text-red-500">*</span></Label>
          <RadioGroup value={accessModel.toLowerCase().replace(' ', '-')} className="gap-2">
            {["File", "API", "MCP", "AI Agent"].map((type) => (
              <div key={type} className="flex items-center space-x-2 p-1.5 rounded-lg">
                <RadioGroupItem value={type.toLowerCase().replace(' ', '-')} id={`view-delivery-${type.toLowerCase()}`} disabled />
                <Label htmlFor={`view-delivery-${type.toLowerCase()}`} className="font-medium text-sm">{type}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
          <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Pricing <span className="text-red-500">*</span></Label>
          <RadioGroup value={price.toLowerCase()} className="gap-2">
            {["Free", "Paid"].map((p) => (
              <div key={p} className="flex items-center space-x-2 p-1.5 rounded-lg">
                <RadioGroupItem value={p.toLowerCase()} id={`view-pricing-${p.toLowerCase()}`} disabled />
                <Label htmlFor={`view-pricing-${p.toLowerCase()}`} className="font-medium text-sm">{p}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* License & Version */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="font-semibold text-sm">License</Label>
          <Select value={license} disabled>
            <SelectTrigger className="h-10">
              <SelectValue />
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
          <Input value={version || "e.g., v2.4.1"} readOnly className="h-10" />
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
        <Label className="font-semibold text-sm">Agent Logo <span className="text-red-500">*</span></Label>
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-900/50">
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
          <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{tagline.length}/100</span>
        </Label>
        <Input value={tagline || "A catchy one-liner for your AI Agent card"} readOnly className="h-10" />
      </div>

      <div className="space-y-3">
        <Label className="flex justify-between font-semibold text-sm">
          <span>Description <span className="text-red-500">*</span></span>
          <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{longDescription.length}/750</span>
        </Label>
        <Textarea value={longDescription || "Describe your AI Agent in detail. What problem does it solve? Who is it for?"} readOnly className="min-h-[100px] resize-y" />
      </div>

      {/* Tags */}
      <div className="space-y-3">
        <Label className="font-semibold text-sm">Tags</Label>
        <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[44px]">
          {tags.length > 0 ? tags.map((tag: string, i: number) => (
            <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
              {tag}
            </span>
          )) : (
            <span className="text-sm text-indigo-500 font-medium">+ New Tag</span>
          )}
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-3">
        <Label className="flex justify-between font-semibold text-sm">
          <span>Key Features</span>
          <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{features.length}/5</span>
        </Label>
        {features.length > 0 ? (
          <div className="space-y-2">
            {features.map((feature: string, i: number) => (
              <Input key={i} value={feature} readOnly className="h-10" />
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center">
            <span className="text-sm text-muted-foreground">+ Add Feature</span>
          </div>
        )}
        <p className="text-[10px] text-muted-foreground">Add up to 5 key features of your AI Agent.</p>
      </div>

      {/* Use Cases */}
      <div className="space-y-3">
        <Label className="flex justify-between font-semibold text-sm">
          <span>Use Cases</span>
          <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{useCases.length}/5</span>
        </Label>
        {useCases.length > 0 ? (
          <div className="space-y-3">
            {useCases.map((useCase: any, i: number) => (
              <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                <Input value={typeof useCase === 'string' ? useCase : useCase.title || `Use Case Title ${i + 1}`} readOnly className="h-10" />
                <Textarea value={typeof useCase === 'string' ? '' : useCase.content || ''} readOnly placeholder="Describe this use case..." className="min-h-[60px]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center">
            <span className="text-sm text-muted-foreground">+ Add Use Case</span>
          </div>
        )}
      </div>

      {/* Featured Image */}
      <div className="space-y-3">
        <Label className="font-semibold text-sm">Featured Image</Label>
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground">SVG, PNG, JPG (max. 800×400px)</p>
        </div>
        {featuredImages.length > 0 && (
          <div className="space-y-2">
            {featuredImages.map((img: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Paperclip className="h-4 w-4 text-red-500" />
                <span className="text-red-500 font-medium">{img}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Request Button - only shown when status is submitted */}
      {isEditable && (
        <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-700">
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4" />
            {t("Update Request", "요청 수정")}
          </Button>
        </div>
      )}
    </div>
  );
}
