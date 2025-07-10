"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import PaymentComponent from "./payment-component"
import PaymentMethodSelector from "./payment-method-selector"
import { createClient } from "@/utils/supabase/browser"
import toast from "react-hot-toast"

interface CartItem {
  id: string
  product_id: string
  quantity: number
  user_id: string
  prescription_id: string | null
  created_at: string
  updated_at: string
}

interface Product {
  id: string
  name: string
  price: number
  mrp: number
  [key: string]: any
}

interface CheckoutClientProps {
  user: any
  userProfile: any
}

export default function CheckoutClient({ user, userProfile }: CheckoutClientProps) {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [products, setProducts] = useState<Record<string, Product>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("online")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<any[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      try {
        setIsLoading(true)

        const { data: cartData, error: cartError } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.id)

        if (cartError) throw cartError

        if (!cartData || cartData.length === 0) {
          toast.error("Your cart is empty")
          router.push("/cart")
          return
        }

        setCartItems(cartData)

        const productIds = [...new Set(cartData.map((item) => item.product_id))]

        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .in("id", productIds)

        if (productError) throw productError

        const productMap: Record<string, Product> = {}
        productData.forEach((product: Product) => {
          productMap[product.id] = product
        })

        setProducts(productMap)
      } catch (error) {
        console.error("Error fetching cart and products:", error)
        toast.error("Failed to load cart items")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCartAndProducts()
  }, [user.id, router, supabase])

  // calculate total cart items
  const calculateTotals = () => {
    let subtotal = 0
    let originalTotal = 0

    cartItems.forEach((item) => {
      const product = products[item.product_id]
      if (product) {
        subtotal += product.price * item.quantity
        originalTotal += product.mrp * item.quantity
      }
    })

    const discount = originalTotal - subtotal
    const deliveryFee = subtotal < 500 ? 49 : 0
    const total = subtotal + deliveryFee

    return { subtotal, originalTotal, discount, deliveryFee, total }
  }

  const { subtotal, originalTotal, discount, deliveryFee, total } = calculateTotals()

  // order number generation
  const generateOrderNumber = () => {
    const prefix = "ORD"
    const randomNum = Math.floor(100000 + Math.random() * 900000)
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}-${randomNum}-${randomChars}`
  }

  // get user address
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data, error } = await supabase
          .from("addresses")
          .select("*")
          .eq("user_id", user.id)
          .order("is_default", { ascending: false })

        if (error) {
          throw error
        }

        setAddresses(data || [])

        // check default address
        if (data && data.length > 0) {
          const defaultAddress = data.find((addr) => addr.is_default) || data[0]
          setSelectedAddressId(defaultAddress.id)
        }
      } catch (error) {
        console.error("Error fetching addresses:", error)
        toast.error("Failed to load delivery addresses")
      } finally {
        setIsLoadingAddresses(false)
      }
    }

    fetchAddresses()
  }, [user.id, supabase])

  const clearCart = async () => {
    try {
      const { error } = await supabase.from("cart_items").delete().eq("user_id", user.id)

      if (error) throw error

      return true
    } catch (error) {
      console.error("Error clearing cart:", error)
      return false
    }
  }

  const handleCashOnDelivery = async () => {
    try {
      if (!selectedAddressId) {
        toast.error("Please select a delivery address")
        return
      }

      setIsProcessing(true)

      
      const orderNumber = generateOrderNumber()

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          address_id: selectedAddressId,
          status: "pending",
          payment_status: "pending",
          payment_method: "cod",
          subtotal: subtotal,
          delivery_fee: deliveryFee,
          discount: discount,
          total: total,
        })
        .select()

      if (orderError) {
        throw new Error(orderError.message)
      }

      const newOrderId = orderData[0].id

      const orderItems = cartItems
        .filter((item) => products[item.product_id]) 
        .map((item) => {
          const product = products[item.product_id]
          return {
            order_id: newOrderId,
            product_id: item.product_id,
            product_name: product.name,
            quantity: item.quantity,
            unit_price: product.price,
            total_price: product.price * item.quantity,
          }
        })

      if (orderItems.length === 0) {
        throw new Error("No valid items in cart")
      }

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) {
        throw new Error(itemsError.message)
      }

      // clear cart fter order
      await clearCart()

      
      router.push(`/checkout/success?id=${newOrderId}`)
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("Failed to place order. Please try again.")
      setIsProcessing(false)
    }
  }

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      console.log("Payment success handler called with data:", paymentData)

      
      await clearCart()

      const orderIdToUse = paymentData.orderId || orderId

      if (orderIdToUse) {
        console.log(`Redirecting to success page with order ID: ${orderIdToUse}`)
        router.push(`/checkout/success?id=${orderIdToUse}`)
      } else {
        console.error("No order ID available for redirection")
        toast.error("Payment completed but order details are missing")
        router.push("/")
      }
    } catch (error) {
      console.error("Error handling payment success:", error)
      toast.error("An error occurred after payment")
    }
  }

  const createOrder = async () => {
    try {
      if (!selectedAddressId) {
        toast.error("Please select a delivery address")
        return null
      }

      
      const orderNumber = generateOrderNumber()

      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          address_id: selectedAddressId,
          status: "pending",
          payment_status: "pending",
          payment_method: "online",
          subtotal: subtotal,
          delivery_fee: deliveryFee,
          discount: discount,
          total: total,
        })
        .select()

      if (orderError) {
        throw new Error(orderError.message)
      }

      const newOrderId = orderData[0].id

      // Create order items
      const orderItems = cartItems
        .filter((item) => products[item.product_id]) 
        .map((item) => {
          const product = products[item.product_id]
          return {
            order_id: newOrderId,
            product_id: item.product_id,
            product_name: product.name,
            quantity: item.quantity,
            unit_price: product.price,
            total_price: product.price * item.quantity,
            
          }
        })

      if (orderItems.length === 0) {
        throw new Error("No valid items in cart")
      }

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) {
        throw new Error(itemsError.message)
      }

      setOrderId(newOrderId)
      return newOrderId
    } catch (error) {
      console.error("Error creating order:", error)
      toast.error("Failed to create order. Please try again.")
      return null
    }
  }

  if (isLoading || isLoadingAddresses) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-4">No Delivery Address Found</h2>
        <p className="text-muted-foreground mb-6">Please add a delivery address to continue with checkout.</p>
        <Button asChild>
          <a href="/account/addresses/new?redirect=/checkout">Add Delivery Address</a>
        </Button>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to your cart before checkout.</p>
        <Button asChild>
          <a href="/">Continue Shopping</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order before payment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cartItems.map((item) => {
                const product = products[item.product_id]
                if (!product) return null

                return (
                  <div key={item.id} className="flex justify-between py-2 border-b">
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span>₹{(product.price * item.quantity).toFixed(2)}</span>
                  </div>
                )
              })}

              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>{deliveryFee > 0 ? `₹${deliveryFee.toFixed(2)}` : "FREE"}</span>
                </div>

                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
            <CardDescription>Select where you want your order delivered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedAddressId === address.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedAddressId(address.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">
                        {address.address_line1}
                        {address.address_line2 && `, ${address.address_line2}`}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      <p className="text-sm text-muted-foreground">{address.country}</p>
                    </div>
                    {address.is_default && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded ml-2 shrink-0">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" asChild className="w-full mt-2">
                <a href="/account/addresses?redirect=/checkout">Add New Address</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      </div>

      <div className="lg:sticky lg:top-6 h-fit">
        <Card>
          <CardHeader>
            <CardTitle>{paymentMethod === "online" ? "Payment" : "Complete Order"}</CardTitle>
            <CardDescription>
              {paymentMethod === "online" ? "Complete your purchase securely" : "Confirm your cash on delivery order"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {paymentMethod === "online" ? (
              <PaymentComponent
                userId={user.id}
                amount={total}
                onSuccess={handlePaymentSuccess}
                getOrderId={createOrder}
              />
            ) : (
              <Button onClick={handleCashOnDelivery} className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order (Cash on Delivery)"
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

