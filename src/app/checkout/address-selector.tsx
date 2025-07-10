//src/app/checkout/address-selector.tsx
"use client"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, MapPin } from "lucide-react"

type AddressSelectorProps = {
  addresses: any[]
  selectedAddressId: string
  setSelectedAddressId: (id: string) => void
}

export default function AddressSelector({ addresses, selectedAddressId, setSelectedAddressId }: AddressSelectorProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Delivery Address</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/account/addresses/new?redirect=/checkout">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Address
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {addresses.length > 0 ? (
          <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="flex items-start space-x-3">
                <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                <div className="grid gap-1.5">
                  <Label htmlFor={`address-${address.id}`} className="font-medium">
                    {address.address_line1}
                    {address.is_default && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Default</span>
                    )}
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    {address.address_line2 && <p>{address.address_line2}</p>}
                    <p>
                      {address.city}, {address.state} {address.pincode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <MapPin className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No addresses found</h3>
            <p className="text-sm text-muted-foreground mb-4">Please add a delivery address to continue</p>
            <Button asChild>
              <Link href="/account/addresses/new?redirect=/checkout">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Address
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

