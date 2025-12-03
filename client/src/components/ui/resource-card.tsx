import { Resource } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Clock, Database, Bot, FileSpreadsheet } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

// Import generated images
import aiAgentIcon from "@assets/generated_images/ai_agent_icon_abstract.png";
import iotDataIcon from "@assets/generated_images/iot_data_icon_abstract.png";
import financialDataIcon from "@assets/generated_images/financial_data_icon_abstract.png";
import aiHexagonIcon from "@assets/generated_images/abstract_ai_hexagon_logo_icon.png";
import robotHeadIcon from "@assets/generated_images/abstract_robot_head_logo_icon.png";
import shoppingBagIcon from "@assets/generated_images/abstract_shopping_bag_logo_icon.png";
import integrationIcon from "@assets/generated_images/abstract_integration_puzzle_logo_icon.png";
import voiceWaveIcon from "@assets/generated_images/abstract_voice_wave_logo_icon.png";
import shieldSecurityIcon from "@assets/generated_images/abstract_shield_security_logo_icon.png";

const imageMap: Record<string, string> = {
  "ai_agent_icon_abstract": aiAgentIcon,
  "iot_data_icon_abstract": iotDataIcon,
  "financial_data_icon_abstract": financialDataIcon,
  "abstract_ai_hexagon_logo_icon": aiHexagonIcon,
  "abstract_robot_head_logo_icon": robotHeadIcon,
  "abstract_shopping_bag_logo_icon": shoppingBagIcon,
  "abstract_integration_puzzle_logo_icon": integrationIcon,
  "abstract_voice_wave_logo_icon": voiceWaveIcon,
  "abstract_shield_security_logo_icon": shieldSecurityIcon
};

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { language, t } = useLanguage();
  
  // Icon based on type if no image
  const getTypeIcon = () => {
    switch (resource.type) {
      case "API": return <Database className="h-8 w-8 text-blue-500" />;
      case "Agent": return <Bot className="h-8 w-8 text-purple-500" />;
      case "Dataset": return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
      default: return <Database className="h-8 w-8" />;
    }
  };

  return (
    <Card className="card-hover group flex h-full flex-col overflow-hidden border-border/50 bg-white dark:bg-slate-900">
      <CardHeader className="p-5 pb-2">
        <div className="flex items-start justify-between">
          {/* INCREASED SIZE: h-16 w-16 for container, h-10 w-10 for image */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700">
            {resource.image && imageMap[resource.image] ? (
              <img src={imageMap[resource.image]} alt={resource.title} className="h-10 w-10 object-contain" />
            ) : (
              getTypeIcon()
            )}
          </div>
          <Badge 
            variant={resource.price === "Free" ? "secondary" : "outline"}
            className={cn(
              "font-medium h-fit",
              resource.price === "Paid" && "border-purple-200 bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
              resource.price === "Freemium" && "border-orange-200 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
            )}
          >
            {resource.price}
          </Badge>
        </div>
        <Link href={`/resource/${resource.id}`}>
          <a className="mt-4 block">
            <h3 className="font-heading text-lg font-semibold leading-tight text-foreground group-hover:text-primary line-clamp-2">
              {language === '한국어' && resource.titleKo ? resource.titleKo : resource.title}
            </h3>
          </a>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 px-5 pb-2 pt-1">
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {language === '한국어' && resource.descriptionKo ? resource.descriptionKo : resource.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {resource.tags.slice(0, 2).map(tag => (
            <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 mt-auto">
        <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              {resource.type === 'API' && <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-300">API</span>}
              {resource.type === 'Agent' && <span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded dark:bg-purple-900/30 dark:text-purple-300">Agent</span>}
              {resource.type === 'Dataset' && <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">Excel</span>}
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

