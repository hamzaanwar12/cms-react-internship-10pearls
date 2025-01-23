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
  const getVisiblePages = () => {
    const pages: (string | number)[] = [];

    // Add ellipsis to the left if current page is not the first page
    if ((currentPage+1) > 1) {
      pages.push("..."); // Left ellipsis
    }

    // Add the current page (user-facing)
    pages.push(currentPage + 1);

    // Add ellipsis to the right if current page is not the last page
    if (currentPage + 1 < totalPages ) {
      pages.push("..."); // Right ellipsis
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap">
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
        {visiblePages.map((page, index) =>
          typeof page === "number" ? (
            <PaginationItem key={index}>
              <PaginationLink
                className={
                  `cursor-pointer border rounded border-blue-link ` +
                  (page - 1 === currentPage
                    ? "bg-blue-link text-white"
                    : "bg-white text-blue-link")
                }
                isActive={page - 1 === currentPage}
                onClick={() => onPageChange(page - 1)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <span className="text-gray-500 px-2">{page}</span>
            </PaginationItem>
          )
        )}

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
