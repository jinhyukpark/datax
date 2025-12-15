import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Target, Award, Rocket, Megaphone, Layout, Star, PanelRight, Calendar as CalendarIcon, ShoppingCart, CreditCard } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { addDays, format, differenceInDays } from "date-fns";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Advertise() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'dates' | 'payment'>('dates');

  // Payment Form State
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardholderName: ""
  });

  const adProducts = [
    {
      id: "banner",
      title: t("Banner Ad", "배너 광고"),
      subtitle: t("Below header on all pages", "모든 페이지의 헤더 아래"),
      description: t("Premium banner placement visible on every page of the website, right below the header.", "웹사이트의 모든 페이지에서 헤더 바로 아래에 표시되는 프리미엄 배너 배치입니다."),
      priceValue: 79,
      price: "$79",
      period: t("/week", "/주"),
      discount: t("10% off each extra week", "추가 주당 10% 할인"),
      features: [
        t("Visible on every page", "모든 페이지에 노출"),
        t("Prime above-the-fold placement", "스크롤 없이 볼 수 있는 주요 위치"),
        t("High visibility & engagement", "높은 가시성 및 참여도"),
        t("Direct link to your website", "웹사이트 직접 링크")
      ],
      availability: t("1 slot available", "1개 슬롯 사용 가능"),
      icon: Megaphone,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
      borderColor: "border-green-500/20"
    },
    {
      id: "listing",
      title: t("Listing Ad", "리스팅 광고"),
      subtitle: t("Agent listing & category pages", "에이전트 목록 및 카테고리 페이지"),
      description: t("Your logo displayed on every agent listing page, including category pages and search results.", "카테고리 페이지 및 검색 결과를 포함한 모든 에이전트 목록 페이지에 로고가 표시됩니다."),
      priceValue: 69,
      price: "$69",
      period: t("/week", "/주"),
      discount: t("5% off each extra week", "추가 주당 5% 할인"),
      features: [
        t("Shown on all listing pages", "모든 목록 페이지에 표시"),
        t("Visible in category browsing", "카테고리 탐색 시 노출"),
        t("Reaches users exploring agents", "에이전트를 탐색하는 사용자에게 도달"),
        t("Direct link to your website", "웹사이트 직접 링크")
      ],
      availability: t("1 slot available", "1개 슬롯 사용 가능"),
      icon: Layout,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      borderColor: "border-blue-500/20"
    },
    {
      id: "sidebar",
      title: t("Agent Sidebar Ad", "에이전트 사이드바 광고"),
      subtitle: t("Agent detail page sidebar", "에이전트 상세 페이지 사이드바"),
      description: t("Your logo in the sidebar of every individual agent detail page.", "모든 개별 에이전트 상세 페이지의 사이드바에 로고가 표시됩니다."),
      priceValue: 59,
      price: "$59",
      period: t("/week", "/주"),
      discount: t("5% off each extra week", "추가 주당 5% 할인"),
      features: [
        t("Displayed on agent detail pages", "에이전트 상세 페이지에 표시"),
        t("Reaches engaged users", "관심 있는 사용자에게 도달"),
        t("Contextual placement", "문맥에 맞는 배치"),
        t("Direct link to your website", "웹사이트 직접 링크")
      ],
      availability: t("1 slot available", "1개 슬롯 사용 가능"),
      icon: PanelRight,
      color: "text-pink-500",
      bgColor: "bg-pink-100 dark:bg-pink-900/30",
      borderColor: "border-pink-500/20"
    },
    {
      id: "sponsor",
      title: t("Sponsor Logo", "스폰서 로고"),
      subtitle: t("Homepage sponsors section", "홈페이지 스폰서 섹션"),
      description: t("Your logo in the Sponsors section on the homepage, alongside other sponsors.", "홈페이지의 스폰서 섹션에 다른 스폰서와 함께 귀하의 로고가 표시됩니다."),
      priceValue: 29,
      price: "$29",
      period: t("/week", "/주"),
      discount: t("5% off each extra week", "추가 주당 5% 할인"),
      features: [
        t("Homepage sponsor section", "홈페이지 스폰서 섹션"),
        t("Brand recognition", "브랜드 인지도 향상"),
        t("Direct link to your website", "웹사이트 직접 링크"),
        t("Join trusted partners", "신뢰할 수 있는 파트너와 함께")
      ],
      availability: t("Unlimited slots", "무제한 슬롯"),
      icon: Star,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      borderColor: "border-amber-500/20"
    }
  ];

  const handleSelectDates = (product: any) => {
    setSelectedProduct(product);
    setPaymentStep('dates');
    setIsModalOpen(true);
  };

  const calculateTotal = () => {
    if (!date?.from || !date?.to || !selectedProduct) return 0;
    const days = differenceInDays(date.to, date.from) + 1;
    const weeks = Math.ceil(days / 7);
    return selectedProduct.priceValue * weeks;
  };

  const handleAction = (action: 'pay' | 'cart' | 'confirm_pay') => {
    if (!date?.from || !date?.to || !selectedProduct) return;

    if (action === 'pay') {
      setPaymentStep('payment');
      return;
    }

    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      productId: selectedProduct.id,
      title: selectedProduct.title,
      dateRange: {
        from: date.from.toISOString(),
        to: date.to.toISOString()
      },
      price: `$${calculateTotal()}`,
      status: action === 'confirm_pay' ? 'Completed' : 'Pending Payment',
      type: 'advertise',
      date: format(new Date(), 'yyyy-MM-dd')
    };

    // Save to localStorage
    const storageKey = 'my_purchases'; // Single source of truth for simplicity in mockup
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    localStorage.setItem(storageKey, JSON.stringify([newItem, ...existing]));

    setIsModalOpen(false);
    
    if (action === 'confirm_pay') {
      toast.success(t("Payment successful!", "결제가 완료되었습니다!"));
      setLocation('/my-page');
    } else {
      toast.success(t("Added to cart", "장바구니에 추가되었습니다"));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            {t("Make your", "당신의")} <span className="text-gradient">{t("data resource", "데이터 리소스를")}</span> {t("stand out", "돋보이게 만드세요")}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            {t("Showcase your AI tools to thousands of visitors and get more users and growth for your business with premium listings on Data-X.", "Data-X의 프리미엄 리스팅으로 수천 명의 방문자에게 AI 도구를 선보이고 더 많은 사용자와 비즈니스 성장을 달성하세요.")}
          </p>
        </div>

        {/* Benefits */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { 
              label: t("Targeted Audience", "타겟 오디언스"), 
              value: t("Decision Makers", "의사 결정권자"),
              desc: t("Reach professionals and decision-makers in the data industry.", "데이터 산업의 전문가 및 의사 결정권자에게 도달하세요."),
              icon: Target 
            },
            { 
              label: t("Brand Authority", "브랜드 권위"), 
              value: t("Industry Leader", "산업 리더"),
              desc: t("Position your brand as a leader in the AI & Data ecosystem.", "AI 및 데이터 생태계에서 브랜드를 리더로 포지셔닝하세요."),
              icon: Award 
            },
            { 
              label: t("Growth Potential", "성장 잠재력"), 
              value: t("Early Access", "초기 선점 기회"),
              desc: t("Secure your spot early and grow with our rapidly expanding platform.", "초기 입지를 선점하고 빠르게 성장하는 플랫폼과 함께 성장하세요."),
              icon: Rocket 
            },
          ].map((benefit) => (
            <Card key={benefit.label} className="flex flex-col items-center p-8 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <benefit.icon className="h-6 w-6" />
              </div>
              <div className="font-heading text-2xl font-bold mb-2">{benefit.value}</div>
              <div className="text-sm font-semibold text-primary mb-2">{benefit.label}</div>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </Card>
          ))}
        </div>

        {/* Available Placements - Replaced Pricing Section */}
        <div className="mx-auto mt-24 max-w-6xl">
          <h2 className="text-3xl font-bold mb-10 text-center">{t("Available Placements", "이용 가능한 광고 상품")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {adProducts.map((product) => (
              <Card key={product.id} className={`p-8 border-2 hover:border-primary/50 transition-colors ${product.borderColor} dark:bg-slate-900`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${product.bgColor}`}>
                    <product.icon className={`h-6 w-6 ${product.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-8 min-h-[3rem]">
                  {product.description}
                </p>

                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{product.price}</span>
                  <span className="text-muted-foreground">{product.period}</span>
                </div>
                <p className={`text-sm font-medium mb-8 ${product.color}`}>
                  {product.discount}
                </p>

                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-4 text-xs font-medium text-muted-foreground">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    {product.availability}
                  </div>
                  <Button className="w-full gap-2" variant="outline" onClick={() => handleSelectDates(product)}>
                    <CalendarIcon className="h-4 w-4" />
                    {t("Select Dates", "날짜 선택")}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {paymentStep === 'dates' ? t("Select Duration", "기간 선택") : t("Enter Payment Details", "결제 정보 입력")}
            </DialogTitle>
            <DialogDescription>
              {paymentStep === 'dates' ? t("Choose the dates for your advertisement.", "광고를 게재할 기간을 선택하세요.") : t("Secure payment processing.", "안전한 결제 처리를 위해 정보를 입력하세요.")}
            </DialogDescription>
          </DialogHeader>
          
          {paymentStep === 'dates' ? (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="border rounded-md p-4 mb-4 bg-white dark:bg-slate-950">
                <Calendar
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                  disabled={(date) => date < new Date()}
                />
              </div>
              
              {date?.from && date?.to && (
                <div className="w-full bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{t("Selected Product", "선택한 상품")}</span>
                    <span className="font-medium">{selectedProduct?.title}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{t("Duration", "기간")}</span>
                    <span className="font-medium">
                      {format(date.from, "MMM dd")} - {format(date.to, "MMM dd")} 
                      {' '}({differenceInDays(date.to, date.from) + 1} days)
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2 flex justify-between items-center">
                    <span className="font-bold">{t("Total Price", "총 결제금액")}</span>
                    <span className="text-xl font-bold text-blue-600">${calculateTotal()}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">{t("Card Number", "카드 번호")}</Label>
                <Input 
                  id="card-number" 
                  placeholder="0000 0000 0000 0000" 
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">{t("Expiry Date", "유효기간")}</Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/YY" 
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">{t("CVC", "CVC")}</Label>
                  <Input 
                    id="cvc" 
                    placeholder="123" 
                    value={paymentInfo.cvc}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cvc: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">{t("Cardholder Name", "카드 소유자 이름")}</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={paymentInfo.cardholderName}
                  onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                />
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{t("Total to Pay", "결제 금액")}</span>
                  <span className="text-xl font-bold text-blue-600">${calculateTotal()}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {paymentStep === 'dates' ? (
              <>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleAction('cart')}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t("Add to Cart", "장바구니 담기")}
                </Button>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" onClick={() => handleAction('pay')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t("Pay Immediately", "바로 결제하기")}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => setPaymentStep('dates')}>
                  {t("Back", "뒤로가기")}
                </Button>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" onClick={() => handleAction('confirm_pay')}>
                  {t("Confirm Payment", "결제 확인")}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
