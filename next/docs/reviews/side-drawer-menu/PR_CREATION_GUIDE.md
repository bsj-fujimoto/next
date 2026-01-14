# サイドドロワーメニュー機能のPR作成ガイド

## PR作成の順序

各ステップのブランチは、一つ前の工程のブランチに向けてPRを作成する必要があります。

### PR作成の順序

1. **step-1 → main**
   - タイトル: `[Step 1] サイドドロワーメニュー機能の実装計画を作成`
   - 説明: Step 1の計画ドキュメント

2. **step-2 → step-1**
   - タイトル: `[Step 2] サイドドロワーメニュー機能のテスト計画を作成`
   - 説明: Step 2のテスト計画ドキュメント

3. **step-3 → step-2**
   - タイトル: `[Step 3] サイドドロワーメニュー機能のテストコードを実装（全て失敗することを確認）`
   - 説明: Step 3のテストコード実装

4. **step-4 → step-3**
   - タイトル: `[Step 4] サイドドロワーメニュー機能を実装`
   - 説明: Step 4の機能実装

5. **step-5 → step-4**
   - タイトル: `[Step 5] テストコードを実行し、結果を確認`
   - 説明: Step 5のテスト実行と結果確認

6. **step-6 → step-5**
   - タイトル: `[Step 6] ガイドライン遵守チェックを行いリファクタリング計画を作成`
   - 説明: Step 6のリファクタリング計画

7. **step-7 → step-6**
   - タイトル: `[Step 7] リファクタリングを実施`
   - 説明: Step 7のリファクタリング実施

8. **step-8 → step-7**
   - タイトル: `[Step 8] 全てのテストを再実行し、結果を確認`
   - 説明: Step 8のテスト再実行

9. **step-9 → step-8**
   - タイトル: `[Step 9] 最終的なセルフレビューを行い、PRを作成`
   - 説明: Step 9の最終レビューとドキュメント完成

## 各PRの説明テンプレート

### Step 1 PR
```markdown
## 概要
サイドドロワーメニュー機能の実装計画を作成しました。

## 変更内容
- 実装計画ドキュメントを作成
- 非機能要件を確認
- 依存関係を確認
- エッジケースとエラーハンドリングを検討

## 関連ドキュメント
- `next/docs/plans/side-drawer-menu/PLAN_side_drawer_menu.md`
```

### Step 2 PR
```markdown
## 概要
サイドドロワーメニュー機能のテスト計画を作成しました。

## 変更内容
- テスト計画ドキュメントを作成
- ユニットテスト、E2Eテスト、ビジュアルリグレッションテストの計画

## 関連ドキュメント
- `next/docs/tests/side-drawer-menu/TEST_PLAN_side_drawer_menu.md`
```

### Step 3 PR
```markdown
## 概要
サイドドロワーメニュー機能のテストコードを実装しました。

## 変更内容
- SideDrawerコンポーネントのユニットテストを実装
- E2EテストにSideDrawer関連のテストケースを追加
- ビジュアルリグレッションテストを追加

## 確認事項
- ✅ テストケースが全て失敗することを確認（期待通り）

## 関連ファイル
- `next/tests/unit/SideDrawer.test.tsx`
- `next/tests/e2e/dashboard.spec.ts`
- `next/tests/e2e/visual-regression.spec.ts`
```

### Step 4 PR
```markdown
## 概要
サイドドロワーメニュー機能を実装しました。

## 変更内容
- SideDrawerコンポーネントを作成
- Headerコンポーネントにドロワー開閉ボタンを追加
- DashboardPageにSideDrawerを統合
- レスポンシブレイアウトを実装

## 確認事項
- ✅ ビルドが成功することを確認
- ✅ コンソールエラーがないことを確認

## 関連ファイル
- `next/src/components/SideDrawer.tsx`
- `next/src/components/Header.tsx`
- `next/src/app/dashboard/page.tsx`
```

### Step 5 PR
```markdown
## 概要
テストコードを実行し、結果を確認しました。

## 変更内容
- ユニットテストを修正して全て成功
- E2Eテストを修正（getByTextの重複問題を解決）

## テスト結果
- ✅ ユニットテスト: 12 passed
- ✅ E2Eテスト: 全て成功

## 関連ファイル
- `next/tests/unit/SideDrawer.test.tsx`
- `next/tests/e2e/dashboard.spec.ts`
```

### Step 6 PR
```markdown
## 概要
ガイドライン遵守チェックを行い、リファクタリング計画を作成しました。

## 変更内容
- ガイドライン遵守状況を確認
- リファクタリング計画を作成

## 関連ドキュメント
- `next/docs/refactoring/side-drawer-menu/REFACTORING_PLAN_step6.md`
```

### Step 7 PR
```markdown
## 概要
リファクタリングを実施しました。

## 変更内容
- useEffectの依存配列を修正（無限ループの可能性を解消）
- 定数の外部化（DEFAULT_MENU_ITEMSをconstants/menuItems.tsxに移動）
- コードの重複削減

## 確認事項
- ✅ ビルドが成功することを確認
- ✅ テストが成功することを確認

## 関連ファイル
- `next/src/app/dashboard/page.tsx`
- `next/src/components/SideDrawer.tsx`
- `next/src/constants/menuItems.tsx`
```

### Step 8 PR
```markdown
## 概要
全てのテストを再実行し、結果を確認しました。

## 変更内容
- リファクタリング後のテストを実行
- テスト結果を確認

## テスト結果
- ✅ ユニットテスト: 12 passed
- ✅ カバレッジ: SideDrawer 95%, menuItems 100%
- ✅ E2Eテスト: 全て成功

## 関連ドキュメント
- `next/docs/tests/side-drawer-menu/TEST_RESULTS_step8.md`
```

### Step 9 PR
```markdown
## 概要
最終的なセルフレビューを行い、ドキュメントを完成しました。

## 変更内容
- SideDrawerコンポーネントのドキュメントを作成
- componentListにSideDrawerを追加
- ComponentPreviewにSideDrawerを追加
- 最終レビュードキュメントを作成

## 確認事項
- ✅ 全てのチェックリスト項目を確認済み
- ✅ npm audit: 脆弱性なし
- ✅ ビルドが成功することを確認

## 関連ファイル
- `next/docs/components/SideDrawer.md`
- `next/src/app/components/componentList.tsx`
- `next/src/app/components/ComponentPreview.tsx`
- `next/docs/reviews/side-drawer-menu/FINAL_REVIEW_side_drawer_menu.md`
```

## PR作成コマンド

各ブランチをリモートにプッシュしてからPRを作成してください：

```bash
# Step 1
git push origin feature/side-drawer-menu/step-1
# GitHubでPRを作成: step-1 → main

# Step 2
git push origin feature/side-drawer-menu/step-2
# GitHubでPRを作成: step-2 → step-1

# Step 3
git push origin feature/side-drawer-menu/step-3
# GitHubでPRを作成: step-3 → step-2

# Step 4
git push origin feature/side-drawer-menu/step-4
# GitHubでPRを作成: step-4 → step-3

# Step 5
git push origin feature/side-drawer-menu/step-5
# GitHubでPRを作成: step-5 → step-4

# Step 6
git push origin feature/side-drawer-menu/step-6
# GitHubでPRを作成: step-6 → step-5

# Step 7
git push origin feature/side-drawer-menu/step-7
# GitHubでPRを作成: step-7 → step-6

# Step 8
git push origin feature/side-drawer-menu/step-8
# GitHubでPRを作成: step-8 → step-7

# Step 9
git push origin feature/side-drawer-menu/step-9
# GitHubでPRを作成: step-9 → step-8
```
