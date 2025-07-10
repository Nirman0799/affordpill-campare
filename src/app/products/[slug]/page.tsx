// src/app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Metadata, ResolvingMetadata } from 'next'
import NewProductDetails from '@/components/products/product-details'
import ProductGallery from '@/components/products/product-gallery'
import ProductTabs from '@/components/products/product-tabs'
import RelatedProducts from '@/components/products/related-products'
import ProductReviews from '@/components/products/product-reviews'
import { Home } from 'lucide-react'
import Link from 'next/link'
import { getProductReviews, getUserProductReview } from "@/app/actions/review-actions"

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select(`
      name,
      generic_name,
      description
    `)
    .eq('slug', slug)
    .single()
  
  if (!product) {
    return {
      title: 'Product Not Found - AffordPill',
      description: 'The requested product could not be found',
    }
  }
  
  return {
    title: `${product.name} - AffordPill`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.substring(0, 160),
      type: 'website',
      images: [
        {
          url: '/images/placeholder.png',
          width: 1200,
          height: 630,
          alt: product.name,
        }
      ],
    },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const supabase = await createClient()
  
  // get product details
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      generic_name,
      description,
      price,
      mrp,
      discount_percentage,
      manufacturer:manufacturers(name),
      marketer:marketers(name),
      hsn_code,
      stock_quantity,
      prescription_required,
      dosage,
      dosage_form,
      strength,
      unit_type,
      units_per_pack,
      pack_label,
      usage_instructions,
      warnings,
      side_effects,
      product_images(id, image_url, is_primary, sort_order),
      product_ingredients(
        strength,
        ingredient:active_ingredients(name)
      ),
      therapeutic_class:therapeutic_classes(name),
      chemical_class:chemical_classes(name),
      action_class:action_classes(name),
      product_safety_advice(
        alcohol_safety, alcohol_advice,
        pregnancy_safety, pregnancy_advice,
        breastfeeding_safety, breastfeeding_advice,
        driving_safety, driving_advice,
        kidney_safety, kidney_advice,
        liver_safety, liver_advice
      )
    `)
    .eq('slug', slug)
    .single()
  
  if (error || !product) {
    notFound()
  }
  
  // gallery images
  const images = product.product_images
    ?.sort((a, b) => {
      // Primary image first
      if (a.is_primary) return -1
      if (b.is_primary) return 1
      // then sort
      return (a.sort_order || 0) - (b.sort_order || 0)
    })
    .map(img => ({
      id: img.id,
      url: img.image_url,
      isPrimary: img.is_primary
    })) || []
  
  // if no images avaiable, add  placeholder
  if (images.length === 0) {
    images.push({
      id: 'placeholder',
      url: '/images/placeholder.png',
      isPrimary: true
    })
  }

  // get category
  const categoryName = product.therapeutic_class?.name || product.chemical_class?.name
  let categorySlug = ''
  
  if (product.therapeutic_class?.name) {
    categorySlug = product.therapeutic_class.name.toLowerCase().replace(/\s+/g, '-')
  } else if (product.chemical_class?.name) {
    categorySlug = product.chemical_class.name.toLowerCase().replace(/\s+/g, '-')
  }
  
  // get similar products (same  ingredients)
  const ingredients = product.product_ingredients?.map(pi => pi.ingredient?.name).filter(Boolean) || []
  
  const { reviews, averageRating, totalReviews } = await getProductReviews(product.id)
  
  let hasUserReviewed = false
  const { data: { user } } = await supabase.auth.getUser()
  
  if (user) {
    const { review } = await getUserProductReview(product.id, user.id)
    hasUserReviewed = !!review
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <Link href="/" className="flex items-center hover:text-foreground">
          <Home className="h-3.5 w-3.5 mr-1" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">Products</Link>
        {categoryName && (
          <>
            <span>/</span>
            <Link href={`/categories/${categorySlug}`} className="hover:text-foreground">{categoryName}</Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <ProductGallery images={images} productName={product.name} />
        </div>
                <div className="flex flex-col gap-4">
          <NewProductDetails product={product} />
        </div>
      </div>
      
      <div className="mb-10">
        <ProductTabs 
          product={product} 
          reviewStats={{
            averageRating,
            totalReviews
          }}
        />
      </div>
      
      <div className="mb-10">
        <ProductReviews 
          productId={product.id}
          productName={product.name}
          reviews={reviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          hasUserReviewed={hasUserReviewed}
          currentUserId={user?.id}
          productSlug={product.slug}
        />
      </div>
            <div>
        <RelatedProducts 
          productId={product.id} 
          ingredients={ingredients} 
          currentProductSlug={product.slug} 
        />
      </div>
    </div>
  )
}