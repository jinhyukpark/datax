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
import { Plus, Trash2, Edit, X, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  
  // Registration Form State
  const [registerRows, setRegisterRows] = useState([
    { name: "", email: "", role: "", password: "" }
  ]);

  // Invitation Form State
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");

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

  const addRegisterRow = () => {
    setRegisterRows([...registerRows, { name: "", email: "", role: "", password: "" }]);
  };

  const removeRegisterRow = (index: number) => {
    if (registerRows.length > 1) {
      const newRows = [...registerRows];
      newRows.splice(index, 1);
      setRegisterRows(newRows);
    }
  };

  const updateRegisterRow = (index: number, field: string, value: string) => {
    const newRows = [...registerRows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRegisterRows(newRows);
  };

  const handleRegisterSubmit = () => {
    // In a real app, this would validate and submit to backend
    const newAdmins = registerRows.map((row, idx) => ({
      id: admins.length + idx + 1,
      name: row.name || "New Admin",
      email: row.email,
      role: row.role || "Admin",
      permissions: { users: false, admins: false, submissions: false, payments: false }
    }));
    
    setAdmins([...admins, ...newAdmins]);
    setNewAdminOpen(false);
    setRegisterRows([{ name: "", email: "", role: "", password: "" }]);
    toast.success(`${newAdmins.length} admin(s) added successfully`);
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const email = emailInput.trim().replace(',', '');
      if (email) {
        if (!inviteEmails.includes(email)) {
          setInviteEmails([...inviteEmails, email]);
        }
        setEmailInput("");
      }
    } else if (e.key === 'Backspace' && !emailInput && inviteEmails.length > 0) {
      setInviteEmails(inviteEmails.slice(0, -1));
    }
  };

  const removeEmailTag = (emailToRemove: string) => {
    setInviteEmails(inviteEmails.filter(email => email !== emailToRemove));
  };

  const handleInviteSubmit = () => {
    const emails = [...inviteEmails];
    if (emailInput.trim()) {
      emails.push(emailInput.trim());
    }
    
    if (emails.length === 0) {
      toast.error("Please enter at least one email address");
      return;
    }

    // Mock invite logic
    setNewAdminOpen(false);
    setInviteEmails([]);
    setEmailInput("");
    toast.success(`Invitations sent to ${emails.length} recipients`);
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
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
                <DialogDescription>Add administrators directly or invite them via email.</DialogDescription>
              </DialogHeader>
              
              <Tabs defaultValue="direct" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="direct">Direct Registration</TabsTrigger>
                  <TabsTrigger value="invite">Email Invitation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="direct">
                  <ScrollArea className="max-h-[400px] pr-4">
                    <div className="space-y-4">
                      {registerRows.map((row, index) => (
                        <div key={index} className="space-y-2 p-4 border rounded-md relative bg-slate-50 dark:bg-slate-900/50">
                          {registerRows.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-red-500"
                              onClick={() => removeRegisterRow(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-xs">Name</Label>
                              <Input 
                                placeholder="Admin Name" 
                                value={row.name}
                                onChange={(e) => updateRegisterRow(index, 'name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Email</Label>
                              <Input 
                                placeholder="admin@example.com" 
                                value={row.email}
                                onChange={(e) => updateRegisterRow(index, 'email', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-xs">Role Title</Label>
                              <Input 
                                placeholder="e.g. Manager" 
                                value={row.role}
                                onChange={(e) => updateRegisterRow(index, 'role', e.target.value)}
                              />
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Password (Optional)</Label>
                              <Input 
                                type="password"
                                placeholder="••••••••" 
                                value={row.password}
                                onChange={(e) => updateRegisterRow(index, 'password', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={addRegisterRow}>
                        <Plus className="h-4 w-4" /> Add Another
                      </Button>
                    </div>
                  </ScrollArea>
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setNewAdminOpen(false)}>Cancel</Button>
                    <Button onClick={handleRegisterSubmit}>Register Admins</Button>
                  </DialogFooter>
                </TabsContent>
                
                <TabsContent value="invite">
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Email Addresses</Label>
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white dark:bg-slate-950 min-h-[100px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        {inviteEmails.map((email) => (
                          <Badge key={email} variant="secondary" className="gap-1 pr-1">
                            {email}
                            <button
                              onClick={() => removeEmailTag(email)}
                              className="ml-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        <input
                          className="flex-1 bg-transparent border-none outline-none min-w-[200px] text-sm py-1"
                          placeholder={inviteEmails.length === 0 ? "Type email and press Enter..." : ""}
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          onKeyDown={handleEmailKeyDown}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Type email addresses and press Enter or Comma to add them as tags.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNewAdminOpen(false)}>Cancel</Button>
                    <Button onClick={handleInviteSubmit} className="gap-2">
                      <Mail className="h-4 w-4" /> Send Invitations
                    </Button>
                  </DialogFooter>
                </TabsContent>
              </Tabs>
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
