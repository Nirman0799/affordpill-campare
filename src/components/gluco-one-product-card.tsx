"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Star, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function GlucoOneProductCard() {
  return (
    <section className="py-6 sm:py-8 px-4 max-w-7xl mx-auto">

      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 min-h-[280px] relative">
        <div className="absolute -right-12 top-4 sm:top-7 bg-red-600 text-white font-bold py-1 px-12 transform rotate-45 z-10 text-xs sm:text-sm shadow-md">
          70% OFF
        </div>

        <div className="flex flex-col sm:flex-row h-full">
          <div className="w-full sm:w-2/5 bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-50 p-3 sm:p-4 flex items-center justify-center relative overflow-hidden aspect-square sm:aspect-auto">
            <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 bg-blue-200 rounded-full -translate-x-6 sm:-translate-x-8 -translate-y-6 sm:-translate-y-8 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 bg-indigo-200 rounded-full translate-x-6 sm:translate-x-8 translate-y-6 sm:translate-y-8 opacity-50"></div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <Image
                src="/banners/bgthree.png"
                alt="Dr. Morepen GlucoOne Blood Glucose Monitoring System"
                width={220}
                height={220}
                className="object-contain w-[220px] sm:w-[260px] max-h-[220px] sm:max-h-[260px] transition-transform hover:scale-105 drop-shadow-md"
              />
            </div>
          </div>

          <div className="w-full sm:w-3/5 p-4 sm:p-6 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-1 sm:mb-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Medical Device
              </Badge>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900">Dr. Morepen GlucoOne Blood Glucose Monitor</h3>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2 mb-2 sm:mb-4">
              Complete blood glucose monitoring system with test strips. Model BG-03 with lifetime warranty.
            </p>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-3 gap-y-1 sm:gap-y-2 mb-3 sm:mb-4">
              <div className="flex items-center text-xs sm:text-sm text-gray-700">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 sm:mr-2 flex-shrink-0" />
                <span>Biosensor Technology</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-700">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 sm:mr-2 flex-shrink-0" />
                <span>Small Blood Volume</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-700">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 sm:mr-2 flex-shrink-0" />
                <span>Fast Results (5 sec)</span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-700">
                <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 sm:mr-2 flex-shrink-0" />
                <span>300 Reading Memory</span>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex flex-wrap items-baseline gap-2 mb-2 sm:mb-3">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">₹200.00</span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">MRP: ₹665.00</span>
                <Badge className="bg-green-50 text-green-700 border-green-200">Save ₹465</Badge>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap items-center text-xs text-gray-500 gap-3">
                  <div className="flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    <span>Lifetime Warranty</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="group bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                >
                  <Link href="/products/dr-morepen-bg-03-gluco-one-glucose-monitoring-system-glucometer" className="flex items-center justify-center">
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

