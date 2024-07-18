'use client'
import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'
import { Label } from '../ui/label';

interface SetLimitPageProps {
  entries: string
    onChangePageLimit: (term: string) => void;
  }

const PageSelector: React.FC<SetLimitPageProps> = ({
  entries,
    onChangePageLimit
}) => {
    const item = [
        { id:1, limit:1 }, 
        { id:2, limit:25 }, 
        { id:3, limit:50 }, 
        { id:4, limit:75 }, 
        { id:5, limit:100 }
        ]

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const handleLimitPage = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);

        onChangePageLimit(term)
        params.set('limit', term);
        replace(`${pathname}?${params.toString()}`);
        
    },300)

    
  return (
    <div className='flex items-center justify-center gap-0.5 '>
      <Label>{entries}:</Label>
      <select
      className='w-15 px-1 border rounded dark:bg-slate-950 dark:text-slate-500' 
      onChange={(e) => {handleLimitPage(e.target.value)}}>
            {
                item.map((item) => (
                    <option key={item.id} value={item.limit}>{item.limit}</option>)
                )
            }
            
          </select>
    </div>
  )
}

export default PageSelector
