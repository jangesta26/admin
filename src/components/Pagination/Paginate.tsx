'use client'
import React, {useEffect} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams, usePathname} from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'

interface GetTotalProps {
  totalPage: any,
  currentPage:any;
  onPage: (term: string) => void;
}

const Paginate: React.FC<GetTotalProps> = (
{
  totalPage,
  currentPage,
  onPage,
}
) => {
  
  const [pageHolder, setPageHolder] = useState(currentPage);
  const totalPages = totalPage;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Ensure useRouter is only used client-side
    if (!router) return;

    // Additional client-side logic if needed
  }, [router]);

  const handlePageClick = useDebouncedCallback((term:any) => {

    const params = new URLSearchParams(searchParams.toString());

    
    onPage(term);
    setPageHolder(term);
    params.set('page', term.toString());

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const newUrl = `${pathname}${queryString}`;
    router.replace(newUrl);

    // Logic to fetch data for the new page from your API
  },300);

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, pageHolder - Math.floor(maxPagesToShow / 2));

    for (let i = startPage; i <= Math.min(totalPages, startPage + maxPagesToShow - 1); i++) {
      pageNumbers.push(
        <button 
        key={i} 
        onClick={() => handlePageClick(i)} 
        className={`${i === pageHolder 
        ? 'active bg-slate-900 rounded-lg w-7 h-8 font-semibold text-white' 
        : ''} `}>
          {i}
        </button>
      );
    }

    return (
      <div className="flex grid-cols-3 gap-3 text-xl">

        <div className='flex'>
          <ChevronLeft className='w-8 h-8'/>
          <button
          className='hover:underline hover:text-primary font-bold -translate-x-1'
          onClick={() => handlePageClick(pageHolder - 1)} disabled={pageHolder === 1}
          >
            Previous
          </button>
        </div>

        <div className='flex gap-2 items-center justify-center'>
          {startPage > 1 && <button onClick={() => handlePageClick(1)}>1</button>}
          {startPage > 2 && <span className="ellipsis">...</span>}
          {pageNumbers}
          {startPage + maxPagesToShow - 1 < totalPages-1 && <span className="ellipsis">...</span>}
          {startPage + maxPagesToShow - 1 <= totalPages-2 && (
            <button onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
          )}
        </div>

        <div className='flex'>
          <button 
          className='hover:underline hover:text-primary font-bold translate-x-1'
          onClick={() => handlePageClick(pageHolder + 1)} disabled={pageHolder === totalPages}
          >
            Next
          </button>
          <ChevronRight className='w-8 h-8'/>
        </div>

      </div>
    );
  };

  return (
    <div>
      {/* Render pagination */}
      {renderPagination()}
    </div>
  );
};

export default Paginate;
