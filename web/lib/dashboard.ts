import { createClient } from '@/lib/supabase/server'
import { endOfMonth, startOfMonth } from 'date-fns'

export type Transaction = {
  id: string
  title: string
  amount: number
  type: 'income' | 'expense'
  category: string
  created_at: string
  user_id: string
}

export type DashboardData = {
  incomesTotal: number
  expensesTotal: number
  lastTransactions: Transaction[]
  bucket50: number
  bucket30: number
  bucket20: number
  monthlyByType: {
    labels: string[]
    income: number[]
    expense: number[]
  }
}

type MonthOpt = { year: number; month: number }

export async function getDashboardData(opt?: MonthOpt): Promise<DashboardData> {
  const supabase = await createClient()

  const base = opt ? new Date(opt.year, opt.month - 1, 1) : new Date()

  const from = startOfMonth(base).toISOString()
  const to = endOfMonth(base).toISOString()

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .gte('created_at', from)
    .lte('created_at', to)
    .order('created_at', { ascending: false })

  if (error) throw error
  const tx = (data ?? []) as Transaction[]

  const sum = (arr: Transaction[]) =>
    arr.reduce((a, t) => a + Number(t.amount), 0)

  const incomesTotal = sum(tx.filter((t) => t.type === 'income'))
  const expensesTotal = sum(tx.filter((t) => t.type === 'expense'))

  const norm = (s: string) => s?.toLowerCase?.().trim()
  const bucket50 = sum(
    tx.filter(
      (t) =>
        t.type === 'expense' &&
        ['essential', 'essencial'].includes(norm(t.category))
    )
  )
  const bucket30 = sum(
    tx.filter(
      (t) =>
        t.type === 'expense' &&
        ['non-essential', 'nao-essencial', 'não-essencial'].includes(
          norm(t.category)
        )
    )
  )
  const bucket20 = sum(
    tx.filter(
      (t) =>
        t.type === 'expense' &&
        ['investment', 'investimento'].includes(norm(t.category))
    )
  )

  const mapIncomeByDay = new Map<string, number>()
  const mapExpenseByDay = new Map<string, number>()
  for (const t of tx) {
    const day = new Date(t.created_at).toISOString().slice(0, 10)
    const map = t.type === 'income' ? mapIncomeByDay : mapExpenseByDay
    map.set(day, (map.get(day) ?? 0) + Number(t.amount))
  }
  const labels = Array.from(
    new Set([...mapIncomeByDay.keys(), ...mapExpenseByDay.keys()])
  ).sort()
  const monthlyByType = {
    labels,
    income: labels.map((d) => mapIncomeByDay.get(d) ?? 0),
    expense: labels.map((d) => mapExpenseByDay.get(d) ?? 0),
  }

  const lastTransactions = tx.slice(0, 8)

  return {
    incomesTotal,
    expensesTotal,
    lastTransactions,
    bucket50,
    bucket30,
    bucket20,
    monthlyByType,
  }
}
