import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2, Circle, Loader2, ShieldCheck, Upload, Plus, Trash2, AlertTriangle, Save, Star, MessageSquare, MessageCircle, ChevronDown, ChevronUp, X, Database, Link as LinkIcon, Server, ArrowRight, Zap, Globe, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { useLocation } from "wouter";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Resource } from "@/lib/data";

interface SubmitFormProps {
  onSuccess?: () => void;
  className?: string;
  initialData?: Resource;
  mode?: 'create' | 'edit-request' | 'edit-approved';
  defaultTab?: string;
}

export function SubmitForm({ onSuccess, className, initialData, mode = 'create', defaultTab = 'overview' }: SubmitFormProps) {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [submissionType, setSubmissionType] = useState<'hosted' | 'external' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showReapprovalWarning, setShowReapprovalWarning] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  // Form State
  const [features, setFeatures] = useState<string[]>(initialData?.features || [""]);
  const [useCases, setUseCases] = useState<{ title: string; content: string }[]>(
    initialData?.useCases?.map(u => ({ title: u, content: "" })) || [{ title: "", content: "" }]
  );
  
  // Additional Tabs State
  const [documentation, setDocumentation] = useState(initialData?.documentation || {
    title: "Quick Start",
    content: "# Install the SDK\nnpm install @em-data/sdk\n\n# Initialize client\nconst client = new EMDataClient({\n  apiKey: 'YOUR_API_KEY'\n});",
    endpoints: [
      { method: "GET", path: "/v1/resources/list", description: "Retrieve a paginated list of available resources matching the filter criteria." },
      { method: "POST", path: "/v1/agents/interact", description: "Send a prompt to the AI agent and receive a streamed response." }
    ]
  });

  const [pricingPlans, setPricingPlans] = useState(initialData?.pricingPlans || [
    { name: "Starter", price: "$29", features: ["1,000 Requests", "Standard Support", "Basic Analytics"], recommended: false },
    { name: "Pro", price: "$78", features: ["50,000 Requests", "Priority Support", "Advanced Analytics", "SLA Guarantee"], recommended: true },
    { name: "Enterprise", price: "$127", features: ["Unlimited Requests", "Priority Support", "Advanced Analytics", "SLA Guarantee", "Custom Integration"], recommended: false }
  ]);

  const [reviews, setReviews] = useState(initialData?.reviews || [
    { id: "rv1", user: "User 1", rating: 5, date: "2 days ago", comment: "This resource has significantly improved our workflow. The integration was straightforward and the documentation is excellent. Highly recommended for teams looking to scale." },
    { id: "rv2", user: "User 2", rating: 5, date: "2 days ago", comment: "Excellent data quality and reliable API. The support team is also very responsive." },
    { id: "rv3", user: "User 3", rating: 4, date: "3 days ago", comment: "Great tool, but documentation could be a bit more detailed for edge cases." }
  ]);

  const [replyText, setReplyText] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (initialData) {
      if (initialData.features) setFeatures(initialData.features);
      if (initialData.useCases) setUseCases(initialData.useCases.map(u => ({ title: u, content: "" })));
      // In a real app, we would load other data too if it existed in initialData
    }
  }, [initialData]);

  const addFeature = () => {
    if (features.length < 5) setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    if (features.length > 1) {
      setFeatures(features.filter((_, i) => i !== index));
    }
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addUseCase = () => {
    if (useCases.length < 5) setUseCases([...useCases, { title: "", content: "" }]);
  };

  const removeUseCase = (index: number) => {
    if (useCases.length > 1) {
      setUseCases(useCases.filter((_, i) => i !== index));
    }
  };

  const updateUseCase = (index: number, field: 'title' | 'content', value: string) => {
    const newUseCases = [...useCases];
    newUseCases[index] = { ...newUseCases[index], [field]: value };
    setUseCases(newUseCases);
  };

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'edit-approved') {
      setShowReapprovalWarning(true);
      return;
    }

    submitGeneralData();
  };

  const submitGeneralData = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  const handleSaveAdditional = (type: 'documentation' | 'pricing' | 'reviews') => {
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);
  };

  const handleReplyReview = (reviewId: string) => {
    const reply = replyText[reviewId];
    if (!reply) return;
    
    const newReviews = reviews.map(r => r.id === reviewId ? { ...r, reply } : r);
    setReviews(newReviews);
    setReplyText({ ...replyText, [reviewId]: '' });
    toast.success("Reply posted successfully");
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center h-full">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          <ShieldCheck className="h-10 w-10" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">
          {mode === 'edit-approved' 
            ? t("Re-approval Requested", "재승인 요청됨")
            : t("Submission Received", "제출이 완료되었습니다")}
        </h1>
        <p className="text-muted-foreground mb-8 text-base">
          {mode === 'edit-approved'
            ? t("Your changes have been submitted and moved to the Request tab for verification.", "변경 사항이 제출되었으며 검증을 위해 승인 요청 탭으로 이동되었습니다.")
            : t("Your AI Agent has been successfully submitted and is currently under verification.", "AI 에이전트가 성공적으로 제출되었으며 현재 검증이 진행 중입니다.")}
        </p>

        {/* Progress Steps (Simplified for edit mode) */}
        <div className="relative flex justify-between w-full max-w-md mx-auto mb-10 px-4">
          {/* Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-green-500 -z-10 -translate-y-1/2" />

          {/* Step 1: Submitted */}
          <div className="flex flex-col items-center gap-2 bg-white dark:bg-slate-950 px-2 z-10">
            <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-green-600">{t("Submitted", "제출완료")}</span>
          </div>

          {/* Step 2: Verifying */}
          <div className="flex flex-col items-center gap-2 bg-white dark:bg-slate-950 px-2 z-10">
            <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center animate-pulse">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
            <span className="text-xs font-bold text-blue-600">{t("Verifying", "검증중")}</span>
          </div>

          {/* Step 3: Verified */}
          <div className="flex flex-col items-center gap-2 bg-white dark:bg-slate-950 px-2 z-10">
            <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-400 dark:bg-slate-800 flex items-center justify-center">
              <Circle className="h-5 w-5" />
            </div>
            <span className="text-xs text-muted-foreground">{t("Verified", "검증완료")}</span>
          </div>
        </div>

        <Button onClick={() => {
          if (onSuccess) onSuccess();
          // Ideally close modal here
        }} variant="outline" className="w-full max-w-xs">
          {t("Close", "닫기")}
        </Button>
      </div>
    );
  }

  const ContactSupportForm = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowContactForm(false)}
            className="mr-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </Button>
          <div>
            <h2 className="text-lg font-bold">{t("Contact Support", "담당자 문의")}</h2>
            <p className="text-xs text-muted-foreground">{t("We'll get back to you shortly", "담당자가 확인 후 빠르게 연락드리겠습니다.")}</p>
          </div>
       </div>
       
       <form className="space-y-4" onSubmit={(e) => {
         e.preventDefault();
         toast.success(t("Message sent successfully", "문의가 성공적으로 발송되었습니다."));
         setShowContactForm(false);
       }}>
          <div className="space-y-2">
            <Label htmlFor="contact-name">{t("Name", "이름")}</Label>
            <Input id="contact-name" placeholder={t("Your name", "이름을 입력하세요")} required className="h-10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">{t("Email", "이메일")}</Label>
            <Input id="contact-email" type="email" placeholder={t("your@email.com", "이메일 주소를 입력하세요")} required className="h-10" />
          </div>
          <div className="space-y-2">
             <Label htmlFor="contact-message">{t("Message", "문의 내용")}</Label>
             <Textarea id="contact-message" placeholder={t("How can we help you?", "문의하실 내용을 입력하세요")} className="min-h-[120px] resize-none" required />
          </div>
          
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setShowContactForm(false)}>
              {t("Cancel", "취소")}
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              {t("Send Message", "문의 보내기")}
            </Button>
          </div>
       </form>
    </div>
  );

  const GeneralForm = () => (
    <form onSubmit={handleGeneralSubmit} className="space-y-6">
        <div className="space-y-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
            <div>
                <h2 className="text-lg font-bold">Basic Information</h2>
                <p className="text-xs text-muted-foreground">Tell us about your AI Agent</p>
            </div>
            </div>

            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 gap-6">
            <div className="space-y-3">
                <Label htmlFor="name" className="flex justify-between font-semibold text-sm">
                <span>AI Agent Name <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/35</span>
                </Label>
                <Input id="name" defaultValue={initialData?.title} placeholder="e.g. AutoGPT" required maxLength={35} className="h-10" />
            </div>
            <div className="space-y-3">
                <Label htmlFor="founder" className="flex justify-between font-semibold text-sm">
                <span>Founders / Company Name</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/50</span>
                </Label>
                <Input id="founder" defaultValue={initialData?.founder || initialData?.provider} placeholder="e.g. OpenAI" maxLength={50} className="h-10" />
            </div>

            <div className="space-y-3">
                <Label htmlFor="website" className="flex justify-between font-semibold text-sm">
                <span>Website URL <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/100</span>
                </Label>
                <Input id="website" defaultValue={initialData?.websiteUrl} placeholder="https://" required maxLength={100} className="h-10" />
            </div>
            <div className="space-y-3">
                <Label htmlFor="affiliate" className="flex justify-between font-semibold text-sm">
                <span>Affiliate Link</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/300</span>
                </Label>
                <Input id="affiliate" placeholder="https://" maxLength={300} className="h-10" />
            </div>

            <div className="space-y-3">
                <Label htmlFor="demo" className="flex justify-between font-semibold text-sm">
                <span>Demo URL</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/200</span>
                </Label>
                <Input id="demo" defaultValue={initialData?.demoUrl} placeholder="https://youtube.com/..." maxLength={200} className="h-10" />
            </div>
            <div className="space-y-3">
                <Label htmlFor="docs" className="flex justify-between font-semibold text-sm">
                <span>Documentation URL</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/200</span>
                </Label>
                <Input id="docs" defaultValue={initialData?.docsUrl} placeholder="https://docs..." maxLength={200} className="h-10" />
            </div>
            </div>

            {/* Contact Email */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
                <Label htmlFor="email" className="flex justify-between items-center font-semibold text-sm">
                <span className="flex items-center gap-2">Contact Email <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-normal">Auto-filled</span> <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground">19/50</span>
                </Label>
                <Input id="email" defaultValue={initialData?.contactEmail || "jh.park@illunex.com"} disabled className="h-10 bg-white dark:bg-slate-900 text-slate-600 font-medium" />
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Notifications sent here
                </p>
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
                <Input id="linkedin" defaultValue={initialData?.socialLinks?.linkedin} placeholder="https://linkedin.com/in/..." maxLength={100} className="h-10" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="twitter" className="font-semibold text-sm">Twitter URL</Label>
                <Input id="twitter" defaultValue={initialData?.socialLinks?.twitter} placeholder="https://twitter.com/..." maxLength={100} className="h-10" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="github" className="font-semibold text-sm">GitHub URL</Label>
                <Input id="github" defaultValue={initialData?.socialLinks?.github} placeholder="https://github.com/..." maxLength={100} className="h-10" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="discord" className="font-semibold text-sm">Discord URL</Label>
                <Input id="discord" defaultValue={initialData?.socialLinks?.discord} placeholder="https://discord.gg/..." maxLength={100} className="h-10" />
            </div>
            <div className="space-y-2 md:col-span-2">
                <Label htmlFor="telegram" className="font-semibold text-sm">Telegram URL</Label>
                <Input id="telegram" defaultValue={initialData?.socialLinks?.telegram} placeholder="https://t.me/..." maxLength={100} className="h-10" />
            </div>
            </div>

            {/* Categorization Header */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-sm">3</div>
            <div>
                <h2 className="text-lg font-bold">Classification</h2>
                <p className="text-xs text-muted-foreground">Help users find your agent</p>
            </div>
            </div>

            {/* Categorization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Access Model <span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue={initialData?.accessModel?.toLowerCase() || "open"} className="gap-2">
                <div className="flex items-center space-x-2 p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                    <RadioGroupItem value="open" id="open" />
                    <Label htmlFor="open" className="cursor-pointer font-medium text-sm">Open Source</Label>
                </div>
                <div className="flex items-center space-x-2 p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                    <RadioGroupItem value="closed" id="closed" />
                    <Label htmlFor="closed" className="cursor-pointer font-medium text-sm">Closed Source</Label>
                </div>
                <div className="flex items-center space-x-2 p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                    <RadioGroupItem value="api" id="api" />
                    <Label htmlFor="api" className="cursor-pointer font-medium text-sm">API</Label>
                </div>
                </RadioGroup>
            </div>

            <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Pricing Model <span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue={initialData?.price?.toLowerCase() || "free"} className="gap-2">
                <div className="flex items-center space-x-2 p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="cursor-pointer font-medium text-sm">Free</Label>
                </div>
                <div className="flex items-center space-x-2 p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                    <RadioGroupItem value="freemium" id="freemium" />
                    <Label htmlFor="freemium" className="cursor-pointer font-medium text-sm">Freemium</Label>
                </div>
                <div className="flex items-center space-x-2 p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                    <RadioGroupItem value="paid" id="paid" />
                    <Label htmlFor="paid" className="cursor-pointer font-medium text-sm">Paid</Label>
                </div>
                </RadioGroup>
            </div>

            <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Industry <span className="text-red-500">*</span></Label>
                <RadioGroup defaultValue={initialData?.industry?.toLowerCase() || "horizontal"} className="gap-2">
                <div className="flex items-center space-x-2 p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                    <RadioGroupItem value="horizontal" id="horizontal" />
                    <Label htmlFor="horizontal" className="cursor-pointer font-medium text-sm">Horizontal</Label>
                </div>
                <div className="flex items-center space-x-2 p-1.5 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                    <RadioGroupItem value="vertical" id="vertical" />
                    <Label htmlFor="vertical" className="cursor-pointer font-medium text-sm">Vertical</Label>
                </div>
                </RadioGroup>
            </div>
            </div>

            {/* Details Header */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-sm">4</div>
            <div>
                <h2 className="text-lg font-bold">Details & Assets</h2>
                <p className="text-xs text-muted-foreground">Make your listing stand out</p>
            </div>
            </div>

            {/* Tagline & Description Section (Merged) */}
            <div className="space-y-6">
            <div className="space-y-3">
                <Label htmlFor="tagline" className="flex justify-between font-semibold text-sm">
                <span>Tagline <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/100</span>
                </Label>
                <Input id="tagline" defaultValue={initialData?.tagline} placeholder="A catchy one-liner for your AI Agent card" required maxLength={100} className="h-10 font-medium" />
            </div>

            <div className="space-y-3">
                <Label htmlFor="description" className="flex justify-between font-semibold text-sm">
                <span>Description <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/750</span>
                </Label>
                <Textarea id="description" defaultValue={initialData?.description} placeholder="Describe your AI Agent in detail. What problem does it solve? Who is it for?" required maxLength={750} className="min-h-[120px] resize-y" />
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                <Label className="font-semibold text-sm">Key Features</Label>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{features.length}/5</span>
                </div>
                
                <div className="space-y-2">
                {features.map((feature, index) => (
                    <div key={index} className="flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex-1 relative">
                        <Input 
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        className="h-9 text-sm"
                        />
                    </div>
                    {features.length > 1 && (
                        <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFeature(index)}
                        className="text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 shrink-0 h-9 w-9"
                        >
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                    </div>
                ))}
                </div>

                {features.length < 5 && (
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addFeature}
                    className="w-full border-dashed border-2 h-9 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                    <Plus className="mr-2 h-3 w-3" /> Add Feature
                </Button>
                )}
                <p className="text-[10px] text-muted-foreground">Add up to 5 key features of your AI Agent.</p>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                <Label className="font-semibold text-sm">Use Cases</Label>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{useCases.length}/5</span>
                </div>
                
                <div className="space-y-3">
                {useCases.map((useCase, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-300 relative group">
                    <div className="space-y-2">
                        <Input 
                        value={useCase.title}
                        onChange={(e) => updateUseCase(index, 'title', e.target.value)}
                        placeholder={`Use Case Title ${index + 1}`}
                        className="h-9 font-medium text-sm"
                        />
                        <Textarea 
                        value={useCase.content}
                        onChange={(e) => updateUseCase(index, 'content', e.target.value)}
                        placeholder="Describe this use case..."
                        className="min-h-[60px] resize-y text-sm"
                        />
                    </div>
                    {useCases.length > 1 && (
                        <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeUseCase(index)}
                        className="absolute top-2 right-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 h-7 w-7"
                        >
                        <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                    </div>
                ))}
                </div>

                {features.length < 5 && (
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={addUseCase}
                    className="w-full border-dashed border-2 h-9 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                >
                    <Plus className="mr-2 h-3 w-3" /> Add Use Case
                </Button>
                )}
            </div>

            <div className="space-y-3">
                <Label className="font-semibold text-sm">Hero Image</Label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mb-2">
                    <Upload className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG (max. 800x400px)</p>
                </div>
            </div>
            </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-slate-950 p-4 border-t border-slate-100 dark:border-slate-800 -mx-6 -mb-6 mt-8 flex justify-end gap-3 z-10">
            <Button type="button" variant="outline" onClick={() => {}}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[120px] bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
                </>
            ) : (
                <>Submit Agent</>
            )}
            </Button>
        </div>

        {/* Re-approval Warning Dialog */}
        <AlertDialog open={showReapprovalWarning} onOpenChange={setShowReapprovalWarning}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-5 w-5" />
                {t("Re-approval Required", "재승인이 필요합니다")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t(
                  "Modifying basic information of an approved resource requires re-approval. The resource will be moved to the 'Request' tab until verified.", 
                  "승인된 리소스의 기본 정보를 수정하면 재승인이 필요합니다. 검증이 완료될 때까지 리소스가 '승인요청' 탭으로 이동됩니다."
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("Cancel", "취소")}</AlertDialogCancel>
              <AlertDialogAction onClick={submitGeneralData} className="bg-amber-600 hover:bg-amber-700">
                {t("Confirm & Submit", "확인 및 제출")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </form>
  );

  const DocumentationForm = () => (
    <div className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>{t("Documentation Title", "문서 제목")}</Label>
          <Input 
            value={documentation.title} 
            onChange={(e) => setDocumentation({...documentation, title: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label>{t("Content (Markdown)", "내용 (Markdown)")}</Label>
          <Textarea 
            className="min-h-[300px] font-mono text-sm" 
            value={documentation.content}
            onChange={(e) => setDocumentation({...documentation, content: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label>{t("API Endpoints", "API 엔드포인트")}</Label>
          {documentation.endpoints?.map((endpoint, idx) => (
            <Card key={idx} className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={endpoint.method}
                  onChange={(e) => {
                    const newEndpoints = [...(documentation.endpoints || [])];
                    newEndpoints[idx].method = e.target.value;
                    setDocumentation({...documentation, endpoints: newEndpoints});
                  }}
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
                <Input 
                  className="md:col-span-3"
                  value={endpoint.path} 
                  onChange={(e) => {
                    const newEndpoints = [...(documentation.endpoints || [])];
                    newEndpoints[idx].path = e.target.value;
                    setDocumentation({...documentation, endpoints: newEndpoints});
                  }}
                />
              </div>
              <Input 
                placeholder="Description"
                value={endpoint.description}
                onChange={(e) => {
                  const newEndpoints = [...(documentation.endpoints || [])];
                  newEndpoints[idx].description = e.target.value;
                  setDocumentation({...documentation, endpoints: newEndpoints});
                }}
              />
            </Card>
          ))}
          <Button variant="outline" size="sm" onClick={() => {
            setDocumentation({
              ...documentation,
              endpoints: [...(documentation.endpoints || []), { method: "GET", path: "/new/endpoint", description: "" }]
            });
          }}>
            <Plus className="h-4 w-4 mr-2" /> {t("Add Endpoint", "엔드포인트 추가")}
          </Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => handleSaveAdditional('documentation')} className="gap-2">
          <Save className="h-4 w-4" /> {t("Save Documentation", "문서 저장")}
        </Button>
      </div>
    </div>
  );

  const PricingForm = () => (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pricingPlans.map((plan, idx) => (
          <Card key={idx} className={`relative ${plan.recommended ? 'border-primary shadow-md' : ''}`}>
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-3 py-1 rounded-full font-bold">
                MOST POPULAR
              </div>
            )}
            <CardHeader>
              <Input 
                value={plan.name}
                className="font-bold text-lg mb-2"
                onChange={(e) => {
                  const newPlans = [...pricingPlans];
                  newPlans[idx].name = e.target.value;
                  setPricingPlans(newPlans);
                }}
              />
              <div className="flex items-center gap-1">
                <Input 
                  value={plan.price}
                  className="text-2xl font-bold w-24"
                  onChange={(e) => {
                    const newPlans = [...pricingPlans];
                    newPlans[idx].price = e.target.value;
                    setPricingPlans(newPlans);
                  }}
                />
                <span className="text-muted-foreground">/mo</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-1" />
                    <Input 
                      value={feature}
                      className="h-7 text-sm"
                      onChange={(e) => {
                        const newPlans = [...pricingPlans];
                        newPlans[idx].features[fIdx] = e.target.value;
                        setPricingPlans(newPlans);
                      }}
                    />
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => {
                  const newPlans = [...pricingPlans];
                  newPlans[idx].features.push("New Feature");
                  setPricingPlans(newPlans);
                }}>
                  <Plus className="h-3 w-3 mr-1" /> Add Feature
                </Button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={plan.recommended}
                  onChange={(e) => {
                    const newPlans = pricingPlans.map((p, i) => ({
                      ...p,
                      recommended: i === idx ? e.target.checked : false // Only one recommended
                    }));
                    setPricingPlans(newPlans);
                  }}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label className="text-sm">Recommended Plan</Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => handleSaveAdditional('pricing')} className="gap-2">
          <Save className="h-4 w-4" /> {t("Save Pricing", "가격 설정 저장")}
        </Button>
      </div>
    </div>
  );

  const ReviewsForm = () => {
    const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

    const toggleReply = (reviewId: string) => {
      if (expandedReviewId === reviewId) {
        setExpandedReviewId(null);
      } else {
        setExpandedReviewId(reviewId);
      }
    };

    return (
    <div className="space-y-6 py-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold">4.8</div>
          <div className="space-y-1">
            <div className="flex text-amber-500">
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current" />
              <Star className="h-5 w-5 fill-current text-slate-200 dark:text-slate-800" />
            </div>
            <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                    {review.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{review.user}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-800'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 pl-13 leading-relaxed">{review.comment}</p>
              
              <div className="pl-13">
                {review.reply ? (
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                         <MessageCircle className="h-3 w-3 text-blue-600" />
                       </div>
                       <p className="text-xs font-bold text-primary">Your Reply</p>
                    </div>
                    <p className="text-sm pl-8">{review.reply}</p>
                  </div>
                ) : (
                  <div>
                    {expandedReviewId === review.id ? (
                       <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                         <div className="relative">
                            <Input 
                              placeholder="Write a reply..." 
                              className="h-11 pr-20 text-sm bg-slate-50 dark:bg-slate-900/50"
                              value={replyText[review.id] || ''}
                              onChange={(e) => setReplyText({...replyText, [review.id]: e.target.value})}
                              autoFocus
                            />
                            <div className="absolute right-1 top-1 flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-9 w-9 p-0 rounded-full text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700"
                                  onClick={() => toggleReply(review.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                                  onClick={() => {
                                    handleReplyReview(review.id);
                                    setExpandedReviewId(null);
                                  }}
                                >
                                  Reply
                                </Button>
                            </div>
                         </div>
                       </div>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-primary gap-1.5 h-8 px-2 -ml-2"
                        onClick={() => toggleReply(review.id)}
                      >
                        <MessageCircle className="h-4 w-4" />
                        Reply
                        <ChevronDown className="h-3 w-3 opacity-50" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  };

  const HostedForm = () => {
    const [updateFreq, setUpdateFreq] = useState("daily");
    const [customFreq, setCustomFreq] = useState("");

    return (
    <form onSubmit={handleGeneralSubmit} className="space-y-6">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
           <div>
             <h2 className="text-lg font-bold">Hosted Data Service Request</h2>
             <p className="text-xs text-muted-foreground">Provide basic information about your dataset for hosting</p>
           </div>
        </div>

        {/* Basic Info Fields */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <Label htmlFor="data-name" className="flex justify-between font-semibold text-sm">
               <span>Data Name <span className="text-red-500">*</span></span>
            </Label>
            <Input id="data-name" placeholder="e.g. Global Climate Dataset 2024" required className="h-10" />
          </div>

          <div className="space-y-3">
             <Label htmlFor="data-desc" className="flex justify-between font-semibold text-sm">
               <span>Description <span className="text-red-500">*</span></span>
             </Label>
             <Textarea id="data-desc" placeholder="Briefly describe the dataset content, purpose, and origin..." required className="min-h-[100px] resize-y" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="organization" className="flex justify-between font-semibold text-sm">
               <span>Organization / Institution <span className="text-red-500">*</span></span>
            </Label>
            <Input id="organization" placeholder="e.g. Climate Research Institute" required className="h-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
                <Label htmlFor="capacity" className="flex justify-between font-semibold text-sm">
                   <span>Data Capacity (Volume)</span>
                </Label>
                <Input id="capacity" placeholder="e.g. 50GB, 1TB" className="h-10" />
            </div>
            <div className="space-y-3">
                <Label htmlFor="frequency" className="flex justify-between font-semibold text-sm">
                   <span>Update Frequency</span>
                </Label>
                <Select value={updateFreq} onValueChange={setUpdateFreq}>
                  <SelectTrigger className="h-10">
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
                {updateFreq === "other" && (
                  <Input 
                    placeholder={t("Enter custom frequency", "직접 입력")} 
                    value={customFreq}
                    onChange={(e) => setCustomFreq(e.target.value)}
                    className="h-10 mt-2 animate-in fade-in slide-in-from-top-1" 
                  />
                )}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="contact-person" className="flex justify-between font-semibold text-sm">
               <span>Contact Person <span className="text-red-500">*</span></span>
            </Label>
            <Input id="contact-person" placeholder="Name and Position" required className="h-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="contact-email" className="flex justify-between font-semibold text-sm">
                 <span>Contact Email <span className="text-red-500">*</span></span>
              </Label>
              <Input id="contact-email" type="email" placeholder="email@company.com" required className="h-10" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="contact-phone" className="flex justify-between font-semibold text-sm">
                 <span>Contact Phone</span>
              </Label>
              <Input id="contact-phone" type="tel" placeholder="+82 10-1234-5678" className="h-10" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
          {isSubmitting ? (
             <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               Submitting Request...
             </>
          ) : (
             <>
               Submit Hosting Request
               <ArrowRight className="ml-2 h-4 w-4" />
             </>
          )}
        </Button>
      </div>
    </form>
  );
  };

  return (
    <div className={className}>
      {submissionType && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => setSubmissionType(null)}
            className="absolute top-0 left-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowRight className="h-5 w-5 rotate-180" />
          </Button>
      )}

      <div className="mb-8 text-center">
        {mode === 'create' && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-green-600 mb-4">
              <ShieldCheck className="h-3 w-3" /> 59 CERTIFIED DOMAIN RATING
          </div>
        )}
        
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-slate-900 dark:text-slate-50 tracking-tight">
          {mode === 'create' ? (
            <>Submit Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Agent</span></>
          ) : (
            <>Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{initialData?.title}</span></>
          )}
        </h1>
        
        {mode === 'create' && (
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            Connect with global users and join thousands of innovative agentic solutions.
          </p>
        )}
      </div>

      {mode === 'edit-approved' ? (
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">{t("Overview", "기본 정보")}</TabsTrigger>
            <TabsTrigger value="documentation">{t("Documentation", "문서")}</TabsTrigger>
            <TabsTrigger value="pricing">{t("Pricing", "가격")}</TabsTrigger>
            <TabsTrigger value="reviews">{t("Reviews", "리뷰")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200">
              <AlertTitle>{t("Info", "안내")}</AlertTitle>
              <AlertDescription>
                {t(
                  "Changes to basic information will require re-approval from the administration team.", 
                  "기본 정보를 변경하면 관리자 팀의 재승인이 필요합니다."
                )}
              </AlertDescription>
            </Alert>
            <GeneralForm />
          </TabsContent>

          <TabsContent value="documentation">
            <DocumentationForm />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingForm />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsForm />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          {showContactForm ? (
            <ContactSupportForm />
          ) : mode === 'create' && !submissionType ? (
            <div className="py-2 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center p-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-2">
                   <Globe className="h-4 w-4 text-slate-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                  {t("How would you like to register?", "어떤 방식으로 등록하시겠습니까?")}
                </h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                  {t("Choose the option that best describes your resource.", "리소스에 가장 적합한 옵션을 선택해주세요.")}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Hosted Service Card */}
                <div 
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-blue-500/50"
                >
                  <div className="flex justify-between items-start mb-6">
                     <span className="bg-blue-600/10 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-blue-600/20">
                       Paid Service
                     </span>
                     
                     <div className="h-10 w-10 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                        <Zap className="h-5 w-5" />
                     </div>
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-1">
                    <h3 className="font-bold text-lg">{t("Hosted Service", "호스팅 서비스 구축")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("Build and host Data, MCP, and Agent services.", "데이터, MCP, 에이전트 서비스를 구축하고 호스팅합니다.")}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      t("Create MCP & Agent Services", "MCP 및 에이전트 서비스 구축 지원"),
                      t("Secure Cloud & API Generation", "보안 클라우드 및 API 자동 생성"),
                      t("Full Infrastructure Management", "인프라 완전 관리 및 운영")
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full bg-slate-50 hover:bg-blue-50 text-slate-900 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-colors"
                    onClick={() => setSubmissionType('hosted')}
                  >
                    {t("Select Hosted", "Hosted 선택")}
                  </Button>
                </div>

                {/* External Link Card */}
                <div 
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-purple-500/50"
                >
                  <div className="flex justify-between items-start mb-6">
                     <span className="bg-green-600/10 text-green-600 dark:bg-green-900/40 dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border border-green-600/20">
                       Free
                     </span>

                     <div className="h-10 w-10 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
                        <LinkIcon className="h-5 w-5" />
                     </div>
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-1">
                    <h3 className="font-bold text-lg">{t("Link External Data", "외부 데이터 연동")}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t("Register existing Data, MCP, and Agents for exposure.", "기존 데이터, MCP, 에이전트를 플랫폼에 등록하고 홍보하세요.")}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {[
                      t("Register Data, MCP & Agents", "데이터, MCP 및 에이전트 서비스 등록"),
                      t("Product Exposure & Promotion", "상품 등록 및 플랫폼 노출/소개"),
                      t("Admin Audit Required", "관리자 감사(Audit) 필수")
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                        <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className="w-full bg-slate-50 hover:bg-purple-50 text-slate-900 hover:text-purple-700 border border-slate-200 hover:border-purple-200 transition-colors"
                    onClick={() => setSubmissionType('external')}
                  >
                    {t("Select External", "External 선택")}
                  </Button>
                </div>
              </div>

              <div className="max-w-lg mx-auto mt-6 mb-2">
                <h3 className="text-sm font-semibold text-center mb-3 text-slate-900 dark:text-slate-100">{t("Frequently Asked Questions", "자주 묻는 질문")}</h3>
                <Accordion type="single" collapsible className="w-full bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 px-4">
                  <AccordionItem value="item-1" className="border-b border-slate-100 dark:border-slate-800">
                    <AccordionTrigger className="text-xs font-medium hover:no-underline py-3 text-left">{t("What is the difference between Hosted and Linked?", "Hosted와 Linked의 차이점은 무엇인가요?")}</AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground pb-3">
                      {t(
                        "Hosted Service provides secure cloud infrastructure to store and serve your data, while Linked External Data connects directly to your existing API endpoints without data migration.",
                        "Hosted 서비스는 데이터를 저장하고 제공할 안전한 클라우드 인프라를 제공하며, Linked External Data는 데이터 마이그레이션 없이 기존 API 엔드포인트에 직접 연결합니다."
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-b border-slate-100 dark:border-slate-800">
                    <AccordionTrigger className="text-xs font-medium hover:no-underline py-3 text-left">{t("Can I switch between service types later?", "나중에 서비스 유형을 변경할 수 있나요?")}</AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground pb-3">
                      {t(
                        "Yes, you can migrate from Hosted to Linked (or vice versa) by contacting our support team, though some configuration changes may be required.",
                        "네, 지원팀에 문의하여 Hosted에서 Linked로 (또는 그 반대로) 변경할 수 있습니다. 단, 일부 구성 변경이 필요할 수 있습니다."
                      )}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-b-0">
                    <AccordionTrigger className="text-xs font-medium hover:no-underline py-3 text-left">{t("Is the Hosted Service paid?", "Hosted 서비스는 유료인가요?")}</AccordionTrigger>
                    <AccordionContent className="text-xs text-muted-foreground pb-3">
                      {t(
                        "Yes, Hosted Service incurs infrastructure costs. We offer various tiers based on storage and bandwidth needs, starting with a free trial tier.",
                        "네, Hosted 서비스는 인프라 비용이 발생합니다. 무료 체험 등급부터 시작하여 저장 용량과 대역폭 요구 사항에 따른 다양한 요금제를 제공합니다."
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="text-center mt-6">
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-muted-foreground mb-2">{t("Need help choosing?", "선택에 도움이 필요하신가요?")}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 h-8 text-xs bg-white dark:bg-slate-900"
                    onClick={() => setShowContactForm(true)}
                  >
                    <Mail className="h-3.5 w-3.5" />
                    {t("Contact Support", "담당자 문의")}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {mode === 'create' && (
                <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-0.5 shadow-md animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="bg-white/10 backdrop-blur-sm rounded-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shrink-0">
                        <Loader2 className="h-5 w-5 text-white animate-spin-slow" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-sm">
                          {submissionType === 'hosted' 
                            ? t("Building on our infrastructure?", "인프라 구축을 시작하시나요?") 
                            : t("Connecting external resources?", "외부 리소스를 연결하시나요?")}
                        </h3>
                        <p className="text-blue-100 text-xs">
                          {submissionType === 'hosted'
                            ? t("Get verified faster with our hosted solutions.", "호스팅 솔루션으로 더 빠르게 검증받으세요.")
                            : t("Expand your reach by linking existing data.", "기존 데이터를 연결하여 도달 범위를 넓히세요.")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {submissionType === 'hosted' ? <HostedForm /> : <GeneralForm />}
            </>
          )}
        </>
      )}
    </div>
  );
}