import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import CheckoutClient from "./checkout-client"

export default async function CheckoutPage() {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return redirect("/login?redirectUrl=/checkout")
  }

  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <CheckoutClient user={user} userProfile={profileData || null} />
    </div>
  )
}

