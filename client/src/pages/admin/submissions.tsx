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
    founder: "Tech Manufacturing Inc.",
    website: "https://techmfg.example.com",
    affiliate: "",
    demoUrl: "https://demo.techmfg.example.com",
    docUrl: "https://docs.techmfg.example.com",
    email: "contact@techmfg.example.com",
    social: { linkedin: "techmfg", twitter: "techmfg_io", github: "", discord: "" },
    classification: { access: "API", pricing: "Paid", industry: "Vertical" },
    tagline: "High-frequency sensor data from modern assembly lines",
    description: "This dataset contains over 1TB of sensor readings from varying assembly line robots, including temperature, vibration, and power consumption metrics suitable for predictive maintenance models.",
    features: ["Real-time streaming", "Historical archive (5 years)", "Anomaly labels included", "Standardized JSON format"],
    useCases: [
      { title: "Predictive Maintenance", content: "Train AI models to predict equipment failure before it happens." },
      { title: "Efficiency Analysis", content: "Optimize energy consumption based on production cycles." }
    ]
  },
  { 
    id: 102, 
    title: "Logistics Optimization API", 
    provider: "LogiTech Solutions", 
    submittedAt: "2025-12-14", 
    status: "Submitted", 
    type: "API",
    serviceType: "Linked",
    founder: "LogiTech Team",
    website: "https://logitech.example.io",
    affiliate: "https://logitech.example.io/ref/data-x",
    demoUrl: "",
    docUrl: "https://api.logitech.example.io",
    email: "dev@logitech.example.io",
    social: { linkedin: "logitech-sol", twitter: "", github: "logitech-oss", discord: "https://discord.gg/logitech" },
    classification: { access: "API", pricing: "Freemium", industry: "Horizontal" },
    tagline: "Route optimization for last-mile delivery fleets",
    description: "A powerful REST API that calculates the most efficient delivery routes considering traffic, vehicle capacity, and delivery windows.",
    features: ["Multi-stop routing", "Real-time traffic adjustment", "Vehicle capacity constraints", "Driver mobile app SDK"],
    useCases: [
      { title: "Delivery Fleet Management", content: "Reduce fuel costs by 15% with optimized routing." }
    ]
  },
  { 
    id: 103, 
    title: "Energy Consumption Patterns 2024", 
    provider: "Green Energy Co", 
    submittedAt: "2025-12-10", 
    status: "Approved", 
    type: "Report",
    serviceType: "Hosted",
    founder: "Green Energy Research",
    website: "https://greenenergy.example.org",
    affiliate: "",
    demoUrl: "",
    docUrl: "",
    email: "research@greenenergy.example.org",
    social: { linkedin: "green-energy-co", twitter: "GreenEnergy", github: "", discord: "" },
    classification: { access: "Open Source", pricing: "Free", industry: "Vertical" },
    tagline: "Comprehensive analysis of industrial energy usage trends",
    description: "Annual report detailing energy consumption patterns across major industrial sectors in 2024, with a focus on renewable energy adoption.",
    features: ["Sector-by-sector breakdown", "Renewable adoption rates", "Cost analysis", "Future projections"],
    useCases: [
      { title: "Policy Making", content: "Inform government regulations on industrial energy standards." },
      { title: "Investment Strategy", content: "Identify growth areas in green technology." }
    ]
  },
  { 
    id: 104, 
    title: "Defect Detection AI Model", 
    provider: "Vision AI Labs", 
    submittedAt: "2025-12-08", 
    status: "Rejected", 
    type: "AI Model", 
    serviceType: "Linked",
    reason: "Insufficient documentation provided.",
    founder: "Vision AI Labs",
    website: "https://visionai.example.net",
    affiliate: "",
    demoUrl: "https://visionai.example.net/demo",
    docUrl: "",
    email: "support@visionai.example.net",
    social: { linkedin: "", twitter: "", github: "vision-ai-labs", discord: "" },
    classification: { access: "Closed Source", pricing: "Paid", industry: "Vertical" },
    tagline: "Computer vision model for PCB defect detection",
    description: "Pre-trained YOLOv8 model fine-tuned on 50,000 images of printed circuit boards to detect common manufacturing defects.",
    features: ["99.5% accuracy", "Real-time inference", "Edge device support", "Custom training available"],
    useCases: [
      { title: "Quality Assurance", content: "Automate visual inspection on electronics assembly lines." }
    ]
  },
  {
    id: 105,
    title: "Global Weather Historical Data",
    provider: "Climate Data Org",
    submittedAt: "2025-12-16",
    status: "Reviewing",
    type: "Dataset",
    serviceType: "Hosted",
    founder: "Climate Data Org",
    website: "https://climate.example.org",
    affiliate: "",
    demoUrl: "",
    docUrl: "",
    email: "data@climate.example.org",
    social: { linkedin: "", twitter: "", github: "", discord: "" },
    classification: { access: "API", pricing: "Paid", industry: "Environmental" },
    tagline: "50TB of historical weather data",
    description: "Hosting request for 50TB of historical weather data from 1950-2024.",
    features: ["Global coverage", "Hourly resolution", "Multiple variables", "Quality controlled"],
    useCases: [
      { title: "Climate Modeling", content: "Research long-term climate trends." }
    ]
  },
  {
    id: 106,
    title: "Medical Image Diagnostic Helper",
    provider: "MedAI Systems",
    submittedAt: "2025-12-10",
    status: "Submitted",
    type: "AI Agent",
    serviceType: "Linked",
    founder: "MedAI Systems",
    website: "https://medai.example.com",
    affiliate: "",
    demoUrl: "",
    docUrl: "",
    email: "contact@medai.example.com",
    social: { linkedin: "", twitter: "", github: "", discord: "" },
    classification: { access: "API", pricing: "Paid", industry: "Healthcare" },
    tagline: "Assistant AI for preliminary analysis of X-ray images",
    description: "AI agent that helps radiologists by pre-screening X-ray images for common abnormalities.",
    features: ["High accuracy", "DICOM support", "HIPAA compliant", "Fast processing"],
    useCases: [
      { title: "Triage", content: "Prioritize urgent cases for radiologist review." }
    ]
  }
];

