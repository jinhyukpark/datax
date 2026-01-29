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
import { FileText, ShieldCheck, Zap, Calendar, CreditCard, CheckCircle2, Info, Plus, Trash2 } from "lucide-react";
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
    termsOfService: "By using this service, you agree to our terms and conditions. We reserve the right to modify these terms at any time. This agreement outlines the terms and conditions for the provision of hosted data services on the Illunex Platform.",
    refundPolicy: "Full refund within 7 days if service not accessed. Pro-rated refund available for annual plans.",
    providedServices: [
      "Real-time sentiment analysis",
      "Customizable reporting dashboards",
      "API integration support",
      "Multi-platform data aggregation",
      "Trend forecasting algorithms"
    ],
    servicePeriod: [
      "Monthly subscription with automatic renewal",
      "Service available immediately upon payment"
    ],
    licensePricing: [
      "Commercial License: Business use permitted",
      "Monthly Fee: $78.00 (Billed monthly)"
    ],
    refundPolicyList: [
      "Full refund within 7 days if service not accessed",
      "Pro-rated refund available for annual plans"
    ]
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addItem = (field: "providedServices" | "servicePeriod" | "licensePricing" | "refundPolicyList") => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const updateItem = (field: "providedServices" | "servicePeriod" | "licensePricing" | "refundPolicyList", index: number, value: string) => {
    setFormData(prev => {
      const newList = [...prev[field]];
      newList[index] = value;
      return { ...prev, [field]: newList };
    });
  };

  const removeItem = (field: "providedServices" | "servicePeriod" | "licensePricing" | "refundPolicyList", index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col p-0 gap-0">
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
            <TabsContent value="terms" className="mt-0 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900">Terms & Policies</h3>
                  <p className="text-sm text-slate-500">Define your service terms and refund policies with bullet points for each category.</p>
                </div>
              </div>

              {/* Terms of Service */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-indigo-500" />
                    Detailed Terms of Service
                  </Label>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Required</span>
                </div>
                <p className="text-xs text-slate-500 italic">Please describe the main terms and conditions for using your service.</p>
                <Textarea 
                  value={formData.termsOfService}
                  onChange={(e) => handleChange("termsOfService", e.target.value)}
                  className="min-h-[120px] text-sm bg-white border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all"
                  placeholder="Enter main terms of service..."
                />
              </div>

              {/* Service Guidelines List Section */}
              <div className="space-y-8 pt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-100"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">Service Guidelines</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Provided Services */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        Provided Services
                      </Label>
                      <Button variant="ghost" size="sm" onClick={() => addItem("providedServices")} className="h-7 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 rounded-lg">
                        <Plus className="h-3 w-3 mr-1" /> Add Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.providedServices.map((item, index) => (
                        <div key={index} className="flex gap-2 group animate-in slide-in-from-right-2 duration-200">
                          <Input 
                            value={item}
                            onChange={(e) => updateItem("providedServices", index, e.target.value)}
                            placeholder={`Service feature #${index + 1}`}
                            className="h-9 text-sm rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem("providedServices", index)}
                            className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Service Period */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-500" />
                        Service Period
                      </Label>
                      <Button variant="ghost" size="sm" onClick={() => addItem("servicePeriod")} className="h-7 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 rounded-lg">
                        <Plus className="h-3 w-3 mr-1" /> Add Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.servicePeriod.map((item, index) => (
                        <div key={index} className="flex gap-2 group animate-in slide-in-from-right-2 duration-200">
                          <Input 
                            value={item}
                            onChange={(e) => updateItem("servicePeriod", index, e.target.value)}
                            placeholder={`Period detail #${index + 1}`}
                            className="h-9 text-sm rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem("servicePeriod", index)}
                            className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* License & Pricing */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-amber-500" />
                        License & Pricing
                      </Label>
                      <Button variant="ghost" size="sm" onClick={() => addItem("licensePricing")} className="h-7 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 rounded-lg">
                        <Plus className="h-3 w-3 mr-1" /> Add Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.licensePricing.map((item, index) => (
                        <div key={index} className="flex gap-2 group animate-in slide-in-from-right-2 duration-200">
                          <Input 
                            value={item}
                            onChange={(e) => updateItem("licensePricing", index, e.target.value)}
                            placeholder={`Pricing detail #${index + 1}`}
                            className="h-9 text-sm rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem("licensePricing", index)}
                            className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Refund Policy */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        Refund Policy
                      </Label>
                      <Button variant="ghost" size="sm" onClick={() => addItem("refundPolicyList")} className="h-7 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2 rounded-lg">
                        <Plus className="h-3 w-3 mr-1" /> Add Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.refundPolicyList.map((item, index) => (
                        <div key={index} className="flex gap-2 group animate-in slide-in-from-right-2 duration-200">
                          <Input 
                            value={item}
                            onChange={(e) => updateItem("refundPolicyList", index, e.target.value)}
                            placeholder={`Refund condition #${index + 1}`}
                            className="h-9 text-sm rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem("refundPolicyList", index)}
                            className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
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
                    These terms will be displayed to users before they subscribe to your service. Bullet points help users quickly understand your service guidelines.
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
          <Button variant="outline" onClick={onClose} className="rounded-xl font-bold">
            Cancel
          </Button>
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 font-bold">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
