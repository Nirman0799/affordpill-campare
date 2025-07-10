"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Banknote } from "lucide-react"

type PaymentMethodSelectorProps = {
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}

export default function PaymentMethodSelector({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="cod" id="payment-cod" className="mt-1" />
            <div className="grid gap-1.5 w-full">
              <Label htmlFor="payment-cod" className="font-medium flex items-center">
                <Banknote className="h-4 w-4 mr-2" />
                Cash on Delivery
              </Label>
              <p className="text-sm text-muted-foreground">Pay with cash when your order is delivered</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <RadioGroupItem value="online" id="payment-online" className="mt-1" />
            <div className="grid gap-1.5 w-full">
              <Label htmlFor="payment-online" className="font-medium flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Online Payment
              </Label>
              <p className="text-sm text-muted-foreground">Pay now using credit/debit card or UPI</p>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

