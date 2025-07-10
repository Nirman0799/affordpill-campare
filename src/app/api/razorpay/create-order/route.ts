// //src/app/api/razorpay/create-order/route.ts

import { type NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"
import { createClient } from "@/utils/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    })

    const { amount, currency = "INR", receipt, notes } = await request.json()

    if (!amount) {
      return NextResponse.json({ success: false, error: "Amount is required" }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error("Authentication error:", authError)
      return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 401 })
    }

    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    const orderNotes = {
      ...notes,
      user_id: user.id,
      email: user.email,
    }

    console.log("Creating Razorpay order with params:", {
      amount: Math.round(amount),
      currency,
      receipt,
      notes: orderNotes,
    })

    const order = await razorpay.orders.create({
      amount: Math.round(amount), 
      currency,
      receipt,
      notes: orderNotes,
    })

    console.log("Razorpay order created:", order)

    return NextResponse.json({
      success: true,
      order,
      user_details: {
        email: user.email,
        contact: profile?.phone || "",
        name: profile?.full_name || user.email,
      },
    })
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}


