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

// Import new cover images
import dataAnalyticsImg from "@assets/generated_images/data_analytics_dashboard_visualization.png";
import aiNeuralImg from "@assets/generated_images/ai_neural_network_abstract.png";
import globalConnectImg from "@assets/generated_images/digital_global_connectivity.png";
import renewableEnergyImg from "@assets/generated_images/green_renewable_energy_data.png";
import financialTrendImg from "@assets/generated_images/financial_stock_market_trend.png";
import industrialFactoryImg from "@assets/generated_images/industrial_factory_automation.png";
import medicalResearchImg from "@assets/generated_images/medical_science_research_data.png";
import smartCityImg from "@assets/generated_images/smart_city_logistics.png";

// Abstract icons
import abstractNetworkIcon from "@assets/generated_images/abstract_network_nodes_logo_icon.png";
import abstractEyeIcon from "@assets/generated_images/abstract_eye_aperture_logo_icon.png";
import abstractAtomIcon from "@assets/generated_images/abstract_atom_science_logo_icon.png";
import abstractGrowthIcon from "@assets/generated_images/abstract_growth_chart_logo_icon.png";
import abstractGearIcon from "@assets/generated_images/abstract_gear_robot_logo_icon.png";
import abstractCloudIcon from "@assets/generated_images/abstract_cloud_data_logo_icon.png";
import abstractCubeIcon from "@assets/generated_images/abstract_cube_blockchain_logo_icon.png";
import abstractPulseIcon from "@assets/generated_images/abstract_pulse_signal_logo_icon.png";
import abstractGlobeIcon from "@assets/generated_images/abstract_globe_earth_logo_icon.png";


const imageMap: Record<string, string> = {
  // Original Icons
  "ai_agent_icon_abstract": aiAgentIcon,
  "iot_data_icon_abstract": iotDataIcon,
  "financial_data_icon_abstract": financialDataIcon,
  "abstract_ai_hexagon_logo_icon": aiHexagonIcon,
  "abstract_robot_head_logo_icon": robotHeadIcon,
  "abstract_shopping_bag_logo_icon": shoppingBagIcon,
  "abstract_integration_puzzle_logo_icon": integrationIcon,
  "abstract_voice_wave_logo_icon": voiceWaveIcon,
  "abstract_shield_security_logo_icon": shieldSecurityIcon,
  
  // New Abstract Icons
  "abstract_network_nodes_logo_icon": abstractNetworkIcon,
  "abstract_eye_aperture_logo_icon": abstractEyeIcon,
  "abstract_atom_science_logo_icon": abstractAtomIcon,
  "abstract_growth_chart_logo_icon": abstractGrowthIcon,
  "abstract_gear_robot_logo_icon": abstractGearIcon,
  "abstract_cloud_data_logo_icon": abstractCloudIcon,
  "abstract_cube_blockchain_logo_icon": abstractCubeIcon,
  "abstract_pulse_signal_logo_icon": abstractPulseIcon,
  "abstract_globe_earth_logo_icon": abstractGlobeIcon,

  // Cover Images
  "data_analytics_cover": dataAnalyticsImg,
  "ai_neural_cover": aiNeuralImg,
  "global_connectivity_cover": globalConnectImg,
  "renewable_energy_cover": renewableEnergyImg,
  "financial_trend_cover": financialTrendImg,
  "industrial_factory_cover": industrialFactoryImg,
  "medical_research_cover": medicalResearchImg,
  "smart_city_cover": smartCityImg,
};

interface ResourceCardProps {
  resource: Resource;
  featured?: boolean; // New prop to enable "featured image" mode
}

export function ResourceCard({ resource, featured }: ResourceCardProps) {
  const { language, t } = useLanguage();
  
  // Determine if we should show a cover image
  // For now, let's assume if the resource has a "cover" image key, we show it as a cover
  const isCoverImage = resource.image && resource.image.includes("_cover");

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
    <Card className="card-hover group flex h-full flex-col overflow-hidden border-border/50 bg-white dark:bg-slate-900 relative">
      
      {/* Cover Image Mode */}
      {isCoverImage && (
        <div className="w-full h-40 overflow-hidden relative bg-slate-100">
           {resource.image && imageMap[resource.image] ? (
              <img 
                src={imageMap[resource.image]} 
                alt={resource.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
            ) : null}
            <div className="absolute top-2 right-2">
               <Badge 
                variant={resource.price === "Free" ? "secondary" : "secondary"}
                className={cn(
                  "font-medium bg-white/90 backdrop-blur-sm shadow-sm",
                  resource.price === "Paid" && "text-purple-700",
                  resource.price === "Freemium" && "text-orange-700"
                )}
              >
                {resource.price}
              </Badge>
            </div>
        </div>
      )}

      <CardHeader className={cn("p-5 pb-2", isCoverImage ? "pt-4" : "")}>
        {!isCoverImage && (
          <div className="flex items-start justify-between">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              {resource.image && imageMap[resource.image] ? (
                <img src={imageMap[resource.image]} alt={resource.title} className="h-10 w-10 object-contain" />
              ) : (
                getTypeIcon()
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                <Eye className="h-3 w-3" />
                {resource.views > 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views}
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
          </div>
        )}
        
        <Link href={`/resource/${resource.id}`}>
          <a className="mt-2 block">
            <h3 className="font-heading text-lg font-semibold leading-tight text-foreground group-hover:text-primary line-clamp-2">
              {language === '한국어' && resource.titleKo ? resource.titleKo : resource.title}
            </h3>
          </a>
        </Link>
      </CardHeader>
      
      <CardContent className="flex-1 px-5 pb-2 pt-1">
        <p className="line-clamp-2 text-sm text-muted-foreground mb-4">
          {language === '한국어' && resource.descriptionKo ? resource.descriptionKo : resource.description}
        </p>
        <div className="flex flex-wrap gap-2">
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
             {isCoverImage && (
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                   {resource.views > 1000 ? `${(resource.views / 1000).toFixed(1)}k` : resource.views}
                </div>
             )}
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
