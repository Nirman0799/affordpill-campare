"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  autoFocus?: boolean
}

export function OtpInput({ length = 6, value = "", onChange, disabled = false, autoFocus = true }: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(
    value
      .split("")
      .slice(0, length)
      .concat(Array(length - value.length).fill("")),
  )
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  useEffect(() => {
    setOtp(
      value
        .split("")
        .slice(0, length)
        .concat(Array(length - value.length).fill("")),
    )
  }, [value, length])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value

    // accept digits
    if (newValue && !/^\d+$/.test(newValue)) {
      return
    }

    const digit = newValue.slice(-1)

    // Update  OTP array
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    onChange(newOtp.join(""))

    if (digit && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }

    if (e.key === "ArrowLeft" && index > 0 && inputRefs.current[index - 1]) {
      e.preventDefault()
      inputRefs.current[index - 1].focus()
    }

    if (e.key === "ArrowRight" && index < length - 1 && inputRefs.current[index + 1]) {
      e.preventDefault()
      inputRefs.current[index + 1].focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    if (!/^\d+$/.test(pastedData)) {
      return
    }

    const pastedOtp = pastedData.slice(0, length).split("")
    const newOtp = [...otp]

    for (let i = 0; i < pastedOtp.length; i++) {
      newOtp[i] = pastedOtp[i]
    }

    setOtp(newOtp)
    onChange(newOtp.join(""))

    const nextEmptyIndex = newOtp.findIndex((digit) => !digit)
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex

    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus()
    }
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-10 h-12 sm:w-12 sm:h-14 text-center text-lg font-semibold",
            disabled && "opacity-50 cursor-not-allowed",
          )}
          aria-label={`Digit ${index + 1} of verification code`}
        />
      ))}
    </div>
  )
}

