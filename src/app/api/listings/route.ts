// src/app/api/listings/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category') || ''
    const search = searchParams.get('search') || ''
    
    // pagination
    const startRow = (page - 1) * limit
    const endRow = startRow + limit - 1
    
    const supabase = await createClient()
    
    // query
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
        manufacturer:manufacturers(name),
        marketer:marketers(name),
        product_images(image_url, is_primary)
      `, { count: 'exact' })
      .eq('is_active', true)
    
    // filters
    if (category) {
      query = query.eq('category_id', category)
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,generic_name.ilike.%${search}%,description.ilike.%${search}%`)
    }
    
    query = query.range(startRow, endRow)

    const { data, error, count } = await query
    
    if (error) {
      console.error('Error fetching products:', error)
      return NextResponse.json(
        { 
          error: 'Failed to fetch products',
          details: error.message 
        }, 
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
        image_url: primaryImage?.image_url || firstImage?.image_url || '/images/placeholder.png',
        prescription_required: product.prescription_required,
        manufacturer: product.manufacturer?.name || '',
        marketer: product.marketer?.name || ''
      }
    })
    
    return NextResponse.json({
      products,
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit)
    })
  } catch (error) {
    console.error('Unexpected error in listings API:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    )
  }
}