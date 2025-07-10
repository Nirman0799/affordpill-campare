import type { Metadata } from "next"
import { HomepageContent } from "@/components/home/homepage-content"

export const metadata: Metadata = {
  title: "AffordPill | Online Pharmacy & Healthcare",
  description: "Order affordable medications online with fast delivery.",
}

export default function HomePage() {
  return (
    <div className="pb-16">
      <HomepageContent />
    </div>
  )
}

