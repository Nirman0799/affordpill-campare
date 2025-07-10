'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, User, Menu, X, Loader2, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import ProfileDropdown from '../ProfileDropdown'
import { useCartContext } from '@/components/providers/cart-provider'
import { createClient } from '@/utils/supabase/browser'

interface ProductType {
  id: string
  name: string
  price: number
  slug: string
  image?: string
}

interface MobileNavProps {
  user: any
  loading: boolean
}

const menuItems = [
  {
    name: "Categories",
    href: "/categories",
    submenu: [
      { name: "Health Supplements", href: "/categories/health-supplement" },
      { name: "Pain Relief", href: "/categories/pain-relief" },
      { name: "Immunity Support", href: "/categories/immunity-support" },
      { name: "Sexual Wellness", href: "/categories/sexual-wellness" },
      { name: "Stomach care", href: "/categories/laxative-and-antacid" },
      { name: "Hair care", href: "/categories/hair-care" },
    ],
  },
  { name: "Shop All", href: "/products" },
  { name: "Upload Prescription", href: "/upload" }
]

export function MobileNav({ user, loading }: MobileNavProps) {
    const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [searchResults, setSearchResults] = React.useState<ProductType[]>([])
    const [isSearching, setIsSearching] = React.useState(false)
    const [openCategories, setOpenCategories] = React.useState(false)
    const { cartCount } = useCartContext()
    const router = useRouter()
    const searchInputRef = React.useRef<HTMLInputElement>(null)
    const supabase = createClient()

    // Search function
    React.useEffect(() => {
      const searchProducts = async () => {
        if (!searchQuery.trim()) {
          setSearchResults([])
          return
        }

        setIsSearching(true)
        try {
          const { data, error } = await supabase
            .from("products")
            .select(`
              id,
              name,
              slug,
              price,
              product_images(image_url, is_primary)
            `)
            .eq("is_active", true)
            .or(`name.ilike.%${searchQuery}%,generic_name.ilike.%${searchQuery}%`)
            .limit(5)
            
          if (error) {
            console.error("Search error:", error)
            return
          }
          
          if (data) {
            const processedResults = data.map(product => ({
              id: product.id,
              name: product.name,
              price: product.price,
              slug: product.slug,
              image: product.product_images?.find((img: any) => img.is_primary)?.image_url || 
                    product.product_images?.[0]?.image_url || 
                    "/images/placeholder.png"
            }))
            setSearchResults(processedResults)
          }
        } catch (error) {
          console.error('Error searching products:', error)
        } finally {
          setIsSearching(false)
        }
      }

      const timeoutId = setTimeout(() => {
        if (searchQuery.trim()) {
          searchProducts()
        }
      }, 300)

      return () => clearTimeout(timeoutId)
    }, [searchQuery, supabase])

    // Focus input when search modal opens
    React.useEffect(() => {
      if (mobileSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus()
      }
    }, [mobileSearchOpen])

    const handleSubmitSearch = (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        setMobileSearchOpen(false)
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      }
    }

    const handleProductClick = (slug: string) => {
      setMobileSearchOpen(false)
      router.push(`/products/${slug}`)
    }
  
    return (
      <>
        <div className="flex items-center justify-between w-full">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-auto">
              <SheetHeader className="pb-6">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              
              <nav className="space-y-1">
                {menuItems.map((item) => 
                  item.submenu ? (
                    <Collapsible
                      key={item.name}
                      open={openCategories}
                      onOpenChange={setOpenCategories}
                      className="w-full"
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between font-normal h-12"
                        >
                          {item.name}
                          <ChevronDown 
                            className={`h-4 w-4 transition-transform duration-200 ${
                              openCategories ? "transform rotate-180" : ""
                            }`} 
                          />
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <SheetClose asChild key={subItem.name}>
                            <Link href={subItem.href}>
                              <Button
                                variant="ghost"
                                className="w-full justify-start font-normal h-10"
                              >
                                {subItem.name}
                              </Button>
                            </Link>
                          </SheetClose>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SheetClose asChild key={item.name}>
                      <Link href={item.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal h-12"
                        >
                          {item.name}
                        </Button>
                      </Link>
                    </SheetClose>
                  )
                )}
              </nav>
              
              {/* Account */}
              <div className="border-t mt-6 pt-6">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : user ? (
                  <div className="space-y-1">
                    <p className="px-4 text-sm font-medium">Account</p>
                    <SheetClose asChild>
                      <Link href="/account/profile">
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal"
                        >
                          My Profile
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/account/orders">
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal"
                        >
                          My Orders
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/account/addresses">
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal"
                        >
                          My Addresses
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/account/prescriptions">
                        <Button
                          variant="ghost"
                          className="w-full justify-start font-normal"
                        >
                          My Prescriptions
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                ) : (
                  <div className="space-y-4 px-2">
                    <SheetClose asChild>
                      <Link href="/login">
                        <Button className="w-full">
                          Sign In
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/signup">
                        <Button variant="outline" className="w-full">
                          Create Account
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </div>

              {/* Help */}
              <div className="border-t mt-6 pt-6">
                <p className="px-4 text-sm font-medium mb-2">Help & Support</p>
                <SheetClose asChild>
                  <Link href="/contact">
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/faq">
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                    >
                      FAQ
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center bg-gray-200 rounded-full px-2 py-1.5">
            {/* Search button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-9 w-9 mx-1"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <Search className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Search</span>
            </Button>
            
            {/* Cart button and count */}
            <Link 
              href="/cart" 
              className="relative flex items-center justify-center h-9 w-9 mx-1 rounded-full"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary rounded-full">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
            
            {loading ? (
              <div className="h-9 w-9 mx-1 flex items-center justify-center">
                <span className="h-4 w-4 animate-pulse rounded-full" />
              </div>
            ) : user ? (
              <div className="mx-1">
                <ProfileDropdown user={user} />
              </div>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center justify-center h-9 w-9 mx-1 rounded-full"
              >
                <User className="h-5 w-5 text-gray-700" />
                <span className="sr-only">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[9999] bg-white">
          <div className="border-b sticky top-0 bg-white">
            <div className="flex items-center gap-2 p-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setMobileSearchOpen(false)
                  setSearchQuery("")
                  setSearchResults([])
                }}
              >
                <X className="h-5 w-5" />
              </Button>
              <span className="font-medium">Search Products</span>
            </div>
            
            <div className="px-4 pb-4">
              <form onSubmit={handleSubmitSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
                {searchQuery && (
                  <Button 
                    type="submit"
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7"
                  >
                    Search
                  </Button>
                )}
              </form>
            </div>
          </div>
          
          <div className="bg-white overflow-auto h-[calc(100vh-140px)]">
            {isSearching ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                {searchResults.map(product => (
                  <div 
                    key={product.id}
                    className="flex items-center p-4 border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleProductClick(product.slug)}
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded mr-4 flex-shrink-0">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain" 
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="font-semibold text-sm">₹{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                
                <div className="border-t p-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => {
                      setMobileSearchOpen(false)
                      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
                    }}
                  >
                    View all results
                  </Button>
                </div>
              </div>
            ) : searchQuery ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Enter a product name, category, or ingredient</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}