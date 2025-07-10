"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type OrderSummaryProps = {
  cartItems: any[]
  subtotal: number
  deliveryFee: number
  total: number
}

export default function OrderSummary({ cartItems, subtotal, deliveryFee, total }: OrderSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-4">
          {cartItems.map((item) => {
            const product = item.products
            const primaryImage = product.product_images?.find((img: any) => img.is_primary)
            const firstImage = product.product_images?.[0]
            const imageUrl = primaryImage?.image_url || firstImage?.image_url || "/placeholder.svg?height=80&width=80"

            return (
              <div key={item.id} className="flex gap-3">
                <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium line-clamp-2">{product.name}</h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">₹{product.price.toFixed(2)}</span>
                    {product.mrp > product.price && (
                      <span className="ml-2 text-sm line-through text-muted-foreground">₹{product.mrp.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

