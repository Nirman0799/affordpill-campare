'use client'

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, ShoppingBag, MapPin, FileText } from "lucide-react"


export default function AccountNavigation({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  const getActiveValue = () => {
    if (pathname?.includes("/account/orders")) return "orders"
    if (pathname?.includes("/account/addresses")) return "addresses"
    if (pathname?.includes("/account/prescriptions")) return "prescriptions"
    return "profile"
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="w-full overflow-auto">
          <Tabs defaultValue={getActiveValue()} className="w-full">
            <TabsList className="w-full md:w-auto grid grid-cols-4 md:inline-flex md:px-4">
              <TabsTrigger value="profile" asChild>
                <Link href="/account/profile" className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100">
                    <User className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <span className="hidden md:inline">Profile</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="orders" asChild>
                <Link href="/account/orders" className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-amber-100">
                    <ShoppingBag className="h-3.5 w-3.5 text-amber-600" />
                  </div>
                  <span className="hidden md:inline">Orders</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="addresses" asChild>
                <Link href="/account/addresses" className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
                    <MapPin className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <span className="hidden md:inline">Addresses</span>
                </Link>
              </TabsTrigger>
              <TabsTrigger value="prescriptions" asChild>
                <Link href="/account/prescriptions" className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-6 w-6 rounded-full bg-orange-100">
                    <FileText className="h-3.5 w-3.5 text-orange-600" />
                  </div>
                  <span className="hidden md:inline">Prescriptions</span>
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card className="p-6">
          {children}
        </Card>
      </div>
    </div>
  )
}