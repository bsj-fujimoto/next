---
title: DropdownMenu
description: 共通のドロップダウンメニューコンポーネントです。デザインや表示位置調整ロジックを共通化しています。
icon: <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
previewComponent: DropdownMenu
previewProps:
  trigger: <button className="px-4 py-2 bg-blue-500 text-white rounded">メニューを開く</button>
  items:
    - label: "項目1"
      onClick: "() => console.log('項目1がクリックされました')"
    - label: "項目2"
      onClick: "() => console.log('項目2がクリックされました')"
    - label: "項目3"
      onClick: "() => console.log('項目3がクリックされました')"
---

## 概要

DropdownMenuは、共通のドロップダウンメニュー機能を提供するコンポーネントです。デザインや表示位置調整ロジックを共通化し、AvatarDropdownやItemsPerPageDropdownなどのコンポーネントで使用されます。

## 特徴

- キーボードナビゲーション対応（矢印キー、Escapeキー）
- クリックアウトサイドで自動的に閉じる
- スクロール・リサイズ時に自動的に閉じる
- カスタマイズ可能なトリガーとメニュー項目
- 左寄せ・右寄せの配置に対応

## コードサンプル

\`\`\`tsx
import DropdownMenu, { DropdownMenuItem } from "@/components/DropdownMenu";

const menuItems: DropdownMenuItem[] = [
  {
    label: "プロフィール",
    onClick: () => router.push("/profile"),
    icon: <ProfileIcon />,
  },
  {
    label: "セッティング",
    onClick: () => router.push("/settings"),
    icon: <SettingsIcon />,
  },
  {
    label: "ログアウト",
    onClick: () => logout(),
    icon: <LogoutIcon />,
    className: "border-t border-gray-200",
  },
];

<DropdownMenu
  trigger={<button>メニュー</button>}
  items={menuItems}
  align="right"
/>
\`\`\`

## バリエーション

### 左寄せ配置

\`\`\`tsx
<DropdownMenu
  trigger={<button>メニュー</button>}
  items={menuItems}
  align="left"
/>
\`\`\`

### 右寄せ配置

\`\`\`tsx
<DropdownMenu
  trigger={<button>メニュー</button>}
  items={menuItems}
  align="right"
/>
\`\`\`

