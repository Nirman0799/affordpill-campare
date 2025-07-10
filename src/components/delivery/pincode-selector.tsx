'use client'

import * as React from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { MapPin, Check, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/browser'

type DeliveryInfo = {
  pincode: string
  isServiceable: boolean
  deliveryTime: string
  deliveryFee: number
} | null

export function PincodeSelector() {
  const [deliveryInfo, setDeliveryInfo] = useLocalStorage<DeliveryInfo>('delivery-info', null)
  const [pincode, setPincode] = React.useState('')
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const [isChecking, setIsChecking] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const supabase = createClient()

  const checkPincode = async () => {
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setError('Please enter a valid 6-digit pincode')
      return
    }

    setIsChecking(true)
    setError(null)

    try {
      // Check if pincode exists in our delivery_zones
      const { data, error } = await supabase
        .from('delivery_zones')
        .select('*')
        .eq('pincode', pincode)
        .single()

      let newDeliveryInfo: DeliveryInfo = null

      if (data) {
        newDeliveryInfo = {
          pincode,
          isServiceable: data.is_serviceable,
          deliveryTime: data.delivery_time,
          deliveryFee: data.delivery_fee,
        }
      } else {
        // in case if pincode not found, check default settings or blacklist
        const { data: defaultData } = await supabase
          .from('delivery_zone_defaults')
          .select('*')
          .limit(1)
          .single()

        if (defaultData) {
          const isBlacklisted = defaultData.blacklisted_pincodes?.includes(pincode)

          newDeliveryInfo = {
            pincode,
            isServiceable: !isBlacklisted,
            deliveryTime: isBlacklisted ? 'Not available' : defaultData.default_delivery_time,
            deliveryFee: defaultData.default_delivery_fee,
          }
        }
      }

      if (newDeliveryInfo) {
        setDeliveryInfo(newDeliveryInfo)
        
        if (!newDeliveryInfo.isServiceable) {
          setError(`Sorry, we don't deliver to ${pincode} at this time`)
        } else {
          setIsDialogOpen(false)
        }
      }
    } catch (err) {
      console.error('Error checking pincode:', err)
      setError('Error checking pincode. Please try again.')
    } finally {
      setIsChecking(false)
    }
  }

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setPincode(value)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center text-sm gap-1">
          <MapPin className="h-4 w-4 text-primary" />
          {deliveryInfo?.pincode ? (
            <span className="flex items-center gap-1">
              Deliver to: <span className="font-medium">{deliveryInfo.pincode}</span>
              {deliveryInfo.isServiceable && (
                <Check className="h-3 w-3 text-green-600" />
              )}
            </span>
          ) : (
            <span>Select location</span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Check Delivery Availability</DialogTitle>
          <DialogDescription>
            Enter your PIN code to check delivery options in your area
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-end gap-2">
            <div className="flex-1 space-y-1">
              <label htmlFor="pincode" className="text-sm font-medium">
                PIN Code
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pincode"
                  value={pincode}
                  onChange={handlePincodeChange}
                  placeholder="Enter 6-digit PIN code"
                  className="pl-9"
                  maxLength={6}
                  inputMode="numeric"
                />
              </div>
            </div>
            <Button 
              onClick={checkPincode} 
              disabled={pincode.length !== 6 || isChecking}
            >
              {isChecking ? 'Checking...' : 'Check'}
            </Button>
          </div>

          {error && (
            <div className="text-sm text-red-500 flex items-center gap-1">
              <span>{error}</span>
            </div>
          )}

          {deliveryInfo && deliveryInfo.isServiceable && (
            <div className="bg-green-50 p-3 rounded-md border border-green-100">
              <div className="flex items-start gap-2">
                <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-800">
                    Delivery available at {deliveryInfo.pincode}
                  </h4>
                  <p className="text-xs text-green-700 mt-1">
                    Typically {deliveryInfo.deliveryTime.toLowerCase()} • 
                    Delivery fee: ₹{deliveryInfo.deliveryFee.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}