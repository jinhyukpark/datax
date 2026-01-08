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
  Linkedin,
  Twitter,
  Github,
  MessageCircle,
  Send,
  Calendar,
  MapPin,
  Building2,
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

interface Platform {
  id: number;
  name: string;
  description: string;
  location: string;
  district: string;
  establishedDate: string;
  linkedinUrl: string;
  twitterUrl: string;
  githubUrl: string;
  discordUrl: string;
  telegramUrl: string;
  contactEmail: string;
  contactPhone: string;
  keywords: string[];
  status: "Active" | "Inactive";
  resourceCount: number;
  createdAt: string;
}

const MOCK_PLATFORMS: Platform[] = [
  { 
    id: 1, 
    name: "Social Trend Analysis", 
    description: "Big data analysis service collected online to quickly respond to the constantly changing web environment.",
    location: "Seoul",
    district: "Gangnam",
    establishedDate: "2023-05-15",
    linkedinUrl: "https://linkedin.com/company/social-trend",
    twitterUrl: "https://twitter.com/socialtrend",
    githubUrl: "",
    discordUrl: "",
    telegramUrl: "",
    contactEmail: "contact@socialtrend.co",
    contactPhone: "02-1234-5678",
    keywords: ["Analysis", "Social", "Trend"],
    status: "Active",
    resourceCount: 1,
    createdAt: "2024-01-15"
  },
  { 
    id: 2, 
    name: "Consumer Sentiment Analysis", 
    description: "Real-time sentiment analysis of consumer reviews and feedback across multiple platforms.",
    location: "Seoul",
    district: "Mapo",
    establishedDate: "2022-11-20",
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "https://github.com/consumer-sentiment",
    discordUrl: "https://discord.gg/sentiment",
    telegramUrl: "",
    contactEmail: "info@sentiment.ai",
    contactPhone: "02-9876-5432",
    keywords: ["Analysis", "Consumer", "Sentiment"],
    status: "Active",
    resourceCount: 1,
    createdAt: "2024-02-20"
  },
  { 
    id: 3, 
    name: "Image-based Patent Analysis Service", 
    description: "Connecting global technology/company/researcher/patent analysis content based on images.",
    location: "Busan",
    district: "Haeundae",
    establishedDate: "2024-01-10",
    linkedinUrl: "https://linkedin.com/company/patent-ai",
    twitterUrl: "",
    githubUrl: "",
    discordUrl: "",
    telegramUrl: "https://t.me/patentai",
    contactEmail: "patent@imageanalysis.com",
    contactPhone: "051-1234-5678",
    keywords: ["Patent", "Image", "Analysis"],
    status: "Active",
    resourceCount: 1,
    createdAt: "2024-03-10"
  },
];

const CITIES = ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju", "Ulsan", "Sejong"];
const DISTRICTS: Record<string, string[]> = {
  "Seoul": ["Gangnam", "Gangdong", "Gangbuk", "Gangseo", "Gwanak", "Gwangjin", "Guro", "Geumcheon", "Nowon", "Dobong", "Dongdaemun", "Dongjak", "Mapo", "Seodaemun", "Seocho", "Seongdong", "Seongbuk", "Songpa", "Yangcheon", "Yeongdeungpo", "Yongsan", "Eunpyeong", "Jongno", "Jung", "Jungnang"],
  "Busan": ["Haeundae", "Suyeong", "Nam", "Dong", "Busanjin", "Saha", "Sasang"],
  "Incheon": ["Jung", "Dong", "Michuhol", "Yeonsu", "Namdong", "Bupyeong", "Gyeyang", "Seo"],
};

