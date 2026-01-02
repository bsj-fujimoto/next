---
title: Link
description: カスタムスタイルのリンクコンポーネントです。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
previewComponent: Link
previewProps:
  href: "#"
  children: "サンプルリンク"
  variant: "default"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import Link from "@/components/Link";

<Link href="/dashboard">ダッシュボードへ</Link>
```

## バリエーション

### バリアント

異なるスタイルのバリアント

```typescript
<Link href="/" variant="default">デフォルト</Link>
<Link href="/" variant="underline">アンダーライン</Link>
```

### カスタムクラス

追加のスタイルを適用

```typescript
<Link href="/" className="font-bold">太字リンク</Link>
```

