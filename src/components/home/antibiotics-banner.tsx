"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowRight, ShieldCheck, Clock, FileText, Pill, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AntibioticsBannerModern() {
  const router = useRouter()

  const antibioticTypes = ["Amoxicillin", "Azithromycin", "Ciprofloxacin", "Doxycycline", "Cephalexin"]

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-7 p-6 md:p-12 relative">
              <div className="pl-4 md:pl-6">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Pill className="h-4 w-4 md:h-5 md:w-5 text-emerald-700" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">Prescription Antibiotics</h3>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                  Complete Range of <span className="text-emerald-500">Quality Antibiotics</span>
                </h2>

                <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg">
                  Get access to a wide range of prescription antibiotics for treating various bacterial infections, all
                  delivered to your doorstep.
                </p>

                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {antibioticTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200 px-2 py-1 text-xs md:text-sm"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">Genuine Medicines</h3>
                      <p className="text-xs md:text-sm text-gray-500">100% authentic products</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">Fast Delivery</h3>
                      <p className="text-xs md:text-sm text-gray-500">Within 24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 md:h-5 md:w-5 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">Prescription Required</h3>
                      <p className="text-xs md:text-sm text-gray-500">Upload via our secure system</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Button
                    onClick={() => router.push("/products")}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-600 hover:from-emerald-700 hover:to-emerald-700 px-4 md:px-8 py-2 md:py-6 text-sm md:text-base font-medium w-full sm:w-auto"
                  >
                    Browse Antibiotics
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => router.push("/upload")}
                    className="border-black-200 text-black-700 hover:bg-blue-50 px-4 md:px-8 py-2 md:py-6 text-sm md:text-base font-medium w-full sm:w-auto"
                  >
                    Upload Prescription
                  </Button>
                </div>

                <p className="text-xs text-gray-500 mt-4 md:mt-6">
                  *Antibiotics are prescription-only medications and require a valid prescription from a licensed
                  healthcare provider.
                </p>
              </div>
            </div>

            <div className="col-span-1 lg:col-span-5 bg-gradient-to-br from-blue-50 to-indigo-50 relative min-h-[300px] md:min-h-[400px] lg:min-h-full">
              <div className="hidden md:block absolute top-1/4 right-1/4">
                <div className="h-12 w-12 md:h-20 md:w-20 rounded-full bg-blue-100/50 backdrop-blur-sm"></div>
              </div>
              <div className="hidden md:block absolute bottom-1/3 left-1/3">
                <div className="h-8 w-8 md:h-12 md:w-12 rounded-full bg-indigo-100/50 backdrop-blur-sm"></div>
              </div>

              <div className="hidden md:block absolute top-8 md:top-12 right-8 md:right-12">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white flex items-center justify-center shadow-md">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/doctor.png"
                    alt="Antibiotics medication"
                    fill
                    className="object-contain p-4 md:p-8"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              </div>
              <div className="absolute bottom-4 md:bottom-12 left-1/2 transform -translate-x-1/2 w-full px-4 md:px-0 md:w-auto">
                <div className="bg-white rounded-xl shadow-lg p-3 md:p-4 flex items-center space-x-2 md:space-x-3 border border-gray-100 max-w-[250px] md:w-64 mx-auto md:mx-0">
                  <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-green-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm md:text-base">Up to 30% Off</h3>
                    <p className="text-xs text-gray-500">On selected antibiotics</p>
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

