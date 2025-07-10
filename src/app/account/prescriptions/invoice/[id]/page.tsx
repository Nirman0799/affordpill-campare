import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { InvoicePaymentComponent } from "@/components/prescription/invoice-payment-component";
import { getPrescriptionImageUrl } from '@/lib/get-prescription-image-url';

export default async function InvoicePaymentPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  // user auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return redirect(`/login?redirect=/account/prescriptions/invoice/${params.id}`);
  }
  

  const { data: invoice, error: invoiceError } = await supabase
    .from("prescription_invoices")
    .select(`
      *,
      prescription:prescription_id (
        id,
        file_url,
        status
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
  
  
  const { data: prescription, error: prescriptionError } = await supabase
    .from("prescriptions")
    .select("user_id")
    .eq("id", invoice.prescription_id)
    .single();
  
  if (prescriptionError || !prescription || prescription.user_id !== user.id) {
    notFound();
  }
  
  let alreadyPaid = invoice.status === "paid";

  if (!alreadyPaid) {
    const { data: existingOrder } = await supabase
      .from("prescription_orders")
      .select("id")
      .eq("invoice_id", params.id)
      .limit(1);
      
    if (existingOrder && existingOrder.length > 0) {
      alreadyPaid = true;
    }
  }

  if (alreadyPaid) {
    return redirect(`/account/prescriptions/${invoice.prescription.id}`);
  }

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="mb-6">
        <Link href={`/account/prescriptions/${invoice.prescription.id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Prescription
        </Link>
        
        <h1 className="text-2xl font-bold">Pay Invoice</h1>
        <p className="text-muted-foreground">Complete your payment to process your prescription order</p>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your prescription order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Invoice Date</p>
                  <p className="font-medium">{format(new Date(invoice.created_at), "MMM d, yyyy")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Invoice Number</p>
                  <p className="font-medium">INV-{invoice.id.substring(0, 8).toUpperCase()}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium">Prescribed Medications</h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="divide-y">
                    {invoice.prescription_invoice_items.map((item) => (
                      <div key={item.id} className="flex justify-between p-3">
                        <div className="flex-1">
                          <p className="font-medium">{item.medication_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.strength} {item.form} - Qty: {item.quantity}
                          </p>
                          {item.is_substitute && (
                            <p className="text-xs text-muted-foreground">
                              Substitute for: {item.original_medication}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{item.total_price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.unit_price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{invoice.total_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2">
                  <span>Total Amount</span>
                  <span>₹{invoice.total_amount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Complete Payment</CardTitle>
            <CardDescription>
              Pay securely using our payment gateway
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InvoicePaymentComponent 
              invoiceId={invoice.id} 
              amount={invoice.total_amount} 
              userId={user.id}
              prescriptionId={invoice.prescription.id}
              prescriptionImageUrl={getPrescriptionImageUrl(invoice.prescription.file_url)}
            />
          </CardContent>
          <CardFooter className="bg-muted/20 flex flex-col items-start text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <p>Your payment information is processed securely.</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}