import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { ShippingBanner } from '@/components/ShippingBanner'
import Footer from '@/components/layout/footer';
import { Providers } from '@/components/providers/providers'
import CrispChat from "@/components/crisp-chat"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AffordPill - Save 90% on your medical bills',
  description: 'Get affordable medications delivered to your doorstep',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <ShippingBanner />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
        <Footer />
        <CrispChat />
      </body>
    </html>
  )
}