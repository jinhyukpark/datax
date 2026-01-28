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
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between px-2">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              Manage <span className="text-indigo-600">{resourceName}</span>
            </DialogTitle>
            <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3" />
              {resourceType} Service
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="terms" className="flex-1 flex flex-col overflow-hidden">
          <div className="px-8 border-b">
            <TabsList className="bg-transparent h-auto p-0 gap-8">
              <TabsTrigger 
                value="overview" 
                className="rounded-none border-b-2 border-transparent px-1 py-4 font-semibold text-slate-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent shadow-none transition-all"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="documentation" 
                className="rounded-none border-b-2 border-transparent px-1 py-4 font-semibold text-slate-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent shadow-none transition-all"
              >
                Documentation
              </TabsTrigger>
              <TabsTrigger 
                value="terms" 
                className="rounded-none border-b-2 border-transparent px-1 py-4 font-semibold text-slate-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent shadow-none transition-all"
              >
                Terms & Policies
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="terms" className="mt-0 p-8 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">Terms & Policies</h3>
                  <p className="text-sm text-slate-500">Define your service terms and refund policies for users.</p>
                </div>
              </div>

              {/* Terms of Service */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-indigo-500" />
                    Terms of Service
                  </Label>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Required</span>
                </div>
                <p className="text-xs text-slate-500 italic">Please describe the terms and conditions for using your service.</p>
                <Textarea 
                  value={formData.termsOfService}
                  onChange={(e) => handleChange("termsOfService", e.target.value)}
                  className="min-h-[140px] text-sm bg-white border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all"
                  placeholder="Enter detailed terms of service..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Provided Services */}
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    Provided Services
                  </Label>
                  <p className="text-[11px] text-slate-500">List core features provided (one per line for best display).</p>
                  <Textarea 
                    value={formData.providedServicesRaw}
                    onChange={(e) => handleChange("providedServicesRaw", e.target.value)}
                    className="min-h-[120px] text-sm bg-white border-slate-200 rounded-xl focus:ring-indigo-500 shadow-sm"
                    placeholder="Enter provided services..."
                  />
                </div>

                {/* Service Period */}
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-purple-500" />
                    Service Period
                  </Label>
                  <p className="text-[11px] text-slate-500">Define subscription terms and renewal cycle.</p>
                  <Textarea 
                    value={formData.servicePeriodRaw}
                    onChange={(e) => handleChange("servicePeriodRaw", e.target.value)}
                    className="min-h-[120px] text-sm bg-white border-slate-200 rounded-xl focus:ring-indigo-500 shadow-sm"
                    placeholder="Enter service period details..."
                  />
                </div>

                {/* License & Pricing */}
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-amber-500" />
                    License & Pricing
                  </Label>
                  <p className="text-[11px] text-slate-500">Specify license type and monthly fee information.</p>
                  <Textarea 
                    value={formData.licensePricingRaw}
                    onChange={(e) => handleChange("licensePricingRaw", e.target.value)}
                    className="min-h-[120px] text-sm bg-white border-slate-200 rounded-xl focus:ring-indigo-500 shadow-sm"
                    placeholder="Enter license and pricing details..."
                  />
                </div>

                {/* Refund Policy */}
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Refund Policy
                  </Label>
                  <p className="text-[11px] text-slate-500">Explain your refund conditions clearly to users.</p>
                  <Textarea 
                    value={formData.refundPolicy}
                    onChange={(e) => handleChange("refundPolicy", e.target.value)}
                    className="min-h-[120px] text-sm bg-white border-slate-200 rounded-xl focus:ring-indigo-500 shadow-sm"
                    placeholder="Enter refund policy details..."
                  />
                </div>
              </div>

              {/* Note Section */}
              <div className="p-5 rounded-2xl bg-indigo-50/30 border border-indigo-100/50 flex gap-4 transition-all hover:bg-indigo-50/50">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-50">
                  <Info className="h-5 w-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-bold text-indigo-900">Important Note</p>
                  <p className="text-xs text-indigo-700/70 leading-relaxed">
                    These terms will be displayed to users before they subscribe to your service. Ensure they comply with platform guidelines and are written clearly to avoid disputes.
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
