import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/utils/supabase/server"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  mrp: number
  discount_percentage: number
  image_url: string
  prescription_required: boolean
  marketer?: string  //  optional
}

// Nirman Bio Pharma marketer ID
const NIRMAN_BIO_PHARMA_ID = "607ab5b6-9e07-4531-b1e7-1eea28281e5b"

async function getNirmanBioPharmaProducts() {
  const supabase = await createClient()
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        price,
        mrp,
        discount_percentage,
        prescription_required,
        marketer:marketers(name),
        product_images(image_url, is_primary)
      `)
      .eq("is_active", true)
      .eq("marketer_id", NIRMAN_BIO_PHARMA_ID)
      .limit(12)
    
    if (error) {
      console.error("Error fetching Nirman Bio Pharma products:", error)
      return { products: [], error: error.message }
    }
    
    const processedProducts = data.map((product) => {
      const primaryImage = product.product_images?.find((img: any) => img.is_primary)
      const firstImage = product.product_images?.[0]
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        mrp: product.mrp,
        discount_percentage: product.discount_percentage,
        image_url: primaryImage?.image_url || firstImage?.image_url || "/images/placeholder.png",
        prescription_required: product.prescription_required,
        marketer: product.marketer?.name || undefined  
      }
    })
    
    return { products: processedProducts, error: null }
  } catch (error) {
    console.error("Unexpected error in getNirmanBioPharmaProducts:", error)
    return { products: [], error: "Failed to fetch Nirman Bio Pharma products" }
  }
}

export default async function NirmanBioPharmaProducts() {
  const { products, error } = await getNirmanBioPharmaProducts()

  if (error) {
    return <div className="text-center text-red-500">Failed to load Nirman Bio Pharma products</div>
  }

  if (products.length === 0) {
    return <div className="text-center text-muted-foreground">No Nirman Bio Pharma products found</div>
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start py-2">
          <h2 className="text-2xl font-bold tracking-tight">From Nirman Bio Pharma</h2>
          <p className="text-muted-foreground">Quality healthcare products from a trusted manufacturer</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 mt-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border bg-background"
            >
              <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10">
                <span className="sr-only">View {product.name}</span>
              </Link>

              <div className="aspect-square overflow-hidden bg-muted">
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105 h-full w-full"
                />
              </div>

              <div className="flex-1 p-4">
                <h3 className="font-medium line-clamp-2">{product.name}</h3>

                {product.marketer && (
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{product.marketer}</p>
                )}

                <div className="mt-2 flex items-center gap-2">
                  <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                  {product.mrp > product.price && (
                    <>
                      <span className="text-sm text-muted-foreground line-through">₹{product.mrp.toFixed(2)}</span>
                      <span className="text-xs font-medium text-green-600">
                        {Math.round(product.discount_percentage)}% off
                      </span>
                    </>
                  )}
                </div>

                {product.prescription_required && (
                  <div className="mt-2">
                    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                      Rx Required
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
