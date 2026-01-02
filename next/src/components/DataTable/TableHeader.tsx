import { memo, useMemo } from "react";
import SortableHeader from "./SortableHeader";
import type { Column } from "@/types/table";

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
        {columns.map((column) => {
          const handler = sortHandlers.get(String(column.key));
          return (
            <SortableHeader
              key={String(column.key)}
              label={column.label}
              sortColumn={sortColumn ? String(sortColumn) : null}
              sortDirection={sortDirection}
              currentColumn={String(column.key)}
              onSort={handler || (() => {})}
              sortable={column.sortable !== false}
            />
          );
        })}
      </tr>
    </thead>
  );
}

export default memo(TableHeader) as typeof TableHeader;

