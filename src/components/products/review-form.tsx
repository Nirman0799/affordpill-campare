// src/components/products/review-form.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import toast from "react-hot-toast";
import { submitReview } from "@/app/actions/review-actions";

interface ReviewFormProps {
  productId: string;
  productName: string;
  initialRating?: number;
  initialComment?: string;
  orderId?: string;
  isEdit?: boolean;
}

export default function ReviewForm({ 
  productId, 
  productName, 
  initialRating = 5, 
  initialComment = "", 
  orderId,
  isEdit = false
}: ReviewFormProps) {
  const [rating, setRating] = useState<number>(initialRating);
  const [comment, setComment] = useState(initialComment);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating < 1) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!comment.trim()) {
      toast.error("Please enter your review");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitReview({
        productId,
        rating,
        comment,
        orderId,
      });
      
      if (result.success) {
        toast.success(isEdit ? "Review updated successfully" : "Review submitted successfully");
        
        const pathParts = window.location.pathname.split('/');
        const productSlug = pathParts[pathParts.indexOf('products') + 1];
        
        router.push(`/products/${productSlug}`);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="bg-gray-50 rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl">{isEdit ? "Edit Your Review" : "Review This Product"}</CardTitle>
        <CardDescription>
          Share your experience with {productName}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Your Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(null)}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 ${
                      (hoverRating !== null ? value <= hoverRating : value <= rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    } transition-colors cursor-pointer`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="comment" className="block text-sm font-medium">Your Review</label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike? What did you use this product for?"
              className="min-h-32 text-sm"
              required
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between border-t p-6 bg-gray-50 rounded-b-lg">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isEdit ? "Update Review" : "Submit Review"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}