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
  {
    id: "1",
    title: "Multi-Agent AI Systems Platform",
    description: "Enterprise-grade multi-agent AI platform that orchestrates specialized AI agents to solve complex business problems through intelligent collaboration.",
    provider: "NextWave Automation",
    type: "Agent",
    price: "Paid",
    priceAmount: "$499/mo",
    tags: ["automation", "workflow", "enterprise"],
    image: "ai_agent_icon_abstract",
    publishedDate: "2025-07-13",
    views: 1240,
    featured: true,
    specs: {
      format: "JSON/REST",
      frequency: "Real-time",
      access: "API Key",
    },
    longDescription: "Imagine a team of specialized AIs working together to solve your biggest problems. This isn't about one AI doing everything. It's about creating a team of specialized AIs that work together.",
    useCases: ["Customer Support Automation", "Complex Data Analysis", "Supply Chain Optimization"]
  },
  {
    id: "2",
    title: "Industrial IoT Data Stream API",
    description: "Real-time industrial sensor data API providing manufacturing metrics, equipment status, and predictive maintenance insights.",
    provider: "ManufacturingCore Tech",
    type: "API",
    price: "Freemium",
    tags: ["iot", "manufacturing", "sensor"],
    image: "iot_data_icon_abstract",
    publishedDate: "2025-11-15",
    views: 856,
    specs: {
      format: "WebSocket/JSON",
      frequency: "Real-time (<100ms)",
      access: "OAuth 2.0",
    },
  },
  {
    id: "3",
    title: "Financial Market Intelligence Agent",
    description: "AI-powered financial analysis agent that provides real-time market insights, risk assessment, and investment recommendations.",
    provider: "QuantumFinance Analytics",
    type: "Agent",
    price: "Paid",
    priceAmount: "$299/mo",
    tags: ["finance", "market", "analytics"],
    image: "financial_data_icon_abstract",
    publishedDate: "2025-10-08",
    views: 2100,
    featured: true,
    specs: {
      format: "PDF/JSON Report",
      frequency: "Daily/On-demand",
      access: "Dashboard/API",
    },
  },
  {
    id: "4",
    title: "Global Weather API",
    description: "Real-time weather data for any location worldwide including historical data and 14-day forecasts.",
    provider: "KOITA",
    type: "API",
    price: "Freemium",
    tags: ["weather", "environment", "global"],
    publishedDate: "2025-11-27",
    views: 4300,
  },
  {
    id: "5",
    title: "GPT-4 Industrial Fine-tune",
    description: "Advanced language model API fine-tuned for industrial technical documentation and safety protocols.",
    provider: "KIAT",
    type: "API",
    price: "Paid",
    tags: ["llm", "industrial", "safety"],
    publishedDate: "2025-11-27",
    views: 486,
  },
  {
    id: "6",
    title: "Public Transit Schedule",
    description: "Open data API for city bus and subway schedules across major metropolitan areas.",
    provider: "KISTEP",
    type: "Dataset",
    price: "Free",
    tags: ["transport", "public", "schedule"],
    publishedDate: "2025-11-27",
    views: 4100,
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
