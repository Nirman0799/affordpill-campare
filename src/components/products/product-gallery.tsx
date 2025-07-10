'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ImageType = {
  id: string
  url: string
  isPrimary: boolean
}

interface ProductGalleryProps {
  images: ImageType[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showZoomed, setShowZoomed] = useState(false)
  
  if (images.length === 0) {
    images = [{ id: 'placeholder', url: '/images/placeholder.png', isPrimary: true }]
  }
  
  const activeImage = images[activeIndex]
  
  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  
  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }
  
  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg bg-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image 
            src={activeImage.url} 
            alt={`${productName} - Image ${activeIndex + 1}`}
            width={400}
            height={400}
            className={cn(
              "h-full w-full object-contain transition-transform duration-300",
              showZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            )}
            onClick={() => setShowZoomed(!showZoomed)}
            priority={activeIndex === 0}
          />
        </div>
        
        {!showZoomed && (
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-2 right-2 bg-white/70 h-8 w-8" 
            onClick={() => setShowZoomed(true)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        )}
        
        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full h-8 w-8"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full h-8 w-8"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto py-1 justify-center">
          {images.map((image, index) => (
            <button
              key={image.id}
              className={cn(
                "relative flex-shrink-0 w-12 h-12 rounded overflow-hidden focus:outline-none",
                index === activeIndex ? "ring-2 ring-primary" : "ring-1 ring-border"
              )}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image.url}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}