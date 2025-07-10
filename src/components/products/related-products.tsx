// src/components/product/RelatedProducts.tsx
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2, ShoppingBag, ShoppingCart, Heart, Star, AlertCircle, Shield, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getRelatedProducts, getSimilarProducts } from "@/app/actions/product-actions"
import { formatCurrency } from "@/lib/utils"
import { useAuth } from "@/components/providers/auth-provider"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface RelatedProductsProps {
  productId: string
  ingredients: string[]
  currentProductSlug: string
}

type Product = {
  id: string
  name: string
  slug: string
  price: number
  mrp: number
  discount_percentage: number
  image_url: string
  prescription_required: boolean
  match_percentage?: number
  in_stock?: boolean
}

export default function RelatedProducts({ productId, ingredients, currentProductSlug }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)

      try {
        // fetch similar products based on ingredients
        if (ingredients && ingredients.length > 0) {
          const { products: similarProducts, error: similarError } = await getSimilarProducts(productId, ingredients)

          if (!similarError && similarProducts.length > 0) {
            setProducts(similarProducts)
            setIsLoading(false)
            return
          }
        }

        // fall back to related products
        const { products: relatedProducts, error: relatedError } = await getRelatedProducts(
          productId,
          currentProductSlug,
        )

        if (!relatedError) {
          setProducts(relatedProducts)
        } else {
          console.error("Error fetching related products:", relatedError)
          setProducts([])
        }
      } catch (error) {
        console.error("Error loading products:", error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    if (productId) {
      fetchProducts()
    }
  }, [productId, currentProductSlug, ingredients])

  
  if (isLoading) {
    return (
      <div className="py-6">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col h-full shadow-sm">
              <div className="relative h-48 w-full mb-4 bg-gray-100 animate-pulse"></div>
              <div className="h-5 w-3/4 mb-2 bg-gray-100 animate-pulse"></div>
              <div className="h-4 w-1/2 mb-4 bg-gray-100 animate-pulse"></div>
              <div className="mt-auto">
                <div className="h-5 w-20 mb-2 bg-gray-100 animate-pulse"></div>
                <div className="h-9 w-full rounded-lg bg-gray-100 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Related Products</h2>
          <p className="text-gray-600 mt-1">Products you might be interested in</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Link 
            key={product.id}
            href={`/products/${product.slug}`} 
            className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 w-full mb-4">
              <div className="absolute top-0 right-0 z-10 mt-2 mr-2">
                {product.discount_percentage > 0 && (
                  <Badge className="bg-red-500 text-white">
                    {Math.round(product.discount_percentage)}% OFF
                  </Badge>
                )}
              </div>
              <div className="absolute top-0 left-0 z-10 mt-2 ml-2">
                {product.prescription_required && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Rx
                  </Badge>
                )}
                {product.match_percentage && product.match_percentage > 70 && (
                  <Badge className="bg-green-100 text-green-800 ml-1">
                    {Math.round(product.match_percentage)}% match
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

            <h3 className="font-medium text-gray-900 text-base mb-1 line-clamp-2">{product.name}</h3>

            <div className="mt-auto">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</span>
                {product.discount_percentage > 0 && (
                  <span className="text-sm text-gray-500 line-through">{formatCurrency(product.mrp)}</span>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Product
                </Button>
              </div>
            </div>

            {product.in_stock === false && (
              <div className="mt-2 text-center">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Out of Stock
                </Badge>
              </div>
            )}

            {product.prescription_required && (
              <div className="mt-2 flex items-center justify-center gap-1 text-xs text-blue-700">
                <Shield className="h-3 w-3" />
                <span>Prescription required</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}