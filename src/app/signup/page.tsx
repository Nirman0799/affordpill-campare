import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import SignupForm from "./signup-form"
import Image from "next/image"
import Link from "next/link"

export default async function SignupPage({
  searchParams,
}: {
  searchParams: { redirectUrl?: string }
}) {
  const supabase = await createClient()

  // check for user auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const redirectUrl = searchParams.redirectUrl

  if (user) {
    return redirect(redirectUrl || "/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-col md:flex-row md:h-screen">
        {/* Signup Form  */}
        <div className="w-full md:w-1/2 px-4 sm:px-6 md:px-12 lg:px-16 py-6 md:py-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto md:mx-0 w-full">
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-center md:text-left">
                Create an Account
              </h1>
              <p className="mt-2 text-muted-foreground text-center md:text-left">
                Join AffordPill to access affordable medications
              </p>
            </div>

            <div className="bg-card px-6 py-8 shadow-sm sm:rounded-lg sm:px-10">
              <SignupForm redirectUrl={redirectUrl} />
            </div>

            <div className="text-center md:text-left mt-6">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* right side image visible only on desktop */}
        <div className="hidden md:block md:w-1/2 h-full">
          <div className="relative h-full w-full">
            <Image
              src="/pharmacy-login.png" // change if required
              alt="AffordPill Healthcare"
              fill
              priority
              className="object-contain"
            />
            <div className="absolute inset-0  flex flex-col justify-end p-8">
              <h2 className="text-white text-2xl font-bold mb-2">Join AffordPill Today</h2>
              <p className="text-white/90 text-lg">Access affordable medications and healthcare services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

