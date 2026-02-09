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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, Filter, UserPlus, Eye, Pencil, Ban, CheckCircle2, Building2, Globe, Mail, Phone, Shield, KeyRound, Shuffle, User, FileText, AlertTriangle } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface UserData {
  id: number;
  name: string;
  email: string;
  type: string;
  status: string;
  joined: string;
  dataPurchases: number;
  adPurchases: number;
  department: string;
  role: string;
  companyName: string;
  companyEmail: string;
  companyUrl: string;
  companyDescription: string;
}

const MOCK_USERS: UserData[] = [
  { id: 1, name: "Kim Min-su", email: "minsu@example.com", type: "Individual", status: "Active", joined: "2024-10-15", dataPurchases: 5, adPurchases: 1, department: "Data Team", role: "Data Analyst", companyName: "", companyEmail: "", companyUrl: "", companyDescription: "" },
  { id: 2, name: "Lee Ji-won", email: "jiwon@techcorp.com", type: "Corporate", status: "Active", joined: "2024-11-02", dataPurchases: 12, adPurchases: 4, department: "Engineering", role: "Lead Engineer", companyName: "TechCorp Inc.", companyEmail: "info@techcorp.com", companyUrl: "https://techcorp.com", companyDescription: "Leading technology solutions provider" },
  { id: 3, name: "Park Sung-hoon", email: "park.sh@data.io", type: "Corporate", status: "Suspended", joined: "2024-09-20", dataPurchases: 0, adPurchases: 0, department: "Sales", role: "Sales Manager", companyName: "DataIO Corp", companyEmail: "sales@data.io", companyUrl: "https://data.io", companyDescription: "Data infrastructure company" },
  { id: 4, name: "Choi Yu-jin", email: "yujin@example.com", type: "Individual", status: "Active", joined: "2024-12-05", dataPurchases: 2, adPurchases: 0, department: "", role: "Researcher", companyName: "", companyEmail: "", companyUrl: "", companyDescription: "" },
  { id: 5, name: "Global Systems Inc.", email: "contact@globalsys.com", type: "Corporate", status: "Active", joined: "2024-08-10", dataPurchases: 25, adPurchases: 8, department: "Operations", role: "Platform Admin", companyName: "Global Systems Inc.", companyEmail: "admin@globalsys.com", companyUrl: "https://globalsys.com", companyDescription: "Enterprise data solutions and analytics platform" },
];

