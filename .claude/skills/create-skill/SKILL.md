---
name: create-skill
description: Create a new Claude Code skill following official specifications. Use when creating custom skills, adding skill documentation, or setting up skill directories. Covers YAML frontmatter, markdown structure, and best practices.
allowed-tools: Read, Write, Bash, Grep, Glob
---

# Claude Code スキル作成ガイド

Claude Code用の新しいスキルを公式仕様に従って作成するためのガイドです。

## Instructions

### ステップ1: スキルディレクトリの作成

スキルの配置場所を決定し、ディレクトリを作成します。

**配置場所の選択:**
- **プロジェクト用**: `.claude/skills/skill-name/`
- **個人用（グローバル）**: `~/.claude/skills/skill-name/`
- **プラグイン用**: プラグイン内の `skills/` ディレクトリ

```bash
# プロジェクト用スキル
mkdir -p .claude/skills/your-skill-name

# 個人用スキル
mkdir -p ~/.claude/skills/your-skill-name
```

### ステップ2: SKILL.md の作成

必須ファイル `SKILL.md` を作成します。

**ファイル構造:**
```
.claude/skills/your-skill-name/
├── SKILL.md (必須)
├── reference.md (オプション)
├── examples.md (オプション)
├── scripts/ (オプション)
│   └── helper.py
└── templates/ (オプション)
    └── template.txt
```

### ステップ3: YAMLフロントマターの作成

`SKILL.md` の先頭にYAMLフロントマターを追加します。

**必須フィールド:**
```yaml
---
name: your-skill-name
description: Brief description of what this skill does and when to use it
---
```

**推奨フィールド:**
```yaml
---
name: your-skill-name
description: Detailed description including what it does and trigger keywords
allowed-tools: Read, Write, Edit, Grep, Glob
---
```

**フィールドの要件:**

- **name**:
  - 小文字、数字、ハイフンのみ使用
  - 最大64文字
  - 例: `pdf-processor`, `git-commit`, `add-theme`

- **description**:
  - 最大1024文字
  - 「何をするか」を明確に記述
  - 「いつ使うか」のトリガーワードを含める
  - Claudeがスキルを自動選択する際の判断材料になる

- **allowed-tools** (推奨):
  - スキルが使用できるツールを制限
  - カンマ区切りで列挙
  - 例: `Read, Write, Edit, Bash, Grep, Glob`

### ステップ4: スキルコンテンツの作成

YAMLフロントマターの後にMarkdownでスキル内容を記述します。

**推奨構造:**

```markdown
---
name: your-skill-name
description: ...
allowed-tools: ...
---

# スキルタイトル

スキルの概要説明。

## Instructions

### ステップ1: 最初のステップ

詳細な手順...

### ステップ2: 次のステップ

詳細な手順...

## Examples

### 例1: ユースケース1

具体的なコード例やコマンド例...

### 例2: ユースケース2

具体的なコード例やコマンド例...

## Reference Files

関連ファイルへのリンク:
- [参照ドキュメント](reference.md)
- [追加の例](examples.md)

## Troubleshooting

よくある問題と解決策...

## Version History

- v1.0.0 (YYYY-MM-DD): Initial release
```

### ステップ5: 検証とテスト

作成したスキルが正しく機能することを確認します。

1. **YAML構文チェック**: フロントマターが有効なYAMLか確認
2. **Markdown構文チェック**: リンクやコードブロックが正しいか確認
3. **実際に使用**: スキルを呼び出して動作を確認

## Examples

### 例1: シンプルな読み取り専用スキル

