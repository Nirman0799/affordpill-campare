'use client'

import React, { createContext, useContext, PropsWithChildren } from 'react'
import { useCart, CartItem } from '@/hooks/use-cart'

type CartContextType = {
  cartItems: CartItem[]
  cartCount: number
  isLoading: boolean
  addToCart: (productId: string, quantity?: number) => Promise<boolean>
  updateCartItem: (itemId: string, quantity: number) => Promise<boolean>
  removeCartItem: (itemId: string) => Promise<boolean>
  clearCart: () => Promise<boolean>
  fetchCartItems: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: PropsWithChildren) {
  const cart = useCart()
  
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}