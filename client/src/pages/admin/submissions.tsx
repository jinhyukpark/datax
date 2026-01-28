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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Eye, CheckCircle, XCircle, Clock, FileText, AlertCircle, 
  ExternalLink, Github, Linkedin, Twitter, MessageSquare, Send, Globe, Edit,
  Server, Activity, Terminal, Settings, FileSignature, Power
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GeneralRequestDetails } from "@/components/general-request-details";
import { HostedRequestDetails } from "@/components/hosted-request-details";
import { ServiceReviewsDialog } from "@/components/service-reviews-dialog";
import { HostedServiceManage } from "@/components/hosted-service-manage";
import { HostedServiceLogs } from "@/components/hosted-service-logs";
import { ContractDetailsDialog } from "@/components/contract-details-dialog";

// Mock Approved Hosted Services with Owner info (from hosted-services.tsx)
const HOSTED_SERVICES_MOCK = [
  {
    id: "ha1",
    title: "Global Weather Historical Data",
    description: "Complete historical weather data from major global stations (1980-2024).",
    status: "Active",
    endpoint: "https://api.platform.com/v1/weather",
    region: "US-East (N. Virginia)",
    pricing: "Paid",
    uptime: "99.99%",
    nextBilling: "2026-01-20",
    type: "DATA",
    owner: "Climate Data Org",
    ownerEmail: "data@climate.example.org"
  },
  {
    id: "ha2",
    title: "Bio-Medical Research Corpus",
    description: "Annotated corpus for biomedical NLP research and training.",
    status: "Active",
    endpoint: "https://api.platform.com/v1/biomed",
    region: "Asia-Pacific (Seoul)",
    pricing: "Paid",
    uptime: "99.95%",
    nextBilling: "2026-01-15",
    type: "AGENT",
    owner: "MedAI Systems",
    ownerEmail: "contact@medai.example.com"
  },
  {
    id: "ha3",
    title: "Stock Market Tick Stream",
    description: "Real-time stock market data stream via WebSocket.",
    status: "Active",
    endpoint: "wss://api.platform.com/v1/stream",
    region: "US-West (Oregon)",
    pricing: "Paid",
    uptime: "99.99%",
    nextBilling: "2026-01-25",
    type: "MCP",
    owner: "FinTech Global",
    ownerEmail: "tech@fintech.example.com"
  },
  {
    id: "ha4",
    title: "Smart Factory Sensor Grid",
    description: "IoT sensor data aggregation from manufacturing plants.",
    status: "Active",
    endpoint: "https://api.platform.com/v1/sensors",
    region: "Europe (Frankfurt)",
    pricing: "Free",
    uptime: "99.90%",
    nextBilling: "2026-02-01",
    type: "DATA",
    owner: "Tech Manufacturing",
    ownerEmail: "ops@techmfg.example.com"
  }
];

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
    newReviews: 2,
    pricing: "Free",
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
    newReviews: 0,
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
    newReviews: 5,
    pricing: "Paid",
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
    pricing: "Paid",
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
  const [viewDialog, setViewDialog] = useState<{open: boolean, item: typeof MOCK_SUBMISSIONS[0] | null, mode: 'all' | 'application' | 'details'}>({ open: false, item: null, mode: 'all' });
  const [reviewsDialog, setReviewsDialog] = useState<{open: boolean, item: typeof MOCK_SUBMISSIONS[0] | null}>({ open: false, item: null });
  
  // Hosted Services State
  const [hostedServices, setHostedServices] = useState(HOSTED_SERVICES_MOCK);
  const [contractDialog, setContractDialog] = useState<{open: boolean, service: typeof HOSTED_SERVICES_MOCK[0] | null}>({ open: false, service: null });

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
      setViewDialog({ open: false, item: null, mode: 'all' });
    }
  };

  const handleStopService = (id: string) => {
    setHostedServices(hostedServices.map(service => 
      service.id === id ? { ...service, status: "Stopped" } : service
    ));
    toast.success("Service stopped successfully");
  };

  const activeServices = hostedServices.filter(s => s.status === 'Active');
  const stoppedServices = hostedServices.filter(s => s.status === 'Stopped');

  const getServiceStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'Suspended': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
      case 'Stopped': return <Badge variant="secondary">Stopped</Badge>;
      case 'Maintenance': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getServiceTypeBadge = (type: string) => {
    switch(type) {
      case 'MCP': return <Badge className="bg-purple-100 text-purple-800 border-purple-200">MCP</Badge>;
      case 'DATA': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">DATA</Badge>;
      case 'AGENT': return <Badge className="bg-amber-100 text-amber-800 border-amber-200">AGENT</Badge>;
      default: return <Badge variant="outline">{type}</Badge>;
    }
  };

  const ServiceCard = ({ service, isStopped = false }: { service: typeof HOSTED_SERVICES_MOCK[0], isStopped?: boolean }) => (
    <Card className={`overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 ${isStopped ? 'opacity-75 grayscale hover:grayscale-0' : ''}`}>
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold">{service.title}</h3>
              {getServiceTypeBadge(service.type)}
              {getServiceStatusBadge(service.status)}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-muted-foreground text-sm mb-2">{service.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Owner:</span>
              <span className="text-slate-600 dark:text-slate-400">{service.owner}</span>
              <span className="text-slate-400 text-xs">({service.ownerEmail})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Endpoint</p>
              <div className="flex items-center gap-1 font-mono text-xs max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {service.endpoint}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Region</p>
              <p className="font-medium">{service.region}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pricing</p>
              <p className={`font-medium ${service.pricing === 'Free' ? 'text-green-600' : ''}`}>{service.pricing}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Uptime (30d)</p>
              <p className="font-medium text-green-600 flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {service.uptime}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900 p-6 flex flex-row md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l min-w-[180px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full gap-2" disabled={isStopped}>
                <Settings className="h-4 w-4" />
                Manage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl h-[90vh] p-6">
              <HostedServiceManage data={service} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full gap-2" disabled={isStopped}>
                <Terminal className="h-4 w-4" />
                View Logs
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none">
              <HostedServiceLogs serviceName={service.title} />
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-2"
            onClick={() => setContractDialog({ open: true, service: service })}
            disabled={isStopped}
          >
            <FileSignature className="h-4 w-4" />
            Contract
          </Button>

          {!isStopped && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/50">
                  <Power className="h-3 w-3 mr-2" />
                  Stop
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Stop Service?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will stop the service and move it to the Stopped Services tab. You can restart it later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleStopService(service.id)} className="bg-red-600 hover:bg-red-700">
                    Stop Service
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          <p className="text-[10px] text-muted-foreground text-center mt-auto">
            Next bill: {service.nextBilling}
          </p>
        </div>
      </div>
    </Card>
  );

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

  const handleReviewingClick = (id: number) => {
    const submission = submissions.find(s => s.id === id);
    if (submission && submission.status === 'Approved') {
      setAlertConfig({
        title: "Set to Reviewing",
        description: "Warning: Changing status from 'Approved' to 'Reviewing' will make this service invisible to users. Are you sure you want to proceed?",
        action: () => handleStatusChange(id, 'Reviewing')
      });
      setAlertOpen(true);
    } else {
      handleStatusChange(id, 'Reviewing');
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

    const submissionContent = (
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
                {serviceType === 'Hosted' && <TableHead>Pricing</TableHead>}
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
                    {serviceType === 'Hosted' && (
                      <TableCell>
                        <span className={`font-medium ${item.pricing === 'Free' ? 'text-green-600' : ''}`}>
                          {item.pricing || 'Paid'}
                        </span>
                      </TableCell>
                    )}
                    <TableCell>{item.submittedAt}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {item.serviceType === 'Hosted' ? (
                          <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'application' })}>
                            <FileText className="h-4 w-4" />
                          </Button>
                        ) : (
                           <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'all' })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}

                        {item.serviceType === 'Hosted' && (
                          <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'details' })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}

                        {(item.serviceType === 'Linked' || item.serviceType === 'Hosted') && (
                          <div className="relative inline-block">
                            <Button variant="ghost" size="sm" onClick={() => setReviewsDialog({ open: true, item: item })}>
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            {item.newReviews && item.newReviews > 0 ? (
                              <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
                            ) : null}
                          </div>
                        )}
                        
                        {/* Actions for all statuses including Rejected */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 h-8 w-8 p-0"
                          onClick={() => handleReviewingClick(item.id)}
                          disabled={item.status === 'Reviewing'}
                          title="Set to Reviewing"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                          onClick={() => handleApproveClick(item.id)}
                          disabled={item.status === 'Approved'}
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="h-8 w-8 p-0"
                          onClick={() => setRejectDialog({ open: true, id: item.id })}
                          disabled={item.status === 'Rejected'}
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
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

    if (serviceType === "Hosted") {
       return (
        <Tabs defaultValue="requests" className="w-full">
           <TabsList className="mb-4">
              <TabsTrigger value="requests">Requests (Submissions)</TabsTrigger>
              <TabsTrigger value="active">Active Services</TabsTrigger>
              <TabsTrigger value="stopped">Stopped Services</TabsTrigger>
           </TabsList>
           
           <TabsContent value="requests">
              {submissionContent}
           </TabsContent>
           
           <TabsContent value="active">
              <div className="space-y-4">
                 {activeServices.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                       <Server className="mx-auto h-12 w-12 mb-4 opacity-20" />
                       <h3 className="text-lg font-medium text-muted-foreground">No active services found</h3>
                       <p className="text-sm text-muted-foreground mt-1">Services will appear here after approval and deployment.</p>
                    </div>
                 ) : (
                    activeServices.map((service) => (
                       <ServiceCard key={service.id} service={service} />
                    ))
                 )}
              </div>
           </TabsContent>
           
           <TabsContent value="stopped">
              <div className="space-y-4">
                 {stoppedServices.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                       <XCircle className="mx-auto h-12 w-12 mb-4 opacity-20" />
                       <h3 className="text-lg font-medium text-muted-foreground">No stopped services found</h3>
                       <p className="text-sm text-muted-foreground mt-1">Stopped services will appear here.</p>
                    </div>
                 ) : (
                    stoppedServices.map((service) => (
                       <ServiceCard key={service.id} service={service} isStopped={true} />
                    ))
                 )}
              </div>
           </TabsContent>
        </Tabs>
       );
    }
    
    return submissionContent;
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
      <Dialog open={viewDialog.open} onOpenChange={(open) => !open && setViewDialog({ open: false, item: null, mode: 'all' })}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              {viewDialog.item?.title}
              {viewDialog.item && viewDialog.mode !== 'application' && getStatusBadge(viewDialog.item.status)}
            </DialogTitle>
            <DialogDescription>
              Submitted by {viewDialog.item?.provider} on {viewDialog.item?.submittedAt}
            </DialogDescription>
          </DialogHeader>
          
          {viewDialog.item && (
            <ScrollArea className="flex-1 px-6 py-6">
              {viewDialog.item.serviceType === 'Hosted' ? (
                <HostedRequestDetails data={viewDialog.item} isEditable={false} mode={viewDialog.mode} />
              ) : (
                <GeneralRequestDetails data={viewDialog.item} />
              )}
            </ScrollArea>
          )}

          {viewDialog.item && (
            <div className="p-4 border-t flex justify-end gap-2 bg-slate-50 dark:bg-slate-900/50">
              {viewDialog.mode === 'application' ? (
                <Button 
                  variant="outline"
                  onClick={() => setViewDialog({ open: false, item: null, mode: 'all' })}
                >
                  Confirm
                </Button>
              ) : (
                <>
                  <div className="flex gap-2 ml-auto">
                    <Button 
                      variant="outline" 
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => handleReviewingClick(viewDialog.item!.id)}
                      disabled={viewDialog.item.status === 'Reviewing'}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Reviewing
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => setRejectDialog({ open: true, id: viewDialog.item!.id })}
                      disabled={viewDialog.item.status === 'Rejected'}
                    >
                      <Reject className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveClick(viewDialog.item!.id)}
                      disabled={viewDialog.item.status === 'Approved'}
                    >
                      Approve Submission
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reviews Dialog */}
      <ServiceReviewsDialog 
        isOpen={reviewsDialog.open}
        onOpenChange={(open) => !open && setReviewsDialog({ open: false, item: null })}
        serviceTitle={reviewsDialog.item?.title || ""}
      />

      {/* Contract Dialog (for Active/Stopped services) */}
      {contractDialog.service && (
        <ContractDetailsDialog 
          open={contractDialog.open} 
          onOpenChange={(open) => !open && setContractDialog({ open: false, service: null })}
          service={contractDialog.service}
        />
      )}
    </AdminLayout>
  );
}