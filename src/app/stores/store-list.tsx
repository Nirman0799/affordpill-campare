"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Store } from "./store-data"

export default function StoreList({ stores }: { stores: Store[] }) {
  if (stores.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No stores found in this region</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {stores.map((store) => (
        <StoreListItem key={`${store.name}-${store.number}`} store={store} />
      ))}
    </div>
  )
}

function StoreListItem({ store }: { store: Store }) {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardContent className="p-0">
        <div className="bg-gray-100 p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{store.name}</h3>
            <Badge variant="outline" className="bg-white">
              {store.region}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-1" />
            <p className="text-sm">{store.address}</p>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium">{store.number}</p>
          </div>

          <div className="pt-2">
            <Button variant="outline" className="w-full" asChild>
              <a href={`tel:${store.number}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call Store
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

