import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, MessageSquare, Reply, MoreHorizontal, ThumbsUp, Flag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  content: string;
  reply?: {
    content: string;
    date: string;
  };
}

interface ReviewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resourceTitle: string;
}

// Mock Reviews Data
const MOCK_REVIEWS: Review[] = [
  {
    id: "r1",
    user: { name: "User 1", avatar: "" },
    rating: 5,
    date: "2 days ago",
    content: "This resource has significantly improved our workflow. The integration was straightforward and the documentation is excellent. Highly recommended for teams looking to scale.",
    reply: {
      content: "Thank you for your kind words! We're glad to hear that our resource has helped improve your workflow.",
      date: "Just now"
    }
  },
  {
    id: "r2",
    user: { name: "User 2", avatar: "" },
    rating: 5,
    date: "2 days ago",
    content: "Excellent data quality and reliable API. The support team is also very responsive.",
  },
  {
    id: "r3",
    user: { name: "User 3", avatar: "" },
    rating: 4,
    date: "3 days ago",
    content: "Great tool, but documentation could be a bit more detailed for edge cases.",
  }
];

export function ReviewsDialog({ open, onOpenChange, resourceTitle }: ReviewsDialogProps) {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = (reviewId: string) => {
    if (!replyText.trim()) return;

    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          reply: {
            content: replyText,
            date: "Just now"
          }
        };
      }
      return review;
    }));

    setReplyingTo(null);
    setReplyText("");
    toast.success("Reply posted successfully");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">4.8</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-4 w-4 ${star <= 4 ? "fill-amber-400 text-amber-400" : "fill-amber-400 text-amber-400 opacity-50"}`} /> 
                ))} 
              </div>
              <span className="text-sm text-muted-foreground font-normal ml-1">Based on 124 reviews</span>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-8 text-sm">
                <SelectValue placeholder="All Reviews" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </DialogTitle>
          <DialogDescription className="hidden">
            Reviews for {resourceTitle}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-6 bg-slate-50 dark:bg-slate-900/50">
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-slate-100 dark:border-slate-800">
                      <AvatarImage src={review.user.avatar} />
                      <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                        {review.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-sm">{review.user.name}</h4>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  {renderStars(review.rating)}
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  {review.content}
                </p>

                {/* Developer Response Section */}
                {review.reply ? (
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mb-4 border-l-4 border-indigo-500">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-indigo-700 dark:text-indigo-400">Response from Developer</span>
                      <span className="text-[10px] text-muted-foreground">{review.reply.date}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {review.reply.content}
                    </p>
                    <div className="mt-2 flex justify-end">
                       <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-xs text-muted-foreground hover:text-indigo-600 px-2"
                        onClick={() => {
                          setReplyingTo(review.id);
                          setReplyText(review.reply!.content);
                        }}
                       >
                         Edit Response
                       </Button>
                    </div>
                  </div>
                ) : null}

                {/* Reply Input */}
                {replyingTo === review.id ? (
                  <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-2">
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your response..."
                      className="min-h-[80px]"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => {
                        setReplyingTo(null);
                        setReplyText("");
                      }}>Cancel</Button>
                      <Button size="sm" onClick={() => handleReplySubmit(review.id)}>
                        {review.reply ? "Update Response" : "Post Response"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 pt-2">
                    {!review.reply && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 gap-2 text-muted-foreground hover:text-indigo-600"
                        onClick={() => setReplyingTo(review.id)}
                      >
                        <MessageSquare className="h-4 w-4" />
                        Reply
                      </Button>
                    )}
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
