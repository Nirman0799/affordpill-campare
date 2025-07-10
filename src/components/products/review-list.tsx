// src/components/products/review-list.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ThumbsUp, Flag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/utils/supabase/browser";
import toast from "react-hot-toast";

interface ReviewListProps {
  productId: string;
  initialReviews: any[];
  currentUserReviewed: boolean;
  currentUserId?: string;
}

export default function ReviewList({
  productId,
  initialReviews,
  currentUserReviewed,
  currentUserId,
}: ReviewListProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isSubmittingHelpful, setIsSubmittingHelpful] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const markHelpful = async (reviewId: string) => {
    if (!currentUserId) {
      router.push(`/login?redirectUrl=/products/${productId}`);
      return;
    }

    setIsSubmittingHelpful(reviewId);
    
    try {
      // needs to be imeplmented later
      toast.success("Thank you for your feedback!");
    } catch (error) {
      console.error("Error marking review as helpful:", error);
      toast.error("Could not save your feedback");
    } finally {
      setIsSubmittingHelpful(null);
    }
  };

  const reportReview = async (reviewId: string) => {
    if (!currentUserId) {
      router.push(`/login?redirectUrl=/products/${productId}`);
      return;
    }
    
    toast.success("Review reported. Thank you for helping us maintain quality reviews.");
  };

  // render stars
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">No reviews yet for this product.</p>
          {!currentUserReviewed && currentUserId && (
            <Button onClick={() => router.push(`/products/${productId}/review`)}>
              Be the first to review
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 bg-primary/10">
                <AvatarFallback>{getInitials(review.user_name || "User")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{review.user_name || "Verified User"}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  {review.is_verified_purchase && (
                    <Badge variant="outline" className="rounded-sm bg-green-50 text-green-700 border-green-200">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 p-3 flex justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => markHelpful(review.id)}
              disabled={isSubmittingHelpful === review.id}
            >
              {isSubmittingHelpful === review.id ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <ThumbsUp className="h-4 w-4 mr-2" />
              )}
              Helpful
            </Button>
            <Button variant="ghost" size="sm" onClick={() => reportReview(review.id)}>
              <Flag className="h-4 w-4 mr-2" />
              Report
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}