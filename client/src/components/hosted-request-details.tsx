import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, Info, FileText, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HostedRequestDetailsProps {
  data: any;
  isEditable?: boolean;
}

export function HostedRequestDetails({ data, isEditable = false }: HostedRequestDetailsProps) {
  const { t } = useLanguage();
  
  const detailsData = {
    title: data.title || "",
    founder: data.provider || "",
    websiteUrl: "",
    affiliateLink: "",
    demoUrl: "",
    docsUrl: "",
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white dark:bg-slate-950">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center p-6 border-b border-slate-100 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-950 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-center">Manage <span className="text-indigo-600 dark:text-indigo-400">{detailsData.title}</span></h1>
          <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white border-transparent px-3 py-1 text-xs gap-1.5 shadow-sm">
            <Server className="h-3.5 w-3.5" />
            Hosted Service
          </Badge>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8">
          {/* Status Banner */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4 mb-8">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-blue-50 shrink-0">
              <Info className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-blue-900 text-sm">Under Review</h4>
              <p className="text-xs text-blue-700/70 leading-relaxed">
                This request is currently being verified by our team. You cannot make changes at this time.
              </p>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-1">Info</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Changes to basic information will require re-approval from the administration team.
            </p>
          </div>

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
                <Input value={detailsData.title} disabled className="h-10 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Founders / Company Name</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.founder.length}/50</span>
                </Label>
                <Input value={detailsData.founder} disabled className="h-10 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Website URL <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.websiteUrl.length}/100</span>
                </Label>
                <Input value={detailsData.websiteUrl} disabled className="h-10 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Affiliate Link</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.affiliateLink.length}/300</span>
                </Label>
                <Input value={detailsData.affiliateLink} disabled className="h-10 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Demo URL</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.demoUrl.length}/200</span>
                </Label>
                <Input value={detailsData.demoUrl} disabled className="h-10 bg-slate-50 border-slate-200" />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between font-semibold text-sm">
                  <span>Documentation URL</span>
                  <span className="text-[10px] text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{detailsData.docsUrl.length}/200</span>
                </Label>
                <Input value={detailsData.docsUrl} disabled className="h-10 bg-slate-50 border-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
