import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { invoice_id?: string; prescription_id?: string };
}) {
  const supabase = await createClient();
  const invoiceId = searchParams.invoice_id;
  const prescriptionId = searchParams.prescription_id;

  if (!invoiceId && !prescriptionId) {
    return redirect("/account/prescriptions");
  }

 
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return redirect("/login");
  }

  // chek invoice id
  let invoice;
  if (invoiceId) {
    const { data, error } = await supabase
      .from("prescription_invoices")
      .select(`
        *,
        prescription:prescription_id (id, user_id)
      `)
      .eq("id", invoiceId)
      .single();

    if (!error && data) {
      invoice = data;
      if (invoice.prescription.user_id !== user.id) {
        return redirect("/account/prescriptions");
      }
    }
  }

  let prescription;
  if (prescriptionId) {
    const { data, error } = await supabase
      .from("prescriptions")
      .select("*")
      .eq("id", prescriptionId)
      .eq("user_id", user.id)
      .single();

    if (!error && data) {
      prescription = data;
    }
  }

  return (
    <div className="container max-w-md mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground">
          Your payment has been processed successfully. We're preparing your order.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-semibold">Order Confirmation</h2>
              <p className="text-sm text-muted-foreground">
                Your medication order is being processed
              </p>
            </div>
          </div>

          <div className="text-sm space-y-4">
            <p>
              Thank you for your order. Our pharmacists will review your prescription once more
              and prepare your medications for shipment.
            </p>
            
            <p>
              You will receive updates on the status of your order via email and in your
              account dashboard.
            </p>
            
            <p>
              If you have any questions regarding your order, please contact our customer
              support team.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button asChild variant="outline" className="flex-1">
          <Link href="/account/prescriptions">
            View My Prescriptions
          </Link>
        </Button>
        
        <Button asChild className="flex-1">
          <Link href="/account/orders">
            Track Orders
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}