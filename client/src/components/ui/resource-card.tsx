import { Resource } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Clock, Database, Bot, FileSpreadsheet } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

// Import generated images
import aiAgentIcon from "@assets/generated_images/ai_agent_icon_abstract.png";
import iotDataIcon from "@assets/generated_images/iot_data_icon_abstract.png";
import financialDataIcon from "@assets/generated_images/financial_data_icon_abstract.png";

const imageMap: Record<string, string> = {
  "ai_agent_icon_abstract": aiAgentIcon,
  "iot_data_icon_abstract": iotDataIcon,
  "financial_data_icon_abstract": financialDataIcon
};

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  // Icon based on type if no image
  const getTypeIcon = () => {
    switch (resource.type) {
      case "API": return <Database className="h-6 w-6 text-blue-500" />;
      case "Agent": return <Bot className="h-6 w-6 text-purple-500" />;
      case "Dataset": return <FileSpreadsheet className="h-6 w-6 text-green-500" />;
      default: return <Database className="h-6 w-6" />;
    }
  };

  return (
    <Card className="card-hover group flex h-full flex-col overflow-hidden border-border/50 bg-white dark:bg-slate-900">
      <CardHeader className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
            {resource.image && imageMap[resource.image] ? (
              <img src={imageMap[resource.image]} alt={resource.title} className="h-8 w-8 object-contain" />
            ) : (
              getTypeIcon()
            )}
          </div>
          <Badge 
            variant={resource.price === "Free" ? "secondary" : "outline"}
            className={cn(
              "font-medium",
              resource.price === "Paid" && "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
            )}
          >
            {resource.price}
          </Badge>
        </div>
        <Link href={`/resource/${resource.id}`}>
          <a className="mt-4 block">
            <h3 className="font-heading text-lg font-semibold leading-tight text-foreground group-hover:text-primary">
              {resource.title}
            </h3>
          </a>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 px-5 pb-2">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {resource.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {resource.tags.slice(0, 2).map(tag => (
            <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              {resource.type === 'API' && <span className="text-blue-500">API</span>}
              {resource.type === 'Agent' && <span className="text-purple-500">Agent</span>}
              {resource.type === 'Dataset' && <span className="text-green-500">Excel</span>}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
