import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

//  check authentication in server components
export async function checkAuth(redirectTo = '/login') {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect(redirectTo)
  }
  
  return user
}

// get user profile data
export async function getUserProfile() {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return null
  }
  
  // get profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  if (profileError) {
    console.error('Error fetching profile:', profileError)
    return user
  }
  
  return { ...user, ...profile }
}