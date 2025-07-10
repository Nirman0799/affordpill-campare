"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, AlertCircle, PlusCircle } from "lucide-react"
import { createClient } from "@/utils/supabase/browser"
import toast from "react-hot-toast"


declare global {
  interface Window {
    Razorpay: any
  }
}

interface PaymentComponentProps {
  userId: string
  amount: number
  currency?: string
  onSuccess?: (paymentData: any) => void
  onError?: (error: any) => void
  getOrderId?: () => Promise<string | null>
}

export default function PaymentComponent({
  userId,
  amount,
  currency = "INR",
  onSuccess,
  onError,
  getOrderId,
}: PaymentComponentProps) {
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const loadScript = async () => {
      try {
        if (window.Razorpay) {
          console.log("Razorpay already loaded")
          setScriptLoaded(true)
          return
        }

        console.log("Loading Razorpay script...")

        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true

        script.onload = () => {
          console.log("Razorpay script loaded successfully")
          setScriptLoaded(true)
        }

        script.onerror = (error) => {
          console.error(`Error loading Razorpay script: ${error}`)
          toast.error("Failed to load payment gateway")
        }

        document.body.appendChild(script)
      } catch (error) {
        console.error(`Error in loadScript: ${error}`)
      }
    }

    loadScript()
  }, [])

  const handlePayment = async () => {
    try {
      setLoading(true)
      setPaymentStatus("idle")
      setPaymentDetails(null)

      if (!window.Razorpay) {
        console.log("Razorpay not loaded")
        toast.error("Payment gateway not loaded. Please refresh the page.")
        setLoading(false)
        return
      }

      console.log("Creating order via API route...")

      // Create order in database - getOrderId 
      let orderId = null
      if (getOrderId) {
        orderId = await getOrderId()
        if (!orderId) {
          console.log("Failed to create order in database")
          setLoading(false)
          return
        }
        console.log(`Order created in database with ID: ${orderId}`)
      }

      const receiptNumber = orderId || `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`

      console.log("Getting authentication session...")
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        console.log("No authentication session found")
        toast.error("Authentication error. Please log in again.")
        setLoading(false)
        return
      }

      console.log(`Session found, user ID: ${session.user.id}`)
      console.log(`Amount: ${amount}, Currency: ${currency}`)

      const response = await fetch(`/api/razorpay/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // convert to paise
          currency,
          receipt: receiptNumber,
          notes: {
            order_id: orderId,
            user_id: userId,
          },
        }),
      })

      const responseText = await response.text()
      console.log(`Raw API response: ${responseText}`)

      let result
      try {
        result = JSON.parse(responseText)
        console.log(`Parsed order result: ${JSON.stringify(result)}`)
      } catch (parseError) {
        console.error(`Failed to parse response as JSON: ${parseError}`)
        throw new Error(`Invalid response format: ${responseText}`)
      }

      if (!response.ok) {
        console.error(`Response not OK: ${response.status} ${response.statusText}`)
        throw new Error(`Failed to create order: ${responseText}`)
      }

      if (!result.success || !result.order) {
        console.error(`Invalid order result: ${JSON.stringify(result)}`)
        throw new Error(result.error || "Failed to create order")
      }

      console.log(`Order created successfully: ${result.order.id}`)

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: result.order.amount,
        currency: result.order.currency,
        name: "AffordPill",
        description: "Payment for your order",
        image: "/favicon.ico", // change logo if required
        order_id: result.order.id,
        handler: (response: any) => {
          console.log(`Payment successful: ${JSON.stringify(response)}`)
          verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature, orderId)
        },
        prefill: {
          name: session.user.user_metadata?.full_name || "",
          email: session.user.email || "",
          contact: session.user.user_metadata?.phone || "",
        },
        notes: {
          order_id: orderId,
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: () => {
            console.log("Payment modal dismissed")
            setLoading(false)
          },
        },
      }

      console.log(
        `Initializing Razorpay with options: ${JSON.stringify({
          ...options,
          key: options.key ? "PRESENT" : "MISSING",
        })}`,
      )

      const razorpay = new window.Razorpay(options)

      razorpay.on("payment.failed", (response: any) => {
        console.error(`Payment failed: ${JSON.stringify(response.error)}`)
        setPaymentStatus("error")
        setLoading(false)
        toast.error(`Payment failed: ${response.error.description}`)
        if (onError) onError(response.error)
      })

      console.log("Opening Razorpay payment form...")
      razorpay.open()
    } catch (error) {
      console.error(`Payment initiation error: ${error}`)
      setPaymentStatus("error")
      setLoading(false)
      toast.error("Failed to initiate payment: " + (error instanceof Error ? error.message : "Unknown error"))
      if (onError) onError(error)
    }
  }

  const verifyPayment = async (
    paymentId: string,
    razorpayOrderId: string,
    signature: string,
    orderId?: string | null,
  ) => {
    try {
      console.log("Verifying payment...")

      const verifyResponse = await fetch(`/api/razorpay/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentId,
          razorpay_order_id: razorpayOrderId,
          razorpay_signature: signature,
          order_id: orderId,
        }),
      })

      const verifyResponseText = await verifyResponse.text()
      console.log(`Raw verification response: ${verifyResponseText}`)

      let verifyResult
      try {
        verifyResult = JSON.parse(verifyResponseText)
        console.log(`Parsed verification result: ${JSON.stringify(verifyResult)}`)
      } catch (e) {
        console.error(`Failed to parse verification response: ${e}`)
        throw new Error(`Invalid verification response: ${verifyResponseText}`)
      }

      if (verifyResult.success) {
        setPaymentStatus("success")
        setPaymentDetails({
          orderId: razorpayOrderId,
          paymentId: paymentId,
          orderNumber: orderId,
        })
        toast.success("Payment successful!")

        // call onSuccess with required data
        if (onSuccess) {
          console.log(`Calling onSuccess with orderId: ${orderId}`)
          onSuccess({
            paymentId,
            orderId: orderId, // Pass the db orderID
            razorpayOrderId,
            signature,
          })
        } else {
          console.log("No onSuccess callback provided")
        }
      } else {
        setPaymentStatus("error")
        toast.error("Payment verification failed")
        if (onError) onError(new Error("Payment verification failed"))
      }
    } catch (error) {
      console.error(`Payment verification error: ${error}`)
      setPaymentStatus("error")
      toast.error("Payment verification failed")
      if (onError) onError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={handlePayment} disabled={loading || !scriptLoaded} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <PlusCircle className="mr-2 h-4 w-4" />
            Pay {currency} {amount.toFixed(2)}
          </>
        )}
      </Button>

      {paymentStatus === "success" && (
        <div className="bg-green-50 p-4 rounded-md flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800">Payment Successful</h3>
            <p className="text-sm text-green-700 mt-1">Your payment was processed successfully.</p>
            {paymentDetails && (
              <div className="mt-2 text-xs text-green-700 space-y-1">
                <p>Payment ID: {paymentDetails.paymentId}</p>
                <p>Order ID: {paymentDetails.orderId}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {paymentStatus === "error" && (
        <div className="bg-red-50 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">Payment Failed</h3>
            <p className="text-sm text-red-700 mt-1">There was an issue processing your payment. Please try again.</p>
          </div>
        </div>
      )}
    </div>
  )
}

