import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Loader2, ShieldCheck, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/lib/language-context";

export default function Submit() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Simulating Auth Check
  useEffect(() => {
    // In a real app, check auth token here.
    // For mockup, we assume 'Min-su' is logged in as per previous tasks.
    // Uncomment to test redirect:
    // const isLoggedIn = false;
    // if (!isLoggedIn) setLocation('/login');
  }, [setLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center">
          <Card className="w-full max-w-2xl p-8 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <ShieldCheck className="h-10 w-10" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{t("Submission Received", "제출이 완료되었습니다")}</h1>
            <p className="text-muted-foreground mb-8 text-lg">
              {t(
                "Your AI Agent has been successfully submitted and is currently under verification.", 
                "AI 에이전트가 성공적으로 제출되었으며 현재 검증이 진행 중입니다."
              )}
            </p>

            {/* Progress Steps */}
            <div className="relative flex justify-between w-full max-w-md mx-auto mb-12">
              {/* Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -z-10 -translate-y-1/2" />
              <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-green-500 -z-10 -translate-y-1/2 transition-all duration-1000" />

              {/* Step 1: Submitted */}
              <div className="flex flex-col items-center gap-2 bg-white dark:bg-slate-950 px-2">
                <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-green-600">{t("Submitted", "제출완료")}</span>
              </div>

              {/* Step 2: Verifying */}
              <div className="flex flex-col items-center gap-2 bg-white dark:bg-slate-950 px-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center animate-pulse">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
                <span className="text-sm font-bold text-blue-600">{t("Verifying", "검증중")}</span>
              </div>

              {/* Step 3: Verified */}
              <div className="flex flex-col items-center gap-2 bg-white dark:bg-slate-950 px-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-400 dark:bg-slate-800 flex items-center justify-center">
                  <Circle className="h-5 w-5" />
                </div>
                <span className="text-sm text-muted-foreground">{t("Verified", "검증완료")}</span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300 mb-8">
              <p>
                {t(
                  "Our team is reviewing your submission to ensure it meets our quality standards. You will be notified via email once the verification is complete.",
                  "저희 팀이 제출된 내용을 검토하여 품질 기준을 충족하는지 확인하고 있습니다. 검증이 완료되면 이메일로 알려드립니다."
                )}
              </p>
            </div>

            <Button onClick={() => setLocation('/my-page')} variant="outline">
              {t("Go to My Page", "마이 페이지로 이동")}
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/80 to-transparent dark:from-blue-950/20 dark:to-transparent -z-10" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-purple-100/50 dark:bg-purple-900/10 rounded-full blur-3xl -z-10" />
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10" />

      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full border border-green-200 dark:border-green-900 shadow-sm text-sm font-bold text-green-600 mb-6 animate-fade-in-up">
             <ShieldCheck className="h-4 w-4" /> 59 CERTIFIED DOMAIN RATING
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 dark:text-slate-50 tracking-tight">
            Submit Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Agent</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with global users and join thousands of innovative agentic solutions. Gain visibility, attract new users, and receive valuable feedback.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-1 shadow-lg transform hover:scale-[1.01] transition-transform duration-300">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Loader2 className="h-6 w-6 text-white animate-spin-slow" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Want to maximize your visibility?</h3>
                <p className="text-blue-100 text-sm">Get featured on our homepage and newsletter.</p>
              </div>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold border-0 shadow-lg px-6">
              View Sponsorship Options →
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          <Card className="border-0 shadow-xl ring-1 ring-slate-200 dark:ring-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-10 space-y-10">
              {/* Section Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h2 className="text-xl font-bold">Basic Information</h2>
                  <p className="text-sm text-muted-foreground">Tell us about your AI Agent</p>
                </div>
              </div>

              {/* Basic Info Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="flex justify-between font-semibold">
                    <span>AI Agent Name <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/35</span>
                  </Label>
                  <Input id="name" placeholder="e.g. AutoGPT" required maxLength={35} className="h-12 border-slate-200 focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="founder" className="flex justify-between font-semibold">
                    <span>Founders / Company Name</span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/50</span>
                  </Label>
                  <Input id="founder" placeholder="e.g. OpenAI" maxLength={50} className="h-12 border-slate-200 focus:border-blue-500 transition-colors" />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="website" className="flex justify-between font-semibold">
                    <span>Website URL <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/100</span>
                  </Label>
                  <Input id="website" placeholder="https://" required maxLength={100} className="h-12 border-slate-200 focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="affiliate" className="flex justify-between font-semibold">
                    <span>Affiliate Link</span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/300</span>
                  </Label>
                  <Input id="affiliate" placeholder="https://" maxLength={300} className="h-12 border-slate-200 focus:border-blue-500 transition-colors" />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="demo" className="flex justify-between font-semibold">
                    <span>Demo URL</span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/200</span>
                  </Label>
                  <Input id="demo" placeholder="https://youtube.com/..." maxLength={200} className="h-12 border-slate-200 focus:border-blue-500 transition-colors" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="docs" className="flex justify-between font-semibold">
                    <span>Documentation URL</span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/200</span>
                  </Label>
                  <Input id="docs" placeholder="https://docs..." maxLength={200} className="h-12 border-slate-200 focus:border-blue-500 transition-colors" />
                </div>
              </div>

              {/* Contact Email */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="space-y-3">
                  <Label htmlFor="email" className="flex justify-between items-center font-semibold">
                    <span className="flex items-center gap-2">Contact Email <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-normal">Auto-filled</span> <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground">19/50</span>
                  </Label>
                  <Input id="email" value="jh.park@illunex.com" disabled className="h-12 bg-white dark:bg-slate-900 border-slate-200 text-slate-600 font-medium" />
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" /> This email will be used for notifications and communications
                  </p>
                </div>
              </div>

              {/* Social Links Header */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h2 className="text-xl font-bold">Social Presence</h2>
                  <p className="text-sm text-muted-foreground">Where can users find you?</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="linkedin" className="font-semibold">LinkedIn URL</Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/..." maxLength={100} className="h-12" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="twitter" className="font-semibold">Twitter URL</Label>
                  <Input id="twitter" placeholder="https://twitter.com/..." maxLength={100} className="h-12" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="github" className="font-semibold">GitHub URL</Label>
                  <Input id="github" placeholder="https://github.com/..." maxLength={100} className="h-12" />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="discord" className="font-semibold">Discord URL</Label>
                  <Input id="discord" placeholder="https://discord.gg/..." maxLength={100} className="h-12" />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="telegram" className="font-semibold">Telegram URL</Label>
                  <Input id="telegram" placeholder="https://t.me/..." maxLength={100} className="h-12" />
                </div>
              </div>

              {/* Categorization Header */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h2 className="text-xl font-bold">Classification</h2>
                  <p className="text-sm text-muted-foreground">Help users find your agent</p>
                </div>
              </div>

              {/* Categorization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/30 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Label className="text-base font-bold text-slate-900 dark:text-slate-100">Access Model <span className="text-red-500">*</span></Label>
                  <RadioGroup defaultValue="open" className="gap-3">
                    <div className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                      <RadioGroupItem value="open" id="open" />
                      <Label htmlFor="open" className="cursor-pointer font-medium">Open Source</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                      <RadioGroupItem value="closed" id="closed" />
                      <Label htmlFor="closed" className="cursor-pointer font-medium">Closed Source</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                      <RadioGroupItem value="api" id="api" />
                      <Label htmlFor="api" className="cursor-pointer font-medium">API</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/30 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Label className="text-base font-bold text-slate-900 dark:text-slate-100">Pricing Model <span className="text-red-500">*</span></Label>
                  <RadioGroup defaultValue="free" className="gap-3">
                    <div className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="cursor-pointer font-medium">Free</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                      <RadioGroupItem value="freemium" id="freemium" />
                      <Label htmlFor="freemium" className="cursor-pointer font-medium">Freemium</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                      <RadioGroupItem value="paid" id="paid" />
                      <Label htmlFor="paid" className="cursor-pointer font-medium">Paid</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4 bg-slate-50 dark:bg-slate-900/30 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Label className="text-base font-bold text-slate-900 dark:text-slate-100">Industry <span className="text-red-500">*</span></Label>
                  <RadioGroup defaultValue="horizontal" className="gap-3">
                    <div className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                      <RadioGroupItem value="horizontal" id="horizontal" />
                      <Label htmlFor="horizontal" className="cursor-pointer font-medium">Horizontal</Label>
                    </div>
                    <div className="flex items-center space-x-3 p-2 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
                      <RadioGroupItem value="vertical" id="vertical" />
                      <Label htmlFor="vertical" className="cursor-pointer font-medium">Vertical</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Details Header */}
              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-lg">4</div>
                <div>
                  <h2 className="text-xl font-bold">Details & Assets</h2>
                  <p className="text-sm text-muted-foreground">Make your listing stand out</p>
                </div>
              </div>

              {/* Tagline & Description Section (Merged) */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="tagline" className="flex justify-between font-semibold">
                    <span>Tagline <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/100</span>
                  </Label>
                  <Input id="tagline" placeholder="A catchy one-liner for your AI Agent card" required maxLength={100} className="h-12 font-medium" />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="flex justify-between font-semibold">
                    <span>Description <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/750</span>
                  </Label>
                  <Textarea id="description" placeholder="Describe your AI Agent in detail. What problem does it solve? Who is it for?" required maxLength={750} className="min-h-[160px] resize-y" />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="features" className="flex justify-between font-semibold">
                    <span>Key Features</span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/600</span>
                  </Label>
                  <div className="relative">
                    <Textarea 
                      id="features" 
                      placeholder={`• AI-powered content generation
• Multi-language support
• Real-time collaboration`} 
                      maxLength={600} 
                      className="min-h-[160px] font-mono text-sm leading-relaxed pl-4" 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Enter each feature on a new line. Maximum 5 features recommended.</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="usecases" className="flex justify-between font-semibold">
                    <span>Use Cases</span>
                    <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">0/600</span>
                  </Label>
                  <Textarea 
                    id="usecases" 
                    placeholder={`• Content creation for marketing teams
• Academic research and writing
• Technical documentation`} 
                    maxLength={600} 
                    className="min-h-[160px] font-mono text-sm leading-relaxed" 
                  />
                  <p className="text-xs text-muted-foreground">Enter each use case on a new line. Maximum 5 use cases recommended.</p>
                </div>
              </div>

              {/* File Uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="group relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center space-y-4 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all cursor-pointer">
                  <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Upload className="h-8 w-8 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600">Logo Icon <span className="text-red-500">*</span></h3>
                    <p className="text-xs text-muted-foreground mb-4">Recommended: 512x512px (Square)</p>
                    <p className="text-xs text-slate-400">JPG, PNG, WEBP, SVG</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" className="mt-2 group-hover:border-blue-500 group-hover:text-blue-600">Select File</Button>
                </div>

                <div className="group relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center space-y-4 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-all cursor-pointer">
                  <div className="mx-auto h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Upload className="h-8 w-8 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600">Thumbnail Image</h3>
                    <p className="text-xs text-muted-foreground mb-4">Recommended: 1200x630px (Landscape)</p>
                    <p className="text-xs text-slate-400">JPG, PNG, WEBP, SVG</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" className="mt-2 group-hover:border-blue-500 group-hover:text-blue-600">Select File</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              size="lg" 
              className="w-full md:w-auto min-w-[200px] h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit AI Agent"
              )}
            </Button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
}
