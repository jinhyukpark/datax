import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Eye, CheckCircle, XCircle, Clock, FileText, AlertCircle, 
  ExternalLink, Github, Linkedin, Twitter, MessageSquare, Send, Globe, Edit,
  Server, Activity, Terminal, Settings, FileSignature, Power,
  Plus, Trash2, BookOpen, DollarSign, Code, ChevronDown, ChevronUp
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { GeneralRequestDetails } from "@/components/general-request-details";
import { HostedRequestDetails } from "@/components/hosted-request-details";
import { ServiceReviewsDialog } from "@/components/service-reviews-dialog";
import { HostedServiceManage } from "@/components/hosted-service-manage";
import { HostedServiceLogs } from "@/components/hosted-service-logs";
import { ContractDetailsDialog } from "@/components/contract-details-dialog";

import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function LinkedDocumentationTab() {
  const docCardAccents = ['green', 'orange', 'blue', 'purple', 'pink'] as const;
  const docCardAccentStyles: Record<string, { border: string; badge: string; iconBg: string }> = {
    green: { border: 'border-green-200 dark:border-green-800', badge: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400', iconBg: 'bg-green-100 dark:bg-green-900/40' },
    orange: { border: 'border-orange-200 dark:border-orange-800', badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400', iconBg: 'bg-orange-100 dark:bg-orange-900/40' },
    blue: { border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400', iconBg: 'bg-blue-100 dark:bg-blue-900/40' },
    purple: { border: 'border-purple-200 dark:border-purple-800', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400', iconBg: 'bg-purple-100 dark:bg-purple-900/40' },
    pink: { border: 'border-pink-200 dark:border-pink-800', badge: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400', iconBg: 'bg-pink-100 dark:bg-pink-900/40' },
  };

  const [officialDocCards, setOfficialDocCards] = useState([
    {
      id: 'chatgpt',
      label: 'ChatGPT',
      imageUrl: '',
      title: 'ChatGPT MCP 공식 가이드',
      subtitle: 'ChatGPT에서 MCP 서버를 연결하는 방법을 OpenAI 공식 문서에서 확인하세요.',
      link: 'https://platform.openai.com/docs/guides/tools-remote-mcp',
      accentColor: 'green',
      emoji: '🤖',
    },
    {
      id: 'claude',
      label: 'Claude',
      imageUrl: '',
      title: 'Claude MCP 공식 가이드',
      subtitle: 'Claude에서 MCP 서버를 설정하는 방법을 Anthropic 공식 문서에서 확인하세요.',
      link: 'https://docs.anthropic.com/en/docs/agents-and-tools/mcp',
      accentColor: 'orange',
      emoji: '🧠',
    },
  ]);

  const updateOfficialDocCard = (id: string, field: string, value: string) => {
    setOfficialDocCards(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const handleDocCardImage = (id: string, file: File) => {
    const url = URL.createObjectURL(file);
    setOfficialDocCards(prev => prev.map(c => c.id === id ? { ...c, imageUrl: url } : c));
  };

  const addOfficialDocCard = () => {
    setOfficialDocCards(prev => [...prev, {
      id: `card-${Date.now()}`,
      label: '',
      imageUrl: '',
      title: '',
      subtitle: '',
      link: '',
      accentColor: docCardAccents[prev.length % docCardAccents.length],
      emoji: '🔗',
    }]);
  };

  const removeOfficialDocCard = (id: string) => {
    setOfficialDocCards(prev => prev.filter(c => c.id !== id));
  };
  const [apiDefinitions, setApiDefinitions] = useState([
    { id: 1, name: "get_genre_list", description: "사용 가능한 모든 공연 장르 코드와 이름을 조회합니다.", params: [] as { name: string; type: string }[] },
    { id: 2, name: "search_events_by_location", description: "특정 지역과 기간의 공연을 검색합니다.", params: [
      { name: "genreCode", type: "string" }, { name: "startDate", type: "string" }, { name: "endDate", type: "string" },
      { name: "sidoCode", type: "string" }, { name: "gugunCode", type: "string" }, { name: "limit", type: "number" }
    ] },
  ]);
  const [nextApiId, setNextApiId] = useState(3);
  const [fullDocEnabled, setFullDocEnabled] = useState(true);
  const [fullDocDescription, setFullDocDescription] = useState("Complete API reference and integration guides.");
  const [fullDocButtonText, setFullDocButtonText] = useState("View Documentation");
  const [fullDocUrl, setFullDocUrl] = useState("https://docs.example.com");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b">
        <BookOpen className="h-5 w-5 text-indigo-600" />
        <div>
          <h3 className="font-bold text-lg">Quick Start Guide</h3>
          <p className="text-xs text-muted-foreground">공식 가이드 링크 카드의 이미지·제목·부제목·링크를 설정하세요.</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Fixed notice bar (display only) */}
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-800/40 px-5 py-3.5">
          <Terminal className="h-4 w-4 text-slate-400 shrink-0" />
          <p className="text-sm text-slate-500 dark:text-slate-400">자세한 MCP 연동 방법은 아래 공식 가이드를 통해 확인해 주시길 바랍니다.</p>
          <Badge variant="secondary" className="ml-auto text-[10px] shrink-0">고정 문구</Badge>
        </div>

        {/* Official Doc Link Cards Editor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {officialDocCards.map((card) => (
            <div key={card.id} className={`rounded-xl border-2 ${docCardAccentStyles[card.accentColor]?.border || docCardAccentStyles.green.border} bg-white dark:bg-slate-900 p-5 space-y-4`}>
              <div className="flex items-center gap-2 mb-1">
                <Input
                  value={card.label}
                  onChange={(e) => updateOfficialDocCard(card.id, 'label', e.target.value)}
                  className={`h-6 w-28 text-xs font-semibold px-2 py-0.5 rounded-full border-none focus-visible:ring-1 ${docCardAccentStyles[card.accentColor]?.badge || docCardAccentStyles.green.badge}`}
                  placeholder="플랫폼명"
                  data-testid={`input-doc-card-label-${card.id}`}
                />
                <span className="text-slate-400 text-xs">공식 가이드 카드</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-auto text-slate-300 hover:text-red-500"
                  onClick={() => removeOfficialDocCard(card.id)}
                  data-testid={`button-doc-card-remove-${card.id}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Image upload */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-500">이미지</Label>
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden ${docCardAccentStyles[card.accentColor]?.iconBg || docCardAccentStyles.green.iconBg}`}>
                    {card.imageUrl ? (
                      <img src={card.imageUrl} alt="icon" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xl">{card.emoji}</span>
                    )}
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 hover:border-slate-400 transition-colors text-sm text-slate-500">
                      <Plus className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{card.imageUrl ? '이미지 변경' : '이미지 첨부'}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleDocCardImage(card.id, file);
                      }}
                      data-testid={`input-doc-card-image-${card.id}`}
                    />
                  </label>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-500">대제목</Label>
                <Input
                  value={card.title}
                  onChange={(e) => updateOfficialDocCard(card.id, 'title', e.target.value)}
                  className="text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  placeholder="카드 대제목을 입력하세요"
                  data-testid={`input-doc-card-title-${card.id}`}
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-500">부제목</Label>
                <Textarea
                  value={card.subtitle}
                  onChange={(e) => updateOfficialDocCard(card.id, 'subtitle', e.target.value)}
                  className="text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 min-h-[60px] resize-none"
                  placeholder="카드 부제목을 입력하세요"
                  data-testid={`textarea-doc-card-subtitle-${card.id}`}
                />
              </div>

              {/* Link */}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-slate-500">링크 URL</Label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <Input
                    value={card.link}
                    onChange={(e) => updateOfficialDocCard(card.id, 'link', e.target.value)}
                    className="text-sm pl-8 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-mono"
                    placeholder="https://..."
                    data-testid={`input-doc-card-link-${card.id}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Card Button */}
        <Button
          variant="outline"
          className="w-full border-dashed gap-2"
          onClick={addOfficialDocCard}
          data-testid="button-add-doc-card"
        >
          <Plus className="h-4 w-4" /> 가이드 카드 추가
        </Button>
      </div>

      {/* API Definitions Section */}
      <div className="space-y-4 mt-8">
        <div className="flex items-center gap-3 pb-3 border-b">
          <Code className="h-5 w-5 text-slate-700" />
          <h3 className="font-bold text-lg">API Definitions</h3>
        </div>

        {apiDefinitions.map((api) => (
          <div key={api.id} className="bg-slate-900 rounded-xl p-5 space-y-4 text-white">
            <div className="flex items-center justify-between">
              <Input
                value={api.name}
                onChange={(e) => setApiDefinitions(defs => defs.map(d => d.id === api.id ? { ...d, name: e.target.value } : d))}
                className="font-mono font-bold text-white bg-transparent border-slate-700 text-base"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-red-400"
                onClick={() => setApiDefinitions(defs => defs.filter(d => d.id !== api.id))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-slate-400 font-medium">용도</Label>
              <Textarea
                value={api.description}
                onChange={(e) => setApiDefinitions(defs => defs.map(d => d.id === api.id ? { ...d, description: e.target.value } : d))}
                placeholder="API 용도를 설명하세요..."
                className="bg-slate-800 border-slate-700 text-slate-200 min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-slate-400 font-medium">파라미터</Label>
              <div className="flex flex-wrap gap-2">
                {api.params.map((param, pIdx) => (
                  <span key={pIdx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-700 rounded-full text-xs font-mono">
                    {param.name}: {param.type}
                    <button
                      className="ml-1 hover:text-red-400"
                      onClick={() => setApiDefinitions(defs => defs.map(d => {
                        if (d.id === api.id) {
                          return { ...d, params: d.params.filter((_, i) => i !== pIdx) };
                        }
                        return d;
                      }))}
                    >
                      <XCircle className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
                <button
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                  onClick={() => {
                    const paramName = prompt("Parameter name:");
                    if (paramName) {
                      const paramType = prompt("Parameter type (string, number, boolean):", "string") || "string";
                      setApiDefinitions(defs => defs.map(d => {
                        if (d.id === api.id) {
                          return { ...d, params: [...d.params, { name: paramName, type: paramType }] };
                        }
                        return d;
                      }));
                    }
                  }}
                >
                  <Plus className="h-3.5 w-3.5" /> Add Param
                </button>
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          className="w-full border-dashed gap-2"
          onClick={() => {
            setApiDefinitions([...apiDefinitions, { id: nextApiId, name: "new_api_function", description: "", params: [] }]);
            setNextApiId(nextApiId + 1);
          }}
        >
          <Plus className="h-4 w-4" /> Add API
        </Button>
      </div>

      <div className="border rounded-xl p-4 space-y-3 mt-6">
        <div className="flex items-center justify-between">
          <h4 className="font-bold">Full Documentation</h4>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${fullDocEnabled ? 'text-green-600' : 'text-slate-400'}`}>
              {fullDocEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <Switch checked={fullDocEnabled} onCheckedChange={setFullDocEnabled} />
          </div>
        </div>
        {fullDocEnabled ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Description</Label>
              <Textarea value={fullDocDescription} onChange={(e) => setFullDocDescription(e.target.value)} className="min-h-[60px]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs text-slate-500">Button Text</Label>
                <Input value={fullDocButtonText} onChange={(e) => setFullDocButtonText(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-slate-500">Documentation URL</Label>
                <Input value={fullDocUrl} onChange={(e) => setFullDocUrl(e.target.value)} />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Full documentation is disabled.</p>
        )}
      </div>
    </div>
  );
}

function LinkedPricingTab() {
  const [pricingType, setPricingType] = useState<"Paid" | "Free">("Paid");
  const [plans, setPlans] = useState([
    { id: 1, name: "Starter", price: "29", features: ["1,000 Requests", "Standard Support", "Basic Analytics"], recommended: false },
    { id: 2, name: "Pro", price: "78", features: ["50,000 Requests", "Priority Support", "Advanced Analytics", "SLA Guarantee"], recommended: true },
    { id: 3, name: "Enterprise", price: "127", features: ["Unlimited Requests", "Priority Support", "Advanced Analytics", "SLA Guarantee", "Custom Integration"], recommended: false },
  ]);
  const [nextPlanId, setNextPlanId] = useState(4);

  const addPlan = () => {
    setPlans([...plans, { id: nextPlanId, name: "New Plan", price: "0", features: ["Feature 1"], recommended: false }]);
    setNextPlanId(nextPlanId + 1);
  };

  const removePlan = (id: number) => setPlans(plans.filter(p => p.id !== id));

  const updatePlan = (id: number, field: string, value: any) => setPlans(plans.map(p => p.id === id ? { ...p, [field]: value } : p));

  const addFeature = (planId: number) => {
    setPlans(plans.map(p => p.id === planId ? { ...p, features: [...p.features, ""] } : p));
  };

  const updateFeature = (planId: number, fIdx: number, value: string) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        const newFeatures = [...p.features];
        newFeatures[fIdx] = value;
        return { ...p, features: newFeatures };
      }
      return p;
    }));
  };

  const removeFeature = (planId: number, fIdx: number) => {
    setPlans(plans.map(p => {
      if (p.id === planId) {
        return { ...p, features: p.features.filter((_, i) => i !== fIdx) };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">Pricing Policy</h3>
          <p className="text-sm text-muted-foreground">Choose between paid plans or a free service model.</p>
        </div>
        <div className="flex rounded-lg border overflow-hidden">
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${pricingType === 'Paid' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setPricingType('Paid')}
          >
            Paid Plans
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${pricingType === 'Free' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setPricingType('Free')}
          >
            Free Forever
          </button>
        </div>
      </div>

      {pricingType === 'Paid' ? (
        <>
          <div className="flex justify-end">
            <Button variant="outline" className="gap-2" onClick={addPlan}>
              <Plus className="h-4 w-4" /> Add Plan
            </Button>
          </div>
          <p className="text-sm text-indigo-600 italic">Define your pricing plans. You can add or remove plans as needed.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan.id} className={`border-2 rounded-xl p-4 space-y-4 relative ${plan.recommended ? 'border-indigo-500' : 'border-slate-200'}`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-indigo-600 text-white text-xs">MOST POPULAR</Badge>
                  </div>
                )}
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-slate-400 hover:text-red-500" onClick={() => removePlan(plan.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Plan Name</Label>
                  <Input value={plan.name} onChange={(e) => updatePlan(plan.id, 'name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Monthly Price ($)</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-400">$</span>
                    <Input value={plan.price} onChange={(e) => updatePlan(plan.id, 'price', e.target.value)} className="text-lg font-bold" />
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Features</Label>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                      <Input 
                        value={feature} 
                        onChange={(e) => updateFeature(plan.id, fIdx, e.target.value)}
                        className="h-8 text-sm"
                      />
                      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-slate-400 hover:text-red-500" onClick={() => removeFeature(plan.id, fIdx)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <button className="text-xs text-indigo-600 font-medium hover:underline" onClick={() => addFeature(plan.id)}>
                    + Add Feature
                  </button>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  <Checkbox 
                    checked={plan.recommended} 
                    onCheckedChange={(checked) => updatePlan(plan.id, 'recommended', !!checked)}
                  />
                  <Label className="text-sm">Recommended Plan</Label>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center space-y-3 bg-green-50/50">
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h4 className="font-bold text-lg text-green-800">Free Forever</h4>
          <p className="text-sm text-green-700 max-w-md mx-auto">
            This resource is part of the open data initiative and is free to use for both personal and commercial projects.
          </p>
        </div>
      )}
    </div>
  );
}

// Mock Approved Hosted Services with Owner info (from hosted-services.tsx)
const HOSTED_SERVICES_MOCK = [
  {
    id: "ha1",
    title: "Global Weather Historical Data",
    description: "Complete historical weather data from major global stations (1980-2024).",
    status: "Active",
    endpoint: "https://api.platform.com/v1/weather",
    region: "US-East (N. Virginia)",
    pricing: "Paid",
    uptime: "99.99%",
    nextBilling: "2026-01-20",
    type: "DATA",
    owner: "Climate Data Org",
    ownerEmail: "data@climate.example.org"
  },
  {
    id: "ha2",
    title: "Bio-Medical Research Corpus",
    description: "Annotated corpus for biomedical NLP research and training.",
    status: "Active",
    endpoint: "https://api.platform.com/v1/biomed",
    region: "Asia-Pacific (Seoul)",
    pricing: "Paid",
    uptime: "99.95%",
    nextBilling: "2026-01-15",
    type: "AGENT",
    owner: "MedAI Systems",
    ownerEmail: "contact@medai.example.com"
  },
  {
    id: "ha3",
    title: "Stock Market Tick Stream",
    description: "Real-time stock market data stream via WebSocket.",
    status: "Active",
    endpoint: "wss://api.platform.com/v1/stream",
    region: "US-West (Oregon)",
    pricing: "Paid",
    uptime: "99.99%",
    nextBilling: "2026-01-25",
    type: "MCP",
    owner: "FinTech Global",
    ownerEmail: "tech@fintech.example.com"
  },
  {
    id: "ha4",
    title: "Smart Factory Sensor Grid",
    description: "IoT sensor data aggregation from manufacturing plants.",
    status: "Active",
    endpoint: "https://api.platform.com/v1/sensors",
    region: "Europe (Frankfurt)",
    pricing: "Free",
    uptime: "99.90%",
    nextBilling: "2026-02-01",
    type: "DATA",
    owner: "Tech Manufacturing",
    ownerEmail: "ops@techmfg.example.com"
  }
];

// Mock Submissions with detailed data
const MOCK_SUBMISSIONS = [
  { 
    id: 101, 
    title: "Smart Factory Sensor Data Set A", 
    provider: "Tech Manufacturing", 
    submittedAt: "2025-12-15", 
    status: "Reviewing", 
    type: "Dataset",
    serviceType: "Hosted",
    // Detailed fields
    description: "This dataset contains over 1TB of sensor readings from varying assembly line robots, including temperature, vibration, and power consumption metrics suitable for predictive maintenance models.",
    capacity: "1TB",
    updateFreq: "realtime",
    contactPerson: "John Tech",
    contactEmail: "contact@techmfg.example.com",
    contactPhone: "+1-555-0101",
    organization: "Tech Manufacturing Inc.",
    
    // Extra fields for compatibility if needed
    founder: "Tech Manufacturing Inc.",
    website: "https://techmfg.example.com",
    newReviews: 2,
    pricing: "Free",
  },
  { 
    id: 102, 
    title: "Logistics Optimization API", 
    provider: "LogiTech Solutions", 
    submittedAt: "2025-12-14", 
    status: "Submitted", 
    type: "API",
    serviceType: "Linked",
    description: "A powerful REST API that calculates the most efficient delivery routes considering traffic, vehicle capacity, and delivery windows.",
    founder: "LogiTech Team",
    website: "https://logitech.example.io",
    demoUrl: "",
    docUrl: "https://api.logitech.example.io",
    contactEmail: "dev@logitech.example.io",
    contactPhone: "+1-555-0102",
    newReviews: 0,
  },
  { 
    id: 103, 
    title: "Energy Consumption Patterns 2024", 
    provider: "Green Energy Co", 
    submittedAt: "2025-12-10", 
    status: "Approved", 
    type: "Report",
    serviceType: "Hosted",
    description: "Annual report detailing energy consumption patterns across major industrial sectors in 2024, with a focus on renewable energy adoption.",
    capacity: "500MB",
    updateFreq: "yearly",
    contactPerson: "Sarah Green",
    contactEmail: "research@greenenergy.example.org",
    contactPhone: "+1-555-0103",
    organization: "Green Energy Research",
    newReviews: 5,
    pricing: "Paid",
    price: "$299",
  },
  { 
    id: 104, 
    title: "Defect Detection AI Model", 
    provider: "Vision AI Labs", 
    submittedAt: "2025-12-08", 
    status: "Rejected", 
    type: "AI Model", 
    serviceType: "Linked",
    description: "Pre-trained YOLOv8 model fine-tuned on 50,000 images of printed circuit boards to detect common manufacturing defects.",
    founder: "Vision AI Labs",
    website: "https://visionai.example.net",
    demoUrl: "https://visionai.example.net/demo",
    docUrl: "",
    contactEmail: "support@visionai.example.net",
    reason: "Insufficient documentation provided.",
  },
  {
    id: 105,
    title: "Global Weather Historical Data",
    provider: "Climate Data Org",
    submittedAt: "2025-12-16",
    status: "Reviewing",
    type: "Dataset",
    serviceType: "Hosted",
    description: "Hosting request for 50TB of historical weather data from 1950-2024.",
    capacity: "50TB",
    updateFreq: "daily",
    contactPerson: "Dr. Climate",
    contactEmail: "data@climate.example.org",
    contactPhone: "+1-555-0105",
    organization: "Climate Data Org",
    pricing: "Paid",
    price: "$49",
  },
  {
    id: 106,
    title: "Medical Image Diagnostic Helper",
    provider: "MedAI Systems",
    submittedAt: "2025-12-10",
    status: "Submitted",
    type: "AI Agent",
    serviceType: "Linked",
    description: "AI agent that helps radiologists by pre-screening X-ray images for common abnormalities.",
    founder: "MedAI Systems",
    website: "https://medai.example.com",
    contactEmail: "contact@medai.example.com",
  }
];

function LinkedTryAskingTab() {
  const [questions, setQuestions] = useState<string[]>([
    "Find researchers specializing in renewable energy",
    "Who are the top AI researchers in Korea?",
    "Match me with experts in quantum computing",
    "Show scientists working on climate change solutions"
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-lg p-4">
        <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-300 mb-1">Info</h4>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Configure example questions that users can try with this AI Agent or MCP. These will be displayed on the service detail page to help users understand what the service can do.
        </p>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          <h3 className="font-bold text-base">Try Asking Questions</h3>
        </div>
        <p className="text-sm text-muted-foreground ml-7">Add example prompts users can try (max 5)</p>
      </div>

      {/* Preview */}
      <div className="rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40 border border-indigo-100 dark:border-indigo-900/50 p-5">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Preview</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Try asking...</h3>
            <p className="text-[10px] text-slate-500">Example conversations with this service</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {questions.filter(q => q.trim()).map((question, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                <span className="text-xs font-bold">{idx + 1}</span>
              </div>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">"{question}"</span>
            </div>
          ))}
          {questions.filter(q => q.trim()).length === 0 && (
            <p className="text-xs text-slate-400 italic col-span-2 text-center py-4">No questions added yet</p>
          )}
        </div>
      </div>

      {/* Editable List */}
      <div className="space-y-3">
        {questions.map((question, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 font-bold text-sm">
              {idx + 1}
            </div>
            <Input
              value={question}
              onChange={(e) => {
                const updated = [...questions];
                updated[idx] = e.target.value;
                setQuestions(updated);
              }}
              placeholder={`Enter example question ${idx + 1}`}
              className="flex-1 h-10"
              data-testid={`input-admin-linked-try-asking-${idx}`}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
              onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
              data-testid={`btn-remove-admin-linked-try-asking-${idx}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {questions.length < 5 && (
        <Button
          variant="outline"
          className="w-full border-dashed gap-2"
          onClick={() => setQuestions([...questions, ""])}
          data-testid="btn-add-admin-linked-try-asking"
        >
          <Plus className="h-4 w-4" /> Add Question
        </Button>
      )}
    </div>
  );
}

export default function SubmissionManagement() {
  const [submissions, setSubmissions] = useState<any[]>(MOCK_SUBMISSIONS);
  const [rejectDialog, setRejectDialog] = useState<{open: boolean, id: number | null}>({ open: false, id: null });
  const [rejectReason, setRejectReason] = useState("");
  const [viewDialog, setViewDialog] = useState<{open: boolean, item: typeof MOCK_SUBMISSIONS[0] | null, mode: 'all' | 'application' | 'details'}>({ open: false, item: null, mode: 'all' });
  const [reviewsDialog, setReviewsDialog] = useState<{open: boolean, item: typeof MOCK_SUBMISSIONS[0] | null}>({ open: false, item: null });
  
  // Hosted Services State
  const [hostedServices, setHostedServices] = useState(HOSTED_SERVICES_MOCK);
  const [contractDialog, setContractDialog] = useState<{open: boolean, service: typeof HOSTED_SERVICES_MOCK[0] | null}>({ open: false, service: null });

  // Alert Dialog State
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{title: string, description: string, action: () => void}>({
    title: "", description: "", action: () => {}
  });

  const handleStatusChange = (id: number, status: string, reason?: string) => {
    setSubmissions(submissions.map(item => 
      item.id === id ? { ...item, status, reason } : item
    ));
    
    if (status === 'Approved') toast.success(`Submission #${id} Approved`);
    if (status === 'Rejected') toast.success(`Submission #${id} Rejected`);
    
    // Close dialog if open
    if (viewDialog.open && viewDialog.item?.id === id) {
      setViewDialog({ open: false, item: null, mode: 'all' });
    }
  };

  const handleStopSubmission = (id: number) => {
    const submission = submissions.find(s => s.id === id);
    if (!submission) return;

    // Add to hostedServices as Stopped
    const newService = {
      id: `stopped-${submission.id}`,
      title: submission.title,
      description: submission.description,
      status: "Deactive", // Changed from Stopped
      endpoint: "https://api.platform.com/v1/stopped", // Mock
      region: "Unknown",
      pricing: submission.pricing || "Paid",
      uptime: "0%",
      nextBilling: "-",
      type: "DATA", // Default mapping
      owner: submission.provider,
      ownerEmail: submission.contactEmail || "unknown@example.com"
    };
    
    setHostedServices([...hostedServices, newService]);
    
    // Remove from submissions list
    setSubmissions(submissions.filter(s => s.id !== id));
    
    toast.success("Service deactivated and moved to Deactive Services tab");
  };

  const activeServices = hostedServices.filter(s => s.status === 'Active');
  const stoppedServices = hostedServices.filter(s => s.status === 'Deactive' || s.status === 'Stopped');

  const getServiceStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'Suspended': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Suspended</Badge>;
      case 'Stopped': return <Badge variant="secondary">Stopped</Badge>;
      case 'Maintenance': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getServiceTypeBadge = (type: string) => {
    switch(type) {
      case 'MCP': return <Badge className="bg-purple-100 text-purple-800 border-purple-200">MCP</Badge>;
      case 'DATA': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">DATA</Badge>;
      case 'AGENT': return <Badge className="bg-amber-100 text-amber-800 border-amber-200">AGENT</Badge>;
      default: return <Badge variant="outline">{type}</Badge>;
    }
  };

  const ServiceCard = ({ service, isStopped = false }: { service: typeof HOSTED_SERVICES_MOCK[0], isStopped?: boolean }) => (
    <Card className={`overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 ${isStopped ? 'opacity-75 grayscale hover:grayscale-0' : ''}`}>
      <div className="flex flex-col md:flex-row">
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold">{service.title}</h3>
              {getServiceTypeBadge(service.type)}
              {getServiceStatusBadge(service.status)}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-muted-foreground text-sm mb-2">{service.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Owner:</span>
              <span className="text-slate-600 dark:text-slate-400">{service.owner}</span>
              <span className="text-slate-400 text-xs">({service.ownerEmail})</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Endpoint</p>
              <div className="flex items-center gap-1 font-mono text-xs max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {service.endpoint}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Region</p>
              <p className="font-medium">{service.region}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Pricing</p>
              <p className={`font-medium ${service.pricing === 'Free' ? 'text-green-600' : ''}`}>{service.pricing}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Uptime (30d)</p>
              <p className="font-medium text-green-600 flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {service.uptime}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-900 p-6 flex flex-row md:flex-col justify-center gap-3 border-t md:border-t-0 md:border-l min-w-[180px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full gap-2" disabled={isStopped}>
                <Settings className="h-4 w-4" />
                Manage
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl h-[90vh] p-6">
              <HostedServiceManage data={service} />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full gap-2" disabled={isStopped}>
                <Terminal className="h-4 w-4" />
                View Logs
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none">
              <HostedServiceLogs serviceName={service.title} />
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            size="sm" 
            className="w-full gap-2"
            onClick={() => setContractDialog({ open: true, service: service })}
            disabled={isStopped}
          >
            <FileSignature className="h-4 w-4" />
            Contract
          </Button>

          {!isStopped && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/50">
                  <Power className="h-3 w-3 mr-2" />
                  Stop
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Stop Service?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will stop the service and move it to the Stopped Services tab. You can restart it later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleStopService(service.id)} className="bg-red-600 hover:bg-red-700">
                    Stop Service
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          
          <p className="text-[10px] text-muted-foreground text-center mt-auto">
            Next bill: {service.nextBilling}
          </p>
        </div>
      </div>
    </Card>
  );

  const handleApproveClick = (id: number) => {
    setAlertConfig({
      title: "Approve Submission",
      description: "Are you sure you want to approve this submission? This action will make the resource publicly available.",
      action: () => handleStatusChange(id, 'Approved')
    });
    setAlertOpen(true);
  };

  const confirmStopHosted = (id: number) => {
    setAlertConfig({
      title: "Deactivate Hosted Service",
      description: "Deactive 상태로 변경하면 연결된 서비스가 제대로 동작이 되질 않습니다.",
      action: () => handleStopSubmission(id)
    });
    setAlertOpen(true);
  };

  const handleStopService = (serviceId: string) => {
    setLinkedServices(prev => prev.map(s => 
      s.id === serviceId ? { ...s, status: "Stopped" } : s
    ));
    toast.success("Service stopped successfully");
  };

  const confirmReject = () => {
    if (rejectDialog.id && rejectReason) {
      setAlertConfig({
        title: "Reject Submission",
        description: "Are you sure you want to reject this submission? The provider will be notified with the rejection reason.",
        action: () => {
          handleStatusChange(rejectDialog.id!, 'Rejected', rejectReason);
          setRejectDialog({ open: false, id: null });
          setRejectReason("");
        }
      });
      setAlertOpen(true);
    } else {
      toast.error("Please provide a rejection reason");
    }
  };

  const handleReviewingClick = (id: number) => {
    const submission = submissions.find(s => s.id === id);
    if (submission && submission.status === 'Approved') {
      setAlertConfig({
        title: "Set to Reviewing",
        description: "Warning: Changing status from 'Approved' to 'Reviewing' will make this service invisible to users. Are you sure you want to proceed?",
        action: () => handleStatusChange(id, 'Reviewing')
      });
      setAlertOpen(true);
    } else {
      handleStatusChange(id, 'Reviewing');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approved': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'Rejected': return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      case 'Reviewing': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Reviewing</Badge>;
      default: return <Badge variant="secondary">Submitted</Badge>;
    }
  };

  const renderDashboard = (serviceType: string) => {
    const filteredSubmissions = submissions.filter(s => s.serviceType === serviceType);
    
    // Metrics
    const totalSubmissions = filteredSubmissions.length;
    const pendingReviews = filteredSubmissions.filter(s => s.status === 'Submitted' || s.status === 'Reviewing').length;
    const approved = filteredSubmissions.filter(s => s.status === 'Approved').length;
    const rejected = filteredSubmissions.filter(s => s.status === 'Rejected').length;

    const submissionContent = (
      <div className="space-y-6">
        {/* Metrics Section */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSubmissions}</div>
              <p className="text-xs text-muted-foreground">For {serviceType} Service</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReviews}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approved}</div>
              <p className="text-xs text-muted-foreground">High quality assets</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejected}</div>
              <p className="text-xs text-muted-foreground">Did not meet criteria</p>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Table */}
        <div className="rounded-md border bg-white dark:bg-slate-900">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resource Title</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Type</TableHead>
                {serviceType === 'Hosted' && <TableHead>Pricing</TableHead>}
                <TableHead>Submitted Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No submissions found for {serviceType} service.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubmissions.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.provider}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    {serviceType === 'Hosted' && (
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={`font-medium ${item.pricing === 'Free' ? 'text-green-600' : 'text-blue-600'}`}>
                            {item.pricing || 'Paid'}
                          </span>
                          {item.pricing === 'Paid' && item.price && (
                             <span className="text-xs text-muted-foreground font-medium">({item.price})</span>
                          )}
                        </div>
                      </TableCell>
                    )}
                    <TableCell>{item.submittedAt}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {item.serviceType === 'Hosted' ? (
                          <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'application' })}>
                            <FileText className="h-4 w-4" />
                          </Button>
                        ) : (
                           <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'all' })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}

                        {item.serviceType === 'Hosted' && (
                          <Button variant="ghost" size="sm" onClick={() => setViewDialog({ open: true, item: item, mode: 'details' })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}

                        {(item.serviceType === 'Linked' || item.serviceType === 'Hosted') && (
                          <div className="relative inline-block">
                            <Button variant="ghost" size="sm" onClick={() => setReviewsDialog({ open: true, item: item })}>
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            {item.newReviews && item.newReviews > 0 ? (
                              <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-900" />
                            ) : null}
                          </div>
                        )}
                        
                        {/* Actions for all statuses including Rejected */}
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50 h-8 w-8 p-0"
                          onClick={() => handleReviewingClick(item.id)}
                          disabled={item.status === 'Reviewing'}
                          title="Set to Reviewing"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                          onClick={() => handleApproveClick(item.id)}
                          disabled={item.status === 'Approved'}
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        
                        {item.serviceType === 'Hosted' ? (
                          <div className="flex items-center space-x-3 border rounded-full px-4 py-1.5 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-sm">
                             <span className="text-sm font-bold text-blue-600">Active</span>
                             <Switch 
                               id={`status-${item.id}`}
                               checked={true}
                               onCheckedChange={(checked) => !checked && confirmStopHosted(item.id)}
                               className="data-[state=checked]:bg-blue-600"
                             />
                          </div>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="destructive" 
                            className="h-8 w-8 p-0"
                            onClick={() => setRejectDialog({ open: true, id: item.id })}
                            disabled={item.status === 'Rejected'}
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );

    if (serviceType === "Hosted") {
       return (
        <Tabs defaultValue="requests" className="w-full">
           <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
             <TabsList className="bg-transparent h-auto p-0 space-x-6">
                <TabsTrigger 
                  value="requests"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-2 font-medium text-muted-foreground data-[state=active]:text-primary hover:text-primary transition-colors"
                >
                  Active Services
                </TabsTrigger>
                <TabsTrigger 
                  value="stopped"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 py-2 font-medium text-muted-foreground data-[state=active]:text-primary hover:text-primary transition-colors"
                >
                  Deactive Services
                </TabsTrigger>
             </TabsList>
           </div>
           
           <TabsContent value="requests" className="mt-0">
              {submissionContent}
           </TabsContent>
           
           <TabsContent value="stopped" className="mt-0">
              <div className="space-y-4">
                 {stoppedServices.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                       <XCircle className="mx-auto h-12 w-12 mb-4 opacity-20" />
                       <h3 className="text-lg font-medium text-muted-foreground">No deactivated services found</h3>
                       <p className="text-sm text-muted-foreground mt-1">Deactivated services will appear here.</p>
                    </div>
                 ) : (
                    stoppedServices.map((service) => (
                       <ServiceCard key={service.id} service={service} isStopped={true} />
                    ))
                 )}
              </div>
           </TabsContent>
        </Tabs>
       );
    }
    
    return submissionContent;
  };

  return (
    <AdminLayout title="Submission Management">
      <Tabs defaultValue="hosted" className="space-y-6">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="hosted">Hosted Service</TabsTrigger>
          <TabsTrigger value="linked">Link External Service</TabsTrigger>
        </TabsList>
        <TabsContent value="hosted" className="mt-6">
          {renderDashboard("Hosted")}
        </TabsContent>
        <TabsContent value="linked" className="mt-6">
          {renderDashboard("Linked")}
        </TabsContent>
      </Tabs>

      {/* Confirmation Alert Dialog */}
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertConfig.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {alertConfig.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              alertConfig.action();
              setAlertOpen(false);
            }}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog.open} onOpenChange={(open) => !open && setRejectDialog({ open: false, id: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Submission</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this submission. This will be visible to the user.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label className="mb-2 block">Rejection Reason</Label>
            <Textarea 
              placeholder="e.g. Incomplete documentation, Data quality issues..." 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog({ open: false, id: null })}>Cancel</Button>
            <Button variant="destructive" onClick={confirmReject}>Reject Submission</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Detail Dialog */}
      <Dialog open={viewDialog.open} onOpenChange={(open) => !open && setViewDialog({ open: false, item: null, mode: 'all' })}>
        <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="flex items-center gap-2">
              {viewDialog.item?.title}
              {viewDialog.item && viewDialog.mode !== 'application' && getStatusBadge(viewDialog.item.status)}
            </DialogTitle>
            <DialogDescription>
              Submitted by {viewDialog.item?.provider} on {viewDialog.item?.submittedAt}
            </DialogDescription>
          </DialogHeader>
          
          {viewDialog.item && (
            viewDialog.item.serviceType === 'Hosted' ? (
              <ScrollArea className="flex-1 px-6 py-6">
                <HostedRequestDetails data={viewDialog.item} isEditable={false} mode={viewDialog.mode} />
              </ScrollArea>
            ) : (
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="px-6 border-b">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                      <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent px-3 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm">Overview</TabsTrigger>
                      <TabsTrigger value="documentation" className="rounded-none border-b-2 border-transparent px-3 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm">Documentation</TabsTrigger>
                      <TabsTrigger value="try-asking" className="rounded-none border-b-2 border-transparent px-3 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm">Try Asking</TabsTrigger>
                      <TabsTrigger value="pricing" className="rounded-none border-b-2 border-transparent px-3 py-3 font-medium data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 text-sm">Pricing</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0">
                      <ScrollArea className="h-[55vh]">
                        <div className="py-6 pr-4">
                          <GeneralRequestDetails data={viewDialog.item} />
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="documentation" className="mt-0">
                      <ScrollArea className="h-[55vh]">
                        <div className="py-6 pr-4 space-y-6">
                          <LinkedDocumentationTab />
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="try-asking" className="mt-0">
                      <ScrollArea className="h-[55vh]">
                        <div className="py-6 pr-4 space-y-6">
                          <LinkedTryAskingTab />
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="pricing" className="mt-0">
                      <ScrollArea className="h-[55vh]">
                        <div className="py-6 pr-4 space-y-6">
                          <LinkedPricingTab />
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )
          )}

          {viewDialog.item && (
            <div className="p-4 border-t flex justify-end gap-2 bg-slate-50 dark:bg-slate-900/50">
              {viewDialog.mode === 'application' ? (
                <Button 
                  variant="outline"
                  onClick={() => setViewDialog({ open: false, item: null, mode: 'all' })}
                >
                  Confirm
                </Button>
              ) : (
                <>
                  <div className="flex gap-2 ml-auto">
                    <Button 
                      variant="outline" 
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={() => handleReviewingClick(viewDialog.item!.id)}
                      disabled={viewDialog.item.status === 'Reviewing'}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Reviewing
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => setRejectDialog({ open: true, id: viewDialog.item!.id })}
                      disabled={viewDialog.item.status === 'Rejected'}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveClick(viewDialog.item!.id)}
                      disabled={viewDialog.item.status === 'Approved'}
                    >
                      Approve Submission
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reviews Dialog */}
      <ServiceReviewsDialog 
        isOpen={reviewsDialog.open}
        onOpenChange={(open) => !open && setReviewsDialog({ open: false, item: null })}
        serviceTitle={reviewsDialog.item?.title || ""}
      />

      {/* Contract Dialog (for Active/Stopped services) */}
      {contractDialog.service && (
        <ContractDetailsDialog 
          isOpen={contractDialog.open} 
          onClose={() => setContractDialog({ open: false, service: null })}
          resourceName={contractDialog.service.title}
          resourceType={contractDialog.service.type}
        />
      )}
    </AdminLayout>
  );
}