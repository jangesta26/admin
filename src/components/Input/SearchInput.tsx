'use client'
import React, { useState } from 'react';
import { Input } from '../ui/input'
import { Search, X } from 'lucide-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'


interface PlaceholdeProps{
    placeholder:string;
    onSearch: (term: string) => void;
}

const SearchInput:React.FC<PlaceholdeProps> = ({ placeholder, onSearch } ) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [clearVisible, setClearVisible] = useState<boolean>(false); 

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = useDebouncedCallback((term: string) => {
    setSearchTerm(term);
    const params = new URLSearchParams(searchParams);
    if(term.trim() !== '') {
      params.set('search', term);
      setClearVisible(true);
    } else {
      params.delete('search');
      setClearVisible(false);
    }
    replace(`${pathname}?${params.toString()}`);
    onSearch(term);
    
  },10)

  const handleClear = () => {
    setSearchTerm(''); // Clear local search term state
    setClearVisible(false); // Hide clear button
    const params = new URLSearchParams(searchParams);
    params.delete('search');
    replace(`${pathname}?${params.toString()}`);
    onSearch(''); // Callback to parent component with empty search term
  };


  return (
    <div className='
    xl:translate-x-0
    lg:translate-x-0
    md:translate-x-0
    flex -translate-x-0
    
  '>
        <Input
        type="text"
        className="pl-3 pr-10 rounded-lg w-full"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        value={searchTerm}
        defaultValue={searchParams.get('sort')?.toString()}
        />
                    <div className='absolute right-0 flex mt-2'>
                <Search
                    className={`transition-transform duration-300 ease-in-out -mr-2  ${clearVisible ? 'opacity-0 translate-x-4 ' : 'opacity-100 translate-x-0 '}`}
                />
                <X
                    className={`transition-transform duration-300 ease-in-out mr-2 mt-1 ${clearVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} w-4 h-4 bg-black text-white cursor-pointer rounded shadow-2xl hover:text-red`}
                    onClick={handleClear}
                />
            </div>
    </div>
  )
}

export default SearchInput
