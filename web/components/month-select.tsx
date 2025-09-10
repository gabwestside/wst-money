'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { buildLastMonths } from '@/lib/utils'
import { SelectTriggerProps } from '@radix-ui/react-select'
import { useRouter, useSearchParams } from 'next/navigation'
import { ForwardRefExoticComponent, RefAttributes, useMemo } from 'react'

interface MonthSelectProps
  extends React.ComponentProps<
    ForwardRefExoticComponent<
      SelectTriggerProps & RefAttributes<HTMLButtonElement>
    >
  > {
  value: string
}

export const MonthSelect = ({ value, ...props }: MonthSelectProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const options = useMemo(() => buildLastMonths(18), [])

  const onChange = (v: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('m', v)
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className='w-[220px]' {...props}>
        <SelectValue placeholder='Select month' />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
