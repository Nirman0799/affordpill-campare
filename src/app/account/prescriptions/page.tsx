// src/app/account/prescriptions/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FileText, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PrescriptionsList from "./prescriptions-list";

export default async function PrescriptionsPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    return redirect("/login?redirect=/account/prescriptions");
  }
  
  // get prescriptions
  const { data: prescriptions } = await supabase
    .from("prescriptions")
    .select("*, prescription_invoices(id, status, total_amount)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Prescriptions</h1>
          <p className="text-muted-foreground">View and manage your prescription orders</p>
        </div>
        <Button asChild>
          <Link href="/upload">
            <PlusCircle className="h-4 w-4 mr-2" />
            Upload New Prescription
          </Link>
        </Button>
      </div>
      <PrescriptionsList initialPrescriptions={prescriptions || []} />
    </div>
  );
}