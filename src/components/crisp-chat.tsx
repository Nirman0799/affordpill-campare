"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    $crisp: any[]
    CRISP_WEBSITE_ID: string
  }
}

export default function CrispChat() {
  useEffect(() => {
    // Initialize Crisp
    window.$crisp = []
    window.CRISP_WEBSITE_ID = "4781b0e3-ed91-4cbf-b5cf-5c2fc3754ca9"

    // Load Crisp 
    const script = document.createElement("script")
    script.src = "https://client.crisp.chat/l.js"
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Clean up when component unmounts
      document.head.removeChild(script)
    }
  }, [])

  return null
}

