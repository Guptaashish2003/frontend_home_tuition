import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [visiblePages, setVisiblePages] = useState([]);

  const handlePageClick = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
    generateVisiblePages(page);
  };

  const generateVisiblePages = (currentPage) => {
    const range = 2; // Number of pages to show on each side of the current page
    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages, currentPage + range);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    setVisiblePages(pages);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className='rgt-button result-clear page-btn'
      >
        Pre
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={page === currentPage ? 'active rgt-button result-clear page-btn' : 'rgt-button result-clear page-btn'}
          
        >
          {page }
        </button>
      ))}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='rgt-button result-clear page-btn'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
