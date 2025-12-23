import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/language-context";
import { ShieldCheck, ArrowRight, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface HostedRequestDetailsProps {
  data: any;
  isEditable?: boolean;
}

export function HostedRequestDetails({ data, isEditable = false }: HostedRequestDetailsProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for form fields
  const [formData, setFormData] = useState({
    title: data.title || "",
    description: data.description || "",
    organization: "Climate Research Institute",
    capacity: "50GB",
    updateFreq: "daily",
    contactPerson: "Kim Min-su",
    contactEmail: "minsu.kim@example.com",
    contactPhone: "+82 10-1234-5678",
    useAccountEmail: true
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(t("Request updated successfully", "요청이 성공적으로 수정되었습니다."));
    }, 1000);
  };

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
            <Input 
              id="data-name" 
              value={formData.title} 
              onChange={(e) => handleChange('title', e.target.value)}
              readOnly={!isEditable} 
              disabled={!isEditable} 
              className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
            />
          </div>

          <div className="space-y-3">
             <Label htmlFor="data-desc" className="flex justify-between font-semibold text-sm">
               <span>Description <span className="text-red-500">*</span></span>
             </Label>
             <Textarea 
               id="data-desc" 
               value={formData.description} 
               onChange={(e) => handleChange('description', e.target.value)}
               readOnly={!isEditable} 
               disabled={!isEditable} 
               className={`min-h-[100px] resize-y ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
             />
          </div>

          <div className="space-y-3">
            <Label htmlFor="organization" className="flex justify-between font-semibold text-sm">
               <span>Organization / Institution <span className="text-red-500">*</span></span>
            </Label>
            <Input 
              id="organization" 
              value={formData.organization} 
              onChange={(e) => handleChange('organization', e.target.value)}
              readOnly={!isEditable} 
              disabled={!isEditable} 
              className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
                <Label htmlFor="capacity" className="flex justify-between font-semibold text-sm">
                   <span>Data Capacity (Volume)</span>
                </Label>
                <Input 
                  id="capacity" 
                  value={formData.capacity} 
                  onChange={(e) => handleChange('capacity', e.target.value)}
                  readOnly={!isEditable} 
                  disabled={!isEditable} 
                  className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
                />
            </div>
            <div className="space-y-3">
                <Label htmlFor="frequency" className="flex justify-between font-semibold text-sm">
                   <span>Update Frequency</span>
                </Label>
                <Select 
                  value={formData.updateFreq} 
                  onValueChange={(val) => handleChange('updateFreq', val)}
                  disabled={!isEditable}
                >
                  <SelectTrigger className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`}>
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
            <Input 
              id="contact-person" 
              value={formData.contactPerson} 
              onChange={(e) => handleChange('contactPerson', e.target.value)}
              readOnly={!isEditable} 
              disabled={!isEditable} 
              className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="contact-email" className="flex justify-between font-semibold text-sm">
                 <span>Contact Email <span className="text-red-500">*</span></span>
              </Label>
              <div className="space-y-2">
                <Input 
                  id="contact-email" 
                  value={formData.contactEmail} 
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  readOnly={!isEditable || formData.useAccountEmail}
                  disabled={!isEditable || formData.useAccountEmail}
                  className={`h-10 ${!isEditable || formData.useAccountEmail ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
                />
                <div className={`flex items-center space-x-2 ${!isEditable ? 'opacity-50' : ''}`}>
                  <Checkbox 
                    id="use-account-email-hosted" 
                    checked={formData.useAccountEmail}
                    onCheckedChange={(checked) => handleChange('useAccountEmail', checked)}
                    disabled={!isEditable}
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
              <Input 
                id="contact-phone" 
                value={formData.contactPhone} 
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                readOnly={!isEditable} 
                disabled={!isEditable} 
                className={`h-10 ${!isEditable ? 'bg-slate-50 dark:bg-slate-900' : ''}`} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {isEditable && (
        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button onClick={handleUpdate} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update Request
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
