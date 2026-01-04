# ドキュメント整理指針

## 目的

このドキュメントは、プロジェクト内のMarkdownファイルを適切に整理・分類するための指針を定義します。ドキュメントの配置ルールを明確にすることで、開発者が効率的にドキュメントを見つけ、維持管理できるようにします。

## 基本方針

### 1. ドキュメントの分類基準

ドキュメントは以下の基準で分類します：

- **プロジェクト全体のガイドライン**: プロジェクト全体に適用されるルールや規約
- **プロジェクト固有のドキュメント**: 特定のプロジェクト（例: next）にのみ関連するドキュメント

### 2. ディレクトリ構造

```
プロジェクトルート/
├── docs/                          # プロジェクト全体のドキュメント
│   └── guidelines/                # プロジェクト全体のガイドライン・規約
│
└── [プロジェクト名]/              # 例: next/
    └── docs/                      # プロジェクト固有のドキュメント
        ├── components/            # コンポーネントドキュメント
        ├── plans/                 # 機能開発計画
        ├── reviews/               # レビュー・レポート
        ├── refactoring/           # リファクタリング計画
        ├── tests/                 # テスト計画・結果
        └── AGENTS.md              # AIエージェント向け開発ガイド
```

## 配置ルール

### プロジェクトルートの`docs/`以下

**配置対象**:
- プロジェクト全体に適用されるガイドライン
- 複数のプロジェクトで共有される規約
- プロジェクト全体の開発プロセスに関するドキュメント

**例**:
- `FEATURE_DEVELOPMENT_GUIDELINE.md` - 機能開発のガイドライン
- `REACT_CODING_GUIDELINES.md` - Reactコーディング規約
- `FEATURE_DEVELOPMENT_GUIDELINE_EVALUATION.md` - ガイドライン評価

### プロジェクト固有の`[プロジェクト名]/docs/`以下

**配置対象**:
- 特定のプロジェクトにのみ関連するドキュメント
- そのプロジェクトの開発・運用に関するドキュメント

#### `[プロジェクト名]/docs/components/`

**配置対象**: コンポーネントのドキュメント

**命名規則**: `[ComponentName].md`（例: `DataTable.md`, `Button.md`）

**内容**:
- コンポーネントの概要
- Propsの説明
- 使用例
- バリエーション
- コードサンプル

#### `[プロジェクト名]/docs/plans/`

**配置対象**: 機能開発計画

**構造**: `plans/[機能名]/PLAN_[機能名].md`

**例**:
- `plans/avatar-dropdown-menu/PLAN_avatar_dropdown.md`

#### `[プロジェクト名]/docs/reviews/`

**配置対象**: レビュー・レポート

**構造**:
- 一般的なレビュー: `reviews/[レビュー名].md`
- 機能固有のレビュー: `reviews/[機能名]/[レビュー名].md`

**例**:
- `reviews/FINAL_REVIEW.md`
- `reviews/avatar-dropdown-menu/FINAL_REVIEW_avatar_dropdown.md`
- `reviews/avatar-dropdown-menu/REVIEW_FEEDBACK_SUMMARY.md`

#### `[プロジェクト名]/docs/refactoring/`

**配置対象**: リファクタリング計画

**構造**: `refactoring/[機能名]/REFACTORING_PLAN_[step].md`

**例**:
- `refactoring/avatar-dropdown-menu/REFACTORING_PLAN_step6.md`

#### `[プロジェクト名]/docs/tests/`

**配置対象**: テスト計画・結果

**構造**: `tests/[機能名]/[テスト関連ファイル].md`

**例**:
- `tests/avatar-dropdown-menu/TEST_PLAN_avatar_dropdown.md`
- `tests/avatar-dropdown-menu/TEST_RESULTS_step5.md`

#### `[プロジェクト名]/docs/AGENTS.md`

**配置対象**: AIエージェント向けの開発ガイド

**内容**:
- プロジェクト固有の開発手順
- ドキュメントの確認・更新方法
- コンポーネント開発時の注意事項

## 命名規則

### ファイル名

- **大文字とアンダースコア**: ガイドライン、計画、レビューなど（例: `FEATURE_DEVELOPMENT_GUIDELINE.md`）
- **PascalCase**: コンポーネントドキュメント（例: `DataTable.md`）
- **小文字とハイフン**: ディレクトリ名（例: `avatar-dropdown-menu/`）

### ディレクトリ名

- **小文字とハイフン**: 機能名やカテゴリ名（例: `avatar-dropdown-menu`, `components`）

## ドキュメントの更新ルール

### コンポーネントドキュメント

1. **新規コンポーネント作成時**:
   - `[プロジェクト名]/docs/components/[ComponentName].md`を作成
   - コンポーネントの実装に合わせて内容を記載

2. **コンポーネント更新時**:
   - 実装の変更に合わせてドキュメントを更新
   - Propsの追加・変更、バリエーションの追加などを反映

3. **リファクタリング時**:
   - コンポーネントの構造が変わった場合は、ドキュメントも更新

### 機能開発計画・レビュー

1. **機能開発開始時**:
   - `docs/plans/[機能名]/PLAN_[機能名].md`を作成

2. **レビュー時**:
   - `docs/reviews/[機能名]/`以下にレビュー結果を保存

3. **テスト結果**:
   - `docs/tests/[機能名]/`以下にテスト計画・結果を保存

## 移動・整理時の注意事項

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

## 例: Next.jsプロジェクトのドキュメント構造

```
next/
├── docs/
│   ├── components/              # コンポーネントドキュメント
│   │   ├── DataTable.md
│   │   ├── Button.md
│   │   └── ...
│   ├── plans/                   # 機能開発計画
│   │   └── avatar-dropdown-menu/
│   │       └── PLAN_avatar_dropdown.md
│   ├── reviews/                 # レビュー・レポート
│   │   ├── FINAL_REVIEW.md
│   │   └── avatar-dropdown-menu/
│   │       ├── FINAL_REVIEW_avatar_dropdown.md
│   │       └── REVIEW_FEEDBACK_SUMMARY.md
│   ├── refactoring/             # リファクタリング計画
│   │   └── avatar-dropdown-menu/
│   │       └── REFACTORING_PLAN_step6.md
│   ├── tests/                   # テスト計画・結果
│   │   └── avatar-dropdown-menu/
│   │       ├── TEST_PLAN_avatar_dropdown.md
│   │       └── TEST_RESULTS_step5.md
│   └── AGENTS.md                # AIエージェント向け開発ガイド
├── README.md                    # プロジェクトのREADME
└── DEVELOPMENT_FLOW.md          # 開発フロー（既存の場所に残す）
```

## 参考

- この指針に基づいて整理されたドキュメント構造を維持する
- 新しいドキュメントを追加する際は、この指針に従って配置する
- 指針自体も、プロジェクトの成長に合わせて更新する

