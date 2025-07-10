import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">View and track your orders</p>
        </div>
      </div>

      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    </div>
  )
}

