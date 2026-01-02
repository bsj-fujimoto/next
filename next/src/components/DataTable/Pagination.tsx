import { memo, useCallback } from "react";
import ItemsPerPageDropdown from "./ItemsPerPageDropdown";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  itemsPerPage: number;
  itemsPerPageOptions: number[];
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  itemsPerPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  if (totalItems === 0) return null;

  const handleFirstPage = useCallback(() => {
    onPageChange(1);
  }, [onPageChange]);

  const handlePreviousPage = useCallback(() => {
    onPageChange(Math.max(1, currentPage - 1));
  }, [onPageChange, currentPage]);

  const handleNextPage = useCallback(() => {
    onPageChange(Math.min(totalPages, currentPage + 1));
  }, [onPageChange, totalPages, currentPage]);

  const handleLastPage = useCallback(() => {
    onPageChange(totalPages);
  }, [onPageChange, totalPages]);

  const handlePageClick = useCallback((pageNum: number) => {
    onPageChange(pageNum);
  }, [onPageChange]);

  return (
    <div className="px-6 py-4 border-t border-white/20 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-sm text-white/70">
          全 {totalItems} 件中 {startIndex + 1} - {Math.min(endIndex, totalItems)} 件を表示
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">表示件数:</span>
          <ItemsPerPageDropdown
            value={itemsPerPage}
            options={itemsPerPageOptions}
            onChange={onItemsPerPageChange}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          最初
        </button>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          前へ
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={handlePageClick.bind(null, pageNum)}
                className={`px-3 py-1 rounded-lg backdrop-blur-sm border text-sm transition-all ${
                  currentPage === pageNum
                    ? "bg-white/30 border-white/40 text-white font-semibold"
                    : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          次へ
        </button>
        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          最後
        </button>
      </div>
    </div>
  );
}

export default memo(Pagination);

