import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import PrescriptionAddressSelector from "@/components/prescription/address-selector";
import { getPrescriptionImageUrl } from '@/lib/get-prescription-image-url';

export default async function PrescriptionCheckoutPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  // user auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return redirect(`/login?redirect=/account/prescriptions/checkout/${params.id}`);
  }
  
  // get invoice details
  const { data: invoice, error: invoiceError } = await supabase
    .from("prescription_invoices")
    .select(`
      *,
      prescription:prescription_id (
        id,
        file_url,
        status,
        user_id
      ),
      prescription_invoice_items (
        id,
        medication_name,
        strength,
        form,
        quantity,
        unit_price,
        total_price,
        is_substitute,
        original_medication,
        dosage_instructions
      )
    `)
    .eq("id", params.id)
    .single();
  
  if (invoiceError || !invoice) {
    notFound();
  }
  
  
  if (invoice.prescription.user_id !== user.id) {
    notFound();
  }
  
  // check for payments status
  if (invoice.status === "paid") {
    return redirect(`/account/prescriptions/${invoice.prescription.id}`);
  }
  
 
  const { data: existingOrder } = await supabase
    .from("prescription_orders")
    .select("id")
    .eq("invoice_id", params.id)
    .limit(1);
    
  if (existingOrder && existingOrder.length > 0) {
    return redirect(`/account/prescriptions/${invoice.prescription.id}`);
  }
  
  // get user address
  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false });
  
 
  const prescriptionImageUrl = getPrescriptionImageUrl(invoice.prescription.file_url);
  
 
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-6">
        <Link href={`/account/prescriptions/${invoice.prescription.id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Prescription
        </Link>
        
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">Complete your prescription order</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <PrescriptionAddressSelector 
            addresses={addresses || []} 
            invoiceId={invoice.id}
            subtotal={invoice.total_amount}
            prescriptionImageUrl={prescriptionImageUrl}
          />
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your prescription order</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Prescription Medications</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="divide-y">
                    {invoice.prescription_invoice_items.map((item) => (
                      <div key={item.id} className="p-3">
                        <div className="font-medium">{item.medication_name}</div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.strength} {item.form} - Qty: {item.quantity}
                          </span>
                          <span>{formatCurrency(item.total_price)}</span>
                        </div>
                        {item.is_substitute && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Substitute for: {item.original_medication}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2" id="summary-section">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(invoice.total_amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span id="delivery-fee">To be calculated</span>
                </div>
                <div className="flex justify-between font-bold pt-2">
                  <span>Total Amount</span>
                  <span id="total-amount">{formatCurrency(invoice.total_amount)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}