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

export default function Pagination({
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

  return (
    <div className="px-6 py-4 border-t border-white/20 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-sm text-white/70">
          全 {totalItems} 件中 {startIndex + 1} - {Math.min(endIndex, totalItems)} 件を表示
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/70">表示件数:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option} className="bg-zinc-900">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          最初
        </button>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                onClick={() => onPageChange(pageNum)}
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
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          次へ
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          最後
        </button>
      </div>
    </div>
  );
}

