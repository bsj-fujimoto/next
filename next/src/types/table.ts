export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  sortType?: "string" | "number" | "date";
}

export type SortDirection = "asc" | "desc";

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
