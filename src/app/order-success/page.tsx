"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Loader2, Package2, ShoppingBag } from "lucide-react"
import { createClient } from "@/utils/supabase/browser"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import toast from "react-hot-toast"

// date formatting
function formatDate(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount)
}

export default function OrderSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const [order, setOrder] = useState<any>(null)
  const [productImages, setProductImages] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!orderId) {
      router.push("/")
      return
    }

    async function fetchOrder() {
      try {
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select(`
            *,
            address:addresses(*),
            order_items:order_items(*)
          `)
          .eq("id", orderId)
          .single()

        if (orderError) {
          console.error("Error fetching order:", orderError)
          setError("Failed to load order details")
          toast.error("Failed to load order details")
          return
        }

        setOrder(orderData)

        if (orderData.order_items && orderData.order_items.length > 0) {
          const productIds = orderData.order_items.map((item: any) => item.product_id)

          const { data: productsData, error: productsError } = await supabase
            .from("products")
            .select(`
              id,
              product_images(image_url, is_primary)
            `)
            .in("id", productIds)

          if (!productsError && productsData) {
            const imageMap: Record<string, string> = {}

            productsData.forEach((product: any) => {
              const primaryImage = product.product_images?.find((img: any) => img.is_primary)
              const firstImage = product.product_images?.[0]

              imageMap[product.id] = primaryImage?.image_url || firstImage?.image_url || "/placeholder.svg"
            })

            setProductImages(imageMap)
          }
        }
      } catch (error) {
        console.error("Error in fetch order:", error)
        setError("An unexpected error occurred")
        toast.error("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, router, supabase])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground mb-6">{error || "Order not found"}</p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We've received your order and will begin processing it soon.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between mb-6">
              <div>
                <h2 className="font-semibold text-lg">Order #{order.order_number}</h2>
                <p className="text-sm text-muted-foreground">Placed on {formatDate(order.created_at)}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <div className="text-sm">
                  <p>{order.address.address_line1}</p>
                  {order.address.address_line2 && <p>{order.address.address_line2}</p>}
                  <p>
                    {order.address.city}, {order.address.state} {order.address.pincode}
                  </p>
                  <p>{order.address.country}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Payment Information</h3>
                <div className="text-sm">
                  <p>Method: {order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
                  <p>Status: {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}</p>
                  <p>Total: {formatCurrency(order.total)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* show order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.order_items &&
                order.order_items.map((item: any) => (
                  <div key={item.id} className="flex items-start gap-4 py-3">
                    <div className="h-16 w-16 rounded-md bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <Image
                        src={productImages[item.product_id] || "/placeholder.svg"}
                        alt={item.product_name}
                        width={64}
                        height={64}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm md:text-base truncate">{item.product_name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × {formatCurrency(item.unit_price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(item.total_price)}</p>
                    </div>
                  </div>
                ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>{formatCurrency(order.delivery_fee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link href="/account/orders">
              <Package2 className="mr-2 h-4 w-4" />
              View All Orders
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

