"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createOrder } from "./actions"
import AddressSelector from "./address-selector"
import OrderSummary from "./order-summary"
import PaymentMethodSelector from "./payment-method-selector"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { createClient } from "@/utils/supabase/browser"
import { Loader2 } from "lucide-react"

declare global {
  interface Window {
    Razorpay: any
  }
}

type CheckoutFormProps = {
  addresses: any[]
  cartItems: any[]
  subtotal: number
  deliveryFee: number
  total: number
  userId: string
}

export default function CheckoutForm({
  addresses,
  cartItems,
  subtotal,
  deliveryFee,
  total,
  userId,
}: CheckoutFormProps) {
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses.find((addr) => addr.is_default)?.id || addresses[0]?.id || "",
  )
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Load Razorpay
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
          console.error("Error loading Razorpay script:", error)
          toast.error("Failed to load payment gateway")
        }

        document.body.appendChild(script)
      } catch (error) {
        console.error("Error in loadScript:", error)
      }
    }

    loadScript()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedAddressId) {
      toast.error("Please select a delivery address")
      return
    }

    setIsSubmitting(true)

    try {
      if (paymentMethod === "online") {
        await handleRazorpayPayment()
      } else {
        await handleCashOnDelivery()
      }
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error("An unexpected error occurred. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleCashOnDelivery = async () => {
    try {
      const orderData = {
        userId,
        addressId: selectedAddressId,
        cartItems,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: "cod",
      }

      console.log("Creating COD order...")

      const result = await createOrder(orderData)

      if (result.success) {
        router.push(`/order-success?id=${result.orderId}`)
      } else {
        toast.error(result.error || "Failed to create your order. Please try again.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("COD order error:", error)
      toast.error("Failed to create your order. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleRazorpayPayment = async () => {
    try {
      if (!window.Razorpay) {
        console.error("Razorpay not loaded")
        toast.error("Payment gateway not loaded. Please refresh the page.")
        setIsSubmitting(false)
        return
      }

      const orderData = {
        userId,
        addressId: selectedAddressId,
        cartItems,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: "online",
      }

      console.log("Creating order for online payment...")

      const result = await createOrder(orderData)

      if (!result.success) {
        toast.error(result.error || "Failed to create your order. Please try again.")
        setIsSubmitting(false)
        return
      }

      console.log("Order created successfully:", result)

      // get session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        toast.error("Authentication error. Please try again or log in again.")
        setIsSubmitting(false)
        return
      }

      // razorpay edge function
      console.log("Creating Razorpay order...")

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-razorpay-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          amount: Math.round(total * 100), // convert to paise 
          currency: "INR",
          receipt: result.orderNumber,
          notes: {
            order_number: result.orderNumber,
            order_id: result.orderId,
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Edge function error:", response.status, errorText)
        throw new Error(`Failed to create Razorpay order: ${errorText}`)
      }

      const razorpayResult = await response.json()
      console.log("Razorpay order created:", razorpayResult)

      if (!razorpayResult.success || !razorpayResult.order) {
        console.error("Invalid order result:", razorpayResult)
        throw new Error(razorpayResult.error || "Failed to create payment order")
      }

      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayResult.order.amount,
        currency: razorpayResult.order.currency,
        name: "AffordPill",
        description: "Purchase from AffordPill",
        image: "/favicon.ico", // change logo if required
        order_id: razorpayResult.order.id,
        handler: (response: any) => {
          console.log("Payment successful:", response)
          verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature,
            result.orderNumber,
            result.orderId,
          )
        },
        prefill: {
          name: "Customer",
          email: "",
          contact: "",
        },
        notes: {
          order_number: result.orderNumber,
          order_id: result.orderId,
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: () => {
            console.log("Payment modal dismissed")
            setIsSubmitting(false)
          },
        },
      }

      console.log("Initializing Razorpay with options:", options)

      const razorpay = new window.Razorpay(options)

      // handle  failures
      razorpay.on("payment.failed", (response: any) => {
        console.log("Payment failed:", response.error)
        toast.error(`Payment failed: ${response.error.description}`)
        setIsSubmitting(false)
      })

      console.log("Opening Razorpay payment form...")
      razorpay.open()
    } catch (error) {
      console.error("Payment initiation error:", error)
      toast.error("Failed to initiate payment: " + (error instanceof Error ? error.message : "Unknown error"))
      setIsSubmitting(false)
    }
  }

  const verifyPayment = async (
    paymentId: string,
    razorpayOrderId: string,
    signature: string,
    orderNumber: string,
    orderId: string,
  ) => {
    try {
      console.log("Verifying payment...")

      const verifyResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/verify-razorpay-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            razorpay_payment_id: paymentId,
            razorpay_order_id: razorpayOrderId,
            razorpay_signature: signature,
            notes: {
              order_number: orderNumber,
              order_id: orderId,
            },
          }),
        },
      )

      const verifyResult = await verifyResponse.json()
      console.log("Payment verification result:", verifyResult)

      if (verifyResult.success) {
        router.push(`/order-success?id=${orderId}`)
      } else {
        toast.error("Payment verification failed. Please contact support.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Payment verification error:", error)
      toast.error("Payment verification failed. Please contact support.")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-8">
        <AddressSelector
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          setSelectedAddressId={setSelectedAddressId}
        />

        <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      </div>

      <div className="md:col-span-1">
        <OrderSummary cartItems={cartItems} subtotal={subtotal} deliveryFee={deliveryFee} total={total} />

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={isSubmitting || !selectedAddressId || (paymentMethod === "online" && !scriptLoaded)}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Place Order (${paymentMethod === "cod" ? "Cash on Delivery" : "Pay Online"})`
          )}
        </Button>

        {paymentMethod === "online" && (
          <div className="mt-2 text-xs text-center">
            <p>{scriptLoaded ? "Payment gateway ready ✅" : "Loading payment gateway... ⏳"}</p>
            <p className="mt-1">
              Key ID: {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? "Configured ✅" : "Not configured ❌"}
            </p>
          </div>
        )}
      </div>
    </form>
  )
}

