---
title: ItemsPerPageDropdown
description: 表示件数を選択するカスタムドロップダウンコンポーネントです。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
previewComponent: ItemsPerPageDropdown
previewProps:
  value: 20
  options: [10, 20, 50, 100]
  onChange: "() => {}"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import ItemsPerPageDropdown from "@/components/DataTable/ItemsPerPageDropdown";
import { useState } from "react";

const [itemsPerPage, setItemsPerPage] = useState(20);

<ItemsPerPageDropdown
  value={itemsPerPage}
  options={[10, 20, 50, 100]}
  onChange={setItemsPerPage}
/>
```

## バリエーション

### カスタムオプション

表示件数のオプションをカスタマイズ

```typescript
options={[5, 10, 25, 50, 100, 200]}
```

### Pagination内での使用

Paginationコンポーネント内で自動的に使用されます

```typescript
// Paginationコンポーネント内でItemsPerPageDropdownが統合されています
<Pagination
  itemsPerPage={itemsPerPage}
  itemsPerPageOptions={[10, 20, 50, 100]}
  onItemsPerPageChange={setItemsPerPage}
  // ... その他のプロップス
/>
```

