import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

interface HostedRequestDetailsProps {
  data: any;
}

export function HostedRequestDetails({ data }: HostedRequestDetailsProps) {
  const { t } = useLanguage();
  
  // Default values if data is missing properties
  const title = data.title || "";
  const description = data.description || "";
  // In a real app, these would come from the data object
  const organization = "Climate Research Institute"; 
  const capacity = "50GB";
  const updateFreq = "daily";
  const contactPerson = "Kim Min-su";
  const contactEmail = "minsu.kim@example.com";
  const contactPhone = "+82 10-1234-5678";

  return (
    <div className="space-y-6">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
           <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center font-bold text-sm">1</div>
           <div>
             <h2 className="text-lg font-bold">Hosted Data Service Request</h2>
             <p className="text-xs text-muted-foreground">Submitted information about your dataset</p>
           </div>
        </div>

        {/* Basic Info Fields */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <Label htmlFor="data-name" className="flex justify-between font-semibold text-sm">
               <span>Data Name <span className="text-red-500">*</span></span>
            </Label>
            <Input id="data-name" value={title} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
             <Label htmlFor="data-desc" className="flex justify-between font-semibold text-sm">
               <span>Description <span className="text-red-500">*</span></span>
             </Label>
             <Textarea id="data-desc" value={description} readOnly disabled className="min-h-[100px] resize-y bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="space-y-3">
            <Label htmlFor="organization" className="flex justify-between font-semibold text-sm">
               <span>Organization / Institution <span className="text-red-500">*</span></span>
            </Label>
            <Input id="organization" value={organization} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
                <Label htmlFor="capacity" className="flex justify-between font-semibold text-sm">
                   <span>Data Capacity (Volume)</span>
                </Label>
                <Input id="capacity" value={capacity} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
            </div>
            <div className="space-y-3">
                <Label htmlFor="frequency" className="flex justify-between font-semibold text-sm">
                   <span>Update Frequency</span>
                </Label>
                <Select value={updateFreq} disabled>
                  <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-900">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">{t("1 Day", "1일")}</SelectItem>
                    <SelectItem value="weekly">{t("7 Days", "7일")}</SelectItem>
                    <SelectItem value="monthly">{t("1 Month", "한달")}</SelectItem>
                    <SelectItem value="6months">{t("6 Months", "6개월")}</SelectItem>
                    <SelectItem value="yearly">{t("12 Months", "12개월")}</SelectItem>
                    <SelectItem value="other">{t("Other", "기타")}</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="contact-person" className="flex justify-between font-semibold text-sm">
               <span>Contact Person <span className="text-red-500">*</span></span>
            </Label>
            <Input id="contact-person" value={contactPerson} readOnly disabled className="h-10 bg-slate-50 dark:bg-slate-900" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="contact-email" className="flex justify-between font-semibold text-sm">
                 <span>Contact Email <span className="text-red-500">*</span></span>
              </Label>
              <div className="space-y-2">
                <Input 
                  id="contact-email" 
                  value={contactEmail}
                  readOnly
                  disabled
                  className="h-10 bg-slate-50 dark:bg-slate-900" 
                />
                <div className="flex items-center space-x-2 opacity-50">
                  <Checkbox 
                    id="use-account-email-hosted" 
                    checked={true}
                    disabled
                  />
                  <label
                    htmlFor="use-account-email-hosted"
                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
                  >
                    Use account email
                  </label>
                </div>
              </div>
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
    </div>
  );
}
