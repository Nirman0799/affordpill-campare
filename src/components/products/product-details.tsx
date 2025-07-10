//src/app/products/product-details.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { File, Minus, Plus, ShieldCheck, ShoppingCart, Clock, Truck, Package2, MapPin } from 'lucide-react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartContext } from '@/components/providers/cart-provider'
import { cn, formatCurrency } from '@/lib/utils'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { PincodeSelector } from '@/components/delivery/pincode-selector'
import { checkProductAvailability } from '@/app/actions/product-actions'
import { useEffect } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type DeliveryInfo = {
  pincode: string
  isServiceable: boolean
  deliveryTime: string
  deliveryFee: number
} | null

interface ProductDetailsProps {
  product: any
}



export default function NewProductDetails({ product }: ProductDetailsProps) {
  // Check if product name starts with "NB-" for nirman bio pharma products
  const isNirmanProduct = product.name.startsWith('NB-');
  
  // decide what to display in the marketed by field
  const marketedBy = isNirmanProduct 
    ? 'Nirman Bio Pharma' 
    : (product.marketer?.name || product.manufacturer?.name);

  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart } = useCartContext()
  const router = useRouter()
  
  const [deliveryInfo, setDeliveryInfo] = useLocalStorage<DeliveryInfo>('delivery-info', null)
  const [productAvailability, setProductAvailability] = useState<{
    isAvailable: boolean;
    message: string;
    deliveryTime?: string;
    deliveryFee?: number;
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    id: productId,
    name,
    generic_name,
    price,
    mrp,
    discount_percentage,
    stock_quantity,
    prescription_required,
    strength,
    units_per_pack,
    unit_type,
    manufacturer,
    pack_label,
  } = product
  
  const ingredients = product.product_ingredients?.map((pi: any) => ({
    name: pi.ingredient?.name || '',
    strength: pi.strength || '',
  })) || []
  
  const hasDiscount = (mrp || 0) > (price || 0)
  const isOutOfStock = (stock_quantity || 0) <= 0
  
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
    deliveryInfo && stock_quantity <= 0
      ? { ...deliveryInfo, isServiceable: false, deliveryTime: "Out of stock" }
      : deliveryInfo
      
  // Get the delivery info
  const effectiveDeliveryInfo = adjustedDeliveryInfo ? {
    pincode: adjustedDeliveryInfo.pincode,
    isServiceable: productAvailability ? productAvailability.isAvailable && adjustedDeliveryInfo.isServiceable : adjustedDeliveryInfo.isServiceable,
    deliveryTime: productAvailability?.deliveryTime || adjustedDeliveryInfo.deliveryTime,
    deliveryFee: productAvailability?.deliveryFee !== undefined ? productAvailability.deliveryFee : adjustedDeliveryInfo.deliveryFee
  } : null
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  
  const handleIncreaseQuantity = () => {
    const maxAllowed = Math.min(stock_quantity || 10, 10)
    if (quantity < maxAllowed) {
      setQuantity(quantity + 1)
    } else {
      toast.error(`Maximum ${maxAllowed} units allowed per order`, {
        position: 'bottom-right'
      })
    }
  }
  
  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error('This product is currently out of stock', { 
        position: 'bottom-right' 
      })
      return
    }
    
    setIsAddingToCart(true)
    try {
      const success = await addToCart(productId, quantity)
      
      if (success) {
        if (prescription_required) {
          toast.success(`${name} added to cart. Prescription will be required at checkout.`, {
            duration: 3000,
            position: 'bottom-right'
          })
        } else {
          toast.success(`${name} added to cart`, {
            duration: 2000,
            position: 'bottom-right'
          })
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Failed to add item to cart', {
        position: 'bottom-right'
      })
    } finally {
      setIsAddingToCart(false)
    }
  }
  
  const handleBuyNow = async () => {
    if (isOutOfStock) {
      toast.error('This product is currently out of stock', { 
        position: 'bottom-right' 
      })
      return
    }
    
    setIsAddingToCart(true)
    try {
      const success = await addToCart(productId, quantity)
      
      if (success) {
        if (prescription_required) {
          toast.success('Prescription will be required at checkout', {
            id: 'prescription-notice',
            position: 'bottom-right',
            duration: 3000
          })
        }
        router.push('/cart')
      }
    } catch (error) {
      console.error('Error during buy now:', error)
      toast.error('Failed to process your request', { 
        position: 'bottom-right' 
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="flex flex-col">
      {/* Product Title */}
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-1">
          {generic_name && (
            <p className="text-muted-foreground">{generic_name}</p>
          )}
          
          {/* {manufacturer?.name && (
            <Badge variant="outline" className="capitalize">
              By {manufacturer.name}
            </Badge>
          )} */}
           {/* Display markete if available,  fall back to manufacturer */}
           {marketedBy && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">
                {isNirmanProduct || product.marketer?.name ? 'Marketed by:' : 'Manufactured by:'}
              </span>{' '}
              {marketedBy}
            </p>
          )}
          {prescription_required && (
            <Badge variant="destructive" className="gap-1 uppercase text-xs">
              <File className="w-3 h-3" /> Prescription Required
            </Badge>
          )}
        </div>
      </div>
      
      {/* Ingredients */}
      {ingredients.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium">Active Ingredients:</p>
          <ul className="text-sm text-muted-foreground mt-1">
            {ingredients.map((ing: any, idx: number) => (
              <li key={idx} className="inline-block mr-2">
                {ing.name} {ing.strength && `(${ing.strength})`}
                {idx < ingredients.length - 1 ? ", " : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* price */}
      <div className="flex items-end gap-2 mb-4">
        <div className="text-2xl md:text-3xl font-bold">
          {formatCurrency(price)}
        </div>
        
        {hasDiscount && (
          <>
            <div className="text-muted-foreground line-through">
              {formatCurrency(mrp)}
            </div>
            <Badge className="bg-green-100 text-green-800 border-0">
              {Math.round(discount_percentage || 0)}% OFF
            </Badge>
          </>
        )}
      </div>
      
      <div className="mb-3">
        {isOutOfStock ? (
          <Badge variant="outline" className="text-destructive text-xs border-destructive/50">
            Out of Stock
          </Badge>
        ) : (
          <Badge variant="outline" className="text-green-700 text-xs border-green-500/50 bg-green-50">
            <ShieldCheck className="mr-1 h-3 w-3" />
            In Stock
          </Badge>
        )}
        
        <p className="text-sm text-muted-foreground mt-2">
          {pack_label && `${pack_label} • `}
          {units_per_pack} {units_per_pack > 1 ? unit_type + 's' : unit_type} per pack
          {strength && ` • ${strength}`}
        </p>
      </div>
      
      {prescription_required && (
  <div className="bg-red-50 border border-red-200 rounded-md p-2 mb-3 max-w-xs">
    <div className="flex items-center gap-2">
      <div className="text-red-600 flex-shrink-0">
        <File className="h-4 w-4" />
      </div>
      <p className="text-xs text-red-700">
        A valid prescription will be required at checkout.
      </p>
    </div>
  </div>
)}
      
      <div className="mb-3">
        {!adjustedDeliveryInfo ? (
          <div className="border rounded-lg p-2 flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground text-xs">Check delivery</span>
            <div className="ml-auto">
              <PincodeSelector hideText />
            </div>
          </div>
        ) : (
          <div className="border rounded-lg p-2 space-y-1.5 text-sm">
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "flex-shrink-0",
                        effectiveDeliveryInfo?.isServiceable ? "text-primary" : "text-red-500",
                      )}
                    >
                      {effectiveDeliveryInfo?.isServiceable ? (
                        <Truck className="h-4 w-4" />
                      ) : stock_quantity <= 0 ? (
                        <Package2 className="h-4 w-4" />
                      ) : (
                        <Truck className="h-4 w-4" />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="w-56">
                    <div className="space-y-1.5">
                      <p className="font-medium">
                        {effectiveDeliveryInfo?.isServiceable
                          ? `Delivery to ${effectiveDeliveryInfo.pincode}`
                          : stock_quantity <= 0
                            ? "Product out of stock"
                            : `Cannot deliver to ${effectiveDeliveryInfo?.pincode}`}
                      </p>
                      {effectiveDeliveryInfo?.isServiceable && (
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
                {effectiveDeliveryInfo?.isServiceable ? (
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
                    {stock_quantity <= 0 ? "Out of stock" : "Not deliverable"}
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

            {/* Delivery fee row */}
            {effectiveDeliveryInfo?.isServiceable && (
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
        )}
      </div>
      
      {/* Quantity Selector */}
      <div className="flex items-center mb-4">
        <span className="text-sm font-medium mr-3">Quantity:</span>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1 || isOutOfStock}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <div className="h-8 px-3 flex items-center justify-center border-y border-input">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={handleIncreaseQuantity}
            disabled={isOutOfStock || quantity >= (stock_quantity || 10) || quantity >= 10}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAddingToCart}
          variant="secondary"
          className="flex-1"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          onClick={handleBuyNow}
          disabled={isOutOfStock || isAddingToCart}
          className="flex-1"
        >
          Buy Now
        </Button>
      </div>
      
      
      <div className="border-t border-border mt-5 pt-4">
  <div className="flex flex-row items-center gap-4 flex-wrap">
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
      <div>
        <p className="text-xs font-medium">100% Genuine Product</p>
      </div>
    </div>
    
    <div className="flex items-center gap-2">
      <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
      <div>
        <p className="text-xs font-medium">Secure Checkout</p>
      </div>
    </div>
    
    <img 
      src="/payments.png" 
      alt="Payment Methods Accepted" 
      className="h-5 w-40"
    />
  </div>
</div>
    </div>
  )
}
