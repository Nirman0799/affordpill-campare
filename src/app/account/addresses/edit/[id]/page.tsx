//src/app/account/addresses/edit/[id]/page.tsx:
import { createClient } from "@/utils/supabase/server"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AddressForm from "../../address-form"

export default async function EditAddressPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { redirect?: string }
}) {
  const supabase = await createClient()

  // -- check for user auth
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect("/login?redirect=/account/addresses/edit/" + params.id)
  }

  // get address for editing
  const { data: address, error: addressError } = await supabase
    .from("addresses")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single()

  // error page handling
  if (addressError || !address) {
    return notFound()
  }

  // redirection handling
  const redirectUrl = searchParams.redirect || "/account/addresses"

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/account/addresses">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Address</h1>
      </div>

      <AddressForm userId={user.id} addressId={params.id} initialData={address} redirectUrl={redirectUrl} />
    </div>
  )
}

