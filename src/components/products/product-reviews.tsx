// src/components/products/product-reviews.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ThumbsUp, Flag, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { createClient } from "@/utils/supabase/browser";
import toast from "react-hot-toast";

interface ProductReviewsProps {
  productId: string;
  productName: string;
  reviews: any[];
  averageRating: number;
  totalReviews: number;
  hasUserReviewed: boolean;
  currentUserId?: string;
  productSlug: string;
}

export default function ProductReviews({
  productId,
  productName,
  reviews,
  averageRating,
  totalReviews,
  hasUserReviewed,
  currentUserId,
  productSlug,
}: ProductReviewsProps) {
  const [isSubmittingHelpful, setIsSubmittingHelpful] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const markHelpful = async (reviewId: string) => {
    if (!currentUserId) {
      router.push(`/login?redirectUrl=/products/${productSlug}`);
      return;
    }

    setIsSubmittingHelpful(reviewId);

    try {
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
      router.push(`/login?redirectUrl=/products/${productSlug}`);
      return;
    }

    toast.success("Review reported. Thank you for helping us maintain quality reviews.");
  };

  //  function to render stars
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
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

  return (
    <section id="section-reviews" className="py-2 md:py-2" tabIndex={-1} aria-labelledby="reviews-heading">
      <div className="max-w-6xl mx-auto mt-8 md:mt-16 w-full">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-10 h-10 flex-shrink-0">
            <MessageCircle className="w-8 h-8 text-rose-500" />
          </div>
          <div className="flex flex-col">
            <h2 id="reviews-heading" className="text-2xl md:text-3xl font-bold text-black">
              Customer Reviews
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Review */}
          <div className="md:w-64 bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2">Customer Ratings</h3>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
                <span className="text-xl">/</span>
                <span className="text-xl">5</span>
              </div>
              <div className="flex mb-2">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${i < Math.round(averageRating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <p className="text-gray-500 text-sm">Based on {totalReviews} reviews</p>
            </div>

            <Separator className="my-6" />

            <div className="flex flex-col items-center">
              <Button
                variant="default"
                className="w-full mb-4"
                onClick={() => router.push(`/products/${productSlug}/review`)}
              >
                {hasUserReviewed ? "Edit Your Review" : "Write a Review"}
              </Button>
              <p className="text-xs text-center text-gray-500">
                Share your experience to help other customers make informed decisions
              </p>
            </div>
          </div>

          {/* Reviews list */}
          <div className="flex-1">
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">No reviews yet for this product.</p>
                  {!hasUserReviewed && currentUserId && (
                    <Button onClick={() => router.push(`/products/${productSlug}/review`)}>
                      Be the first to review
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
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
                    <div className="bg-muted/30 p-3 flex justify-between">
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
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}