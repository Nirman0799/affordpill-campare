// src/app/api/categories/popular/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('name')
      .limit(10)
    
    if (error) {
      console.error('Error fetching popular categories:', error)
      return NextResponse.json(
        { error: 'Failed to fetch categories' }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      categories: data
    })
  } catch (error) {
    console.error('Unexpected error in popular categories API:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    )
  }
}