---
title: StatCard
description: 統計情報を表示するカードコンポーネントです。アイコン、タイトル、数値を表示します。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
previewComponent: StatCard
previewProps:
  title: "サンプル"
  value: "123"
  icon: |
    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  gradientColors: "bg-gradient-to-br from-blue-500 to-blue-600"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import StatCard from "@/components/StatCard";

<StatCard
  title="総ユーザー数"
  value="1,234"
  icon={
    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  }
  gradientColors="bg-gradient-to-br from-blue-500 to-blue-600"
/>
```

## バリエーション

### 異なるグラデーション

グラデーションカラーを変更

```typescript
<StatCard
  title="売上"
  value="¥1,000,000"
  icon={icon}
  gradientColors="bg-gradient-to-br from-green-500 to-green-600"
/>

<StatCard
  title="注文数"
  value="500"
  icon={icon}
  gradientColors="bg-gradient-to-br from-purple-500 to-purple-600"
/>

<StatCard
  title="エラー"
  value="5"
  icon={icon}
  gradientColors="bg-gradient-to-br from-red-500 to-red-600"
/>
```

