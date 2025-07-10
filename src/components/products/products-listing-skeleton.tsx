'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function ProductsListingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Skeleton */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
          <Skeleton className="h-10 w-full md:w-64" />
        </div>
      </div>
      
      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
      
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center gap-1">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div className="flex items-center gap-1 px-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-9 w-9 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg border bg-white">
      <div className="relative aspect-square bg-gray-50 p-4">
        <Skeleton className="h-full w-full" />
      </div>
      
      <div className="flex flex-1 flex-col p-4 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        
        <div className="mt-auto pt-4">
          <Skeleton className="h-6 w-1/3 mb-3" />
          
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  )
}