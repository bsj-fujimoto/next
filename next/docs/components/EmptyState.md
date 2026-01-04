---
title: EmptyState
description: 空の状態を表示するコンポーネントです。検索結果が見つからない場合などに使用されます。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
previewComponent: EmptyState
previewProps: {}
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import EmptyState from "@/components/DataTable/EmptyState";

<EmptyState />
```

## バリエーション

### カスタムメッセージ

EmptyStateコンポーネントを拡張してカスタムメッセージを表示する場合は、コンポーネントを修正する必要があります

```typescript
// DataTableコンポーネント内で、データが空の場合に自動的にEmptyStateが表示されます
<DataTable
  data={[]}  // 空のデータ
  columns={columns}
  // ... その他のプロップス
/>
```