export default function SubmissionManagement() {
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
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
            <ScrollArea className="flex-1 px-6">
              <Tabs defaultValue="basic" className="w-full py-4">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="classification">Classification</TabsTrigger>
                  <TabsTrigger value="details">Details & Assets</TabsTrigger>
                </TabsList>

                {/* Basic Info Tab */}
                <TabsContent value="basic" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">AI Agent Name</Label>
                      <div className="font-medium p-2 bg-slate-50 dark:bg-slate-900 rounded border">{viewDialog.item.title}</div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Founders / Company</Label>
                      <div className="font-medium p-2 bg-slate-50 dark:bg-slate-900 rounded border">{viewDialog.item.founder}</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Website URL</Label>
                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <a href={viewDialog.item.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm truncate">{viewDialog.item.website}</a>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Demo URL</Label>
                      <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border">
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                        <span className="text-sm truncate">{viewDialog.item.demoUrl || "N/A"}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Documentation URL</Label>
                      <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <span className="text-sm truncate">{viewDialog.item.docUrl || "N/A"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Contact Email</Label>
                    <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border">
                      <Send className="h-4 w-4 text-slate-500" />
                      <span className="text-sm">{viewDialog.item.email}</span>
                    </div>
                  </div>
                </TabsContent>

                {/* Social Tab */}
                <TabsContent value="social" className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">LinkedIn</Label>
                      <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        <span className="text-sm">{viewDialog.item.social.linkedin || "N/A"}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Twitter</Label>
                      <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border">
                        <Twitter className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">{viewDialog.item.social.twitter || "N/A"}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">GitHub</Label>
                      <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border">
                        <Github className="h-4 w-4" />
                        <span className="text-sm">{viewDialog.item.social.github || "N/A"}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Discord</Label>
                      <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded border">
                        <MessageSquare className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm truncate">{viewDialog.item.social.discord || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Classification Tab */}
                <TabsContent value="classification" className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border text-center">
                      <Label className="text-xs text-muted-foreground block mb-2">Access Model</Label>
                      <Badge variant="outline" className="text-base px-4 py-1">{viewDialog.item.classification.access}</Badge>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border text-center">
                      <Label className="text-xs text-muted-foreground block mb-2">Pricing Model</Label>
                      <Badge variant="outline" className="text-base px-4 py-1">{viewDialog.item.classification.pricing}</Badge>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border text-center">
                      <Label className="text-xs text-muted-foreground block mb-2">Industry</Label>
                      <Badge variant="outline" className="text-base px-4 py-1">{viewDialog.item.classification.industry}</Badge>
                    </div>
                  </div>
                </TabsContent>

                {/* Details Tab */}
                <TabsContent value="details" className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Tagline</Label>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border italic text-lg text-slate-700 dark:text-slate-300">
                      "{viewDialog.item.tagline}"
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Description</Label>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded border min-h-[100px] text-sm leading-relaxed">
                      {viewDialog.item.description}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Key Features</Label>
                    <ul className="list-disc pl-5 space-y-1">
                      {viewDialog.item.features.map((feature, idx) => (
                        <li key={idx} className="text-sm">{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Use Cases</Label>
                    <div className="grid gap-3">
                      {viewDialog.item.useCases.map((useCase, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-3 rounded border">
                          <h4 className="font-medium text-sm mb-1">{useCase.title}</h4>
                          <p className="text-xs text-muted-foreground">{useCase.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {viewDialog.item.reason && (
                <div className="mt-6 mb-4 bg-red-50 p-4 rounded-md border border-red-100 flex gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 text-sm">Rejection Reason</h4>
                    <p className="text-sm text-red-600 mt-1">{viewDialog.item.reason}</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          )}

          <DialogFooter className="border-t p-4">
             {viewDialog.item?.status !== 'Approved' && viewDialog.item?.status !== 'Rejected' && (
              <div className="flex gap-2 w-full justify-end">
                <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" onClick={() => setRejectDialog({ open: true, id: viewDialog.item!.id })}>
                  Reject Submission
                </Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={() => {
                   handleApproveClick(viewDialog.item!.id);
                   setViewDialog({ open: false, item: null });
                }}>
                  Approve Submission
                </Button>
              </div>
             )}
             {(viewDialog.item?.status === 'Approved' || viewDialog.item?.status === 'Rejected') && (
               <Button onClick={() => setViewDialog({ open: false, item: null })}>Close</Button>
             )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
