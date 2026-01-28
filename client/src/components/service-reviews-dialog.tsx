import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MessageSquare, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  user: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  likes?: number;
  response?: {
    author: string;
    date: string;
    content: string;
  };
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "r1",
    user: "User 1",
    rating: 5,
    date: "2 days ago",
    content: "This resource has significantly improved our workflow. The integration was straightforward and the documentation is excellent. Highly recommended for teams looking to scale.",
    likes: 12,
    response: {
      author: "Response from Developer",
      date: "Just now",
      content: "Thank you for your kind words! We're glad to hear that our resource has helped improve your workflow."
    }
  },
  {
    id: "r2",
    user: "User 2",
    rating: 5,
    date: "2 days ago",
    content: "Excellent data quality and reliable API. The support team is also very responsive.",
    likes: 8
  },
  {
    id: "r3",
    user: "User 3",
    rating: 4,
    date: "3 days ago",
    content: "Great tool, but documentation could be a bit more detailed for edge cases.",
    likes: 5
  },
  {
    id: "r4",
    user: "User 4",
    rating: 5,
    date: "1 week ago",
    content: "Absolutely fantastic! Saved us weeks of development time.",
    likes: 3
  }
];

interface ServiceReviewsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  serviceTitle: string;
}

export function ServiceReviewsDialog({ isOpen, onOpenChange, serviceTitle }: ServiceReviewsDialogProps) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleReplyClick = (reviewId: string) => {
    setReplyingToId(reviewId);
    setReplyContent("");
  };

  const handleCancelReply = () => {
    setReplyingToId(null);
    setReplyContent("");
  };

  const handleSubmitReply = (reviewId: string) => {
    if (!replyContent.trim()) return;

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          response: {
            author: "Response from Developer",
            date: "Just now",
            content: replyContent
          }
        };
      }
      return review;
    });

    setReviews(updatedReviews);
    setReplyingToId(null);
    setReplyContent("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">4.8</span>
              <div className="flex flex-col mb-1">
                <div className="flex text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current text-amber-200" />
                </div>
                <span className="text-xs text-muted-foreground">Based on 124 reviews</span>
              </div>
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="positive">Positive First</SelectItem>
                <SelectItem value="negative">Negative First</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-6 pt-0">
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-xl p-4 space-y-3 bg-white dark:bg-slate-950">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={review.avatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-medium text-xs">
                        {review.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{review.user}</div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-slate-200 dark:text-slate-800'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {review.content}
                </p>
                
                <div className="flex items-center gap-4 pt-1">
                  {!review.response && replyingToId !== review.id && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-0 text-slate-400 hover:text-slate-600 gap-1.5 text-xs"
                      onClick={() => handleReplyClick(review.id)}
                    >
                      <MessageSquare className="w-3 h-3" />
                      Reply
                    </Button>
                  )}
                </div>

                {replyingToId === review.id && (
                  <div className="mt-3 space-y-2 animate-in fade-in zoom-in-95 duration-200">
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your response here..."
                      className="min-h-[80px] text-sm"
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={handleCancelReply}>Cancel</Button>
                      <Button size="sm" onClick={() => handleSubmitReply(review.id)}>Submit Response</Button>
                    </div>
                  </div>
                )}

                {review.response && (
                  <div className="mt-3 bg-indigo-50 dark:bg-indigo-950/30 p-3 rounded-lg border-l-2 border-indigo-500">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">{review.response.author}</span>
                      <span className="text-[10px] text-muted-foreground">{review.response.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {review.response.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
