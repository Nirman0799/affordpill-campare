// src/app/account/orders/prescription/[id]/page.tsx
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { ArrowLeft, FileText, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function PrescriptionOrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  // user auth check
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return redirect(`/login?redirect=/account/orders/prescription/${params.id}`);
  }
  
  // fetch prescription
  const { data: order, error: orderError } = await supabase
    .from("prescription_orders")
    .select(`
      *,
      address:address_id (*),
      prescription:prescription_id (*),
      prescription_order_items (*)
    `)
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();
  
  if (orderError || !order) {
    notFound();
  }
  
  // formatting
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/account/orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Orders
        </Link>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Prescription Order</h1>
          <Badge variant={
            order.status === "delivered" ? "default" :
            order.status === "shipped" ? "secondary" :
            order.status === "cancelled" ? "destructive" :
            "outline"
          }>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
        <p className="text-muted-foreground">Order #{order.order_number}</p>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span>{format(new Date(order.created_at), "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="capitalize">{order.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Status:</span>
                    <span className="capitalize">{order.payment_status}</span>
                  </div>
                  {order.expected_delivery_date && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected Delivery:</span>
                      <span>{format(new Date(order.expected_delivery_date), "MMM d, yyyy")}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <div className="text-sm">
                  <p>{order.address.address_line1}</p>
                  {order.address.address_line2 && <p>{order.address.address_line2}</p>}
                  <p>
                    {order.address.city}, {order.address.state} {order.address.pincode}
                  </p>
                  <p>{order.address.country}</p>
                </div>
                
                {order.tracking_number && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-1">Tracking Information</h3>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{order.tracking_number}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Prescription Medications</CardTitle>
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
                  {order.prescription_order_items.map((item) => (
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
                      <td className="p-3 text-right">{formatCurrency(item.unit_price)}</td>
                      <td className="p-3 text-right font-medium">{formatCurrency(item.total_price)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-muted">
                  <tr>
                    <td colSpan={3} className="p-3"></td>
                    <td className="p-3 text-right font-medium">Subtotal</td>
                    <td className="p-3 text-right">{formatCurrency(order.subtotal)}</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="p-3"></td>
                    <td className="p-3 text-right font-medium">Delivery Fee</td>
                    <td className="p-3 text-right">{formatCurrency(order.delivery_fee)}</td>
                  </tr>
                  {order.discount > 0 && (
                    <tr>
                      <td colSpan={3} className="p-3"></td>
                      <td className="p-3 text-right font-medium text-green-600">Discount</td>
                      <td className="p-3 text-right text-green-600">-{formatCurrency(order.discount)}</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan={3} className="p-3"></td>
                    <td className="p-3 text-right font-bold">Total</td>
                    <td className="p-3 text-right font-bold">{formatCurrency(order.total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link href={`/account/prescriptions/${order.prescription_id}`}>
                  <FileText className="h-4 w-4 mr-2" />
                  View Original Prescription
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}