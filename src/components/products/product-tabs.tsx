
"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { AlertTriangle, Check, Info, MessageCircle, ShieldAlert, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import DOMPurify from "isomorphic-dompurify"


interface ProductDetailsProps {
  product: any
}

interface ProductDetailsProps {
  product: any;
  reviewStats?: {
    averageRating: number;
    totalReviews: number;
  };
}

export default function ProductDetails({ product, reviewStats }: ProductDetailsProps) {
  const safetyInfo = product?.product_safety_advice?.[0] || {}
  const [activeSection, setActiveSection] = useState<string>("section-description")
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    "section-description": false,
    "section-usage": false,
    "section-safety": false,
    "section-side-effects": false,
    "section-reviews": false,
  })


  const hasSafetyInfo = () => {
    const safetyAdvice = product?.product_safety_advice?.[0]
    return Boolean(
      safetyAdvice?.alcohol_advice ||
      safetyAdvice?.pregnancy_advice ||
      safetyAdvice?.breastfeeding_advice ||
      safetyAdvice?.driving_advice ||
      safetyAdvice?.kidney_advice ||
      safetyAdvice?.liver_advice,
    )
  }

  const hasUsageInfo = () => {
    return Boolean(product?.usage_instructions || product?.dosage || product?.warnings)
  }

  const hasSideEffectsInfo = () => {
    return Boolean(product?.side_effects)
  }


  const openCrispChat = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== "undefined" && window.$crisp) {
      window.$crisp.push(["do", "chat:open"])
    }
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            setVisibleSections((prev) => ({ ...prev, [sectionId]: true }))
          }
        })
      },
      { threshold: 0.2 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
      setActiveSection(id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      scrollToSection(id)
    }
  }


  const getSafetyStatus = (advice: string | undefined) => {
    if (!advice) return "Caution"
    const lowerAdvice = advice.toLowerCase()
    if (lowerAdvice.includes("safe") && !lowerAdvice.includes("unsafe")) return "Safe"
    if (lowerAdvice.includes("unsafe") || lowerAdvice.includes("avoid")) return "Unsafe"
    return "Caution"
  }


  const getSideEffects = () => {
    if (!product.side_effects) return []


    if (Array.isArray(product.side_effects)) return product.side_effects


    try {
      const parsed = JSON.parse(product.side_effects)
      return Array.isArray(parsed) ? parsed : []
    } catch (e) {

      return product.side_effects
        .split(/[,\n]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0)
    }
  }


  const sideEffects = getSideEffects()
  const midpoint = Math.ceil(sideEffects.length / 2)
  const leftColumnEffects = sideEffects.slice(0, midpoint)
  const rightColumnEffects = sideEffects.slice(midpoint)

  return (
    <div className="w-full bg-white" role="main">
  {/* Navigation new design */}
  <div
    className="sticky top-16 z-30 w-full bg-white py-4 px-4 backdrop-blur-md bg-white/95"
    role="navigation"
    aria-label="Product sections"
  >
    <div className="max-w-7xl mx-auto flex flex-wrap gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <Button
        variant={activeSection === "section-description" ? "default" : "outline"}
        size="sm"
        className="rounded-full text-xs font-medium transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700"
        onClick={() => scrollToSection("section-description")}
        onKeyDown={(e) => handleKeyDown(e, "section-description")}
        aria-current={activeSection === "section-description" ? "page" : undefined}
      >
        <span className="flex items-center gap-1.5">
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-100">
            <Info className="h-2.5 w-2.5 text-indigo-600" aria-hidden="true" />
          </div>
          Description
        </span>
      </Button>

      {hasUsageInfo() && (
        <Button
          variant={activeSection === "section-usage" ? "default" : "outline"}
          size="sm"
          className="rounded-full text-xs font-medium transition-all duration-200 hover:bg-emerald-50 hover:text-emerald-700"
          onClick={() => scrollToSection("section-usage")}
          onKeyDown={(e) => handleKeyDown(e, "section-usage")}
          aria-current={activeSection === "section-usage" ? "page" : undefined}
        >
          <span className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100">
              <Check className="h-2.5 w-2.5 text-emerald-600" aria-hidden="true" />
            </div>
            Usage & Dosage
          </span>
        </Button>
      )}

      {hasSafetyInfo() && (
        <Button
          variant={activeSection === "section-safety" ? "default" : "outline"}
          size="sm"
          className="rounded-full text-xs font-medium transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
          onClick={() => scrollToSection("section-safety")}
          onKeyDown={(e) => handleKeyDown(e, "section-safety")}
          aria-current={activeSection === "section-safety" ? "page" : undefined}
        >
          <span className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-100">
              <ShieldAlert className="h-2.5 w-2.5 text-blue-600" aria-hidden="true" />
            </div>
            Safety Information
          </span>
        </Button>
      )}

      {hasSideEffectsInfo() && (
        <Button
          variant={activeSection === "section-side-effects" ? "default" : "outline"}
          size="sm"
          className="rounded-full text-xs font-medium transition-all duration-200 hover:bg-rose-50 hover:text-rose-700"
          onClick={() => scrollToSection("section-side-effects")}
          onKeyDown={(e) => handleKeyDown(e, "section-side-effects")}
          aria-current={activeSection === "section-side-effects" ? "page" : undefined}
        >
          <span className="flex items-center gap-1.5">
            <div className="flex items-center justify-center w-4 h-4 rounded-full bg-rose-100">
              <AlertTriangle className="h-2.5 w-2.5 text-rose-600" aria-hidden="true" />
            </div>
            Side Effects
          </span>
        </Button>
      )}

      <Button
        variant={activeSection === "section-reviews" ? "default" : "outline"}
        size="sm"
        className="rounded-full text-xs font-medium transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
        onClick={() => scrollToSection("section-reviews")}
        onKeyDown={(e) => handleKeyDown(e, "section-reviews")}
        aria-current={activeSection === "section-reviews" ? "page" : undefined}
      >
        <span className="flex items-center gap-1.5">
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-purple-100">
            <MessageCircle className="h-2.5 w-2.5 text-purple-600" aria-hidden="true" />
          </div>
          Reviews ({reviewStats?.totalReviews || 0})
        </span>
      </Button>
    </div>
  </div>

  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <section id="section-description" className="py-8 md:py-16" tabIndex={-1} aria-labelledby="description-heading">
      <div className="max-w-6xl mx-auto p-3 sm:p-5 bg-white rounded-3xl w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#111] mb-3">About {product.name}</h1>

            <p className="text-[#555] text-sm mb-4">
              {product.manufacturer?.name && `Manufactured by : ${product.manufacturer.name}`}
              {!product.manufacturer?.name && product.marketer?.name && `Marketed by : ${product.marketer.name}`}
            </p>

            <div className="flex mb-5 space-x-3">
              {product.prescription_required && (
                <div className="flex items-center border border-[#2e8eff] rounded-none overflow-hidden h-10">
                  <div className="bg-white w-12 h-full flex items-center justify-center border-r border-[#2e8eff]">
                    <img
                      src="/images/prescription-icon.png"
                      alt="Prescription required"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div className="bg-[#2e8eff] text-white px-6 py-2 h-full flex items-center justify-center">
                    <span className="text-base font-medium tracking-wide">prescription required</span>
                  </div>
                </div>
              )}
              {product.habit_forming && (
                <div className="bg-[#f47b85] text-white px-6 py-2 rounded-none h-10 flex items-center justify-center">
                  <span className="text-base font-medium tracking-wide">habit forming</span>
                </div>
              )}
            </div>

            <div
              className="text-[#333] text-sm mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description || "") }}
            />
          </div>

          <div className="md:w-[340px]">
            <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-[0_0_0_0] md:shadow-sm bg-white">
              {/* Header */}
              <div className="p-3 flex items-center border-b border-gray-100">
                <Sparkles className="w-5 h-5 mr-2 text-gray-700" />
                <h2 className="text-lg font-bold">Product Details</h2>
              </div>

              <div className="relative p-2 border-b border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-[#fff7ad] to-[#ffa9f9] opacity-30"></div>

                <p className="relative whitespace-nowrap text-black font-normal text-[11px]">
                  Product and manufacturer has been verified by affordpill.com
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {product.generic_name && (
                  <div className="flex p-3">
                    <div className="w-1/2 text-gray-500 text-xs">Generic Name</div>
                    <div className="w-1/2 font-medium text-xs">{product.generic_name}</div>
                  </div>
                )}

                {product.marketer?.name && (
                  <div className="flex p-3">
                    <div className="w-1/2 text-gray-500 text-xs">Marketer</div>
                    <div className="w-1/2 font-medium text-xs">{product.marketer.name}</div>
                  </div>
                )}

                {product.chemical_class?.name && (
                  <div className="flex p-3">
                    <div className="w-1/2 text-gray-500 text-xs">Chemical Class</div>
                    <div className="w-1/2 font-medium text-xs">{product.chemical_class.name}</div>
                  </div>
                )}

                {product.therapeutic_class?.name && (
                  <div className="flex p-3">
                    <div className="w-1/2 text-gray-500 text-xs">Therapeutic Class</div>
                    <div className="w-1/2 font-medium text-xs">{product.therapeutic_class.name}</div>
                  </div>
                )}

                {product.action_class?.name && (
                  <div className="flex p-3">
                    <div className="w-1/2 text-gray-500 text-xs">Action Class</div>
                    <div className="w-1/2 font-medium text-xs">{product.action_class.name}</div>
                  </div>
                )}

                {product.strength && (
                  <div className="flex p-3">
                    <div className="w-1/2 text-gray-500 text-xs">Strength</div>
                    <div className="w-1/2 font-medium text-xs">{product.strength}</div>
                  </div>
                )}

                {product.dosage_form && (
                  <div className="flex p-3">
                    <div className="w-1/2 text-gray-500 text-xs">Dosage Form</div>
                    <div className="w-1/2 font-medium text-xs capitalize">{product.dosage_form}</div>
                  </div>
                )}
              </div>
              <div className="p-3 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 mb-2">certified manufacturer</p>
                <div className="flex items-center space-x-3">
                  <img src="/images/certifications.png" alt="Certification logos" className="h-10 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Support */}
    <section className="py-6 md:py-12 max-w-6xl mx-auto px-2 sm:px-0">
      <h2 className="text-3xl font-bold text-center mb-10">Need help with an order or a general question?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-[0_0_0_0] md:shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
              <img src="/images/whatsapp.webp" alt="WhatsApp" className="w-6 h-6 object-contain" />
            </div>
            <h3 className="text-xl font-bold">Order on WhatsApp</h3>
          </div>

          <p className="text-gray-600 mb-6">Get quick responses via WhatsApp</p>

          <a
            href="https://wa.me/yournumber"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-white border border-gray-300 rounded-lg text-center font-medium hover:bg-gray-50 transition-colors"
          >
            Open WhatsApp
          </a>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 shadow-[0_0_0_0] md:shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-bold">Live chat with us</h3>
          </div>

          <p className="text-gray-600 mb-6">Chat with our support team</p>

          <button
            onClick={openCrispChat}
            className="block w-full py-3 bg-black text-white rounded-lg text-center font-medium hover:bg-gray-800 transition-colors"
          >
            Open Live Chat
          </button>
        </div>
      </div>
    </section>

    {hasUsageInfo() && (
      <section id="section-usage" className="py-4 md:py-8" tabIndex={-1} aria-labelledby="usage-heading">
        <div className="max-w-6xl mx-auto mt-8 w-full">
          <div className="relative overflow-hidden rounded-3xl w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0cc0df] to-[#ffde59] rounded-3xl"></div>

            <div className="relative m-[2px] bg-white rounded-3xl p-5 overflow-hidden">
              <div className="absolute top-0 right-8 w-[220px] hidden md:block">
                <img
                  src="/images/geometric-pattern.png"
                  alt="Geometric pattern"
                  className="w-full object-contain opacity-30"
                />
              </div>

              {/* Doctor  */}
              <div className="absolute bottom-0 right-0 w-[180px] md:w-[220px]">
                <img
                  src="/images/doctor-illustration.png"
                  alt="Doctor illustration"
                  className="w-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="max-w-full md:max-w-[70%]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/images/usage-icon.png" alt="Usage and Dosage" className="w-6 h-6 object-contain" />
                  </div>
                  <h2 id="usage-heading" className="text-3xl font-bold">
                    Usage and Dosage
                  </h2>
                </div>

                <div className="w-[300px] h-[10px] mb-4 bg-gradient-to-r from-emerald-300 to-transparent rounded-full"></div>

                <div className="mb-8 pr-[100px] md:pr-0">
                  {product.usage_instructions ? (
                    <div
                      className="text-sm text-[#333] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.usage_instructions || "") }}
                    />
                  ) : (
                    <p className="text-sm text-[#333] leading-relaxed">
                      Take this medicine in the dose and duration as advised by your doctor. Swallow it as a whole.
                      Do not chew, crush or break it. {product.name} may be taken with or without food, but it is
                      better to take it at a fixed time.
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-2 pr-[100px] md:pr-0">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] text-gray-700">
                    This information is for educational purposes only and should not replace professional medical
                    advice. Always consult your doctor or healthcare provider before taking any medication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}

    {hasSafetyInfo() && (
      <section id="section-safety" className="py-4 md:py-8" tabIndex={-1} aria-labelledby="safety-heading">
        <div className="max-w-6xl mx-auto mt-8 md:mt-16 w-full">
          <div className="mb-10">
            <h2 id="safety-heading" className="text-4xl font-bold text-[#333] mb-2">
              Safety Advise
            </h2>

            <img src="/images/underline-png.png" alt="Underline" className="w-[300px] h-auto mb-8" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Alcohol */}
            <div className="bg-white rounded-3xl shadow-md p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Alcohol</h3>
                <div className="w-20 h-20 flex items-center justify-center">
                  <img src="/images/alcohol-icon.png" alt="Alcohol" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#ffb3d9] to-[#fff5c0] text-sm py-1 px-4 rounded-full w-fit mb-4">
                {getSafetyStatus(safetyInfo.alcohol_advice)}
              </div>

              <div className="w-full mt-auto">
                <p className="text-sm">
                  {safetyInfo.alcohol_advice || "It is unsafe to consume alcohol with this medication."}
                </p>
              </div>
            </div>

            {/* Pregnancy */}
            <div className="bg-white rounded-3xl shadow-md p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Pregnancy</h3>
                <div className="w-20 h-20 flex items-center justify-center">
                  <img src="/images/pregnancy-icon.png" alt="Pregnancy" className="w-full h-full object-contain" />
                </div>
              </div>

              <div
                className={`bg-gradient-to-r ${getSafetyStatus(safetyInfo.pregnancy_advice) === "Safe"
                    ? "from-[#a8e0ec] to-[#fff5c0]"
                    : getSafetyStatus(safetyInfo.pregnancy_advice) === "Unsafe"
                      ? "from-[#ffb3a8] to-[#ffddc0]"
                      : "from-[#ffb3d9] to-[#fff5c0]"
                  } text-sm py-1 px-4 rounded-full w-fit mb-4`}
              >
                {getSafetyStatus(safetyInfo.pregnancy_advice)}
              </div>

              <div className="w-full mt-auto">
                <p className="text-sm">
                  {safetyInfo.pregnancy_advice ||
                    "Consult your doctor before using this medication during pregnancy."}
                </p>
              </div>
            </div>

            {/* Breastfeeding */}
            <div className="bg-white rounded-3xl shadow-md p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Breastfeeding</h3>
                <div className="w-20 h-20 flex items-center justify-center">
                  <img
                    src="/images/breastfeeding-icon.png"
                    alt="Breastfeeding"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div
                className={`bg-gradient-to-r ${getSafetyStatus(safetyInfo.breastfeeding_advice) === "Safe"
                    ? "from-[#a8e0ec] to-[#fff5c0]"
                    : getSafetyStatus(safetyInfo.breastfeeding_advice) === "Unsafe"
                      ? "from-[#ffb3a8] to-[#ffddc0]"
                      : "from-[#ffb3d9] to-[#fff5c0]"
                  } text-sm py-1 px-4 rounded-full w-fit mb-4`}
              >
                {getSafetyStatus(safetyInfo.breastfeeding_advice)}
              </div>

              <div className="w-full mt-auto">
                <p className="text-sm">
                  {safetyInfo.breastfeeding_advice ||
                    "Consult your doctor before using this medication while breastfeeding."}
                </p>
              </div>
            </div>

            {/* Driving */}
            <div className="bg-white rounded-3xl shadow-md p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Driving</h3>
                <div className="w-20 h-20 flex items-center justify-center">
                  <img src="/images/driving-icon.png" alt="Driving" className="w-full h-full object-contain" />
                </div>
              </div>

              <div
                className={`bg-gradient-to-r ${getSafetyStatus(safetyInfo.driving_advice) === "Safe"
                    ? "from-[#a8e0ec] to-[#fff5c0]"
                    : getSafetyStatus(safetyInfo.driving_advice) === "Unsafe"
                      ? "from-[#ffb3a8] to-[#ffddc0]"
                      : "from-[#ffb3d9] to-[#fff5c0]"
                  } text-sm py-1 px-4 rounded-full w-fit mb-4`}
              >
                {getSafetyStatus(safetyInfo.driving_advice)}
              </div>

              <div className="w-full mt-auto">
                <p className="text-sm">
                  {safetyInfo.driving_advice || "This medication may affect your ability to drive."}
                </p>
              </div>
            </div>

            {/* Kidney */}
            <div className="bg-white rounded-3xl shadow-md p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Kidney</h3>
                <div className="w-20 h-20 flex items-center justify-center">
                  <img src="/images/kidney-icon.png" alt="Kidney" className="w-full h-full object-contain" />
                </div>
              </div>

              <div
                className={`bg-gradient-to-r ${getSafetyStatus(safetyInfo.kidney_advice) === "Safe"
                    ? "from-[#a8e0ec] to-[#fff5c0]"
                    : getSafetyStatus(safetyInfo.kidney_advice) === "Unsafe"
                      ? "from-[#ffb3a8] to-[#ffddc0]"
                      : "from-[#ffb3d9] to-[#fff5c0]"
                  } text-sm py-1 px-4 rounded-full w-fit mb-4`}
              >
                {getSafetyStatus(safetyInfo.kidney_advice)}
              </div>

              <div className="w-full mt-auto">
                <p className="text-sm">
                  {safetyInfo.kidney_advice || "Consult your doctor if you have kidney problems."}
                </p>
              </div>
            </div>

            {/* Liver */}
            <div className="bg-white rounded-3xl shadow-md p-5 flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">Liver</h3>
                <div className="w-20 h-20 flex items-center justify-center">
                  <img src="/images/liver-icon.png" alt="Liver" className="w-full h-full object-contain" />
                </div>
              </div>

              <div
                className={`bg-gradient-to-r ${getSafetyStatus(safetyInfo.liver_advice) === "Safe"
                    ? "from-[#a8e0ec] to-[#fff5c0]"
                    : getSafetyStatus(safetyInfo.liver_advice) === "Unsafe"
                      ? "from-[#ffb3a8] to-[#ffddc0]"
                      : "from-[#ffb3d9] to-[#fff5c0]"
                  } text-sm py-1 px-4 rounded-full w-fit mb-4`}
              >
                {getSafetyStatus(safetyInfo.liver_advice)}
              </div>

              <div className="w-full mt-auto">
                <p className="text-sm">
                  {safetyInfo.liver_advice || "Consult your doctor if you have liver problems."}
                </p>
              </div>
            </div>
          </div>

          {/* Warning mesage */}
          <div className="flex items-start gap-3 mt-8">
            <AlertTriangle className="w-6 h-6 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              This information is for educational purposes only and should not replace professional medical advice.
              Always consult your doctor or healthcare provider before taking any medication.
            </p>
          </div>
        </div>
      </section>
    )}

    {/* Affordable Banner - Full  */}
    <div className="w-full mt-8 md:mt-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff66c4] to-[#ffde59] opacity-15"></div>

      <div className="absolute right-0 top-[-80px] bottom-0 hidden md:flex items-end z-10">
        <img
          src="/images/doctor-and-child.png"
          alt="Doctor with child patient"
          className="h-[300px] object-contain"
        />
      </div>

      <div className="relative py-6 px-4 md:px-8 w-full">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/5">
            <img
              src="/images/affordable-medicines-banner.png"
              alt="Affordable medicines for every family in India"
              className="w-full h-auto"
            />
          </div>

          <div className="hidden md:block md:w-2/5 md:h-[180px] relative"></div>
        </div>
      </div>
    </div>

    {hasSideEffectsInfo() && (
      <section
        id="section-side-effects"
        className="py-8 md:py-16"
        tabIndex={-1}
        aria-labelledby="side-effects-heading"
      >
        <div className="max-w-6xl mx-auto mt-8 md:mt-16 w-full">
          <div className="rounded-lg shadow-[0_0_0_0] md:shadow-sm w-full p-4 md:p-8 relative overflow-hidden">
            <div className="hidden md:block absolute right-[200px] bottom-0 z-0">
              <img src="/images/side-effects-lines.png" alt="Decorative lines" className="opacity-30 w-[250px]" />
            </div>

            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 flex-shrink-0">
                    <img
                      src="/images/side-effects-icon.png"
                      alt="Side Effects"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 id="side-effects-heading" className="text-2xl md:text-3xl font-bold text-black">
                      Possible Side Effects
                    </h2>
                    <img src="/images/possible-underline-png.png" alt="Underline" className="h-[10px] w-[300px] mt-2" />
                  </div>
                </div>

                <p className="text-sm md:text-base mb-6 text-gray-700 max-w-3xl">
                  Most side effects do not require any medical attention and disappear as your body adjusts to the
                  medicine. Consult your doctor if they persist or if you're worried about them.
                </p>

                <h2 className="text-lg font-medium mb-3">Common side effects of {product.name} -</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 max-w-3xl">
                  <ul className="list-disc pl-5 space-y-1.5">
                    {leftColumnEffects.map((effect, index) => (
                      <li key={`left-${index}`} className="text-base">
                        {effect}
                      </li>
                    ))}
                  </ul>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {rightColumnEffects.map((effect, index) => (
                      <li key={`right-${index}`} className="text-base">
                        {effect}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-2 mt-6 max-w-3xl">
                  <div className="mt-0.5 flex-shrink-0">
                    <AlertTriangle className="h-4 w-4 text-black" />
                  </div>
                  <p className="text-xs text-gray-700">
                    This information is for educational purposes only and should not replace professional medical
                    advice. Always consult your doctor or healthcare provider before taking any medication.
                  </p>
                </div>
              </div>

              <div className="md:w-[350px] relative z-20">
                <div
                  className="rounded-xl overflow-hidden border-[3px] border-transparent relative bg-white shadow-[0_0_0_0] md:shadow-sm"
                  style={{
                    backgroundImage: "linear-gradient(white, white), linear-gradient(to right, #ff8dc7, #ffd166)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "content-box, border-box",
                  }}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 bg-[#ffd166] rounded-md flex items-center justify-center">
                        <AlertTriangle className="h-3 w-3 text-black" />
                      </div>
                      <h2 className="text-lg font-bold">Medical Attention</h2>
                    </div>

                    <div className="bg-gradient-to-r from-[#fff] to-[#fff7ad] bg-opacity-30 py-2 px-3 -mx-5 mb-4">
                      <p className="text-xs">Important</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs mb-3 leading-relaxed">
                        Contact your doctor immediately if you experience any severe or unusual side effects,
                        especially:
                      </p>

                      <ul className="space-y-2.5">
                        {[
                          "Allergic reactions (rash, itching, swelling, severe dizziness, trouble breathing)",
                          "Persistent or severe chest pain",
                          "Unusual bleeding or bruising",
                          "Severe headache, confusion, or slurred speech",
                          "Severe stomach/abdominal pain",
                        ].map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ffd166] mt-1 flex-shrink-0"></div>
                            <span className="text-xs leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-[10px] text-gray-500 mb-1 font-medium">Important</p>
                      <p className="text-[10px] text-gray-700 mb-0.5">
                        This is not a complete list of possible side effects.
                      </p>
                      <p className="text-[10px] text-gray-700">
                        If you notice any other effects, contact your doctor or pharmacist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )}

    <div className="w-full mt-8 md:mt-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ffc107] to-[#FF5722] opacity-15"></div>

      <div className="absolute right-0 top-[-80px] bottom-0 hidden md:flex items-end z-10">
        <img
          src="/images/delivery-man.png"
          alt="Delivery person with package"
          className="h-[300px] object-contain"
        />
      </div>

      <div className="relative py-6 px-4 md:px-8 w-full">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/5">
            <img
              src="/images/free-delivery-banner.png"
              alt="Free delivery on orders above ₹500"
              className="w-full h-auto"
            />
          </div>

          <div className="hidden md:block md:w-2/5 md:h-[180px] relative"></div>
        </div>
      </div>
    </div>
  </div>
</div>  
  )
}
