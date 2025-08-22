import { createClient } from '@/lib/supabase/server'
import { startOfMonth, endOfMonth } from 'date-fns'

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

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient()

  // período do mês atual
  const from = startOfMonth(new Date()).toISOString()
  const to = endOfMonth(new Date()).toISOString()

  // busca transações do mês
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .gte('created_at', from)
    .lte('created_at', to)
    .order('created_at', { ascending: false })

  if (error) throw error
  const tx = (data ?? []) as Transaction[]

  const incomesTotal = tx
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0)

  const expensesTotal = tx
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0)

  // buckets 50/30/20 por category (case-insensitive)
  const norm = (s: string) => s?.toLowerCase?.().trim()
  const bucket50 = tx
    .filter(
      (t) =>
        t.type === 'expense' &&
        ['essential', 'essencial'].includes(norm(t.category))
    )
    .reduce((acc, t) => acc + Number(t.amount), 0)

  const bucket30 = tx
    .filter(
      (t) =>
        t.type === 'expense' &&
        ['non-essential', 'nao-essencial', 'não-essencial'].includes(
          norm(t.category)
        )
    )
    .reduce((acc, t) => acc + Number(t.amount), 0)

  const bucket20 = tx
    .filter(
      (t) =>
        t.type === 'expense' &&
        ['investment', 'investimento'].includes(norm(t.category))
    )
    .reduce((acc, t) => acc + Number(t.amount), 0)

  // série mensal (por dia) para o gráfico de barras
  // labels = dias do mês que têm movimentação
  const mapIncomeByDay = new Map<string, number>()
  const mapExpenseByDay = new Map<string, number>()
  for (const t of tx) {
    const day = new Date(t.created_at).toISOString().slice(0, 10) // YYYY-MM-DD
    const map = t.type === 'income' ? mapIncomeByDay : mapExpenseByDay
    map.set(day, (map.get(day) ?? 0) + Number(t.amount))
  }
  const labelSet = new Set<string>([
    ...Array.from(mapIncomeByDay.keys()),
    ...Array.from(mapExpenseByDay.keys()),
  ])
  const labels = Array.from(labelSet).sort()
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
