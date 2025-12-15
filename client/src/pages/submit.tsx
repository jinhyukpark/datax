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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 text-slate-900 dark:text-slate-50">Submit AI Agent</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Connect with global users and join thousands of innovative agentic solutions. Gain visibility, attract new users, and receive valuable feedback.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-full border shadow-sm text-sm font-semibold text-green-600">
             <ShieldCheck className="h-4 w-4" /> 59 CERTIFIED DOMAIN RATING
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-medium text-lg">Want to maximize your visibility?</span>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            View Sponsorship Options →
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="p-8 space-y-8">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex justify-between">
                    <span>AI Agent Name <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground">0/35</span>
                  </Label>
                  <Input id="name" placeholder="Enter AI Agent name" required maxLength={35} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founder" className="flex justify-between">
                    <span>Founders / Company Name</span>
                    <span className="text-xs text-muted-foreground">0/50</span>
                  </Label>
                  <Input id="founder" placeholder="Enter creator name" maxLength={50} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="flex justify-between">
                    <span>Website URL <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground">0/100</span>
                  </Label>
                  <Input id="website" placeholder="Enter website or github url" required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affiliate" className="flex justify-between">
                    <span>Affiliate Link</span>
                    <span className="text-xs text-muted-foreground">0/300</span>
                  </Label>
                  <Input id="affiliate" placeholder="Enter affiliate link (if available)" maxLength={300} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo" className="flex justify-between">
                    <span>Demo URL</span>
                    <span className="text-xs text-muted-foreground">0/200</span>
                  </Label>
                  <Input id="demo" placeholder="Enter a YouTube or Vimeo URL" maxLength={200} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="docs" className="flex justify-between">
                    <span>Documentation URL</span>
                    <span className="text-xs text-muted-foreground">0/200</span>
                  </Label>
                  <Input id="docs" placeholder="Enter documentation URL" maxLength={200} />
                </div>
              </div>

              {/* Contact Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex justify-between items-center">
                  <span className="flex items-center gap-2">Contact Email <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Auto-filled</span> <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground">19/50</span>
                </Label>
                <Input id="email" value="jh.park@illunex.com" disabled className="bg-slate-50 text-slate-500" />
                <p className="text-xs text-muted-foreground">This email will be used for notifications and communications</p>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="flex justify-between">
                    <span>LinkedIn URL</span>
                    <span className="text-xs text-muted-foreground">0/100</span>
                  </Label>
                  <Input id="linkedin" placeholder="Enter LinkedIn profile URL" maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex justify-between">
                    <span>Twitter URL</span>
                    <span className="text-xs text-muted-foreground">0/100</span>
                  </Label>
                  <Input id="twitter" placeholder="Enter Twitter profile URL" maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github" className="flex justify-between">
                    <span>GitHub URL</span>
                    <span className="text-xs text-muted-foreground">0/100</span>
                  </Label>
                  <Input id="github" placeholder="Enter GitHub profile URL" maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discord" className="flex justify-between">
                    <span>Discord URL</span>
                    <span className="text-xs text-muted-foreground">0/100</span>
                  </Label>
                  <Input id="discord" placeholder="Enter Discord server URL" maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telegram" className="flex justify-between">
                    <span>Telegram URL</span>
                    <span className="text-xs text-muted-foreground">0/100</span>
                  </Label>
                  <Input id="telegram" placeholder="Enter Telegram URL" maxLength={100} />
                </div>
              </div>

              {/* Categorization */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t">
                <div className="space-y-4">
                  <Label className="text-base">Access Model <span className="text-red-500">*</span></Label>
                  <RadioGroup defaultValue="open">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="open" id="open" />
                      <Label htmlFor="open">Open Source</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="closed" id="closed" />
                      <Label htmlFor="closed">Closed Source</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="api" id="api" />
                      <Label htmlFor="api">API</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Pricing Model <span className="text-red-500">*</span></Label>
                  <RadioGroup defaultValue="free">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free">Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="freemium" id="freemium" />
                      <Label htmlFor="freemium">Freemium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paid" id="paid" />
                      <Label htmlFor="paid">Paid</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base">Industry <span className="text-red-500">*</span></Label>
                  <RadioGroup defaultValue="horizontal">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="horizontal" id="horizontal" />
                      <Label htmlFor="horizontal">Horizontal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vertical" id="vertical" />
                      <Label htmlFor="vertical">Vertical</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2">
                <Label htmlFor="tagline" className="flex justify-between">
                  <span>Tagline <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground">0/100</span>
                </Label>
                <Input id="tagline" placeholder="This is used on your AI Agent card." required maxLength={100} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex justify-between">
                  <span>Description <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground">0/750</span>
                </Label>
                <Textarea id="description" placeholder="Briefly describe your AI Agent, the description is used on your AI Agent page." required maxLength={750} className="min-h-[120px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features" className="flex justify-between">
                  <span>Key Features</span>
                  <span className="text-xs text-muted-foreground">0/600</span>
                </Label>
                <Textarea 
                  id="features" 
                  placeholder={`Enter one feature per line, for example:
AI-powered content generation
Multi-language support
Real-time collaboration`} 
                  maxLength={600} 
                  className="min-h-[120px] font-mono text-sm" 
                />
                <p className="text-xs text-muted-foreground">Enter each feature on a new line. Maximum 5 features recommended.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="usecases" className="flex justify-between">
                  <span>Use Cases</span>
                  <span className="text-xs text-muted-foreground">0/600</span>
                </Label>
                <Textarea 
                  id="usecases" 
                  placeholder={`Enter one use case per line, for example:
Content creation for marketing teams
Academic research and writing
Technical documentation`} 
                  maxLength={600} 
                  className="min-h-[120px] font-mono text-sm" 
                />
                <p className="text-xs text-muted-foreground">Enter each use case on a new line. Maximum 5 use cases recommended.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                  <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Logo icon<span className="text-red-500">*</span></h3>
                    <p className="text-xs text-muted-foreground">Accepted formats: jpeg, png, webp, svg+xml</p>
                  </div>
                  <Button type="button" variant="outline" size="sm">Select File</Button>
                </div>

                <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                  <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Thumbnail Image</h3>
                    <p className="text-xs text-muted-foreground">Accepted formats: jpeg, png, webp, svg+xml</p>
                  </div>
                  <Button type="button" variant="outline" size="sm">Select File</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit AI Agent"
            )}
          </Button>
        </form>
      </div>
      
      <Footer />
    </div>
  );
}
