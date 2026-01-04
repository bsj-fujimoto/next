---
title: TableRow
description: テーブル行コンポーネントです。データの各行を表示します。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
previewComponent: TableRow
previewProps:
  item:
    id: 1
    name: "サンプル"
    category: "カテゴリ1"
  columns:
    - key: "id"
      label: "ID"
    - key: "name"
      label: "名前"
    - key: "category"
      label: "カテゴリ"
  index: 0
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import TableRow from "@/components/DataTable/TableRow";
import type { Column } from "@/types/table";

interface DataItem {
  id: number;
  name: string;
  category: string;
}

const item: DataItem = {
  id: 1,
  name: "アイテム1",
  category: "カテゴリ1",
};

const columns: Column<DataItem>[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "名前" },
  { key: "category", label: "カテゴリ" },
];

<TableRow
  item={item}
  columns={columns}
  index={0}
/>
```

## バリエーション

### カスタムレンダリング

特定のカラムをカスタムレンダリングする場合は、DataTableコンポーネントを拡張する必要があります

```typescript
// DataTableコンポーネント内でTableRowが自動的に使用されます
<DataTable
  data={data}
  columns={columns}
  // ... その他のプロップス
/>
```

