import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NEWS_ARTICLES } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Grid, List, Tag, Calendar, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { motion } from "framer-motion";

export default function News() {
  const { t, language } = useLanguage();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(NEWS_ARTICLES.flatMap((article) => article.tags))
  );

  // Filter articles
  const filteredArticles = NEWS_ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.titleKo && article.titleKo.includes(searchQuery)) ||
      (article.excerptKo && article.excerptKo.includes(searchQuery));

    const matchesTag = selectedTag ? article.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-slate-900 dark:text-slate-50">
            {t("Industry News", "산업 뉴스")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t(
              "Stay updated with the latest trends, technologies, and market insights.",
              "최신 트렌드, 기술 및 시장 통찰력에 대한 최신 정보를 확인하세요."
            )}
          </p>
        </div>

        {/* Controls: Search, View Mode, Tags */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("Search news...", "뉴스 검색...")}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-lg border">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
              className="rounded-full text-xs"
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className="rounded-full text-xs"
              >
                #{tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  className={`h-full hover:shadow-lg transition-shadow duration-300 ${
                    viewMode === "list" ? "flex flex-col md:flex-row" : ""
                  }`}
                >
                  <CardContent className={`p-6 ${viewMode === "list" ? "w-full" : ""}`}>
                    <div className="flex flex-col h-full justify-between gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                          <span className="font-semibold text-primary">{article.source}</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{article.date}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer leading-tight">
                          {language === "한국어" && article.titleKo
                            ? article.titleKo
                            : article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                          {language === "한국어" && article.excerptKo
                            ? article.excerptKo
                            : article.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs font-normal">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {viewMode === "list" && (
                           <Button variant="ghost" size="sm" className="hidden md:flex gap-1">
                             {t("Read more", "더 보기")} <ExternalLink className="h-3 w-3" />
                           </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-muted-foreground text-lg">
                {t("No news found matching your criteria.", "검색 조건과 일치하는 뉴스가 없습니다.")}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
