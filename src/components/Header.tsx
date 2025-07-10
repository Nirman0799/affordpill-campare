'use client'
import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/components/providers/auth-provider'
import { MobileNav } from './navigation/MobileNav'
import { DesktopNav } from './navigation/DesktopNav'

export default function Header() {
  const { user, loading } = useAuth()
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-1 max-w-7xl mx-auto">
        <div className="flex items-center h-full py-0">
          <Link href="/" className="flex items-center h-full">
            <Image
              src="/logo.png"
              alt="AffordPill Logo"
              width={220}
              height={64}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
        </div>
        
        <div className="hidden md:block flex-1">
          <DesktopNav />
        </div>
        
        <div className="md:hidden">
          <MobileNav user={user} loading={loading} />
        </div>
      </div>
    </header>
  )
}