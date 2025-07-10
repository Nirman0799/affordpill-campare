"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoginForm from "@/app/login/login-form"
import PhoneLoginForm from "@/app/phone-login/phone-login-form"
import { Mail, Phone } from "lucide-react"

export function AuthTabs({ redirectUrl }: { redirectUrl?: string }) {
  const [activeTab, setActiveTab] = useState("phone") // default to phone

  return (
    <Tabs defaultValue="phone" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="phone" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>Phone</span>
        </TabsTrigger>
        <TabsTrigger value="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>Email</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="phone" className="mt-0">
        <PhoneLoginForm redirectUrl={redirectUrl} isEmbedded={true} />
      </TabsContent>

      <TabsContent value="email" className="mt-0">
        <LoginForm redirectUrl={redirectUrl} />
      </TabsContent>
    </Tabs>
  )
}

