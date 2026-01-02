import { memo } from "react";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

interface TableRowProps<T> {
  item: T;
  columns: Column<T>[];
  index: number;
}

function TableRow<T extends Record<string, unknown>>({
  item,
  columns,
  index,
}: TableRowProps<T>) {
  return (
    <tr className="hover:bg-white/5 transition-colors">
      {columns.map((column) => (
        <td key={String(column.key)} className="whitespace-nowrap px-6 py-4 text-sm text-white/80">
          {String(item[column.key] || "")}
        </td>
      ))}
    </tr>
  );
}

export default memo(TableRow) as typeof TableRow;

