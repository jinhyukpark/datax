import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, ArrowRight, Loader2, Globe, CheckCircle2, Link as LinkIcon, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface GeneralRequestDetailsProps {
  data: any;
}

export function GeneralRequestDetails({ data }: GeneralRequestDetailsProps) {
  const { t } = useLanguage();
  
  // Default values if data is missing properties
  const title = data.title || "";
  const description = data.description || "";
  
  // Mock data for display - in a real app these would come from the data object
  const founder = "OpenAI";
  const websiteUrl = "https://openai.com";
  const demoUrl = "https://chat.openai.com";
  const docsUrl = "https://platform.openai.com/docs";
  const accessModel = "api";
  const priceModel = "freemium";
  const contactEmail = "user@example.com";
  const contactPhone = "+82 10-1234-5678";
  const features = ["Natural Language Processing", "Code Generation", "Creative Writing", "Translation", "Summarization"];
  const useCases = [
    { title: "Content Creation", content: "Generate blog posts, articles, and social media content." },
    { title: "Customer Support", content: "Automate responses to common customer inquiries." }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
           <div>
             <h2 className="text-lg font-bold">Basic Information</h2>
             <p className="text-xs text-muted-foreground">Submitted information about your AI Agent</p>
           </div>
        </div>

        {/* Basic Info Fields */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="flex justify-between font-semibold text-sm">
               <span>AI Agent Name <span className="text-red-500">*</span></span>
            </Label>
            <Input id="name" value={title} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
             <Label htmlFor="description" className="flex justify-between font-semibold text-sm">
               <span>Description <span className="text-red-500">*</span></span>
             </Label>
             <Textarea id="description" value={description} readOnly disabled className="min-h-[100px] resize-y bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="founder" className="flex justify-between font-semibold text-sm">
               <span>Founders / Company Name</span>
            </Label>
            <Input id="founder" value={founder} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="website" className="flex justify-between font-semibold text-sm">
               <span>Website URL <span className="text-red-500">*</span></span>
            </Label>
            <Input id="website" value={websiteUrl} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-3">
                <Label htmlFor="demo" className="flex justify-between font-semibold text-sm">
                   <span>Demo URL</span>
                </Label>
                <Input id="demo" value={demoUrl} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
             </div>
             <div className="space-y-3">
                <Label htmlFor="docs" className="flex justify-between font-semibold text-sm">
                   <span>Documentation URL</span>
                </Label>
                <Input id="docs" value={docsUrl} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
             </div>
          </div>
        </div>

        {/* Classification Header */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center font-bold text-sm">2</div>
           <div>
             <h2 className="text-lg font-bold">Classification</h2>
             <p className="text-xs text-muted-foreground">Access and pricing models</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800 opacity-80">
                <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Access Model</Label>
                <RadioGroup value={accessModel} disabled className="gap-2">
                <div className="flex items-center space-x-2 p-1.5 rounded-lg">
                    <RadioGroupItem value="api" id="api" />
                    <Label htmlFor="api" className="font-medium text-sm">API</Label>
                </div>
                </RadioGroup>
            </div>

            <div className="space-y-2 bg-slate-50 dark:bg-slate-900/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800 opacity-80">
                <Label className="text-sm font-bold text-slate-900 dark:text-slate-100">Pricing Model</Label>
                <RadioGroup value={priceModel} disabled className="gap-2">
                <div className="flex items-center space-x-2 p-1.5 rounded-lg">
                    <RadioGroupItem value="freemium" id="freemium" />
                    <Label htmlFor="freemium" className="font-medium text-sm">Freemium</Label>
                </div>
                </RadioGroup>
            </div>
        </div>

        {/* Details Header */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center font-bold text-sm">3</div>
           <div>
             <h2 className="text-lg font-bold">Features & Use Cases</h2>
             <p className="text-xs text-muted-foreground">Key capabilities</p>
           </div>
        </div>

        <div className="space-y-4">
             <div className="space-y-2">
                <Label className="font-semibold text-sm">Key Features</Label>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
             </div>

             <div className="space-y-2">
                <Label className="font-semibold text-sm">Use Cases</Label>
                <div className="grid grid-cols-1 gap-3">
                  {useCases.map((useCase, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                       <h4 className="font-medium text-sm mb-1">{useCase.title}</h4>
                       <p className="text-xs text-muted-foreground">{useCase.content}</p>
                    </div>
                  ))}
                </div>
             </div>
        </div>

        {/* Contact Header */}
        <div className="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 flex items-center justify-center font-bold text-sm">4</div>
           <div>
             <h2 className="text-lg font-bold">Contact Information</h2>
             <p className="text-xs text-muted-foreground">Primary contact details</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="contact-email" className="flex justify-between font-semibold text-sm">
                 <span>Contact Email</span>
              </Label>
              <Input id="contact-email" value={contactEmail} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="contact-phone" className="flex justify-between font-semibold text-sm">
                 <span>Contact Phone</span>
              </Label>
              <Input id="contact-phone" value={contactPhone} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
            </div>
        </div>
      </div>
    </div>
  );
}
