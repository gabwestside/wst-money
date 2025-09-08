import { SummaryCard } from './summary-card'

interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  balance: number
  incomesTotal: number
  expensesTotal: number
  bucket20: number
}

export const SummaryCardList = ({
  balance,
  incomesTotal,
  expensesTotal,
  bucket20,
  ...props
}: SummaryCardProps) => {
  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4' {...props}>
      <SummaryCard
        title='Current Balance'
        value={balance}
        color='bg-purple-300'
      />
      <SummaryCard title='Incomes' value={incomesTotal} color='bg-green-300' />
      <SummaryCard title='Outcomes' value={expensesTotal} color='bg-red-300' />
      <SummaryCard
        title='Investments (20%)'
        value={bucket20}
        color='bg-blue-300'
      />
    </div>
  )
}
