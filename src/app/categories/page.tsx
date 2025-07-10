// src/app/categories/page.tsx
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { Metadata } from 'next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'All Categories - AffordPill',
  description: 'Browse all medication and healthcare product categories',
}

export default async function CategoriesPage() {
  const supabase = await createClient()
  
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, name, slug, description')
    .order('name')
  
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <Link href="/" className="flex items-center hover:text-foreground">
          <Home className="h-3.5 w-3.5 mr-1" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Categories</span>
      </div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Categories</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our wide range of medication and healthcare product categories
        </p>
      </div>
      
      {error ? (
        <div className="py-12 text-center">
          <p className="text-red-500">Failed to load categories. Please try again later.</p>
        </div>
      ) : categories?.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No categories found.</p>
          <Link href="/products" className="text-primary hover:underline mt-2 inline-block">
            Browse all products instead
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories?.map(category => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  <CardDescription>
                    {category.description || `Browse our ${category.name} products`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-primary text-sm">View products &rarr;</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}