'use client'
import { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './cart-provider'
import { AuthProvider } from './auth-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#0f172a',
            border: '1px solid #e2e8f0',
            padding: '12px 16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            maxWidth: '350px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </AuthProvider>
  )
}