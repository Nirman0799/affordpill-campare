"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Pill, Droplet, Heart, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CategoriesSectionModern() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const router = useRouter()

  const categories = [
    {
      id: 1,
      title: "Pain Relief",
      subtitle: "Fast-acting solutions for headaches, muscle pain & inflammation",
      image: "/images/pain.png?height=500&width=400",
      icon: Pill,
      searchTerm: "Pain Relief", 
      color: "from-orange-500 to-red-500",
      textColor: "text-orange-600",
    },
    {
      id: 2,
      title: "Diabetes Care",
      subtitle: "Essential products for monitoring & managing blood sugar levels",
      image: "/images/diabetes.png?height=500&width=400",
      icon: Droplet,
      searchTerm: "Diabetes", 
      color: "from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Skin Care",
      subtitle: "Dermatologist-recommended products for healthy, radiant skin",
      image: "/images/skincare.png?height=500&width=400",
      icon: Heart,
      searchTerm: "Skin Care",
      color: "from-amber-400 to-orange-400",
      textColor: "text-amber-600",
    },
    {
      id: 4,
      title: "Vitamins & Supplements",
      subtitle: "Boost your immunity, energy and overall wellness",
      image: "/images/vitamins.png?height=500&width=400",
      icon: Sparkles,
      searchTerm: "Vitamins", 
      color: "from-purple-500 to-violet-500",
      textColor: "text-purple-600",
    },
  ]

  // Update to use the same URL structure as the Hero section
  const handleCategoryClick = (searchTerm: string) => {
    router.push(`/products?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Product Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">Shop by Health Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of healthcare products organized by category to find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCategoryClick(category.searchTerm)}
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] mb-6">
                {/* Background image */}
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: hoveredCard === category.id ? "scale(1.05)" : "scale(1)",
                  }}
                />
                <div className={cn("absolute inset-0 opacity-60 bg-gradient-to-t", category.color)}></div>

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-md">
                      <category.icon className={cn("w-5 h-5", category.textColor)} />
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-md transform translate-y-0 opacity-100 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-gray-800" />
                    </div>
                  </div>

                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold mb-1">{category.title}</h3>
                    <p className="text-gray-600 text-xs line-clamp-2">{category.subtitle}</p>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none">
                  {category.id === 1 && (
                    <div className="absolute top-1/3 left-1/4">
                    </div>
                  )}
                  {category.id === 2 && (
                    <div className="absolute top-1/4 right-1/4">
                    </div>
                  )}
                  {category.id === 3 && (
                    <div className="absolute bottom-1/3 left-1/3">
                    </div>
                  )}
                  
                </div>
              </div>

              <div className="px-2">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{category.title}</h3>
                <div className="flex items-center">
                  <span className={cn("text-sm font-medium", category.textColor)}>View products</span>
                  <ArrowUpRight
                    className={cn("ml-1 w-4 h-4 transition-transform group-hover:translate-x-1", category.textColor)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}