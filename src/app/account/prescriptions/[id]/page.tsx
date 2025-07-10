import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, CreditCard, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PrescriptionStatusBadge } from "@/components/prescription/prescription-status-badge";
import { getPrescriptionImageUrl } from '@/lib/get-prescription-image-url';

export default async function PrescriptionDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return redirect(`/login?redirect=/account/prescriptions/${params.id}`);
  }
  
  const { data: prescription, error: prescriptionError } = await supabase
    .from("prescriptions")
    .select(`
      *,
      prescription_invoices(
        id, 
        status, 
        total_amount, 
        created_at,
        updated_at,
        prescription_invoice_items(
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
      )
    `)
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();
  
  if (prescriptionError || !prescription) {
    notFound();
  }
  
  const hasInvoice = prescription.prescription_invoices && prescription.prescription_invoices.length > 0;
  const latestInvoice = hasInvoice ? prescription.prescription_invoices[0] : null;

  let isPaid = false;

  if (latestInvoice) {
    if (latestInvoice.status === 'paid') {
      isPaid = true;
    } else {
      const { data: existingOrder } = await supabase
        .from("prescription_orders")
        .select("id")
        .eq("invoice_id", latestInvoice.id)
        .limit(1);
        
      if (existingOrder && existingOrder.length > 0) {
        isPaid = true;
      }
    }
  }

  const prescriptionImageUrl = getPrescriptionImageUrl(prescription.file_url);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/account/prescriptions">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Prescription Details</h1>
        <div className="ml-auto">
          <PrescriptionStatusBadge status={prescription.status} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Prescription Information</CardTitle>
            <CardDescription>Details about your prescription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date Uploaded</h3>
              <p className="mt-1">{format(new Date(prescription.created_at), "MMM d, yyyy h:mm a")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
              <p className="mt-1">{format(new Date(prescription.updated_at), "MMM d, yyyy h:mm a")}</p>
            </div>
            {prescription.verification_notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1 text-muted-foreground">{prescription.verification_notes}</p>
              </div>
            )}
            <div>
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <a href={prescriptionImageUrl} target="_blank" rel="noopener noreferrer" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download Prescription
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Prescription Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <img 
                src={prescriptionImageUrl} 
                alt="Prescription" 
                className="w-full h-64 object-contain"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {latestInvoice && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Invoice</CardTitle>
              <Badge variant={
                latestInvoice.status === 'paid' ? 'default' : 
                latestInvoice.status === 'sent' ? 'secondary' : 
                'outline'
              }>
                {latestInvoice.status.charAt(0).toUpperCase() + latestInvoice.status.slice(1)}
              </Badge>
            </div>
            <CardDescription>
              Generated on {format(new Date(latestInvoice.created_at), "MMM d, yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium">Medication</th>
                    <th className="text-left p-3 font-medium">Details</th>
                    <th className="text-center p-3 font-medium">Qty</th>
                    <th className="text-right p-3 font-medium">Price</th>
                    <th className="text-right p-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {latestInvoice.prescription_invoice_items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-3">
                        <div className="font-medium">{item.medication_name}</div>
                        {item.is_substitute && item.original_medication && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Substitute for: {item.original_medication}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <div>{item.strength} {item.form}</div>
                        {item.dosage_instructions && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {item.dosage_instructions}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right">₹{item.unit_price.toFixed(2)}</td>
                      <td className="p-3 text-right font-medium">₹{item.total_price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted">
                  <tr>
                    <td colSpan={4} className="p-3 text-right font-medium">Total</td>
                    <td className="p-3 text-right font-bold">₹{latestInvoice.total_amount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mt-6 flex justify-end">
              {latestInvoice && 
               latestInvoice.status === 'sent' && 
               !isPaid && 
               prescription.status !== 'fulfilled' && (
                <Button asChild>
                  <Link href={`/account/prescriptions/checkout/${latestInvoice.id}`}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Invoice
                  </Link>
                </Button>
              )}
              
              {latestInvoice.status === 'draft' && (
                <p className="text-sm text-muted-foreground">
                  The pharmacist is preparing your invoice. You'll be notified when it's ready.
                </p>
              )}
              
              {(latestInvoice.status === 'paid' || isPaid) && (
                <p className="text-sm text-green-600 font-medium">
                  This invoice has been paid. Your order is being processed.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}