import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Loader2, ShieldCheck, Upload, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { useLocation } from "wouter";

interface SubmitFormProps {
  onSuccess?: () => void;
  className?: string;
}

export function SubmitForm({ onSuccess, className }: SubmitFormProps) {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [features, setFeatures] = useState<string[]>([""]);
  const [useCases, setUseCases] = useState<{ title: string; content: string }[]>([{ title: "", content: "" }]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center h-full">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          <ShieldCheck className="h-10 w-10" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">{t("Submission Received", "제출이 완료되었습니다")}</h1>
        <p className="text-muted-foreground mb-8 text-base">
          {t(
            "Your AI Agent has been successfully submitted and is currently under verification.", 
            "AI 에이전트가 성공적으로 제출되었으며 현재 검증이 진행 중입니다."
          )}
        </p>

        {/* Progress Steps */}
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

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300 mb-8 w-full max-w-lg">
          <p>
            {t(
              "Our team is reviewing your submission to ensure it meets our quality standards. You will be notified via email once the verification is complete.",
              "저희 팀이 제출된 내용을 검토하여 품질 기준을 충족하는지 확인하고 있습니다. 검증이 완료되면 이메일로 알려드립니다."
            )}
          </p>
        </div>

        <Button onClick={() => setLocation('/my-page')} variant="outline" className="w-full max-w-xs">
          {t("Go to My Page", "마이 페이지로 이동")}
        </Button>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-green-600 mb-4">
            <ShieldCheck className="h-3 w-3" /> 59 CERTIFIED DOMAIN RATING
        </div>
        
        <h1 className="text-2xl md:text-3xl font-extrabold mb-4 text-slate-900 dark:text-slate-50 tracking-tight">
          Submit Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Agent</span>
        </h1>
        
        <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
          Connect with global users and join thousands of innovative agentic solutions.
        </p>
      </div>

      <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-0.5 shadow-md">
        <div className="bg-white/10 backdrop-blur-sm rounded-[10px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shrink-0">
              <Loader2 className="h-5 w-5 text-white animate-spin-slow" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-sm">Want to maximize visibility?</h3>
              <p className="text-blue-100 text-xs">Get featured on our homepage.</p>
            </div>
          </div>
          <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50 font-bold border-0 shadow-sm w-full sm:w-auto text-xs whitespace-nowrap">
            View Sponsorships →
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                <Input id="name" placeholder="e.g. AutoGPT" required maxLength={35} className="h-10" />
            </div>
            <div className="space-y-3">
                <Label htmlFor="founder" className="flex justify-between font-semibold text-sm">
                <span>Founders / Company Name</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/50</span>
                </Label>
                <Input id="founder" placeholder="e.g. OpenAI" maxLength={50} className="h-10" />
            </div>

            <div className="space-y-3">
                <Label htmlFor="website" className="flex justify-between font-semibold text-sm">
                <span>Website URL <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/100</span>
                </Label>
                <Input id="website" placeholder="https://" required maxLength={100} className="h-10" />
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
                <Input id="demo" placeholder="https://youtube.com/..." maxLength={200} className="h-10" />
            </div>
            <div className="space-y-3">
                <Label htmlFor="docs" className="flex justify-between font-semibold text-sm">
                <span>Documentation URL</span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/200</span>
                </Label>
                <Input id="docs" placeholder="https://docs..." maxLength={200} className="h-10" />
            </div>
            </div>

            {/* Contact Email */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="space-y-2">
                <Label htmlFor="email" className="flex justify-between items-center font-semibold text-sm">
                <span className="flex items-center gap-2">Contact Email <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-normal">Auto-filled</span> <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground">19/50</span>
                </Label>
                <Input id="email" value="jh.park@illunex.com" disabled className="h-10 bg-white dark:bg-slate-900 text-slate-600 font-medium" />
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
                <Input id="linkedin" placeholder="https://linkedin.com/in/..." maxLength={100} className="h-10" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="twitter" className="font-semibold text-sm">Twitter URL</Label>
                <Input id="twitter" placeholder="https://twitter.com/..." maxLength={100} className="h-10" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="github" className="font-semibold text-sm">GitHub URL</Label>
                <Input id="github" placeholder="https://github.com/..." maxLength={100} className="h-10" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="discord" className="font-semibold text-sm">Discord URL</Label>
                <Input id="discord" placeholder="https://discord.gg/..." maxLength={100} className="h-10" />
            </div>
            <div className="space-y-2 md:col-span-2">
                <Label htmlFor="telegram" className="font-semibold text-sm">Telegram URL</Label>
                <Input id="telegram" placeholder="https://t.me/..." maxLength={100} className="h-10" />
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
                <RadioGroup defaultValue="open" className="gap-2">
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
                <RadioGroup defaultValue="free" className="gap-2">
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
                <RadioGroup defaultValue="horizontal" className="gap-2">
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
                <Input id="tagline" placeholder="A catchy one-liner for your AI Agent card" required maxLength={100} className="h-10 font-medium" />
            </div>

            <div className="space-y-3">
                <Label htmlFor="description" className="flex justify-between font-semibold text-sm">
                <span>Description <span className="text-red-500">*</span></span>
                <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/750</span>
                </Label>
                <Textarea id="description" placeholder="Describe your AI Agent in detail. What problem does it solve? Who is it for?" required maxLength={750} className="min-h-[120px] resize-y" />
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
                        <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                    )}
                    </div>
                ))}
                </div>

                {useCases.length < 5 && (
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
                <p className="text-[10px] text-muted-foreground">Add up to 5 specific use cases.</p>
            </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="group relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center space-y-2 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all cursor-pointer">
                <div className="mx-auto h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                </div>
                <div>
                <h3 className="font-bold text-sm mb-0.5 group-hover:text-blue-600">Logo Icon <span className="text-red-500">*</span></h3>
                <p className="text-[10px] text-muted-foreground">Rec: 512x512px (Square)</p>
                </div>
                <Button type="button" variant="outline" size="sm" className="h-7 text-xs mt-1 group-hover:border-blue-500 group-hover:text-blue-600">Select File</Button>
            </div>

            <div className="group relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center space-y-2 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all cursor-pointer">
                <div className="mx-auto h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                </div>
                <div>
                <h3 className="font-bold text-sm mb-0.5 group-hover:text-blue-600">Thumbnail Image</h3>
                <p className="text-[10px] text-muted-foreground">Rec: 1200x630px (Landscape)</p>
                </div>
                <Button type="button" variant="outline" size="sm" className="h-7 text-xs mt-1 group-hover:border-blue-500 group-hover:text-blue-600">Select File</Button>
            </div>
            </div>
        </div>

        <div className="flex justify-end pt-4 sticky bottom-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm p-4 -mx-4 -mb-4 border-t border-slate-100 dark:border-slate-800 z-10">
            <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg rounded-full" 
            disabled={isSubmitting}
            >
            {isSubmitting ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
                </>
            ) : (
                "Submit AI Agent"
            )}
            </Button>
        </div>
      </form>
    </div>
  );
}
