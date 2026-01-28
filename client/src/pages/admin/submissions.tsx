import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Eye, CheckCircle, XCircle, Clock, FileText, AlertCircle, 
  ExternalLink, Github, Linkedin, Twitter, MessageSquare, Send, Globe, Edit 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { GeneralRequestDetails } from "@/components/general-request-details";
import { HostedRequestDetails } from "@/components/hosted-request-details";
import { ReviewsDialog } from "@/components/reviews-dialog";

// Mock Submissions with detailed data
const MOCK_SUBMISSIONS = [
  { 
    id: 101, 
    title: "Smart Factory Sensor Data Set A", 
    provider: "Tech Manufacturing", 
    submittedAt: "2025-12-15", 
    status: "Pending", 
    type: "Dataset",
    serviceType: "Hosted", // Hosted or Linked
    description: "IoT sensor data from assembly line robots including temperature, vibration, and operation cycles.",
    contactEmail: "data@techmfg.com",
    documentationUrl: "https://docs.techmfg.com/sensor-data",
    pricing: "Paid",
    tags: ["IoT", "Manufacturing", "Sensor"],
    region: "Asia-Pacific (Seoul)",
    storage: "50GB"
  },
  { 
    id: 102, 
    title: "Financial Market Sentiment Analysis API", 
    provider: "FinTech Solutions", 
    submittedAt: "2025-12-14", 
    status: "Approved", 
    type: "API",
    serviceType: "Linked",
    description: "Real-time sentiment analysis of global financial news and social media feeds.",
    contactEmail: "api@fintechsol.com",
    documentationUrl: "https://api.fintechsol.com/docs",
    pricing: "Subscription",
    tags: ["Finance", "NLP", "Sentiment"],
    endpoint: "https://api.fintechsol.com/v1/sentiment"
  },
  { 
    id: 103, 
    title: "Medical Image Diagnostic AI Agent", 
    provider: "MedAI Corp", 
    submittedAt: "2025-12-10", 
    status: "Rejected", 
    type: "AI Agent",
    serviceType: "Hosted",
    description: "AI agent specialized in early detection of anomalies in X-ray and MRI scans.",
    contactEmail: "support@medai.com",
    documentationUrl: "https://medai.com/agent-docs",
    pricing: "Per Request",
    tags: ["Medical", "Healthcare", "AI"],
    rejectionReason: "Insufficient privacy compliance documentation.",
    region: "US-East (N. Virginia)",
    storage: "2TB"
  },
  { 
    id: 104, 
    title: "Urban Traffic Flow Optimization MCP", 
    provider: "SmartCity Systems", 
    submittedAt: "2025-12-08", 
    status: "Pending", 
    type: "MCP",
    serviceType: "Linked",
    description: "Model Context Protocol server for optimizing traffic signal timings based on real-time flow.",
    contactEmail: "partners@smartcity.com",
    documentationUrl: "https://smartcity.com/mcp/traffic",
    pricing: "Free",
    tags: ["Smart City", "Traffic", "Optimization"],
    endpoint: "wss://mcp.smartcity.com/traffic"
  },
  {
    id: 105,
    title: "Legal Contract Review Assistant",
    provider: "LegalTech AI",
    submittedAt: "2025-12-18",
    status: "Pending",
    type: "AI Agent",
    serviceType: "Hosted",
    description: "AI assistant for reviewing standard business contracts and highlighting potential risks.",
    contactEmail: "legal@techai.com",
    documentationUrl: "https://legaltech.ai/docs",
    pricing: "Paid",
    tags: ["Legal", "Contract", "NLP"],
    region: "Europe (Frankfurt)",
    storage: "100GB"
  }
];

