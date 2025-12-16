import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Mock Admin Data
const MOCK_ADMINS = [
  { 
    id: 1, 
    name: "Super Admin", 
    email: "master@data-x.com", 
    role: "Super Admin", 
    permissions: { users: true, admins: true, submissions: true, payments: true } 
  },
  { 
    id: 2, 
    name: "Content Manager", 
    email: "content@data-x.com", 
    role: "Manager", 
    permissions: { users: false, admins: false, submissions: true, payments: false } 
  },
  { 
    id: 3, 
    name: "Finance Team", 
    email: "finance@data-x.com", 
    role: "Analyst", 
    permissions: { users: false, admins: false, submissions: false, payments: true } 
  },
];

export default function AdminManagement() {
  const [admins, setAdmins] = useState(MOCK_ADMINS);
  const [newAdminOpen, setNewAdminOpen] = useState(false);

  const togglePermission = (adminId: number, perm: keyof typeof MOCK_ADMINS[0]['permissions']) => {
    setAdmins(admins.map(admin => {
      if (admin.id === adminId) {
        return {
          ...admin,
          permissions: {
            ...admin.permissions,
            [perm]: !admin.permissions[perm]
          }
        };
      }
      return admin;
    }));
    toast.success("Permission updated");
  };

  return (
    <AdminLayout title="Admin Management">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Manage admin accounts and their access levels to different modules.
          </div>
          <Dialog open={newAdminOpen} onOpenChange={setNewAdminOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
                <Plus className="h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
                <DialogDescription>Create a new admin account and set initial permissions.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="Admin Name" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input placeholder="admin@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Role Title</Label>
                  <Input placeholder="e.g. Content Manager" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setNewAdminOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                  setNewAdminOpen(false);
                  toast.success("New admin added");
                }}>Create Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-md border bg-white dark:bg-slate-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Admin</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">User Mgmt</TableHead>
                <TableHead className="text-center">Admin Mgmt</TableHead>
                <TableHead className="text-center">Submissions</TableHead>
                <TableHead className="text-center">Payments</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{admin.name}</span>
                      <span className="text-xs text-muted-foreground">{admin.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{admin.role}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={admin.permissions.users} 
                      onCheckedChange={() => togglePermission(admin.id, 'users')}
                      disabled={admin.role === 'Super Admin'}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={admin.permissions.admins} 
                      onCheckedChange={() => togglePermission(admin.id, 'admins')}
                      disabled={admin.role === 'Super Admin'}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={admin.permissions.submissions} 
                      onCheckedChange={() => togglePermission(admin.id, 'submissions')}
                      disabled={admin.role === 'Super Admin'}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox 
                      checked={admin.permissions.payments} 
                      onCheckedChange={() => togglePermission(admin.id, 'payments')}
                      disabled={admin.role === 'Super Admin'}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    {admin.role !== 'Super Admin' && (
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
