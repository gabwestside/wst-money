import { ActionMenu } from './action-menu'
import { NewTransactionDialog } from './new-transaction-dialog'

interface ActionSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  monthValue: string
}

export const ActionSection = ({ monthValue, ...props }: ActionSectionProps) => {
  return (
    <div className='flex items-center gap-4' {...props}>
      <div className='flex flex-col ml-auto w-full items-center  md:flex-row md:gap-2'>
        <NewTransactionDialog className='ml-auto' />
      </div>
      <div className='ml-auto'>
        <ActionMenu monthValue={monthValue} />
      </div>
    </div>
  )
}
