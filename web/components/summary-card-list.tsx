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
    <div className='flex gap-4 overflow-y-auto border p-4 rounded-lg shadow' {...props}>
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
