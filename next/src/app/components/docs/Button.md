---
title: Button
description: グラデーションや様々なスタイルのボタンコンポーネントです。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
  </svg>
previewComponent: Button
previewProps:
  children: "サンプルボタン"
  variant: "primary"
  size: "md"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import Button from "@/components/Button";

<Button onClick={() => alert("クリックされました")}>
  クリック
</Button>
```

## バリエーション

### バリアント

異なるスタイルのバリアント

```typescript
<Button variant="primary">プライマリ</Button>
<Button variant="secondary">セカンダリ</Button>
<Button variant="outline">アウトライン</Button>
<Button variant="ghost">ゴースト</Button>
```

### サイズ

異なるサイズ

```typescript
<Button size="sm">小さい</Button>
<Button size="md">中サイズ（デフォルト）</Button>
<Button size="lg">大きい</Button>
```

### アイコン付き

アイコンを追加

```typescript
<Button
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  }
>
  追加
</Button>
```

### 全幅

全幅のボタン

```typescript
<Button fullWidth>全幅ボタン</Button>
```

