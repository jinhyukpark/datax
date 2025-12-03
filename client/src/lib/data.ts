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
  description: string;
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
    description: "AI-powered conversational agent for customer support and internal knowledge base queries.",
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
    description: "Advanced reasoning agent powered by Claude for complex task breakdown.",
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
    description: "E-commerce assistant that helps users find products based on natural language.",
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
    description: "Advanced customer service bot with sentiment analysis and escalation protocols.",
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
    description: "Lightweight support agent for small businesses.",
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
    description: "Connects AI agents to existing helpdesk software like Zendesk.",
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
    description: "Voice-enabled customer support agent for call centers.",
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
    description: "Raw sensor data from manufacturing plants for predictive maintenance analysis.",
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
    description: "Digital twin API for simulating factory floor operations.",
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
    description: "Computer vision dataset for detecting defects in manufacturing.",
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
    description: "Advanced language model API for natural language processing and generation.",
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
    description: "Computer vision model for object detection and classification.",
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
    description: "API for fine-tuning Llama 3 models on custom datasets.",
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
    description: "Image generation API based on Stable Diffusion XL.",
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
    description: "Automated data analyst that generates insights from raw CSV uploads.",
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
    description: "Comprehensive dashboarding API for cross-platform metrics.",
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
    description: "Forecasting API for sales trends based on historical data.",
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
    description: "Agent that analyzes web traffic logs and suggests SEO improvements.",
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
    description: "Real-time stock market and cryptocurrency data feed.",
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
    description: "API to track portfolio value across multiple blockchains.",
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
    description: "AI agent that helps calculate estimated taxes for freelancers.",
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
    description: "Deep dive analysis reports generated by AI agents on market trends.",
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
    description: "API for assessing loan applicant risk based on alternative data.",
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
    description: "Real-time fraud detection API for payment gateways.",
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
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  imageGradient: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Multi-Agent AI Systems: Why Teams of AIs Beat Solo Models",
    excerpt: "Single agents hit a ceiling. Multi-agent systems scale by orchestrating specialized AIs that collaborate in real time.",
    author: "Nikolas Barwicki",
    date: "Nov 20, 2025",
    category: "AI Agents",
    readTime: "5 min read",
    imageGradient: "from-purple-500 to-indigo-600",
  },
  {
    id: "2",
    title: "How to Build an MCP Server in 15 Minutes",
    excerpt: "A practical guide to spinning up your first Model Context Protocol server with real endpoints and auth.",
    author: "Dev Team",
    date: "Nov 18, 2025",
    category: "Tutorial",
    readTime: "10 min read",
    imageGradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "3",
    title: "Is RAG Still Relevant in 2026?",
    excerpt: "What retrieval-augmented generation is great at, where it breaks, and how to layer tools and agents on top.",
    author: "Research Lab",
    date: "Nov 12, 2025",
    category: "Research",
    readTime: "8 min read",
    imageGradient: "from-blue-500 to-cyan-600",
  },
  {
    id: "4",
    title: "Voice AI Agents: The Definitive Guide",
    excerpt: "Latency budgets, streaming architectures, and evaluation tips for production-ready voice agents.",
    author: "Audio Team",
    date: "Oct 21, 2025",
    category: "Deep Dive",
    readTime: "12 min read",
    imageGradient: "from-orange-500 to-red-600",
  }
];
