"use client"

import { useState } from "react"
import { Check, MapPin, MoreHorizontal, Pencil, Trash, PlusCircle } from "lucide-react"
import { createClient } from "@/utils/supabase/browser"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast"

interface Address {
  id: string
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

export default function AddressList({
  initialAddresses,
  userId,
}: {
  initialAddresses: Address[]
  userId: string
}) {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [deleteAddressId, setDeleteAddressId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSetDefault = async (addressId: string) => {
    try {
      await supabase.from("addresses").update({ is_default: false }).eq("user_id", userId)

      const { error } = await supabase.from("addresses").update({ is_default: true }).eq("id", addressId)

      if (error) {
        throw error
      }

      setAddresses((prevAddresses) =>
        prevAddresses.map((address) => ({
          ...address,
          is_default: address.id === addressId,
        })),
      )

      toast.success("Default address updated")
      router.refresh()
    } catch (error) {
      console.error("Error setting default address:", error)
      toast.error("Failed to update default address")
    }
  }

  const handleDelete = async (addressId: string) => {
    try {
      const { error } = await supabase.from("addresses").delete().eq("id", addressId)

      if (error) {
        throw error
      }

      setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId))

      toast.success("Address deleted successfully")
      router.refresh()
    } catch (error) {
      console.error("Error deleting address:", error)
      toast.error("Failed to delete address")
    }

    setDeleteAddressId(null)
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/20 rounded-lg">
        <div className="flex justify-center mb-4">
          <MapPin className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No addresses yet</h2>
        <p className="text-muted-foreground mb-6">You haven't added any shipping addresses yet.</p>
        <Button asChild>
          <a href="/account/addresses/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Address
          </a>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <Card key={address.id} className="relative">
            {address.is_default && <Badge className="absolute top-4 right-4">Default</Badge>}
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                <p className="font-medium">{address.recipient_name}</p>
                  <p className="font-medium">{address.address_line1}</p>
                  {address.address_line2 && <p>{address.address_line2}</p>}
                  <p>
                    {address.city}, {address.state} {address.pincode}
                  </p>
                  <p>{address.country}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {!address.is_default && (
                <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                  <Check className="h-4 w-4 mr-2" />
                  Set as Default
                </Button>
              )}
              {address.is_default && <div />}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <a href={`/account/addresses/edit/${address.id}`}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </a>
                  </DropdownMenuItem>
                  {!address.is_default && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => setDeleteAddressId(address.id)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteAddressId} onOpenChange={() => setDeleteAddressId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this address from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteAddressId && handleDelete(deleteAddressId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

