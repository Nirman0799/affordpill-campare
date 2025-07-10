//src/app/account/addresses/new/page.tsx
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AddressForm from "../address-form"

export default async function NewAddressPage({
  searchParams,
}: {
  searchParams: { redirect?: string }
}) {
  const supabase = await createClient()

  // Check for user authentication
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect("/login?redirect=/account/addresses/new")
  }

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
        <h1 className="text-2xl font-bold">Add New Address</h1>
      </div>

      <AddressForm userId={user.id} redirectUrl={redirectUrl} />
    </div>
  )
}

