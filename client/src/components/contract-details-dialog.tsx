import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileSignature, Calendar, DollarSign, User, Building, Percent, FileText } from "lucide-react";

interface ContractDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: any;
}

export function ContractDetailsDialog({ open, onOpenChange, service }: ContractDetailsDialogProps) {
  // Mock contract data based on year
  const contracts = {
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
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <FileSignature className="h-5 w-5 text-indigo-600" />
            Contract Information
          </DialogTitle>
          <DialogDescription>
            View contract details and history for {service.title}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue="2026" className="flex-1 flex flex-col">
            <div className="px-6 pt-4">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="2026"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm"
                >
                  2026 (Current)
                </TabsTrigger>
                <TabsTrigger 
                  value="2025"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm"
                >
                  2025
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 p-6">
              {Object.entries(contracts).map(([year, contract]) => (
                <TabsContent key={year} value={year} className="mt-0 space-y-6">
                  {/* Contract Header Card */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold mb-1">{contract.title}</h2>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5" />
                          Contract Period: {contract.startDate} ~ {contract.endDate}
                        </p>
                      </div>
                      <Badge className={contract.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}>
                        {contract.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground mb-1">Total Contract Value</span>
                        <span className="text-lg font-bold flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          {contract.amount.toLocaleString()} {contract.currency}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground mb-1">Applied Discount</span>
                        <span className="text-lg font-bold flex items-center gap-1">
                          <Percent className="h-4 w-4 text-orange-600" />
                          {contract.discountRate}%
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground mb-1">Next Renewal</span>
                        <span className="text-lg font-bold flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          {contract.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contract Content */}
                  <div className="flex flex-col gap-6">
                    <div className="w-full">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Parties Involved
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex justify-between">
                                Service Provider
                                <Badge variant="secondary" className="text-[10px] h-5">Counterparty</Badge>
                              </h4>
                              <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
                                  {contract.manager.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                  <p className="font-medium text-sm truncate" title={service.owner}>{service.owner}</p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                                    <User className="h-3 w-3" />
                                    {contract.manager}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3 flex justify-between">
                                Illunex Platform
                                <Badge className="text-[10px] h-5 bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-none">Our Side</Badge>
                              </h4>
                              <div className="flex items-start gap-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
                                  {contract.illunexManager.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                  <p className="font-medium text-sm">Illunex Corp.</p>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 truncate">
                                    <User className="h-3 w-3" />
                                    {contract.illunexManager}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="w-full">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Terms & Conditions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                            {contract.content}
                          </p>
                          <div className="space-y-2 mt-6">
                            <h4 className="font-semibold text-sm flex items-center gap-2">
                              <Badge variant="outline" className="text-[10px] h-5">Special Terms</Badge>
                            </h4>
                            <div className="bg-slate-50 dark:bg-slate-900 rounded-md border p-3">
                              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                {contract.specialTerms.map((term, i) => (
                                  <li key={i}>{term}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}