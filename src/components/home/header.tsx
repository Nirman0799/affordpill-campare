"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { CartIcon } from "@/components/cart/CartIcon"

export function HomeHeader() {
  return (
    <header className="flex items-center p-4 border-b">
      <div className="bg-gray-100 rounded-full p-3 mr-4">
        <Menu className="h-6 w-6" />
      </div>
      <Link href="/home" className="mr-auto">
        <Image
          src="/logo.png?height=80&width=160"
          alt="AffordPill Logo"
          width={160}
          height={80}
          className="object-contain h-10"
        />
      </Link>
      <div className="bg-gray-100 rounded-full p-3">
        <Link href="/cart">
          <CartIcon className="h-6 w-6" />
        </Link>
      </div>
    </header>
  )
}

