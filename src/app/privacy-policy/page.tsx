import type { Metadata } from "next"
import PrivacyPolicyClientPage from "./PrivacyPolicyClientPage"

export const metadata: Metadata = {
  title: "Privacy Policy | AffordPill",
  description: "Learn how AffordPill collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full">
      <PrivacyPolicyClientPage />
    </div>
  )
}

