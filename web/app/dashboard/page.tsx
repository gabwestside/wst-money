import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getDashboardData } from '@/lib/dashboard'
import DashboardClient from './client'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: claims, error: claimsError } = await supabase.auth.getClaims()
  if (claimsError || !claims?.claims) redirect('/auth/login')

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) redirect('/auth/login')

  const data = await getDashboardData()

  return (
    <DashboardClient
      userName={user.user_metadata?.name || user.email || 'User'}
      data={data}
    />
  )
}
