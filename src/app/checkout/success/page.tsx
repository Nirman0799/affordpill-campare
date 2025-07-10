import { redirect } from "next/navigation"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const orderId = searchParams.id

  if (!orderId) {
    return redirect("/")
  }

  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return redirect("/login")
  }

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(`
      *,
      address:addresses(*),
      order_items:order_items(
        *,
        product:products(*)
      )
    `)
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single()

  if (orderError || !order) {
    return redirect("/")
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground">Your order has been placed and is being processed.</p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-semibold text-lg mb-2">Order Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Number:</span>
                  <span className="font-medium">{order.order_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span className="capitalize">{order.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="capitalize">{order.payment_status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order Status:</span>
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>₹{Number(order.subtotal).toFixed(2)}</span>
                </div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{Number(order.discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee:</span>
                  <span>{Number(order.delivery_fee) > 0 ? `₹${Number(order.delivery_fee).toFixed(2)}` : "FREE"}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total:</span>
                  <span>₹{Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {order.address && (
            <div className="mt-8">
              <h2 className="font-semibold text-lg mb-2">Delivery Address</h2>
              <div className="p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">
                    {order.address.address_line1}
                    {order.address.address_line2 && `, ${order.address.address_line2}`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.address.city}, {order.address.state} - {order.address.pincode}
                  </p>
                  <p className="text-sm text-muted-foreground">{order.address.country}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="flex justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span>₹{Number(item.total_price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/" className="flex items-center">
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

