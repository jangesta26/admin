'use client'
import React from 'react';
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'


interface PlaceholdeProps{
    placeholder:string;
    onSearch: (term: string) => void;
}

const SearchInput:React.FC<PlaceholdeProps> = ({ placeholder, onSearch } ) => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if(term) {
      params.delete('s');
      params.delete('sort');
      params.delete('perPage');
      params.delete('page');
      params.set('s', term);
    } else {
      params.delete('s');
      params.delete('sort');
      params.delete('perPage');
      params.delete('page');
    }
    onSearch(params.toString());
    replace(`${pathname}?${params.toString()}`);
    
   
  },300)

  return (
    <div className='
    xl:translate-x-0
    lg:translate-x-0
    md:translate-x-0
    flex -translate-x-6
    
  '>
        <Input
        type="text"
        className="pl-10 rounded-lg w-[14.3rem]"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('s')?.toString()}
        suffix={<Search className='h-6 w-6 opacity-70 translate-x-8 translate-y-2' />}
        />
    </div>
  )
}

export default SearchInput
