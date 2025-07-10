"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles, Shield, Star, Clock, Droplet, Leaf } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function SkincareBanner() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const skinConcerns = [
    { name: "Acne & Blemishes", icon: Shield },
    { name: "Anti-Aging", icon: Clock },
    { name: "Dryness", icon: Droplet },
    { name: "Sensitive Skin", icon: Leaf },
  ]

  const featuredProducts = [
    {
      name: "Accufine 40mg",
      description: "Advanced acne treatment",
      price: "₹200.00",
      originalPrice: "₹467.00",
      discount: "57% off",
      image: "/images/acne.png?height=120&width=120"
    },
    {
      name: "Clinsol Soap",
      description: "Antibacterial cleansing",
      price: "₹60.00",
      originalPrice: "₹75.00",
      discount: "20% off",
      image: "/placeholder.svg?height=120&width=120"
    },
    {
      name: "Elosone S",
      description: "Soothing skin therapy",
      price: "₹65.00",
      originalPrice: "₹105.00",
      discount: "38% off",
      image: "/placeholder.svg?height=120&width=120"
    },
    {
      name: "AGEFINE FACEWASH",
      description: "Gentle daily cleanser",
      price: "₹100.00",
      originalPrice: "₹199.00",
      discount: "50% off",
      image: "/placeholder.svg?height=120&width=120"
    }
  ]

  const tabContent = [
    {
      title: "Acne Solutions",
      subtitle: "Clear skin starts here",
      description: "Clinically proven treatments to combat acne, reduce inflammation, and prevent breakouts.",
      cta: "Shop Acne Care",
      image: "/images/acne.png?height=400&width=400",
      color: "from-blue-600 to-indigo-600",
      textColor: "text-blue-600"
    },
    {
      title: "Anti-Aging Essentials",
      subtitle: "Turn back the clock",
      description: "Advanced formulations with retinol and peptides to reduce fine lines and restore youthful radiance.",
      cta: "Shop Anti-Aging",
      image: "/images/antiaging.png?height=400&width=400",
      color: "from-purple-600 to-pink-600",
      textColor: "text-purple-600"
    },
    {
      title: "Hydration Heroes",
      subtitle: "Quench your skin's thirst",
      description: "Intense moisturizers and serums to replenish dry skin and maintain a healthy moisture barrier.",
      cta: "Shop Moisturizers",
      image: "/images/serum.png?height=400&width=400",
      color: "from-teal-600 to-emerald-600",
      textColor: "text-teal-600"
    }
  ]

  const currentTab = tabContent[activeTab]

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl shadow-lg mb-8">
          <div className={`absolute inset-0 bg-gradient-to-r ${currentTab.color} opacity-90`}></div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="text-white space-y-6">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                {currentTab.subtitle}
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {currentTab.title}
              </h1>
              
              <p className="text-white/90 text-lg max-w-xl">
                {currentTab.description}
              </p>
              
              <div className="flex space-x-2">
                {tabContent.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-3 h-3 rounded-full ${
                      activeTab === index ? "bg-white" : "bg-white/40"
                    } transition-all duration-300`}
                    aria-label={`View ${tabContent[index].title}`}
                  />
                ))}
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => router.push('/categories/skin-care')}
                  className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-6 text-base"
                >
                  {currentTab.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative h-64 md:h-80 w-64 md:w-80">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-full"></div>
                <Image
                  src={currentTab.image || "/placeholder.svg"}
                  alt={currentTab.title}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {skinConcerns.map((concern, index) => (
            <div 
              key={index}
              onClick={() => router.push(`/categories/skincare/${concern.name.toLowerCase().replace(/\s+/g, '-')}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className={`h-12 w-12 rounded-full ${currentTab.textColor} bg-gray-100 flex items-center justify-center mb-3`}>
                <concern.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium text-gray-900">{concern.name}</h3>
              <p className="text-xs text-gray-500 mt-1">Shop Solutions</p>
            </div>
          ))}
        </div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-blue-50 rounded-xl p-6 flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Dermatologist Tested</h3>
              <p className="text-sm text-gray-600">All products are clinically tested and approved by dermatologists</p>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-xl p-6 flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <Leaf className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Natural Ingredients</h3>
              <p className="text-sm text-gray-600">Formulated with natural extracts and free from harmful chemicals</p>
            </div>
          </div>
          
          <div className="bg-teal-50 rounded-xl p-6 flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
              <Droplet className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Suitable for All Skin Types</h3>
              <p className="text-sm text-gray-600">Gentle formulations that work for sensitive, dry, and oily skin</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
