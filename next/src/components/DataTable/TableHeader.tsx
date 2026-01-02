import { memo } from "react";
import SortableHeader from "./SortableHeader";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface TableHeaderProps<T> {
  columns: Column<T>[];
  sortColumn: keyof T | null;
  sortDirection: "asc" | "desc";
  onSort: (column: keyof T) => void;
}

function TableHeader<T extends Record<string, unknown>>({
  columns,
  sortColumn,
  sortDirection,
  onSort,
}: TableHeaderProps<T>) {
  return (
    <thead className="bg-white/5">
      <tr>
        {columns.map((column) => (
          <SortableHeader
            key={String(column.key)}
            label={column.label}
            sortColumn={sortColumn ? String(sortColumn) : null}
            sortDirection={sortDirection}
            currentColumn={String(column.key)}
            onSort={() => column.sortable !== false && onSort(column.key)}
            sortable={column.sortable !== false}
          />
        ))}
      </tr>
    </thead>
  );
}

export default memo(TableHeader) as typeof TableHeader;

