"use client"

import Link from "next/link"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


function formatDate(dateString: string): string {
  if (!dateString) return ""

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount)
}

function getStatusVariant(status: string): "default" | "outline" | "secondary" | "destructive" {
  switch (status.toLowerCase()) {
    case "delivered":
      return "default"
    case "shipped":
      return "secondary"
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

export default function OrdersTable({ orders }: { orders: any[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.order_number}</TableCell>
            <TableCell>{formatDate(order.created_at)}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{order.payment_method === "cod" ? "Cash on Delivery" : "Online"}</Badge>
            </TableCell>
            <TableCell>{formatCurrency(order.total)}</TableCell>
            <TableCell className="text-right">
  <Button size="sm" variant="ghost" asChild>
    <Link href={order.orderType === 'prescription' 
      ? `/account/orders/prescription/${order.id}`
      : `/order-success?id=${order.id}`}>
      <Eye className="h-4 w-4 mr-2" />
      View
    </Link>
  </Button>
</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

