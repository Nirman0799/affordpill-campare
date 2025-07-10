import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
  } from "@/components/ui/breadcrumb"
  import { Home } from "lucide-react"
  
  interface ProductBreadcrumbProps {
    productName: string
    categoryName?: string
    categorySlug?: string
  }
  
  export default function ProductBreadcrumb({
    productName,
    categoryName,
    categorySlug
  }: ProductBreadcrumbProps) {
    return (
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4 opacity-70" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          <BreadcrumbSeparator />
          
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          
          {categoryName && categorySlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/categories/${categorySlug}`}>
                  {categoryName}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
          
          <BreadcrumbSeparator />
          
          <BreadcrumbItem className="max-w-[200px] truncate font-medium text-foreground">
            {productName}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }