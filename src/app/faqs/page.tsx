import { Metadata } from "next"
import FaqContent from "@/components/faq/faq-content"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | AffordPill",
  description: "Find answers to common questions about ordering medications, prescriptions, delivery, and more.",
}

export default function FaqPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find answers to common questions about our online pharmacy services
        </p>
      </div>
      <FaqContent />
    </div>
  )
}
