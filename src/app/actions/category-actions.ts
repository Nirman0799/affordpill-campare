// src/app/actions/category-actions.ts
'use server'
import { createClient } from '@/utils/supabase/server'

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient()
  
  try {
    const { data: category, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        slug,
        description,
        parent_id
      `)
      .eq('slug', slug)
      .single()
    
    if (error) {
      console.error('Error fetching category by slug:', error)
      return { category: null, error: error.message }
    }
    
    let parent = null
    if (category?.parent_id) {
      const { data: parentData } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('id', category.parent_id)
        .single()
        
      parent = parentData
    }
    
    return { category, parent, error: null }
  } catch (error) {
    console.error('Unexpected error in getCategoryBySlug:', error)
    return { category: null, parent: null, error: String(error) }
  }
}

export async function getProductsByCategory(categoryId: string, page: number = 1, limit: number = 12) {
  const supabase = await createClient()
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit - 1
  
  try {
    const { data, error, count } = await supabase
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
        product_images(image_url, is_primary)
      `, { count: 'exact' })
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .range(startIndex, endIndex)
    
    if (error) {
      console.error('Error fetching category products:', error)
      return { products: [], count: 0, error: error.message }
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
        image_url: primaryImage?.image_url || firstImage?.image_url || '/images/placeholder.png',
        prescription_required: product.prescription_required,
        manufacturer: product.manufacturer?.name || ''
      }
    })
    
    return {
      products: processedProducts,
      count: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
      currentPage: page,
      error: null
    }
  } catch (error) {
    console.error('Unexpected error in getProductsByCategory:', error)
    return { products: [], count: 0, totalPages: 0, currentPage: page, error: 'Failed to fetch products' }
  }
}