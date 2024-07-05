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
    params.delete('page');
    params.set('page', term.toString());
    params.delete('s');
    params.delete('sort');

    onPage(params.toString());
    setPageHolder(term);

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
        <button key={i} onClick={() => handlePageClick(i)} className={i === pageHolder ? 'active' : ''}>
          {i}
        </button>
      );
    }

    return (
      <div className="bg-pink-200 flex gap-1">
        <ChevronLeft/>
        <button
        className='hover:underline hover:text-primary'
         onClick={() => handlePageClick(pageHolder - 1)} disabled={pageHolder === 1}
         >
          Previous
        </button>
        {startPage > 1 && <button onClick={() => handlePageClick(1)}>1</button>}
        {startPage > 2 && <span className="ellipsis">...</span>}
        {pageNumbers}
        {startPage + maxPagesToShow - 1 < totalPages && <span className="ellipsis">...</span>}
        {startPage + maxPagesToShow - 1 <= totalPages && (
          <button onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
        )}
        <button 
        className='hover:underline hover:text-primary'
        onClick={() => handlePageClick(pageHolder + 1)} disabled={pageHolder === totalPages}
        >
          Next
        </button>
        <ChevronRight/>
      </div>
    );
  };

  return (
    <div>
      {/* Render your data based on currentPage */}
      <h1>Data for Page {pageHolder}</h1>
      
      {/* Render pagination */}
      {renderPagination()}
    </div>
  );
};

export default Paginate;
