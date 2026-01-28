import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FileSignature, Calendar, DollarSign, User, Building, Percent, FileText, Edit, Send, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface ContractDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: any;
}

export function ContractDetailsDialog({ open, onOpenChange, service }: ContractDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("2026");

  // Mock contract data based on year
  const [contracts, setContracts] = useState<any>({
    "2026": {
      title: `${service.title} - 2026 Annual Service Agreement`,
      status: "Active",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      amount: 12000,
      currency: "USD",
      discountRate: 10,
      manager: service.owner || "Provider Manager",
      illunexManager: "Kim Min-su",
      content: "This agreement outlines the terms and conditions for the provision of hosted data services on the Illunex Platform. The Service Provider agrees to maintain the dataset quality and update frequency as specified in the original submission. Illunex agrees to provide the hosting infrastructure and handle billing operations.",
      specialTerms: [
        "Includes 24/7 dedicated support channel",
        "99.99% Uptime SLA Guarantee",
        "Quarterly performance review meetings",
        "Data sovereignty compliance for EU region"
      ]
    },
    "2025": {
      title: `${service.title} - 2025 Annual Service Agreement`,
      status: "Expired",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      amount: 10000,
      currency: "USD",
      discountRate: 5,
      manager: service.owner || "Provider Manager",
      illunexManager: "Lee Ji-won",
      content: "This agreement outlines the terms and conditions for the provision of hosted data services on the Illunex Platform. Standard terms apply.",
      specialTerms: [
        "99.9% Uptime SLA Guarantee",
        "Standard business hour support"
      ]
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Contract updated successfully");
  };

  const handleSendEmail = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Preparing contract documents...',
        success: `Contract sent to ${service.ownerEmail || 'provider'} successfully`,
        error: 'Failed to send contract',
      }
    );
  };

  const currentContract = contracts[activeTab];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex justify-between items-center w-full pr-8">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <FileSignature className="h-5 w-5 text-indigo-600" />
                Contract Information
              </DialogTitle>
              <DialogDescription>
                Manage contract details and history for {service.title}
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={isEditing ? "default" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? <FileText className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                {isEditing ? "Save Contract" : "Edit Contract"}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                onClick={handleSendEmail}
              >
                <Mail className="h-4 w-4" />
                Send via Email
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="px-6 pt-4 bg-slate-50/50">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                <TabsTrigger 
                  value="2026"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm transition-all"
                >
                  2026 (Current)
                </TabsTrigger>
                <TabsTrigger 
                  value="2025"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm transition-all"
                >
                  2025
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {/* Contract Header Card */}
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                      {isEditing ? (
                        <Input 
                          value={currentContract.title} 
                          className="text-xl font-bold h-9 mb-2"
                          onChange={(e) => {
                            const newContracts = { ...contracts };
                            newContracts[activeTab].title = e.target.value;
                            setContracts(newContracts);
                          }}
                        />
                      ) : (
                        <h2 className="text-xl font-bold">{currentContract.title}</h2>
                      )}
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" />
                        Contract Period: {currentContract.startDate} ~ {currentContract.endDate}
                      </p>
                    </div>
                    <Badge className={currentContract.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-slate-100 text-slate-800 border-slate-200'}>
                      {currentContract.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground mb-1 font-medium">Total Contract Value</span>
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <Input 
                            type="number" 
                            value={currentContract.amount}
                            className="h-8 py-0"
                            onChange={(e) => {
                              const newContracts = { ...contracts };
                              newContracts[activeTab].amount = parseInt(e.target.value);
                              setContracts(newContracts);
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-lg font-bold flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          {currentContract.amount.toLocaleString()} {currentContract.currency}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground mb-1 font-medium">Applied Discount</span>
                      <span className="text-lg font-bold flex items-center gap-1">
                        <Percent className="h-4 w-4 text-orange-600" />
                        {currentContract.discountRate}%
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground mb-1 font-medium">Next Renewal</span>
                      <span className="text-lg font-bold flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        {currentContract.endDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contract Content */}
                <div className="flex flex-col gap-6">
                  <Card className="shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-bold flex items-center gap-2">
                        <Building className="h-4 w-4 text-slate-500" />
                        Parties Involved
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase text-muted-foreground flex justify-between tracking-wider">
                            Service Provider
                            <Badge variant="secondary" className="text-[10px] h-5 rounded-sm">Counterparty</Badge>
                          </h4>
                          <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0 shadow-inner">
                              {currentContract.manager.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-bold text-sm truncate" title={service.owner}>{service.owner}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                                <User className="h-3 w-3" />
                                {currentContract.manager}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase text-muted-foreground flex justify-between tracking-wider">
                            Illunex Platform
                            <Badge className="text-[10px] h-5 bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-none rounded-sm">Our Side</Badge>
                          </h4>
                          <div className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900 shadow-sm">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0 shadow-inner">
                              {currentContract.illunexManager.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                              <p className="font-bold text-sm">Illunex Corp.</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                                <User className="h-3 w-3" />
                                {currentContract.illunexManager}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-bold flex items-center gap-2">
                        <FileText className="h-4 w-4 text-slate-500" />
                        Terms & Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {isEditing ? (
                        <Textarea 
                          value={currentContract.content}
                          className="min-h-[150px] text-sm leading-relaxed"
                          onChange={(e) => {
                            const newContracts = { ...contracts };
                            newContracts[activeTab].content = e.target.value;
                            setContracts(newContracts);
                          }}
                        />
                      ) : (
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                          {currentContract.content}
                        </p>
                      )}
                      
                      <div className="space-y-3 mt-6">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] h-5 font-bold uppercase tracking-tighter">Special Terms</Badge>
                        </h4>
                        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 p-4 shadow-inner">
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                            {currentContract.specialTerms.map((term: string, i: number) => (
                              <li key={i} className="pl-1">{term}</li>
                            ))}
                          </ul>
                          {isEditing && (
                            <Button variant="ghost" size="sm" className="mt-4 text-xs h-7 gap-1 text-indigo-600">
                              <Edit className="h-3 w-3" />
                              Add special term
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </ScrollArea>
          </Tabs>
        </div>
        
        {isEditing && (
          <DialogFooter className="px-6 py-4 border-t bg-slate-50/80">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel Changes</Button>
            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">Save & Apply Contract</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}