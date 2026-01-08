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
  X,
  Calendar,
  Image as ImageIcon,
  ExternalLink
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

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  status: "Published" | "Draft";
  publishedAt: string;
  thumbnail: string;
}

const MOCK_NEWS: NewsItem[] = [
  { 
    id: 1, 
    title: "Industrial Data-X Launches New AI Agent Marketplace", 
    summary: "A comprehensive platform for discovering and deploying AI agents across industries.",
    content: "Full article content here...",
    category: "Product",
    author: "Admin",
    status: "Published",
    publishedAt: "2025-12-15",
    thumbnail: "news1.jpg"
  },
  { 
    id: 2, 
    title: "Partnership Announcement: CloudCorp Integration", 
    summary: "Expanding our infrastructure capabilities with strategic partnership.",
    content: "Full article content here...",
    category: "Partnership",
    author: "Marketing",
    status: "Published",
    publishedAt: "2025-12-10",
    thumbnail: "news2.jpg"
  },
  { 
    id: 3, 
    title: "How MCP is Revolutionizing Data Integration", 
    summary: "Deep dive into the Model Context Protocol and its impact on AI workflows.",
    content: "Full article content here...",
    category: "Technology",
    author: "Tech Team",
    status: "Published",
    publishedAt: "2025-12-05",
    thumbnail: "news3.jpg"
  },
  { 
    id: 4, 
    title: "2025 Industry Data Trends Report", 
    summary: "Annual report on emerging trends in industrial data and AI adoption.",
    content: "Full article content here...",
    category: "Research",
    author: "Research",
    status: "Draft",
    publishedAt: "",
    thumbnail: "news4.jpg"
  },
];

const CATEGORIES = ["Product", "Partnership", "Technology", "Research", "Company", "Event"];

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    author: "",
    status: "Draft" as "Published" | "Draft",
    publishedAt: "",
    thumbnail: "",
  });

  const openAddDialog = () => {
    setEditingNews(null);
    setFormData({
      title: "",
      summary: "",
      content: "",
      category: "",
      author: "",
      status: "Draft",
      publishedAt: "",
      thumbnail: "",
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: NewsItem) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      summary: item.summary,
      content: item.content,
      category: item.category,
      author: item.author,
      status: item.status,
      publishedAt: item.publishedAt,
      thumbnail: item.thumbnail,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingNews) {
      setNews(news.map(n => 
        n.id === editingNews.id 
          ? { ...n, ...formData }
          : n
      ));
    } else {
      const newItem: NewsItem = {
        id: Date.now(),
        ...formData,
      };
      setNews([newItem, ...news]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setNews(news.filter(n => n.id !== id));
  };

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="News Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">News Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage news articles and announcements</p>
          </div>
          <Button onClick={openAddDialog} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add News
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search news..." 
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
                <TableHead>Article</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNews.map((item) => (
                <TableRow key={item.id} data-testid={`row-news-${item.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                        <ImageIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="max-w-[300px]">
                        <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.summary}</p>
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
            <span>Showing {filteredNews.length} of {news.length} articles</span>
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
              {editingNews ? "Edit News Article" : "Add News Article"}
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
                  placeholder="Enter article title"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label className="flex justify-between text-sm">
                  <span>Summary <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground">{formData.summary.length}/200</span>
                </Label>
                <Textarea 
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value.slice(0, 200) })}
                  placeholder="Brief summary of the article"
                  maxLength={200}
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Content <span className="text-red-500">*</span></Label>
                <Textarea 
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full article content..."
                  className="min-h-[200px] resize-y"
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
                  <Label className="text-sm">Author</Label>
                  <Input 
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Thumbnail Image
                </Label>
                <div 
                  className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  onClick={() => setFormData({ ...formData, thumbnail: 'thumbnail.jpg' })}
                >
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">Click to upload thumbnail</p>
                    <p className="text-xs text-muted-foreground">Recommended: 1200x630px</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSave} 
              className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
              disabled={!formData.title || !formData.summary || !formData.category}
            >
              {editingNews ? "Save Changes" : "Add Article"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
