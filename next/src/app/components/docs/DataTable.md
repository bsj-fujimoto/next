---
title: DataTable
description: 検索、ソート、ページネーション機能を備えたデータテーブルコンポーネントです。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
previewComponent: DataTable
previewProps:
  searchable: true
  pagination: true
  itemsPerPageOptions: [10, 20, 50, 100]
  defaultItemsPerPage: 20
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import DataTable from "@/components/DataTable";
import type { Column } from "@/types/table";

// データのフォーマット: オブジェクトの配列
// 各オブジェクトは、columnsで指定したkeyプロパティを持つ必要があります
interface DataItem {
  id: number;
  name: string;
  category: string;
}

const data: DataItem[] = [
  { id: 1, name: "アイテム1", category: "カテゴリ1" },
  { id: 2, name: "アイテム2", category: "カテゴリ2" },
  // ...
];

const columns: Column<DataItem>[] = [
  { key: "id", label: "ID", sortable: true, sortType: "number" },
  { key: "name", label: "名前", sortable: true },
  { key: "category", label: "カテゴリ", sortable: true },
];

<DataTable
  data={data}
  columns={columns}
  searchable={true}
  pagination={true}
  itemsPerPageOptions={[10, 20, 50, 100]}
  defaultItemsPerPage={20}
/>
```

## バリエーション

### 検索なし

検索機能を無効にしたバージョン

```typescript
searchable={false}
```

### ページネーションなし

ページネーションを無効にしたバージョン

```typescript
pagination={false}
```

### カスタム表示件数

表示件数のオプションをカスタマイズ

```typescript
itemsPerPageOptions={[5, 10, 25, 50, 100]}
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