```markdown
---
name: safe-file-reader
description: Read files without making changes. Use when you need read-only file access for reviewing code, documentation, or configuration files.
allowed-tools: Read, Grep, Glob
---

# Safe File Reader

このスキルは読み取り専用のファイルアクセスを提供します。

## Instructions

### ステップ1: ファイルの検索

Globツールを使用してファイルを検索します。

\`\`\`bash
# パターンマッチでファイルを検索
*.ts, *.tsx, *.js
\`\`\`

### ステップ2: ファイルの読み取り

Readツールを使用してファイルを表示します。

### ステップ3: コンテンツの検索

Grepツールを使用してファイル内を検索します。

## Examples

### 例: TypeScriptファイルの検索と読み取り

1. `*.ts` パターンでファイルを検索
2. 該当ファイルを読み取り
3. 特定のクラス名を検索

## Version History

- v1.0.0 (2025-01-01): Initial release
```

### 例2: PDF処理スキル（トリガーワード重視）

```markdown
---
name: pdf-processor
description: Extract text and tables from PDF files, fill PDF forms, merge PDFs, and convert PDFs to other formats. Use when working with PDF documents, forms, extracting data from PDFs, or when the user mentions PDF files, document processing, or form filling.
allowed-tools: Bash, Read, Write
---

# PDF Processor

PDFファイルの処理を行うスキルです。

## Instructions

### ステップ1: PDF情報の取得

pdftkやpdfinfo等のツールを使用してPDF情報を取得します。

### ステップ2: テキスト抽出

pdftotextを使用してテキストを抽出します。

### ステップ3: フォーム入力

pdftk等を使用してフォームに入力します。

## Examples

### 例1: テキスト抽出

\`\`\`bash
pdftotext input.pdf output.txt
\`\`\`

### 例2: PDF結合

\`\`\`bash
pdfunite file1.pdf file2.pdf output.pdf
\`\`\`

## Troubleshooting

### ツールがインストールされていない

必要なツールをインストール:
\`\`\`bash
# macOS
brew install poppler

# Ubuntu
apt-get install poppler-utils
\`\`\`

## Version History

- v1.0.0 (2025-01-01): Initial release
```

### 例3: Git コミットメッセージスキル

```markdown
---
name: git-commit-helper
description: Generate conventional commit messages following best practices. Use when creating git commits, writing commit messages, or when the user asks to commit changes with proper formatting.
allowed-tools: Bash, Read, Grep
---

# Git Commit Helper

Conventional Commits形式のコミットメッセージを作成します。

## Instructions

### ステップ1: 変更内容の確認

\`\`\`bash
git status
git diff
\`\`\`

### ステップ2: コミットタイプの決定

- **feat**: 新機能
- **fix**: バグ修正
- **docs**: ドキュメント
- **style**: フォーマット
- **refactor**: リファクタリング
- **test**: テスト追加
- **chore**: その他

### ステップ3: コミットメッセージの作成

\`\`\`
<type>(<scope>): <subject>

<body>

<footer>
\`\`\`

## Examples

### 例1: 新機能追加

\`\`\`
feat(auth): add OAuth2 login support

Implement OAuth2 authentication flow with Google and GitHub providers.
Includes token refresh and session management.

Closes #123
\`\`\`

### 例2: バグ修正

\`\`\`
fix(api): prevent race condition in user creation

Add mutex lock to ensure atomic user creation operations.
Fixes issue where duplicate users could be created.

Fixes #456
\`\`\`

## Version History

- v1.0.0 (2025-01-01): Initial release
```

## Best Practices

### 1. 説明を具体的にする

**❌ 曖昧:**
```yaml
description: Helps with documents
```

**✅ 具体的:**
```yaml
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
```

### 2. スキルの焦点を絞る

**良い例（焦点が明確）:**
- 「PDFフォーム入力」
-「Excelデータ分析」
-「Gitコミットメッセージ生成」

**悪い例（範囲が広すぎる）:**
- 「ドキュメント処理」→ 複数スキルに分割すべき
- 「データツール」→ 複数スキルに分割すべき

### 3. トリガーワードを含める

descriptionにユーザーが使いそうな言葉を含める：

```yaml
description: Analyze sales data in Excel files and CRM exports. Use for sales reports, pipeline analysis, revenue tracking, quarterly reports, and Excel spreadsheets.
```