export default function SubmissionManagement() {
  const [submissions, setSubmissions] = useState<any[]>(MOCK_SUBMISSIONS);
  const [rejectDialog, setRejectDialog] = useState<{open: boolean, id: number | null}>({ open: false, id: null });
  const [rejectReason, setRejectReason] = useState("");
  const [viewDialog, setViewDialog] = useState<{open: boolean, item: typeof MOCK_SUBMISSIONS[0] | null, mode: 'all' | 'application' | 'details'}>({ open: false, item: null, mode: 'all' });
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [selectedReviewItem, setSelectedReviewItem] = useState<{title: string} | null>(null);

  // Alert Dialog State
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{title: string, description: string, action: () => void}>({
    title: "", description: "", action: () => {}
  });

  const handleApproveClick = (id: number) => {
    setAlertConfig({
      title: "Approve Submission",
      description: "Are you sure you want to approve this submission? This will make the service live.",
      action: () => handleApprove(id)
    });
    setAlertOpen(true);
  };

  const handleRejectClick = (id: number) => {
    setRejectDialog({ open: true, id });
    setRejectReason("");
  };

  const handleApprove = (id: number) => {
    setSubmissions(submissions.map(s => 
      s.id === id ? { ...s, status: "Approved" } : s
    ));
    toast.success("Submission approved successfully");
    setAlertOpen(false);
  };

  const handleReject = () => {
    if (!rejectDialog.id) return;
    setSubmissions(submissions.map(s => 
      s.id === rejectDialog.id ? { ...s, status: "Rejected", rejectionReason: rejectReason } : s
    ));
    setRejectDialog({ open: false, id: null });
    toast.error("Submission rejected");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <div className="inline-flex items-center text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-100"><CheckCircle className="w-3 h-3 mr-1.5" /> Approved</div>;
      case "Rejected":
        return <div className="inline-flex items-center text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-100"><XCircle className="w-3 h-3 mr-1.5" /> Rejected</div>;
      default:
        return <div className="inline-flex items-center text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs font-medium border border-amber-100"><Clock className="w-3 h-3 mr-1.5" /> Pending</div>;
    }
  };

  const renderDashboard = (type: "Hosted" | "Linked") => (
    <div className="rounded-md border">
      <div className="p-4">
        <h3 className="text-lg font-medium mb-4">{type} Service Requests</h3>
        <ScrollArea className="h-[600px]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="h-12 px-4 text-left font-medium text-muted-foreground w-[250px]">Title</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Provider</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Type</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-right font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.filter(s => s.serviceType === type).map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.provider}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.submittedAt}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {item.serviceType === 'Hosted' ? (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'application' })}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'details' })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'application' })}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedReviewItem({ title: item.title });
                          setReviewsOpen(true);
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      
                      {item.status !== 'Approved' && item.status !== 'Rejected' && (
                        <>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                            onClick={() => handleApproveClick(item.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            className="h-8 w-8 p-0"
                            onClick={() => handleRejectClick(item.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </tr>
              ))}
              {submissions.filter(s => s.serviceType === type).length === 0 && (
                <tr>
                  <td colSpan={6} className="h-24 text-center text-muted-foreground">
                    No submissions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </div>
  );

  return (
    <AdminLayout title="Submissions">
      <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
        <Tabs defaultValue="hosted" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="hosted">Hosted Service</TabsTrigger>
            <TabsTrigger value="linked">Linked Service</TabsTrigger>
          </TabsList>
          <TabsContent value="hosted" className="space-y-6">
            {renderDashboard("Hosted")}
          </TabsContent>
          <TabsContent value="linked" className="space-y-6">
            {renderDashboard("Linked")}
          </TabsContent>
        </Tabs>

        {/* Reviews Dialog */}
        <ReviewsDialog 
          open={reviewsOpen} 
          onOpenChange={setReviewsOpen} 
          resourceTitle={selectedReviewItem?.title || ""} 
        />

        {/* Confirmation Alert Dialog */}
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{alertConfig.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {alertConfig.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={alertConfig.action}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reject Dialog */}
        <Dialog open={rejectDialog.open} onOpenChange={(open) => !open && setRejectDialog({ open: false, id: null })}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Submission</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting this submission. This will be sent to the provider.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="reason" className="mb-2 block">Rejection Reason</Label>
              <textarea 
                id="reason"
                className="w-full min-h-[100px] p-3 border rounded-md text-sm"
                placeholder="e.g., Incomplete documentation, Security vulnerability found..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectDialog({ open: false, id: null })}>Cancel</Button>
              <Button variant="destructive" onClick={handleReject}>Reject Submission</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Details Dialog */}
        <Dialog open={viewDialog.open} onOpenChange={(open) => !open && setViewDialog({ open: false, item: null, mode: 'all' })}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
             {viewDialog.item && (
               viewDialog.item.serviceType === 'Hosted' ? (
                  <HostedRequestDetails 
                    data={viewDialog.item} 
                    mode={viewDialog.mode}
                  />
               ) : (
                  <GeneralRequestDetails data={viewDialog.item} />
               )
             )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}

function TableCell({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</td>;
}
