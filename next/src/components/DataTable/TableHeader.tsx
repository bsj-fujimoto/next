import { memo, useMemo } from "react";
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
  // 各カラムのソートハンドラーをメモ化
  const sortHandlers = useMemo(() => {
    const handlers = new Map<string, () => void>();
    columns.forEach((column) => {
      handlers.set(String(column.key), () => {
        if (column.sortable !== false) {
          onSort(column.key);
        }
      });
    });
    return handlers;
  }, [columns, onSort]);

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
            onSort={sortHandlers.get(String(column.key))}
            sortable={column.sortable !== false}
          />
        ))}
      </tr>
    </thead>
  );
}

export default memo(TableHeader) as typeof TableHeader;

