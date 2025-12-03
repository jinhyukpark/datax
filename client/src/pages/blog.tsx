import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BLOG_POSTS } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

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

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      
      <div className="flex-1 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="font-heading text-4xl font-bold md:text-5xl">Blog</h1>
            <p className="mt-4 text-lg text-slate-400">News, tutorials, and deep dives on data platforms and AI agents.</p>
          </div>

          {/* Changed to lg:grid-cols-4 for 4 items per row */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BLOG_POSTS.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <a className="group block h-full">
                  <Card className="h-full overflow-hidden border-white/10 bg-white/5 transition-all hover:border-white/20 hover:bg-white/10 hover:-translate-y-1">
                    <div className={cn("h-48 w-full relative overflow-hidden bg-gradient-to-br", post.imageGradient)}>
                      {/* Image Overlay */}
                      {post.image && imageMap[post.image] && (
                        <img 
                          src={imageMap[post.image]} 
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transform"
                        />
                      )}
                      
                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                      <div className="absolute bottom-0 left-0 w-full p-4">
                        <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-md border-none hover:bg-white/30 transition-colors">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                      <h2 className="mb-3 font-heading text-lg font-bold leading-tight text-slate-100 group-hover:text-primary-foreground line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="mb-6 line-clamp-3 text-sm text-slate-400 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500 mt-auto pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {post.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-primary-foreground group-hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                          Read <ArrowRight className="h-3 w-3" />
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
