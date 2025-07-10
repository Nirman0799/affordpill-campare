"use client"

import Link from "next/link"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// date formatting
function formatDate(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// cureency formatting
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}


function getStatusVariant(status: string): "default" | "outline" | "secondary" | "destructive" {
  switch (status.toLowerCase()) {
    case "delivered":
      return "default"
    case "shipped":
      return "secondary"
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

export default function OrdersMobile({ orders }: { orders: any[] }) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Order #{order.order_number}</h3>
                <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
              </div>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              <div>
                <p className="text-muted-foreground">Payment</p>
                <p>{order.payment_method === "cod" ? "Cash on Delivery" : "Online"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total</p>
                <p className="font-medium">{formatCurrency(order.total)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Shipping Address</p>
                <p className="truncate">
                  {order.address?.address_line1}, {order.address?.city}
                </p>
              </div>
            </div>

            <Button size="sm" className="w-full" asChild>
              <Link href={`/order-success?id=${order.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Order Details
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

