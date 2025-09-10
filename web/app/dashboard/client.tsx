'use client'

import { ActionSection } from '@/components/action-section'
import { GraphicSection } from '@/components/graphic-section'
import { Header } from '@/components/header'
import { LatestTransactions } from '@/components/last-transactions'
import { SummaryCardList } from '@/components/summary-card-list'
import type { DashboardData } from '@/lib/dashboard'

interface DashboardClientProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string
  data: DashboardData
  monthValue: string
}

export default function DashboardClient({
  userName,
  data,
  monthValue,
}: DashboardClientProps) {
  const balance = data.incomesTotal - data.expensesTotal

  return (
    <div className='space-y-6'>
      <Header userName={userName} monthValue={monthValue} />

      <ActionSection monthValue={monthValue} />

      <SummaryCardList
        balance={balance}
        incomesTotal={data.incomesTotal}
        expensesTotal={data.expensesTotal}
        bucket20={data.bucket20}
      />

      <LatestTransactions data={data} />

      {data.monthlyByType.labels.length > 0 && <GraphicSection data={data} />}
    </div>
  )
}
