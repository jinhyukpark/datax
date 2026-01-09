import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, ArrowRight, Loader2, Globe, CheckCircle2, Link as LinkIcon, Zap, Mail, Phone, Linkedin, Twitter, Github, MessageCircle, Send, Upload, Image } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const licenseLabels: Record<string, string> = {
    'commercial': 'Commercial',
    'open-source': 'Open Source',
    'mit': 'MIT',
    'apache-2.0': 'Apache 2.0',
    'gpl-3.0': 'GPL 3.0',
    'proprietary': 'Proprietary',
    'custom': 'Custom'
  };

  const categoryLabels: Record<string, string> = {
    'Analysis': 'Analysis',
    'Finance': 'Finance',
    'Marketing': 'Marketing',
    'Healthcare': 'Healthcare',
    'Education': 'Education',
    'Other': 'Other'
  };

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
           <div>
             <h2 className="text-lg font-bold">{t("Basic Information", "기본 정보")}</h2>
             <p className="text-xs text-muted-foreground">{t("Submitted information about your AI Agent", "AI 에이전트에 대한 제출된 정보")}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="flex justify-between font-semibold text-sm">
               <span>{t("AI Agent Name", "AI 에이전트 이름")} <span className="text-red-500">*</span></span>
            </Label>
            <Input id="name" value={title} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="founder" className="flex justify-between font-semibold text-sm">
               <span>{t("Founders / Company Name", "창립자 / 회사명")}</span>
            </Label>
            <Input id="founder" value={founder} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="website" className="flex justify-between font-semibold text-sm">
               <span>{t("Website URL", "웹사이트 URL")} <span className="text-red-500">*</span></span>
            </Label>
            <Input id="website" value={websiteUrl} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="affiliate" className="flex justify-between font-semibold text-sm">
               <span>{t("Affiliate Link", "제휴 링크")}</span>
            </Label>
            <Input id="affiliate" value={affiliateLink} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-3">
                <Label htmlFor="demo" className="flex justify-between font-semibold text-sm">
                   <span>{t("Demo URL", "데모 URL")}</span>
                </Label>
                <Input id="demo" value={demoUrl} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
             </div>
             <div className="space-y-3">
                <Label htmlFor="docs" className="flex justify-between font-semibold text-sm">
                   <span>{t("Documentation URL", "문서 URL")}</span>
                </Label>
                <Input id="docs" value={docsUrl} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
             </div>
          </div>

          {/* Contact Information */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {t("Contact Information", "연락처 정보")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground">
                  {t("Contact Email", "연락처 이메일")} <span className="text-red-500">*</span>
                </Label>
                <Input id="contact-email" value={contactEmail} readOnly disabled className="h-9 bg-white dark:bg-slate-800" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone" className="text-xs font-medium text-muted-foreground">
                  {t("Contact Phone", "연락처 전화")}
                </Label>
                <Input id="contact-phone" value={contactPhone} readOnly disabled className="h-9 bg-white dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Social Presence */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-sm">2</div>
           <div>
             <h2 className="text-lg font-bold">{t("Social Presence", "소셜 프레즌스")}</h2>
             <p className="text-xs text-muted-foreground">{t("Social media and community links", "소셜 미디어 및 커뮤니티 링크")}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn URL
            </Label>
            <Input value={linkedinUrl} readOnly disabled className="h-9 bg-slate-50 dark:bg-slate-900" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Twitter className="h-3.5 w-3.5" /> Twitter URL
            </Label>
            <Input value={twitterUrl} readOnly disabled className="h-9 bg-slate-50 dark:bg-slate-900" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Github className="h-3.5 w-3.5" /> GitHub URL
            </Label>
            <Input value={githubUrl} readOnly disabled className="h-9 bg-slate-50 dark:bg-slate-900" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <MessageCircle className="h-3.5 w-3.5" /> Discord URL
            </Label>
            <Input value={discordUrl} readOnly disabled className="h-9 bg-slate-50 dark:bg-slate-900" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Send className="h-3.5 w-3.5" /> Telegram URL
            </Label>
            <Input value={telegramUrl} readOnly disabled className="h-9 bg-slate-50 dark:bg-slate-900" />
          </div>
        </div>

        {/* Section 3: Classification */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
           <div>
             <h2 className="text-lg font-bold">{t("Classification", "분류")}</h2>
             <p className="text-xs text-muted-foreground">{t("Category, access model, and pricing", "카테고리, 접근 모델 및 가격")}</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <Label className="text-sm font-semibold">{t("Category", "카테고리")} <span className="text-red-500">*</span></Label>
             <Input value={categoryLabels[category] || category} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
           </div>

           <div className="space-y-2">
             <Label className="text-sm font-semibold">{t("Delivery Type", "제공 방식")} <span className="text-red-500">*</span></Label>
             <Input value={accessModel} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
           </div>

           <div className="space-y-2">
             <Label className="text-sm font-semibold">{t("Pricing", "가격")} <span className="text-red-500">*</span></Label>
             <Input value={price} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
           </div>

           <div className="space-y-2">
             <Label className="text-sm font-semibold">{t("License", "라이선스")}</Label>
             <Input value={licenseLabels[license] || license} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
           </div>

           <div className="space-y-2">
             <Label className="text-sm font-semibold">{t("Version", "버전")}</Label>
             <Input value={version} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
           </div>
        </div>

        {/* Section 4: Details & Assets */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-sm">4</div>
           <div>
             <h2 className="text-lg font-bold">{t("Details & Assets", "상세 정보 및 자산")}</h2>
             <p className="text-xs text-muted-foreground">{t("Tagline, description, tags, features, and use cases", "태그라인, 설명, 태그, 기능 및 사용 사례")}</p>
           </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="font-semibold text-sm">{t("Tagline", "태그라인")} <span className="text-red-500">*</span></Label>
            <Input value={tagline} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
             <Label className="font-semibold text-sm">{t("Description", "설명")} <span className="text-red-500">*</span></Label>
             <Textarea value={longDescription} readOnly disabled className="min-h-[100px] resize-y bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-sm">{t("Tags", "태그")}</Label>
            <div className="flex flex-wrap gap-2">
              {tags.length > 0 ? tags.map((tag: string, i: number) => (
                <span key={i} className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                  {tag}
                </span>
              )) : (
                <span className="text-xs text-muted-foreground">{t("No tags", "태그 없음")}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-sm">{t("Key Features", "주요 기능")}</Label>
            <div className="flex flex-wrap gap-2">
              {features.length > 0 ? features.map((feature: string, i: number) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium">
                  {feature}
                </span>
              )) : (
                <span className="text-xs text-muted-foreground">{t("No features listed", "나열된 기능 없음")}</span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-sm">{t("Use Cases", "사용 사례")}</Label>
            {useCases.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {useCases.map((useCase: any, i: number) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                    <h4 className="font-medium text-sm mb-1">{typeof useCase === 'string' ? useCase : useCase.title}</h4>
                    {typeof useCase !== 'string' && useCase.content && (
                      <p className="text-xs text-muted-foreground">{useCase.content}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-xs text-muted-foreground">{t("No use cases listed", "나열된 사용 사례 없음")}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
