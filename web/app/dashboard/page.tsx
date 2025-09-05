import { getDashboardData } from '@/lib/dashboard'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './client'

type PageSearchParams = Promise<{ m?: string | string[] }>

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: PageSearchParams
}) {
  const supabase = await createClient()

  const { data: claims, error: claimsError } = await supabase.auth.getClaims()
  if (claimsError || !claims?.claims) redirect('/auth/login')
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) redirect('/auth/login')

  const params = await searchParams
  const raw = Array.isArray(params.m) ? params.m[0] : params.m

  const valid = raw && /^\d{4}-(0[1-9]|1[0-2])$/.test(raw)
  const target = valid
    ? new Date(Number(raw!.slice(0, 4)), Number(raw!.slice(5, 7)) - 1, 1)
    : new Date()

  const opt = { year: target.getFullYear(), month: target.getMonth() + 1 }
  const data = await getDashboardData(opt)
  const monthValue = `${opt.year}-${String(opt.month).padStart(2, '0')}`

  return (
    <DashboardClient
      userName={user.user_metadata?.name || user.email || 'User'}
      data={data}
      monthValue={monthValue}
    />
  )
}
