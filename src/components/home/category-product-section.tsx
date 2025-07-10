//src/components/home/category-product-section.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Heart, Star, AlertCircle, Shield, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"
import { useAuth } from "@/components/providers/auth-provider"

interface Product {
  id: string
  name: string
  price: number
  mrp: number
  discount_percentage: number
  image_url: string
  prescription_required: boolean
  manufacturer: string
  marketer?: string
  rating?: number
  review_count?: number
  in_stock: boolean
  slug: string
}

interface CategoryProductSectionProps {
  categoryId: string
  categoryName?: string
  limit?: number
}

export default function CategoryProductSection({
  categoryId,
  categoryName = "Featured Products",
  limit = 8,
}: CategoryProductSectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/products?category=${categoryId}&limit=${limit}`)

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const data = await response.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryId, limit])

  const handleWishlistClick = (e: React.MouseEvent, productId: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast.error("Please log in to add items to wishlist")
      router.push(`/login?redirectUrl=/products`)
      return
    }

    // needs to be implemented- wishlist functionality
    toast.success(`Added to wishlist`)
  }

  const handleViewAllClick = () => {
    router.push(`/products`)
  }

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{categoryName}</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">High-quality products for your health needs</p>
          </div>
          <Button
            variant="outline"
            onClick={handleViewAllClick}
            className="mt-3 sm:mt-4 md:mt-0 text-xs sm:text-sm"
            size="sm"
          >
            View All
            <ChevronRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array.from({ length: limit }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex flex-col h-full shadow-sm"
              >
                <div className="relative h-40 sm:h-48 w-full mb-3 sm:mb-4">
                  <Skeleton className="h-full w-full rounded-lg" />
                </div>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="mt-auto">
                  <Skeleton className="h-5 w-20 mb-2" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 p-3 sm:p-4 rounded-lg text-red-700 text-center">
            <AlertCircle className="h-5 w-5 mx-auto mb-2" />
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="bg-white rounded-xl border border-gray-100 p-3 sm:p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-40 sm:h-48 w-full mb-3 sm:mb-4">
                  <div className="absolute top-0 right-0 z-10 mt-2 mr-2">
                    {product.discount_percentage > 0 && (
                      <Badge className="bg-red-500 text-white text-xs">
                        {Math.round(product.discount_percentage)}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-0 left-0 z-10 mt-2 ml-2">
                    {product.prescription_required && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1 text-xs"
                      >
                        <AlertCircle className="h-3 w-3" />
                        Rx
                      </Badge>
                    )}
                  </div>
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-2">
  {product.marketer || product.manufacturer}
</p>

                {product.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3 w-3 sm:h-3.5 sm:w-3.5",
                            i < Math.floor(product.rating)
                              ? "text-amber-400 fill-amber-400"
                              : i < product.rating
                                ? "text-amber-400 fill-amber-400 opacity-50"
                                : "text-gray-300",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.review_count})</span>
                  </div>
                )}

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-2 sm:mb-3">
                    <span className="text-base sm:text-lg font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                    {product.discount_percentage > 0 && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.mrp.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 h-8 sm:h-10 px-2 sm:px-4" asChild>
                      <span className="text-xs sm:text-sm">
                        <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        {product.in_stock ? "View Product" : "Out of Stock"}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => handleWishlistClick(e, product.id)}
                      className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                {!product.in_stock && (
                  <div className="mt-2 text-center">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                      Out of Stock
                    </Badge>
                  </div>
                )}

                {product.in_stock && product.prescription_required && (
                  <div className="mt-2 flex items-center justify-center gap-1 text-xs text-blue-700">
                    <Shield className="h-3 w-3" />
                    <span className="text-xs">Prescription required</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

