import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/lib/language-context";
import { Mail, Linkedin, Twitter, Github, MessageCircle, Send, Upload, Image, Paperclip } from "lucide-react";

interface GeneralRequestDetailsProps {
  data: any;
}

export function GeneralRequestDetails({ data }: GeneralRequestDetailsProps) {
  const { t } = useLanguage();
  
  const title = data.title || "";
  const description = data.description || "";
  const longDescription = data.longDescription || description;
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
  const category = data.category || "";
  const accessModel = data.accessModel || "API";
  const price = data.price || "Free";
  const license = data.license || "";
  const version = data.version || "";
  const tags = data.tags || [];
  const features = data.features || [];
  const useCases = data.useCases || [];
  const agentLogo = data.agentLogo || "";
  const featuredImages = data.featuredImages || [];

  const licenseLabels: Record<string, string> = {
    'commercial': 'Commercial',
    'open-source': 'Open Source',
    'mit': 'MIT',
    'apache-2.0': 'Apache 2.0',
    'gpl-3.0': 'GPL 3.0',
    'proprietary': 'Proprietary',
    'custom': 'Custom'
  };

  const CATEGORIES = [
    "Analysis", "News", "Finance", "Space", "Patent",
    "Science", "Equipment", "Energy", "Waste", "Growth",
    "Startup", "Transaction", "Oil", "Consulting", "Investment",
    "Power", "Network", "Innovation", "Materials", "Enterprise",
    "Ecosystem", "E-commerce", "Robot", "M&A", "R&D"
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
           <div>
             <h2 className="text-lg font-bold">{t("Basic Information", "기본 정보")}</h2>
             <p className="text-xs text-muted-foreground">{t("Tell us about your AI Agent", "AI 에이전트에 대해 알려주세요")}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
               <span>{t("AI Agent Name", "AI 에이전트 이름")} <span className="text-red-500">*</span></span>
               <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{title.length}/35</span>
            </Label>
            <Input value={title} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
               <span>{t("Founders / Company Name", "창립자 / 회사명")}</span>
               <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{founder.length}/50</span>
            </Label>
            <Input value={founder} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
               <span>{t("Website URL", "웹사이트 URL")} <span className="text-red-500">*</span></span>
               <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{websiteUrl.length}/100</span>
            </Label>
            <Input value={websiteUrl} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
               <span>{t("Affiliate Link", "제휴 링크")}</span>
               <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{affiliateLink.length}/300</span>
            </Label>
            <Input value={affiliateLink || "https://"} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
               <span>{t("Demo URL", "데모 URL")}</span>
               <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{demoUrl.length}/200</span>
            </Label>
            <Input value={demoUrl || "https://youtube.com/..."} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
               <span>{t("Documentation URL", "문서 URL")}</span>
               <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{docsUrl.length}/200</span>
            </Label>
            <Input value={docsUrl || "https://docs..."} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          {/* Contact Information */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {t("Contact Information", "연락처 정보")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  {t("Contact Email", "연락처 이메일")} <span className="text-red-500">*</span>
                </Label>
                <Input value={contactEmail || "email@company.com"} readOnly disabled className="h-9 bg-white dark:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">
                  {t("Contact Phone", "연락처 전화")}
                </Label>
                <Input value={contactPhone || "+82 10-1234-5678"} readOnly disabled className="h-9 bg-white dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Social Presence */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
           <div>
             <h2 className="text-lg font-bold">{t("Social Presence", "소셜 프레즌스")}</h2>
             <p className="text-xs text-muted-foreground">{t("Where can users find you?", "사용자가 어디서 찾을 수 있나요?")}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Linkedin className="h-4 w-4 text-blue-600" /> LinkedIn URL
            </Label>
            <Input value={linkedinUrl || "https://linkedin.com/in/..."} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Twitter className="h-4 w-4 text-sky-500" /> Twitter URL
            </Label>
            <Input value={twitterUrl || "https://twitter.com/..."} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Github className="h-4 w-4" /> GitHub URL
            </Label>
            <Input value={githubUrl || "https://github.com/..."} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-indigo-500" /> Discord URL
            </Label>
            <Input value={discordUrl || "https://discord.gg/..."} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Send className="h-4 w-4 text-sky-400" /> Telegram URL
          </Label>
          <Input value={telegramUrl || "https://t.me/..."} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
        </div>

        {/* Section 3: Classification */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
           <div>
             <h2 className="text-lg font-bold">{t("Classification", "분류")}</h2>
             <p className="text-xs text-muted-foreground">{t("Help users find your agent", "사용자가 에이전트를 찾을 수 있도록 도와주세요")}</p>
           </div>
        </div>

        <div className="space-y-6">
          {/* Category */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">{t("Category", "카테고리")} <span className="text-red-500">*</span></Label>
            <div className="grid grid-cols-5 gap-2">
              {CATEGORIES.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <RadioGroup value={category} disabled>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={cat} id={`cat-${cat}`} checked={category === cat} disabled />
                      <Label htmlFor={`cat-${cat}`} className="text-xs font-normal cursor-pointer">{cat}</Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Delivery Type */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <Label className="text-sm font-bold">{t("Delivery Type", "제공 방식")} <span className="text-red-500">*</span></Label>
              <RadioGroup value={accessModel} disabled className="gap-2">
                {["File", "API", "MCP", "AI Agent"].map((type) => (
                  <div key={type} className="flex items-center space-x-2 p-1.5 rounded-lg">
                    <RadioGroupItem value={type} id={`type-${type}`} disabled />
                    <Label htmlFor={`type-${type}`} className="font-medium text-sm">{type}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Pricing */}
            <div className="space-y-3 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              <Label className="text-sm font-bold">{t("Pricing", "가격")} <span className="text-red-500">*</span></Label>
              <RadioGroup value={price} disabled className="gap-2">
                {["Free", "Paid"].map((p) => (
                  <div key={p} className="flex items-center space-x-2 p-1.5 rounded-lg">
                    <RadioGroupItem value={p} id={`price-${p}`} disabled />
                    <Label htmlFor={`price-${p}`} className="font-medium text-sm">{p}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t("License", "라이선스")}</Label>
              <Input value={licenseLabels[license] || license || "Commercial"} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t("Version", "버전")}</Label>
              <Input value={version || "e.g., v2.4.1"} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
            </div>
          </div>
        </div>

        {/* Section 4: Details & Assets */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-sm">4</div>
           <div>
             <h2 className="text-lg font-bold">{t("Details & Assets", "상세 정보 및 자산")}</h2>
             <p className="text-xs text-muted-foreground">{t("Make your listing stand out", "목록을 돋보이게 만드세요")}</p>
           </div>
        </div>

        <div className="space-y-6">
          {/* Agent Logo */}
          <div className="space-y-3">
            <Label className="font-semibold text-sm">{t("Agent Logo", "에이전트 로고")} <span className="text-red-500">*</span></Label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">{agentLogo || "agent-logo.png"}</p>
                  <p className="text-xs text-muted-foreground">Recommended: 512×512px (Square)</p>
                  <p className="text-xs text-muted-foreground">SVG, PNG, JPG, WEBP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
              <span>{t("Tagline", "태그라인")} <span className="text-red-500">*</span></span>
              <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{tagline.length}/100</span>
            </Label>
            <Input value={tagline || "A catchy one-liner for your AI Agent card"} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
              <span>{t("Description", "설명")} <span className="text-red-500">*</span></span>
              <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{longDescription.length}/750</span>
            </Label>
            <Textarea value={longDescription || "Describe your AI Agent in detail. What problem does it solve? Who is it for?"} readOnly disabled className="min-h-[100px] resize-y bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-sm">{t("Tags", "태그")}</Label>
            <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[44px]">
              {tags.length > 0 ? tags.map((tag: string, i: number) => (
                <span key={i} className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                  {tag}
                </span>
              )) : (
                <span className="text-xs text-muted-foreground">+ New Tag</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
              <span>{t("Key Features", "주요 기능")}</span>
              <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{features.length}/5</span>
            </Label>
            {features.length > 0 ? (
              <div className="space-y-2">
                {features.map((feature: string, i: number) => (
                  <Input key={i} value={feature} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center text-sm text-muted-foreground">
                + Add Feature
              </div>
            )}
            <p className="text-xs text-muted-foreground">{t("Add up to 5 key features of your AI Agent.", "AI 에이전트의 주요 기능을 최대 5개까지 추가하세요.")}</p>
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between font-semibold text-sm">
              <span>{t("Use Cases", "사용 사례")}</span>
              <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{useCases.length}/5</span>
            </Label>
            {useCases.length > 0 ? (
              <div className="space-y-3">
                {useCases.map((useCase: any, i: number) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800 space-y-2">
                    <Input value={typeof useCase === 'string' ? useCase : useCase.title || `Use Case Title ${i + 1}`} readOnly disabled className="h-10 bg-white dark:bg-slate-800" />
                    {typeof useCase !== 'string' && useCase.content && (
                      <Textarea value={useCase.content} readOnly disabled className="min-h-[60px] bg-white dark:bg-slate-800" placeholder="Describe this use case..." />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-3 text-center text-sm text-muted-foreground">
                + Add Use Case
              </div>
            )}
          </div>

          {/* Featured Image */}
          <div className="space-y-3">
            <Label className="font-semibold text-sm">{t("Featured Image", "대표 이미지")}</Label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 bg-slate-50 dark:bg-slate-900/50 text-center">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-medium">{t("Click to upload or drag and drop", "클릭하여 업로드하거나 드래그 앤 드롭")}</p>
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
        </div>
      </div>
    </div>
  );
}
