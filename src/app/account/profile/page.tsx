//src/app/account/profile/page.tsx
import { checkAuth, getUserProfile } from '@/utils/auth'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Mail, Phone, User } from 'lucide-react'
import Link from "next/link"

export default async function ProfilePage() {
  // get-  user profile
  const user = await checkAuth()
  const profile = await getUserProfile()
  
  if (!profile) {
    redirect('/login')
  }
  
  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  
  return (
    <div className="container max-w-3xl py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/40 py-3 px-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-4 w-4" />
            {profile.first_name || ''} {profile.last_name || ''}
            <Badge variant="outline" className="ml-auto">
              {profile.role?.charAt(0).toUpperCase() + profile.role?.slice(1) || 'Customer'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            <li className="flex items-center px-4 py-2.5 text-sm">
              <Mail className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <span className="w-24 font-medium">Email</span>
              <span className="text-muted-foreground">{profile.email}</span>
            </li>
            
            <li className="flex items-center px-4 py-2.5 text-sm">
              <Phone className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <span className="w-24 font-medium">Phone</span>
              <span className="text-muted-foreground">{profile.phone_number || 'Not provided'}</span>
            </li>
            
            <li className="flex items-center px-4 py-2.5 text-sm">
              <CalendarIcon className="h-4 w-4 mr-3 text-muted-foreground flex-shrink-0" />
              <span className="w-24 font-medium">Member since</span>
              <span className="text-muted-foreground">{memberSince}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
