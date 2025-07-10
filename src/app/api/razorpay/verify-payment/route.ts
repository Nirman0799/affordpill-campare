// src/app/api/razorpay/verify-payment/route.ts
import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";

async function createPrescriptionOrder(
  supabase: any,
  invoiceId: string,
  prescriptionId: string,
  paymentId: string,
  notes: any
) {
  try {
    const { data: invoice } = await supabase
      .from("prescription_invoices")
      .select(`
        total_amount,
        prescription:prescription_id (user_id),
        prescription_invoice_items (*)
      `)
      .eq("id", invoiceId)
      .single();
    
    if (!invoice) throw new Error("Invoice not found");
    
    const userId = invoice.prescription.user_id;
    
    let addressId = notes?.address_id;
    
    if (!addressId) {
      const { data: addresses } = await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", userId)
        .eq("is_default", true)
        .limit(1);
        
      addressId = addresses?.[0]?.id;
      
      if (!addressId) {
        const { data: anyAddress } = await supabase
          .from("addresses")
          .select("id")
          .eq("user_id", userId)
          .limit(1);
          
        addressId = anyAddress?.[0]?.id;
      }
    }
    
    if (!addressId) throw new Error("No address found");
    
    const deliveryFee = notes?.delivery_fee || 0;
    const totalAmount = parseFloat(invoice.total_amount) + parseFloat(deliveryFee);
    const timestamp = new Date().getTime().toString().slice(-6);
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const orderNumber = `PRSC-${timestamp}-${randomStr}`;
    
    const { data: orderData, error: orderError } = await supabase
      .from("prescription_orders")
      .insert({
        order_number: orderNumber,
        user_id: userId,
        address_id: addressId,
        prescription_id: prescriptionId,
        invoice_id: invoiceId,
        status: "processing",
        payment_status: "paid",
        payment_id: paymentId,
        payment_method: "online",
        subtotal: invoice.total_amount,
        delivery_fee: deliveryFee,
        discount: 0,
        total: totalAmount
      })
      .select("id")
      .single();
    
    if (orderError) {
      console.error("Error creating prescription order:", orderError);
      throw orderError;
    }
    
    if (invoice.prescription_invoice_items && invoice.prescription_invoice_items.length > 0) {
      const orderItems = invoice.prescription_invoice_items.map(item => ({
        order_id: orderData.id,
        medication_name: item.medication_name,
        strength: item.strength,
        form: item.form,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        is_substitute: item.is_substitute,
        original_medication: item.original_medication,
        dosage_instructions: item.dosage_instructions,
        notes: item.notes
      }));
      
      const { error: itemsError } = await supabase
        .from("prescription_order_items")
        .insert(orderItems);
      
      if (itemsError) {
        console.error("Error creating prescription order items:", itemsError);
        throw itemsError;
      }
    }
    
    await supabase
      .from("prescriptions")
      .update({
        status: "fulfilled",
        updated_at: new Date().toISOString()
      })
      .eq("id", prescriptionId);
    
    console.log("Successfully created prescription order");
  } catch (error) {
    console.error("Error creating prescription order:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      order_id,
      invoice_id,
      notes 
    } = await request.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing required payment verification parameters" },
        { status: 400 }
      );
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      console.error("Payment signature verification failed");
      return NextResponse.json(
        { success: false, error: "Payment verification failed" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    if (invoice_id) {
      try {
        await supabase
          .from("prescription_invoices")
          .update({
            status: "paid",
            updated_at: new Date().toISOString(),
          })
          .eq("id", invoice_id);
        
        await createPrescriptionOrder(supabase, invoice_id, razorpay_order_id, razorpay_payment_id, notes);
        
        console.log("Successfully processed prescription order payment");
      } catch (error) {
        console.error("Error processing prescription payment:", error);
      }
    }

    if (order_id) {
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          payment_id: razorpay_payment_id,
          status: "processing",
          updated_at: new Date().toISOString(),
        })
        .eq("id", order_id);

      if (updateError) {
        console.error("Error updating order status:", updateError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      order_id: order_id,
      invoice_id: invoice_id,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}