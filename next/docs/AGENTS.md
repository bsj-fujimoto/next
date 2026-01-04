# AIエージェント向け開発ガイド - Next.jsプロジェクト

このドキュメントは、Next.jsプロジェクトの開発時にAIエージェントが参照すべき情報をまとめています。

## 重要: まずは`next/docs/README.md`を確認してください

**`next/docs/README.md`** に、Next.jsプロジェクトのドキュメント構造、配置ルール、コンポーネント開発時の手順などが詳しく記載されています。開発を始める前に必ず確認してください。

## クイックリファレンス

### コンポーネント開発時の必須確認事項

1. **既存コンポーネントドキュメントの確認**
   - 場所: `next/docs/components/`
   - 類似の機能を持つコンポーネントがないか確認
   - 既存コンポーネントを再利用できないか検討

2. **ドキュメントの更新**
   - 新規コンポーネント作成時は必ず`next/docs/components/[ComponentName].md`を作成
   - 実装に合わせてドキュメントを更新

3. **コンポーネントリストへの追加**
   - `componentList.tsx`に追加
   - `ComponentPreview.tsx`の`componentMap`に追加
   - `ComponentPreview.tsx`の`defaultProps`に追加
   - `page.tsx`の`SelectedComponent`型に追加

## 詳細情報

詳細な手順やルールについては、**`next/docs/README.md`** を参照してください。

## 参考資料

- Next.jsプロジェクト ドキュメント: `next/docs/README.md`
- プロジェクト全体のガイドライン: `docs/guidelines/FEATURE_DEVELOPMENT_GUIDELINE.md`
- Reactコーディング規約: `docs/guidelines/REACT_CODING_GUIDELINES.md`
- ドキュメント整理指針: `docs/README.md`
