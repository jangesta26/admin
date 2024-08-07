import React from 'react'
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
  } from '../ui/popover';
import { FormControl } from '../ui/form';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '../ui/calendar';

interface DateItemProps {
    field: any;
   
}

const DatePickerBtn =  ({ field }: DateItemProps) => {
  return (
    <Popover>
    <PopoverTrigger asChild>
      <FormControl>
        <Button
          variant={"outline"}
          className={cn(
            " py-6 border-[1px] rounded pl-4 text-left font-normal",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? (
            format(field.value, "PPP")
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </FormControl>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 2xl:translate-y-2 md:translate-y-12 sm:flex translate-y-12 xl:-translate-x-2 shadow-xl rounded" align="end">
      <Calendar
        className='bg-white rounded p-0 py-2 px-2 dark:bg-slate-950'
        mode="single"
        onSelect={field.onChange}
        captionLayout='dropdown'
        fromYear={1990}
        toYear={2024}                          
        disabled={(date) =>
          date > new Date() || date < new Date("1900-01-01")
        }
      />
    </PopoverContent>
  </Popover>
  )
}

export default DatePickerBtn
