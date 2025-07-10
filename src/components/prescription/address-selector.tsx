// src/components/prescription/address-selector.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, MapPin, PlusCircle, Truck } from "lucide-react";
import { createClient } from "@/utils/supabase/browser";
import Link from "next/link";
import toast from "react-hot-toast";

interface Address {
  id: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  is_default: boolean;
}

interface PrescriptionAddressSelectorProps {
  addresses: Address[];
  invoiceId: string;
  subtotal: number;
}

export default function PrescriptionAddressSelector({ 
  addresses, 
  invoiceId,
  subtotal
}: PrescriptionAddressSelectorProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find(addr => addr.is_default);
      const addressToUse = defaultAddress || addresses[0];
      setSelectedAddressId(addressToUse.id);
      calculateDeliveryFee(addressToUse.pincode);
    }
  }, [addresses]);

  // Calculate delivery fee based on pincode
  const calculateDeliveryFee = async (pincode: string) => {
    setIsLoading(true);
    try {
      const { data: deliveryZone, error: zoneError } = await supabase
        .from('delivery_zones')
        .select('*')
        .eq('pincode', pincode)
        .single();

      if (!zoneError && deliveryZone) {
        setDeliveryFee(deliveryZone.is_serviceable ? deliveryZone.delivery_fee : 0);
        setDeliveryTime(deliveryZone.is_serviceable ? deliveryZone.delivery_time : "Not Available");
        
        if (!deliveryZone.is_serviceable) {
          toast.error(`Delivery not available for pincode ${pincode}`);
        }
      } else {
        const { data: defaultSettings, error: defaultError } = await supabase
          .from('delivery_zone_defaults')
          .select('*')
          .limit(1)
          .single();
          
        if (!defaultError && defaultSettings) {
          const isBlacklisted = defaultSettings.blacklisted_pincodes && 
                               defaultSettings.blacklisted_pincodes.includes(pincode);
          
          if (isBlacklisted) {
            setDeliveryFee(0);
            setDeliveryTime("Not Available");
            toast.error(`Delivery not available for pincode ${pincode}`);
          } else {
            setDeliveryFee(defaultSettings.default_delivery_fee);
            setDeliveryTime(defaultSettings.default_delivery_time);
          }
        } else {
          setDeliveryFee(49);
          setDeliveryTime("3-5 Days");
        }
      }
      
      const summarySection = document.getElementById("summary-section");
      if (summarySection) {
        const deliveryFeeElement = document.getElementById("delivery-fee");
        const totalAmountElement = document.getElementById("total-amount");
        
        if (deliveryFeeElement && totalAmountElement) {
          const formattedFee = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(deliveryFee);
          
          const totalAmount = subtotal + deliveryFee;
          const formattedTotal = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(totalAmount);
          
          deliveryFeeElement.textContent = formattedFee;
          totalAmountElement.textContent = formattedTotal;
        }
      }
    } catch (error) {
      console.error("Error calculating delivery fee:", error);
      toast.error("Failed to calculate delivery fee");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const address = addresses.find(addr => addr.id === addressId);
    if (address) {
      calculateDeliveryFee(address.pincode);
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }
    
    const totalAmount = subtotal + deliveryFee;
    

    sessionStorage.setItem('prescription_checkout', JSON.stringify({
      addressId: selectedAddressId,
      deliveryFee: deliveryFee,
      totalAmount: totalAmount
    }));
    
    router.push(`/account/prescriptions/invoice/${invoiceId}?from=checkout`);
  };

  if (addresses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Delivery Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <MapPin className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No addresses found</h3>
            <p className="text-sm text-muted-foreground mb-4">Please add a delivery address to continue</p>
            <Button asChild>
              <Link href={`/account/addresses/new?redirect=/account/prescriptions/checkout/${invoiceId}`}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Address
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Delivery Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedAddressId === address.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
              }`}
              onClick={() => handleAddressSelect(address.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">
                    {address.address_line1}
                    {address.address_line2 && `, ${address.address_line2}`}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-sm text-muted-foreground">{address.country}</p>
                </div>
                {address.is_default && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded ml-2 shrink-0">
                    Default
                  </span>
                )}
              </div>
            </div>
          ))}
          <Button variant="outline" asChild className="w-full mt-2">
            <Link href={`/account/addresses/new?redirect=/account/prescriptions/checkout/${invoiceId}`}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Address
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Delivery Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Time:</span>
            <span>{deliveryTime || "Calculating..."}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee:</span>
            <span>{new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(deliveryFee)}</span>
          </div>
          
          <Button 
            onClick={handleProceedToPayment}
            disabled={isLoading || deliveryTime === "Not Available"}
            className="w-full mt-4"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Proceed to Payment
          </Button>
        </CardContent>
      </Card>
    </>
  );
}