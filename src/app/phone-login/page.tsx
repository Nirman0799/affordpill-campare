//src/app/phone-login/page.tsx
import { redirect } from "next/navigation"
import PhoneLoginForm from "./phone-login-form"
import { createClient } from "@/utils/supabase/server"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function PhoneLoginPage({
  searchParams,
}: {
  searchParams: { redirectUrl?: string }
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const redirectUrl = searchParams.redirectUrl

  if (user) {
    return redirect(redirectUrl || "/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <div className="container max-w-md flex-1 flex flex-col justify-center py-6 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full">
          <div className="mb-4 md:mb-6">
            <Link href="/login" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to login options
            </Link>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-center">
            Login with Phone
          </h1>
          <p className="mt-2 text-muted-foreground text-center">We'll send a verification code to your phone</p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full">
          <div className="bg-card px-6 py-8 shadow-sm sm:rounded-lg sm:px-10">
            <PhoneLoginForm redirectUrl={redirectUrl} />
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

