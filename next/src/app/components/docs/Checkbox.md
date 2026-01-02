---
title: Checkbox
description: カスタムスタイルのチェックボックスコンポーネントです。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
previewComponent: Checkbox
previewProps:
  id: "demo-checkbox"
  label: "サンプルチェックボックス"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import Checkbox from "@/components/Checkbox";
import { useState } from "react";

const [isChecked, setIsChecked] = useState(false);

<Checkbox
  id="terms"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  label="利用規約に同意する"
/>
```

## バリエーション

### ラベルなし

ラベルを表示しない

```typescript
<Checkbox
  id="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

### カスタムラベル

HTMLを含むラベル

```typescript
<Checkbox
  id="terms"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  label={
    <>
      利用規約に同意する <a href="/terms" className="underline">詳細を見る</a>
    </>
  }
/>
```

