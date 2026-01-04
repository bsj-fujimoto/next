# プロジェクト概要

このリポジトリは、複数のプロジェクトを含むモノレポ構造になっています。

## プロジェクト構造

```
プロジェクトルート/
├── docs/                          # プロジェクト全体のドキュメント
│   ├── guidelines/                # プロジェクト全体のガイドライン・規約
│   │   ├── FEATURE_DEVELOPMENT_GUIDELINE.md
│   │   ├── REACT_CODING_GUIDELINES.md
│   │   └── FEATURE_DEVELOPMENT_GUIDELINE_EVALUATION.md
│   └── README.md                  # ドキュメント整理指針
│
└── next/                          # Next.jsプロジェクト
    ├── docs/                      # Next.jsプロジェクト固有のドキュメント
    │   ├── components/            # コンポーネントドキュメント
    │   ├── plans/                 # 機能開発計画
    │   ├── reviews/               # レビュー・レポート
    │   ├── refactoring/           # リファクタリング計画
    │   ├── tests/                 # テスト計画・結果
    │   ├── README.md              # Next.jsプロジェクト ドキュメント
    │   └── AGENTS.md              # AIエージェント向け開発ガイド
    └── README.md                  # Next.jsプロジェクトのREADME
```

## 主要ドキュメント

### プロジェクト全体のガイドライン

- **機能開発ガイドライン**: `docs/guidelines/FEATURE_DEVELOPMENT_GUIDELINE.md`
  - 機能開発の9ステッププロセス
  - テスト駆動開発の手順
  - リファクタリングの計画と実施
  - セルフレビューのチェックリスト

- **Reactコーディング規約**: `docs/guidelines/REACT_CODING_GUIDELINES.md`
  - Reactコンポーネントの設計原則
  - Hooksの使用規則
  - パフォーマンス最適化のガイドライン

- **ドキュメント整理指針**: `docs/README.md`
  - ドキュメントの配置ルール
  - 命名規則
  - ドキュメントの更新ルール

### Next.jsプロジェクト

- **Next.jsプロジェクト ドキュメント**: `next/docs/README.md`
  - Next.jsプロジェクトのドキュメント構造
  - コンポーネント開発時の手順
  - ドキュメントの読み込み方法

- **AIエージェント向け開発ガイド**: `next/docs/AGENTS.md`
  - コンポーネント開発時の必須確認事項
  - クイックリファレンス

## AIエージェント向けガイド

AIエージェントがこのプロジェクトで作業する際は、**`AGENTS.md`** を最初に確認してください。

- **ルートのAGENTS.md**: `AGENTS.md` - プロジェクト全体のガイド
- **Next.jsプロジェクトのAGENTS.md**: `next/docs/AGENTS.md` - Next.jsプロジェクト固有のガイド

## 開発フロー

機能開発を行う際は、以下のガイドラインに従ってください：

1. **計画を立てる** (`docs/guidelines/FEATURE_DEVELOPMENT_GUIDELINE.md`のStep 1)
2. **テスト計画を立てる** (Step 2)
3. **テストコードを実装する** (Step 3)
4. **機能を実装する** (Step 4)
5. **テストコードを実行し、結果を確認する** (Step 5)
6. **ガイドライン遵守チェックを行いリファクタリングを計画する** (Step 6)
7. **リファクタリングを実施する** (Step 7)
8. **全てのテストを再実行し、結果を確認する** (Step 8)
9. **最終的なセルフレビューを行い、PRを作成する** (Step 9)

詳細は`docs/guidelines/FEATURE_DEVELOPMENT_GUIDELINE.md`を参照してください。

## ブランチ戦略

- 作業は必ず現在のブランチから適切な`feature/xxx/develop`ブランチを作成し、これをベースに進めること
- 全てのステップでは別のブランチ(`feature/xxx/step-xxx`)を作成して進むこと
- ステップ毎に適切なコミットメッセージでコミットしPRを作成すること
- PRは必ず一つ前の工程のブランチに向けて作成すること

## 参考資料

- 機能開発ガイドライン: `docs/guidelines/FEATURE_DEVELOPMENT_GUIDELINE.md`
- Reactコーディング規約: `docs/guidelines/REACT_CODING_GUIDELINES.md`
- ドキュメント整理指針: `docs/README.md`
- Next.jsプロジェクト ドキュメント: `next/docs/README.md`
- AIエージェント向けガイド: `AGENTS.md`
