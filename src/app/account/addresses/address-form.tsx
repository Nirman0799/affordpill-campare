//src/app/account/addresses/address-form.tsx:
"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/browser"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import toast from "react-hot-toast"

interface Address {
  id?: string
  user_id: string
  recipient_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  country: string
  pincode: string
  is_default: boolean
}

interface AddressFormProps {
  userId: string
  addressId?: string
  initialData?: Address
  redirectUrl?: string
}

export default function AddressForm({
  userId,
  addressId,
  initialData,
  redirectUrl = "/account/addresses",
}: AddressFormProps) {
  const isEditMode = !!addressId

  const [formData, setFormData] = useState<Omit<Address, "id" | "user_id">>({
    recipient_name: initialData?.recipient_name || "",
    address_line1: initialData?.address_line1 || "",
    address_line2: initialData?.address_line2 || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    country: initialData?.country || "India",
    pincode: initialData?.pincode || "",
    is_default: initialData?.is_default || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const toggleDefault = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_default: checked }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.recipient_name?.trim()) {
      newErrors.recipient_name = "Recipient name is required"
    }

    if (!formData.address_line1.trim()) {
      newErrors.address_line1 = "Address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required"
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "PIN code is required"
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "PIN code must be 6 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (formData.is_default) {
        await supabase.from("addresses").update({ is_default: false }).eq("user_id", userId)
      }

      if (isEditMode) {
        const { error } = await supabase
          .from("addresses")
          .update({
            recipient_name: formData.recipient_name,
            address_line1: formData.address_line1,
            address_line2: formData.address_line2,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            pincode: formData.pincode,
            is_default: formData.is_default,
          })
          .eq("id", addressId)

        if (error) throw error

        toast.success("Address updated successfully")
      } else {
        const { error } = await supabase.from("addresses").insert({
          user_id: userId,
          recipient_name: formData.recipient_name,
          address_line1: formData.address_line1,
          address_line2: formData.address_line2,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
          is_default: formData.is_default,
        })

        if (error) throw error

        toast.success("Address added successfully")
      }

      router.push(redirectUrl)
      router.refresh()
    } catch (error) {
      console.error("Error saving address:", error)
      toast.error("Failed to save address")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient_name">Recipient Name *</Label>
          <Input
            id="recipient_name"
            name="recipient_name"
            value={formData.recipient_name}
            onChange={handleChange}
            placeholder="Full name of person receiving the package"
            className={errors.recipient_name ? "border-destructive" : ""}
          />
          {errors.recipient_name && <p className="text-sm text-destructive">{errors.recipient_name}</p>}
        </div>
          <div className="space-y-2">
            <Label htmlFor="address_line1">Address Line 1 *</Label>
            <Input
              id="address_line1"
              name="address_line1"
              value={formData.address_line1}
              onChange={handleChange}
              placeholder="House/Flat/Block No., Street, Area"
              className={errors.address_line1 ? "border-destructive" : ""}
            />
            {errors.address_line1 && <p className="text-sm text-destructive">{errors.address_line1}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address_line2">Address Line 2</Label>
            <Input
              id="address_line2"
              name="address_line2"
              value={formData.address_line2}
              onChange={handleChange}
              placeholder="Apartment, Building, Floor (optional)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className={errors.state ? "border-destructive" : ""}
              />
              {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">PIN Code *</Label>
              <Input
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit PIN code"
                maxLength={6}
                className={errors.pincode ? "border-destructive" : ""}
              />
              {errors.pincode && <p className="text-sm text-destructive">{errors.pincode}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="is_default" checked={formData.is_default} onCheckedChange={toggleDefault} />
            <Label htmlFor="is_default" className="cursor-pointer">
              Set as default address
            </Label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/account/addresses")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isEditMode ? "Update Address" : "Add Address"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

