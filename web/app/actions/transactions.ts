'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const schema = z.object({
  title: z.string().min(2, 'Informe um título'),
  amount: z.coerce.number().positive('Valor deve ser > 0'),
  type: z.enum(['income', 'expense']),
  category: z.string().min(2, 'Informe uma categoria'),
  date: z.string().optional(), // YYYY-MM-DD
})

export async function createTransaction(formData: FormData) {
  const parsed = schema.safeParse({
    title: formData.get('title'),
    amount: formData.get('amount'),
    type: formData.get('type'),
    category: formData.get('category'),
    date: formData.get('date'),
  })

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Erro de validação',
    }
  }

  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) return { ok: false, error: 'Não autenticado' }

  const { title, amount, type, category, date } = parsed.data

  const created_at = date
    ? new Date(date).toISOString()
    : new Date().toISOString()

  const { error } = await supabase
    .from('transactions')
    .insert([{ title, amount, type, category, created_at, user_id: user.id }])

  if (error) return { ok: false, error: error.message }

  // atualiza a dashboard
  revalidatePath('/dashboard')
  return { ok: true }
}

export async function deleteTransaction(formData: FormData) {
  const id = String(formData.get('id') ?? '')
  if (!id) return { ok: false, error: 'ID inválido' }

  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) return { ok: false, error: 'Não autenticado' }

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // garante que só apaga o que é do usuário

  if (error) return { ok: false, error: error.message }

  // atualiza a dashboard
  revalidatePath('/dashboard')
  return { ok: true }
}
