'use client'
import React, {useEffect} from 'react';
import { useState } from 'react';
import { useSearchParams, usePathname} from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'
import styles from './Paginate.module.css'

interface GetTotalProps {
  totalPage: number,
  currentPage:number;
  onPage: (term: string) => void;
}

const Paginate: React.FC<GetTotalProps> = (
{
  totalPage,
  currentPage,
  onPage,
}
) => {
  
  const [pageCurrent, setPageCurrent] = useState(currentPage);
  const totalPages = totalPage;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!router) return;

  }, [router]);

  const handlePageClick = useDebouncedCallback((term:any) => {

    const params = new URLSearchParams(searchParams.toString());

    if(term == 1){
      params.delete('page');
    } else {
      params.set('page', term.toString());
    }
    onPage(term);
    setPageCurrent(term);
  
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const newUrl = `${pathname}${queryString}`;
    router.replace(newUrl);

    // Logic to fetch data for the new page from your API
  },300);

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, pageCurrent - Math.floor(maxPagesToShow / 2));

    for (let i = startPage; i <= Math.min(totalPages, startPage + maxPagesToShow - 1); i++) {
      pageNumbers.push(
        <button 
        key={i} 
        onClick={() => handlePageClick(i)} 
        className={`px-2 text-center py-1 hover:text-white hover:bg-black-2 ${i === pageCurrent 
        ? styles.active 
        : ''} `}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex grid-cols-3 rounded-lg py-0 bg-black dark:bg-black text-white">
        <div className="flex">
          <button
           className={`border-r-[1px] ${styles.roundedLeftButton} ${styles.paginationButton} 
           ${
            pageCurrent === 1 ? styles.disabled : ''
          }`}
            onClick={() => handlePageClick(1)}
            disabled={pageCurrent === 1}
          >
            First
          </button>

          <button
          className={`sm:flex items-center hidden ${styles.paginationButton} ${styles.prevButton} ${
            pageCurrent === 1 ? styles.disabled : ''
          }`}
          onClick={() => handlePageClick(pageCurrent - 1)} disabled={pageCurrent === 1}
          >
            Prev
          </button>
        </div>

        <div className="flex w-full items-center justify-center border-r-[1px]">
          {startPage > 1 && (
            <>
              <button className={`flex px-3 ${startPage !==1 && 'px-3  py-1 hover:bg-black-2'}`} onClick={() => handlePageClick(1)}>1</button>
              {startPage > 2 && <span className="ellipsis px-3 py-1 hover:bg-black-2">...</span>}
            </>
          )}
          {pageNumbers}
          {startPage + maxPagesToShow - 1 < totalPages - 1 && (
            <span className="ellipsis ">...</span>
          )}
          {startPage + maxPagesToShow - 1 <= totalPages - 2 && (
            <button onClick={() => handlePageClick(totalPages)}>{totalPages}</button>
          )}
        </div>

        <div className='flex'>
          <button 
           className={` sm:flex items-center hidden ${styles.paginationButton} ${
              pageCurrent === totalPages ? styles.disabled : ''
            }`}
          onClick={() => handlePageClick(pageCurrent + 1)} disabled={pageCurrent === totalPages}
          >
            Next
          </button>

          <button
              className={`${styles.roundedRightButton} ${styles.paginationButton} ${
                pageCurrent === totalPages ? styles.disabled : ''
              }`}
            onClick={() => handlePageClick(totalPages)}
            disabled={pageCurrent === totalPages}
          >
            Last
          </button>
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
