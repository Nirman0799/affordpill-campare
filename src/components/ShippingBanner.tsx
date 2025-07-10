"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { Banner } from "@/components/ui/banner"

export function ShippingBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const bannerDismissed = sessionStorage.getItem("shipping-banner-dismissed")
    if (bannerDismissed === "true") {
      setIsVisible(false)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem("shipping-banner-dismissed", "true")
  }

  if (!isVisible) return null

  return (
    <Banner
      message="✨ Free shipping on orders above ₹500"
      href="/products"
      onClose={handleClose}
    />
  )
}

