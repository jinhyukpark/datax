import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Zap, ExternalLink, Eye, TrendingUp } from "lucide-react";

export default function Advertise() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-bold md:text-5xl">
            Make your <span className="text-gradient">data resource</span> stand out
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Showcase your AI tools to thousands of visitors and get more users and growth for your business with premium listings on Data-X.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            { label: "Outbound clicks per month", value: "7,000+", icon: ExternalLink },
            { label: "Page views per month", value: "60,000", icon: Eye },
            { label: "Active users per month", value: "15,000+", icon: TrendingUp },
          ].map((stat) => (
            <Card key={stat.label} className="flex flex-col items-center p-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="font-heading text-3xl font-bold">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Pricing */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2">
          {/* Plan Card */}
          <div className="relative rounded-2xl bg-linear-to-b from-indigo-500 to-purple-600 p-1 shadow-xl">
            <div className="h-full rounded-xl bg-white p-8 dark:bg-slate-900">
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-bold">Premium Listing</h3>
                <p className="text-muted-foreground">Maximum visibility package</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-primary">$39</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <ul className="mb-8 space-y-4">
                {[
                  "20,000+ guaranteed targeted impressions",
                  "Featured spot at the top of homepage",
                  "Top position in your category on Data Map",
                  "Premium highlight on Data Map",
                  "Premium badge on your listing",
                  "Write your own description"
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-lg font-semibold text-white hover:opacity-90">
                Get Started - $39/month
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
             <h3 className="font-heading text-xl font-bold">Preview your Premium Listing</h3>
             
             <Card className="border-2 border-purple-100 bg-purple-50/50 p-6 dark:border-purple-900/50 dark:bg-purple-900/10">
               <div className="mb-4 flex items-start justify-between">
                 <div className="flex items-center gap-3">
                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-xs">
                     <Zap className="h-6 w-6 text-purple-500" />
                   </div>
                   <div>
                     <h4 className="font-bold text-foreground">AutoGen Multi-Agent Framework</h4>
                     <div className="flex gap-2">
                        <span className="text-xs text-purple-600 font-medium">Premium Partner</span>
                     </div>
                   </div>
                 </div>
                 <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">FEATURED</span>
               </div>
               <p className="text-sm text-muted-foreground">
                 Microsoft's powerful framework for building conversational AI agents that can collaborate, reason, and execute complex tasks through multi-turn conversations.
               </p>
             </Card>

             <div className="rounded-xl bg-amber-50 p-6 border border-amber-100 dark:bg-amber-900/10 dark:border-amber-900/20">
               <div className="flex items-center gap-2 mb-3 text-amber-700 dark:text-amber-500 font-semibold">
                 <Zap className="h-5 w-5" /> Premium Benefits Active
               </div>
               <ul className="space-y-2 text-sm text-amber-800/80 dark:text-amber-200/80">
                 <li>• Featured badge prominently displayed</li>
                 <li>• Appears first in search results</li>
                 <li>• Enhanced visual highlighting</li>
                 <li>• Priority placement in categories</li>
               </ul>
             </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
