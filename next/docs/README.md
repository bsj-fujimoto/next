# Next.jsプロジェクト ドキュメント

このディレクトリには、Next.jsプロジェクト固有のドキュメントが整理されています。

## ディレクトリ構造

```
next/docs/
├── components/              # コンポーネントドキュメント
│   ├── DataTable.md
│   ├── Button.md
│   └── ...
├── plans/                   # 機能開発計画
│   └── [機能名]/
│       └── PLAN_[機能名].md
├── reviews/                 # レビュー・レポート
│   ├── FINAL_REVIEW.md
│   └── [機能名]/
│       └── ...
├── refactoring/             # リファクタリング計画
│   └── [機能名]/
│       └── REFACTORING_PLAN_[step].md
├── tests/                   # テスト計画・結果
│   └── [機能名]/
│       ├── TEST_PLAN_[機能名].md
│       └── TEST_RESULTS_[step].md
├── AGENTS.md                # AIエージェント向け開発ガイド（簡易版）
└── README.md                # このファイル
```

## 各ディレクトリの説明

### `components/`

**目的**: コンポーネントのドキュメントを格納

**命名規則**: `[ComponentName].md`（例: `DataTable.md`, `Button.md`）

**内容**:
- コンポーネントの概要
- Propsの説明（型、必須/任意、デフォルト値）
- 使用例
- バリエーション
- コードサンプル

**更新タイミング**:
- 新規コンポーネント作成時
- Propsの追加・変更時
- バリエーションの追加時
- リファクタリング時（構造が変わった場合）

### `plans/`

**目的**: 機能開発計画を格納

**構造**: `plans/[機能名]/PLAN_[機能名].md`

**例**: `plans/avatar-dropdown-menu/PLAN_avatar_dropdown.md`

### `reviews/`

**目的**: レビュー・レポートを格納

**構造**:
- 一般的なレビュー: `reviews/[レビュー名].md`
- 機能固有のレビュー: `reviews/[機能名]/[レビュー名].md`

**例**:
- `reviews/FINAL_REVIEW.md`
- `reviews/avatar-dropdown-menu/FINAL_REVIEW_avatar_dropdown.md`

### `refactoring/`

**目的**: リファクタリング計画を格納

**構造**: `refactoring/[機能名]/REFACTORING_PLAN_[step].md`

**例**: `refactoring/avatar-dropdown-menu/REFACTORING_PLAN_step6.md`

### `tests/`

**目的**: テスト計画・結果を格納

**構造**: `tests/[機能名]/[テスト関連ファイル].md`

**例**:
- `tests/avatar-dropdown-menu/TEST_PLAN_avatar_dropdown.md`
- `tests/avatar-dropdown-menu/TEST_RESULTS_step5.md`

## コンポーネント開発時のドキュメント確認

### 既存コンポーネントドキュメントの確認

新しいコンポーネントを実装する際は、**必ず既存のコンポーネントドキュメントを確認**してください。

**ドキュメントの場所**: `next/docs/components/`

**確認手順**:
1. 実装前に`next/docs/components/`ディレクトリを確認
2. 類似の機能を持つコンポーネントのドキュメントを参照
3. 既存のコンポーネントを再利用できないか検討
4. デザインパターンや実装パターンを参考にする

**例**:
- ドロップダウンメニューを実装する場合 → `DropdownMenu.md`を確認
- ボタンコンポーネントを実装する場合 → `Button.md`を確認

### ドキュメントの更新

コンポーネントを実装・更新した際は、**必ずドキュメントも更新**してください。

**更新タイミング**:
- 新規コンポーネント作成時
- Propsの追加・変更時
- バリエーションの追加時
- リファクタリング時（構造が変わった場合）

**更新内容**:
- コンポーネントの概要
- Propsの説明（型、必須/任意、デフォルト値）
- 使用例
- バリエーション
- コードサンプル

**ドキュメントファイルの場所**: `next/docs/components/[ComponentName].md`

## コンポーネント開発のチェックリスト

新しいコンポーネントを実装する際は、以下を確認してください：

- [ ] 既存のコンポーネントドキュメント（`next/docs/components/`）を確認した
- [ ] 類似の機能を持つコンポーネントがないか確認した
- [ ] 既存コンポーネントを再利用できないか検討した
- [ ] デザインパターンが既存コンポーネントと一貫している
- [ ] コンポーネントドキュメント（`next/docs/components/[ComponentName].md`）を作成・更新した
- [ ] `componentList.tsx`にコンポーネントを追加した
- [ ] `ComponentPreview.tsx`の`componentMap`に追加した
- [ ] `ComponentPreview.tsx`の`defaultProps`に追加した（プレビュー用）
- [ ] `page.tsx`の`SelectedComponent`型に追加した

## ドキュメントの読み込み

コンポーネントドキュメントは、`next/src/lib/markdown.ts`の`loadComponentMarkdown`関数で読み込まれます。

**パス**: `next/docs/components/[componentId].md`

**APIエンドポイント**: `/api/components/[id]`

**使用例**:
```typescript
// コンポーネント画面で自動的に読み込まれる
fetch(`/api/components/${selectedComponent}`)
  .then((res) => res.json())
  .then((data) => {
    // dataにはComponentMarkdownが含まれる
  });
```

## 命名規則

### ファイル名

- **PascalCase**: コンポーネントドキュメント（例: `DataTable.md`）
- **大文字とアンダースコア**: 計画、レビュー、テスト結果（例: `PLAN_avatar_dropdown.md`）
- **小文字とハイフン**: ディレクトリ名（例: `avatar-dropdown-menu/`）

### ディレクトリ名

- **小文字とハイフン**: 機能名やカテゴリ名（例: `avatar-dropdown-menu`, `components`）

## ドキュメントの移動・整理時の注意事項

### Git履歴の保持

- ファイルを移動する際は`git mv`コマンドを使用
- Git履歴を保持することで、変更の追跡が可能

### パスの更新

- ファイル内に他のドキュメントへの相対パス参照がある場合、移動後にパスを更新
- コード内のパス参照も更新が必要（例: Markdownファイルの読み込みパス）

### 動作確認

- ドキュメントを移動した後は、以下を確認：
  - ドキュメントが正しく読み込まれること
  - リンクが正しく機能すること
  - コード内のパス参照が正しく動作すること

## 参考資料

- プロジェクト全体のガイドライン: `docs/guidelines/FEATURE_DEVELOPMENT_GUIDELINE.md`
- Reactコーディング規約: `docs/guidelines/REACT_CODING_GUIDELINES.md`
- ドキュメント整理指針: `docs/README.md`
- AIエージェント向け開発ガイド: `next/docs/AGENTS.md`

