'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/browser'
import { toast } from 'react-hot-toast'

export type CartItem = {
  id: string
  product_id: string
  quantity: number
  product?: {
    name: string
    price: number
    mrp: number
    slug: string
    image?: string
  }
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const supabase = createClient()

  const fetchCartItems = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setCartItems([])
        setCartCount(0)
        return
      }

      // get cart items with product details
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          product_id,
          quantity,
          products (
            name,
            price,
            mrp,
            slug,
            product_images (
              image_url,
              is_primary
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching cart:', error)
        return
      }

      const processedItems = data.map((item: any) => {
        // get the primary image or use the first one
        const primaryImage = item.products.product_images?.find((img: any) => img.is_primary)
        const firstImage = item.products.product_images?.[0]
        
        return {
          id: item.id,
          product_id: item.product_id,
          quantity: item.quantity,
          product: {
            name: item.products.name,
            price: item.products.price,
            mrp: item.products.mrp,
            slug: item.products.slug,
            image: primaryImage?.image_url || firstImage?.image_url || '/images/placeholder.png'
          }
        }
      })

      setCartItems(processedItems)
      setCartCount(processedItems.length)
    } catch (error) {
      console.error('Error in useCart hook:', error)
    } finally {
      setIsLoading(false)
      setIsInitialized(true)
    }
  }, [supabase])

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error('Please sign in to add items to cart')
        return false
      }

      // verify if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single()

      let result

      if (existingItem) {
        // update existing item
        const newQuantity = existingItem.quantity + quantity
        result = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity })
          .eq('id', existingItem.id)
        
        toast.success('Cart updated')
      } else {
        // add new item
        result = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: productId,
            quantity
          })
        
        toast.success('Item added to cart')
      }

      if (result.error) {
        toast.error('Failed to update cart')
        return false
      }

      fetchCartItems()
      return true
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Error adding to cart')
      return false
    }
  }

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        return removeCartItem(itemId)
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)

      if (error) {
        toast.error('Failed to update cart')
        return false
      }

      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      )
      
      toast.success('Cart updated')
      return true
    } catch (error) {
      console.error('Error updating cart item:', error)
      toast.error('Error updating item')
      return false
    }
  }

  const removeCartItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

      if (error) {
        toast.error('Failed to remove item')
        return false
      }

      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
      setCartCount(prev => prev - 1)
      
      toast.success('Item removed')
      return true
    } catch (error) {
      console.error('Error removing cart item:', error)
      toast.error('Error removing item')
      return false
    }
  }

  const clearCart = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) return false

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      if (error) {
        toast.error('Failed to clear cart')
        return false
      }

      setCartItems([])
      setCartCount(0)
      toast.success('Cart cleared')
      return true
    } catch (error) {
      console.error('Error clearing cart:', error)
      toast.error('Error clearing cart')
      return false
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [fetchCartItems])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchCartItems()
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchCartItems])

  return {
    cartItems,
    cartCount,
    isLoading,
    isInitialized,
    fetchCartItems,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
  }
}