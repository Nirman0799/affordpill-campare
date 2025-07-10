import type React from "react"
import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, TruckIcon, RotateCcw, ShieldAlert, Phone, CreditCard, Wallet, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Return & Refund Policy | AffordPill",
  description: "Return and refund policy for AffordPill online pharmacy including Razorpay payment information",
}

export default function ReturnRefundPolicyPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 md:px-6 mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Return & Refund Policy</h1>
        <p className="text-muted-foreground">Last updated on Apr 4, 2025</p>
      </div>

      <div className="grid gap-8">
        <PolicySection
          icon={<ShieldAlert className="h-6 w-6" />}
          title="Our Commitment"
          content={
            <div className="space-y-4">
              <p>
                AFFORD PILL.COM believes in helping its customers as far as possible, and has therefore a liberal
                cancellation policy. We strive to ensure customer satisfaction with every order.
              </p>
              <p>
                For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page
                shall mean AFFORD PILL.COM, whose registered/operational office is Plot. No. D-67, Sector-6, Noida, Uttar Pradesh-201301. "you", "your", "user",
                "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase
                from us.
              </p>
            </div>
          }
        />

        <PolicySection
          icon={<Clock className="h-6 w-6" />}
          title="Cancellation Policy"
          content={
            <div className="space-y-4">
              <p>
                Cancellations will be considered only if the request is made within 48 hours (2 days) of placing the order.
                However, the cancellation request may not be entertained if the orders have been communicated to the
                vendors/merchants and they have initiated the process of shipping them.
              </p>
              <p>
                To request a cancellation, please contact our Customer Service team through email or phone with your order number 
                and reason for cancellation. Our team will review your request and confirm the cancellation status within 24 hours.
              </p>
              <p>
                For orders placed using prescription medicines, additional verification may be needed before the cancellation
                is approved, as per regulatory requirements.
              </p>
            </div>
          }
        />

        <PolicySection
          icon={<CreditCard className="h-6 w-6" />}
          title="Payment & Refund Policy"
          content={
            <div className="space-y-4">
              <p>
                We process payments through Razorpay, our authorized payment service provider. All payment information is 
                encrypted and securely processed in compliance with industry standards.
              </p>
              <p>
                In case of approved returns or cancellations, we will initiate a refund according to the following guidelines:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Credit/Debit Card Payments:</span> Refunds will be processed to the original 
                  payment method within 5-7 business days. The actual credit to your account may take an additional 2-7 business 
                  days depending on your bank's policies.
                </li>
                <li>
                  <span className="font-medium">UPI Payments:</span> Refunds will be processed back to the UPI ID used for the 
                  payment within 1-3 business days.
                </li>
                <li>
                  <span className="font-medium">Net Banking:</span> Refunds will be processed to your bank account within 3-5 
                  business days.
                </li>
                <li>
                  <span className="font-medium">Wallet Payments:</span> Refunds will be processed back to your wallet within 
                  1-2 business days.
                </li>
              </ul>
              <p>
                Please note that while we initiate refunds promptly, the actual credit to your account depends on various 
                factors including your payment method and financial institution's processing timelines.
              </p>
              <p className="text-sm text-muted-foreground">
                For payment disputes or transaction failures, please contact our customer service team within 48 hours of 
                the transaction with relevant details.
              </p>
            </div>
          }
        />

        <PolicySection
          icon={<RotateCcw className="h-6 w-6" />}
          title="Return & Replacement Process"
          content={
            <div className="space-y-4">
              <p>
                In case of receipt of damaged or defective items please report the same to our Customer Service team within 
                48 hours (2 days) of receiving the product. The request will be reviewed after the merchant has verified the 
                condition of the product.
              </p>
              <p>
                For return requests, please follow these steps:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Contact our Customer Service team with your order details and reason for return</li>
                <li>Once approved, you will receive return instructions via email</li>
                <li>Pack the items in their original packaging along with all accessories</li>
                <li>Our logistics partner will collect the package from your address</li>
                <li>After inspection, the refund will be processed as per our refund policy</li>
              </ol>
              <p>
                Please note the following restrictions on returns:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Medicines that require refrigeration cannot be returned once delivered</li>
                <li>Opened or used products cannot be returned unless they are defective</li>
                <li>Prescription medicines cannot be returned unless damaged during transit or incorrectly dispatched</li>
                <li>Products that come with a warranty from manufacturers should be referred to them for any functional issues</li>
              </ul>
              <p>
                For issues related to incorrect delivery or missing items, please contact our Customer Service team within 48 hours of delivery.
              </p>
            </div>
          }
        />

        <PolicySection
          icon={<Wallet className="h-6 w-6" />}
          title="Refund Processing"
          content={
            <div className="space-y-4">
              <p>
                Once a return is received and inspected, we will process your refund based on the following guidelines:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Full Refund:</span> Issued for incorrect items, damaged products during 
                  transit, or quality issues verified by our team
                </li>
                <li>
                  <span className="font-medium">Partial Refund:</span> May be issued for orders where only some items 
                  qualify for return or if promotional discounts were applied
                </li>
              </ul>
              <p>
                Refund amount will include the product price and applicable taxes. Shipping charges are non-refundable 
                unless the return is due to our error.
              </p>
              <p>
                For orders paid through Razorpay, refunds will be processed through the Razorpay payment gateway back to the 
                original payment method. You will receive a confirmation email once the refund is initiated, along with a 
                unique reference ID for tracking purposes.
              </p>
              <p className="text-sm bg-muted p-3 rounded">
                <AlertTriangle className="h-4 w-4 inline-block mr-1" />
                Please note: For Cash on Delivery (COD) orders, refunds will be processed via bank transfer and will 
                require your bank account details. This process may take 7-10 business days to complete.
              </p>
            </div>
          }
        />

        <PolicySection
          icon={<TruckIcon className="h-6 w-6" />}
          title="Shipping Policy"
          content={
            <div className="space-y-4">
              <p>
                For International buyers, orders are shipped and delivered through registered international courier
                companies and/or International speed post only. For domestic buyers, orders are shipped through
                registered domestic courier companies and/or speed post only.
              </p>
              <p>
                Orders are shipped within 0-7 days or as per the delivery date agreed at the time of order confirmation
                and delivering of the shipment subject to Courier Company / post office norms. AFFORD PILL.COM is not
                liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand
                over the consignment to the courier company or postal authorities within 0-7 days from the date of the
                order and payment or as per the delivery date agreed at the time of order confirmation.
              </p>
              <p>
                Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be
                confirmed on your mail ID as specified during registration.
              </p>
            </div>
          }
        />

        <PolicySection
          icon={<Phone className="h-6 w-6" />}
          title="Contact Us"
          content={
            <div className="space-y-4">
              <p>For any issues related to orders, returns, refunds or payments, you may contact us using the information below:</p>
              <div className="grid gap-2">
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium">Merchant Legal entity name:</span>
                  <span>AFFORD PILL.COM</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium">Address:</span>
                  <span>
                  Plot. No. D-67, Sector-6, Noida, Uttar Pradesh-201301
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium">Telephone:</span>
                  <span>9266576156</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium">Email:</span>
                  <span>support@affordpill.com</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <span className="font-medium">Customer Service Hours:</span>
                  <span>Monday to Saturday (10:00 AM to 7:00 PM)</span>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  )
}

function PolicySection({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode
  title: string
  content: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">{icon}</div>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <Separator className="mb-4" />
        {content}
      </CardContent>
    </Card>
  )
}