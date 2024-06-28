import React from "react";

interface PaginationProps {
    itemsPerPage: any;
    currentPage: number;
    totalItems: number;
    paginate: any;
  }

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }:PaginationProps) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="mt-4" aria-label="Pagination">
        <ul className="flex justify-center">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`cursor-pointer ${
                currentPage === number ? 'text-blue-600' : ''
              }`}
              onClick={() => paginate(number)}
            >
              <a className="block px-3 py-2 rounded-md">{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  export default Pagination;