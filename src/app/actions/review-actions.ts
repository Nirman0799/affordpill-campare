// src/app/actions/review-actions.ts
'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

interface ReviewData {
  productId: string;
  rating: number;
  comment: string;
  orderId?: string;
}

export async function submitReview(reviewData: ReviewData) {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { success: false, error: "Authentication required" }
    }
    
    // check for existing rview by the user for same product
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', reviewData.productId)
      .maybeSingle()
    
    if (existingReview) {
      // if found update existing review
      const { error: updateError } = await supabase
        .from('reviews')
        .update({
          rating: reviewData.rating,
          comment: reviewData.comment,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingReview.id)
      
      if (updateError) {
        console.error('Error updating review:', updateError)
        return { success: false, error: "Failed to update your review" }
      }
    } else {
      // purchase verification
      let isVerifiedPurchase = false
      
      if (reviewData.orderId) {
        const { data: orderItems } = await supabase
          .from('order_items')
          .select('id')
          .eq('order_id', reviewData.orderId)
          .eq('product_id', reviewData.productId)
          .limit(1)
        
        isVerifiedPurchase = orderItems && orderItems.length > 0
      } else {
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
          .eq('order_items.product_id', reviewData.productId)
          .limit(1)
        
        isVerifiedPurchase = orderItems && orderItems.length > 0
      }
      
      // add new review
      const { error: insertError } = await supabase
        .from('reviews')
        .insert({
          product_id: reviewData.productId,
          user_id: user.id,
          order_id: reviewData.orderId,
          rating: reviewData.rating,
          comment: reviewData.comment,
          is_verified_purchase: isVerifiedPurchase,
          is_approved: false // admin approval required
        })
      
      if (insertError) {
        console.error('Error creating review:', insertError)
        return { success: false, error: "Failed to submit your review" }
      }
    }
    
    revalidatePath(`/products/${reviewData.productId}`)
    
    return { success: true }
  } catch (error) {
    console.error('Unexpected error in submitReview:', error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getProductReviews(productId: string) {
  try {
    const supabase = await createClient()
    
    // fetch all reviews for product
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        is_verified_purchase,
        created_at,
        updated_at,
        user:profiles(id, first_name, last_name)
      `)
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching reviews:', error)
      return { reviews: [], error: error.message }
    }
    
    // reviews formatting
    const formattedReviews = reviews.map(review => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      is_verified_purchase: review.is_verified_purchase,
      created_at: review.created_at,
      updated_at: review.updated_at,
      user_id: review.user?.id,
      user_name: review.user ? `${review.user.first_name} ${review.user.last_name.charAt(0)}.` : 'Anonymous'
    }))
    
    const totalReviews = formattedReviews.length
    const totalRating = formattedReviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0
    
    return { 
      reviews: formattedReviews, 
      totalReviews,
      averageRating,
      error: null 
    }
  } catch (error) {
    console.error('Unexpected error in getProductReviews:', error)
    return { 
      reviews: [], 
      totalReviews: 0,
      averageRating: 0,
      error: 'Failed to fetch reviews' 
    }
  }
}

export async function getUserProductReview(productId: string, userId: string) {
  try {
    const supabase = await createClient()
    
    const { data: review, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('user_id', userId)
      .maybeSingle()
    
    if (error) {
      console.error('Error fetching user review:', error)
      return { review: null, error: error.message }
    }
    
    return { review, error: null }
  } catch (error) {
    console.error('Unexpected error in getUserProductReview:', error)
    return { review: null, error: 'Failed to fetch user review' }
  }
}