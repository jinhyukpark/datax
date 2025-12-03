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
  // AI Assistant
  {
    id: "1",
    title: "ChatGPT Assistant Agent",
    titleKo: "ChatGPT 어시스턴트 에이전트",
    description: "AI-powered conversational agent for customer support and internal knowledge base queries.",
    descriptionKo: "고객 지원 및 내부 지식 기반 쿼리를 위한 AI 기반 대화형 에이전트입니다.",
    provider: "NextWave Automation",
    type: "Agent",
    price: "Paid",
    tags: ["AI Assistant", "automation", "chat"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-07-13",
    views: 1240,
    featured: true,
    specs: { format: "JSON/REST", frequency: "Real-time", access: "API Key" }
  },
  {
    id: "101",
    title: "Claude Professional Agent",
    titleKo: "Claude 프로페셔널 에이전트",
    description: "Advanced reasoning agent powered by Claude for complex task breakdown.",
    descriptionKo: "복잡한 작업 분석을 위해 Claude 기반으로 구동되는 고급 추론 에이전트입니다.",
    provider: "Anthropic",
    type: "Agent",
    price: "Paid",
    tags: ["AI Assistant", "reasoning", "chat"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-08-01",
    views: 1500
  },
  {
    id: "102",
    title: "Personal Shopper AI",
    titleKo: "퍼스널 쇼퍼 AI",
    description: "E-commerce assistant that helps users find products based on natural language.",
    descriptionKo: "자연어를 기반으로 사용자가 제품을 찾을 수 있도록 돕는 이커머스 어시스턴트입니다.",
    provider: "Shopify",
    type: "Agent",
    price: "Freemium",
    tags: ["AI Assistant", "ecommerce", "shopping"],
    image: "abstract_shopping_bag_logo_icon",
    publishedDate: "2025-09-10",
    views: 800
  },

  // Customer Service
  {
    id: "2",
    title: "ChatBot Agent Pro",
    titleKo: "챗봇 에이전트 프로",
    description: "Advanced customer service bot with sentiment analysis and escalation protocols.",
    descriptionKo: "감정 분석 및 에스컬레이션 프로토콜을 갖춘 고급 고객 서비스 봇입니다.",
    provider: "ServiceTech",
    type: "Agent",
    price: "Paid",
    tags: ["Customer Service", "support", "bot"],
    image: "abstract_robot_head_logo_icon",
    publishedDate: "2025-08-20",
    views: 980
  },
  {
    id: "3",
    title: "Customer Support Agent Lite",
    titleKo: "고객 지원 에이전트 라이트",
    description: "Lightweight support agent for small businesses.",
    descriptionKo: "소규모 비즈니스를 위한 경량형 지원 에이전트입니다.",
    provider: "ServiceTech",
    type: "Agent",
    price: "Paid",
    tags: ["Customer Service", "support", "smb"],
    image: "abstract_robot_head_logo_icon",
    publishedDate: "2025-09-01",
    views: 450
  },
  {
    id: "201",
    title: "HelpDesk AI Integrator",
    titleKo: "헬프데스크 AI 통합기",
    description: "Connects AI agents to existing helpdesk software like Zendesk.",
    descriptionKo: "AI 에이전트를 Zendesk와 같은 기존 헬프데스크 소프트웨어에 연결합니다.",
    provider: "IntegrateIO",
    type: "API",
    price: "Paid",
    tags: ["Customer Service", "integration", "helpdesk"],
    image: "abstract_integration_puzzle_logo_icon",
    publishedDate: "2025-09-15",
    views: 600
  },
  {
    id: "202",
    title: "Voice Support Bot",
    titleKo: "음성 지원 봇",
    description: "Voice-enabled customer support agent for call centers.",
    descriptionKo: "콜센터를 위한 음성 인식 고객 지원 에이전트입니다.",
    provider: "VoiceAI",
    type: "Agent",
    price: "Paid",
    tags: ["Customer Service", "voice", "call-center"],
    image: "abstract_voice_wave_logo_icon",
    publishedDate: "2025-10-05",
    views: 1200
  },

  // Manufacturing
  {
    id: "4",
    title: "Industrial Sensor Data",
    titleKo: "산업용 센서 데이터",
    description: "Raw sensor data from manufacturing plants for predictive maintenance analysis.",
    descriptionKo: "예지 보전 분석을 위한 제조 공장의 원시 센서 데이터입니다.",
    provider: "ManufacturingCore Tech",
    type: "API",
    price: "Paid",
    tags: ["Manufacturing", "iot", "sensor"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-11-15",
    views: 856
  },
  {
    id: "401",
    title: "Factory Twin Model",
    titleKo: "팩토리 트윈 모델",
    description: "Digital twin API for simulating factory floor operations.",
    descriptionKo: "공장 현장 운영 시뮬레이션을 위한 디지털 트윈 API입니다.",
    provider: "Siemens",
    type: "API",
    price: "Paid",
    tags: ["Manufacturing", "digital-twin", "simulation"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-10-25",
    views: 750
  },
  {
    id: "402",
    title: "Quality Control Vision",
    titleKo: "품질 관리 비전",
    description: "Computer vision dataset for detecting defects in manufacturing.",
    descriptionKo: "제조 결함 탐지를 위한 컴퓨터 비전 데이터셋입니다.",
    provider: "VisionTech",
    type: "Dataset",
    price: "Paid",
    tags: ["Manufacturing", "vision", "quality"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-11-01",
    views: 500
  },

  // AI/ML
  {
    id: "5",
    title: "GPT-4 API",
    titleKo: "GPT-4 API",
    description: "Advanced language model API for natural language processing and generation.",
    descriptionKo: "자연어 처리 및 생성을 위한 고급 언어 모델 API입니다.",
    provider: "OpenAI",
    type: "API",
    price: "Paid",
    tags: ["AI/ML", "nlp", "generation"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-11-27",
    views: 486
  },
  {
    id: "6",
    title: "Vision Model V2",
    titleKo: "비전 모델 V2",
    description: "Computer vision model for object detection and classification.",
    descriptionKo: "객체 탐지 및 분류를 위한 컴퓨터 비전 모델입니다.",
    provider: "Visionary AI",
    type: "API",
    price: "Paid",
    tags: ["AI/ML", "vision", "image"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-10-12",
    views: 320
  },
  {
    id: "501",
    title: "Llama 3 Fine-tuning",
    titleKo: "Llama 3 파인튜닝",
    description: "API for fine-tuning Llama 3 models on custom datasets.",
    descriptionKo: "커스텀 데이터셋에서 Llama 3 모델을 파인튜닝하기 위한 API입니다.",
    provider: "Meta",
    type: "API",
    price: "Free",
    tags: ["AI/ML", "llm", "open-source"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-09-20",
    views: 2000
  },
  {
    id: "502",
    title: "Stable Diffusion API",
    titleKo: "Stable Diffusion API",
    description: "Image generation API based on Stable Diffusion XL.",
    descriptionKo: "Stable Diffusion XL 기반의 이미지 생성 API입니다.",
    provider: "Stability AI",
    type: "API",
    price: "Freemium",
    tags: ["AI/ML", "image-gen", "art"],
    image: "abstract_ai_hexagon_logo_icon",
    publishedDate: "2025-08-15",
    views: 1800
  },

  // Analytics
  {
    id: "7",
    title: "Data Analytics Agent",
    titleKo: "데이터 분석 에이전트",
    description: "Automated data analyst that generates insights from raw CSV uploads.",
    descriptionKo: "CSV 업로드에서 인사이트를 생성하는 자동화된 데이터 분석가입니다.",
    provider: "DataMind",
    type: "Agent",
    price: "Paid",
    tags: ["Analytics", "insight", "reporting"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-09-15",
    views: 1100
  },
  {
    id: "8",
    title: "Unified Analytics Platform",
    titleKo: "통합 분석 플랫폼",
    description: "Comprehensive dashboarding API for cross-platform metrics.",
    descriptionKo: "크로스 플랫폼 지표를 위한 포괄적인 대시보드 API입니다.",
    provider: "MetricStream",
    type: "API",
    price: "Freemium",
    tags: ["Analytics", "dashboard", "metrics"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-01",
    views: 750
  },
  {
    id: "701",
    title: "Predictive Sales Model",
    titleKo: "예측 판매 모델",
    description: "Forecasting API for sales trends based on historical data.",
    descriptionKo: "과거 데이터를 기반으로 판매 추세를 예측하는 API입니다.",
    provider: "SalesForce",
    type: "API",
    price: "Paid",
    tags: ["Analytics", "sales", "forecasting"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-10",
    views: 650
  },
  {
    id: "702",
    title: "Web Traffic Analyzer",
    titleKo: "웹 트래픽 분석기",
    description: "Agent that analyzes web traffic logs and suggests SEO improvements.",
    descriptionKo: "웹 트래픽 로그를 분석하고 SEO 개선을 제안하는 에이전트입니다.",
    provider: "SEO Master",
    type: "Agent",
    price: "Paid",
    tags: ["Analytics", "seo", "web"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-05",
    views: 900
  },

  // Finance
  {
    id: "9",
    title: "Financial Data API",
    titleKo: "금융 데이터 API",
    description: "Real-time stock market and cryptocurrency data feed.",
    descriptionKo: "실시간 주식 시장 및 암호화폐 데이터 피드입니다.",
    provider: "FinTech Solutions",
    type: "API",
    price: "Freemium",
    tags: ["Finance", "market", "stocks"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-08",
    views: 2100
  },
  {
    id: "901",
    title: "Crypto Wallet Tracker",
    titleKo: "암호화폐 지갑 추적기",
    description: "API to track portfolio value across multiple blockchains.",
    descriptionKo: "여러 블록체인에 걸쳐 포트폴리오 가치를 추적하는 API입니다.",
    provider: "BlockFolio",
    type: "API",
    price: "Free",
    tags: ["Finance", "crypto", "blockchain"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-09-05",
    views: 1300
  },
  {
    id: "902",
    title: "Tax Calculation Agent",
    titleKo: "세금 계산 에이전트",
    description: "AI agent that helps calculate estimated taxes for freelancers.",
    descriptionKo: "프리랜서의 예상 세금 계산을 돕는 AI 에이전트입니다.",
    provider: "TaxEasy",
    type: "Agent",
    price: "Paid",
    tags: ["Finance", "tax", "accounting"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-11-12",
    views: 550
  },

  // Financial Services
  {
    id: "10",
    title: "Financial Market Intelligence",
    titleKo: "금융 시장 인텔리전스",
    description: "Deep dive analysis reports generated by AI agents on market trends.",
    descriptionKo: "시장 동향에 대해 AI 에이전트가 생성한 심층 분석 보고서입니다.",
    provider: "QuantumFinance",
    type: "Agent",
    price: "Paid",
    tags: ["Financial Services", "intelligence", "report"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-20",
    views: 1500
  },
  {
    id: "1001",
    title: "Loan Risk Assessor",
    titleKo: "대출 위험 평가기",
    description: "API for assessing loan applicant risk based on alternative data.",
    descriptionKo: "대안 데이터를 기반으로 대출 신청자의 위험을 평가하는 API입니다.",
    provider: "CreditSafe",
    type: "API",
    price: "Paid",
    tags: ["Financial Services", "risk", "credit"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-08-30",
    views: 800
  },
  {
    id: "1002",
    title: "Fraud Detection System",
    titleKo: "사기 탐지 시스템",
    description: "Real-time fraud detection API for payment gateways.",
    descriptionKo: "결제 게이트웨이를 위한 실시간 사기 탐지 API입니다.",
    provider: "SecurePay",
    type: "API",
    price: "Paid",
    tags: ["Financial Services", "security", "fraud"],
    image: "abstract_shield_security_logo_icon",
    publishedDate: "2025-09-25",
    views: 1100
  },

  // Operations
  {
    id: "11",
    title: "Operations Co-Pilot",
    description: "AI assistant for managing daily operational workflows and scheduling.",
    provider: "OpsGenie",
    type: "Agent",
    price: "Paid",
    tags: ["Operations", "workflow", "management"],
    publishedDate: "2025-11-05",
    views: 600
  },
  {
    id: "1101",
    title: "Inventory Management API",
    description: "API for tracking inventory levels and predicting restock needs.",
    provider: "StockKeeper",
    type: "API",
    price: "Paid",
    tags: ["Operations", "inventory", "logistics"],
    publishedDate: "2025-10-15",
    views: 700
  },
  {
    id: "1102",
    title: "HR Onboarding Agent",
    description: "Agent that guides new employees through the onboarding process.",
    provider: "PeopleOps",
    type: "Agent",
    price: "Paid",
    tags: ["Operations", "hr", "employee"],
    publishedDate: "2025-09-10",
    views: 400
  },

  // Transport
  {
    id: "12",
    title: "Public Transit Schedule",
    description: "Real-time bus and subway schedules for major metropolitan areas.",
    provider: "CityTransport",
    type: "Dataset",
    price: "Free",
    tags: ["Transport", "public", "schedule"],
    publishedDate: "2025-11-27",
    views: 4100
  },
  {
    id: "1201",
    title: "Traffic Flow Data",
    description: "Real-time traffic density data for urban planning.",
    provider: "UrbanData",
    type: "Dataset",
    price: "Paid",
    tags: ["Transport", "traffic", "urban"],
    publishedDate: "2025-10-05",
    views: 950
  },
  {
    id: "1202",
    title: "Ride Sharing API",
    description: "API for aggregating ride-sharing options and pricing.",
    provider: "RideAggregator",
    type: "API",
    price: "Freemium",
    tags: ["Transport", "mobility", "ride-share"],
    publishedDate: "2025-11-10",
    views: 1200
  },

  // Transportation (Merging similar items into Transport if possible, but keeping distinct as requested previously or just adding to it)
  {
    id: "13",
    title: "Logistics Route Optimizer",
    description: "API for optimizing delivery routes based on traffic and weather conditions.",
    provider: "LogiTech",
    type: "API",
    price: "Paid",
    tags: ["Transportation", "logistics", "routing"],
    publishedDate: "2025-09-30",
    views: 890
  },
  {
    id: "1301",
    title: "Freight Rate Index",
    description: "Global freight shipping rate index API.",
    provider: "GlobalShipping",
    type: "API",
    price: "Paid",
    tags: ["Transportation", "freight", "shipping"],
    publishedDate: "2025-08-25",
    views: 600
  },

  // Weather
  {
    id: "14",
    title: "Global Weather API",
    description: "Current weather, forecasts, and historical data for any location.",
    provider: "MeteoGlobal",
    type: "API",
    price: "Freemium",
    tags: ["Weather", "forecast", "climate"],
    publishedDate: "2025-11-27",
    views: 4300
  },
  {
    id: "15",
    title: "OpenWeather API",
    description: "Simple and fast weather API for developers.",
    provider: "OpenWeather",
    type: "API",
    price: "Freemium",
    tags: ["Weather", "simple", "fast"],
    publishedDate: "2025-11-20",
    views: 3200
  },
  {
    id: "1401",
    title: "Agricultural Weather Data",
    description: "Specialized weather data for crop management.",
    provider: "AgriTech",
    type: "Dataset",
    price: "Paid",
    tags: ["Weather", "agriculture", "crops"],
    publishedDate: "2025-09-15",
    views: 500
  },
  {
    id: "1402",
    title: "Severe Weather Alerts",
    description: "Push notification API for severe weather warnings.",
    provider: "AlertSystem",
    type: "API",
    price: "Free",
    tags: ["Weather", "alert", "safety"],
    publishedDate: "2025-10-30",
    views: 1500
  },

  // Artificial Intelligence
  {
    id: "16",
    title: "Multi-Agent AI Systems",
    description: "Orchestration platform for multiple specialized AI agents.",
    provider: "NextWave",
    type: "Agent",
    price: "Paid",
    tags: ["Artificial Intelligence", "orchestration", "multi-agent"],
    publishedDate: "2025-07-13",
    views: 1500
  },
  {
    id: "1601",
    title: "Neural Network Visualizer",
    description: "Tool for visualizing neural network architectures.",
    provider: "AI Labs",
    type: "Dataset", // Or tool, represented as dataset here for simplicity
    price: "Free",
    tags: ["Artificial Intelligence", "visualization", "education"],
    publishedDate: "2025-08-10",
    views: 900
  },
  {
    id: "1602",
    title: "Ethics in AI Guidelines",
    description: "Comprehensive dataset of AI ethics guidelines and standards.",
    provider: "EthicalAI Org",
    type: "Dataset",
    price: "Free",
    tags: ["Artificial Intelligence", "ethics", "policy"],
    publishedDate: "2025-09-05",
    views: 1100
  },

  // Industrial IoT
  {
    id: "17",
    title: "Industrial IoT Data Stream",
    description: "High-frequency sensor data stream for industrial machinery.",
    provider: "IoTech",
    type: "API",
    price: "Freemium",
    tags: ["Industrial IoT", "stream", "machinery"],
    publishedDate: "2025-11-15",
    views: 900
  },
  {
    id: "1701",
    title: "Predictive Maintenance Agent",
    description: "Agent that analyzes IoT data to predict equipment failures.",
    provider: "MaintAI",
    type: "Agent",
    price: "Paid",
    tags: ["Industrial IoT", "maintenance", "prediction"],
    publishedDate: "2025-10-20",
    views: 850
  },
  {
    id: "1702",
    title: "Energy Consumption Tracker",
    description: "API for monitoring energy usage in industrial facilities.",
    provider: "GreenFactory",
    type: "API",
    price: "Paid",
    tags: ["Industrial IoT", "energy", "sustainability"],
    publishedDate: "2025-11-01",
    views: 600
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
  "Anthropic": "Anthropic is an AI safety and research company that builds reliable, interpretable, and steerable AI systems. We are dedicated to creating AI that is helpful, honest, and harmless, with a focus on large-scale systems like Claude that can reason, code, and communicate effectively.",
  "OpenAI": "OpenAI is an AI research and deployment company dedicated to ensuring that artificial general intelligence benefits all of humanity. We develop cutting-edge models like GPT-4 and DALL-E, providing powerful APIs for natural language processing, image generation, and more.",
  "Shopify": "Shopify is a leading global commerce company, providing trusted tools to start, grow, market, and manage a retail business of any size. Our data solutions empower merchants with insights into customer behavior, inventory optimization, and sales trends.",
  "ServiceTech": "ServiceTech specializes in advanced customer service automation solutions. Our AI-driven agents and analytics platforms help businesses reduce response times, improve customer satisfaction, and streamline support operations across multiple channels.",
  "IntegrateIO": "IntegrateIO provides low-code data integration for cloud-based data warehouses. We help organizations build data pipelines, transform data, and connect disparate systems to create a unified view of their business intelligence.",
  "VoiceAI": "VoiceAI is pioneering the future of voice interactions. Our state-of-the-art speech recognition and synthesis technologies enable developers to build immersive voice-enabled applications for customer support, accessibility, and entertainment.",
  "Siemens": "Siemens is a technology company focused on industry, infrastructure, transport, and healthcare. Our digital twin and industrial IoT solutions help manufacturers optimize production, improve quality, and reduce resource consumption through data-driven insights.",
  "Meta": "Meta builds technologies that help people connect, find communities, and grow businesses. We are committed to open science and open source AI, releasing powerful models like Llama to the community to foster innovation and collaboration.",
  "SalesForce": "Salesforce is the world's #1 customer relationship management (CRM) platform. Our data and AI solutions help companies connect with their customers in a whole new way, unifying marketing, sales, service, commerce, and IT on a single platform.",
  "Stability AI": "Stability AI is the world's leading open source generative AI company. We provide developers with the tools to create breakthrough applications across image, video, audio, and 3D generation, democratizing access to creative potential.",
  "NextWave Automation": "NextWave Automation delivers enterprise-grade AI agent orchestration platforms. We enable businesses to deploy, manage, and scale autonomous workforce solutions that handle complex workflows with human-like reasoning and reliability.",
  "FinTech Solutions": "A premier provider of real-time financial market data and analytics. We serve global financial institutions with high-frequency trading data, historical market records, and advanced risk analysis tools.",
  "MeteoGlobal": "The world's most accurate weather intelligence platform. We provide hyper-local weather forecasts, historical climate data, and severe weather alerts to help businesses across agriculture, aviation, and logistics make better decisions.",
  "CityTransport": "Dedicated to making urban mobility smarter and more efficient. We aggregate real-time public transit data, traffic patterns, and mobility insights to help cities and commuters navigate complex transportation networks.",
  "ManufacturingCore Tech": "Specializing in industrial IoT connectivity and sensor data analytics. We help manufacturers digitize their factory floors, monitor equipment health in real-time, and predict maintenance needs to prevent downtime.",
  "VisionTech": "Leading the way in computer vision for manufacturing quality control. Our datasets help train models to detect defects with superhuman accuracy.",
  "Visionary AI": "Developing next-generation computer vision models for robotics and autonomous systems.",
  "DataMind": "Empowering businesses with automated data analysis agents that turn raw numbers into actionable insights instantly.",
  "MetricStream": "Providing unified analytics dashboards that bring all your key performance indicators into a single, real-time view.",
  "SEO Master": "AI-driven SEO tools that help websites rank higher by analyzing traffic patterns and content performance.",
  "BlockFolio": "The most trusted cryptocurrency portfolio tracking solution, supporting data from hundreds of exchanges and wallets.",
  "TaxEasy": "Simplifying tax compliance for the gig economy with AI-powered expense tracking and tax estimation agents.",
  "QuantumFinance": "Applying quantum-inspired algorithms to financial market analysis for unprecedented predictive accuracy.",
  "CreditSafe": "Alternative credit scoring using non-traditional data points to help lenders assess risk more accurately.",
  "SecurePay": "Protecting digital transactions with real-time fraud detection powered by advanced machine learning.",
  "OpsGenie": "Optimizing operational workflows with intelligent agents that handle scheduling, dispatching, and resource allocation.",
  "StockKeeper": "Modern inventory management solutions that use AI to predict demand and optimize stock levels.",
  "PeopleOps": "Streamlining HR processes with AI agents that handle onboarding, benefits administration, and employee inquiries.",
  "UrbanData": "Providing high-resolution urban data for city planners, real estate developers, and researchers.",
  "RideAggregator": "Connecting mobility services into a single API to provide seamless transportation options for users.",
  "LogiTech": "Optimizing global supply chains with data-driven routing and logistics management tools.",
  "GlobalShipping": "The standard for freight shipping rates and maritime logistics data.",
  "OpenWeather": "Open source weather data for developers building the next generation of climate-aware applications.",
  "AgriTech": "Precision agriculture data solutions that help farmers maximize yield and minimize resource usage.",
  "AlertSystem": "Critical event notification systems that keep people safe during severe weather and emergencies.",
  "NextWave": "Building the orchestration layer for the multi-agent future of AI.",
  "AI Labs": "Researching and visualizing the inner workings of neural networks to make AI more transparent and explainable.",
  "EthicalAI Org": "Establishing standards and guidelines for the ethical development and deployment of artificial intelligence.",
  "IoTech": "Industrial IoT platform for connecting machines, sensors, and systems.",
  "MaintAI": "Predictive maintenance solutions that prevent equipment failure before it happens.",
  "GreenFactory": "Helping industrial facilities reduce their carbon footprint through energy monitoring and optimization."
};

export const PROVIDER_TAGLINES: Record<string, string> = {
  "Anthropic": "AI Safety & Research",
  "OpenAI": "AI Research & Deployment",
  "Shopify": "Global Commerce Platform",
  "ServiceTech": "Customer Service Automation",
  "IntegrateIO": "Data Integration Platform",
  "VoiceAI": "Voice Interaction Technology",
  "Siemens": "Industrial Technology",
  "Meta": "Social Technology & AI",
  "SalesForce": "CRM & Cloud Computing",
  "Stability AI": "Open Source Generative AI",
  "NextWave Automation": "Enterprise AI Orchestration",
  "FinTech Solutions": "Financial Market Data",
  "MeteoGlobal": "Weather Intelligence",
  "CityTransport": "Urban Mobility Data",
  "ManufacturingCore Tech": "Industrial IoT Solutions",
  "VisionTech": "Computer Vision for Industry",
  "Visionary AI": "Next-Gen Computer Vision",
  "DataMind": "Automated Data Analysis",
  "MetricStream": "Unified Analytics Dashboards",
  "SEO Master": "AI-Driven SEO Tools",
  "BlockFolio": "Crypto Portfolio Tracking",
  "TaxEasy": "Freelance Tax Solutions",
  "QuantumFinance": "Quantum Financial Analysis",
  "CreditSafe": "Alternative Credit Scoring",
  "SecurePay": "Real-Time Fraud Detection",
  "OpsGenie": "Operational Workflow AI",
  "StockKeeper": "Smart Inventory Management",
  "PeopleOps": "HR Automation Agents",
  "UrbanData": "Urban Planning Data",
  "RideAggregator": "Mobility Aggregation API",
  "LogiTech": "Supply Chain Optimization",
  "GlobalShipping": "Global Freight Data",
  "OpenWeather": "Open Weather Data",
  "AgriTech": "Precision Agriculture",
  "AlertSystem": "Emergency Alert System",
  "NextWave": "Multi-Agent Orchestration",
  "AI Labs": "Neural Network Research",
  "EthicalAI Org": "AI Ethics Standards",
  "IoTech": "Industrial IoT Platform",
  "MaintAI": "Predictive Maintenance AI",
  "GreenFactory": "Industrial Energy Management"
};
