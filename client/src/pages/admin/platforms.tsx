import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye,
  ExternalLink,
  Globe
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const MOCK_PLATFORMS = [
  { 
    id: 1, 
    name: "AWS Data Exchange", 
    category: "Cloud", 
    status: "Active", 
    resources: 24,
    url: "https://aws.amazon.com/data-exchange",
    createdAt: "2024-01-15"
  },
  { 
    id: 2, 
    name: "Snowflake Marketplace", 
    category: "Data Warehouse", 
    status: "Active", 
    resources: 18,
    url: "https://snowflake.com/marketplace",
    createdAt: "2024-02-20"
  },
  { 
    id: 3, 
    name: "Azure Data Marketplace", 
    category: "Cloud", 
    status: "Active", 
    resources: 15,
    url: "https://azure.microsoft.com",
    createdAt: "2024-03-10"
  },
  { 
    id: 4, 
    name: "Google Cloud Analytics Hub", 
    category: "Analytics", 
    status: "Inactive", 
    resources: 8,
    url: "https://cloud.google.com",
    createdAt: "2024-04-05"
  },
  { 
    id: 5, 
    name: "Databricks Marketplace", 
    category: "AI/ML", 
    status: "Active", 
    resources: 12,
    url: "https://databricks.com",
    createdAt: "2024-05-12"
  },
];

export default function AdminPlatforms() {
  return (
    <AdminLayout title="Platform Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage connected data platforms and marketplaces</p>
          </div>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Platform
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search platforms..." className="pl-9" />
              </div>
              <select className="h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
                <option value="">All Categories</option>
                <option value="cloud">Cloud</option>
                <option value="analytics">Analytics</option>
                <option value="ai-ml">AI/ML</option>
                <option value="data-warehouse">Data Warehouse</option>
              </select>
              <select className="h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Resources</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_PLATFORMS.map((platform) => (
                <TableRow key={platform.id} data-testid={`row-platform-${platform.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{platform.name}</p>
                        <a 
                          href={platform.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                        >
                          {platform.url.replace('https://', '')}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {platform.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{platform.resources}</span>
                    <span className="text-muted-foreground ml-1">items</span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={platform.status === "Active" ? "default" : "secondary"}
                      className={platform.status === "Active" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }
                    >
                      {platform.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {platform.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Pencil className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600">
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing 5 of 5 platforms</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
