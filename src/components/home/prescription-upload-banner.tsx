"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Upload, FileText, CheckCircle, Camera, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function PrescriptionUploadBannerAlt() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)

  const uploadOptions = [
    {
      title: "Upload Image",
      icon: Camera,
      description: "Take a clear photo of your prescription",
    },
    {
      title: "Upload PDF",
      icon: FileText,
      description: "Upload a scanned copy of your prescription",
    },
    {
      title: "WhatsApp",
      icon: Phone,
      description: "Send your prescription via WhatsApp",
    },
  ]

  return (
    <section className="w-full py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="p-[2px] rounded-3xl bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
          <div className="bg-white rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 bg-gradient-to-r from-blue-600 to-indigo-700 relative h-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/rx.png?height=400&width=400"
                      alt="Upload Prescription"
                      fill
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex items-center gap-1.5 z-10">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium">Verified by Pharmacists</span>
                  </div>

                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex items-center gap-1.5 z-10">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs font-medium">100% Secure</span>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className="lg:col-span-7 p-6 lg:p-8">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700 mb-3">
                  Easy Prescription Service
                </Badge>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Upload Your Prescription</h1>

                <p className="text-gray-600 text-base mb-5 max-w-2xl">
                  Get your prescription medications delivered to your doorstep. Our licensed pharmacists will verify
                  your prescription and process your order quickly and securely.
                </p>

                {/* Upload options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
                  {uploadOptions.map((option, index) => (
                    <div
                      key={index}
                      className={cn(
                        "border rounded-xl p-3 cursor-pointer transition-all",
                        activeTab === index
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-200 hover:bg-gray-50",
                      )}
                      onClick={() => setActiveTab(index)}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center mb-2",
                            activeTab === index ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500",
                          )}
                        >
                          <option.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-medium text-gray-900 mb-0.5 text-sm">{option.title}</h3>
                        <p className="text-xs text-gray-500">{option.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* benefits */}
                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <h3 className="font-medium text-gray-900 mb-3 text-sm">Why Upload Your Prescription?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600">Convenient access to prescription medications</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600">Doorstep delivery within 24-48 hours</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600">Secure and confidential handling of your information</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      </div>
                      <p className="text-xs text-gray-600">Verification by licensed pharmacists</p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/upload")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm w-full md:w-auto"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Prescription Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

