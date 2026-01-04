# リファクタリング計画 - Step 6

## 概要

ガイドライン遵守チェックの結果、以下の改善が必要な項目を特定しました。それぞれの詳細な解説と修正方針を記載します。

### 改善が必要な項目一覧

1. [キーボードナビゲーションの完全実装](#1-キーボードナビゲーションの完全実装)
2. [Escapeキーでのメニュー閉鎖](#2-escapeキーでのメニュー閉鎖)
3. [ドロップダウンメニューの動的位置調整](#3-ドロップダウンメニューの動的位置調整)
4. [既存E2Eテストの修正](#4-既存e2eテストの修正)

---

## 1. キーボードナビゲーションの完全実装

### 違反内容
- **ファイル**: `next/src/components/AvatarDropdown.tsx`
- **ガイドライン**: アクセシビリティ - キーボードナビゲーションのサポート
- **問題**: 矢印キーでのメニュー項目間の移動が実装されていない

### 現在の実装
```typescript
// 現在はブラウザのデフォルト動作に依存
// Tabキーでのフォーカス移動は可能だが、矢印キーでの移動はできない
```

### 修正方針
1. `useEffect`でキーボードイベントリスナーを追加
2. 矢印キー（↑↓）でメニュー項目間を移動
3. Enter/Spaceキーでメニュー項目を選択
4. フォーカス管理を実装（メニューを開いた時に最初の項目にフォーカス）

### 修正後のコード例
```typescript
useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isOpen) return;

    const menuItems = Array.from(
      dropdownRef.current?.querySelectorAll('[role="menuitem"]') || []
    ) as HTMLElement[];
    
    const currentIndex = menuItems.findIndex(item => item === document.activeElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex]?.focus();
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        avatarButtonRef.current?.focus();
        break;
    }
  };

  if (isOpen) {
    document.addEventListener('keydown', handleKeyDown);
  }

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [isOpen]);
```

### コミット単位
- 1つのコミットで実装

---

## 2. Escapeキーでのメニュー閉鎖

### 違反内容
- **ファイル**: `next/src/components/AvatarDropdown.tsx`
- **ガイドライン**: アクセシビリティ - キーボードナビゲーションのサポート
- **問題**: Escapeキーでメニューを閉じる処理が実装されていない

### 現在の実装
```typescript
// Escapeキーでのメニュー閉鎖が実装されていない
```

### 修正方針
1. キーボードイベントリスナーでEscapeキーを検知
2. Escapeキーが押されたらメニューを閉じる
3. メニューを閉じた後、アバターアイコンボタンにフォーカスを戻す

### 修正後のコード例
```typescript
// 上記のキーボードナビゲーション実装に含める
case 'Escape':
  event.preventDefault();
  setIsOpen(false);
  avatarButtonRef.current?.focus();
  break;
```

### コミット単位
- キーボードナビゲーション実装と一緒に1つのコミットで実装

---

## 3. ドロップダウンメニューの動的位置調整

### 違反内容
- **ファイル**: `next/src/components/AvatarDropdown.tsx`
- **ガイドライン**: エラーハンドリング - エッジケースの処理
- **問題**: ドロップダウンメニューが画面外にはみ出す場合の位置調整が実装されていない

### 現在の実装
```typescript
// 現在は固定位置（top-full right-0）で表示
// 画面外にはみ出す可能性がある
```

### 修正方針
1. `useEffect`でメニューの位置を計算
2. メニューが画面外にはみ出す場合は上方向に表示
3. 右側にはみ出す場合は左方向に表示

### 修正後のコード例
```typescript
const [menuPosition, setMenuPosition] = useState<'bottom' | 'top'>('bottom');

useEffect(() => {
  if (isOpen && dropdownRef.current) {
    const rect = dropdownRef.current.getBoundingClientRect();
    const menuHeight = 200; // メニューの高さ（概算）
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
      setMenuPosition('top');
    } else {
      setMenuPosition('bottom');
    }
  }
}, [isOpen]);

// クラス名の動的変更
className={`absolute ${menuPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'} right-0 z-[9999] ...`}
```

### コミット単位
- 1つのコミットで実装

---

## 4. 既存E2Eテストの修正

### 違反内容
- **ファイル**: `next/tests/e2e/dashboard.spec.ts`
- **ガイドライン**: テストの品質 - テストの再現性
- **問題**: 既存のテストが失敗している（should navigate between pages, should change items per page, should logout successfully）

### 現在の実装
```typescript
// 既存のテストが新しいUI（アバターアイコン）に対応していない
```

### 修正方針
1. `should logout successfully`テストを修正（アバターアイコン経由のログアウトに対応）
2. 他の失敗しているテストの原因を調査し修正

### 修正後のコード例
```typescript
test('should logout successfully', async ({ page }) => {
  // アバターアイコン経由でログアウト
  const avatarButton = page.getByRole('button', { name: 'ユーザーメニュー' });
  await avatarButton.click();
  await page.waitForTimeout(500);
  
  const menu = page.locator('div[role="menu"]');
  await expect(menu).toBeVisible();
  
  const logoutMenuItem = page.getByRole('menuitem', { name: 'ログアウト' });
  await expect(logoutMenuItem).toBeVisible();
  await logoutMenuItem.evaluate((el: HTMLElement) => el.click());
  await page.waitForTimeout(1000);

  await expect(page).toHaveURL('/login');
  await expect(page.getByText('ようこそ')).toBeVisible();
});
```

### コミット単位
- 1つのコミットで修正

---

## 優先順位

1. **高優先度**: 既存E2Eテストの修正（機能の動作確認のため）
2. **中優先度**: キーボードナビゲーションの完全実装（アクセシビリティ向上）
3. **低優先度**: ドロップダウンメニューの動的位置調整（エッジケース対応）

---

## リファクタリング後の確認事項

- [ ] 全てのテストが成功する
- [ ] キーボードナビゲーションが正常に動作する
- [ ] Escapeキーでメニューが閉じる
- [ ] メニューの位置が適切に調整される
- [ ] ガイドラインに準拠している


