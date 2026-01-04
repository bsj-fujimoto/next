---
title: StatusBadge
description: ステータスを表示するバッジコンポーネントです。成功、保留中、失敗などの状態を表示します。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
  </svg>
previewComponent: StatusBadge
previewProps:
  status: "success"
  children: "サンプル"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import StatusBadge from "@/components/StatusBadge";

<StatusBadge status="success">成功</StatusBadge>
<StatusBadge status="pending">保留中</StatusBadge>
<StatusBadge status="failed">失敗</StatusBadge>
<StatusBadge status="warning">警告</StatusBadge>
```

## バリエーション

### ステータスタイプ

異なるステータスタイプ

```typescript
<StatusBadge status="success">処理完了</StatusBadge>
<StatusBadge status="pending">処理中</StatusBadge>
<StatusBadge status="failed">エラー</StatusBadge>
<StatusBadge status="warning">注意</StatusBadge>
```

### カスタムクラス

追加のスタイルを適用

```typescript
<StatusBadge status="success" className="text-lg">大きなバッジ</StatusBadge>
```