export default function AdminPlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>(MOCK_PLATFORMS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    district: "",
    establishedDate: "",
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "",
    discordUrl: "",
    telegramUrl: "",
    contactEmail: "",
    contactPhone: "",
    keywords: [] as string[],
  });
  const [keywordInput, setKeywordInput] = useState("");

  const openAddDialog = () => {
    setEditingPlatform(null);
    setFormData({
      name: "",
      description: "",
      location: "",
      district: "",
      establishedDate: "",
      linkedinUrl: "",
      twitterUrl: "",
      githubUrl: "",
      discordUrl: "",
      telegramUrl: "",
      contactEmail: "",
      contactPhone: "",
      keywords: [],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (platform: Platform) => {
    setEditingPlatform(platform);
    setFormData({
      name: platform.name,
      description: platform.description,
      location: platform.location,
      district: platform.district,
      establishedDate: platform.establishedDate,
      linkedinUrl: platform.linkedinUrl,
      twitterUrl: platform.twitterUrl,
      githubUrl: platform.githubUrl,
      discordUrl: platform.discordUrl,
      telegramUrl: platform.telegramUrl,
      contactEmail: platform.contactEmail,
      contactPhone: platform.contactPhone,
      keywords: platform.keywords,
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingPlatform) {
      setPlatforms(platforms.map(p => 
        p.id === editingPlatform.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      const newPlatform: Platform = {
        id: Date.now(),
        ...formData,
        status: "Active",
        resourceCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setPlatforms([...platforms, newPlatform]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setPlatforms(platforms.filter(p => p.id !== id));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && formData.keywords.length < 5 && !formData.keywords.includes(keywordInput.trim())) {
      setFormData({ ...formData, keywords: [...formData.keywords, keywordInput.trim()] });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData({ ...formData, keywords: formData.keywords.filter(k => k !== keyword) });
  };

  const filteredPlatforms = platforms.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Platform Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage platform information displayed on the Platforms page</p>
          </div>
          <Button onClick={openAddDialog} className="gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Platform
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search platforms..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
                <TableHead>Location</TableHead>
                <TableHead>Keywords</TableHead>
                <TableHead>Resources</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPlatforms.map((platform) => (
                <TableRow key={platform.id} data-testid={`row-platform-${platform.id}`}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                        {platform.name.charAt(0)}
                      </div>
                      <div className="max-w-[250px]">
                        <p className="font-medium text-slate-900 dark:text-white truncate">{platform.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{platform.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {platform.location}, {platform.district}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {platform.keywords.slice(0, 2).map((kw, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-normal">
                          {kw}
                        </Badge>
                      ))}
                      {platform.keywords.length > 2 && (
                        <Badge variant="secondary" className="text-xs font-normal">
                          +{platform.keywords.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{platform.resourceCount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={platform.status === "Active" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }
                    >
                      {platform.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
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
                        <DropdownMenuItem className="gap-2" onClick={() => openEditDialog(platform)}>
                          <Pencil className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          View on Site
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => handleDelete(platform.id)}>
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
            <span>Showing {filteredPlatforms.length} of {platforms.length} platforms</span>
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
              {editingPlatform ? "Edit Platform" : "Add New Platform"}
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[calc(90vh-180px)]">
            <div className="px-6 py-6 space-y-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Building2 className="h-4 w-4 text-blue-500" />
                  Company Information
                </div>
                
                <div className="space-y-2">
                  <Label className="flex justify-between text-sm">
                    <span>Platform Name <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground">{formData.name.length}/35</span>
                  </Label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value.slice(0, 35) })}
                    placeholder="Enter platform name"
                    maxLength={35}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex justify-between text-sm">
                    <span>Platform Description <span className="text-red-500">*</span></span>
                    <span className="text-xs text-muted-foreground">{formData.description.length}/100</span>
                  </Label>
                  <Textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value.slice(0, 100) })}
                    placeholder="Describe your platform"
                    maxLength={100}
                    className="min-h-[100px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Company Location</Label>
                    <Select 
                      value={formData.location} 
                      onValueChange={(v) => setFormData({ ...formData, location: v, district: "" })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">District</Label>
                    <Select 
                      value={formData.district} 
                      onValueChange={(v) => setFormData({ ...formData, district: v })}
                      disabled={!formData.location}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {(DISTRICTS[formData.location] || []).map(d => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Established Date
                  </Label>
                  <Input 
                    type="date"
                    value={formData.establishedDate}
                    onChange={(e) => setFormData({ ...formData, establishedDate: e.target.value })}
                    className="max-w-[200px]"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <ExternalLink className="h-4 w-4 text-blue-500" />
                  Social Links
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      LinkedIn URL
                    </Label>
                    <Input 
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <Twitter className="h-4 w-4 text-sky-500" />
                      Twitter URL
                    </Label>
                    <Input 
                      value={formData.twitterUrl}
                      onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub URL
                    </Label>
                    <Input 
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-indigo-500" />
                      Discord URL
                    </Label>
                    <Input 
                      value={formData.discordUrl}
                      onChange={(e) => setFormData({ ...formData, discordUrl: e.target.value })}
                      placeholder="https://discord.gg/..."
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Send className="h-4 w-4 text-sky-400" />
                    Telegram URL
                  </Label>
                  <Input 
                    value={formData.telegramUrl}
                    onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
                    placeholder="https://t.me/..."
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Contact Information
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">
                      Contact Email <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      placeholder="email@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Contact Phone</Label>
                    <Input 
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      placeholder="02-1234-5678"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between text-sm">
                  <span>Keywords <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground">{formData.keywords.length}/5</span>
                </Label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[44px]">
                  {formData.keywords.map((keyword, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {keyword}
                      <button 
                        type="button" 
                        onClick={() => removeKeyword(keyword)}
                        className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  {formData.keywords.length < 5 && (
                    <Input 
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder={formData.keywords.length === 0 ? "Type keyword and press Enter" : "Add more..."}
                      className="flex-1 min-w-[120px] h-7 border-0 bg-transparent p-0 focus-visible:ring-0 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addKeyword();
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
              disabled={!formData.name || !formData.description || !formData.contactEmail}
            >
              {editingPlatform ? "Save Changes" : "Add Platform"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
