import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

interface GenericPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const GenericPagination: React.FC<GenericPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage !== 0
                ? "cursor-pointer bg-blue-link rounded text-white hover:bg-white hover:text-blue-link hover:border-blue-link hover:border"
                : "cursor-pointer bg-gray-400 text-black hover:text-black hover:bg-gray-400"
            }
            onClick={() => {
              if (currentPage > 0) onPageChange(currentPage - 1);
            }}
            isActive={currentPage !== 0}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, pageIndex) => (
          <PaginationItem key={pageIndex}>
            <PaginationLink
              className={
                `cursor-pointer border rounded border-blue-link ` +
                (pageIndex === currentPage
                  ? "bg-blue-link text-white"
                  : "bg-white text-blue-link")
              }
              isActive={pageIndex === currentPage}
              onClick={() => onPageChange(pageIndex)}
            >
              {pageIndex + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            className={
              currentPage + 1 < totalPages
                ? "cursor-pointer bg-blue-link rounded text-white hover:bg-white hover:text-blue-link hover:border-blue-link hover:border"
                : "cursor-pointer bg-gray-400 text-black hover:text-black hover:bg-gray-400"
            }
            onClick={() => {
              if (currentPage + 1 < totalPages) onPageChange(currentPage + 1);
            }}
            isActive={currentPage + 1 < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default GenericPagination;
