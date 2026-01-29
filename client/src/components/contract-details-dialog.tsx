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
import { ShieldCheck, Info } from "lucide-react";
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

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-start gap-4 mb-8">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Info</h4>
            <p className="text-xs text-indigo-600 leading-relaxed">
              Changes to basic information will require re-approval from the administration team.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
            1
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">Basic Information</h3>
            <p className="text-xs text-slate-500">Tell us about your AI Agent</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-slate-700">AI Agent Name <span className="text-red-500">*</span></Label>
              <span className="text-[10px] text-slate-400">30/35</span>
            </div>
            <Input value={resourceName} disabled className="bg-slate-50 border-slate-200 rounded-xl h-11" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-slate-700">Founders / Company Name</Label>
              <span className="text-[10px] text-slate-400">0/50</span>
            </div>
            <Input placeholder="e.g. OpenAI" disabled className="bg-slate-50 border-slate-200 rounded-xl h-11" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-slate-700">Website URL <span className="text-red-500">*</span></Label>
              <span className="text-[10px] text-slate-400">0/100</span>
            </div>
            <Input placeholder="https://" disabled className="bg-slate-50 border-slate-200 rounded-xl h-11" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-slate-700">Affiliate Link</Label>
              <span className="text-[10px] text-slate-400">0/300</span>
            </div>
            <Input placeholder="https://" disabled className="bg-slate-50 border-slate-200 rounded-xl h-11" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-slate-700">Demo URL</Label>
              <span className="text-[10px] text-slate-400">0/200</span>
            </div>
            <Input placeholder="https://youtube.com/..." disabled className="bg-slate-50 border-slate-200 rounded-xl h-11" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-bold text-slate-700">Documentation URL</Label>
              <span className="text-[10px] text-slate-400">0/200</span>
            </div>
            <Input placeholder="https://docs..." disabled className="bg-slate-50 border-slate-200 rounded-xl h-11" />
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
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
