---
title: SortableHeader
description: ソート可能なテーブルヘッダーコンポーネントです。クリックでソート順を切り替えられます。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
previewComponent: SortableHeader
previewProps:
  label: "名前"
  sortColumn: null
  sortDirection: "asc"
  currentColumn: "name"
  onSort: "() => {}"
  sortable: true
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import SortableHeader from "@/components/DataTable/SortableHeader";
import { useState } from "react";

const [sortColumn, setSortColumn] = useState<string | null>(null);
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

const handleSort = () => {
  if (sortColumn === "name") {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
    setSortColumn("name");
    setSortDirection("asc");
  }
};

<SortableHeader
  label="名前"
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  currentColumn="name"
  onSort={handleSort}
  sortable={true}
/>
```

## バリエーション

### ソート不可

ソート機能を無効にする

```typescript
sortable={false}
```

### ソートタイプについて

`SortableHeader`は単体ではソートタイプを指定できません。ソートタイプは`TableHeader`の`columns`定義で`sortType`プロパティを指定することで制御されます。

```typescript
const columns = [
  { key: "id", label: "ID", sortable: true, sortType: "number" },
  { key: "name", label: "名前", sortable: true }, // デフォルトは "string"
];
```

### TableHeader内での使用

TableHeaderコンポーネント内で自動的に使用されます

```typescript
// TableHeaderコンポーネント内でSortableHeaderが統合されています
<TableHeader
  columns={columns}  // columnsの定義でsortTypeプロパティを指定
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  onSort={handleSort}
/>
```

