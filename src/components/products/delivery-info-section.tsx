'use client'

import { useEffect, useState } from 'react'
import { Truck, Clock, Package2, MapPin } from 'lucide-react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { Button } from '@/components/ui/button'
import { checkProductAvailability } from '@/app/actions/product-actions'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PincodeSelector } from '@/components/delivery/pincode-selector'

type DeliveryInfo = {
  pincode: string
  isServiceable: boolean
  deliveryTime: string
  deliveryFee: number
} | null

interface DeliveryInfoSectionProps {
  productId: string
  stockQuantity: number
}

export default function DeliveryInfoSection({ productId, stockQuantity = 0 }: DeliveryInfoSectionProps) {
  const [deliveryInfo, setDeliveryInfo] = useLocalStorage<DeliveryInfo>('delivery-info', null)
  const [productAvailability, setProductAvailability] = useState<{
    isAvailable: boolean;
    message: string;
    deliveryTime?: string;
    deliveryFee?: number;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const checkAvailability = async () => {
      if (!deliveryInfo?.pincode || !productId) return
      
      setIsLoading(true)
      try {
        const result = await checkProductAvailability(productId, deliveryInfo.pincode)
        
        if (result.error) {
          console.error('Error checking availability:', result.error)
          setProductAvailability({
            isAvailable: false,
            message: result.message || 'Could not check availability'
          })
          return
        }
        
        setProductAvailability({
          isAvailable: result.isAvailable,
          message: result.message,
          deliveryTime: result.deliveryTime,
          deliveryFee: result.deliveryFee
        })
      } catch (error) {
        console.error('Error checking product availability:', error)
        setProductAvailability({
          isAvailable: false,
          message: 'Error checking availability'
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAvailability()
  }, [deliveryInfo?.pincode, productId])


  const adjustedDeliveryInfo =
    deliveryInfo && stockQuantity <= 0
      ? { ...deliveryInfo, isServiceable: false, deliveryTime: "Out of stock" }
      : deliveryInfo

  if (!adjustedDeliveryInfo) {
    return (
      <div className="border rounded-lg p-2 flex items-center gap-2 text-sm">
        <Truck className="h-4 w-4 text-primary" />
        <span className="text-muted-foreground text-xs">Check delivery</span>
        <div className="ml-auto">
          <PincodeSelector hideText />
        </div>
      </div>
    )
  }

  const effectiveDeliveryInfo = {
    pincode: adjustedDeliveryInfo.pincode,
    isServiceable: productAvailability ? productAvailability.isAvailable && adjustedDeliveryInfo.isServiceable : adjustedDeliveryInfo.isServiceable,
    deliveryTime: productAvailability?.deliveryTime || adjustedDeliveryInfo.deliveryTime,
    deliveryFee: productAvailability?.deliveryFee !== undefined ? productAvailability.deliveryFee : adjustedDeliveryInfo.deliveryFee
  }

  return (
    <div className="border rounded-lg p-2 space-y-1.5 text-sm">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex-shrink-0",
                  effectiveDeliveryInfo.isServiceable ? "text-primary" : "text-red-500",
                )}
              >
                {effectiveDeliveryInfo.isServiceable ? (
                  <Truck className="h-4 w-4" />
                ) : stockQuantity <= 0 ? (
                  <Package2 className="h-4 w-4" />
                ) : (
                  <Truck className="h-4 w-4" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="w-56">
              <div className="space-y-1.5">
                <p className="font-medium">
                  {effectiveDeliveryInfo.isServiceable
                    ? `Delivery to ${effectiveDeliveryInfo.pincode}`
                    : stockQuantity <= 0
                      ? "Product out of stock"
                      : `Cannot deliver to ${effectiveDeliveryInfo.pincode}`}
                </p>
                {effectiveDeliveryInfo.isServiceable && (
                  <>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{effectiveDeliveryInfo.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Package2 className="h-3 w-3" />
                      <span>Delivery fee: ₹{effectiveDeliveryInfo.deliveryFee.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="min-w-0 flex-1 flex items-center gap-1">
          {effectiveDeliveryInfo.isServiceable ? (
            <>
              <span className="text-xs text-muted-foreground">Pin</span>
              <span className="font-medium truncate">{effectiveDeliveryInfo.pincode}</span>
              <span className="text-muted-foreground">•</span>
              <Clock className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-green-600 truncate">
                {effectiveDeliveryInfo.deliveryTime.replace("Delivery in ", "")}
              </span>
            </>
          ) : (
            <span className="text-xs text-red-600 font-medium truncate">
              {stockQuantity <= 0 ? "Out of stock" : "Not deliverable"}
            </span>
          )}
        </div>

        <PincodeSelector>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 px-2 ml-auto border-dashed"
          >
            <MapPin className="h-3 w-3 mr-1" />
            Change
          </Button>
        </PincodeSelector>
      </div>

      {/* Delivery fee  */}
      {effectiveDeliveryInfo.isServiceable && (
        <div className="flex items-center gap-1.5 pl-5">
          <span className="text-xs">
            Delivery fee: <span className="font-medium">₹{effectiveDeliveryInfo.deliveryFee.toFixed(2)}</span>
          </span>

          {effectiveDeliveryInfo.deliveryFee === 0 && (
            <Badge
              variant="outline"
              className="text-[10px] h-4 px-1.5 ml-1 border-green-500 text-green-600"
            >
              Free
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}