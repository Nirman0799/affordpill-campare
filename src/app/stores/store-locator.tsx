"use client"

import { useState, useMemo } from "react"
import { MapPin, Phone, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { storeData } from "./store-data"

export default function StoreLocator() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")

  const filteredStores = useMemo(() => {
    return storeData.filter((store) => {
      const matchesSearch =
        searchQuery === "" ||
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRegion = selectedRegion === "all" || store.region.toLowerCase() === selectedRegion.toLowerCase()

      return matchesSearch && matchesRegion
    })
  }, [searchQuery, selectedRegion])

  const regions = ["Central Delhi", "North Delhi", "South Delhi", "Noida", "Delhi Border"]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Find a Store Near You</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-8">
          Locate your nearest Affordpill store across Delhi, Noida, and surrounding areas for all your pharmaceutical
          needs.
        </p>

        <div className="w-full max-w-xl relative mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by store name or address..."
              className="pl-12 py-6 text-base rounded-full border shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full max-w-4xl mb-8">
          <div className="flex overflow-x-auto gap-2 justify-center pb-2">
            <Button
              variant={selectedRegion === "all" ? "default" : "outline"}
              className={`rounded-full px-6 py-2 ${selectedRegion === "all" ? "bg-[#0f172a] text-white" : "bg-[#f1f5f9] text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
              onClick={() => setSelectedRegion("all")}
            >
              All
            </Button>

            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region.toLowerCase() ? "default" : "outline"}
                className={`rounded-full px-6 py-2 ${selectedRegion === region.toLowerCase() ? "bg-[#0f172a] text-white" : "bg-[#f1f5f9] text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
                onClick={() => setSelectedRegion(region.toLowerCase())}
              >
                {region}
              </Button>
            ))}
          </div>

          <StoreGrid stores={filteredStores} />
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Need Help Finding a Store?</h2>
            <p className="text-muted-foreground">
              Call our customer support at <span className="font-medium">01204094276</span> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StoreGrid({ stores }) {
  if (stores.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No stores found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <StoreCard key={`${store.name}-${store.number}`} store={store} />
      ))}
    </div>
  )
}

function StoreCard({ store }) {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardContent className="p-0">
        <div className="bg-gray-100 p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl">{store.name}</h3>
            <Badge variant="outline" className="bg-white">
              {store.region}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-4">
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

