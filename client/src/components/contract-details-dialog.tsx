import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Info } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { GeneralRequestDetails } from "./general-request-details";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContractDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string;
  resourceType: string;
  data?: any;
}

export function ContractDetailsDialog({
  isOpen,
  onClose,
  resourceName,
  resourceType,
  data,
}: ContractDetailsDialogProps) {
  const { t } = useLanguage();

  const content = (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="p-8 pb-4 space-y-6">
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
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

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-start gap-4">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 text-sm">Info</h4>
            <p className="text-xs text-indigo-600 leading-relaxed">
              Changes to basic information will require re-approval from the administration team.
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 px-8 pb-8">
        <GeneralRequestDetails data={data || { title: resourceName }} status="verifying" />
      </ScrollArea>
    </div>
  );

  if (!isOpen) {
    return null;
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