トリガーワード: `sales`, `Excel`, `CRM`, `reports`, `pipeline`, `revenue`, `quarterly`, `spreadsheets`

### 4. ツール権限を最小限にする

必要なツールのみを許可：

```yaml
# 読み取り専用スキル
allowed-tools: Read, Grep, Glob

# ファイル編集スキル
allowed-tools: Read, Edit, Write

# システム操作スキル
allowed-tools: Bash, Read, Write
```

### 5. バージョン履歴を記録

```markdown
## Version History

- v2.0.0 (2025-10-01): Breaking changes - new API format
- v1.2.0 (2025-09-15): Added support for multiple file formats
- v1.1.0 (2025-09-10): Performance improvements
- v1.0.0 (2025-09-01): Initial release
```

### 6. サポートファイルの活用

大きなスキルは複数ファイルに分割：

```
.claude/skills/complex-skill/
├── SKILL.md           # メインドキュメント（概要と基本手順）
├── reference.md       # 詳細なリファレンス
├── examples.md        # 豊富な例
├── troubleshooting.md # トラブルシューティング
└── templates/         # テンプレートファイル
    ├── config.yaml
    └── README.md
```

SKILL.mdから参照：
```markdown
詳細については[reference.md](reference.md)を参照してください。

具体例は[examples.md](examples.md)をご覧ください。
```

### 7. 複数スキルの競合を避ける

異なるトリガーワードを使用：

```yaml
# スキル1
description: Analyze sales data in Excel files and CRM exports. Use for sales reports, pipeline analysis, and revenue tracking.

# スキル2
description: Analyze log files and system metrics data. Use for performance monitoring, debugging, and system diagnostics.
```

## YAML構文の注意点

### 正しい構文

```yaml
---
name: skill-name
description: This is a description
allowed-tools: Read, Write, Edit
---
```

### よくある間違い

**❌ タブ文字を使用:**
```yaml
---
name:	skill-name  # タブではなくスペースを使用
---
```

**❌ コロンの後にスペースなし:**
```yaml
---
name:skill-name  # コロンの後にスペースが必要
---
```

**❌ 値に改行:**
```yaml
---
description: This is
a description  # 改行は使用不可（または適切にエスケープが必要）
---
```

**✅ 長い説明の正しい書き方:**
```yaml
---
description: This is a long description that spans multiple lines but is written as a single line in the YAML file to avoid syntax errors.
---
```

## Validation Checklist

スキル作成後のチェックリスト：

- [ ] `SKILL.md` ファイルが存在する
- [ ] YAMLフロントマターが有効な構文である
- [ ] `name` フィールドが存在し、仕様に準拠している
- [ ] `description` フィールドが存在し、具体的である
- [ ] トリガーワードがdescriptionに含まれている
- [ ] `allowed-tools` が適切に設定されている（推奨）
- [ ] Markdown構文が正しい
- [ ] コードブロックが適切にフォーマットされている
- [ ] 内部リンクが正しく動作する
- [ ] 実際にスキルを呼び出して動作確認した

## Troubleshooting

### スキルが認識されない

1. ファイル名が `SKILL.md` であることを確認（大文字）
2. YAMLフロントマターが正しい構文であることを確認
3. Claude Codeを再起動

### スキルが自動的に呼び出されない

1. `description` にトリガーワードを追加
2. より具体的な説明に変更
3. 他のスキルとの競合を確認

### YAML構文エラー

1. タブではなくスペースを使用
2. コロンの後にスペースを入れる
3. オンラインYAMLバリデーターで検証

### 内部リンクが機能しない

1. 相対パスを使用（`[text](reference.md)`）
2. ファイルが同じディレクトリに存在することを確認
3. Markdownリンク構文が正しいことを確認

## Reference

- [公式ドキュメント](https://code.claude.com/docs/ja/skills)
- [YAML仕様](https://yaml.org/spec/)
- [Markdown仕様](https://commonmark.org/)

## Version History

- v1.0.0 (2025-01-01): Initial skill creation guide
