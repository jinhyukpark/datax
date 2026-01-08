import { useState } from "react";
import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Eye,
  Calendar,
  Image as ImageIcon,
  User,
  Tag
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: "Published" | "Draft";
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  tags: string[];
}

const MOCK_BLOGS: BlogPost[] = [
  { 
    id: 1, 
    title: "Getting Started with AI Agents in Enterprise", 
    excerpt: "A comprehensive guide to implementing AI agents in your organization's workflow.",
    content: "Full blog content here...",
    category: "Tutorial",
    author: "Data-X Team",
    status: "Published",
    publishedAt: "2025-12-20",
    readTime: "8 min",
    thumbnail: "blog1.jpg",
    tags: ["AI", "Enterprise", "Tutorial"]
  },
  { 
    id: 2, 
    title: "Understanding MCP: The Future of AI Integration", 
    excerpt: "Deep dive into Model Context Protocol and how it's changing AI development.",
    content: "Full blog content here...",
    category: "Technology",
    author: "Tech Team",
    status: "Published",
    publishedAt: "2025-12-15",
    readTime: "12 min",
    thumbnail: "blog2.jpg",
    tags: ["MCP", "Integration", "AI"]
  },
  { 
    id: 3, 
    title: "Best Practices for Data API Design", 
    excerpt: "Learn the key principles for designing robust and scalable data APIs.",
    content: "Full blog content here...",
    category: "Development",
    author: "Engineering",
    status: "Published",
    publishedAt: "2025-12-10",
    readTime: "10 min",
    thumbnail: "blog3.jpg",
    tags: ["API", "Development", "Best Practices"]
  },
  { 
    id: 4, 
    title: "2025 AI Agent Market Analysis", 
    excerpt: "Comprehensive analysis of the AI agent market trends and predictions.",
    content: "Full blog content here...",
    category: "Research",
    author: "Research Team",
    status: "Draft",
    publishedAt: "",
    readTime: "15 min",
    thumbnail: "blog4.jpg",
    tags: ["Market", "Analysis", "2025"]
  },
];

const CATEGORIES = ["Tutorial", "Technology", "Development", "Research", "Case Study", "Industry News"];

export default function AdminBlog() {
  const [blogs, setBlogs] = useState<BlogPost[]>(MOCK_BLOGS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    status: "Draft" as "Published" | "Draft",
    publishedAt: "",
    readTime: "",
    thumbnail: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  const openAddDialog = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      status: "Draft",
      publishedAt: "",
      readTime: "",
      thumbnail: "",
      tags: [],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: BlogPost) => {
    setEditingBlog(item);
    setFormData({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      author: item.author,
      status: item.status,
      publishedAt: item.publishedAt,
      readTime: item.readTime,
      thumbnail: item.thumbnail,
      tags: item.tags,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingBlog) {
      setBlogs(blogs.map(b => 
        b.id === editingBlog.id 
          ? { ...b, ...formData }
          : b
      ));
    } else {
      const newItem: BlogPost = {
        id: Date.now(),
        ...formData,
      };
      setBlogs([newItem, ...blogs]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setBlogs(blogs.filter(b => b.id !== id));
  };

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5 && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Blog Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blog Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Create and manage blog posts for the platform</p>
          </div>
          <Button onClick={openAddDialog} className="gap-2 bg-blue-600 hover:bg-blue-700">
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
              <select className="h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
                <option value="">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                ))}
              </select>
              <select className="h-10 px-3 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm">
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
                        <DropdownMenuItem className="gap-2" onClick={() => openEditDialog(item)}>
                          <Pencil className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800">
            <DialogTitle className="text-xl font-bold">
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(90vh-180px)]">
            <div className="px-6 py-6 space-y-6">
              <div className="space-y-2">
                <Label className="flex justify-between text-sm">
                  <span>Title <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground">{formData.title.length}/100</span>
                </Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value.slice(0, 100) })}
                  placeholder="Enter blog post title"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex justify-between text-sm">
                  <span>Excerpt <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground">{formData.excerpt.length}/200</span>
                </Label>
                <Textarea 
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value.slice(0, 200) })}
                  placeholder="Brief summary that appears in blog listings"
                  maxLength={200}
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Content <span className="text-red-500">*</span></Label>
                <Textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here... (Markdown supported)"
                  className="min-h-[250px] resize-y font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Category <span className="text-red-500">*</span></Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(v) => setFormData({ ...formData, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Author
                  </Label>
                  <Input 
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(v) => setFormData({ ...formData, status: v as "Published" | "Draft" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Publish Date
                  </Label>
                  <Input 
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Read Time</Label>
                  <Input 
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g., 5 min"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Featured Image
                </Label>
                <div 
                  className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  onClick={() => setFormData({ ...formData, thumbnail: 'thumbnail.jpg' })}
                >
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload featured image</p>
                    <p className="text-xs text-muted-foreground">Recommended: 1200x630px</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between text-sm">
                  <span className="flex items-center gap-2"><Tag className="h-4 w-4" /> Tags</span>
                  <span className="text-xs text-muted-foreground">{formData.tags.length}/5</span>
                </Label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[44px]">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        className="hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full p-0.5 ml-1"
                      >
                        <span className="sr-only">Remove</span>
                        ×
                      </button>
                    </Badge>
                  ))}
                  {formData.tags.length < 5 && (
                    <Input 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder={formData.tags.length === 0 ? "Type tag and press Enter" : "Add more..."}
                      className="flex-1 min-w-[120px] h-7 border-0 bg-transparent p-0 focus-visible:ring-0 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSave} 
              className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
              disabled={!formData.title || !formData.excerpt || !formData.category}
            >
              {editingBlog ? "Save Changes" : "Publish Post"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
