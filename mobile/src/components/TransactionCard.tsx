import React from 'react'
import { Feather } from 'react-feather'

interface Category {
  name: string
  icon: string
}

export interface TransactionCardProps {
  type: 'positive' | 'negative'
  title: string
  amount: string
  category: Category
  date: string
}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
  return (
    <div className='bg-white rounded-lg shadow-sm p-4 mb-4'>
      <h2 className='text-sm font-normal text-gray-800'>{data.title}</h2>

      <p
        className={`text-lg mt-1 font-medium ${
          data.type === 'positive' ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {data.type === 'negative' && '- '}
        {data.amount}
      </p>

      <div className='flex items-center justify-between mt-4'>
        <div className='flex items-center gap-3'>
          <Feather size={20} className='text-gray-500' />
          <span className='text-base text-gray-600'>{data.category.name}</span>
        </div>
        <span className='text-sm text-gray-500'>{data.date}</span>
      </div>
    </div>
  )
}
