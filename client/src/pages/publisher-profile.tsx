import { useRoute, Link } from "wouter";
import { RESOURCES } from "@/lib/data";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ResourceCard } from "@/components/ui/resource-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  MapPin, 
  Globe, 
  Mail, 
  ShieldCheck, 
  Users, 
  Star, 
  Calendar,
  Twitter,
  Linkedin,
  Github,
  ArrowLeft
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function PublisherProfile() {
  const [, params] = useRoute("/publisher/:id");
  const { t } = useLanguage();
  
  // Decode the provider ID (name) from the URL
  const providerName = params?.id ? decodeURIComponent(params.id) : "";
  
  // Provider descriptions mapping
  const providerDescriptions: Record<string, string> = {
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
    "NextWave Automation": "NextWave Automation delivers enterprise-grade AI agent orchestration platforms. We enable businesses to deploy, manage, and scale autonomous workforce solutions that handle complex workflows with human-like reasoning and reliability."
  };

  // Generic description generator for others
  const genericDescription = `A trusted provider of high-quality data resources and technological solutions. ${providerName} is committed to delivering reliable, scalable, and secure infrastructure to help organizations innovate and grow. Specialized in delivering value through data-driven insights and advanced API capabilities.`;

  const description = providerDescriptions[providerName] || genericDescription;

  // Filter resources by this provider
  const providerResources = RESOURCES.filter(r => r.provider === providerName);
  
  // Calculate stats
  const totalViews = providerResources.reduce((acc, curr) => acc + curr.views, 0);
  const totalResources = providerResources.length;
  // Mock rating (randomized seeded by name length for consistency, or just fixed)
  const rating = 4.8; 
  const reviewCount = totalResources * 42 + 15;

  if (!providerName) return <div>Publisher not found</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 font-sans">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link href="/platforms" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("Back to Platforms", "플랫폼으로 돌아가기")}
          </Link>
        </div>

        {/* Header Profile Section */}
        <div className="mb-12 rounded-2xl bg-white p-8 shadow-sm border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo Placeholder */}
            <div className="h-32 w-32 shrink-0 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 dark:bg-slate-800 dark:border-slate-700">
              <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {providerName.charAt(0)}
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold font-heading text-foreground">{providerName}</h1>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 gap-1 dark:bg-green-900/20 dark:text-green-300">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified Publisher
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a href="#" className="hover:text-primary hover:underline">https://{providerName.toLowerCase().replace(/\s/g, '')}.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined July 2024
                </div>
              </div>

              {/* Socials */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="ml-2 h-8 gap-2">
                  <Mail className="h-3.5 w-3.5" />
                  Contact
                </Button>
              </div>
            </div>

            {/* Stats Card */}
            <Card className="w-full md:w-64 shrink-0 bg-slate-50 border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Resources</span>
                  <span className="font-bold text-lg">{totalResources}</span>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <span className="font-bold text-lg">{totalViews.toLocaleString()}</span>
                </div>
                <div className="h-px bg-slate-200 dark:bg-slate-700" />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-lg">{rating}</span>
                    <span className="text-xs text-muted-foreground">({reviewCount})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resources Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
              <Building2 className="h-6 w-6 text-indigo-500" />
              Published Resources
            </h2>
            <div className="flex gap-2">
               {/* Filter placeholders could go here */}
            </div>
          </div>

          {providerResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerResources.map(resource => (
                <div key={resource.id} className="h-full">
                  <ResourceCard resource={resource} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 dark:bg-slate-900 dark:border-slate-700">
              <p className="text-muted-foreground">No resources found for this publisher.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
