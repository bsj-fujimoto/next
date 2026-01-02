---
title: Toast
description: 通知メッセージを表示するトースト（スナックバー）コンポーネントです。コピー成功時などの通知に使用されます。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
previewComponent: Toast
previewProps:
  message: "サンプルメッセージ"
  isVisible: true
  onClose: "() => {}"
  duration: 3000
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import Toast from "@/components/Toast";
import { useState } from "react";

const [toastVisible, setToastVisible] = useState(false);

<Toast
  message="クリップボードにコピーしました。"
  isVisible={toastVisible}
  onClose={() => setToastVisible(false)}
/>
```

## バリエーション

### カスタム表示時間

表示時間を変更

```typescript
<Toast
  message="メッセージ"
  isVisible={toastVisible}
  onClose={() => setToastVisible(false)}
  duration={5000}  // 5秒間表示
/>
```

### コピー成功時の使用例

クリップボードへのコピー成功時に表示

```typescript
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setToastVisible(true);
  } catch (err) {
    console.error('Failed to copy text to clipboard:', err);
  }
};

<Toast
  message="クリップボードにコピーしました。"
  isVisible={toastVisible}
  onClose={() => setToastVisible(false)}
/>
```

