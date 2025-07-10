//src/app/checkout/actions.ts
"use server"

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

type OrderData = {
  userId: string
  addressId: string
  cartItems: any[]
  subtotal: number
  deliveryFee: number
  total: number
  paymentMethod: string
}

export async function createOrder(orderData: OrderData) {
  const supabase = await createClient()

  const timestamp = new Date().getTime().toString().slice(-6)
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase()
  const orderNumber = `ORD-${timestamp}-${randomStr}`
  
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user || user.id !== orderData.userId) {
      return { success: false, error: "Unauthorized" }
    }
    
    const paymentStatus = 'pending'
    
    // create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        user_id: orderData.userId,
        address_id: orderData.addressId,
        status: 'pending',
        payment_status: paymentStatus,
        payment_method: orderData.paymentMethod,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.deliveryFee,
        total: orderData.total
      })
      .select('id')
      .single()
    
    if (orderError) {
      console.error('Order creation error:', orderError)
      return { success: false, error: "Failed to create order" }
    }
    
    const orderItems = orderData.cartItems.map(item => ({
      order_id: order.id,
      product_id: item.products.id,
      product_name: item.products.name,
      quantity: item.quantity,
      unit_price: item.products.price,
      total_price: item.products.price * item.quantity
    }))
    
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)
    
    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      return { success: false, error: "Failed to create order items" }
    }
    
    
    if (orderData.paymentMethod === 'cod') {
      const { error: cartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', orderData.userId)
      
      if (cartError) {
        console.error('Cart clearing error:', cartError)
      }
    }
    
    revalidatePath('/cart')
    revalidatePath('/account/orders')
    
    return { 
      success: true, 
      orderId: order.id,
      orderNumber
    }
    
  } catch (error) {
    console.error('Order creation exception:', error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
