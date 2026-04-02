import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Label } from "@/components/ui/label";
import {
  Search,
  Filter,
  Mail,
  MailCheck,
  MessageSquare,
  Eye,
  CalendarDays,
  User,
  Package,
  Tag,
  ChevronDown,
  X,
  Send,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const INQUIRY_TYPES = [
  { value: "payment", label: "결제 / 구독 문의", color: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" },
  { value: "integration", label: "Integration 문의", color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800" },
  { value: "bug", label: "버그 리포트", color: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800" },
  { value: "feature", label: "기능 요청", color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800" },
  { value: "general", label: "일반 문의", color: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700" },
];

interface Inquiry {
  id: number;
  senderName: string;
  senderEmail: string;
  productId: string;
  productTitle: string;
  type: string;
  content: string;
  sentAt: string;
  replied: boolean;
  repliedAt?: string;
}

const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: 1,
    senderName: "김민준",
    senderEmail: "minjun.kim@example.com",
    productId: "1",
    productTitle: "Social Trend Analysis",
    type: "payment",
    content: "프로 플랜으로 업그레이드하고 싶은데, 법인 카드로 결제가 가능한지 문의드립니다. 또한 세금계산서 발행도 가능한지 알고 싶습니다.",
    sentAt: "2026-03-28T09:14:00Z",
    replied: true,
    repliedAt: "2026-03-28T11:30:00Z",
  },
  {
    id: 2,
    senderName: "이서연",
    senderEmail: "seoyeon.lee@corp.io",
    productId: "2",
    productTitle: "Image-based Patent Analysis Service",
    type: "integration",
    content: "저희 사내 시스템에 API를 연동하려고 하는데, Python SDK가 지원되는지 확인하고 싶습니다. 문서에서 찾지 못해서 직접 문의드립니다.",
    sentAt: "2026-03-27T14:32:00Z",
    replied: false,
  },
  {
    id: 3,
    senderName: "박지호",
    senderEmail: "jiho.park@startup.kr",
    productId: "4",
    productTitle: "Corporate Growth Big Data Center",
    type: "bug",
    content: "대용량 CSV 파일(500MB 이상) 다운로드 시 중간에 연결이 끊기는 현상이 반복적으로 발생하고 있습니다. 브라우저는 Chrome 최신 버전 사용 중입니다.",
    sentAt: "2026-03-26T11:05:00Z",
    replied: true,
    repliedAt: "2026-03-27T08:45:00Z",
  },
  {
    id: 4,
    senderName: "최유진",
    senderEmail: "yujin.choi@research.ac.kr",
    productId: "3",
    productTitle: "Wemeet Science",
    type: "feature",
    content: "논문 요약 결과를 PDF로 내보내는 기능이 있으면 매우 유용할 것 같습니다. 현재는 텍스트 복사만 가능해서 서식이 깨지는 문제가 있습니다.",
    sentAt: "2026-03-25T16:47:00Z",
    replied: false,
  },
  {
    id: 5,
    senderName: "장현우",
    senderEmail: "hyunwoo.jang@enterprise.com",
    productId: "9",
    productTitle: "KIRIA Advanced Robot Demonstration Support Digital Platform",
    type: "general",
    content: "기업 단위로 라이선스를 구매하려고 합니다. 50명 이상 팀원이 사용할 예정인데 엔터프라이즈 플랜에 대한 상세 견적을 받을 수 있을까요?",
    sentAt: "2026-03-24T10:20:00Z",
    replied: true,
    repliedAt: "2026-03-25T09:10:00Z",
  },
  {
    id: 6,
    senderName: "윤소희",
    senderEmail: "sohee.yoon@fintech.io",
    productId: "11",
    productTitle: "Startup Ecosystem Network Visualization",
    type: "payment",
    content: "현재 무료 플랜을 사용 중인데, 유료 플랜 전환 시 기존 데이터가 유지되는지 문의드립니다. 특히 저장된 시각화 프로젝트들이 손실되지 않았으면 합니다.",
    sentAt: "2026-03-23T08:55:00Z",
    replied: false,
  },
  {
    id: 7,
    senderName: "강도현",
    senderEmail: "dohyun.kang@mfg.co.kr",
    productId: "10",
    productTitle: "K-tools Smart Equipment Management Platform",
    type: "bug",
    content: "IoT 센서 데이터가 대시보드에 실시간으로 반영되지 않는 문제가 있습니다. 약 5~10분의 딜레이가 발생하고 있으며, 동일 네트워크 내 다른 사용자들도 같은 문제를 겪고 있습니다.",
    sentAt: "2026-03-22T13:30:00Z",
    replied: true,
  },
  {
    id: 8,
    senderName: "임수아",
    senderEmail: "sua.lim@data-corp.kr",
    productId: "1",
    productTitle: "Social Trend Analysis",
    type: "integration",
    content: "Slack Webhook과 연동하여 분석 결과를 자동으로 알림 받고 싶습니다. Webhook URL 설정 방법이나 관련 문서를 안내해 주실 수 있나요?",
    sentAt: "2026-03-21T15:12:00Z",
    replied: false,
  },
  {
    id: 9,
    senderName: "오준서",
    senderEmail: "junseo.oh@analytics.co",
    productId: "8",
    productTitle: "Main Industry News Trend Analysis",
    type: "feature",
    content: "특정 키워드에 대한 뉴스 트렌드를 이메일로 매일 아침 정기 발송해주는 기능을 요청드립니다. 현재는 직접 접속해서 확인해야 해서 불편합니다.",
    sentAt: "2026-03-20T09:45:00Z",
    replied: true,
  },
  {
    id: 10,
    senderName: "한예린",
    senderEmail: "yerin.han@university.edu",
    productId: "3",
    productTitle: "Wemeet Science",
    type: "general",
    content: "대학원 연구 목적으로 사용하고 있습니다. 학술 기관 할인 프로그램이 있는지, 있다면 신청 방법을 알려주시면 감사하겠습니다.",
    sentAt: "2026-03-19T11:00:00Z",
    replied: false,
  },
];

function getTypeInfo(value: string) {
  return INQUIRY_TYPES.find(t => t.value === value) || INQUIRY_TYPES[4];
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function InquiriesManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(MOCK_INQUIRIES);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterReplied, setFilterReplied] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [replyDraft, setReplyDraft] = useState("");
  const [savedReplies, setSavedReplies] = useState<Record<number, string>>({});

  useEffect(() => {
    if (selectedInquiry) {
      setReplyDraft(savedReplies[selectedInquiry.id] ?? "");
    }
  }, [selectedInquiry?.id]);

  const filtered = useMemo(() => {
    return inquiries.filter(inq => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        inq.senderName.toLowerCase().includes(q) ||
        inq.senderEmail.toLowerCase().includes(q) ||
        inq.productTitle.toLowerCase().includes(q) ||
        inq.content.toLowerCase().includes(q);
      const matchesType = filterType === "all" || inq.type === filterType;
      const matchesReplied =
        filterReplied === "all" ||
        (filterReplied === "replied" && inq.replied) ||
        (filterReplied === "pending" && !inq.replied);
      return matchesSearch && matchesType && matchesReplied;
    });
  }, [inquiries, search, filterType, filterReplied]);

  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter(i => !i.replied).length;
  const repliedCount = inquiries.filter(i => i.replied).length;

  const toggleReplied = (id: number) => {
    const inq = inquiries.find(i => i.id === id);
    if (!inq) return;
    const nowReplied = !inq.replied;
    const nowTime = nowReplied ? new Date().toISOString() : undefined;
    setInquiries(prev =>
      prev.map(i => (i.id === id ? { ...i, replied: nowReplied, repliedAt: nowTime } : i))
    );
    toast.success(nowReplied ? "답장 완료로 표시됨" : "답장 완료 해제됨");
  };

  const submitReply = (id: number, email: string) => {
    const text = replyDraft.trim();
    if (!text) {
      toast.error("답변 내용을 입력해주세요.");
      return;
    }
    const now = new Date().toISOString();
    setSavedReplies(prev => ({ ...prev, [id]: text }));
    setInquiries(prev =>
      prev.map(i => (i.id === id ? { ...i, replied: true, repliedAt: now } : i))
    );
    setSelectedInquiry(prev => prev ? { ...prev, replied: true, repliedAt: now } : null);
    toast.success(`${email}에 답변이 등록되었습니다.`);
  };

  return (
    <AdminLayout title="문의 모아보기">
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl border bg-white dark:bg-slate-900 p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalCount}</p>
              <p className="text-sm text-muted-foreground">전체 문의</p>
            </div>
          </div>
          <div className="rounded-xl border bg-white dark:bg-slate-900 p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
              <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">답장 대기</p>
            </div>
          </div>
          <div className="rounded-xl border bg-white dark:bg-slate-900 p-5 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
              <MailCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{repliedCount}</p>
              <p className="text-sm text-muted-foreground">답장 완료</p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 p-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                data-testid="input-inquiry-search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="보낸 사람, 이메일, 상품명, 내용으로 검색..."
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              className={cn("gap-2 shrink-0", showFilters && "bg-slate-100 dark:bg-slate-800")}
              onClick={() => setShowFilters(v => !v)}
              data-testid="button-toggle-filters"
            >
              <Filter className="h-4 w-4" />
              필터
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", showFilters && "rotate-180")} />
            </Button>
          </div>

          {showFilters && (
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground shrink-0">문의 유형</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px] h-9" data-testid="select-filter-type">
                    <SelectValue placeholder="전체 유형" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 유형</SelectItem>
                    {INQUIRY_TYPES.map(t => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground shrink-0">답장 상태</Label>
                <Select value={filterReplied} onValueChange={setFilterReplied}>
                  <SelectTrigger className="w-[160px] h-9" data-testid="select-filter-replied">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">답장 대기</SelectItem>
                    <SelectItem value="replied">답장 완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(filterType !== "all" || filterReplied !== "all") && (
                <Button variant="ghost" size="sm" className="gap-1.5 text-slate-500 h-9"
                  onClick={() => { setFilterType("all"); setFilterReplied("all"); }}>
                  <X className="h-3.5 w-3.5" /> 초기화
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
          <div className="px-5 py-3.5 border-b bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              문의 목록
            </span>
            <span className="text-xs text-muted-foreground">
              {filtered.length}건 {filtered.length !== totalCount && `(전체 ${totalCount}건)`}
            </span>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>보낸 사람</TableHead>
                <TableHead>상품</TableHead>
                <TableHead>문의 유형</TableHead>
                <TableHead className="max-w-xs">내용 미리보기</TableHead>
                <TableHead>문의 날짜 / 답변 날짜</TableHead>
                <TableHead className="text-center">상세보기</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-16 text-center text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm">조건에 맞는 문의가 없습니다.</p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(inq => {
                  const typeInfo = getTypeInfo(inq.type);
                  return (
                    <TableRow
                      key={inq.id}
                      data-testid={`row-inquiry-${inq.id}`}
                      className={cn(!inq.replied && "bg-amber-50/30 dark:bg-amber-900/5")}
                    >
                      {/* Sender */}
                      <TableCell>
                        <div className="space-y-0.5">
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">
                            {inq.senderName}
                          </p>
                          <p className="text-xs text-muted-foreground">{inq.senderEmail}</p>
                        </div>
                      </TableCell>

                      {/* Product */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 max-w-[180px]">
                          <Package className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
                            {inq.productTitle}
                          </span>
                        </div>
                      </TableCell>

                      {/* Type */}
                      <TableCell>
                        <Badge variant="outline" className={cn("text-xs font-medium border whitespace-nowrap", typeInfo.color)}>
                          {typeInfo.label}
                        </Badge>
                      </TableCell>

                      {/* Content preview */}
                      <TableCell className="max-w-xs">
                        <p className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[220px]">
                          {inq.content}
                        </p>
                      </TableCell>

                      {/* Dates */}
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <CalendarDays className="h-3 w-3 text-slate-400 shrink-0" />
                            <span className="text-xs text-slate-500 whitespace-nowrap">{formatDate(inq.sentAt)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MailCheck className={cn("h-3 w-3 shrink-0", inq.repliedAt ? "text-green-500" : "text-slate-300")} />
                            {inq.repliedAt ? (
                              <span className="text-xs text-green-600 dark:text-green-400 whitespace-nowrap font-medium">{formatDate(inq.repliedAt)}</span>
                            ) : (
                              <span className="text-xs text-slate-300 dark:text-slate-600">—</span>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Detail */}
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          data-testid={`button-view-inquiry-${inq.id}`}
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedInquiry} onOpenChange={open => { if (!open) setSelectedInquiry(null); }}>
        <DialogContent className="max-w-xl gap-0 p-0 overflow-hidden rounded-2xl" data-testid="modal-inquiry-detail">
          {selectedInquiry && (() => {
            const typeInfo = getTypeInfo(selectedInquiry.type);
            return (
              <>
                {/* Header */}
                <DialogHeader className="px-6 pt-6 pb-4 border-b">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <DialogTitle className="text-lg font-bold leading-tight">문의 상세</DialogTitle>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={cn("text-xs font-medium border", typeInfo.color)}>
                          {typeInfo.label}
                        </Badge>
                        {selectedInquiry.replied ? (
                          <Badge variant="outline" className="text-xs font-medium border bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 gap-1">
                            <MailCheck className="h-3 w-3" /> 답장 완료
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800 gap-1">
                            <Mail className="h-3 w-3" /> 답장 대기
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                {/* Body */}
                <div className="px-6 py-5 space-y-5 overflow-y-auto max-h-[60vh]">
                  {/* Sender info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" /> 보낸 사람
                      </Label>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{selectedInquiry.senderName}</p>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5" /> 이메일
                      </Label>
                      <p className="text-sm text-slate-700 dark:text-slate-300 break-all">{selectedInquiry.senderEmail}</p>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                        <Package className="h-3.5 w-3.5" /> 상품
                      </Label>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{selectedInquiry.productTitle}</p>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" /> 문의 날짜
                      </Label>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{formatDateTime(selectedInquiry.sentAt)}</p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800" />

                  {/* Content */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> 문의 내용
                    </Label>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-4">
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {selectedInquiry.content}
                      </p>
                    </div>
                  </div>

                  {/* Saved reply display */}
                  {savedReplies[selectedInquiry.id] && (
                    <div className="rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 p-4 space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                        <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">등록된 답변</p>
                      </div>
                      <p className="text-sm text-indigo-900 dark:text-indigo-100 leading-relaxed whitespace-pre-wrap">
                        {savedReplies[selectedInquiry.id]}
                      </p>
                    </div>
                  )}

                  {/* Direct reply input */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Send className="h-3.5 w-3.5" /> 직접 답변 작성
                    </Label>
                    <Textarea
                      data-testid="textarea-reply-input"
                      value={replyDraft}
                      onChange={e => setReplyDraft(e.target.value)}
                      placeholder="이 문의에 대한 답변을 입력하세요..."
                      className="min-h-[100px] resize-none text-sm"
                    />
                    <div className="flex items-center justify-between gap-3">
                      <a
                        href={`mailto:${selectedInquiry.senderEmail}?subject=Re: ${selectedInquiry.productTitle} 문의 답변`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                        data-testid="link-mailto"
                      >
                        <ExternalLink className="h-3 w-3" />
                        메일로 답장하기
                      </a>
                      <Button
                        data-testid="button-submit-reply"
                        size="sm"
                        className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => submitReply(selectedInquiry.id, selectedInquiry.senderEmail)}
                      >
                        <Send className="h-3.5 w-3.5" />
                        {savedReplies[selectedInquiry.id] ? "답변 수정 등록" : "답변 등록"}
                      </Button>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-800" />

                  {/* Reply status toggle */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">답장 완료 체크</p>
                      {selectedInquiry.replied && selectedInquiry.repliedAt ? (
                        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                          <MailCheck className="h-3 w-3" />
                          {formatDateTime(selectedInquiry.repliedAt)} 답변 완료
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          아직 이 문의에 답장하지 않았습니다.
                        </p>
                      )}
                    </div>
                    <Button
                      data-testid="button-toggle-replied-modal"
                      variant={selectedInquiry.replied ? "outline" : "default"}
                      size="sm"
                      className={cn(
                        "gap-2 shrink-0",
                        selectedInquiry.replied
                          ? "text-slate-600"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      )}
                      onClick={() => {
                        const nowReplied = !selectedInquiry.replied;
                        const nowTime = nowReplied ? new Date().toISOString() : undefined;
                        toggleReplied(selectedInquiry.id);
                        setSelectedInquiry(prev => prev ? { ...prev, replied: nowReplied, repliedAt: nowTime } : null);
                      }}
                    >
                      {selectedInquiry.replied ? (
                        <><Mail className="h-3.5 w-3.5" /> 미답장으로 변경</>
                      ) : (
                        <><MailCheck className="h-3.5 w-3.5" /> 답장 완료 표시</>
                      )}
                    </Button>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
