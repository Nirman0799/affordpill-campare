// //src/components/search/product-search.tsx
"use client"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from '@/utils/supabase/browser'
import { cn } from "@/lib/utils"

// badge colors
const categoryColors = {
  Medication: { bg: "#fee2e2", text: "#991b1b" }, 
  Vitamins: { bg: "#fef3c7", text: "#92400e" },
  "Medical Devices": { bg: "#dbeafe", text: "#1e40af" },
  "First Aid": { bg: "#dcfce7", text: "#166534" },
  "Personal Care": { bg: "#f3e8ff", text: "#6b21a8" }, 
  "Baby Care": { bg: "#ffedd5", text: "#9a3412" }, 
  "Skin Care": { bg: "#e0e7ff", text: "#3730a3" }, 
  Prescription: { bg: "#f3e8ff", text: "#6b21a8" }, 
}

// Tag badge 
const tagColors = {
  "Best Seller": { bg: "#fee2e2", text: "#991b1b" },
  New: { bg: "#dbeafe", text: "#1e40af" },
  Offer: { bg: "#dcfce7", text: "#166534" },
  Prescription: { bg: "#f3e8ff", text: "#6b21a8" },
  "Top Rated": { bg: "#fef3c7", text: "#92400e" },
  Essential: { bg: "#e0e7ff", text: "#3730a3" },
  Gentle: { bg: "#ffedd5", text: "#9a3412" },
  Trending: { bg: "#f5f5f5", text: "#171717" },
  Medication: { bg: "#fee2e2", text: "#991b1b" },
}

interface ProductType {
  id: string
  name: string
  description: string
  price: number
  mrp?: number
  discountPercentage?: number
  category: string
  image: string
  slug: string
  tags?: string[]
}

interface ProductSearchProps {
  className?: string
}

export function ProductSearch({ className }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isSearchFocused, setIsSearchFocused] = React.useState(false)
  const [filteredProducts, setFilteredProducts] = React.useState<ProductType[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const searchRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const supabase = createClient()

  React.useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim()) {
        setFilteredProducts([])
        return
      }
      setIsLoading(true)
      try {
        // try using the API 
        const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}&limit=5`, {
          cache: "no-store",
        })
        if (!response.ok) {
          throw new Error(`Search API error: ${response.status}`)
        }
        const result = await response.json()
        if (result.success && result.results) {
          setFilteredProducts(result.results)
        } else {
          setFilteredProducts([])
          console.error("Search API returned error:", result.message)
        }
      } catch (error) {
        console.error("Error searching products via API:", error)
        // Fallback to query if API fails
        try {
          const { data, error: supabaseError } = await supabase
            .from("products")
            .select(`
              id, 
              name, 
              slug, 
              generic_name, 
              price, 
              product_images(id, image_url, is_primary),
              prescription_required
            `)
            .eq("is_active", true)
            .or(`name.ilike.%${searchQuery}%,generic_name.ilike.%${searchQuery}%`)
            .limit(5)
          if (supabaseError) {
            console.error("Supabase fallback error:", supabaseError)
            return
          }
          if (data && data.length > 0) {
            const processedData = data.map((product) => ({
              id: product.id,
              name: product.name,
              description: product.generic_name || "",
              price: product.price,
              category: product.prescription_required ? "Prescription" : "Medication",
              image: product.product_images?.find((img: any) => img.is_primary)?.image_url || "/images/placeholder.png",
              tags: product.prescription_required ? ["Prescription"] : ["Medication"],
              slug: product.slug,
            }))
            setFilteredProducts(processedData)
          } else {
            setFilteredProducts([])
          }
        } catch (fallbackError) {
          console.error("Fallback search failed:", fallbackError)
          setFilteredProducts([])
        }
      } finally {
        setIsLoading(false)
      }
    }
    // Debounce - to avoid too many requests
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts()
      }
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [searchQuery, supabase])

  // Close search modal when clicked outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // keyboard nav
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchFocused(false)
    }
  }

 
  const CustomBadge = ({ type, label }: { type: "category" | "tag"; label: string }) => {
    const colors = type === "category" ? categoryColors : tagColors
    const style = colors[label as keyof typeof colors] || { bg: "#f5f5f5", text: "#171717" }
    return (
      <span
        className="text-xs px-2 py-0.5 rounded-full inline-flex items-center"
        style={{
          backgroundColor: style.bg,
          color: style.text,
        }}
      >
        {label}
      </span>
    )
  }

  return (
    <div className={cn("relative", className)} ref={searchRef} onKeyDown={handleKeyDown}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search products..."
          className="w-full md:w-[300px] pl-9 transition-all focus-visible:w-full md:focus-visible:w-[350px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
        />
        {searchQuery && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setSearchQuery("")
              setIsSearchFocused(false)
              inputRef.current?.focus()
            }}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
      {/* Live search dropdown */}
      {isSearchFocused && searchQuery && (
        <div className="absolute top-full right-0 mt-1 bg-background border rounded-lg shadow-lg z-50 max-h-[500px] overflow-auto w-[450px] animate-in fade-in-0 zoom-in-95 duration-100">
          <div className="p-3 border-b flex items-center justify-between">
            <p className="text-sm font-medium">
              {isLoading ? "Searching..." : `Products (${filteredProducts.length})`}
            </p>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          {isLoading ? (
            <div className="p-8 flex items-center justify-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary rounded-full border-t-transparent"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="p-2">
                {filteredProducts.map((product) => (
                  <Link
                    href={`/products/${product.slug}`}
                    key={product.id}
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsSearchFocused(false)}
                  >
                    <div className="flex-shrink-0 relative overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.image || "/images/placeholder.png"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="object-cover h-[50px] w-[50px]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
                        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                          <span className="text-sm font-semibold">₹{product.price.toFixed(2)}</span>
                          {product.mrp && product.discountPercentage && product.discountPercentage > 0 && (
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1 py-0 h-auto bg-green-50 text-green-700 border-green-200"
                            >
                              {product.discountPercentage}% off
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <CustomBadge type="category" label={product.category} />
                        {product.tags &&
                          product.tags
                            .slice(0, 2)
                            .map((tag: string) => <CustomBadge key={tag} type="tag" label={tag} />)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-3 border-t">
                <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                  <Link href={`/products?search=${encodeURIComponent(searchQuery)}`}>
                    View all results for "{searchQuery}"
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground">No products found for "{searchQuery}"</p>
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <Link href="/products">Browse all products</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}