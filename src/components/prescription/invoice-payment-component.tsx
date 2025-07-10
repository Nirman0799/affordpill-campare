// src/components/prescription/invoice-payment-component.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/browser";
import toast from "react-hot-toast";
import { CreditCard, Loader2, CheckCircle, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface InvoicePaymentComponentProps {
  invoiceId: string;
  amount: number;
  userId: string;
  prescriptionId: string;
}

export function InvoicePaymentComponent({
  invoiceId,
  amount,
  userId,
  prescriptionId
}: InvoicePaymentComponentProps) {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(amount);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const loadScript = async () => {
      if (window.Razorpay) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
      };
      script.onerror = () => {
        toast.error("Failed to load payment gateway. Please refresh the page.");
      };
      document.body.appendChild(script);
    };
    loadScript();
  }, []);

  useEffect(() => {
    const checkoutData = sessionStorage.getItem('prescription_checkout');
    if (checkoutData) {
      try {
        const data = JSON.parse(checkoutData);
        setSelectedAddressId(data.addressId);
        setDeliveryFee(data.deliveryFee);
        setTotalAmount(data.totalAmount);
      } catch (e) {
        console.error("Error parsing checkout data:", e);
      }
    }
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setPaymentStatus("idle");
      setPaymentDetails(null);

      if (!window.Razorpay) {
        toast.error("Payment gateway not loaded. Please refresh the page.");
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Authentication error. Please log in again.");
        setLoading(false);
        return;
      }

      // Get user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name, phone_number")
        .eq("id", userId)
        .single();

      const notes = {
        invoice_id: invoiceId,
        prescription_id: prescriptionId,
        user_id: userId,
        address_id: selectedAddressId,
        delivery_fee: deliveryFee
      };

      const response = await fetch(`/api/razorpay/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100), 
          currency: "INR",
          receipt: `INV-${invoiceId.substring(0, 8)}`,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment order");
      }

      const result = await response.json();
      if (!result.success || !result.order) {
        throw new Error(result.error || "Failed to create payment order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: result.order.amount,
        currency: result.order.currency,
        name: "AffordPill",
        description: "Payment for your prescription",
        order_id: result.order.id,
        handler: (response: any) => {
          verifyPayment(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature
          );
        },
        prefill: {
          name: profile ? `${profile.first_name} ${profile.last_name}` : "",
          email: session.user.email,
          contact: profile?.phone_number || "",
        },
        notes: {
          invoice_id: invoiceId,
          prescription_id: prescriptionId,
          address_id: selectedAddressId,
          delivery_fee: deliveryFee
        },
        theme: {
          color: "#7C3AED", // Primary color
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        setPaymentStatus("error");
        setLoading(false);
        toast.error(`Payment failed: ${response.error.description}`);
      });

      razorpay.open();
    } catch (error: any) {
      setPaymentStatus("error");
      setLoading(false);
      toast.error(`Failed to initiate payment: ${error.message || "Unknown error"}`);
    }
  };

  const verifyPayment = async (
    paymentId: string,
    razorpayOrderId: string,
    signature: string
  ) => {
    try {
      const verifyResponse = await fetch(`/api/razorpay/verify-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_payment_id: paymentId,
          razorpay_order_id: razorpayOrderId,
          razorpay_signature: signature,
          invoice_id: invoiceId,
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Payment verification failed");
      }

      const verifyResult = await verifyResponse.json();
      if (verifyResult.success) {
        // Update invoice status in db
        const { error: updateError } = await supabase
          .from("prescription_invoices")
          .update({ 
            status: "paid", 
            updated_at: new Date().toISOString() 
          })
          .eq("id", invoiceId);
          
        if (updateError) {
          console.error("Failed to update invoice status:", updateError);
        }
        
        // update the prescription status if required
        await supabase
          .from("prescriptions")
          .update({ 
            status: "fulfilled",
            updated_at: new Date().toISOString() 
          })
          .eq("id", prescriptionId);
        
        setPaymentStatus("success");
        setPaymentDetails({
          paymentId,
          orderId: razorpayOrderId,
        });
        toast.success("Payment successful!");
        
        setTimeout(() => {
          window.location.href = `/account/prescriptions/${prescriptionId}`;
        }, 2000);
      } else {
        setPaymentStatus("error");
        toast.error("Payment verification failed");
      }
    } catch (error: any) {
      setPaymentStatus("error");
      toast.error(`Payment verification failed: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {paymentStatus === "idle" && (
        <Button 
          onClick={handlePayment} 
          disabled={loading || !scriptLoaded} 
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay ₹{totalAmount.toFixed(2)}
            </>
          )}
        </Button>
      )}

      {paymentStatus === "success" && (
        <div className="bg-green-50 p-4 rounded-md flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800">Payment Successful</h3>
            <p className="text-sm text-green-700 mt-1">
              Your payment was processed successfully. Your order is being prepared.
            </p>
            {paymentDetails && (
              <div className="mt-2 text-xs text-green-700 space-y-1">
                <p>Payment ID: {paymentDetails.paymentId}</p>
                <p>Order ID: {paymentDetails.orderId}</p>
              </div>
            )}
            <Button 
              className="mt-4" 
              onClick={() => router.push(`/account/prescriptions/${prescriptionId}`)}
            >
              View Prescription Details
            </Button>
          </div>
        </div>
      )}

      {paymentStatus === "error" && (
        <div className="bg-red-50 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">Payment Failed</h3>
            <p className="text-sm text-red-700 mt-1">
              There was an issue processing your payment. Please try again or contact support.
            </p>
            <Button 
              variant="outline" 
              onClick={handlePayment} 
              disabled={loading || !scriptLoaded}
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}

      <Separator className="my-4" />
      
      <div className="text-sm text-muted-foreground space-y-2">
        <p className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
          Secure payment powered by Razorpay
        </p>
        <p className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
          Your medication will be shipped after payment confirmation
        </p>
      </div>
    </div>
  );
}