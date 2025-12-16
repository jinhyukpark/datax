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
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock Submissions
const MOCK_SUBMISSIONS = [
  { id: 101, title: "Smart Factory Sensor Data Set A", provider: "Tech Manufacturing", submittedAt: "2025-12-15", status: "Reviewing", type: "Dataset" },
  { id: 102, title: "Logistics Optimization API", provider: "LogiTech Solutions", submittedAt: "2025-12-14", status: "Submitted", type: "API" },
  { id: 103, title: "Energy Consumption Patterns 2024", provider: "Green Energy Co", submittedAt: "2025-12-10", status: "Approved", type: "Report" },
  { id: 104, title: "Defect Detection AI Model", provider: "Vision AI Labs", submittedAt: "2025-12-08", status: "Rejected", type: "AI Model", reason: "Insufficient documentation provided." },
];

export default function SubmissionManagement() {
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [rejectDialog, setRejectDialog] = useState<{open: boolean, id: number | null}>({ open: false, id: null });
  const [rejectReason, setRejectReason] = useState("");
  const [viewDialog, setViewDialog] = useState<{open: boolean, item: any | null}>({ open: false, item: null });

  const handleStatusChange = (id: number, status: string, reason?: string) => {
    setSubmissions(submissions.map(item => 
      item.id === id ? { ...item, status, reason } : item
    ));
    
    if (status === 'Approved') toast.success(`Submission #${id} Approved`);
    if (status === 'Rejected') toast.success(`Submission #${id} Rejected`);
  };

  const confirmReject = () => {
    if (rejectDialog.id && rejectReason) {
      handleStatusChange(rejectDialog.id, 'Rejected', rejectReason);
      setRejectDialog({ open: false, id: null });
      setRejectReason("");
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

  return (
    <AdminLayout title="Submission Management">
      <div className="space-y-4">
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
              {submissions.map((item) => (
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
                            onClick={() => handleStatusChange(item.id, 'Approved')}
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
          </DialogHeader>
          {viewDialog.item && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Title</Label>
                  <div className="font-medium">{viewDialog.item.title}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Provider</Label>
                  <div className="font-medium">{viewDialog.item.provider}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <div className="font-medium">{viewDialog.item.type}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <div className="font-medium">{viewDialog.item.submittedAt}</div>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Description</Label>
                <p className="mt-1 text-sm">
                  This is a placeholder description for the mock data. In a real application, full details submitted by the user would appear here.
                </p>
              </div>
              {viewDialog.item.reason && (
                <div className="bg-red-50 p-3 rounded-md border border-red-100">
                  <Label className="text-red-800">Rejection Reason</Label>
                  <p className="text-sm text-red-600">{viewDialog.item.reason}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
             {viewDialog.item?.status !== 'Approved' && viewDialog.item?.status !== 'Rejected' && (
              <div className="flex gap-2 w-full justify-end">
                <Button variant="outline" onClick={() => setRejectDialog({ open: true, id: viewDialog.item.id })}>Reject</Button>
                <Button onClick={() => {
                  handleStatusChange(viewDialog.item.id, 'Approved');
                  setViewDialog({ open: false, item: null });
                }}>Approve</Button>
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
