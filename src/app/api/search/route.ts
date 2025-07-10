// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/browser'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const limit = parseInt(searchParams.get('limit') || '5')
    
    // input validation
    if (!query) {
      return NextResponse.json({ 
        success: false, 
        message: 'Search query is required' 
      }, { status: 400 })
    }
    
    const supabase = await createClient()
    
    // search
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, 
        name, 
        slug, 
        generic_name, 
        price,
        mrp,
        discount_percentage, 
        product_images(id, image_url, is_primary),
        prescription_required
      `)
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,generic_name.ilike.%${query}%`)
      .limit(limit)
    
    if (error) {
      console.error('Search API error:', error)
      return NextResponse.json({ 
        success: false, 
        message: 'Error performing search' 
      }, { status: 500 })
    }
    
    // data processing
    const processedData = data.map(product => ({
      id: product.id,
      name: product.name,
      description: product.generic_name || '',
      price: product.price,
      mrp: product.mrp,
      discountPercentage: product.discount_percentage,
      category: product.prescription_required ? "Prescription" : "Medication",
      image: product.product_images?.find((img: any) => img.is_primary)?.image_url || "/images/placeholder.png",
      slug: product.slug
    }))
    
    return NextResponse.json({ 
      success: true, 
      results: processedData,
      count: processedData.length
    })
  } catch (error) {
    console.error('Unexpected error in search API:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'An unexpected error occurred' 
    }, { status: 500 })
  }
}