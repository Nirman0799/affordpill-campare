//src/app/components/products/product-listing.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import ProductCard from '@/components/products/product-card'
import ProductsFilterBar from '@/components/products/products-filter-bar'
import ProductsPagination from '@/components/products/products-pagination'
import { Loader2 } from 'lucide-react'

interface Product {
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
}

interface ProductListingProps {
  initialPage: number
  initialLimit: number
  initialCategory: string
  initialSearch: string
}

export default function ProductListingComponent({
  initialPage,
  initialLimit,
  initialCategory,
  initialSearch
}: ProductListingProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [category, setCategory] = useState(initialCategory || '')
  const [search, setSearch] = useState(initialSearch)
  
  const hasUpdatedUrl = useRef(false)
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        params.set('limit', limit.toString())
        if (category) params.set('category', category)
        if (search) params.set('search', search)
        
        const response = await fetch(`/api/listings?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        
        const data = await response.json()
        
        setProducts(data.products || [])
        setTotalProducts(data.total || 0)
        setTotalPages(Math.ceil((data.total || 0) / limit))
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again.')
        setProducts([])
        setTotalProducts(0)
        setTotalPages(0)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
    
    if (!hasUpdatedUrl.current) {
      hasUpdatedUrl.current = true
      return
    }
    
    const params = new URLSearchParams(searchParams.toString())
    
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    
    if (limit === 12) { 
      params.delete('limit')
    } else {
      params.set('limit', limit.toString())
    }
    
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    
    if (search) {
      params.set('search', search)
    } else {
      params.delete('search')
    }
    
    const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`
    const currentUrl = window.location.pathname + window.location.search
    
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false })
    }
  }, [page, limit, category, search, pathname, router, searchParams])
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleFilterChange = (newCategory: string, newSearch: string) => {
    if (newCategory !== category || newSearch !== search) {
      setCategory(newCategory)
      setSearch(newSearch)
      setPage(1) // Reset to first page
    }
  }
  
  return (
    <div className="space-y-6">
      <ProductsFilterBar 
        initialCategory={category} 
        initialSearch={search}
        onFilterChange={handleFilterChange}
      />
      
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <p className="text-lg text-gray-500">No products found. Try adjusting your filters.</p>
        </div>
      )}
      
      {!loading && !error && products.length > 0 && (
        <>
          <div className="text-sm text-gray-500 mb-4">
            Showing {products.length} of {totalProducts} products
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <ProductsPagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  )
}