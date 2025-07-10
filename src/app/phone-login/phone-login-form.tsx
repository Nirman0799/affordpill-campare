//src/app/phone-login/phone-login-form.tsx
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/browser"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { Loader2, Phone, ArrowRight, AlertCircle } from "lucide-react"
import { OtpInput } from "@/components/otp-input"
import { CountdownTimer } from "@/components/countdown-timer"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PhoneLoginFormProps {
  redirectUrl?: string
  isEmbedded?: boolean
}

export default function PhoneLoginForm({ redirectUrl, isEmbedded = false }: PhoneLoginFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [phoneNumber, setPhoneNumber] = useState("+91")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState("")
  const [resendDisabled, setResendDisabled] = useState(false)
  const [resendCountdown, setResendCountdown] = useState(60)

  // fornat phone number for India
  const formatPhoneNumber = (input: string) => {
    // remove all non-digit characters
    if (input.startsWith("+91")) {
      const digitsAfterCode = input.substring(3).replace(/\D/g, "")
      return `+91${digitsAfterCode}`
    }

    // if +91 is removed, add it back
    const digitsOnly = input.replace(/\D/g, "")
    return `+91${digitsOnly}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    if (!input.startsWith("+91")) {
      setPhoneNumber("+91" + input.replace(/\D/g, ""))
      return
    }

    const prefix = "+91"
    const currentDigits = input.substring(prefix.length).replace(/\D/g, "")
    setPhoneNumber(prefix + currentDigits)
  }

  // Handle OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (phoneNumber.length <= 3) {
      setError("Please enter your phone number")
      return
    }

    const formattedPhone = formatPhoneNumber(phoneNumber)

    // Validate phone number -- indian number
    if (!formattedPhone.match(/^\+91\d{10}$/)) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      })

      if (error) {
        if (error.message.includes("rate limit")) {
          throw new Error("Too many attempts. Please try again after some time.")
        }
        throw error
      }

      setOtpSent(true)
      setResendDisabled(true)
      toast.success("Verification code sent to your phone")
    } catch (error: any) {
      console.error("Error details:", error)
      setError(error.message || "Failed to send verification code")
    } finally {
      setLoading(false)
    }
  }

  // OTP verification
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!otp || otp.length !== 6) {
      setError("Please enter the complete 6-digit verification code")
      return
    }

    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: "sms",
      })

      if (error) {
        if (error.message.includes("Invalid")) {
          throw new Error("Invalid verification code. Please try again.")
        }
        throw error
      }

      toast.success("Login successful")
      router.refresh()
      router.push(redirectUrl || "/")
    } catch (error: any) {
      console.error("Error details:", error)
      setError(error.message || "Failed to verify code")
    } finally {
      setLoading(false)
    }
  }

  // resend OTP
  const handleResendOTP = async () => {
    if (resendDisabled) return

    setError("")
    setLoading(true)

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      })

      if (error) {
        if (error.message.includes("rate limit")) {
          throw new Error("Too many attempts. Please try again after some time.")
        }
        throw error
      }

      setResendDisabled(true)
      setOtp("")
      toast.success("New verification code sent to your phone")
    } catch (error: any) {
      console.error("Error details:", error)
      setError(error.message || "Failed to resend verification code")
    } finally {
      setLoading(false)
    }
  }

  // handle countdown
  const handleCountdownComplete = () => {
    setResendDisabled(false)
  }

  // reset  timer when OTP is sent
  useEffect(() => {
    if (otpSent && resendDisabled) {
      const timer = setTimeout(() => {
        setResendDisabled(false)
      }, resendCountdown * 1000)

      return () => clearTimeout(timer)
    }
  }, [otpSent, resendDisabled, resendCountdown])

  return (
    <div className={isEmbedded ? "" : "max-w-md w-full mx-auto"}>
      {!otpSent ? (
        <form onSubmit={handleSendOTP} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">
              Mobile Number
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter 10-digit number"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="pl-10"
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full h-11 text-base" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Sending Code
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP} className="space-y-5">
          <div className="space-y-3">
            <div className="text-center">
              <Label htmlFor="otp" className="text-base">
                Enter Verification Code
              </Label>
              <p className="text-sm text-muted-foreground mt-1">We've sent a 6-digit code to {phoneNumber}</p>
            </div>

            <div className="py-2">
              <OtpInput length={6} value={otp} onChange={setOtp} disabled={loading} autoFocus />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full h-11 text-base" disabled={loading || otp.length !== 6}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying
              </>
            ) : (
              "Verify & Login"
            )}
          </Button>

          <div className="text-center text-sm">
            {resendDisabled ? (
              <p className="text-muted-foreground">
                Resend code in <CountdownTimer seconds={resendCountdown} onComplete={handleCountdownComplete} />
              </p>
            ) : (
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={handleResendOTP}
                disabled={loading}
              >
                Didn't receive the code? Resend
              </Button>
            )}
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="outline"
              className="text-sm"
              onClick={() => setOtpSent(false)}
              disabled={loading}
            >
              Change Mobile Number
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

