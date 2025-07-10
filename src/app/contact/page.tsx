import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | AffordPill",
  description: "Get in touch with AffordPill for any queries about medications, orders, or services.",
}

export default function ContactPage() {
  return <ContactPageClient />
}

