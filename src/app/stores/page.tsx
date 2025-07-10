import type { Metadata } from "next"
import StoreLocator from "./store-locator"

export const metadata: Metadata = {
  title: "Store Locator | Affordpill",
  description: "Find Affordpill stores near you in Delhi, Noida and surrounding areas",
}

export default function StoreLocatorPage() {
  return (
    <div className="py-8">
   
      <StoreLocator />
    </div>
  )
}

