// src/app/products/page.tsx
import { Suspense } from 'react'
import { Metadata } from 'next'
import ProductListingComponent from '@/components/products/product-listing'
import { ProductsListingSkeleton } from '@/components/products/products-listing-skeleton'

export const metadata: Metadata = {
  title: 'Products - AffordPill',
  description: 'Browse our wide range of medications and healthcare products.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: {
    page?: string
    limit?: string
    category?: string
    search?: string
  }
}) {
  const params = await searchParams
  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 12
  const category = params.category || ''
  const search = params.search || ''

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      
      <Suspense fallback={<ProductsListingSkeleton />}>
        <ProductListingComponent 
          initialPage={page} 
          initialLimit={limit}
          initialCategory={category}
          initialSearch={search}
        />
      </Suspense>
    </main>
  )
}