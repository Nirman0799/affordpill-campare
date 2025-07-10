"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, FileText } from "lucide-react"
import { PincodeSelector } from "@/components/delivery/pincode-selector"
import { ProductSearch } from "@/components/search/product-search"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HomeHeader } from "@/components/home/header"

export function HomepageContent() {
  const [showPincodeSelector, setShowPincodeSelector] = useState(false)

  return (
    <div className="flex flex-col w-full">
      <HomeHeader />
      <div className="flex items-center p-4">
        <div className="flex items-center gap-2" onClick={() => setShowPincodeSelector(true)}>
          <div className="text-orange-500">
            <MapPin className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-base font-medium">Delivering to</span>
              <span className="text-base font-semibold ml-2">Sector 57</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xs text-muted-foreground">Sector 57, Gurugram, Haryana, India</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <ProductSearch />
        </div>
      </div>

      {/* category cards */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-4">
        <Link href="/products/medications">
          <Card className="overflow-hidden bg-rose-100 border-none h-full">
            <CardContent className="p-3 flex flex-col items-center text-center h-full">
              <h3 className="font-semibold text-base mb-1">Pharmacy</h3>
              <p className="text-xs mb-2">60 mins</p>
              <div className="mt-auto">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Pharmacy"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/lab-tests">
          <Card className="overflow-hidden bg-blue-100 border-none h-full">
            <CardContent className="p-3 flex flex-col items-center text-center h-full">
              <h3 className="font-semibold text-base mb-1">Labs</h3>
              <p className="text-xs mb-2">Smart Reports</p>
              <div className="mt-auto">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Lab Tests"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/health-records">
          <Card className="overflow-hidden bg-green-100 border-none h-full">
            <CardContent className="p-3 flex flex-col items-center text-center h-full">
              <h3 className="font-semibold text-base mb-1">Records</h3>
              <p className="text-xs mb-2">& Insights</p>
              <div className="mt-auto">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Health Records"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="px-4 mb-4">
        <Card className="bg-gray-100 border-none">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-md">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="font-medium">Upload for quick order</span>
            </div>
            <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-full">Order now</Button>
          </CardContent>
        </Card>
      </div>

      {/* Featured banner */}
      <div className="p-4">
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=200&width=600"
            alt="Featured Products"
            width={600}
            height={200}
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* Popular Categories */}
      <div className="px-4 pt-2 pb-4">
        <h2 className="text-lg font-bold mb-3">Popular Categories</h2>
        <div className="grid grid-cols-4 gap-3">
          {["Diabetes", "Cardiac", "Vitamins", "Antibiotics", "Pain Relief", "Skin Care", "Ayurvedic", "Baby Care"].map(
            (category, index) => (
              <Link href={`/categories/${category.toLowerCase().replace(" ", "-")}`} key={index}>
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 rounded-full p-3 mb-1">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt={category}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="text-xs text-center">{category}</span>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>

      {/* modal - Pincode */}
      {showPincodeSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-4">Select Delivery Location</h2>
              <PincodeSelector onClose={() => setShowPincodeSelector(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

