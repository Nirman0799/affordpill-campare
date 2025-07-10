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
  manufacturer: string
}

async function getCardiacCareProducts() {
  const supabase = await createClient()
  try {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", "heart-health")
      .single()

    if (categoryError) {
      console.error("Error fetching cardiac care category:", categoryError)
      return { products: [], error: categoryError.message }
    }

    // fetch products with required category ID
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
        manufacturer:manufacturers(name),
        product_images(image_url, is_primary)
      `)
      .eq("is_active", true)
      .eq("category_id", categoryData.id)
      .limit(8)

    if (error) {
      console.error("Error fetching cardiac care products:", error)
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
      }
    })

    return { products: processedProducts, error: null }
  } catch (error) {
    console.error("Unexpected error in getCardiacCareProducts:", error)
    return { products: [], error: "Failed to fetch cardiac care products" }
  }
}

export default async function CardiacCareProducts() {
  const { products, error } = await getCardiacCareProducts()

  if (error) {
    return <div className="text-center text-red-500">Failed to load cardiac care products</div>
  }

  if (products.length === 0) {
    return <div className="text-center text-muted-foreground">No cardiac care products found</div>
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 items-start py-2">
          <h2 className="text-2xl font-bold tracking-tight">Cardiac Care Products</h2>
          <p className="text-muted-foreground">Essential medications for heart health and cardiovascular wellness</p>
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

        <div className="mt-8 text-center">
          <Link
            href="/categories/heart-health"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          >
            View All Cardiac Care Products
          </Link>
        </div>
      </div>
    </section>
  )
}

