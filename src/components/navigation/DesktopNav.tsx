'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronDown, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { PincodeSelector } from '../delivery/pincode-selector'
import { ProductSearch } from '../search/product-search'
import { CartIcon } from '../cart/CartIcon'
import ProfileDropdown from '../ProfileDropdown'
import { useAuth } from '@/components/providers/auth-provider'

const menuItems = [
  {
    name: "Categories",
    href: "/categories",
    submenu: [
      { name: "Health Supplements", href: "/categories/health-supplement" },
        { name: "Pain Relief", href: "/categories/pain-relief" },
        { name: "Immunity Support", href: "/categories/immunity-support" },
        { name: "Sexual Wellness", href: "/categories/sexual-wellness" },
        { name: "Stomach care", href: "/categories/laxative-and-antacid" },
        { name: "Hair care", href: "/categories/hair-care" },
    ],
  },
  { name: "Shop All", href: "/products" },
  { name: "Upload Prescription", href: "/upload" }
]

export function DesktopNav() {
  const { user, loading } = useAuth()

  return (
    <div className="flex w-full justify-between items-center pl-4">
      <nav className="flex md:gap-2 lg:gap-4">
        {menuItems.map((item) => (
          <div key={item.name} className="relative">
            {item.submenu ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 px-2">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {item.submenu.map((subitem) => (
                    <DropdownMenuItem key={subitem.name} asChild>
                      <Link href={subitem.href}>{subitem.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" asChild className="px-2">
                <Link href={item.href}>{item.name}</Link>
              </Button>
            )}
          </div>
        ))}
      </nav>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center gap-2">
        <PincodeSelector />
        <ProductSearch />
        
        <div className="flex gap-2">
          <CartIcon />
          
          {loading ? (
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50">
              <span className="h-4 w-4 animate-pulse rounded-full" />
            </Button>
          ) : user ? (
            <ProfileDropdown user={user} />
          ) : (
            <Button size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}