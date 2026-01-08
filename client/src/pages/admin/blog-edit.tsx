import React, { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft,
  Save,
  Eye,
  Calendar,
  Image as ImageIcon,
  User,
  Tag,
  Clock,
  FileText,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code,
  Quote,
  Twitter,
  Linkedin,
  Bookmark
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const CATEGORIES = ["Tutorial", "Technology", "Development", "Research", "Case Study", "Industry News"];

const SAMPLE_MARKDOWN = `# Getting Started with AI Agents in Enterprise

Single agents hit a ceiling. Multi-agent systems scale by orchestrating specialized AIs that collaborate in real time. This guide shows a minimal setup that still supports real endpoints and auth.

## Introduction

The **Model Context Protocol (MCP)** is rapidly becoming the standard for connecting AI models to external tools and data. While the official documentation covers a lot of ground, many developers get stuck on the initial setup.

In this tutorial, we'll strip away the complexity and build a production-ready MCP server in just 15 minutes. We'll focus on the core components: the server instance, tool definitions, and the transport layer.

## Prerequisites

Before we begin, make sure you have:

- Node.js 18+ installed
- Basic understanding of TypeScript
- An OpenAI API key (or similar LLM provider)

\`\`\`bash
# Check your Node.js version
node --version
\`\`\`

## Step 1: Scaffolding

First, let's create a new project and install the necessary dependencies:

\`\`\`bash
mkdir mcp-server && cd mcp-server
npm init -y
npm install @modelcontextprotocol/sdk express
\`\`\`

## Step 2: Defining Tools

Tools are the heart of MCP. They define what actions your AI can take:

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server";

const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0"
});
\`\`\`

## Step 3: Server Instance

Now let's set up the server with proper error handling.

## Wrapping Up

You now have a working MCP server! Here's what we covered:

1. **Project setup** - Basic scaffolding with required dependencies
2. **Tool definitions** - How to create tools that AI can use
3. **Server configuration** - Express-based HTTP transport

> **Pro Tip:** Always validate your tool inputs to prevent unexpected behavior in production.
`;

export default function BlogEdit() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/blog/:id");
  const isNew = params?.id === "new";
  
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
    status: "Draft" as "Published" | "Draft",
    publishedAt: "",
    readTime: "",
    featuredImages: [] as string[],
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    if (formData.featuredImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % formData.featuredImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [formData.featuredImages.length]);

  useEffect(() => {
    if (!isNew && params?.id) {
      setFormData({
        title: "Getting Started with AI Agents in Enterprise",
        excerpt: "A comprehensive guide to implementing AI agents in your organization's workflow.",
        content: SAMPLE_MARKDOWN,
        category: "Tutorial",
        author: "Data-X Team",
        status: "Published",
        publishedAt: "2025-12-20",
        readTime: "8 min",
        featuredImages: ["blog1.jpg", "blog2.jpg", "blog3.jpg"],
        tags: ["AI", "Enterprise", "Tutorial"],
      });
    }
  }, [isNew, params?.id]);

  const handleSave = () => {
    if (!formData.title || !formData.excerpt || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success(isNew ? "Blog post created successfully" : "Blog post updated successfully");
    setLocation("/admin/blog");
  };

  const addTag = () => {
    if (tagInput.trim() && formData.tags.length < 5 && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const insertMarkdown = (syntax: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = formData.content;
      const newText = text.substring(0, start) + syntax + text.substring(end);
      setFormData({ ...formData, content: newText });
    }
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-900 dark:text-white">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-indigo-600 hover:underline">$1</a>');
  };

  const renderMarkdown = (content: string): React.ReactNode => {
    if (!content) return <p className="text-muted-foreground italic">Start typing to see preview...</p>;
    
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeContent = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <pre key={index} className="bg-slate-900 text-slate-100 rounded-lg p-4 overflow-x-auto my-4 text-sm">
              <code>{codeContent.join('\n')}</code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-lg font-bold mt-6 mb-3 text-slate-900 dark:text-white">{line.slice(4)}</h3>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-xl font-bold mt-8 mb-4 text-slate-900 dark:text-white">{line.slice(3)}</h2>);
      } else if (line.startsWith('# ')) {
        // Skip main title as it's shown in header
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 pl-4 py-3 pr-4 my-4 rounded-r-lg">
            <span className="text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
          </blockquote>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-6 mb-1 text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: formatInline(line.slice(2)) }} />
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={index} className="ml-6 mb-1 list-decimal text-slate-600 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: formatInline(line.replace(/^\d+\.\s/, '')) }} />
        );
      } else if (line.trim() === '') {
        elements.push(<div key={index} className="h-3" />);
      } else {
        elements.push(
          <p key={index} className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
        );
      }
    });

    return elements;
  };

  // Extract TOC from content
  const extractToc = (content: string) => {
    const lines = content.split('\n');
    const toc: { id: string; text: string; level: number }[] = [];
    
    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        const text = line.slice(3);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        toc.push({ id, text, level: 2 });
      } else if (line.startsWith('### ')) {
        const text = line.slice(4);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        toc.push({ id, text, level: 3 });
      }
    });
    
    return toc;
  };

  const toc = extractToc(formData.content);

  return (
    <AdminLayout title={isNew ? "Create Blog Post" : "Edit Blog Post"}>
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="flex items-center justify-between px-2 py-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/admin/blog")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {isNew ? "Create New Blog Post" : "Edit Blog Post"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {isNew ? "Write a new article for the platform" : "Update your blog post content"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={() => window.open(`/#/blog/${params?.id || '1'}`, '_blank')}>
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Main Content - Split View */}
        <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden">
          {/* Left: Editor Panel */}
          <ScrollArea className="h-full border-r border-slate-200 dark:border-slate-800">
            <div className="p-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label className="flex justify-between text-sm font-semibold">
                  <span>Title <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground font-normal">{formData.title.length}/100</span>
                </Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value.slice(0, 100) })}
                  placeholder="Enter blog post title"
                  maxLength={100}
                  className="text-base font-medium"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label className="flex justify-between text-sm font-semibold">
                  <span>Excerpt <span className="text-red-500">*</span></span>
                  <span className="text-xs text-muted-foreground font-normal">{formData.excerpt.length}/200</span>
                </Label>
                <Textarea 
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value.slice(0, 200) })}
                  placeholder="Brief summary that appears in blog listings"
                  maxLength={200}
                  className="min-h-[70px] resize-none"
                />
              </div>

              {/* Content (Markdown) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Content (Markdown) <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("# ")}>
                      <Heading1 className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("## ")}>
                      <Heading2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("**text**")}>
                      <Bold className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("*text*")}>
                      <Italic className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("- ")}>
                      <List className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("1. ")}>
                      <ListOrdered className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("[text](url)")}>
                      <LinkIcon className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("```\ncode\n```")}>
                      <Code className="h-3.5 w-3.5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => insertMarkdown("> ")}>
                      <Quote className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <Textarea 
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here... (Markdown supported)"
                  className="min-h-[300px] resize-y font-mono text-sm leading-relaxed"
                />
              </div>

              {/* Post Settings */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-4 border border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-sm">Post Settings</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Category <span className="text-red-500">*</span></Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> Author
                    </Label>
                    <Input 
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      placeholder="Author name"
                      className="h-9"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Status</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as "Published" | "Draft" })}>
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> Publish Date
                    </Label>
                    <Input 
                      type="date"
                      value={formData.publishedAt}
                      onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Read Time
                    </Label>
                    <Input 
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="8 min"
                      className="h-9"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Images */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Featured Images</span>
                  <span className="text-xs text-muted-foreground font-normal">{formData.featuredImages.length}/5</span>
                </Label>
                <div className="space-y-2">
                  {/* Image list */}
                  {formData.featuredImages.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.featuredImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <div className="h-16 w-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg" style={{
                            opacity: 0.6 + (index * 0.15)
                          }} />
                          <button
                            type="button"
                            onClick={() => setFormData({ 
                              ...formData, 
                              featuredImages: formData.featuredImages.filter((_, i) => i !== index) 
                            })}
                            className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            ×
                          </button>
                          <span className="absolute bottom-1 left-1 text-[10px] text-white bg-black/50 px-1 rounded">{img}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Add button */}
                  {formData.featuredImages.length < 5 && (
                    <div 
                      className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      onClick={() => setFormData({ 
                        ...formData, 
                        featuredImages: [...formData.featuredImages, `image${formData.featuredImages.length + 1}.jpg`] 
                      })}
                    >
                      <ImageIcon className="h-6 w-6 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium">Click to add image</p>
                        <p className="text-xs text-muted-foreground">1200x630px recommended</p>
                      </div>
                    </div>
                  )}
                  {formData.featuredImages.length > 1 && (
                    <p className="text-xs text-muted-foreground">Images will auto-rotate every 3 seconds</p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="flex justify-between text-sm font-semibold">
                  <span className="flex items-center gap-2"><Tag className="h-4 w-4" /> Tags</span>
                  <span className="text-xs text-muted-foreground font-normal">{formData.tags.length}/5</span>
                </Label>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-700 min-h-[40px]">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        className="hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full p-0.5 ml-1"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  {formData.tags.length < 5 && (
                    <Input 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add more..."
                      className="flex-1 min-w-[80px] h-6 border-0 bg-transparent p-0 focus-visible:ring-0 text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* Right: Full Blog Preview */}
          <div className="h-full overflow-hidden bg-white dark:bg-slate-950">
            <div className="h-full flex flex-col">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shrink-0">
                <span className="text-xs font-medium text-muted-foreground">Preview</span>
              </div>
              <ScrollArea className="flex-1">
                <div className="max-w-4xl mx-auto">
                  {/* Blog Header */}
                  <header className="px-6 pt-8 pb-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <span>Home</span>
                      <span>/</span>
                      <span>Blog</span>
                      <span>/</span>
                      <span className="text-indigo-600">{formData.category || "Category"}</span>
                    </div>
                    
                    <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                      {formData.category || "Category"}
                    </Badge>
                    
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                      {formData.title || "Your Blog Title"}
                    </h1>
                    
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                      {formData.excerpt || "Your blog excerpt will appear here..."}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {formData.author ? formData.author.charAt(0) : "A"}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{formData.author || "Author"}</p>
                          <p className="text-xs text-muted-foreground">Editor</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formData.publishedAt || "Date"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {formData.readTime || "5 min read"}
                        </span>
                      </div>
                    </div>
                  </header>
                  
                  {/* Hero Image Carousel */}
                  <div className="px-6 mb-8">
                    <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden">
                      {formData.featuredImages.length > 0 ? (
                        <>
                          {formData.featuredImages.map((img, index) => (
                            <div 
                              key={index}
                              className={`absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 transition-opacity duration-700 ${
                                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                              style={{ opacity: index === currentImageIndex ? (0.6 + (index * 0.15)) : 0 }}
                            />
                          ))}
                          {/* Carousel Indicators */}
                          {formData.featuredImages.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                              {formData.featuredImages.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentImageIndex(index)}
                                  className={`h-2 rounded-full transition-all ${
                                    index === currentImageIndex 
                                      ? 'w-6 bg-white' 
                                      : 'w-2 bg-white/50 hover:bg-white/75'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
                      )}
                    </div>
                  </div>
                  
                  {/* Content with TOC */}
                  <div className="px-6 pb-12 grid grid-cols-12 gap-8">
                    {/* Share Sidebar */}
                    <div className="col-span-1 hidden lg:block">
                      <div className="sticky top-4 flex flex-col gap-2 items-center">
                        <span className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Share</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <Twitter className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <Linkedin className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <LinkIcon className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                          <Bookmark className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-span-12 lg:col-span-8">
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        {renderMarkdown(formData.content)}
                      </div>
                      
                      {/* Tags */}
                      {formData.tags.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.map(tag => (
                              <Badge key={tag} variant="secondary">#{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* TOC Sidebar */}
                    <div className="col-span-3 hidden lg:block">
                      <div className="sticky top-4 pl-4 border-l border-slate-200 dark:border-slate-800">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">On this page</h4>
                        <nav className="space-y-1.5 text-xs">
                          {toc.map((item, i) => (
                            <button
                              key={i}
                              className={`block w-full text-left py-1 transition-colors ${
                                item.level === 3 ? 'pl-3' : ''
                              } ${
                                i === 0
                                  ? 'text-indigo-600 font-medium border-l-2 border-indigo-600 -ml-[17px] pl-4'
                                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                              }`}
                            >
                              {item.text}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
