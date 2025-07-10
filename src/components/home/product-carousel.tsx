"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Product {
  id: number
  name: string
  tagline: string
  description: string
  benefits: string[]
  imageUrl: string
  size: string
}

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [visibleCards, setVisibleCards] = useState(4)

  const products: Product[] = [
    {
      id: 1,
      name: "Jamun Neem Karela Syrup",
      tagline: "Sugar Free Formula",
      description: "Supports Healthy Blood Sugar",
      benefits: [
        "Helpful to Control Cholesterol",
        "Regulates Blood Sugar Level",
        "Helpful to Control Diabetes",
        "Immunity Booster",
      ],
      imageUrl: "/banners/neems.png",
      size: "1000 ml",
    },
    {
      id: 2,
      name: "ORS Powder Sachet",
      tagline: "Oral Rehydration Salts",
      description: "Restores Body Fluids & Electrolytes",
      benefits: ["Lost due to Dehydration", "Orange Flavor", "Quick Absorption", "Prevents Dehydration"],
      imageUrl: "/banners/ors.png",
      size: "21.8g",
    },
    {
      id: 3,
      name: "Electronir",
      tagline: "Oral Rehydration Salts",
      description: "ORS Based on W.H.O. Formula",
      benefits: ["Prevents Dehydration", "Replenishes Minerals", "Restores Electrolyte Balance", "Rapid Rehydration"],
      imageUrl: "/banners/electro.jpg",
      size: "21.8g",
    },
    {
      id: 4,
      name: "Biconir Capsule",
      tagline: "B-Complex with Folic Acid",
      description: "& L-lysine Capsules",
      benefits: [
        "Supports Energy Production",
        "Promotes Healthy Nervous System",
        "Supports Red Blood Cell Formation",
        "Enhances Metabolism",
      ],
      imageUrl: "/banners/biconir.png",
      size: "10 x 15 Capsules",
    },
    {
      id: 5,
      name: "Nirzyme Syrup",
      tagline: "Ayurvedic Proprietary Medicine",
      description: "Digestive Enzymes",
      benefits: ["Supports Digestion", "Pineapple Flavored", "Relieves Indigestion", "Improves Nutrient Absorption"],
      imageUrl: "/banners/nirzyme.png",
      size: "200ml",
    },
    {
      id: 6,
      name: "Zinconir Syrup",
      tagline: "Antioxidant, Multivitamins",
      description: "Multimineral & Zinc Syrup",
      benefits: [
        "Mix Fruit Flavor",
        "Supports Immune Function",
        "Promotes Growth & Development",
        "Antioxidant Protection",
      ],
      imageUrl: "/banners/zinconir.png",
      size: "200ml",
    },
    {
      id: 7,
      name: "Orthonir Oil",
      tagline: "An Effective Pain Reliever",
      description: "For Joint and Muscular Pain",
      benefits: [
        "Relieves Joint Pain",
        "Reduces Muscle Soreness",
        "Anti-inflammatory Properties",
        "Fast Acting Formula",
      ],
      imageUrl: "/banners/ortho.png",
      size: "50ml",
    },
    {
      id: 8,
      name: "Livnir-DS Tablet",
      tagline: "Ayurvedic Proprietary Medicine",
      description: "A Liver Tablet",
      benefits: [
        "Protects the liver against various hepatotoxins",
        "Promotes appetite and growth",
        "Supports Liver Function",
        "Aids Detoxification",
      ],
      imageUrl: "/banners/livnir.png",
      size: "60 Tablets",
    },
    {
      id: 9,
      name: "Livnir-DS Tonic",
      tagline: "Ayurvedic Proprietary Medicine",
      description: "A Liver Tonic",
      benefits: [
        "Protects the liver against various hepatotoxins",
        "Promotes appetite and growth",
        "Supports Liver Health",
        "Liquid Formula for Easy Consumption",
      ],
      imageUrl: "/banners/livnirs.png",
      size: "200ml",
    },
  ]

  // update the cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1)
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2)
      } else if (window.innerWidth < 1280) {
        setVisibleCards(3)
      } else {
        setVisibleCards(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, products.length - visibleCards)

  const scrollToIndex = (index: number) => {
    const newIndex = Math.min(Math.max(0, index), maxIndex)
    setCurrentIndex(newIndex)

    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / products.length
      carouselRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: "smooth",
      })
    }
  }

  const nextSlide = () => scrollToIndex(currentIndex + 1)
  const prevSlide = () => scrollToIndex(currentIndex - 1)

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative py-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M16 6L18 8L22 4M8.5 12H10.5M8.5 16H10.5M8.5 8H16.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 8H3.5M5.5 12H3.5M5.5 16H3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 19.5V4.5C2.5 3.39543 3.39543 2.5 4.5 2.5H19.5C20.6046 2.5 21.5 3.39543 21.5 4.5V19.5C21.5 20.6046 20.6046 21.5 19.5 21.5H4.5C3.39543 21.5 2.5 20.6046 2.5 19.5Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Upcoming Products</h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="overflow-hidden" aria-live="polite">
        <div
          ref={carouselRef}
          className="flex gap-3 transition-transform duration-300 overflow-x-auto scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className={cn(
                "flex-shrink-0 snap-start",
                visibleCards === 1
                  ? "w-full"
                  : visibleCards === 2
                    ? "w-[calc(50%-6px)]"
                    : visibleCards === 3
                      ? "w-[calc(33.333%-8px)]"
                      : "w-[calc(25%-9px)]",
              )}
            >
              <Card className="h-full overflow-hidden border rounded-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-2 flex justify-between items-center border-b">
                      <span className="text-xs font-medium text-gray-500">{product.tagline}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs py-0">
                        New
                      </Badge>
                    </div>
                    <div className="relative aspect-square w-full overflow-hidden bg-white">
                      <Image
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-contain w-full h-full p-0"
                        priority={index === 0}
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-grow">
                      <h3 className="font-bold text-sm mb-0.5">{product.name}</h3>
                      <p className="text-gray-600 text-xs mb-2">{product.description}</p>

                      <div className="space-y-0.5 mb-2 flex-grow">
                        {product.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                            <span className="text-xs text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-xs font-medium text-gray-500 mt-auto">Size: {product.size}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1 mt-3">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

