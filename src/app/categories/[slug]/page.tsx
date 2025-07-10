// src/app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { getCategoryBySlug } from '@/app/actions/category-actions'
import { Suspense } from 'react'
import { ProductsListingSkeleton } from '@/components/products/products-listing-skeleton'
import CategoryProductListing from '@/components/categories/category-product-listing'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const slug = params.slug;
  const { category } = await getCategoryBySlug(slug)

  if (!category) {
    return {
      title: 'Category Not Found - AffordPill',
      description: 'The requested category could not be found',
    }
  }

  return {
    title: `${category.name} - AffordPill`,
    description: category.description || `Browse our collection of ${category.name} medications and healthcare products.`,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: {
    page?: string
    limit?: string
  }
}) {
  const slug = params.slug;
  const { category, parent, error } = await getCategoryBySlug(slug)
  
  if (!category || error) {
    notFound()
  }
  
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 12

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <Link href="/" className="flex items-center hover:text-foreground">
          <Home className="h-3.5 w-3.5 mr-1" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground">Products</Link>
        {parent && (
          <>
            <span>/</span>
            <Link href={`/categories/${parent.slug}`} className="hover:text-foreground">{parent.name}</Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground font-medium">{category.name}</span>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-muted-foreground">{category.description}</p>
        )}
      </div>

      <Suspense fallback={<ProductsListingSkeleton />}>
        <CategoryProductListing 
          categoryId={category.id} 
          initialPage={page}
          initialLimit={limit}
        />
      </Suspense>
    </main>
  )
}