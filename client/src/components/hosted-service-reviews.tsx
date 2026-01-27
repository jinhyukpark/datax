import { Star, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HostedServiceReviews() {
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
          <div key={i} className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">User</div>
                <div>
                  <div className="font-semibold text-sm">User {i}</div>
                  <div className="text-xs text-muted-foreground">2 days ago</div>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Excellent resource! The API is very reliable and the documentation is easy to follow. Highly recommended for anyone building data-intensive applications.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
