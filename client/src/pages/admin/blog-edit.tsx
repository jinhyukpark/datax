import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import AdminLayout from "./admin-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Quote
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

// Define a simple tool
server.tool("get_weather", {
  description: "Get current weather for a city",
  parameters: {
    city: { type: "string", required: true }
  }
}, async ({ city }) => {
  // Your implementation here
  return { temperature: 22, condition: "sunny" };
});
\`\`\`

## Step 3: Server Instance

Now let's set up the server with proper error handling:

\`\`\`typescript
import express from "express";

const app = express();
app.use(express.json());

app.post("/mcp", async (req, res) => {
  try {
    const result = await server.handleRequest(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("MCP Server running on port 3000");
});
\`\`\`

## Wrapping Up

You now have a working MCP server! Here's what we covered:

1. **Project setup** - Basic scaffolding with required dependencies
2. **Tool definitions** - How to create tools that AI can use
3. **Server configuration** - Express-based HTTP transport

### Next Steps

- Add authentication middleware
- Implement more complex tools
- Connect to a real LLM provider

> **Pro Tip:** Always validate your tool inputs to prevent unexpected behavior in production.

For more information, check out the [official MCP documentation](https://modelcontextprotocol.io).
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
    thumbnail: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (!isNew && params?.id) {
      // Load existing blog data (mock)
      setFormData({
        title: "Getting Started with AI Agents in Enterprise",
        excerpt: "A comprehensive guide to implementing AI agents in your organization's workflow.",
        content: SAMPLE_MARKDOWN,
        category: "Tutorial",
        author: "Data-X Team",
        status: "Published",
        publishedAt: "2025-12-20",
        readTime: "8 min",
        thumbnail: "blog1.jpg",
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

  return (
    <AdminLayout title={isNew ? "Create Blog Post" : "Edit Blog Post"}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setLocation("/admin/blog")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {isNew ? "Create New Blog Post" : "Edit Blog Post"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {isNew ? "Write a new article for the platform" : "Update your blog post content"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={() => setLocation(`/blog/${params?.id || 'preview'}`)}>
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4" />
              {isNew ? "Publish" : "Save Changes"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
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
                  className="text-lg font-medium h-12"
                />
              </div>

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
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Content (Markdown) <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("# ")}>
                      <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("## ")}>
                      <Heading2 className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("**text**")}>
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("*text*")}>
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("- ")}>
                      <List className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("1. ")}>
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("[text](url)")}>
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("```\ncode\n```")}>
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => insertMarkdown("> ")}>
                      <Quote className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Textarea 
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here... (Markdown supported)"
                  className="min-h-[500px] resize-y font-mono text-sm leading-relaxed"
                />
                <p className="text-xs text-muted-foreground">
                  Use Markdown syntax: # for headings, **bold**, *italic*, ```code```, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Post Settings</h3>
              
              <div className="space-y-2">
                <Label className="text-sm">Category <span className="text-red-500">*</span></Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger>
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
                <Label className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Author
                </Label>
                <Input 
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(v) => setFormData({ ...formData, status: v as "Published" | "Draft" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Publish Date
                </Label>
                <Input 
                  type="date"
                  value={formData.publishedAt}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Read Time
                </Label>
                <Input 
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="e.g., 5 min"
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Featured Image
              </Label>
              <div 
                className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => setFormData({ ...formData, thumbnail: 'thumbnail.jpg' })}
              >
                {formData.thumbnail ? (
                  <div className="text-center">
                    <div className="h-24 w-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-2" />
                    <p className="text-sm text-muted-foreground">{formData.thumbnail}</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-10 w-10 text-slate-400 mb-2" />
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">1200x630px recommended</p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <Label className="flex justify-between text-sm font-semibold">
                <span className="flex items-center gap-2"><Tag className="h-4 w-4" /> Tags</span>
                <span className="text-xs text-muted-foreground font-normal">{formData.tags.length}/5</span>
              </Label>
              <div className="flex flex-wrap gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 min-h-[44px]">
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
                    placeholder={formData.tags.length === 0 ? "Type tag + Enter" : "Add more..."}
                    className="flex-1 min-w-[100px] h-7 border-0 bg-transparent p-0 focus-visible:ring-0 text-sm"
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
        </div>
      </div>
    </AdminLayout>
  );
}
