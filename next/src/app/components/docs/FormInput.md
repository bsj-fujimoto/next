---
title: FormInput
description: アイコン付きのフォーム入力フィールドコンポーネントです。メールアドレス、パスワードなどで使用されています。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
previewComponent: FormInput
previewProps:
  id: "demo-input"
  type: "text"
  label: "サンプル入力"
  placeholder: "入力してください"
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import FormInput from "@/components/FormInput";
import { useState } from "react";

const [email, setEmail] = useState("");

<FormInput
  id="email"
  type="email"
  label="メールアドレス"
  placeholder="example@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

## バリエーション

### アイコン付き

アイコンを追加

```typescript
<FormInput
  id="email"
  type="email"
  label="メールアドレス"
  icon={
    <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  }
  placeholder="example@email.com"
/>
```

### エラー表示

エラーメッセージを表示

```typescript
<FormInput
  id="email"
  type="email"
  label="メールアドレス"
  placeholder="example@email.com"
  error="有効なメールアドレスを入力してください"
/>
```

### パスワード入力

パスワードタイプの入力

```typescript
<FormInput
  id="password"
  type="password"
  label="パスワード"
  placeholder="パスワードを入力"
/>
```