const generateRandomPassword = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    type: "Individual",
    status: "Active"
  });
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);

  const [viewUser, setViewUser] = useState<UserData | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPassword, setEditPassword] = useState({ newPassword: "", confirmPassword: "" });

  const [suspendUser, setSuspendUser] = useState<UserData | null>(null);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || user.type === typeFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error("Name and Email are required");
      return;
    }

    const newUserEntry: UserData = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      type: newUser.type,
      status: newUser.status,
      joined: new Date().toISOString().split('T')[0],
      dataPurchases: 0,
      adPurchases: 0,
      department: "",
      role: "",
      companyName: "",
      companyEmail: "",
      companyUrl: "",
      companyDescription: ""
    };

    setUsers([newUserEntry, ...users]);
    setAddUserOpen(false);
    setNewUser({ name: "", email: "", type: "Individual", status: "Active" });
    toast.success("User added successfully");
  };

  const handleViewDetails = (user: UserData) => {
    setViewUser(user);
    setIsViewOpen(true);
  };

  const handleEditUser = (user: UserData) => {
    setEditUser({ ...user });
    setEditPassword({ newPassword: "", confirmPassword: "" });
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editUser) return;
    if (!editUser.name || !editUser.email) {
      toast.error("Name and Email are required");
      return;
    }
    if (editPassword.newPassword && editPassword.newPassword !== editPassword.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setUsers(users.map(u => u.id === editUser.id ? editUser : u));
    setIsEditOpen(false);
    setEditUser(null);
    toast.success("User updated successfully");
  };

  const handleSuspendToggle = (user: UserData) => {
    setSuspendUser(user);
    setIsSuspendOpen(true);
  };

  const confirmSuspendToggle = () => {
    if (!suspendUser) return;
    const newStatus = suspendUser.status === "Active" ? "Suspended" : "Active";
    setUsers(users.map(u => u.id === suspendUser.id ? { ...u, status: newStatus } : u));
    setIsSuspendOpen(false);
    setSuspendUser(null);
    toast.success(newStatus === "Suspended" ? "User suspended successfully" : "User activated successfully");
  };

  return (
    <AdminLayout title="User Management">
      <div className="space-y-4">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users by name or email..." 
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filter Users</h4>
                    <p className="text-sm text-muted-foreground">
                      Filter users by type and status
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="type">Type</Label>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="col-span-2 h-8">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Individual">Individual</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="status">Status</Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="col-span-2 h-8">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800">
                  <UserPlus className="h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user profile manually.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select 
                      value={newUser.type} 
                      onValueChange={(value) => setNewUser({...newUser, type: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select 
                      value={newUser.status} 
                      onValueChange={(value) => setNewUser({...newUser, status: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddUser}>Save User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-md border bg-white dark:bg-slate-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead className="text-right">Data Purchases</TableHead>
                <TableHead className="text-right">Ad Purchases</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {user.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          user.status === 'Active' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                        variant="outline"
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell className="text-right font-medium">{user.dataPurchases}</TableCell>
                    <TableCell className="text-right font-medium">{user.adPurchases}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0" data-testid={`btn-actions-user-${user.id}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(user)} data-testid={`btn-view-user-${user.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditUser(user)} data-testid={`btn-edit-user-${user.id}`}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleSuspendToggle(user)} 
                            className={user.status === "Active" ? "text-red-600" : "text-green-600"}
                            data-testid={`btn-suspend-user-${user.id}`}
                          >
                            {user.status === "Active" ? (
                              <><Ban className="h-4 w-4 mr-2" />Suspend User</>
                            ) : (
                              <><CheckCircle2 className="h-4 w-4 mr-2" />Activate User</>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              User Details
            </DialogTitle>
            <DialogDescription>
              Full profile information for this user.
            </DialogDescription>
          </DialogHeader>
          {viewUser && (
            <div className="space-y-6 py-2">
              {/* Account Information */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  Account Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Full Name</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.name}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Email</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.email}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Department</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.department || "—"}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Role</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.role || "—"}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Type</p>
                    <Badge variant="secondary" className="mt-0.5">{viewUser.type}</Badge>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Status</p>
                    <Badge className={`mt-0.5 ${viewUser.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} variant="outline">
                      {viewUser.status}
                    </Badge>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Joined Date</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.joined}</p>
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4" />
                  Organization Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Company Name</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.companyName || "—"}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Representative Email</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.companyEmail || "—"}</p>
                  </div>
                  <div className="rounded-lg border p-3 col-span-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Company Website URL</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.companyUrl || "—"}</p>
                  </div>
                  <div className="rounded-lg border p-3 col-span-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Company Description</p>
                    <p className="text-sm font-medium mt-0.5">{viewUser.companyDescription || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Usage Statistics */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4" />
                  Usage Statistics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Data Purchases</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{viewUser.dataPurchases}</p>
                  </div>
                  <div className="rounded-lg border p-3 bg-purple-50 dark:bg-purple-900/20">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Ad Purchases</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">{viewUser.adPurchases}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
            <Button onClick={() => {
              setIsViewOpen(false);
              if (viewUser) handleEditUser(viewUser);
            }}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              Edit User
            </DialogTitle>
            <DialogDescription>
              Modify user profile information, organization details, and password.
            </DialogDescription>
          </DialogHeader>
          {editUser && (
            <div className="space-y-6 py-2">
              {/* Account Information */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  Account Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Full Name</Label>
                    <Input
                      value={editUser.name}
                      onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                      data-testid="input-edit-name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <Input
                      type="email"
                      value={editUser.email}
                      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                      data-testid="input-edit-email"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Department</Label>
                    <Input
                      value={editUser.department}
                      onChange={(e) => setEditUser({ ...editUser, department: e.target.value })}
                      placeholder="Enter department"
                      data-testid="input-edit-department"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Role</Label>
                    <Input
                      value={editUser.role}
                      onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                      placeholder="Enter role"
                      data-testid="input-edit-role"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Type</Label>
                    <Select value={editUser.type} onValueChange={(value) => setEditUser({ ...editUser, type: value })}>
                      <SelectTrigger data-testid="select-edit-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Status</Label>
                    <Select value={editUser.status} onValueChange={(value) => setEditUser({ ...editUser, status: value })}>
                      <SelectTrigger data-testid="select-edit-status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Organization Information */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4" />
                  Organization Information
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Company Name</Label>
                    <Input
                      value={editUser.companyName}
                      onChange={(e) => setEditUser({ ...editUser, companyName: e.target.value })}
                      placeholder="Enter company name"
                      data-testid="input-edit-company-name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Representative Email</Label>
                    <Input
                      type="email"
                      value={editUser.companyEmail}
                      onChange={(e) => setEditUser({ ...editUser, companyEmail: e.target.value })}
                      placeholder="Enter representative email"
                      data-testid="input-edit-company-email"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <Label className="text-xs">Company Website URL</Label>
                    <Input
                      value={editUser.companyUrl}
                      onChange={(e) => setEditUser({ ...editUser, companyUrl: e.target.value })}
                      placeholder="https://www.example.com"
                      data-testid="input-edit-company-url"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-2">
                    <Label className="text-xs">Company Description</Label>
                    <Textarea
                      value={editUser.companyDescription}
                      onChange={(e) => setEditUser({ ...editUser, companyDescription: e.target.value })}
                      placeholder="Briefly describe your company"
                      rows={3}
                      data-testid="input-edit-company-desc"
                    />
                  </div>
                </div>
              </div>

              {/* Security / Password */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4" />
                  Security
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">New Password</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={editPassword.newPassword}
                        onChange={(e) => setEditPassword({ ...editPassword, newPassword: e.target.value })}
                        placeholder="Enter new password"
                        className="pr-9"
                        data-testid="input-edit-new-password"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const pw = generateRandomPassword();
                          setEditPassword({ newPassword: pw, confirmPassword: pw });
                        }}
                        className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
                        title="Generate random password"
                      >
                        <Shuffle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Confirm Password</Label>
                    <Input
                      type="text"
                      value={editPassword.confirmPassword}
                      onChange={(e) => setEditPassword({ ...editPassword, confirmPassword: e.target.value })}
                      placeholder="Confirm password"
                      data-testid="input-edit-confirm-password"
                    />
                  </div>
                </div>
                {editPassword.newPassword && editPassword.confirmPassword && editPassword.newPassword !== editPassword.confirmPassword && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Passwords do not match
                  </p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} className="bg-indigo-600 hover:bg-indigo-700" data-testid="btn-save-edit-user">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend / Activate Confirmation Dialog */}
      <Dialog open={isSuspendOpen} onOpenChange={setIsSuspendOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {suspendUser?.status === "Active" ? (
                <><Ban className="h-5 w-5 text-red-500" />Suspend User</>
              ) : (
                <><CheckCircle2 className="h-5 w-5 text-green-500" />Activate User</>
              )}
            </DialogTitle>
            <DialogDescription>
              {suspendUser?.status === "Active"
                ? "This will suspend the user and prevent them from accessing the platform."
                : "This will reactivate the user and restore their access to the platform."
              }
            </DialogDescription>
          </DialogHeader>
          {suspendUser && (
            <div className="py-4">
              <div className={`rounded-lg p-4 ${suspendUser.status === "Active" ? "bg-red-50 border border-red-100 dark:bg-red-900/20 dark:border-red-800" : "bg-green-50 border border-green-100 dark:bg-green-900/20 dark:border-green-800"}`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold">
                    {suspendUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{suspendUser.name}</p>
                    <p className="text-xs text-muted-foreground">{suspendUser.email}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Current Status:</span>
                  <Badge className={suspendUser.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} variant="outline">
                    {suspendUser.status}
                  </Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge className={suspendUser.status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} variant="outline">
                    {suspendUser.status === "Active" ? "Suspended" : "Active"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuspendOpen(false)}>Cancel</Button>
            <Button
              onClick={confirmSuspendToggle}
              className={suspendUser?.status === "Active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
              data-testid="btn-confirm-suspend"
            >
              {suspendUser?.status === "Active" ? "Suspend" : "Activate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
