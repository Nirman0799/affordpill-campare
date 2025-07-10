import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(value)
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A"
  
  try {
    const date = new Date(dateString)
    
    if (isNaN(date.getTime())) {
      return "Invalid date"
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid date"
  }
}