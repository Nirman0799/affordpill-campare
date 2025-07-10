import type { Metadata } from "next"
import TermsAndConditionsClientPage from "./TermsAndConditionsClientPage"

export const metadata: Metadata = {
  title: "Terms and Conditions | AffordPill",
  description: "Legal terms and conditions for using the AffordPill online pharmacy platform.",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full">
      <TermsAndConditionsClientPage />
    </div>
  )
}

