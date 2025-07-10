//src/components/products/product-card.tsx
"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, FileText, Heart, ChevronRight, Star, Shield, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { useCartContext } from "@/components/providers/cart-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { formatCurrency } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    mrp: number
    discount_percentage: number
    image_url: string
    prescription_required: boolean
    manufacturer: string
    marketer?: string 
    rating?: number
    review_count?: number
    in_stock?: boolean
  }
  variant?: "default" | "compact" | "featured"
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCartContext()
  const router = useRouter()
  const auth = useAuth()

  const inStock = product.in_stock !== false // Default to true

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!inStock) {
      toast.error("This product is out of stock", {
        position: "bottom-right",
        duration: 2000,
      })
      return
    }

    setIsAddingToCart(true)
    try {
      const success = await addToCart(product.id, 1)
      if (success) {
        toast.success(`${product.name} added to cart`, {
          position: "bottom-right",
          duration: 2000,
        })
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add item to cart", {
        position: "bottom-right",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (auth.loading) {
      toast.loading("Checking authentication...", { id: "auth-check" })
      return
    }

    if (!auth.user) {
      toast.error("Please log in to add items to your wishlist", {
        position: "bottom-right",
        duration: 3000,
      })

    } else {
      toast.success("Added to wishlist", { position: "bottom-right" })
    }
  }

 
  // const handleBuyNow = (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()

  if (variant === "compact") {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group flex items-center gap-3 p-3 rounded-lg border bg-white transition-all hover:shadow-md"
      >
        {/* Product images */}
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-50">
          <Image
            src={product.image_url || "/images/placeholder.png"}
            alt={product.name}
            fill
            sizes="64px"
            className="object-contain p-1"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm font-semibold">{formatCurrency(product.price)}</span>

            {product.discount_percentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">{formatCurrency(product.mrp)}</span>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0 text-gray-500 hover:text-primary hover:bg-primary/10"
          onClick={handleAddToCart}
          disabled={isAddingToCart || !inStock}
        >
          {isAddingToCart ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
        </Button>
      </Link>
    )
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group relative flex flex-col h-full overflow-hidden rounded-xl border bg-white transition-all hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Featured Badge */}
        <div className="absolute left-0 top-4 z-10">
          <Badge className="rounded-r-full bg-primary text-white px-3 py-1 shadow-md">Featured</Badge>
        </div>

        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image_url || "/images/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-contain p-6 transition-transform duration-500",
              isHovered ? "scale-110" : "scale-100",
            )}
          />

          {product.discount_percentage > 0 && (
            <div className="absolute right-3 top-3">
              <Badge className="bg-red-500 text-white font-medium px-2 py-1 shadow-sm">
                {Math.round(product.discount_percentage)}% OFF
              </Badge>
            </div>
          )}

          {product.prescription_required && (
            <div className="absolute left-3 bottom-3">
              <Badge
                variant="outline"
                className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 px-2 py-1"
              >
                <FileText className="h-3 w-3" />
                Prescription Required
              </Badge>
            </div>
          )}

          {!inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Badge variant="outline" className="text-base bg-red-50 text-red-700 border-red-200 px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2">
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300",
                      )}
                    />
                  ))}
                </div>
                {product.review_count && <span className="text-xs text-gray-500">({product.review_count})</span>}
              </div>
            )}

            <h3 className="font-semibold text-lg line-clamp-2 min-h-[3rem]">{product.name}</h3>

            {product.marketer && (
  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{product.marketer}</p>
)}
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</span>

              {product.discount_percentage > 0 && (
                <span className="text-base text-muted-foreground line-through">{formatCurrency(product.mrp)}</span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="default"
                className="w-full"
                onClick={handleAddToCart}
                disabled={isAddingToCart || !inStock}
              >
                {isAddingToCart ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </span>
                )}
              </Button>

              <Button variant="outline" className="w-full" asChild disabled={!inStock}>
                <div>
                  <span className="flex items-center gap-1">
                    Buy Now
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
        <Image
          src={product.image_url || "/images/placeholder.png"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={cn("object-contain transition-transform duration-300", isHovered ? "scale-110" : "scale-100")}
        />
        <div
          className={cn(
            "absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        >
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-colors hover:bg-primary/10"
            onClick={handleWishlistClick}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>

        {product.discount_percentage > 0 && (
          <div className="absolute right-2 top-2">
            <Badge className="bg-red-500 text-white font-medium">{Math.round(product.discount_percentage)}% OFF</Badge>
          </div>
        )}

        {product.prescription_required && (
          <div className="absolute left-2 top-2">
            <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
              <FileText className="h-3 w-3" />
              Rx
            </Badge>
          </div>
        )}

        {/* Out of Stock */}
        {!inStock && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <Badge variant="outline" className="text-base bg-red-50 text-red-700 border-red-200 px-3 py-1.5">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300",
                  )}
                />
              ))}
            </div>
            {product.review_count && <span className="text-xs text-gray-500">({product.review_count})</span>}
          </div>
        )}

        <h3 className="font-medium line-clamp-2 min-h-[2.5rem] text-sm">{product.name}</h3>

        {/* {product.manufacturer && (
          <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{product.manufacturer}</p>
        )} */}
{product.marketer && (
  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{product.marketer}</p>
)}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>

            {product.discount_percentage > 0 && (
              <>
                <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.mrp)}</span>
                <Badge variant="outline" className="font-medium text-xs bg-green-50 text-green-700 border-green-100">
                  {Math.round(product.discount_percentage)}% off
                </Badge>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Button
              variant={inStock ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={isAddingToCart || !inStock}
            >
              {isAddingToCart ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Adding...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  {inStock ? "Add" : "Out of Stock"}
                </span>
              )}
            </Button>

            <Button variant="outline" size="sm" className="flex items-center gap-1" asChild disabled={!inStock}>
              <div>
                Buy
                <ChevronRight className="h-3.5 w-3.5" />
              </div>
            </Button>
          </div>

          {product.prescription_required && (
            <div className="mt-2 flex items-center justify-center gap-1 text-xs text-blue-700">
              <Shield className="h-3 w-3" />
              <span>Prescription required</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

