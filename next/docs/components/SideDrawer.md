---
title: SideDrawer
description: サイドドロワーメニューコンポーネントです。画面左に表示されるナビゲーションメニューを提供します。レスポンシブデザインに対応し、モバイルではオーバーレイ表示、デスクトップでは2列レイアウトで表示されます。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
previewComponent: SideDrawer
previewProps:
  isOpen: true
  onClose: "() => {}"
---

## 概要

SideDrawerは、画面左に表示されるサイドドロワーメニューコンポーネントです。レスポンシブデザインに対応し、画面幅に応じて表示方法を自動的に切り替えます。

## 特徴

- レスポンシブデザイン対応（モバイル: オーバーレイ、デスクトップ: 2列レイアウト）
- キーボードナビゲーション対応（Escapeキーで閉じる）
- フォーカス管理（開いたときに最初のメニュー項目にフォーカス、閉じたときにトリガーボタンにフォーカスを戻す）
- アクセシビリティ対応（ARIA属性の適切な使用）
- スムーズなアニメーション（300ms）

## Props

### SideDrawerProps

| プロパティ | 型 | 必須 | デフォルト値 | 説明 |
|---------|-----|------|------------|------|
| `isOpen` | `boolean` | ✅ | - | ドロワーの開閉状態 |
| `onClose` | `() => void` | ✅ | - | ドロワーを閉じるコールバック関数 |
| `menuItems` | `SideDrawerMenuItem[]` | ❌ | `DEFAULT_MENU_ITEMS` | メニュー項目の配列 |
| `triggerButtonRef` | `React.RefObject<HTMLButtonElement \| null>` | ❌ | - | トリガーボタンの参照（フォーカス管理用） |
| `className` | `string` | ❌ | `""` | 追加のCSSクラス |

### SideDrawerMenuItem

| プロパティ | 型 | 必須 | 説明 |
|---------|-----|------|------|
| `label` | `string` | ✅ | メニュー項目のラベル |
| `path` | `string` | ✅ | ナビゲーション先のパス |
| `icon` | `ReactNode` | ❌ | メニュー項目のアイコン |

## コードサンプル

### 基本的な使用例

```tsx
import { useState, useRef } from "react";
import SideDrawer from "@/components/SideDrawer";

function MyPage() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={toggleRef} onClick={() => setIsOpen(!isOpen)}>
        メニュー
      </button>
      <SideDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerButtonRef={toggleRef}
      />
    </>
  );
}
```

### カスタムメニュー項目

```tsx
import SideDrawer, { SideDrawerMenuItem } from "@/components/SideDrawer";

const customMenuItems: SideDrawerMenuItem[] = [
  {
    label: "ホーム",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    label: "設定",
    path: "/settings",
    icon: <SettingsIcon />,
  },
];

<SideDrawer
  isOpen={isOpen}
  onClose={handleClose}
  menuItems={customMenuItems}
/>
```

## バリエーション

### デフォルトメニュー項目を使用

`menuItems`プロップを省略すると、デフォルトのメニュー項目（ダッシュボード、プロフィール、セッティング）が表示されます。

```tsx
<SideDrawer isOpen={isOpen} onClose={handleClose} />
```

### レスポンシブ動作

- **モバイル（< 1024px）**: オーバーレイ表示、背景を暗くする
- **デスクトップ（>= 1024px）**: 2列レイアウト、メインコンテンツの幅を調整

## アクセシビリティ

- `role="navigation"`: ナビゲーションロールを設定
- `aria-label`: メニューの説明を提供
- `aria-expanded`: 開閉状態を明示
- キーボードナビゲーション: Escapeキーで閉じる
- フォーカス管理: 開いたときに最初のメニュー項目にフォーカス、閉じたときにトリガーボタンにフォーカスを戻す

## パフォーマンス

- `React.memo`でメモ化
- `useCallback`でコールバック関数をメモ化
- 不要な再レンダリングを防止

## 関連コンポーネント

- `Header`: ドロワーのトリガーボタンを提供
- `DEFAULT_MENU_ITEMS`: デフォルトのメニュー項目（`@/constants/menuItems`）
