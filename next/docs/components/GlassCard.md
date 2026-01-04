---
title: GlassCard
description: ガラスモーフィズム効果のカードコンテナコンポーネントです。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
previewComponent: GlassCard
previewProps:
  children: "カードコンテンツ"
  padding: "md"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import GlassCard from "@/components/GlassCard";

<GlassCard>
  <h2 className="text-xl font-bold text-white mb-4">タイトル</h2>
  <p className="text-white/70">コンテンツ</p>
</GlassCard>
```

## バリエーション

### パディングサイズ

パディングサイズを変更

```typescript
<GlassCard padding="sm">小さいパディング</GlassCard>
<GlassCard padding="md">中サイズのパディング（デフォルト）</GlassCard>
<GlassCard padding="lg">大きいパディング</GlassCard>
```

### カスタムクラス

追加のスタイルを適用

```typescript
<GlassCard className="mt-4">カスタムスタイル</GlassCard>
```

