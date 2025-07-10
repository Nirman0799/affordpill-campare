"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles, Leaf, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function MultivitaminBannerModern() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const benefits = [
    { icon: Sparkles, text: "Antioxidant Rich", color: "text-amber-500", delay: "delay-100" },
    { icon: Leaf, text: "Natural Ingredients", color: "text-green-500", delay: "delay-200" },
    { icon: Zap, text: "Boosts Energy", color: "text-blue-500", delay: "delay-300" },
    { icon: Brain, text: "Cognitive Support", color: "text-purple-500", delay: "delay-400" },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-teal-50 to-emerald-100"></div>

          <div className="absolute top-0 right-0 w-64 h-64 bg-green-200/30 rounded-full -translate-y-1/3 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/30 rounded-full translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12">
            <div className="lg:col-span-7 z-10">
              <div
                className={cn(
                  "inline-flex items-center px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-green-700 text-sm font-medium mb-4",
                  "opacity-0 transition-opacity duration-500",
                  isVisible && "opacity-100",
                )}
              >
                <Leaf className="h-4 w-4 mr-2" />
                Premium Wellness Formula
              </div>

              <h2
                className={cn(
                  "text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight",
                  "opacity-0 transform translate-y-4 transition-all duration-700",
                  isVisible && "opacity-100 translate-y-0",
                )}
              >
                NBPL'S MULTIVITAMINS
                <span className="block text-green-600">Complete Nutrition Support</span>
              </h2>

              <p
                className={cn(
                  "text-gray-700 mb-6 max-w-2xl",
                  "opacity-0 transform translate-y-4 transition-all duration-700 delay-100",
                  isVisible && "opacity-100 translate-y-0",
                )}
              >
                Advanced formula with Taurine, Astaxanthin, Lycopene, Ginkgo Biloba, Grape Seed Extract, Green Tea
                Extract, Ginseng, Essential Amino Acids & Minerals for complete daily nutrition.
              </p>

              <div
                className={cn(
                  "grid grid-cols-2 gap-3 mb-8",
                  "opacity-0 transition-opacity duration-1000 delay-300",
                  isVisible && "opacity-100",
                )}
              >
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-lg p-2",
                      "opacity-0 transform translate-y-4 transition-all duration-500",
                      isVisible && `opacity-100 translate-y-0 ${benefit.delay}`,
                    )}
                  >
                    <benefit.icon className={cn("h-5 w-5", benefit.color)} />
                    <span className="text-sm font-medium text-gray-800">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div
                className={cn(
                  "flex flex-wrap items-center gap-6 mb-6",
                  "opacity-0 transform translate-y-4 transition-all duration-700 delay-500",
                  isVisible && "opacity-100 translate-y-0",
                )}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">₹40.00</span>
                  <span className="text-lg text-gray-500 line-through">₹98.00</span>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold">59% OFF</span>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    In Stock
                  </Badge>
                  <span className="text-sm text-gray-600">10 tablets per pack</span>
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-4",
                  "opacity-0 transform translate-y-4 transition-all duration-700 delay-700",
                  isVisible && "opacity-100 translate-y-0",
                )}
              >
                <Button
                  onClick={() => router.push("/products/nbpls-multivitamins")}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-base"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push("/categories/multivitamins")}
                  className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-6 text-base"
                >
                  View All Multivitamins
                </Button>
              </div>

              <p
                className={cn(
                  "text-xs text-gray-500 mt-4",
                  "opacity-0 transition-opacity duration-1000 delay-1000",
                  isVisible && "opacity-100",
                )}
              >
                By Stepan Lifescience Pvt Ltd | Vitamin D3, Ginkgo Biloba Extract & more
              </p>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center z-10">
              <div
                className={cn(
                  "relative",
                  "opacity-0 transform scale-95 transition-all duration-1000",
                  isVisible && "opacity-100 scale-100",
                )}
              >
                <div className="absolute -top-6 -right-6 z-20">
                  <div className="bg-red-500 text-white rounded-full h-20 w-20 flex items-center justify-center transform rotate-12 shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-medium">SAVE</div>
                      <div className="text-xl font-bold">59%</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/30 backdrop-blur-md rounded-full p-8 h-[400px] w-[400px] flex items-center justify-center shadow-xl">
  <div className="relative h-full w-full">
    <Image
      src="/images/nbpl-multi.png?height=800&width=600"
      alt="NBPL'S MULTIVITAMINS"
      fill
      className="object-contain"
    />
  </div>
</div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-md p-2 z-20">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-xs font-medium">Antioxidant Rich</span>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-md p-2 z-20">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-xs font-medium">Natural Formula</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

