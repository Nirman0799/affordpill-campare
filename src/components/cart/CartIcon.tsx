'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartContext } from '@/components/providers/cart-provider'

export function CartIcon() {
  const { cartCount, isLoading } = useCartContext()
  
  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/cart">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
        >
          <ShoppingBag className="h-4 w-4 text-black" />
          {!isLoading && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </div>
        <span className="sr-only">Shopping Cart</span>
      </Link>
    </Button>
  )
}