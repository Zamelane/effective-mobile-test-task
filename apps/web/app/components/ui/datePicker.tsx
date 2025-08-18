'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { format } from 'date-fns'

export function DatePicker(
  inputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  return (
    <div className='flex flex-col gap-3'>
      <input
        type='date'
        onChange={() => {}}
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        className='sr-only'
        {...inputProps}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id='date'
            className='w-full justify-between font-normal'
          >
            {date ? date.toLocaleDateString() : 'Выбрать дату'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            captionLayout='dropdown'
            onSelect={(date: Date | undefined) => {
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
