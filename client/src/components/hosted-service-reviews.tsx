import { Star, Check, User, MessageCircle, X, ChevronDown, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function HostedServiceReviews() {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const toggleReply = (id: number) => {
    if (replyingTo === id) {
      setReplyingTo(null);
      setReplyText("");
    } else {
      setReplyingTo(id);
      setReplyText("");
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4">
           <div className="text-4xl font-bold">4.8</div>
           <div>
             <div className="flex items-center gap-1 text-amber-500">
               <Star className="h-4 w-4 fill-current" />
               <Star className="h-4 w-4 fill-current" />
               <Star className="h-4 w-4 fill-current" />
               <Star className="h-4 w-4 fill-current" />
               <Star className="h-4 w-4 fill-current text-slate-300 dark:text-slate-600" />
             </div>
             <p className="text-sm text-muted-foreground">Based on 124 reviews</p>
           </div>
         </div>
         <Button>Write a Review</Button>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-sm text-slate-600 dark:text-slate-400">
                    U
                  </div>
                  <div>
                    <div className="font-bold text-sm">User {i}</div>
                    <div className="text-xs text-muted-foreground">2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                {i === 1 && "This resource has significantly improved our workflow. The integration was straightforward and the documentation is excellent. Highly recommended for teams looking to scale."}
                {i === 2 && "Excellent data quality and reliable API. The support team is also very responsive."}
                {i === 3 && "Great tool, but documentation could be a bit more detailed for edge cases."}
              </p>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => toggleReply(i)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-slate-900 dark:hover:text-slate-200 w-fit transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Reply</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${replyingTo === i ? "rotate-180" : ""}`} />
                </button>

                {replyingTo === i && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-200 pt-2">
                    <div className="relative">
                      <Input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="pr-24 h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                        autoFocus
                      />
                      <div className="absolute right-1 top-1 flex items-center gap-1 h-10">
                        {replyText && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-muted-foreground hover:text-slate-900"
                            onClick={() => setReplyText("")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          className="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
                          onClick={() => {
                             // Handle reply submission logic here
                             setReplyingTo(null);
                             setReplyText("");
                          }}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
