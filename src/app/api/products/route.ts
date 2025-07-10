// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') || ''
    const limit = parseInt(searchParams.get('limit') || '8')
    
    const supabase = await createClient()
    
    let query = supabase
      .from('products')
      .select(`
        id,
        name,
        slug,
        price,
        mrp,
        discount_percentage,
        prescription_required,
        stock_quantity,
        manufacturer:manufacturers(name),
        marketer:marketers(name),
        product_images(image_url, is_primary)
      `)
      .eq('is_active', true)
    
    if (category && category !== 'undefined' && category.length > 10) {
      query = query.eq('category_id', category)
    }
    
    query = query.limit(limit)
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      )
    }
    

    const products = data.map(product => {
      const primaryImage = product.product_images?.find((img: any) => img.is_primary)
      const firstImage = product.product_images?.[0]
      
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        mrp: product.mrp,
        discount_percentage: product.discount_percentage,
        image_url: primaryImage?.image_url || firstImage?.image_url || '/placeholder.svg',
        prescription_required: product.prescription_required,
        manufacturer: product.manufacturer?.name || '',
        marketer: product.marketer?.name || '',
        in_stock: (product.stock_quantity || 0) > 0,
        rating: 4.5,  // static values can be replaced with real values
        review_count: 32  // static values can be replaced with real values
      }
    })
    
    return NextResponse.json({
      products,
      count: products.length
    })
    
  } catch (error) {
    console.error('Unexpected error in products API:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}