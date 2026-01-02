---
title: TableHeader
description: テーブルヘッダーコンポーネントです。複数のカラムを管理し、ソート機能を提供します。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18" />
  </svg>
previewComponent: TableHeader
previewProps:
  columns:
    - key: "name"
      label: "名前"
      sortable: true
  sortColumn: null
  sortDirection: "asc"
  onSort: "() => {}"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import TableHeader from "@/components/DataTable/TableHeader";
import { useState } from "react";
import type { Column } from "@/types/table";

interface DataItem {
  id: number;
  name: string;
  category: string;
}

const columns: Column<DataItem>[] = [
  { key: "id", label: "ID", sortable: true, sortType: "number" },
  { key: "name", label: "名前", sortable: true },
  { key: "category", label: "カテゴリ", sortable: false },
];

const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null);
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

const handleSort = (column: keyof DataItem) => {
  if (sortColumn === column) {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
    setSortColumn(column);
    setSortDirection("asc");
  }
};

<TableHeader
  columns={columns}
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  onSort={handleSort}
/>
```

## バリエーション

### ソート不可のカラム

特定のカラムをソート不可にする

```typescript
{ key: "category", label: "カテゴリ", sortable: false }
```

### ソートタイプの指定

数値や日付としてソートする場合は、`sortType`を指定します

```typescript
import type { Column } from "@/types/table";

const columns: Column<DataItem>[] = [
  { key: "id", label: "ID", sortable: true, sortType: "number" },
  { key: "name", label: "名前", sortable: true }, // デフォルトは "string"
  { key: "createdAt", label: "作成日", sortable: true, sortType: "date" },
];
```

`sortType`のオプション:
- `"string"` (デフォルト): 文字列としてソート
- `"number"`: 数値としてソート
- `"date"`: 日付としてソート

### DataTable内での使用

DataTableコンポーネント内で自動的に使用されます

```typescript
<DataTable
  data={data}
  columns={columns}  // columnsの定義でsortableプロパティとsortTypeプロパティを指定
  // ... その他のプロップス
/>
```

