'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { buildLastMonths } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function MonthSelect({ value }: { value: string }) {
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
      <SelectTrigger className='w-[220px]'>
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
