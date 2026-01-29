import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ShieldCheck, Zap, Calendar, CreditCard, CheckCircle2, Info } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface ContractDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string;
  resourceType: string;
}

export function ContractDetailsDialog({
  isOpen,
  onClose,
  resourceName,
  resourceType,
}: ContractDetailsDialogProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    termsOfService: "By using this service, you agree to our terms and conditions. We reserve the right to modify these terms at any time.",
    providedServices: "Enterprise-grade data analysis, REST API access",
    servicePeriod: "Monthly subscription with automatic renewal",
    licensePricing: "Commercial License: Business use permitted. Monthly Fee: $78.00",
    refundPolicy: "Full refund within 7 days if service not accessed",
    providedServicesRaw: "Enterprise-grade data analysis\nREST API access\nReal-time monitoring\n24/7 Priority support",
    servicePeriodRaw: "Monthly subscription\nAutomatic renewal\nCancel anytime",
    licensePricingRaw: "Commercial License\nBusiness use permitted\nMonthly Fee: $78.00\nNo hidden costs",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-8 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-3xl font-bold tracking-tight text-[#1a1c2d] flex items-center gap-2">
              Manage <span className="text-[#5542f6]">{resourceName}</span>
            </DialogTitle>
            <div className="bg-[#5542f6] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" />
              Hosted Service
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-8">
          <div className="space-y-6 pb-8">
            <div className="bg-[#f0f7ff] border border-[#e1effe] rounded-xl p-4 flex items-start gap-4">
              <div className="h-5 w-5 mt-0.5 text-[#1c64f2] shrink-0">
                <Info className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#1e429f] text-[15px]">Under Review</h4>
                <p className="text-[14px] text-[#1e429f] leading-normal">
                  This request is currently being verified by our team. You cannot make changes at this time.
                </p>
              </div>
            </div>

            <div className="bg-[#f0f7ff] border border-[#e1effe] rounded-xl p-5 flex items-start gap-4">
              <div className="space-y-1">
                <h4 className="font-bold text-[#1e429f] text-[15px]">Info</h4>
                <p className="text-[14px] text-[#1e429f] leading-normal opacity-80">
                  Changes to basic information will require re-approval from the administration team.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="h-8 w-8 rounded-full bg-[#e1effe] flex items-center justify-center text-[#1c64f2] font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-bold text-xl text-[#1a1c2d]">Basic Information</h3>
                <p className="text-[14px] text-slate-500">Tell us about your AI Agent</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[15px] font-bold text-[#1a1c2d]">AI Agent Name <span className="text-red-500">*</span></Label>
                  <span className="text-[12px] text-slate-400">30/35</span>
                </div>
                <Input value={resourceName} disabled className="bg-white border-slate-200 rounded-xl h-12 text-slate-600 font-medium px-4" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[15px] font-bold text-[#1a1c2d]">Founders / Company Name</Label>
                  <span className="text-[12px] text-slate-400">0/50</span>
                </div>
                <Input placeholder="e.g. OpenAI" disabled className="bg-white border-slate-200 rounded-xl h-12 text-slate-600 font-medium px-4" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[15px] font-bold text-[#1a1c2d]">Website URL <span className="text-red-500">*</span></Label>
                  <span className="text-[12px] text-slate-400">0/100</span>
                </div>
                <Input placeholder="https://" disabled className="bg-white border-slate-200 rounded-xl h-12 text-slate-600 font-medium px-4" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[15px] font-bold text-[#1a1c2d]">Affiliate Link</Label>
                  <span className="text-[12px] text-slate-400">0/300</span>
                </div>
                <Input placeholder="https://" disabled className="bg-white border-slate-200 rounded-xl h-12 text-slate-600 font-medium px-4" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[15px] font-bold text-[#1a1c2d]">Demo URL</Label>
                  <span className="text-[12px] text-slate-400">0/200</span>
                </div>
                <Input placeholder="https://youtube.com/..." disabled className="bg-white border-slate-200 rounded-xl h-12 text-slate-600 font-medium px-4" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-[15px] font-bold text-[#1a1c2d]">Documentation URL</Label>
                  <span className="text-[12px] text-slate-400">0/200</span>
                </div>
                <Input placeholder="https://docs..." disabled className="bg-white border-slate-200 rounded-xl h-12 text-slate-600 font-medium px-4" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 border-t bg-slate-50/50">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8">
            Submit Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
