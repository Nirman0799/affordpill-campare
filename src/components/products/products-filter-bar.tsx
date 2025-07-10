'use client'

import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface ProductsFilterBarProps {
  initialCategory: string
  initialSearch: string
  onFilterChange: (category: string, search: string) => void
}

export default function ProductsFilterBar({
  initialCategory,
  initialSearch,
  onFilterChange
}: ProductsFilterBarProps) {
  const [formState, setFormState] = useState({
    category: initialCategory || 'all',
    search: initialSearch || '',
    isSubmitting: false
  })
  
  const [popularCategories, setPopularCategories] = useState<{id: string, name: string}[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchPopularCategories = async () => {
      setIsLoadingCategories(true)
      try {
        const response = await fetch('/api/categories/popular')
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        
        if (isMounted) {
          setPopularCategories(data.categories || [])
        }
      } catch (error) {
        console.error('Error fetching popular categories:', error)
        if (isMounted) {
          setPopularCategories([])
        }
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false)
        }
      }
    }
    
    fetchPopularCategories()
    
    return () => {
      isMounted = false;
    }
  }, [])
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formState.isSubmitting) return;
    
    setFormState(prev => ({ ...prev, isSubmitting: true }))
    // Convert 'all' category to empty string for API
    const categoryValue = formState.category === 'all' ? '' : formState.category
    
    onFilterChange(categoryValue, formState.search)
    
    setTimeout(() => {
      setFormState(prev => ({ ...prev, isSubmitting: false }))
    }, 300)
  }
  
  const handleCategoryChange = (value: string) => {
    setFormState(prev => ({ ...prev, category: value }))
    
    if (!formState.isSubmitting) {
      const categoryFilter = value === 'all' ? '' : value
      onFilterChange(categoryFilter, formState.search)
    }
  }
  
  const handleClearFilters = () => {
    setFormState({ category: 'all', search: '', isSubmitting: false })
    onFilterChange('', '')
  }
  
  const hasActiveFilters = formState.category !== 'all' || formState.search !== ''
  
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-9"
                value={formState.search}
                onChange={(e) => setFormState(prev => ({ ...prev, search: e.target.value }))}
              />
              {formState.search && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    setFormState(prev => ({ ...prev, search: '' }))
                    onFilterChange(formState.category === 'all' ? '' : formState.category, '')
                  }}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </button>
              )}
            </div>
            <Button type="submit" disabled={formState.isSubmitting}>Search</Button>
          </form>
        </div>
        
        <div className="w-full md:w-64">
          <Select 
            value={formState.category} 
            onValueChange={handleCategoryChange}
            disabled={formState.isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {isLoadingCategories ? (
                <SelectItem value="loading" disabled>Loading categories...</SelectItem>
              ) : (
                popularCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t">
          <span className="text-sm text-muted-foreground">Active Filters:</span>
          {formState.category !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {popularCategories.find(c => c.id === formState.category)?.name || 'Category'}
              <button 
                onClick={() => handleCategoryChange('all')}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
                disabled={formState.isSubmitting}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove category filter</span>
              </button>
            </Badge>
          )}
          {formState.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {formState.search}
              <button 
                onClick={() => {
                  setFormState(prev => ({ ...prev, search: '' }))
                  onFilterChange(formState.category === 'all' ? '' : formState.category, '')
                }}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
                disabled={formState.isSubmitting}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove search filter</span>
              </button>
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilters}
            className="ml-auto text-xs h-7"
            disabled={formState.isSubmitting}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}