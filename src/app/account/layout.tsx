import type { ReactNode } from "react"
import { checkAuth } from "@/utils/auth"
import AccountNavigation from './navigation-client'

export default async function AccountLayout({
  children,
}: {
  children: ReactNode
}) {
  await checkAuth()

  return <AccountNavigation>{children}</AccountNavigation>
}