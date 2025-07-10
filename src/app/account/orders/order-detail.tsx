"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/utils/supabase/browser"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Loader2, X } from "lucide-react"
import toast from "react-hot-toast"

// formatting
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount)
}

// formatter fun
function formatDate(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export default function OrderDetail({
  orderId,
  isOpen,
  onClose,
}: {
  orderId: string | null
  isOpen: boolean
  onClose: () => void
}) {
  const [order, setOrder] = useState<any>(null)
  const [productImages, setProductImages] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!orderId || !isOpen) return

    async function fetchOrderDetails() {
      setLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from("orders")
          .select(`
            *,
            address:addresses(*),
            order_items:order_items(*)
          `)
          .eq("id", orderId)
          .single()

        if (error) {
          console.error("Error fetching order details:", error)
          setError("Failed to load order details")
          toast.error("Failed to load order details")
          return
        }

        setOrder(data)

        // order items product images
        if (data.order_items && data.order_items.length > 0) {
          const productIds = data.order_items.map((item: any) => item.product_id)

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
              // look for primary image
              const primaryImage = product.product_images?.find((img: any) => img.is_primary)
              const firstImage = product.product_images?.[0]

              imageMap[product.id] = primaryImage?.image_url || firstImage?.image_url || "/placeholder.svg"
            })

            setProductImages(imageMap)
          }
        }
      } catch (error) {
        console.error("Error in fetch order details:", error)
        setError("An unexpected error occurred")
        toast.error("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [orderId, isOpen, supabase])

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          {order && (
            <DialogDescription>
              Order #{order.order_number} • {formatDate(order.created_at)}
            </DialogDescription>
          )}
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <X className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : order ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
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
                <h3 className="font-medium mb-2">Order Information</h3>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span>{order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status:</span>
                    <span>{order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="flex gap-3 py-2 border-b last:border-0">
                    <div className="h-14 w-14 bg-muted rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <Image
                        src={productImages[item.product_id] || "/placeholder.svg"}
                        alt={item.product_name}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.product_name}</h4>
                      <div className="flex justify-between mt-1">
                        <div className="text-xs text-muted-foreground">
                          Qty: {item.quantity} × {formatCurrency(item.unit_price)}
                        </div>
                        <div className="font-medium text-sm">{formatCurrency(item.total_price)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

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
          </div>
        ) : null}

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
          {order && (
            <Button variant="outline" asChild>
              <Link href={`/order-success?id=${order.id}`} target="_blank">
                View Full Page
              </Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

