# AIエージェント向け開発ガイド - Next.jsプロジェクト

このドキュメントは、Next.jsプロジェクトの開発時にAIエージェントが参照すべき情報をまとめています。

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

## ドキュメント構造

Next.jsプロジェクトのドキュメントは以下の構造で整理されています：

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
└── AGENTS.md                # このファイル
```

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

## 参考資料

- プロジェクト全体のガイドライン: `docs/guidelines/FEATURE_DEVELOPMENT_GUIDELINE.md`
- Reactコーディング規約: `docs/guidelines/REACT_CODING_GUIDELINES.md`
- ドキュメント整理指針: `docs/DOCUMENTATION_ORGANIZATION.md`

