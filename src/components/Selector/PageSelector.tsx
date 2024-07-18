'use client'
import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'

interface SetLimitPageProps {
    placeholderLimitPage: number;
    onChangePageLimit: (term: string) => void;
  }

const PageSelector: React.FC<SetLimitPageProps> = ({
    placeholderLimitPage,
    onChangePageLimit
}) => {
    const item = [
        { id:1, limit:1 }, 
        { id:2, limit:2 }, 
        { id:3, limit:5 }, 
        { id:4, limit:7 }, 
        { id:5, limit:10 }
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
    <div>
      <select onChange={(e) => {handleLimitPage(e.target.value)}}>
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
