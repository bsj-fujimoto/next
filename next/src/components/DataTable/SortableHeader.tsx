interface SortableHeaderProps {
  label: string;
  sortColumn: string | null;
  sortDirection: "asc" | "desc";
  currentColumn: string;
  onSort: () => void;
  sortable?: boolean;
}

export default function SortableHeader({
  label,
  sortColumn,
  sortDirection,
  currentColumn,
  onSort,
  sortable = true,
}: SortableHeaderProps) {
  const isSorted = sortColumn === currentColumn;

  return (
    <th
      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70 ${
        sortable ? "cursor-pointer hover:bg-white/10 transition-colors" : ""
      }`}
      onClick={sortable ? onSort : undefined}
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {sortable && (
          <div className="flex flex-col">
            {isSorted ? (
              sortDirection === "asc" ? (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )
            ) : (
              <div className="flex flex-col -space-y-1">
                <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    </th>
  );
}

