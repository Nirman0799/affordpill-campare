"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

const faqData = {
  general: [
    {
      question: "What is AffordPill?",
      answer: "AffordPill is an online pharmacy platform that provides affordable medications with convenient home delivery. We offer a wide range of prescription and over-the-counter medications at competitive prices."
    },
    {
      question: "Is AffordPill a licensed pharmacy?",
      answer: "Yes, AffordPill is a fully licensed and registered online pharmacy. We comply with all regulatory requirements and maintain the highest standards of pharmaceutical care."
    },
    {
      question: "How do I create an account?",
      answer: "Creating an account is simple. Click on the 'Sign Up' button in the top right corner of our website, fill in your details, verify your email address, and you're ready to start shopping for medications."
    },
    {
      question: "What are your operating hours?",
      answer: "Our website is available 24/7 for browsing and placing orders. Our customer service team is available Monday through Saturday from 9:00 AM to 8:00 PM and Sunday from 10:00 AM to 6:00 PM."
    }
  ],
  ordering: [
    {
      question: "How do I place an order?",
      answer: "To place an order, search for your medication, add it to your cart, and proceed to checkout. You'll need to provide your delivery address, payment information, and prescription (if required)."
    },
    {
      question: "Do I need a prescription to order medications?",
      answer: "Prescription medications require a valid prescription from a licensed healthcare provider. You can upload your prescription during the checkout process. Over-the-counter medications can be purchased without a prescription."
    },
    {
      question: "Can I order medications for someone else?",
      answer: "Yes, you can order medications for family members or others under your care. However, for prescription medications, you'll need to provide a valid prescription in their name."
    },
    {
      question: "How can I check the status of my order?",
      answer: "You can track your order status by logging into your account and visiting the 'My Orders' section. You'll also receive email and SMS updates about your order status."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "You can modify or cancel your order before it's processed. Once an order is processed, it cannot be modified. For cancellations after processing, please contact our customer service team."
    }
  ],
  prescriptions: [
    {
      question: "How do I upload my prescription?",
      answer: "You can upload your prescription during the checkout process. Simply take a clear photo or scan of your prescription and upload it through our secure system. You can also upload prescriptions to your account for future use."
    },
    {
      question: "What prescription formats do you accept?",
      answer: "We accept prescriptions in JPG, PNG, and PDF formats. The prescription must be clearly legible and include all required information such as doctor's details, patient information, medication name, dosage, and validity date."
    },
    {
      question: "How long are prescriptions valid?",
      answer: "Prescription validity depends on the medication and your doctor's instructions. Generally, most prescriptions are valid for 6-12 months from the date of issue. We cannot process expired prescriptions."
    },
    {
      question: "Can I use the same prescription multiple times?",
      answer: "This depends on whether your doctor has prescribed refills. If refills are authorized, you can use the same prescription until the refills are exhausted or the prescription expires, whichever comes first."
    }
  ],
  delivery: [
    {
      question: "What areas do you deliver to?",
      answer: "We currently deliver to most major cities and surrounding areas. You can check if we deliver to your area by entering your pincode on our website."
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery times vary based on your location. In most major cities, we offer next-day delivery. For other areas, delivery typically takes 2-4 business days. You can check the estimated delivery time by entering your pincode."
    },
    {
      question: "Is there a minimum order value for free delivery?",
      answer: "Yes, orders above ₹500 qualify for free delivery. For orders below this amount, a nominal delivery fee will be applied at checkout."
    },
    {
      question: "How are medications packaged for delivery?",
      answer: "All medications are packaged in discreet, tamper-evident packaging that protects the integrity of the products. Temperature-sensitive medications are shipped with appropriate cooling materials when necessary."
    },
    {
      question: "What if I'm not available to receive my order?",
      answer: "If you're not available, our delivery partner will attempt delivery again the next day. You can also authorize someone else to receive the package on your behalf or request delivery at a specific time."
    }
  ],
  payment: [
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, net banking, UPI, mobile wallets, and cash on delivery (for orders under ₹5000)."
    },
    {
      question: "Is online payment secure?",
      answer: "Yes, all online payments are processed through Razorpay, a secure payment gateway that uses industry-standard encryption to protect your financial information."
    },
    {
      question: "Do you offer cash on delivery?",
      answer: "Yes, we offer cash on delivery for orders under ₹5000. This option is available in most delivery areas but may be restricted for certain high-value medications."
    },
    {
      question: "Can I use health insurance to pay for medications?",
      answer: "Currently, we don't process insurance claims directly. However, we provide detailed invoices that you can submit to your insurance provider for reimbursement as per your policy terms."
    }
  ],
  returns: [
    {
      question: "What is your return policy?",
      answer: "Due to the nature of pharmaceutical products, we have a limited return policy. We accept returns only if the product is damaged, incorrect, or expired at the time of delivery. Returns must be initiated within 48 hours of delivery."
    },
    {
      question: "How do I return a product?",
      answer: "To return a product, contact our customer service team within 48 hours of delivery. They will guide you through the return process and arrange for pickup if the return is approved."
    },
    {
      question: "When will I receive my refund?",
      answer: "Once your return is received and inspected, we will process your refund. The amount will be credited back to your original payment method within 5-7 business days."
    },
    {
      question: "Can I exchange a medication instead of returning it?",
      answer: "Exchanges are only possible if we delivered an incorrect medication. In such cases, we will arrange for pickup of the incorrect item and delivery of the correct medication at no additional cost."
    }
  ],
  account: [
    {
      question: "How do I update my personal information?",
      answer: "You can update your personal information by logging into your account and navigating to the 'Account Settings' section. Here you can modify your name, contact details, and other information."
    },
    {
      question: "Can I add multiple delivery addresses to my account?",
      answer: "Yes, you can save multiple delivery addresses in your account. During checkout, you can select which address you want your order delivered to."
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you a password reset link."
    },
    {
      question: "How can I view my order history?",
      answer: "Your complete order history is available in the 'My Orders' section of your account. Here you can view details of all past and current orders."
    }
  ]
}

export default function FaqContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("general")
  
  const getFilteredFaqs = () => {
    if (!searchQuery.trim()) {
      return faqData[activeTab as keyof typeof faqData]
    }
    
    const query = searchQuery.toLowerCase()
    const allFaqs = Object.values(faqData).flat()
    
    return allFaqs.filter(
      faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
    )
  }
  
  const filteredFaqs = getFilteredFaqs()
  
  return (
    <div className="mt-12">
      <div className="relative mx-auto mb-8 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search FAQs..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {searchQuery ? (
        <div className="mx-auto mt-8 max-w-3xl">
          <h2 className="mb-4 text-xl font-semibold">Search Results</h2>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`search-item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground">
              No FAQs found matching your search. Please try different keywords.
            </p>
          )}
        </div>
      ) : (
        <Tabs 
          defaultValue="general" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="mx-auto max-w-3xl"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ordering">Ordering</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          {Object.entries(faqData).map(([category, faqs]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      )}
      
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold">Still have questions?</h3>
        <p className="mt-2 text-muted-foreground">
          Our customer support team is here to help you
        </p>
        <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a 
            href="/contact" 
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Contact Us
          </a>
          <a 
            href="tel:+919266576156" 
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Call Us
          </a>
        </div>
      </div>
    </div>
  )
}
