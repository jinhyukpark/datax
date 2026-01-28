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
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              Manage <span className="text-indigo-600">{resourceName}</span>
            </DialogTitle>
            <div className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 uppercase">
              <ShieldCheck className="h-3 w-3" />
              {resourceType} Service
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="terms" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 border-b">
            <TabsList className="bg-transparent h-auto p-0 gap-6">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent px-1 py-3 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent shadow-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="documentation" 
                className="rounded-none border-b-2 border-transparent px-1 py-3 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent shadow-none"
              >
                Documentation
              </TabsTrigger>
              <TabsTrigger 
                value="terms" 
                className="rounded-none border-b-2 border-transparent px-1 py-3 data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent shadow-none"
              >
                Terms & Policies
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <TabsContent value="terms" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Terms & Policies</h3>
                  <p className="text-xs text-slate-500">Define your service terms and refund policies for users.</p>
                </div>
              </div>

              {/* Terms of Service */}
              <div className="space-y-2">
                <Label className="text-sm font-bold flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-indigo-500" />
                  Terms of Service
                </Label>
                <p className="text-xs text-slate-500">Please describe the terms and conditions for using your service.</p>
                <Textarea 
                  value={formData.termsOfService}
                  onChange={(e) => handleChange("termsOfService", e.target.value)}
                  className="min-h-[100px] text-sm bg-slate-50/50"
                  placeholder="Enter detailed terms of service..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Provided Services */}
                <div className="space-y-2">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    Provided Services
                  </Label>
                  <Input 
                    value={formData.providedServices}
                    onChange={(e) => handleChange("providedServices", e.target.value)}
                    className="text-sm bg-slate-50/50"
                    placeholder="e.g. API access, Data analysis"
                  />
                </div>

                {/* Service Period */}
                <div className="space-y-2">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    Service Period
                  </Label>
                  <Input 
                    value={formData.servicePeriod}
                    onChange={(e) => handleChange("servicePeriod", e.target.value)}
                    className="text-sm bg-slate-50/50"
                    placeholder="e.g. Monthly, Yearly"
                  />
                </div>

                {/* License & Pricing */}
                <div className="space-y-2">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-amber-500" />
                    License & Pricing
                  </Label>
                  <Input 
                    value={formData.licensePricing}
                    onChange={(e) => handleChange("licensePricing", e.target.value)}
                    className="text-sm bg-slate-50/50"
                    placeholder="e.g. Commercial, $78.00/mo"
                  />
                </div>

                {/* Refund Policy */}
                <div className="space-y-2">
                  <Label className="text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Refund Policy
                  </Label>
                  <Input 
                    value={formData.refundPolicy}
                    onChange={(e) => handleChange("refundPolicy", e.target.value)}
                    className="text-sm bg-slate-50/50"
                    placeholder="e.g. 7-day money back guarantee"
                  />
                </div>
              </div>

              {/* Note Section */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex gap-3">
                <Info className="h-5 w-5 text-slate-400 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-700">Note</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    These terms will be displayed to users before they subscribe to your service. Ensure they comply with platform guidelines.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="overview" className="mt-0">
              <div className="p-8 text-center text-slate-400 italic">Overview editing coming soon...</div>
            </TabsContent>
            
            <TabsContent value="documentation" className="mt-0">
              <div className="p-8 text-center text-slate-400 italic">Documentation editing coming soon...</div>
            </TabsContent>
          </div>
        </Tabs>

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
