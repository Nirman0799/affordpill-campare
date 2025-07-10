'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface ProductsPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function ProductsPagination({
  currentPage,
  totalPages,
  onPageChange
}: ProductsPaginationProps) {
  const getPageNumbers = () => {
    const pages = []
    
    // show first page
    pages.push(1)
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (pages.indexOf(i) === -1) {
        pages.push(i)
      }
    }
    
    if (totalPages > 1) {
      pages.push(totalPages)
    }
    
    const result = []
    let prevPage = 0
    
    for (const page of pages) {
      if (prevPage && page - prevPage > 1) {
        result.push(-prevPage)  
      }
      result.push(page)
      prevPage = page
    }
    
    return result
  }
  
  const pageNumbers = getPageNumbers()
  
  return (
    <nav
      className="flex items-center justify-center py-8"
      aria-label="Pagination"
    >
      <div className="flex items-center gap-1">
        {/* Previous page button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {/* Page numbers */}
        <div className="flex items-center gap-1 px-1">
          {pageNumbers.map((pageNum, index) => {
            if (pageNum < 0) {
              return (
                <span 
                  key={`ellipsis-${index}`} 
                  className="mx-1 flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              )
            }
            
            return (
              <Button
                key={pageNum}
                variant={pageNum === currentPage ? "default" : "outline"}
                size="icon"
                onClick={() => onPageChange(pageNum)}
                aria-label={`Go to page ${pageNum}`}
                aria-current={pageNum === currentPage ? "page" : undefined}
                className="h-9 w-9"
              >
                {pageNum}
              </Button>
            )
          })}
        </div>
        
        {/* Next page button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Go to next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  )
}