import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RESOURCES } from "@/lib/data";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ResourceCard } from "@/components/ui/resource-card";
import { ArrowLeft, ExternalLink, Eye, Calendar, CheckCircle2, ShieldCheck, Zap, Globe } from "lucide-react";
import heroBg from "@assets/generated_images/hero_background_with_connecting_data_streams.png";

// Import generated images
import aiAgentIcon from "@assets/generated_images/ai_agent_icon_abstract.png";
import iotDataIcon from "@assets/generated_images/iot_data_icon_abstract.png";
import financialDataIcon from "@assets/generated_images/financial_data_icon_abstract.png";

const imageMap: Record<string, string> = {
  "ai_agent_icon_abstract": aiAgentIcon,
  "iot_data_icon_abstract": iotDataIcon,
  "financial_data_icon_abstract": financialDataIcon
};

export default function ResourceDetail() {
  const [, params] = useRoute("/resource/:id");
  const resource = RESOURCES.find(r => r.id === params?.id);

  if (!resource) return <div>Resource not found</div>;

  const similarResources = RESOURCES.filter(r => r.id !== resource.id && r.type === resource.type).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      {/* Header */}
      <div className="relative bg-white border-b pb-8 pt-8 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <Link href="/data-map">
            <a className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </a>
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-6">
              {/* Icon */}
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 border shadow-sm flex items-center justify-center">
                 {resource.image && imageMap[resource.image] ? (
                  <img src={imageMap[resource.image]} alt="" className="h-16 w-16 object-contain" />
                 ) : (
                   <Zap className="h-10 w-10 text-muted-foreground" />
                 )}
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant={resource.price === "Paid" ? "default" : "secondary"} className={resource.price === "Paid" ? "bg-purple-600" : ""}>
                    {resource.type}
                  </Badge>
                   <Badge variant="outline">{resource.price}</Badge>
                </div>
                <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                  {resource.title}
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
                  {resource.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <ShieldCheck className="mr-1.5 h-4 w-4 text-emerald-500" />
                    Verified by {resource.provider}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    Published {resource.publishedDate}
                  </span>
                  <span className="flex items-center">
                    <Eye className="mr-1.5 h-4 w-4" />
                    {resource.views} views
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button size="lg" className="w-full bg-primary md:w-auto">
                Visit Official Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            
            <div className="space-y-8">
              {/* Overview */}
              <Card className="p-8 shadow-sm">
                <h2 className="mb-4 font-heading text-xl font-bold flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" /> Overview
                </h2>
                <div className="prose max-w-none text-muted-foreground dark:prose-invert">
                  <p>{resource.longDescription || resource.description}</p>
                  <p className="mt-4">
                    Companies using this approach see significant improvements in automation efficiency. 
                    It integrates seamlessly with existing enterprise infrastructure.
                  </p>
                </div>
              </Card>

              {/* Use Cases */}
              <Card className="p-8 shadow-sm">
                <h2 className="mb-4 font-heading text-xl font-bold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" /> Use Cases
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(resource.useCases || ['Data Analysis', 'Automation', 'Reporting', 'Predictive Modeling']).map((useCase, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg border bg-slate-50 p-3 dark:bg-slate-900">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="font-medium">{useCase}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Similar Resources */}
            {similarResources.length > 0 && (
              <div className="pt-8 border-t">
                <h2 className="mb-6 font-heading text-2xl font-bold text-foreground">Explore Similar Data</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {similarResources.map(r => (
                    <ResourceCard key={r.id} resource={r} />
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-heading font-semibold mb-4">Technical Specifications</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-mono">{resource.specs?.format || 'REST API'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Update Freq</span>
                  <span>{resource.specs?.frequency || 'Daily'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Access</span>
                  <span>{resource.specs?.access || 'API Key'}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-muted-foreground">Provider</span>
                  <span className="font-medium">{resource.provider}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map(tag => (
                   <Badge key={tag} variant="secondary" className="font-normal">
                     #{tag}
                   </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
