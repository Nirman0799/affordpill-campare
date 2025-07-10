// src/app/products/[slug]/review/page.tsx
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewForm from "@/components/products/review-form";
import { getUserProductReview } from "@/app/actions/review-actions";

export default async function ReviewProductPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return redirect(`/login?redirectUrl=/products/${params.slug}/review`);
  }
  
  // getch product details
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('id, name, slug')
    .eq('slug', params.slug)
    .single();
  
  if (productError || !product) {
    notFound();
  }
  
  // check for existing reviews for this product
  const { review } = await getUserProductReview(product.id, user.id);
  

  const { data: orderItems } = await supabase
    .from('orders')
    .select(`
      id,
      order_items!inner(
        id,
        product_id
      )
    `)
    .eq('user_id', user.id)
    .eq('order_items.product_id', product.id)
    .limit(1);
  
  const hasPurchased = orderItems && orderItems.length > 0;
  const orderId = hasPurchased ? orderItems[0].id : undefined;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href={`/products/${params.slug}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Product
          </Link>
        </Button>
        
        <h1 className="text-2xl font-bold">{review ? "Edit Your Review" : "Write a Review"}</h1>
        <p className="text-gray-500">
          {hasPurchased
            ? "Thank you for purchasing this product."
            : "Share your experience with this product."}
        </p>
      </div>
      
      <ReviewForm
        productId={product.id}
        productName={product.name}
        initialRating={review?.rating || 5}
        initialComment={review?.comment || ""}
        orderId={orderId}
        isEdit={!!review}
      />
    </div>
  );
}