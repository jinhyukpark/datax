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
import { Plus, Trash2, Edit, X, Mail, AlertTriangle, Zap, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<{ id: number; name: string; email: string; role: string; password: string } | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingAdmin, setDeletingAdmin] = useState<typeof MOCK_ADMINS[0] | null>(null);
  
  // Registration Form State
  const [registerRows, setRegisterRows] = useState([
    { name: "", email: "", role: "", password: "" }
  ]);

  // Invitation Form State
  const [inviteEmails, setInviteEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const [inviteRole, setInviteRole] = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [inviteConfirmOpen, setInviteConfirmOpen] = useState(false);
  const [pendingInviteData, setPendingInviteData] = useState<{ emails: string[]; role: string; password: string } | null>(null);

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

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setInvitePassword(password);
    toast.success("Random password generated");
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
    if (!inviteRole) {
      toast.error("Please select a role");
      return;
    }
    if (!invitePassword) {
      toast.error("Please enter a password or generate one");
      return;
    }

    setPendingInviteData({ emails, role: inviteRole, password: invitePassword });
    setInviteConfirmOpen(true);
  };

  const handleInviteConfirm = () => {
    setInviteConfirmOpen(false);
    setNewAdminOpen(false);
    setInviteEmails([]);
    setEmailInput("");
    setInviteRole("");
    setInvitePassword("");
    setPendingInviteData(null);
    toast.success("Invitation emails have been sent successfully!");
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
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white dark:bg-slate-950 min-h-[42px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 transition-all">
                        {inviteEmails.map((email) => (
                          <Badge key={email} variant="secondary" className="gap-1 pr-1 h-7">
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
                          className="flex-1 bg-transparent border-none outline-none min-w-[200px] text-sm py-0.5 h-7"
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
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Select value={inviteRole} onValueChange={setInviteRole}>
                        <SelectTrigger data-testid="select-invite-role">
                          <SelectValue placeholder="Select a role..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Analyst">Analyst</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <div className="flex gap-2">
                        <Input
                          value={invitePassword}
                          onChange={(e) => setInvitePassword(e.target.value)}
                          placeholder="Enter password"
                          data-testid="input-invite-password"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={generateRandomPassword}
                          className="shrink-0 gap-1.5"
                          data-testid="button-random-password"
                        >
                          <Zap className="h-4 w-4" />
                          Random
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter a password manually or click Random to generate one automatically.
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-500 hover:text-slate-900"
                          onClick={() => {
                            setEditingAdmin({ id: admin.id, name: admin.name, email: admin.email, role: admin.role, password: '' });
                            setEditDialogOpen(true);
                          }}
                          data-testid={`button-edit-admin-${admin.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-slate-500 hover:text-red-600"
                          onClick={() => {
                            setDeletingAdmin(admin);
                            setDeleteDialogOpen(true);
                          }}
                          data-testid={`button-delete-admin-${admin.id}`}
                        >
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

        {/* Edit Admin Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Admin Information
              </DialogTitle>
              <DialogDescription>Update the admin's details below.</DialogDescription>
            </DialogHeader>
            {editingAdmin && (
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input 
                    value={editingAdmin.name}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                    data-testid="input-edit-admin-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={editingAdmin.email}
                    onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                    data-testid="input-edit-admin-email"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={editingAdmin.role} onValueChange={(val) => setEditingAdmin({ ...editingAdmin, role: val })}>
                    <SelectTrigger data-testid="select-edit-admin-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                      <SelectItem value="Editor">Editor</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      value={editingAdmin.password}
                      onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                      placeholder="Leave blank to keep current"
                      data-testid="input-edit-admin-password"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="shrink-0 gap-1.5"
                      onClick={() => {
                        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
                        let pw = '';
                        for (let i = 0; i < 12; i++) pw += chars.charAt(Math.floor(Math.random() * chars.length));
                        setEditingAdmin({ ...editingAdmin, password: pw });
                        toast.success("Random password generated");
                      }}
                      data-testid="button-edit-random-password"
                    >
                      <Zap className="h-4 w-4" />
                      Random
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Leave blank to keep the current password.</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button 
                onClick={() => {
                  if (editingAdmin) {
                    setAdmins(admins.map(a => 
                      a.id === editingAdmin.id 
                        ? { ...a, name: editingAdmin.name, email: editingAdmin.email, role: editingAdmin.role }
                        : a
                    ));
                    setEditDialogOpen(false);
                    toast.success("Admin information updated successfully");
                  }
                }}
                data-testid="button-save-edit-admin"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Admin Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-600">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                Delete Admin
              </DialogTitle>
              <DialogDescription className="pt-2">
                Are you sure you want to delete this admin account? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {deletingAdmin && (
              <div className="p-4 bg-slate-50 rounded-lg border space-y-1">
                <p className="font-medium">{deletingAdmin.name}</p>
                <p className="text-sm text-muted-foreground">{deletingAdmin.email}</p>
                <Badge variant="outline" className="mt-1">{deletingAdmin.role}</Badge>
              </div>
            )}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  if (deletingAdmin) {
                    setAdmins(admins.filter(a => a.id !== deletingAdmin.id));
                    setDeleteDialogOpen(false);
                    setDeletingAdmin(null);
                    toast.success(`"${deletingAdmin.name}" has been removed`);
                  }
                }}
                data-testid="button-confirm-delete-admin"
              >
                Delete Admin
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Invite Confirmation Dialog */}
        <Dialog open={inviteConfirmOpen} onOpenChange={setInviteConfirmOpen}>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                Confirm Invitation
              </DialogTitle>
              <DialogDescription>
                Please review the invitation details before sending.
              </DialogDescription>
            </DialogHeader>
            {pendingInviteData && (
              <div className="space-y-3 py-2">
                <div className="p-4 bg-slate-50 rounded-lg border space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Recipients</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pendingInviteData.emails.map((email) => (
                        <Badge key={email} variant="secondary" className="text-xs">{email}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Role</p>
                      <Badge variant="outline">{pendingInviteData.role}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Password</p>
                      <code className="text-xs bg-slate-200 px-2 py-1 rounded">{pendingInviteData.password}</code>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setInviteConfirmOpen(false)}>Cancel</Button>
              <Button onClick={handleInviteConfirm} className="gap-2" data-testid="button-confirm-invite">
                <CheckCircle2 className="h-4 w-4" />
                Confirm & Send
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
