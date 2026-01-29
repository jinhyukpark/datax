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
import { Input } from "@/components/ui/input";
import { ShieldCheck, Info, Zap, Calendar, CreditCard, CheckCircle2 } from "lucide-react";
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

  const content = (
    <div className="flex-1 overflow-y-auto">
      <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
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

        {/* Terms of Service Section (Linked Service Request Style) */}
        <div className="space-y-6">
          <div className="p-8 rounded-[24px] bg-slate-50/80 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-slate-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg">Detailed Terms of Service</h4>
                <p className="text-xs text-slate-500 font-medium">Last updated: June 2025</p>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-inner">
              <p className="text-sm text-slate-600 leading-relaxed italic text-center px-4">
                "By using this service, you agree to our terms and conditions. We reserve the right to modify these terms at any time. This agreement outlines the terms and conditions for the provision of hosted data services on the Illunex Platform."
              </p>
            </div>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100"></span>
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 bg-white px-4 mx-auto w-fit">
              Service Guidelines
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Provided Services */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4 transition-all hover:border-indigo-100">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div className="space-y-3 flex-1">
                <h5 className="font-bold text-slate-900 text-sm">Provided Services</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    Enterprise-grade data analysis
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    REST API access
                  </div>
                </div>
              </div>
            </div>

            {/* Service Period */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4 transition-all hover:border-indigo-100">
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="space-y-3 flex-1">
                <h5 className="font-bold text-slate-900 text-sm">Service Period</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    Monthly subscription with automatic renewal
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    Service available immediately upon payment
                  </div>
                </div>
              </div>
            </div>

            {/* License & Pricing */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4 transition-all hover:border-indigo-100">
              <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                <CreditCard className="h-5 w-5" />
              </div>
              <div className="space-y-3 flex-1">
                <h5 className="font-bold text-slate-900 text-sm">License & Pricing</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    Commercial License: Business use permitted
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    Monthly Fee: $78.00 <span className="text-[10px] text-slate-400 font-normal ml-1">(Billed monthly)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Refund Policy */}
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-start gap-4 transition-all hover:border-indigo-100">
              <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-3 flex-1">
                <h5 className="font-bold text-slate-900 text-sm">Refund Policy</h5>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    Full refund within 7 days if service not accessed
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="h-1 w-1 rounded-full bg-indigo-500" />
                    Pro-rated refund available for annual plans
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="flex flex-col h-full">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between px-2">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              Manage <span className="text-indigo-600">{resourceName}</span>
            </DialogTitle>
            <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3" />
              Hosted Service
            </div>
          </div>
        </DialogHeader>
        {content}
        <DialogFooter className="p-6 border-t bg-slate-50/50 mt-auto">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8">
            Submit Agent
          </Button>
        </DialogFooter>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 my-8">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between px-2">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              Manage <span className="text-indigo-600">{resourceName}</span>
            </DialogTitle>
            <div className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3" />
              Hosted Service
            </div>
          </div>
        </DialogHeader>

        {content}

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
