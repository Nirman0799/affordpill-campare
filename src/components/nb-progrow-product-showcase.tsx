"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NbProgrowProductShowcase() {
  return (
    <section className="py-6 px-4 max-w-7xl mx-auto">

      <div className="grid md:grid-cols-2 gap-4">
        {/* NB-Hunger Product */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border h-[220px]">
          <div className="flex flex-row h-full">
            <div className="w-2/5 bg-gradient-to-br from-yellow-50 to-yellow-100 p-2 flex items-center justify-center">
              <Image
                src="/banners/nbhunger.png"
                alt="NB-Hunger Syrup"
                width={140}
                height={180}
                className="object-contain max-h-[200px] transition-transform hover:scale-105"
              />
            </div>
            <div className="w-3/5 p-4 flex flex-col">
              <h3 className="text-lg font-bold">NB-Hunger Syrup</h3>
              <p className="text-gray-600 text-sm mt-2 mb-3 line-clamp-3">
                Cyproheptadine Hydrochloride & Tricholine Citrate Syrup with Pineapple Flavor. Helps stimulate appetite
                in children.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">200ml</span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">Pineapple</span>
              </div>
              <div className="mt-auto">
                <Button asChild variant="outline" size="sm" className="group">
                  <Link href="/products/nb-hunger" className="flex items-center">
                    View Details
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progrow Plus */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border h-[220px]">
          <div className="flex flex-row h-full">
            <div className="w-2/5 bg-gradient-to-br from-red-50 to-red-100 p-2 flex items-center justify-center">
              <Image
                src="/banners/progrow.png"
                alt="Progrow Plus Powder"
                width={140}
                height={140}
                className="object-contain max-h-[200px] transition-transform hover:scale-105"
              />
            </div>
            <div className="w-3/5 p-4 flex flex-col">
              <h3 className="text-lg font-bold">Progrow Plus Powder</h3>
              <p className="text-gray-600 text-sm mt-2 mb-3 line-clamp-3">
                Protein powder with vitamins and minerals. Chocolate flavor for nutrition support. Supports muscle
                growth and development.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">200g</span>
                <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded">Chocolate</span>
              </div>
              <div className="mt-auto">
                <Button asChild variant="outline" size="sm" className="group">
                  <Link href="/products/progrow-plus-powder" className="flex items-center">
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

