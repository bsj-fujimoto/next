# サイドドロワーメニュー機能のリファクタリング計画

## 概要

ガイドライン遵守チェックの結果、以下の項目についてリファクタリングが必要です：

1. [コンポーネントの分割](#1-コンポーネントの分割)
2. [定数の外部化](#2-定数の外部化)
3. [状態管理の最適化](#3-状態管理の最適化)
4. [useEffectの依存配列の修正](#4-useeffectの依存配列の修正)
5. [カスタムフックの抽出](#5-カスタムフックの抽出)

## 優先順位

1. **高優先度**: useEffectの依存配列の修正（無限ループの可能性）
2. **中優先度**: コンポーネントの分割、定数の外部化
3. **低優先度**: カスタムフックの抽出

## 詳細な解説

### 1. コンポーネントの分割

**問題点**:
- `SideDrawer.tsx`が201行と長い（ガイドライン: 200行以内）
- メニュー項目のレンダリングロジックがコンポーネント内に含まれている

**修正方針**:
- `SideDrawerMenuItem`コンポーネントを分離
- `SideDrawerHeader`コンポーネントを分離
- メニュー項目のレンダリングロジックを別コンポーネントに分離

**修正対象ファイル**:
- `next/src/components/SideDrawer.tsx`

**修正内容**:
```tsx
// SideDrawerMenuItem.tsx を新規作成
function SideDrawerMenuItem({ item, onClick }: { item: SideDrawerMenuItem; onClick: (path: string) => void }) {
  // メニュー項目のレンダリングロジック
}

// SideDrawerHeader.tsx を新規作成
function SideDrawerHeader({ isMobile, onClose }: { isMobile: boolean; onClose: () => void }) {
  // ヘッダーのレンダリングロジック
}
```

### 2. 定数の外部化

**問題点**:
- `defaultMenuItems`がコンポーネント内で定義されている
- メニュー項目のアイコンがインラインで定義されている

**修正方針**:
- `defaultMenuItems`を定数ファイルに移動
- アイコンコンポーネントを別ファイルに分離

**修正対象ファイル**:
- `next/src/components/SideDrawer.tsx`
- `next/src/constants/menuItems.ts` (新規作成)
- `next/src/components/SideDrawer/icons.tsx` (新規作成)

**修正内容**:
```tsx
// constants/menuItems.ts
export const DEFAULT_MENU_ITEMS: SideDrawerMenuItem[] = [
  {
    label: "ダッシュボード",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  // ...
];

// components/SideDrawer/icons.tsx
export function DashboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* ... */}
    </svg>
  );
}
```

### 3. 状態管理の最適化

**問題点**:
- `DashboardPage`と`SideDrawer`の両方で`isMobile`の状態を管理している
- 状態の重複管理

**修正方針**:
- `isMobile`の状態管理を`SideDrawer`コンポーネント内に統一
- `DashboardPage`から`isMobile`の状態管理を削除

**修正対象ファイル**:
- `next/src/app/dashboard/page.tsx`

**修正内容**:
```tsx
// DashboardPageからisMobileの状態管理を削除
// SideDrawerコンポーネント内でisMobileを管理
```

### 4. useEffectの依存配列の修正

**問題点**:
- `DashboardPage`の`useEffect`の依存配列に`isDrawerOpen`が含まれている
- これにより、`isDrawerOpen`が変更されるたびに`useEffect`が実行され、無限ループの可能性がある

**修正方針**:
- 依存配列から`isDrawerOpen`を削除
- `checkMobile`関数内で`isDrawerOpen`の状態を直接参照しない

**修正対象ファイル**:
- `next/src/app/dashboard/page.tsx`

**修正内容**:
```tsx
// 修正前
useEffect(() => {
  const checkMobile = () => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    if (mobile && isDrawerOpen) {
      setIsDrawerOpen(false);
    }
    if (!mobile && !isDrawerOpen) {
      setIsDrawerOpen(true);
    }
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, [isDrawerOpen]); // 問題: isDrawerOpenが依存配列に含まれている

// 修正後
useEffect(() => {
  const checkMobile = () => {
    const mobile = window.innerWidth < 1024;
    setIsMobile(mobile);
    setIsDrawerOpen((prev) => {
      // モバイルの場合は閉じる、デスクトップの場合は開く
      return mobile ? false : true;
    });
  };
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []); // 依存配列を空にする
```

### 5. カスタムフックの抽出

**問題点**:
- レスポンシブ判定のロジックが複数のコンポーネントで重複している

**修正方針**:
- `useResponsive`カスタムフックを作成
- モバイル判定のロジックを共通化

**修正対象ファイル**:
- `next/src/hooks/useResponsive.ts` (新規作成)
- `next/src/components/SideDrawer.tsx`
- `next/src/app/dashboard/page.tsx`

**修正内容**:
```tsx
// hooks/useResponsive.ts
export function useResponsive(breakpoint: number = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
```

## 修正の実施順序

1. **useEffectの依存配列の修正**（高優先度）
   - `DashboardPage`の`useEffect`を修正
   - テストを実行して動作確認

2. **定数の外部化**（中優先度）
   - メニュー項目の定数を外部ファイルに移動
   - アイコンコンポーネントを分離
   - テストを実行して動作確認

3. **コンポーネントの分割**（中優先度）
   - `SideDrawerMenuItem`コンポーネントを分離
   - `SideDrawerHeader`コンポーネントを分離
   - テストを実行して動作確認

4. **カスタムフックの抽出**（低優先度）
   - `useResponsive`フックを作成
   - 各コンポーネントで使用
   - テストを実行して動作確認

5. **状態管理の最適化**（低優先度）
   - `DashboardPage`から`isMobile`の状態管理を削除
   - テストを実行して動作確認

## 注意事項

- 各修正後に必ずテストを実行して動作確認を行うこと
- コンポーネント分割は一つずつ実施し、それぞれのコミットを分けること
- 同じ違反は同じコミットで修正すること
