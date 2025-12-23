import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Eye, CheckCircle, XCircle, Clock, FileText, AlertCircle, 
  ExternalLink, Github, Linkedin, Twitter, MessageSquare, Send, Globe 
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

// Mock Submissions with detailed data
const MOCK_SUBMISSIONS = [
  { 
    id: 101, 
    title: "Smart Factory Sensor Data Set A", 
    provider: "Tech Manufacturing", 
    submittedAt: "2025-12-15", 
    status: "Reviewing", 
    type: "Dataset",
    serviceType: "Hosted",
    // Detailed fields
    description: "This dataset contains over 1TB of sensor readings from varying assembly line robots, including temperature, vibration, and power consumption metrics suitable for predictive maintenance models.",
    capacity: "1TB",
    updateFreq: "realtime",
    contactPerson: "John Tech",
    contactEmail: "contact@techmfg.example.com",
    contactPhone: "+1-555-0101",
    organization: "Tech Manufacturing Inc.",
    
    // Extra fields for compatibility if needed
    founder: "Tech Manufacturing Inc.",
    website: "https://techmfg.example.com",
  },
  { 
    id: 102, 
    title: "Logistics Optimization API", 
    provider: "LogiTech Solutions", 
    submittedAt: "2025-12-14", 
    status: "Submitted", 
    type: "API",
    serviceType: "Linked",
    description: "A powerful REST API that calculates the most efficient delivery routes considering traffic, vehicle capacity, and delivery windows.",
    founder: "LogiTech Team",
    website: "https://logitech.example.io",
    demoUrl: "",
    docUrl: "https://api.logitech.example.io",
    contactEmail: "dev@logitech.example.io",
    contactPhone: "+1-555-0102",
  },
  { 
    id: 103, 
    title: "Energy Consumption Patterns 2024", 
    provider: "Green Energy Co", 
    submittedAt: "2025-12-10", 
    status: "Approved", 
    type: "Report",
    serviceType: "Hosted",
    description: "Annual report detailing energy consumption patterns across major industrial sectors in 2024, with a focus on renewable energy adoption.",
    capacity: "500MB",
    updateFreq: "yearly",
    contactPerson: "Sarah Green",
    contactEmail: "research@greenenergy.example.org",
    contactPhone: "+1-555-0103",
    organization: "Green Energy Research",
  },
  { 
    id: 104, 
    title: "Defect Detection AI Model", 
    provider: "Vision AI Labs", 
    submittedAt: "2025-12-08", 
    status: "Rejected", 
    type: "AI Model", 
    serviceType: "Linked",
    description: "Pre-trained YOLOv8 model fine-tuned on 50,000 images of printed circuit boards to detect common manufacturing defects.",
    founder: "Vision AI Labs",
    website: "https://visionai.example.net",
    demoUrl: "https://visionai.example.net/demo",
    docUrl: "",
    contactEmail: "support@visionai.example.net",
    reason: "Insufficient documentation provided.",
  },
  {
    id: 105,
    title: "Global Weather Historical Data",
    provider: "Climate Data Org",
    submittedAt: "2025-12-16",
    status: "Reviewing",
    type: "Dataset",
    serviceType: "Hosted",
    description: "Hosting request for 50TB of historical weather data from 1950-2024.",
    capacity: "50TB",
    updateFreq: "daily",
    contactPerson: "Dr. Climate",
    contactEmail: "data@climate.example.org",
    contactPhone: "+1-555-0105",
    organization: "Climate Data Org",
  },
  {
    id: 106,
    title: "Medical Image Diagnostic Helper",
    provider: "MedAI Systems",
    submittedAt: "2025-12-10",
    status: "Submitted",
    type: "AI Agent",
    serviceType: "Linked",
    description: "AI agent that helps radiologists by pre-screening X-ray images for common abnormalities.",
    founder: "MedAI Systems",
    website: "https://medai.example.com",
    contactEmail: "contact@medai.example.com",
  }
];

