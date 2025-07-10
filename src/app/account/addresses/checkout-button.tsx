"use client"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = () => {
    setIsLoading(true)
    try {
      // -- checkout page
      router.push("/checkout")
    } catch (error) {
      console.error("Error navigating to checkout:", error)
      toast.error("Unable to proceed to checkout")
      setIsLoading(false)
    }
  }

  return (
    <Button 
      size="lg" 
      onClick={handleCheckout} 
      disabled={isLoading}
      className="px-8"
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ShoppingBag className="h-4 w-4 mr-2" />
          Proceed to Checkout
        </>
      )}
    </Button>
  )
}