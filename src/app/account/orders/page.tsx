// src/app/account/orders/page.tsx
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Package2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import OrdersTable from "./orders-table"
import OrdersMobile from "./orders-mobile"

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return redirect("/login?redirect=/account/orders")
  }

  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1
  const pageSize = 10
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data: regularOrders, count: regularCount } = await supabase
    .from("orders")
    .select("*, address:addresses(*)", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to)

  const { data: prescriptionOrders, count: prescriptionCount } = await supabase
    .from("prescription_orders")
    .select(`
      *,
      address:address_id (*),
      prescription:prescription_id (id, file_url),
      invoice:invoice_id (id, total_amount)
    `, { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to)


  const combinedOrders = [
    ...(regularOrders || []).map(order => ({
      ...order,
      orderType: 'regular'
    })),
    ...(prescriptionOrders || []).map(order => ({
      ...order,
      orderType: 'prescription'
    }))
  ].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const totalCount = (regularCount || 0) + (prescriptionCount || 0)
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">View and track your orders</p>
        </div>
        <Button asChild variant="outline" className="mt-4 md:mt-0">
          <Link href="/products">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>

      {combinedOrders.length > 0 ? (
        <>
          <div className="hidden md:block">
            <OrdersTable orders={combinedOrders} />
          </div>

          <div className="md:hidden">
            <OrdersMobile orders={combinedOrders} />
          </div>

          {/* pages */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center gap-1">
                {page > 1 && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders?page=${page - 1}`}>Previous</Link>
                  </Button>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Button key={pageNum} variant={pageNum === page ? "default" : "outline"} size="sm" asChild>
                    <Link href={`/account/orders?page=${pageNum}`}>{pageNum}</Link>
                  </Button>
                ))}

                {page < totalPages && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders?page=${page + 1}`}>Next</Link>
                  </Button>
                )}
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-muted/20 rounded-lg">
          <div className="flex justify-center mb-4">
            <Package2 className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven't placed any orders yet. Start shopping to place your first order.
          </p>
          <Button asChild>
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}