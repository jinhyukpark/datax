import { useState } from "react";
import { useLocation } from "wouter";
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
  Image as ImageIcon
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

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  status: "Published" | "Draft";
  publishedAt: string;
  readTime: string;
}

const MOCK_BLOGS: BlogPost[] = [
  { 
    id: 1, 
    title: "Getting Started with AI Agents in Enterprise", 
    excerpt: "A comprehensive guide to implementing AI agents in your organization's workflow.",
    category: "Tutorial",
    author: "Data-X Team",
    status: "Published",
    publishedAt: "2025-12-20",
    readTime: "8 min"
  },
  { 
    id: 2, 
    title: "Understanding MCP: The Future of AI Integration", 
    excerpt: "Deep dive into Model Context Protocol and how it's changing AI development.",
    category: "Technology",
    author: "Tech Team",
    status: "Published",
    publishedAt: "2025-12-15",
    readTime: "12 min"
  },
  { 
    id: 3, 
    title: "Best Practices for Data API Design", 
    excerpt: "Learn the key principles for designing robust and scalable data APIs.",
    category: "Development",
    author: "Engineering",
    status: "Published",
    publishedAt: "2025-12-10",
    readTime: "10 min"
  },
  { 
    id: 4, 
    title: "2025 AI Agent Market Analysis", 
    excerpt: "Comprehensive analysis of the AI agent market trends and predictions.",
    category: "Research",
    author: "Research Team",
    status: "Draft",
    publishedAt: "",
    readTime: "15 min"
  },
];

const CATEGORIES = ["Tutorial", "Technology", "Development", "Research", "Case Study", "Industry News"];

export default function AdminBlog() {
  const [, setLocation] = useLocation();
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleDelete = (id: number) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || b.category.toLowerCase() === categoryFilter;
    const matchesStatus = !statusFilter || b.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <AdminLayout title="Blog Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Create and manage blog posts for the platform</p>
          </div>
          <Button onClick={() => setLocation("/admin/blog/new")} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search blog posts..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select 
                className="h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
              <select 
                className="h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Post</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Read Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.map((item) => (
                <TableRow key={item.id} data-testid={`row-blog-${item.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                        <ImageIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="max-w-[300px]">
                        <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.excerpt}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.author}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.readTime}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={item.status === "Published" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.publishedAt || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2" onClick={() => setLocation(`/admin/blog/${item.id}`)}>
                          <Pencil className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2" onClick={() => setLocation(`/blog/${item.id}`)}>
                          <Eye className="h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => handleDelete(item.id)}>
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
            <span>Showing {filteredBlogs.length} of {blogs.length} posts</span>
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
