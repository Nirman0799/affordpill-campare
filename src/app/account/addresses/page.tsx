import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AddressList from "./address-list"
import CheckoutButton from "./checkout-button"

export default async function AddressesPage() {
  const supabase = await createClient()

  // -- user authentication check
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect("/login?redirect=/account/addresses")
  }

  // get user addresses
  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })

  // check for user cart items
  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    
    const hasCartItems = cartItems && cartItems.length > 0

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Addresses</h1>
          <p className="text-muted-foreground">Manage your shipping addresses</p>
        </div>
        <Button asChild>
          <Link href="/account/addresses/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Address
          </Link>
        </Button>
      </div>

      <AddressList initialAddresses={addresses || []} userId={user.id} />
      {hasCartItems && addresses && addresses.length > 0 && (
        <div className="mt-8 flex justify-center">
          <CheckoutButton />
        </div>
      )}
    </div>
  )
}