export default function SubmissionManagement() {
  const [submissions, setSubmissions] = useState<any[]>(MOCK_SUBMISSIONS);
  const [rejectDialog, setRejectDialog] = useState<{open: boolean, id: number | null}>({ open: false, id: null });
  const [rejectReason, setRejectReason] = useState("");
  const [viewDialog, setViewDialog] = useState<{open: boolean, item: typeof MOCK_SUBMISSIONS[0] | null}>({ open: false, item: null });
  
  // Alert Dialog State
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{title: string, description: string, action: () => void}>({
    title: "", description: "", action: () => {}
  });

  const handleStatusChange = (id: number, status: string, reason?: string) => {
    setSubmissions(submissions.map(item => 
      item.id === id ? { ...item, status, reason } : item
    ));
    
    if (status === 'Approved') toast.success(`Submission #${id} Approved`);
    if (status === 'Rejected') toast.success(`Submission #${id} Rejected`);
    
    // Close dialog if open
    if (viewDialog.open && viewDialog.item?.id === id) {
      setViewDialog({ open: false, item: null });
    }
  };

  const handleApproveClick = (id: number) => {
    setAlertConfig({
      title: "Approve Submission",
      description: "Are you sure you want to approve this submission? This action will make the resource publicly available.",
      action: () => handleStatusChange(id, 'Approved')
    });
    setAlertOpen(true);
  };

  const confirmReject = () => {
    if (rejectDialog.id && rejectReason) {
      setAlertConfig({
        title: "Reject Submission",
        description: "Are you sure you want to reject this submission? The provider will be notified with the rejection reason.",
        action: () => {
          handleStatusChange(rejectDialog.id!, 'Rejected', rejectReason);
          setRejectDialog({ open: false, id: null });
          setRejectReason("");
        }
      });
      setAlertOpen(true);
    } else {
      toast.error("Please provide a rejection reason");
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'Rejected': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case 'Reviewing': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Reviewing</Badge>;
      default: return <Badge variant="secondary">Submitted</Badge>;
    }
  };

  const renderDashboard = (serviceType: string) => {
    const filteredSubmissions = submissions.filter(s => s.serviceType === serviceType);
    
    // Metrics
    const totalSubmissions = filteredSubmissions.length;
    const pendingReviews = filteredSubmissions.filter(s => s.status === 'Submitted' || s.status === 'Reviewing').length;
    const approved = filteredSubmissions.filter(s => s.status === 'Approved').length;
    const rejected = filteredSubmissions.filter(s => s.status === 'Rejected').length;

    return (
      <div className="space-y-6">
        {/* Metrics Section */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">For {serviceType} Service</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReviews}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approved}</div>
              <p className="text-xs text-muted-foreground">High quality assets</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejected}</div>
              <p className="text-xs text-muted-foreground">Did not meet criteria</p>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <div className="rounded-md border bg-white dark:bg-slate-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No submissions found for {serviceType} service.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubmissions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.provider}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.submittedAt}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item })}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        
                        {item.status !== 'Approved' && item.status !== 'Rejected' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                              onClick={() => handleApproveClick(item.id)}
                              title="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="h-8 w-8 p-0"
                              onClick={() => setRejectDialog({ open: true, id: item.id })}
                              title="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout title="Submission Management">
      <Tabs defaultValue="hosted" className="space-y-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="hosted">Hosted Service</TabsTrigger>
          <TabsTrigger value="linked">Link External Service</TabsTrigger>
        </TabsList>
        <TabsContent value="hosted" className="mt-6">
          {renderDashboard("Hosted")}
        </TabsContent>
        <TabsContent value="linked" className="mt-6">
          {renderDashboard("Linked")}
        </TabsContent>
      </Tabs>

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
            <AlertDialogAction onClick={() => {
              alertConfig.action();
              setAlertOpen(false);
            }}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => !open && setRejectDialog({ open: false, id: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this submission. This will be visible to the user.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="mb-2 block">Rejection Reason</Label>
            <Textarea 
              placeholder="e.g. Incomplete documentation, Data quality issues..." 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ open: false, id: null })}>Cancel</Button>
            <Button variant="destructive" onClick={confirmReject}>Reject Submission</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Detail Dialog */}
      <Dialog open={viewDialog.open} onOpenChange={(open) => !open && setViewDialog({ open: false, item: null })}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              {viewDialog.item?.title}
              {viewDialog.item && getStatusBadge(viewDialog.item.status)}
            </DialogTitle>
            <DialogDescription>
              Submitted by {viewDialog.item?.provider} on {viewDialog.item?.submittedAt}
            </DialogDescription>
          </DialogHeader>
          
          {viewDialog.item && (
            <ScrollArea className="flex-1 px-6 py-6">
              {viewDialog.item.serviceType === 'Hosted' ? (
                <HostedRequestDetails data={viewDialog.item} isEditable={false} />
              ) : (
                <GeneralRequestDetails data={viewDialog.item} />
              )}
            </ScrollArea>
          )}

          {viewDialog.item && viewDialog.item.status !== 'Approved' && viewDialog.item.status !== 'Rejected' && (
            <div className="p-4 border-t flex justify-end gap-2 bg-slate-50 dark:bg-slate-900/50">
              <Button 
                variant="outline" 
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                onClick={() => setRejectDialog({ open: true, id: viewDialog.item!.id })}
              >
                Reject
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleApproveClick(viewDialog.item!.id)}
              >
                Approve Submission
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}