import { useState } from "react";
import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RESOURCES } from "@/lib/data";
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
  ExternalLink,
  Database,
  Link2,
  Image as ImageIcon,
  Layers,
  Tag,
  FileText,
  Star,
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
  const [modalTab, setModalTab] = useState<'info' | 'activity'>('info');
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    location: "",
    websiteUrl: "",
    representativeEmail: "",
    establishedDate: "",
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "",
    discordUrl: "",
    telegramUrl: "",
    contactEmail: "",
    contactPhone: "",
    keywords: [] as string[],
    linkedResources: [] as string[],
    activityHistory: [] as { date: string; title: string; description: string }[],
    bannerImage: "",
    bannerText: "",
    bannerSubtitle: "",
    mainTitle: "",
    mainText: "",
    features: [] as { image: string; title: string; text: string }[],
  });
  const [keywordInput, setKeywordInput] = useState("");
  const [resourceSearchQuery, setResourceSearchQuery] = useState("");

  const EMPTY_FORM = {
    name: "", description: "", logo: "", location: "", websiteUrl: "",
    representativeEmail: "", establishedDate: "", linkedinUrl: "", twitterUrl: "",
    githubUrl: "", discordUrl: "", telegramUrl: "", contactEmail: "", contactPhone: "",
    keywords: [] as string[], linkedResources: [] as string[],
    activityHistory: [] as { date: string; title: string; description: string }[],
    bannerImage: "", bannerText: "", bannerSubtitle: "", mainTitle: "", mainText: "",
    features: [] as { image: string; title: string; text: string }[],
  };

  const openAddDialog = () => {
    setEditingPlatform(null);
    setFormData(EMPTY_FORM);
    setResourceSearchQuery("");
    setModalTab('info');
    setIsDialogOpen(true);
  };

  const openEditDialog = (platform: Platform) => {
    setEditingPlatform(platform);
    setFormData({
      ...EMPTY_FORM,
      name: platform.name,
      description: platform.description,
      logo: (platform as any).logo || "",
      location: platform.location,
      websiteUrl: (platform as any).websiteUrl || "",
      representativeEmail: (platform as any).representativeEmail || "",
      establishedDate: platform.establishedDate,
      linkedinUrl: platform.linkedinUrl,
      twitterUrl: platform.twitterUrl,
      githubUrl: platform.githubUrl,
      discordUrl: platform.discordUrl,
      telegramUrl: platform.telegramUrl,
      contactEmail: platform.contactEmail,
      contactPhone: platform.contactPhone,
      keywords: platform.keywords,
      activityHistory: (platform as any).activityHistory || [],
      bannerImage: (platform as any).bannerImage || "",
      bannerText: (platform as any).bannerText || "",
      bannerSubtitle: (platform as any).bannerSubtitle || "",
      mainTitle: (platform as any).mainTitle || "",
      mainText: (platform as any).mainText || "",
      features: (platform as any).features || [],
    });
    setResourceSearchQuery("");
    setModalTab('info');
    setIsDialogOpen(true);
  };

  const toggleResource = (resourceId: string) => {
    if (formData.linkedResources.includes(resourceId)) {
      setFormData({ ...formData, linkedResources: formData.linkedResources.filter(id => id !== resourceId) });
    } else {
      setFormData({ ...formData, linkedResources: [...formData.linkedResources, resourceId] });
    }
  };

  const filteredAvailableResources = RESOURCES.filter(r => 
    r.title.toLowerCase().includes(resourceSearchQuery.toLowerCase()) ||
    r.provider.toLowerCase().includes(resourceSearchQuery.toLowerCase())
  );

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
            <div className="px-6 py-6 space-y-5">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Building2 className="h-4 w-4 text-blue-500" />
                  Company Information
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label className="text-sm">Company Logo</Label>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden">
                      {formData.logo ? (
                        <img src={formData.logo} alt="Logo preview" className="w-full h-full object-cover" />
                      ) : (
                        <Building2 className="h-8 w-8 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <Input 
                        type="file"
                        accept="image/*"
                        className="text-sm"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFormData({ ...formData, logo: reader.result as string });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <p className="text-xs text-muted-foreground">PNG, JPG, SVG. Max 2MB. Recommended: 200x200px</p>
                    </div>
                  </div>
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
                    <Input 
                      value={formData.location} 
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Seoul, Korea"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Website URL</Label>
                    <Input 
                      value={formData.websiteUrl} 
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Representative Email (대표 이메일)</Label>
                  <Input 
                    type="email"
                    value={formData.representativeEmail} 
                    onChange={(e) => setFormData({ ...formData, representativeEmail: e.target.value })}
                    placeholder="contact@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    작성일
                  </Label>
                  <Input 
                    type="date"
                    value={formData.establishedDate}
                    onChange={(e) => setFormData({ ...formData, establishedDate: e.target.value })}
                    className="max-w-[200px]"
                  />
                </div>
              </div>

              {/* ── 2. Social Links ── */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <ExternalLink className="h-4 w-4 text-blue-500" />
                  Social Links
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2"><Linkedin className="h-4 w-4 text-blue-600" />LinkedIn URL</Label>
                    <Input value={formData.linkedinUrl} onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })} placeholder="https://linkedin.com/..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2"><Twitter className="h-4 w-4 text-sky-500" />Twitter URL</Label>
                    <Input value={formData.twitterUrl} onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })} placeholder="https://twitter.com/..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2"><Github className="h-4 w-4" />GitHub URL</Label>
                    <Input value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-2"><MessageCircle className="h-4 w-4 text-indigo-500" />Discord URL</Label>
                    <Input value={formData.discordUrl} onChange={(e) => setFormData({ ...formData, discordUrl: e.target.value })} placeholder="https://discord.gg/..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm flex items-center gap-2"><Send className="h-4 w-4 text-sky-400" />Telegram URL</Label>
                  <Input value={formData.telegramUrl} onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })} placeholder="https://t.me/..." />
                </div>
              </div>

              {/* ── 3. Contact Information ── */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
                  <ExternalLink className="h-4 w-4" />
                  Contact Information
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Contact Email <span className="text-red-500">*</span></Label>
                    <Input type="email" value={formData.contactEmail} onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })} placeholder="email@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Contact Phone</Label>
                    <Input value={formData.contactPhone} onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })} placeholder="02-1234-5678" />
                  </div>
                </div>
              </div>

              {/* ── 4. Keywords ── */}
              <div className="space-y-3">
                <Label className="flex justify-between text-sm">
                  <span className="flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" />Keywords <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground">{formData.keywords.length}/5</span>
                </Label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-800 min-h-[44px]">
                  {formData.keywords.map((keyword, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {keyword}
                      <button type="button" onClick={() => removeKeyword(keyword)} className="hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full p-0.5 transition-colors">
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
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); } }}
                    />
                  )}
                </div>
              </div>

              {/* ── Tab Switcher ── */}
              <div className="border-b border-slate-200 dark:border-slate-700">
                <div className="flex gap-0">
                  {[
                    { key: 'info', label: '정보', icon: FileText },
                    { key: 'activity', label: '주요 활동', icon: Layers },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setModalTab(key as 'info' | 'activity')}
                      className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold border-b-2 transition-colors ${
                        modalTab === key
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                          : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Tab: 정보 ── */}
              {modalTab === 'info' && (
                <div className="space-y-5">
                  {/* Banner section */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <ImageIcon className="h-4 w-4 text-purple-500" />
                      배너 설정
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">배너 이미지 URL</Label>
                      <div className="flex gap-2">
                        <Input
                          value={formData.bannerImage}
                          onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                          placeholder="https://... 이미지 URL 또는 업로드"
                          className="flex-1"
                        />
                      </div>
                      {formData.bannerImage && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 h-28 bg-slate-100 dark:bg-slate-800">
                          <img src={formData.bannerImage} alt="배너 미리보기" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">배너 텍스트</Label>
                        <Input value={formData.bannerText} onChange={(e) => setFormData({ ...formData, bannerText: e.target.value })} placeholder="배너에 표시될 주요 문구" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">배너 서브타이틀</Label>
                        <Input value={formData.bannerSubtitle} onChange={(e) => setFormData({ ...formData, bannerSubtitle: e.target.value })} placeholder="배너 보조 설명 문구" />
                      </div>
                    </div>
                  </div>

                  {/* Main content section */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <FileText className="h-4 w-4 text-indigo-500" />
                      메인 콘텐츠
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">메인 제목</Label>
                      <Input value={formData.mainTitle} onChange={(e) => setFormData({ ...formData, mainTitle: e.target.value })} placeholder="페이지 메인 제목" />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex justify-between text-sm">
                        <span>메인 텍스트</span>
                        <span className="text-xs text-muted-foreground">{formData.mainText.length}/500</span>
                      </Label>
                      <Textarea
                        value={formData.mainText}
                        onChange={(e) => setFormData({ ...formData, mainText: e.target.value.slice(0, 500) })}
                        placeholder="서비스 소개 본문 텍스트를 입력하세요..."
                        className="min-h-[100px] resize-none text-sm"
                        maxLength={500}
                      />
                    </div>
                  </div>

                  {/* Features section */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Star className="h-4 w-4 text-amber-500" />
                        주요 특징 <span className="text-xs font-normal text-muted-foreground ml-1">({formData.features.length}/6)</span>
                      </div>
                      {formData.features.length < 6 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1 h-7 text-xs"
                          onClick={() => setFormData({ ...formData, features: [...formData.features, { image: "", title: "", text: "" }] })}
                        >
                          <Plus className="h-3 w-3" /> 특징 추가
                        </Button>
                      )}
                    </div>
                    {formData.features.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground text-sm">
                        "특징 추가"를 클릭하여 주요 특징을 입력하세요. (최대 6개)
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.features.map((feat, idx) => (
                          <div key={idx} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-muted-foreground">특징 #{idx + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                                onClick={() => setFormData({ ...formData, features: formData.features.filter((_, i) => i !== idx) })}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">이미지 URL</Label>
                              <div className="flex gap-2 items-start">
                                <Input
                                  value={feat.image}
                                  onChange={(e) => {
                                    const updated = [...formData.features];
                                    updated[idx] = { ...updated[idx], image: e.target.value };
                                    setFormData({ ...formData, features: updated });
                                  }}
                                  placeholder="https://... 특징 이미지 URL"
                                  className="h-8 text-sm flex-1"
                                />
                                {feat.image && (
                                  <div className="h-8 w-8 rounded border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 bg-slate-100">
                                    <img src={feat.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs">특징 제목</Label>
                                <Input
                                  value={feat.title}
                                  onChange={(e) => {
                                    const updated = [...formData.features];
                                    updated[idx] = { ...updated[idx], title: e.target.value };
                                    setFormData({ ...formData, features: updated });
                                  }}
                                  placeholder="특징 제목"
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs">특징 텍스트</Label>
                                <Input
                                  value={feat.text}
                                  onChange={(e) => {
                                    const updated = [...formData.features];
                                    updated[idx] = { ...updated[idx], text: e.target.value };
                                    setFormData({ ...formData, features: updated });
                                  }}
                                  placeholder="특징 설명"
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Tab: 주요 활동 ── */}
              {modalTab === 'activity' && (
                <div className="space-y-5">
                  {/* Activity History */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        <Calendar className="h-4 w-4 text-indigo-500" />
                        Activity History
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1 h-7 text-xs"
                        onClick={() => setFormData({ ...formData, activityHistory: [...formData.activityHistory, { date: "", title: "", description: "" }] })}
                      >
                        <Plus className="h-3 w-3" /> Add Activity
                      </Button>
                    </div>
                    {formData.activityHistory.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground text-sm">
                        No activity history yet. Click "Add Activity" to add milestones.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {formData.activityHistory.map((activity, index) => (
                          <div key={index} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-muted-foreground">Activity #{index + 1}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setFormData({ ...formData, activityHistory: formData.activityHistory.filter((_, i) => i !== index) })}
                                className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <Label className="text-xs">Date</Label>
                                <Input
                                  type="month"
                                  value={activity.date}
                                  onChange={(e) => {
                                    const updated = [...formData.activityHistory];
                                    updated[index] = { ...updated[index], date: e.target.value };
                                    setFormData({ ...formData, activityHistory: updated });
                                  }}
                                  className="h-8 text-sm"
                                />
                              </div>
                              <div className="col-span-2 space-y-1">
                                <Label className="text-xs">Title</Label>
                                <Input
                                  value={activity.title}
                                  onChange={(e) => {
                                    const updated = [...formData.activityHistory];
                                    updated[index] = { ...updated[index], title: e.target.value };
                                    setFormData({ ...formData, activityHistory: updated });
                                  }}
                                  placeholder="e.g., Released API v2.0"
                                  className="h-8 text-sm"
                                />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-xs">Description</Label>
                              <Input
                                value={activity.description}
                                onChange={(e) => {
                                  const updated = [...formData.activityHistory];
                                  updated[index] = { ...updated[index], description: e.target.value };
                                  setFormData({ ...formData, activityHistory: updated });
                                }}
                                placeholder="Brief description of the milestone..."
                                className="h-8 text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Linked Resources */}
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                        <Link2 className="h-4 w-4" />
                        Linked Resources
                      </div>
                      <Badge variant="secondary" className="text-xs">{formData.linkedResources.length} selected</Badge>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search resources..." className="pl-9 bg-white dark:bg-slate-900" value={resourceSearchQuery} onChange={(e) => setResourceSearchQuery(e.target.value)} />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto space-y-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-2">
                      {filteredAvailableResources.slice(0, 10).map((resource) => (
                        <div
                          key={resource.id}
                          className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                            formData.linkedResources.includes(resource.id)
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'
                          }`}
                          onClick={() => toggleResource(resource.id)}
                        >
                          <Checkbox checked={formData.linkedResources.includes(resource.id)} className="pointer-events-none" />
                          <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                            <Database className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">{resource.provider} • {resource.type}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs shrink-0">{resource.price}</Badge>
                        </div>
                      ))}
                      {filteredAvailableResources.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No resources found</p>
                      )}
                    </div>
                    {formData.linkedResources.length > 0 && (
                      <div className="pt-2 border-t border-indigo-200 dark:border-indigo-700">
                        <p className="text-xs text-muted-foreground mb-2">Selected resources:</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.linkedResources.map((resourceId) => {
                            const resource = RESOURCES.find(r => r.id === resourceId);
                            return resource ? (
                              <Badge key={resourceId} variant="secondary" className="gap-1 pr-1">
                                {resource.title}
                                <button type="button" onClick={() => toggleResource(resourceId)} className="hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full p-0.5 ml-1">
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
