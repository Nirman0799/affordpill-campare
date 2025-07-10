"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TestimonialsExact() {
  const [currentPage, setCurrentPage] = useState(2)
  const totalPages = 30

  const testimonials = [
    {
      header: "NEW VISIT BY MEDICAL STORE",
      quote: "The pharmacist isn't just about dispensing medicines, but crafting wellness.",
      rating: null,
      name: "Neha Malhotra",
      role: "Visit Customer",
      image: "/placeholder.svg?height=60&width=60",
      gradient: "bg-gradient-to-br from-gray-50 to-gray-100",
      quotePosition: "right-bottom",
    },
    {
      header: "MEDICAL STORE PATIENT",
      quote: "In the realm of care, my pharmacist here isn't just a provider; they're a guardian of health.",
      rating: 4.2,
      name: "Arjun Kapoor",
      role: "Visit Patient - Dr. Sanjay Gupta",
      image: "/placeholder.svg?height=60&width=60",
      gradient: "bg-gradient-to-br from-amber-50 via-rose-50 to-amber-100/30",
      quotePosition: "left-bottom",
    },
    {
      header: "PRESCRIPTION 047",
      quote: "Trust isn't given; it's earned. And my pharmacist here didn't just earn my trust, but my admiration.",
      rating: null,
      name: "Kavita Desai",
      role: "Pharmacy Clinic",
      image: "/placeholder.svg?height=60&width=60",
      gradient: "bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50",
      quotePosition: "right-bottom",
    },
    {
      header: "PHARMACY VISIT",
      quote: "My local pharmacy isn't just about filling prescriptions; it's about creating healthier lives.",
      rating: null,
      name: "Suresh Reddy",
      role: "Medical Store",
      image: "/placeholder.svg?height=60&width=60",
      gradient: "bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-100/30",
      quotePosition: "right-bottom",
    },
  ]

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "rounded-3xl p-8 relative overflow-hidden h-full shadow-sm border border-gray-100",
                testimonial.gradient,
              )}
            >
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-white/30 opacity-50"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-white/30 opacity-50"></div>

              <div className="mb-16 relative z-10">
                <p className="text-xs font-medium text-gray-500 mb-3">{testimonial.header}</p>
                <p className="text-xl font-medium text-gray-900 leading-relaxed">{testimonial.quote}</p>

                {testimonial.rating && (
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(testimonial.rating)
                            ? "text-amber-400 fill-amber-400"
                            : i < testimonial.rating
                              ? "text-amber-400 fill-amber-400 opacity-50"
                              : "text-gray-300",
                        )}
                      />
                    ))}
                    <span className="ml-2 text-gray-700 font-medium">{testimonial.rating}</span>
                  </div>
                )}
              </div>

              {testimonial.quotePosition === "right-bottom" && (
                <div className="absolute bottom-6 right-6 text-gray-200 font-serif text-8xl leading-none">"</div>
              )}

              {testimonial.quotePosition === "left-bottom" && (
                <div className="absolute bottom-6 left-6 text-gray-200 font-serif text-8xl leading-none rotate-180">
                  "
                </div>
              )}

              <div className="flex items-center gap-3 relative z-10 mt-auto">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-12 gap-4">
          <button
            onClick={prevPage}
            className="h-10 w-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </button>

          <div className="text-sm text-gray-700 flex items-center">
            <span className="font-medium">{currentPage}</span>
            <span className="mx-2 text-gray-400">/</span>
            <span>{totalPages}</span>
          </div>

          <button
            onClick={nextPage}
            className="h-10 w-10 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </section>
  )
}

