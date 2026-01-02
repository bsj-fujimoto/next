---
title: Pagination
description: ページネーション機能を提供するコンポーネントです。表示件数の選択機能も含まれています。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
  </svg>
previewComponent: Pagination
previewProps:
  currentPage: 1
  totalPages: 10
  totalItems: 200
  startIndex: 0
  endIndex: 20
  itemsPerPage: 20
  itemsPerPageOptions: [10, 20, 50, 100]
  onPageChange: "() => {}"
  onItemsPerPageChange: "() => {}"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import Pagination from "@/components/DataTable/Pagination";
import { useState } from "react";

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(20);
const totalItems = 200;
const totalPages = Math.ceil(totalItems / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  startIndex={startIndex}
  endIndex={endIndex}
  itemsPerPage={itemsPerPage}
  itemsPerPageOptions={[10, 20, 50, 100]}
  onPageChange={setCurrentPage}
  onItemsPerPageChange={setItemsPerPage}
/>
```

## バリエーション

### カスタム表示件数オプション

表示件数のオプションをカスタマイズ

```typescript
itemsPerPageOptions={[5, 10, 25, 50, 100, 200]}
```

### DataTable内での使用

DataTableに組み込まれている場合、Paginationは自動的に表示されます

```typescript
// DataTableコンポーネントのpaginationプロパティで有効/無効を切り替え
<DataTable
  data={data}
  columns={columns}
  pagination={true}  // trueにするとPaginationが表示される
/>
```

