"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import SearchBar from "./DataTable/SearchBar";
import Pagination from "./DataTable/Pagination";
import TableHeader from "./DataTable/TableHeader";
import TableRow from "./DataTable/TableRow";
import EmptyState from "./DataTable/EmptyState";

import type { Column } from "@/types/table";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  getRowKey?: (item: T, index: number) => string | number;
}

export default function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = "検索...",
  pagination = true,
  itemsPerPageOptions = [10, 20, 50, 100],
  defaultItemsPerPage = 20,
  getRowKey,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // 検索フィルタリング
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return columns.some((col) => {
        const value = String(item[col.key] || "").toLowerCase();
        return value.includes(query);
      });
    });
  }, [data, searchQuery, columns]);

  // ソート処理
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (!sortColumn) return 0;

      const aValue = String(a[sortColumn] || "");
      const bValue = String(b[sortColumn] || "");

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // ページネーション計算
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // ページ変更時に検索/ソートが変わったら1ページ目に戻る
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortColumn, sortDirection, itemsPerPage]);

  // ソートハンドラー
  const handleSort = useCallback((column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }, [sortColumn, sortDirection]);

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl overflow-hidden">
      {/* 検索バー */}
      {searchable && (
        <div className="px-6 py-4 border-b border-white/20">
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder={searchPlaceholder} />
        </div>
      )}

      {/* ページネーション（上部） */}
      {pagination && sortedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          startIndex={startIndex}
          endIndex={endIndex}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}

      {/* テーブル */}
      <div className="overflow-x-auto">
        {paginatedData.length > 0 ? (
          <table className="min-w-full divide-y divide-white/10">
            <TableHeader
              columns={columns}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
            <tbody className="divide-y divide-white/10">
              {paginatedData.map((item, index) => {
                const key = getRowKey ? getRowKey(item, index) : (item.id ?? index);
                return (
                  <TableRow key={key} item={item} columns={columns} index={index} />
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* ページネーション（下部） */}
      {pagination && sortedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          startIndex={startIndex}
          endIndex={endIndex}
          itemsPerPage={itemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
}

