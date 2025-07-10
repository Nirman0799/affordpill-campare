import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Addresses</h1>
          <p className="text-muted-foreground">Manage your shipping addresses</p>
        </div>
        <div className="h-10 w-[140px] bg-muted rounded-md animate-pulse" />
      </div>

      <div className="flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading your addresses...</p>
        </div>
      </div>
    </div>
  )
}

