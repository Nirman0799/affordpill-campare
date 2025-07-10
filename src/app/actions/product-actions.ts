//src/app/actions/product-actions.ts
'use server'

import { createClient } from '@/utils/supabase/server'

export async function getProductBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      generic_name,
      description,
      price,
      mrp,
      discount_percentage,
      manufacturer:manufacturers(name),
      marketer:marketers(name),
      hsn_code,
      stock_quantity,
      prescription_required,
      dosage,
      dosage_form,
      strength,
      unit_type,
      units_per_pack,
      usage_instructions,
      warnings,
      side_effects,
      pack_label,
      product_images(id, image_url, is_primary, sort_order),
      product_ingredients(
        strength,
        ingredient:active_ingredients(name)
      ),
      therapeutic_class:therapeutic_classes(name),
      chemical_class:chemical_classes(name),
      action_class:action_classes(name),
      product_safety_advice(
        alcohol_safety, alcohol_advice,
        pregnancy_safety, pregnancy_advice,
        breastfeeding_safety, breastfeeding_advice,
        driving_safety, driving_advice,
        kidney_safety, kidney_advice,
        liver_safety, liver_advice
      )
    `)
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching product by slug:', error)
    return { product: null, error: error.message }
  }
  
  return { product: data, error: null }
}

export async function getRelatedProducts(productId: string, currentProductSlug: string) {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase
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
      `)
      .neq('id', productId)
      .neq('slug', currentProductSlug)
      .eq('is_active', true)
      .limit(8)
    
    if (error) {
      console.error('Error fetching related products:', error)
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
        image_url: primaryImage?.image_url || firstImage?.image_url || '/images/placeholder.png',
        prescription_required: product.prescription_required,
        manufacturer: product.manufacturer?.name || '',
        marketer: product.marketer?.name || '',
        pack_label: product.pack_label

      }
    })
    
    return { products: processedProducts, error: null }
  } catch (error) {
    console.error('Unexpected error in getRelatedProducts:', error)
    return { products: [], error: 'Failed to fetch related products' }
  }
}

export async function checkProductAvailability(productId: string, pincode: string) {
  const supabase = await createClient()
  
  try {
    // check - pincode is serviceable
    const { data: deliveryZone, error: zoneError } = await supabase
      .from('delivery_zones')
      .select('*')
      .eq('pincode', pincode)
      .single()
    
    // if no delivery zone then check default settings
    if (zoneError && zoneError.code === 'PGRST116') {
      const { data: defaultSettings, error: defaultError } = await supabase
        .from('delivery_zone_defaults')
        .select('*')
        .limit(1)
        .single()
      
      if (defaultError) {
        return { isAvailable: false, message: 'Cannot determine delivery availability', error: defaultError.message }
      }
      
      // check pincode - blacklisted
      if (defaultSettings.blacklisted_pincodes?.includes(pincode)) {
        return { isAvailable: false, message: 'Delivery not available in this area', error: null }
      }
      
      //product stock check
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', productId)
        .single()
      
      if (productError) {
        return { isAvailable: false, message: 'Cannot determine product availability', error: productError.message }
      }
      
      return {
        isAvailable: (product.stock_quantity || 0) > 0,
        message: (product.stock_quantity || 0) > 0 
          ? 'Product available for delivery' 
          : 'Product out of stock',
        deliveryTime: defaultSettings.default_delivery_time,
        deliveryFee: defaultSettings.default_delivery_fee,
        error: null
      }
    }
    
    if (deliveryZone) {
      if (!deliveryZone.is_serviceable) {
        return { isAvailable: false, message: 'Delivery not available in this area', error: null }
      }
      
      const { data: product, error: productError } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', productId)
        .single()
      
      if (productError) {
        return { isAvailable: false, message: 'Cannot determine product availability', error: productError.message }
      }
      
      return {
        isAvailable: (product.stock_quantity || 0) > 0,
        message: (product.stock_quantity || 0) > 0 
          ? 'Product available for delivery' 
          : 'Product out of stock',
        deliveryTime: deliveryZone.delivery_time,
        deliveryFee: deliveryZone.delivery_fee,
        error: null
      }
    }
    
    return { isAvailable: false, message: 'Cannot determine delivery availability', error: 'No delivery data found' }
  } catch (error) {
    console.error('Error checking product availability:', error)
    return { isAvailable: false, message: 'Error checking availability', error: String(error) }
  }
}

