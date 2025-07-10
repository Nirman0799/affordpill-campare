"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowRight, Truck, ShieldCheck, ReceiptIndianRupee } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const router = useRouter()
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-50/50 to-white py-12 lg:py-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-primary/5"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-primary/5"></div>
      </div>

      <div className="container px-4 mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-3/5 space-y-8 text-center lg:text-left">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight lg:max-w-none">
          Save up to{" "}
          <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-transparent bg-clip-text">
            90%
          </span>{" "}
          on your medicine bills
        </h1>
        <p className="text-base text-gray-600 max-w-2xl mx-auto lg:mx-0">
          Fast delivery of prescription and over-the-counter medicines right to your doorstep.
        </p>
      </div>

            {/* Search */}
            <div className="max-w-xl mx-auto lg:mx-0 w-full">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative rounded-full shadow-md overflow-hidden border border-gray-100">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for medicines, vitamins, and more..."
                    className="pl-14 pr-32 py-7 h-16 text-base rounded-full border-0 focus-visible:ring-primary focus-visible:ring-offset-2 w-full bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 px-6 font-medium"
                  >
                    Search
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>

              <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start">
                <span className="text-sm font-medium text-gray-500">Popular:</span>
                {["Pain Relief", "Vitamins", "Diabetes", "Skin Care", "Baby Care"].map((term) => (
                  <Link
                    href={`/products?search=${encodeURIComponent(term)}`}
                    key={term}
                    className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors px-3 py-1 bg-primary/5 rounded-full"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

         
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6">
  <div className="flex items-center bg-white rounded-full px-5 py-2 text-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <span className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
      <ReceiptIndianRupee className="h-3.5 w-3.5 text-green-700" />
    </span>
    <span className="text-gray-700 font-medium">Free delivery on orders above ₹500</span>
  </div>
  <div className="flex items-center bg-white rounded-full px-5 py-2 text-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <span className="flex-shrink-0 h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
      <ShieldCheck className="h-3.5 w-3.5 text-blue-700" />
    </span>
    <span className="text-gray-700 font-medium">Genuine medicines</span>
  </div>
</div>
          </div>

          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-[350px] lg:h-[480px] w-full mb-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-primary/10"></div>

              <Image
                src="/images/pharmacist.png"
                alt="Medicine delivery"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-contain relative"
              />
            </div>
            <div className="absolute -bottom-6 lg:-bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-sm z-20">
              <div className="bg-white rounded-xl shadow-lg p-5 flex items-center justify-between border border-gray-100">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full flex items-center justify-center mr-4">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Fast Delivery</p>
                    <p className="text-sm text-gray-500">Within 24-48 hours</p>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-700 font-semibold">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

