
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    
    if (onPageChange) {
      onPageChange(page);
    } else if (baseUrl) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', page.toString());
      navigate(`${baseUrl}?${searchParams.toString()}`);
    }
  };

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Add ellipsis if needed
      if (currentPage > 3) {
        pages.push(-1); // -1 represents ellipsis
      }
      
      // Add pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (currentPage < totalPages - 2) {
        pages.push(-2); // -2 represents ellipsis
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <Pagination className="my-8">
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(currentPage - 1)} 
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
        
        {getPageNumbers().map((pageNum, idx) => (
          pageNum < 0 ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={pageNum === currentPage}
                onClick={() => handlePageChange(pageNum)}
                className={pageNum === currentPage ? '' : 'cursor-pointer'}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          )
        ))}
        
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)} 
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
