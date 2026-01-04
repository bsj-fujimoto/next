---
title: SearchBar
description: 検索機能を提供するコンポーネントです。DataTable無しで単体でも使用できます。
icon: |
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
previewComponent: SearchBar
previewProps:
  value: ""
  onChange: "() => {}"
  placeholder: "検索..."
---

## プレビュー

実際のコンポーネントがここに表示されます。

## コードサンプル

```typescript
import SearchBar from "@/components/DataTable/SearchBar";

// 単体で使用する場合
const [searchQuery, setSearchQuery] = useState("");

<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  placeholder="検索..."
/>

// DataTableに組み込まれている場合
// DataTableコンポーネント内で自動的にSearchBarが使用されます
// プレースホルダーはDataTableコンポーネントの実装内で固定されています
// カスタマイズする場合は、DataTableコンポーネントを拡張する必要があります
```

## バリエーション

### カスタムプレースホルダー（単体使用時）

プレースホルダーテキストをカスタマイズ

```typescript
placeholder="ユーザーを検索..."
```

### DataTable内での使用

DataTableに組み込まれている場合、SearchBarは自動的に表示されます

```typescript
// DataTableコンポーネントのsearchableプロパティで有効/無効を切り替え
<DataTable
  data={data}
  columns={columns}
  searchable={true}  // trueにするとSearchBarが表示される
/>
```

