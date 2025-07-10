"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Eye, FilePlus, CreditCard, Loader2, AlertTriangle } from "lucide-react";
import { PrescriptionStatusBadge } from "@/components/prescription/prescription-status-badge";
import { createClient } from "@/utils/supabase/browser";
import toast from "react-hot-toast";

type Prescription = {
  id: string;
  file_url: string;
  status: string;
  created_at: string;
  updated_at: string;
  verification_notes?: string | null;
  prescription_invoices?: {
    id: string;
    status: string;
    total_amount: number;
  }[];
};

interface PrescriptionsListProps {
  initialPrescriptions: Prescription[];
}

export default function PrescriptionsList({ initialPrescriptions }: PrescriptionsListProps) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions);
  const [paidInvoices, setPaidInvoices] = useState<Set<string>>(new Set());
  const [imageStatuses, setImageStatuses] = useState<Record<string, 'loading' | 'success' | 'error'>>({});
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const supabase = createClient();

  // paid invoices - check
  useEffect(() => {
    async function checkPaidInvoices() {
      const invoiceIds = prescriptions
        .flatMap(p => p.prescription_invoices || [])
        .filter(inv => inv.status === 'sent')
        .map(inv => inv.id);
      if (invoiceIds.length === 0) return;
      
      const { data } = await supabase
        .from("prescription_orders")
        .select("invoice_id")
        .in("invoice_id", invoiceIds);
        
      if (data && data.length > 0) {
        const paidIds = new Set(data.map(order => order.invoice_id));
        setPaidInvoices(paidIds);
      }
    }
    
    checkPaidInvoices();
  }, [prescriptions, supabase]);

  // load images
  useEffect(() => {
    const initialStatuses: Record<string, 'loading' | 'success' | 'error'> = {};
    prescriptions.forEach(prescription => {
      initialStatuses[prescription.id] = 'loading';
    });
    setImageStatuses(initialStatuses);
        prescriptions.forEach(async (prescription) => {
      if (!prescription.file_url) {
        setImageStatuses(prev => ({
          ...prev,
          [prescription.id]: 'error'
        }));
        return;
      }
      
      try {
        let filePath = '';
        
        if (prescription.file_url.includes('/storage/v1/object/public/prescriptions/')) {
          const parts = prescription.file_url.split('/storage/v1/object/public/prescriptions/');
          filePath = parts[1];
        } else if (prescription.file_url.includes('/prescriptions/')) {
          const parts = prescription.file_url.split('/prescriptions/');
          filePath = parts[1];
        } else {
          filePath = prescription.file_url;
        }
        
        const imageUrl = `/api/prescriptions/image?path=${encodeURIComponent(filePath)}`;
        
        setImageUrls(prev => ({
          ...prev,
          [prescription.id]: imageUrl
        }));
        
        setImageStatuses(prev => ({
          ...prev,
          [prescription.id]: 'success'
        }));
      } catch (error) {
        console.error(`Error processing image URL for ${prescription.id}:`, error);
        setImageStatuses(prev => ({
          ...prev,
          [prescription.id]: 'error'
        }));
      }
    });
  }, [prescriptions]);

  if (prescriptions.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/20 rounded-lg">
        <div className="flex justify-center mb-4">
          <FileText className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No prescriptions yet</h2>
        <p className="text-muted-foreground mb-6">Upload a prescription to order your medications</p>
        <Button asChild>
          <Link href="/upload">
            <FilePlus className="h-4 w-4 mr-2" />
            Upload Prescription
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {prescriptions.map((prescription) => {
        const hasInvoice = prescription.prescription_invoices &&
                          prescription.prescription_invoices.length > 0;
        const latestInvoice = hasInvoice ?
                              prescription.prescription_invoices[0] : null;
        const isInvoicePaid = latestInvoice ?
                             latestInvoice.status === 'paid' ||
                             paidInvoices.has(latestInvoice.id) :
                             false;
        const imageStatus = imageStatuses[prescription.id] || 'loading';
        const imageUrl = imageUrls[prescription.id];
        
        return (
          <Card key={prescription.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Prescription
                <PrescriptionStatusBadge status={prescription.status} />
              </CardTitle>
              <CardDescription>
                Uploaded on {format(new Date(prescription.created_at), "MMM d, yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
                {imageStatus === 'loading' && (
                  <div className="flex items-center justify-center h-full w-full text-muted-foreground">
                    <Loader2 className="h-10 w-10 opacity-50 animate-spin" />
                  </div>
                )}
                
                {imageStatus === 'success' && imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Prescription"
                    className="w-full h-full object-contain"
                    onError={() => {
                      console.error(`Image failed to load for ${prescription.id}`);
                      setImageStatuses(prev => ({
                        ...prev,
                        [prescription.id]: 'error'
                      }));
                    }}
                  />
                )}
                
                {imageStatus === 'error' && (
                  <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground p-4">
                    <AlertTriangle className="h-10 w-10 opacity-60 text-amber-500 mb-2" />
                    <p className="text-sm text-center">Image unavailable</p>
                    <p className="text-xs text-center mt-1 text-muted-foreground">
                      The prescription image could not be loaded
                    </p>
                  </div>
                )}
              </div>
              {prescription.verification_notes && (
                <div className="bg-muted p-3 rounded-md mt-2 text-sm">
                  <p className="font-medium">Notes:</p>
                  <p className="text-muted-foreground">{prescription.verification_notes}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                asChild
              >
                <Link href={`/account/prescriptions/${prescription.id}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Link>
              </Button>
              {latestInvoice &&
               latestInvoice.status === 'sent' &&
               !isInvoicePaid &&
               prescription.status !== 'fulfilled' && (
                <Button
                  size="sm"
                  className="flex-1"
                  asChild
                >
                  <Link href={`/account/prescriptions/checkout/${latestInvoice.id}`}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}