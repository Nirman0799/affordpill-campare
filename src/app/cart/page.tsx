'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/components/providers/cart-provider'
import { createClient } from '@/utils/supabase/browser'

export default function CartPage() {
  const router = useRouter()
  const { cartItems, isLoading, updateCartItem, removeCartItem, clearCart } = useCartContext()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [subtotal, setSubtotal] = useState(0)
  const [originalTotal, setOriginalTotal] = useState(0)
  const [savings, setSavings] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [supabase])

  useEffect(() => {
    let newSubtotal = 0
    let newOriginalTotal = 0

    cartItems.forEach(item => {
      if (item.product) {
        newSubtotal += item.product.price * item.quantity
        newOriginalTotal += item.product.mrp * item.quantity
      }
    })

    setSubtotal(newSubtotal)
    setOriginalTotal(newOriginalTotal)
    setSavings(newOriginalTotal - newSubtotal)
  }, [cartItems])

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    await updateCartItem(itemId, quantity)
  }

  // -- proceed to checkout
  const handleCheckout = () => {
    if (!user) {
      router.push('/login?redirectUrl=/checkout')
      return
    }
    
    setIsCheckingOut(true)
    router.push('/checkout')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild size="lg">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart ({cartItems.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 border-b last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={item.product?.image || '/images/placeholder.png'}
                      alt={item.product?.name || 'Product'}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* product details */}
                  <div className="flex-1">
                    <Link href={`/products/${item.product?.slug}`}>
                      <h3 className="font-medium text-gray-900 hover:text-primary transition-colors">
                        {item.product?.name}
                      </h3>
                    </Link>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="font-semibold">₹{item.product?.price.toFixed(2)}</span>
                      {item.product?.mrp && item.product.mrp > item.product.price && (
                        <>
                          <span className="text-gray-500 line-through text-sm">₹{item.product.mrp.toFixed(2)}</span>
                          <span className="text-green-600 text-sm">
                            {Math.round(((item.product.mrp - item.product.price) / item.product.mrp) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <div className="h-8 w-10 flex items-center justify-center border-y border-input">
                          {item.quantity}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 -ml-2 px-2"
                        onClick={() => removeCartItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center p-4 border-t">
              <Button variant="outline" onClick={() => clearCart()}>
                Clear Cart
              </Button>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">MRP Total</span>
                <span>₹{originalTotal.toFixed(2)}</span>
              </div>
              
              {savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Product Discount</span>
                  <span>-₹{savings.toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t pt-4 font-medium text-base flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="border-t border-dashed pt-4 font-semibold text-lg flex justify-between">
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6" 
              size="lg"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              Taxes and delivery charges will be calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}