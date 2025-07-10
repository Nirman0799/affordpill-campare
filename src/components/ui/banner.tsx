"use client"

import type * as React from "react"
import { ArrowRight, X } from "lucide-react"
import Link from "next/link"

interface BannerProps {
  message: React.ReactNode
  href?: string
  icon?: React.ReactNode
  onClose?: () => void
}

export function Banner({ message, href, icon, onClose }: BannerProps) {
  return (
    <div className="relative w-full bg-black py-3 px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-white">
        {icon && <span>{icon}</span>}
        <span className="text-sm font-medium">{message}</span>
        {href && (
          <Link href={href} className="inline-flex items-center">
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Close banner"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

