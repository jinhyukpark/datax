import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock Data for Data-X Platform

export type ResourceType = "API" | "Agent" | "Dataset";
export type PricingType = "Free" | "Paid" | "Freemium";

export interface Resource {
  id: string;
  title: string;
  titleKo?: string; // Korean Title
  description: string;
  descriptionKo?: string; // Korean Description
  provider: string;
  type: ResourceType;
  price: PricingType;
  priceAmount?: string;
  tags: string[];
  image?: string;
  publishedDate: string;
  views: number;
  featured?: boolean;
  specs?: {
    format: string;
    frequency: string;
    access: string;
  };
  longDescription?: string;
  useCases?: string[];
}

export const RESOURCES: Resource[] = [
  // Analysis
  {
    id: "1",
    title: "Social Trend Analysis",
    titleKo: "소셜 트랜드 분석",
    description: "Big data analysis service collected online to quickly respond to the constantly changing web environment.",
    descriptionKo: "끊임없이 변화하는 웹 환경에 신속히 대응할 수 있도록 온라인에서 수집되는 다양한 형식의 빅데이터 분석서비스",
    provider: "소셜 트랜드 분석",
    type: "API",
    price: "Paid",
    tags: ["Analysis", "Social", "Trend"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-07-13",
    views: 297
  },
  {
    id: "101",
    title: "Consumer Sentiment Analysis",
    titleKo: "소비자 감성 분석",
    description: "Real-time sentiment analysis of consumer reviews and feedback across multiple platforms.",
    descriptionKo: "다양한 플랫폼의 소비자 리뷰 및 피드백에 대한 실시간 감성 분석",
    provider: "소셜 트랜드 분석",
    type: "API",
    price: "Paid",
    tags: ["Analysis", "Consumer", "Sentiment"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-08-05",
    views: 150
  },
  
  // Patent
  {
    id: "2",
    title: "Image-based Patent Analysis Service",
    titleKo: "이미지 기반 특허 분석 서비스",
    description: "Connecting global technology/company/researcher/patent analysis content based on images.",
    descriptionKo: "이미지 기반으로 글로벌 기술/기업/연구자/특허의 분석 콘텐츠를 연결한다.",
    provider: "이미지 기반 특허 분석 서비스",
    type: "API",
    price: "Paid",
    tags: ["Patent", "Image", "Analysis"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-08-01",
    views: 411
  },
  {
    id: "201",
    title: "Global Patent Search API",
    titleKo: "글로벌 특허 검색 API",
    description: "Comprehensive search API for international patents with advanced filtering options.",
    descriptionKo: "고급 필터링 옵션을 갖춘 국제 특허에 대한 포괄적인 검색 API",
    provider: "이미지 기반 특허 분석 서비스",
    type: "API",
    price: "Freemium",
    tags: ["Patent", "Search", "Global"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-09-12",
    views: 320
  },

  // Science
  {
    id: "3",
    title: "Wemeet Science",
    titleKo: "위밋 사이언스",
    description: "Scientist matching service based on science and technology press data.",
    descriptionKo: "과학기술 언론보도 데이터를 기반으로 과학자와 매칭 서비스",
    provider: "위밋 사이언스",
    type: "Agent",
    price: "Free",
    tags: ["Science", "Matching", "Press"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-09-10",
    views: 377
  },
  {
    id: "301",
    title: "Research Paper Summarizer",
    titleKo: "연구 논문 요약기",
    description: "AI agent that summarizes complex scientific papers into concise abstracts.",
    descriptionKo: "복잡한 과학 논문을 간결한 초록으로 요약하는 AI 에이전트",
    provider: "위밋 사이언스",
    type: "Agent",
    price: "Paid",
    tags: ["Science", "Research", "Summary"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-10-01",
    views: 210
  },

  // Growth
  {
    id: "4",
    title: "Corporate Growth Big Data Center",
    titleKo: "기업성장 빅데이터 센터",
    description: "Corporate growth data provision service for scientific corporate management utilizing various categories of data.",
    descriptionKo: "다양한 범주의 데이터를 활용하는 과학적 기업 경영, 기술지원 및 경영혁신 진단 활용을 위한 기업성장 데이터 제공 서비스",
    provider: "기업성장 빅데이터 센터",
    type: "Dataset",
    price: "Paid",
    tags: ["Growth", "Management", "Big Data"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-08-20",
    views: 389
  },
  {
    id: "401",
    title: "Market Expansion Predictor",
    titleKo: "시장 확장 예측기",
    description: "Predictive analytics tool for identifying potential market expansion opportunities.",
    descriptionKo: "잠재적인 시장 확장 기회를 식별하기 위한 예측 분석 도구",
    provider: "기업성장 빅데이터 센터",
    type: "API",
    price: "Paid",
    tags: ["Growth", "Market", "Prediction"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-09-05",
    views: 180
  },

  // Consulting
  {
    id: "5",
    title: "Digital Industrial Innovation Maturity Diagnosis",
    titleKo: "디지털 산업혁신 성숙도 진단",
    description: "Digital innovation consulting service supporting companies to secure competitiveness by selectively introducing necessary technologies.",
    descriptionKo: "회사가 필요한 기술을 선별적으로 도입하여, 경쟁력을 확보할 수 있도록 지원하는 디지털 혁신 컨설팅 서비스",
    provider: "디지털 산업혁신 성숙도 진단",
    type: "Agent",
    price: "Paid",
    tags: ["Consulting", "Innovation", "Diagnosis"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-09-01",
    views: 1191
  },
  {
    id: "501",
    title: "Strategy Consultant AI",
    titleKo: "전략 컨설턴트 AI",
    description: "AI-powered business strategy consultant for small and medium enterprises.",
    descriptionKo: "중소기업을 위한 AI 기반 비즈니스 전략 컨설턴트",
    provider: "디지털 산업혁신 성숙도 진단",
    type: "Agent",
    price: "Paid",
    tags: ["Consulting", "Strategy", "Business"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-10-15",
    views: 450
  },

  // Network
  {
    id: "6",
    title: "Regional Industry Transaction Network Analysis",
    titleKo: "지역산업 거래망 분석",
    description: "Network analysis service expressing transaction relationships by company/region/industry as a graph based on graph theory.",
    descriptionKo: "그래프 이론을 기반으로 기업/지역/산업별 거래 관계를 그래프로 표현한 네트워크 분석 서비스",
    provider: "지역산업 거래망 분석",
    type: "API",
    price: "Paid",
    tags: ["Network", "Analysis", "Graph"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-09-15",
    views: 324
  },
  {
    id: "601",
    title: "Supply Chain Network Visualizer",
    titleKo: "공급망 네트워크 시각화",
    description: "Tool to visualize and analyze supply chain networks for improved efficiency.",
    descriptionKo: "효율성 향상을 위해 공급망 네트워크를 시각화하고 분석하는 도구",
    provider: "지역산업 거래망 분석",
    type: "API",
    price: "Paid",
    tags: ["Network", "Supply Chain", "Visualization"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-10-20",
    views: 290
  },

  // Ecosystem
  {
    id: "7",
    title: "Regional Industry Ecosystem Analysis",
    titleKo: "지역산업 생태계 분석",
    description: "Visualization service implementing big data such as regional companies, economy, production, employment, and innovation trends as a dashboard.",
    descriptionKo: "지역의 기업, 경기, 생산, 고용, 혁신 동향 등 빅데이터를 대시보드로 구현한 시각화 서비스",
    provider: "지역산업 생태계 분석",
    type: "Agent",
    price: "Paid",
    tags: ["Ecosystem", "Visualization", "Dashboard"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-10-05",
    views: 526
  },
  {
    id: "701",
    title: "Tech Ecosystem Monitor",
    titleKo: "테크 생태계 모니터",
    description: "Real-time monitoring of the technology startup ecosystem and investment trends.",
    descriptionKo: "기술 스타트업 생태계 및 투자 동향에 대한 실시간 모니터링",
    provider: "지역산업 생태계 분석",
    type: "Dataset",
    price: "Freemium",
    tags: ["Ecosystem", "Tech", "Startup"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-11-01",
    views: 310
  },

  // News
  {
    id: "8",
    title: "Main Industry News Trend Analysis",
    titleKo: "주력산업 뉴스트랜드 분석",
    description: "Service implementing industry-specific news articles in the form of a word cloud.",
    descriptionKo: "산업별 뉴스기사를 워드 클라우드 형태로 구현한 서비스",
    provider: "주력산업 뉴스트랜드 분석",
    type: "API",
    price: "Paid",
    tags: ["News", "Trend", "Word Cloud"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-11-15",
    views: 646
  },
  {
    id: "801",
    title: "Global Financial News Feed",
    titleKo: "글로벌 금융 뉴스 피드",
    description: "Aggregated real-time financial news from major global sources.",
    descriptionKo: "주요 글로벌 소스의 실시간 금융 뉴스 집계",
    provider: "주력산업 뉴스트랜드 분석",
    type: "API",
    price: "Paid",
    tags: ["News", "Financial", "Global"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-11-20",
    views: 520
  },

  // Robot
  {
    id: "9",
    title: "KIRIA Advanced Robot Demonstration Support Digital Platform",
    titleKo: "KIRIA 첨단로봇 실증지원 디지털 플랫폼",
    description: "Online One-Stop support platform for research equipment support and certification services.",
    descriptionKo: "연구장비지원 및 인증 서비스 제공을 위한 온라인 One-Stop 지원 플랫폼",
    provider: "KIRIA 첨단로봇 실증지원 디지털 플랫폼",
    type: "API",
    price: "Paid",
    tags: ["Robot", "Support", "Certification"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-10-25",
    views: 4
  },
  {
    id: "901",
    title: "Industrial Robot Controller API",
    titleKo: "산업용 로봇 제어 API",
    description: "Standardized API for controlling various industrial robot arms.",
    descriptionKo: "다양한 산업용 로봇 팔 제어를 위한 표준화된 API",
    provider: "KIRIA 첨단로봇 실증지원 디지털 플랫폼",
    type: "API",
    price: "Paid",
    tags: ["Robot", "Control", "Industrial"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-11-05",
    views: 150
  },

  // Equipment
  {
    id: "10",
    title: "K-tools Smart Equipment Management Platform",
    titleKo: "K-tools 스마트 장비관리 플랫폼",
    description: "Smart equipment management and research information search service such as equipment registration and calibration notification.",
    descriptionKo: "장비등록, 교정알림 등의 스마트한 장비관리 및 연구정보 검색서비스",
    provider: "K-tools 스마트 장비관리 플랫폼",
    type: "Dataset",
    price: "Paid",
    tags: ["Equipment", "Management", "Smart"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-11-01",
    views: 373
  },
  {
    id: "1001",
    title: "Lab Equipment Scheduler",
    titleKo: "실험실 장비 스케줄러",
    description: "Booking and scheduling system for shared laboratory equipment.",
    descriptionKo: "공용 실험실 장비를 위한 예약 및 일정 관리 시스템",
    provider: "K-tools 스마트 장비관리 플랫폼",
    type: "API",
    price: "Free",
    tags: ["Equipment", "Lab", "Scheduling"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-11-10",
    views: 200
  },

  // Startup
  {
    id: "11",
    title: "Startup Ecosystem Network Visualization",
    titleKo: "스타트업 생태계 네트워크 시각화",
    description: "Startup network visualization/exploration service based on new industry classification derived through semantic network analysis.",
    descriptionKo: "의미망 분석을 통해 도출된 신산업분류 기반의 스타트업 네트워크 시각화/탐색 서비스",
    provider: "스타트업 생태계 네트워크 시각화",
    type: "API",
    price: "Paid",
    tags: ["Startup", "Network", "Visualization"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-11-27",
    views: 324
  },
  {
    id: "1101",
    title: "Unicorn Startup Tracker",
    titleKo: "유니콘 스타트업 추적기",
    description: "Data feed tracking valuation and funding rounds of unicorn startups globally.",
    descriptionKo: "전 세계 유니콘 스타트업의 가치 평가 및 투자 라운드를 추적하는 데이터 피드",
    provider: "스타트업 생태계 네트워크 시각화",
    type: "Dataset",
    price: "Paid",
    tags: ["Startup", "Unicorn", "Finance"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-12-01",
    views: 410
  },

  // Investment
  {
    id: "12",
    title: "Investment Network Analysis Service",
    titleKo: "투자 네트워크 분석 서비스",
    description: "Visualizing investment data between investors and investees to explore investors and funds.",
    descriptionKo: "투자자와 피투자자 간의 투자 데이터를 시각화하여 수요자는 투자자 및 펀드를 탐색하고 투자처 발굴 가능",
    provider: "투자 네트워크 분석 서비스",
    type: "API",
    price: "Paid",
    tags: ["Investment", "Network", "Analysis"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-10-12",
    views: 244
  },
  {
    id: "1201",
    title: "Venture Capital Flow Data",
    titleKo: "벤처 캐피탈 흐름 데이터",
    description: "Comprehensive data on venture capital flows across different sectors and regions.",
    descriptionKo: "다양한 부문 및 지역에 걸친 벤처 캐피탈 흐름에 대한 포괄적인 데이터",
    provider: "투자 네트워크 분석 서비스",
    type: "Dataset",
    price: "Paid",
    tags: ["Investment", "VC", "Finance"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-10-25",
    views: 180
  },

  // Innovation
  {
    id: "13",
    title: "Digital Open Innovation Platform",
    titleKo: "디지털 오픈이노베이션 플랫폼",
    description: "'EffectMall' provides digital open innovation services to companies finding optimal business partners.",
    descriptionKo: "'EffectMall'은 공급망 다각화를 위해 최적의 비즈니스 파트너를 찾아주는 디지털 오픈이노베이션 서비스를 기업에게 제공",
    provider: "디지털 오픈이노베이션 플랫폼",
    type: "API",
    price: "Free",
    tags: ["Innovation", "Platform", "Business"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-09-20",
    views: 360
  },
  {
    id: "1301",
    title: "Innovation Challenge Hub",
    titleKo: "혁신 챌린지 허브",
    description: "Platform connecting companies with innovators to solve specific business challenges.",
    descriptionKo: "특정 비즈니스 과제를 해결하기 위해 기업과 혁신가를 연결하는 플랫폼",
    provider: "디지털 오픈이노베이션 플랫폼",
    type: "Agent",
    price: "Paid",
    tags: ["Innovation", "Challenge", "Collaboration"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-10-05",
    views: 220
  },

  // Ecommerce
  {
    id: "14",
    title: "Ecommerce Warehouse & Delivery",
    titleKo: "이커머스 Warehouse&Delivery",
    description: "Providing visibility information for logistics center operation and management efficiency.",
    descriptionKo: "입고/출고/반품 패턴 및 재고 배치 및 출고 작업 분석 등 물류센터 운영 및 관리 효율화에 활용할 수 있는 가시성 정보를 제공",
    provider: "이커머스 Warehouse&Delivery",
    type: "API",
    price: "Freemium",
    tags: ["Ecommerce", "Logistics", "Warehouse"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-08-15",
    views: 416
  },
  {
    id: "1401",
    title: "Global Shipping Rates API",
    titleKo: "글로벌 배송비 API",
    description: "Real-time shipping rate calculation for international ecommerce orders.",
    descriptionKo: "국제 이커머스 주문에 대한 실시간 배송비 계산",
    provider: "이커머스 Warehouse&Delivery",
    type: "API",
    price: "Paid",
    tags: ["Ecommerce", "Shipping", "API"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-09-01",
    views: 350
  },

  // Finance
  {
    id: "15",
    title: "ETF/ETN Information",
    titleKo: "ETF/ETN 정보",
    description: "Basic information, performance, and risk analysis of ETF and ETN items.",
    descriptionKo: "ETF, ETN 종목들의 기본 정보와 성과 및 위험분석",
    provider: "ETF/ETN 정보",
    type: "Agent",
    price: "Paid",
    tags: ["Finance", "ETF", "Analysis"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-09-15",
    views: 247
  },
  {
    id: "1501",
    title: "Stock Market Prediction Model",
    titleKo: "주식 시장 예측 모델",
    description: "AI model predicting short-term stock market trends based on historical data.",
    descriptionKo: "과거 데이터를 기반으로 단기 주식 시장 추세를 예측하는 AI 모델",
    provider: "ETF/ETN 정보",
    type: "API",
    price: "Paid",
    tags: ["Finance", "Stock", "Prediction"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-10",
    views: 420
  },

  // M&A
  {
    id: "16",
    title: "M&A Market Statistics Analysis and Visualization",
    titleKo: "M&A 시장통계분석 및 시각화",
    description: "Inquiry/visualization service for matching, statistics, and analysis of M&A selling and buying companies.",
    descriptionKo: "M&A 매도기업과 매수기업의 매칭, 통계 및 분석 등의 조회/시각화 서비스",
    provider: "M&A 시장통계분석 및 시각화",
    type: "API",
    price: "Freemium",
    tags: ["M&A", "Statistics", "Visualization"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-01",
    views: 229
  },
  {
    id: "1601",
    title: "Due Diligence Automation",
    titleKo: "실사 자동화",
    description: "Automated due diligence tool for M&A transactions.",
    descriptionKo: "M&A 거래를 위한 자동화된 실사 도구",
    provider: "M&A 시장통계분석 및 시각화",
    type: "Agent",
    price: "Paid",
    tags: ["M&A", "Due Diligence", "Automation"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-15",
    views: 190
  },

  // Energy
  {
    id: "17",
    title: "EG-TIPS Energy Greenhouse Gas Comprehensive Portal",
    titleKo: "EG-TIPS 에너지온실가스 종합 포털",
    description: "One-stop energy saving and greenhouse gas reduction comprehensive portal operated by Korea Energy Agency.",
    descriptionKo: "한국에너지공단이 운영하는 원스톱 에너지절감 및 온실가스감축 종합 포털",
    provider: "EG-TIPS 에너지온실가스 종합 포털",
    type: "API",
    price: "Paid",
    tags: ["Energy", "Greenhouse", "Portal"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-10",
    views: 7
  },
  {
    id: "21",
    title: "KOMIPO Power Brokerage Platform",
    titleKo: "KOMIPO 전력중개플랫폼",
    description: "Stable renewable energy business operation with Korea Midland Power.",
    descriptionKo: "한국중부발전과 함께 안정적인 재생에너지 사업 운영",
    provider: "KOMIPO 전력중개플랫폼",
    type: "Agent",
    price: "Paid",
    tags: ["Energy", "Brokerage", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-12",
    views: 8
  },
  {
    id: "23",
    title: "K-ECP (KDN Energy Cloud Platform)",
    titleKo: "K-ECP(KDN 에너지 클라우드 플랫폼)",
    description: "KEPCO KDN supports secure cloud.",
    descriptionKo: "한전 KDN이 안전한 클라우드를 지원",
    provider: "K-ECP(KDN 에너지 클라우드 플랫폼)",
    type: "API",
    price: "Paid",
    tags: ["Energy", "Cloud", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-08-30",
    views: 40
  },
  {
    id: "29",
    title: "Energy Marketplace (EDS)",
    titleKo: "에너지마켓플레이스(EDS)",
    description: "Platform supporting sustainable energy use through renewable energy trading and spatial information provision.",
    descriptionKo: "재생에너지 거래, 공간 정보 등 제공을 통해 지속 가능한 에너지 활용을 지원하는 플랫폼",
    provider: "에너지마켓플레이스(EDS)",
    type: "Dataset",
    price: "Paid",
    tags: ["Energy", "Marketplace", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-05",
    views: 87
  },
  {
    id: "31",
    title: "FIND Energy Platform",
    titleKo: "FIND 에너지 플랫폼",
    description: "Renewable energy platform providing finance, information, new business, and data.",
    descriptionKo: "금융, 정보, 신사업, 데이터를 제공하는 신재생에너지 플랫폼",
    provider: "FIND 에너지 플랫폼",
    type: "API",
    price: "Paid",
    tags: ["Energy", "Platform", "Finance"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-09-30",
    views: 22
  },

  // Trade
  {
    id: "18",
    title: "K.sight",
    titleKo: "K.sight",
    description: "Providing customized intelligent trade insurance data service based on 30 years of accumulated trade insurance data.",
    descriptionKo: "30년간 축적된 무역보험 데이터에 맞춤형 지능형 무역보험 데이터 서비스 제공",
    provider: "K.sight",
    type: "Agent",
    price: "Paid",
    tags: ["Trade", "Insurance", "Data"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-05",
    views: 7
  },
  {
    id: "27",
    title: "Trade Investment Big Data Platform (TriBIG)",
    titleKo: "무역투자빅데이터 플랫폼(TriBIG)",
    description: "Export preparation starts with trade investment big data analysis.",
    descriptionKo: "수출 준비는 무역투자 빅데이터 분석부터",
    provider: "무역투자빅데이터 플랫폼(TriBIG)",
    type: "Agent",
    price: "Paid",
    tags: ["Trade", "Investment", "Big Data"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-09-10",
    views: 12
  },

  // Material
  {
    id: "19",
    title: "KICET koMap",
    titleKo: "한국세라믹기술원 koMap",
    description: "Systematic AI platform for integrated management of material data.",
    descriptionKo: "소재데이터의 통합관리를 위한 체계적인 AI플랫폼",
    provider: "한국세라믹기술원 koMap",
    type: "API",
    price: "Freemium",
    tags: ["Material", "AI", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-08",
    views: 10
  },
  {
    id: "1901",
    title: "Advanced Material Database",
    titleKo: "첨단 소재 데이터베이스",
    description: "Database of properties and applications for advanced composite materials.",
    descriptionKo: "첨단 복합 재료의 특성 및 응용 분야에 대한 데이터베이스",
    provider: "한국세라믹기술원 koMap",
    type: "Dataset",
    price: "Paid",
    tags: ["Material", "Database", "Composite"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-15",
    views: 85
  },

  // Industrial
  {
    id: "20",
    title: "Industrial Data-X",
    titleKo: "산업데이터-X",
    description: "Industrial Data-X platform where you can experience data value.",
    descriptionKo: "데이터 가치를 경험할 수 있는 산업데이터-X 플랫폼",
    provider: "산업데이터-X",
    type: "API",
    price: "Free",
    tags: ["Industrial", "Data", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-09-05",
    views: 284
  },
  {
    id: "24",
    title: "FACTORY ON Platform",
    titleKo: "FACTORY ON 플랫폼",
    description: "Providing 4 types of platforms related to industrial complexes.",
    descriptionKo: "산업단지 관련 4가지 플랫폼을 제공",
    provider: "FACTORY ON 플랫폼",
    type: "API",
    price: "Paid",
    tags: ["Industrial", "Complex", "Platform"],
    image: "abstract_shield_security_logo_icon",
    publishedDate: "2025-09-25",
    views: 35
  },

  // Spatial
  {
    id: "22",
    title: "Spatial Convergence Big Data Platform",
    titleKo: "공간융합 빅데이터 플랫폼",
    description: "First spatial information distribution platform created through collaboration between private and public sectors.",
    descriptionKo: "민간과 공공이 협업하여 만든 최초의 공간정보 유통플랫폼",
    provider: "공간융합 빅데이터 플랫폼",
    type: "Agent",
    price: "Paid",
    tags: ["Spatial", "Big Data", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-20",
    views: 26
  },
  {
    id: "2201",
    title: "Urban 3D Mapping Data",
    titleKo: "도시 3D 매핑 데이터",
    description: "High-resolution 3D mapping data for major urban areas.",
    descriptionKo: "주요 도시 지역을 위한 고해상도 3D 매핑 데이터",
    provider: "공간융합 빅데이터 플랫폼",
    type: "Dataset",
    price: "Paid",
    tags: ["Spatial", "3D", "Mapping"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-05",
    views: 110
  },

  // R&D
  {
    id: "25",
    title: "KIAT Innovation Growth Platform",
    titleKo: "KIAT 혁신성장 플랫폼",
    description: "Innovation growth platform leading the future of industrial transformation.",
    descriptionKo: "산업대전환의 미래를 선도하는 혁신성장 플랫폼",
    provider: "KIAT 혁신성장 플랫폼",
    type: "Agent",
    price: "Paid",
    tags: ["R&D", "Growth", "Platform"], // Changed first tag to R&D for grouping or Innovation
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-05",
    views: 10
  },
  {
    id: "26",
    title: "SROME Industrial Technology R&D Digital Platform",
    titleKo: "SROME 산업기술 R&D 디지털 플랫폼",
    description: "Industrial technology R&D digital platform for researchers, research institutes, and experts.",
    descriptionKo: "연구자, 연구기관, 전문가를 위한 산업기술 R&D 디지털 플랫폼",
    provider: "SROME 산업기술 R&D 디지털 플랫폼",
    type: "API",
    price: "Paid",
    tags: ["R&D", "Digital", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-15",
    views: 11
  },

  // Waste
  {
    id: "28",
    title: "Cheongjeong Nuri - KORAD Open Innovation Platform",
    titleKo: "청정누리 - KORAD 열린혁신 플랫폼",
    description: "Safe and efficient management of radioactive waste.",
    descriptionKo: "방사성폐기물의 안전하고 효율적인 관리",
    provider: "청정누리 - KORAD 열린혁신 플랫폼",
    type: "Dataset",
    price: "Free",
    tags: ["Waste", "Management", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-27",
    views: 26
  },
  {
    id: "2801",
    title: "Industrial Waste Tracking System",
    titleKo: "산업 폐기물 추적 시스템",
    description: "System for tracking industrial waste disposal and recycling processes.",
    descriptionKo: "산업 폐기물 처리 및 재활용 과정을 추적하는 시스템",
    provider: "청정누리 - KORAD 열린혁신 플랫폼",
    type: "API",
    price: "Paid",
    tags: ["Waste", "Tracking", "Recycling"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-12-05",
    views: 95
  },

  // Oil
  {
    id: "30",
    title: "Opinet",
    titleKo: "오피넷(Opinet)",
    description: "Oil price information site operated by KNOC for transparency of transactions and consumer price stabilization.",
    descriptionKo: "석유제품가격 조사·공개를 통한 거래의 투명성 및 소비자 가격 안정화를 위해 한국석유공사가 운영하고 있는 유가정보 사이트",
    provider: "오피넷(Opinet)",
    type: "API",
    price: "Freemium",
    tags: ["Oil", "Price", "Information"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-10",
    views: 27
  },
  {
    id: "3001",
    title: "Global Oil Market Analytics",
    titleKo: "글로벌 석유 시장 분석",
    description: "Advanced analytics on global oil supply, demand, and price trends.",
    descriptionKo: "글로벌 석유 공급, 수요 및 가격 추세에 대한 고급 분석",
    provider: "오피넷(Opinet)",
    type: "Agent",
    price: "Paid",
    tags: ["Oil", "Market", "Analytics"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-25",
    views: 130
  },

  // Power
  {
    id: "32",
    title: "KOWEPO Digital Sharing Center",
    titleKo: "한국서부발전 디지털공유센터",
    description: "Data sharing platform for development of services based on power generation data.",
    descriptionKo: "발전데이터 기반 서비스 개발을 위한 데이터 공유 플랫폼",
    provider: "한국서부발전 디지털공유센터",
    type: "API",
    price: "Paid",
    tags: ["Power", "Data", "Platform"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-08-25",
    views: 12
  },
  {
    id: "3201",
    title: "Power Grid Stability Monitor",
    titleKo: "전력망 안정성 모니터",
    description: "Real-time monitoring system for power grid stability and load balancing.",
    descriptionKo: "전력망 안정성 및 부하 분산을 위한 실시간 모니터링 시스템",
    provider: "한국서부발전 디지털공유센터",
    type: "API",
    price: "Paid",
    tags: ["Power", "Grid", "Monitoring"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-09-10",
    views: 115
  }
];

export interface BlogPost {
  id: string;
  title: string;
  titleKo?: string;
  excerpt: string;
  excerptKo?: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  imageGradient: string;
  image?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Multi-Agent AI Systems: Why Teams of AIs Beat Solo Models",
    titleKo: "멀티 에이전트 AI 시스템: AI 팀이 단일 모델보다 우수한 이유",
    excerpt: "Single agents hit a ceiling. Multi-agent systems scale by orchestrating specialized AIs that collaborate in real time.",
    excerptKo: "단일 에이전트는 한계에 부딪힙니다. 멀티 에이전트 시스템은 실시간으로 협업하는 전문 AI를 조율하여 확장합니다.",
    author: "Nikolas Barwicki",
    date: "Nov 20, 2025",
    category: "AI Agents",
    readTime: "5 min read",
    imageGradient: "from-purple-500 to-indigo-600",
    image: "abstract_multi-agent_ai_collaboration"
  },
  {
    id: "2",
    title: "How to Build an MCP Server in 15 Minutes",
    titleKo: "15분 만에 MCP 서버 구축하기",
    excerpt: "A practical guide to spinning up your first Model Context Protocol server with real endpoints and auth.",
    excerptKo: "실제 엔드포인트와 인증을 갖춘 첫 번째 Model Context Protocol 서버를 구축하는 실용적인 가이드입니다.",
    author: "Dev Team",
    date: "Nov 18, 2025",
    category: "Tutorial",
    readTime: "10 min read",
    imageGradient: "from-emerald-500 to-teal-600",
    image: "server_room_with_glowing_lights"
  },
  {
    id: "3",
    title: "Is RAG Still Relevant in 2026?",
    titleKo: "2026년에도 RAG는 여전히 유효한가?",
    excerpt: "What retrieval-augmented generation is great at, where it breaks, and how to layer tools and agents on top.",
    excerptKo: "검색 증강 생성(RAG)의 장점, 한계, 그리고 그 위에 도구와 에이전트를 계층화하는 방법에 대해 알아봅니다.",
    author: "Research Lab",
    date: "Nov 12, 2025",
    category: "Research",
    readTime: "8 min read",
    imageGradient: "from-blue-500 to-cyan-600",
    image: "futuristic_data_retrieval_rag_concept"
  },
  {
    id: "4",
    title: "Voice AI Agents: The Definitive Guide",
    titleKo: "음성 AI 에이전트: 완벽 가이드",
    excerpt: "Latency budgets, streaming architectures, and evaluation tips for production-ready voice agents.",
    excerptKo: "프로덕션 준비가 된 음성 에이전트를 위한 레이턴시 예산, 스트리밍 아키텍처 및 평가 팁을 제공합니다.",
    author: "Audio Team",
    date: "Oct 21, 2025",
    category: "Deep Dive",
    readTime: "12 min read",
    imageGradient: "from-orange-500 to-red-600",
    image: "voice_sound_wave_visualization"
  },
  {
    id: "5",
    title: "The Ethics of Autonomous Agents",
    titleKo: "자율 에이전트의 윤리",
    excerpt: "Exploring the moral implications and safety guardrails needed when deploying autonomous AI in critical infrastructure.",
    excerptKo: "중요 인프라에 자율 AI를 배포할 때 필요한 도덕적 의미와 안전 가드레일을 탐구합니다.",
    author: "Sarah Chen",
    date: "Oct 15, 2025",
    category: "Ethics",
    readTime: "7 min read",
    imageGradient: "from-rose-500 to-pink-600",
    image: "abstract_shield_security_logo_icon"
  },
  {
    id: "6",
    title: "Industrial IoT Data Standards 2026",
    titleKo: "2026 산업용 IoT 데이터 표준",
    excerpt: "A comprehensive overview of the new data protocols shaping smart manufacturing and factory automation.",
    excerptKo: "스마트 제조 및 공장 자동화를 형성하는 새로운 데이터 프로토콜에 대한 포괄적인 개요입니다.",
    author: "IoT Council",
    date: "Oct 05, 2025",
    category: "Industry Standards",
    readTime: "9 min read",
    imageGradient: "from-slate-600 to-slate-800",
    image: "iot_data_icon_abstract"
  },
  {
    id: "7",
    title: "Financial Forecasting with Transformer Models",
    titleKo: "트랜스포머 모델을 이용한 재무 예측",
    excerpt: "How modern transformer architectures are outperforming traditional time-series analysis in market prediction.",
    excerptKo: "현대 트랜스포머 아키텍처가 시장 예측에서 기존 시계열 분석을 어떻게 능가하고 있는지 알아봅니다.",
    author: "Quant Team",
    date: "Sep 28, 2025",
    category: "Finance",
    readTime: "15 min read",
    imageGradient: "from-emerald-600 to-green-700",
    image: "financial_data_icon_abstract"
  },
  {
    id: "8",
    title: "Optimizing API Latency for Real-time Agents",
    titleKo: "실시간 에이전트를 위한 API 레이턴시 최적화",
    excerpt: "Technical deep dive into caching strategies, edge computing, and protocol selection for sub-100ms response times.",
    excerptKo: "100ms 미만의 응답 시간을 위한 캐싱 전략, 엣지 컴퓨팅 및 프로토콜 선택에 대한 기술 심층 분석입니다.",
    author: "DevOps Lead",
    date: "Sep 10, 2025",
    category: "Engineering",
    readTime: "11 min read",
    imageGradient: "from-indigo-500 to-blue-600",
    image: "server_room_with_glowing_lights"
  }
];

export const PROVIDER_DESCRIPTIONS: Record<string, string> = {
  "소셜 트랜드 분석": "끊임없이 변화하는 웹 환경에 신속히 대응할 수 있도록 온라인에서 수집되는 다양한 형식의 빅데이터 분석서비스",
  "이미지 기반 특허 분석 서비스": "이미지 기반으로 글로벌 기술/기업/연구자/특허의 분석 콘텐츠를 연결한다.",
  "위밋 사이언스": "과학기술 언론보도 데이터를 기반으로 과학자와 매칭 서비스",
  "기업성장 빅데이터 센터": "다양한 범주의 데이터를 활용하는 과학적 기업 경영, 기술지원 및 경영혁신 진단 활용을 위한 기업성장 데이터 제공 서비스",
  "디지털 산업혁신 성숙도 진단": "회사가 필요한 기술을 선별적으로 도입하여, 경쟁력을 확보할 수 있도록 지원하는 디지털 혁신 컨설팅 서비스",
  "지역산업 거래망 분석": "그래프 이론을 기반으로 기업/지역/산업별 거래 관계를 그래프로 표현한 네트워크 분석 서비스",
  "지역산업 생태계 분석": "지역의 기업, 경기, 생산, 고용, 혁신 동향 등 빅데이터를 대시보드로 구현한 시각화 서비스",
  "주력산업 뉴스트랜드 분석": "산업별 뉴스기사를 워드 클라우드 형태로 구현한 서비스",
  "KIRIA 첨단로봇 실증지원 디지털 플랫폼": "연구장비지원 및 인증 서비스 제공을 위한 온라인 One-Stop 지원 플랫폼",
  "K-tools 스마트 장비관리 플랫폼": "장비등록, 교정알림 등의 스마트한 장비관리 및 연구정보 검색서비스",
  "스타트업 생태계 네트워크 시각화": "의미망 분석을 통해 도출된 신산업분류 기반의 스타트업 네트워크 시각화/탐색 서비스",
  "투자 네트워크 분석 서비스": "투자자와 피투자자 간의 투자 데이터를 시각화하여 수요자는 투자자 및 펀드를 탐색하고 투자처 발굴 가능",
  "디지털 오픈이노베이션 플랫폼": "'EffectMall'은 공급망 다각화를 위해 최적의 비즈니스 파트너를 찾아주는 디지털 오픈이노베이션 서비스를 기업에게 제공",
  "이커머스 Warehouse&Delivery": "입고/출고/반품 패턴 및 재고 배치 및 출고 작업 분석 등 물류센터 운영 및 관리 효율화에 활용할 수 있는 가시성 정보를 제공",
  "ETF/ETN 정보": "ETF, ETN 종목들의 기본 정보와 성과 및 위험분석",
  "M&A 시장통계분석 및 시각화": "M&A 매도기업과 매수기업의 매칭, 통계 및 분석 등의 조회/시각화 서비스",
  "EG-TIPS 에너지온실가스 종합 포털": "한국에너지공단이 운영하는 원스톱 에너지절감 및 온실가스감축 종합 포털",
  "K.sight": "30년간 축적된 무역보험 데이터에 맞춤형 지능형 무역보험 데이터 서비스 제공",
  "한국세라믹기술원 koMap": "소재데이터의 통합관리를 위한 체계적인 AI플랫폼",
  "산업데이터-X": "데이터 가치를 경험할 수 있는 산업데이터-X 플랫폼",
  "KOMIPO 전력중개플랫폼": "한국중부발전과 함께 안정적인 재생에너지 사업 운영",
  "공간융합 빅데이터 플랫폼": "민간과 공공이 협업하여 만든 최초의 공간정보 유통플랫폼",
  "K-ECP(KDN 에너지 클라우드 플랫폼)": "한전 KDN이 안전한 클라우드를 지원",
  "FACTORY ON 플랫폼": "산업단지 관련 4가지 플랫폼을 제공",
  "KIAT 혁신성장 플랫폼": "산업대전환의 미래를 선도하는 혁신성장 플랫폼",
  "SROME 산업기술 R&D 디지털 플랫폼": "연구자, 연구기관, 전문가를 위한 산업기술 R&D 디지털 플랫폼",
  "무역투자빅데이터 플랫폼(TriBIG)": "수출 준비는 무역투자 빅데이터 분석부터",
  "청정누리 - KORAD 열린혁신 플랫폼": "방사성폐기물의 안전하고 효율적인 관리",
  "에너지마켓플레이스(EDS)": "재생에너지 거래, 공간 정보 등 제공을 통해 지속 가능한 에너지 활용을 지원하는 플랫폼",
  "오피넷(Opinet)": "석유제품가격 조사·공개를 통한 거래의 투명성 및 소비자 가격 안정화를 위해 한국석유공사가 운영하고 있는 유가정보 사이트",
  "FIND 에너지 플랫폼": "금융, 정보, 신사업, 데이터를 제공하는 신재생에너지 플랫폼",
  "한국서부발전 디지털공유센터": "발전데이터 기반 서비스 개발을 위한 데이터 공유 플랫폼"
};

export const PROVIDER_TAGLINES: Record<string, string> = {
  "소셜 트랜드 분석": "디지털산업혁신플랫폼",
  "이미지 기반 특허 분석 서비스": "광개토연구소",
  "위밋 사이언스": "대덕넷",
  "기업성장 빅데이터 센터": "벡스인텔리전스",
  "디지털 산업혁신 성숙도 진단": "한국생산성본부",
  "지역산업 거래망 분석": "디지털산업혁신플랫폼",
  "지역산업 생태계 분석": "디지털산업혁신플랫폼",
  "주력산업 뉴스트랜드 분석": "디지털산업혁신플랫폼",
  "KIRIA 첨단로봇 실증지원 디지털 플랫폼": "한국로봇산업진흥원",
  "K-tools 스마트 장비관리 플랫폼": "한국산업기술시험원",
  "스타트업 생태계 네트워크 시각화": "한국인사이트연구소",
  "투자 네트워크 분석 서비스": "한국인사이트연구소",
  "디지털 오픈이노베이션 플랫폼": "한국산업기술시험원",
  "이커머스 Warehouse&Delivery": "이앤씨지엘에스",
  "ETF/ETN 정보": "에프앤가이드",
  "M&A 시장통계분석 및 시각화": "한국M&A거래소",
  "EG-TIPS 에너지온실가스 종합 포털": "한국에너지공단",
  "K.sight": "한국무역보험공사",
  "한국세라믹기술원 koMap": "한국세라믹기술원",
  "산업데이터-X": "한국산업기술시험원",
  "KOMIPO 전력중개플랫폼": "한국중부발전(주)",
  "공간융합 빅데이터 플랫폼": "한국전력기술(주)",
  "K-ECP(KDN 에너지 클라우드 플랫폼)": "한전KDN",
  "FACTORY ON 플랫폼": "한국산업단지공단",
  "KIAT 혁신성장 플랫폼": "한국산업기술진흥원",
  "SROME 산업기술 R&D 디지털 플랫폼": "한국산업기술기획평가원",
  "무역투자빅데이터 플랫폼(TriBIG)": "대한무역투자진흥공사",
  "청정누리 - KORAD 열린혁신 플랫폼": "한국원자력환경공단",
  "에너지마켓플레이스(EDS)": "한국전력공사",
  "오피넷(Opinet)": "한국석유공사",
  "FIND 에너지 플랫폼": "한국남동발전(주)",
  "한국서부발전 디지털공유센터": "한국서부발전(주)"
};