export async function getSimilarProducts(productId: string, ingredients: string[]) {
  const supabase = await createClient()
  
  try {
    // demo implementation
    if (!ingredients || ingredients.length === 0) {
      return { products: [], error: null }
    }
    
    const { data, error } = await supabase
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
        product_images(image_url, is_primary),
        product_ingredients!inner(
          ingredient:active_ingredients!inner(name)
        )
      `)
      .neq('id', productId)
      .eq('is_active', true)
      .limit(8)
    
    if (error) {
      console.error('Error fetching similar products:', error)
      return { products: [], error: error.message }
    }
    
    // format the data
    const productsMap = new Map()
    
    data.forEach(product => {
      let matchCount = 0
      product.product_ingredients.forEach((pi: any) => {
        if (ingredients.includes(pi.ingredient?.name)) {
          matchCount++
        }
      })
      
      const matchPercentage = (matchCount / ingredients.length) * 100
      
      // skip no matching ingredients
      if (matchPercentage <= 0) return
    
      const primaryImage = product.product_images?.find((img: any) => img.is_primary)
      const firstImage = product.product_images?.[0]
      
      if (productsMap.has(product.id)) {
        const existing = productsMap.get(product.id)
        if (existing.match_percentage < matchPercentage) {
          existing.match_percentage = matchPercentage
        }
      } else {
        productsMap.set(product.id, {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          mrp: product.mrp,
          discount_percentage: product.discount_percentage,
          image_url: primaryImage?.image_url || firstImage?.image_url || '/images/placeholder.png',
          prescription_required: product.prescription_required,
          manufacturer: product.manufacturer?.name || '',
          marketer: product.marketer?.name || '',
          match_percentage: matchPercentage
        })
      }
    })
    
    let similarProducts = Array.from(productsMap.values())
    similarProducts.sort((a, b) => b.match_percentage - a.match_percentage)
    
    return { products: similarProducts, error: null }
  } catch (error) {
    console.error('Unexpected error in getSimilarProducts:', error)
    return { products: [], error: 'Failed to fetch similar products' }
  }
}

export async function getProductAlternatives(productId: string) {
  const supabase = await createClient()
  
  try {
    const { data: currentProduct, error: productError } = await supabase
      .from('products')
      .select(`
        generic_name,
        product_ingredients(
          ingredient_id,
          strength
        )
      `)
      .eq('id', productId)
      .single()
    
    if (productError) {
      return { products: [], error: productError.message }
    }
    
    const { data, error } = await supabase
      .rpc('find_medicine_alternatives', {
        input_product_id: productId
      })
    
    if (error) {
      console.error('Error fetching product alternatives:', error)
      return { products: [], error: error.message }
    }
    
    const productsWithImages = await Promise.all(
      data.map(async (product: any) => {
        const { data: images } = await supabase
          .from('product_images')
          .select('image_url, is_primary')
          .eq('product_id', product.product_id)
        
        const primaryImage = images?.find(img => img.is_primary)
        const firstImage = images?.[0]
        
        return {
          ...product,
          image_url: primaryImage?.image_url || firstImage?.image_url || '/images/placeholder.png'
        }
      })
    )
    
    return { products: productsWithImages, error: null }
  } catch (error) {
    console.error('Unexpected error in getProductAlternatives:', error)
    return { products: [], error: 'Failed to fetch product alternatives' }
  }
}

export async function getCategoryInfo(categoryId: string) {
  const supabase = await createClient()
  
  try {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        slug,
        parent_id
      `)
      .eq('id', categoryId)
      .single()
    
    if (error) {
      console.error('Error fetching category info:', error)
      return { category: null, error: error.message }
    }
    
    if (data.parent_id) {
      const { data: parentData, error: parentError } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('id', data.parent_id)
        .single()
      
      if (!parentError && parentData) {
        return { 
          category: data, 
          parent: parentData, 
          error: null 
        }
      }
    }
    
    return { category: data, parent: null, error: null }
  } catch (error) {
    console.error('Unexpected error fetching category:', error)
    return { category: null, parent: null, error: String(error) }
  }
}

export async function getProductsByCategory(categoryId: string, page: number = 1, limit: number = 20) {
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
        marketer:marketers(name),
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

export async function searchProducts(query: string, page: number = 1, limit: number = 20) {
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
        marketer:marketers(name),
        product_images(image_url, is_primary)
      `, { count: 'exact' })
      .or(`name.ilike.%${query}%,generic_name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq('is_active', true)
      .range(startIndex, endIndex)
    
    if (error) {
      console.error('Error searching products:', error)
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
    console.error('Unexpected error in searchProducts:', error)
    return { products: [], count: 0, totalPages: 0, currentPage: page, error: 'Failed to search products' }
  }
}

export async function getFeaturedProducts(limit: number = 8) {
  const supabase = await createClient()
  
  try {
    // to be imeplemented  -- npot done
    const { data, error } = await supabase
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
      `)
      .eq('is_active', true)
      .order('discount_percentage', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error fetching featured products:', error)
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
        image_url: primaryImage?.image_url || firstImage?.image_url || '/images/placeholder.png',
        prescription_required: product.prescription_required,
        manufacturer: product.manufacturer?.name || ''
      }
    })
    
    return { products: processedProducts, error: null }
  } catch (error) {
    console.error('Unexpected error in getFeaturedProducts:', error)
    return { products: [], error: 'Failed to fetch featured products' }
  }
}