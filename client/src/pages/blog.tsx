import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BLOG_POSTS } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

import { useLanguage } from "@/lib/language-context";

// Import generated images
import multiAgentImg from "@assets/generated_images/abstract_multi-agent_ai_collaboration.png";
import serverRoomImg from "@assets/generated_images/server_room_with_glowing_lights.png";
import ragConceptImg from "@assets/generated_images/futuristic_data_retrieval_rag_concept.png";
import voiceWaveImg from "@assets/generated_images/voice_sound_wave_visualization.png";
import iotDataIcon from "@assets/generated_images/iot_data_icon_abstract.png";
import financialDataIcon from "@assets/generated_images/financial_data_icon_abstract.png";
import shieldIcon from "@assets/generated_images/abstract_shield_security_logo_icon.png";

const imageMap: Record<string, string> = {
  "abstract_multi-agent_ai_collaboration": multiAgentImg,
  "server_room_with_glowing_lights": serverRoomImg,
  "futuristic_data_retrieval_rag_concept": ragConceptImg,
  "voice_sound_wave_visualization": voiceWaveImg,
  "iot_data_icon_abstract": iotDataIcon,
  "financial_data_icon_abstract": financialDataIcon,
  "abstract_shield_security_logo_icon": shieldIcon
};

import { useState } from "react";

export default function Blog() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(BLOG_POSTS.map(post => post.category)));

  // Filter posts based on selection
  const filteredPosts = selectedCategory
    ? BLOG_POSTS.filter(post => post.category === selectedCategory)
    : BLOG_POSTS;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />
      
      <div className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
              {t("Blog", "블로그")}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              {t("News, tutorials, and deep dives on data platforms and AI agents.", "데이터 플랫폼과 AI 에이전트에 대한 뉴스, 튜토리얼, 심층 분석을 제공합니다.")}
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                selectedCategory === null
                  ? "bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              )}
            >
              {t("All Posts", "전체 보기")}
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedCategory === category
                    ? "bg-slate-900 text-white shadow-md dark:bg-slate-100 dark:text-slate-900"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <a className="group block h-full">
                  <Card className="h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900">
                    <div className={cn("h-48 w-full relative overflow-hidden bg-gradient-to-br", post.imageGradient)}>
                      {/* Image Overlay */}
                      {post.image && imageMap[post.image] && (
                        <img 
                          src={imageMap[post.image]} 
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      
                      {/* Gradient Overlay for Text Readability - Lighter for white theme */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <Badge variant="secondary" className="bg-white/90 text-slate-800 backdrop-blur-sm border-none shadow-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                      <h2 className="mb-3 font-heading text-lg font-bold leading-tight text-slate-900 group-hover:text-primary transition-colors dark:text-slate-100 line-clamp-2">
                        {language === '한국어' && post.titleKo ? post.titleKo : post.title}
                      </h2>
                      <p className="mb-6 line-clamp-3 text-sm text-slate-600 dark:text-slate-400 flex-1">
                        {language === '한국어' && post.excerptKo ? post.excerptKo : post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {t("Read", "읽기")} <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
