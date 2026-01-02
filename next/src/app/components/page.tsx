"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import DataTable from "@/components/DataTable";
import SearchBar from "@/components/DataTable/SearchBar";
import Pagination from "@/components/DataTable/Pagination";
import SortableHeader from "@/components/DataTable/SortableHeader";
import TableHeader from "@/components/DataTable/TableHeader";
import TableRow from "@/components/DataTable/TableRow";
import EmptyState from "@/components/DataTable/EmptyState";
import ItemsPerPageDropdown from "@/components/DataTable/ItemsPerPageDropdown";
import AnimatedBackground from "@/components/AnimatedBackground";
import GlassCard from "@/components/GlassCard";
import FormInput from "@/components/FormInput";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import Link from "@/components/Link";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";

interface ComponentItem {
  id: number;
  name: string;
  category: string;
  status: string;
}

type SelectedComponent = "DataTable" | "SearchBar" | "Pagination" | "ItemsPerPageDropdown" | "SortableHeader" | "TableHeader" | "TableRow" | "EmptyState" | "AnimatedBackground" | "GlassCard" | "FormInput" | "Checkbox" | "Button" | "Link" | "Header" | "StatCard" | "StatusBadge" | null;

export default function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent>("DataTable");
  const [componentSearchQuery, setComponentSearchQuery] = useState("");
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(new Set(["DataTable"]));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // ダミーデータ
  const components: ComponentItem[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `アイテム${i + 1}`,
    category: `カテゴリ${Math.floor(i / 10) + 1}`,
    status: i % 3 === 0 ? "有効" : i % 3 === 1 ? "無効" : "保留中",
  }));

  const columns = [
    { key: "id" as keyof ComponentItem, label: "ID", sortable: true },
    { key: "name" as keyof ComponentItem, label: "名前", sortable: true },
    { key: "category" as keyof ComponentItem, label: "カテゴリ", sortable: true },
    { key: "status" as keyof ComponentItem, label: "ステータス", sortable: true },
  ];

  const componentList = [
    {
      id: "DataTable",
      name: "DataTable",
      title: "DataTable",
      description: "検索、ソート、ページネーション機能を備えたデータテーブルコンポーネントです。",
      codeSample: `import DataTable from "@/components/DataTable";

// データのフォーマット: オブジェクトの配列
// 各オブジェクトは、columnsで指定したkeyプロパティを持つ必要があります
interface DataItem {
  id: number;
  name: string;
  category: string;
}

const data: DataItem[] = [
  { id: 1, name: "アイテム1", category: "カテゴリ1" },
  { id: 2, name: "アイテム2", category: "カテゴリ2" },
  // ...
];

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "名前", sortable: true },
  { key: "category", label: "カテゴリ", sortable: true },
];

<DataTable
  data={data}
  columns={columns}
  searchable={true}
  pagination={true}
  itemsPerPageOptions={[10, 20, 50, 100]}
  defaultItemsPerPage={20}
/>`,
      variations: [
        {
          name: "検索なし",
          description: "検索機能を無効にしたバージョン",
          code: `searchable={false}`,
        },
        {
          name: "ページネーションなし",
          description: "ページネーションを無効にしたバージョン",
          code: `pagination={false}`,
        },
        {
          name: "カスタム表示件数",
          description: "表示件数のオプションをカスタマイズ",
          code: `itemsPerPageOptions={[5, 10, 25, 50, 100]}`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      children: [
        {
          id: "SearchBar",
          name: "SearchBar",
          title: "SearchBar",
          description: "検索機能を提供するコンポーネントです。DataTable無しで単体でも使用できます。",
          codeSample: `import SearchBar from "@/components/DataTable/SearchBar";

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
// カスタマイズする場合は、DataTableコンポーネントを拡張する必要があります`,
          variations: [
            {
              name: "カスタムプレースホルダー（単体使用時）",
              description: "プレースホルダーテキストをカスタマイズ",
              code: `placeholder="ユーザーを検索..."`,
            },
            {
              name: "DataTable内での使用",
              description: "DataTableに組み込まれている場合、SearchBarは自動的に表示されます",
              code: `// DataTableコンポーネントのsearchableプロパティで有効/無効を切り替え
<DataTable
  data={data}
  columns={columns}
  searchable={true}  // trueにするとSearchBarが表示される
/>`,
            },
            {
              name: "DataTable内でプレースホルダーをカスタマイズ",
              description: "searchPlaceholderプロパティでプレースホルダーを指定",
              code: `<DataTable
  data={data}
  columns={columns}
  searchable={true}
  searchPlaceholder="ユーザー、アクション、日時で検索..."
/>`,
            },
            {
              name: "DataTableコンポーネントを拡張する場合",
              description: "より高度なカスタマイズが必要な場合は、DataTableコンポーネントを拡張",
              code: `// DataTableコンポーネントのソースコードをコピーして、
// SearchBarの部分をカスタマイズしたコンポーネントを作成
// または、DataTableコンポーネントに追加のプロパティを追加`,
            },
          ],
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
        },
        {
          id: "Pagination",
          name: "Pagination",
          title: "Pagination",
          description: "ページネーション機能を提供するコンポーネントです。",
          codeSample: `import Pagination from "@/components/DataTable/Pagination";

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(20);

<Pagination
  currentPage={currentPage}
  totalPages={10}
  totalItems={200}
  startIndex={0}
  endIndex={20}
  itemsPerPage={itemsPerPage}
  itemsPerPageOptions={[10, 20, 50, 100]}
  onPageChange={setCurrentPage}
  onItemsPerPageChange={setItemsPerPage}
/>`,
          variations: [
            {
              name: "カスタム表示件数オプション",
              description: "表示件数のオプションを変更",
              code: `itemsPerPageOptions={[5, 10, 25, 50, 100, 200]}`,
            },
          ],
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
          ),
        },
        {
          id: "ItemsPerPageDropdown",
          name: "ItemsPerPageDropdown",
          title: "ItemsPerPageDropdown",
          description: "表示件数を選択するカスタムドロップダウンコンポーネントです。ガラスモーフィズム効果とアニメーションを適用しています。",
          codeSample: `import ItemsPerPageDropdown from "@/components/DataTable/ItemsPerPageDropdown";
import { useState } from "react";

const [itemsPerPage, setItemsPerPage] = useState(20);

<ItemsPerPageDropdown
  value={itemsPerPage}
  options={[10, 20, 50, 100]}
  onChange={setItemsPerPage}
/>`,
          variations: [
            {
              name: "カスタムオプション",
              description: "表示件数のオプションをカスタマイズ",
              code: `options={[5, 15, 30, 60, 120]}`,
            },
          ],
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          ),
        },
        {
          id: "SortableHeader",
          name: "SortableHeader",
          title: "SortableHeader",
          description: "ソート可能なテーブルヘッダーコンポーネントです。",
          codeSample: `import SortableHeader from "@/components/DataTable/SortableHeader";

const [sortColumn, setSortColumn] = useState<string | null>(null);
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

<SortableHeader
  label="名前"
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  currentColumn="name"
  onSort={() => {
    if (sortColumn === "name") {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn("name");
      setSortDirection("asc");
    }
  }}
  sortable={true}
/>`,
          variations: [
            {
              name: "ソート無効",
              description: "ソート機能を無効にする",
              code: `sortable={false}`,
            },
          ],
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          ),
        },
        {
          id: "TableHeader",
          name: "TableHeader",
          title: "TableHeader",
          description: "テーブルヘッダーコンポーネントです。",
          codeSample: `import TableHeader from "@/components/DataTable/TableHeader";

const columns = [
  { key: "id", label: "ID", sortable: true },
  { key: "name", label: "名前", sortable: true },
];

<TableHeader
  columns={columns}
  sortColumn={sortColumn}
  sortDirection={sortDirection}
  onSort={handleSort}
/>`,
          variations: [
            {
              name: "ソート無効な列を含む",
              description: "一部の列をソート不可にする",
              code: `{ key: "id", label: "ID", sortable: false }`,
            },
          ],
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18" />
            </svg>
          ),
        },
        {
          id: "TableRow",
          name: "TableRow",
          title: "TableRow",
          description: "テーブル行コンポーネントです。",
          codeSample: `import TableRow from "@/components/DataTable/TableRow";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "名前" },
];

<TableRow
  item={data[0]}
  columns={columns}
  index={0}
/>`,
          variations: [
            {
              name: "カスタムセルレンダリング",
              description: "特定の列をカスタムレンダリングする場合は、TableRowを拡張",
              code: `// TableRowコンポーネントを拡張してカスタムレンダリングを実装`,
            },
          ],
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          ),
        },
        {
          id: "EmptyState",
          name: "EmptyState",
          title: "EmptyState",
          description: "空の状態を表示するコンポーネントです。",
          codeSample: `import EmptyState from "@/components/DataTable/EmptyState";

<EmptyState />`,
          variations: [
            {
              name: "カスタムメッセージ",
              description: "EmptyStateコンポーネントを拡張してカスタムメッセージを表示",
              code: `// EmptyStateコンポーネントを拡張してカスタムメッセージを実装`,
            },
          ],
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "AnimatedBackground",
      name: "AnimatedBackground",
      title: "AnimatedBackground",
      description: "グラデーション背景とアニメーション効果を提供するコンポーネントです。ログイン画面やダッシュボード画面で使用されています。",
      codeSample: `import AnimatedBackground from "@/components/AnimatedBackground";

// 基本的な使用方法
<div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
  <AnimatedBackground />
  {/* コンテンツ */}
</div>`,
      variations: [
        {
          name: "カスタムクラス",
          description: "追加のクラスを指定してカスタマイズ",
          code: `<AnimatedBackground className="custom-class" />`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
    {
      id: "GlassCard",
      name: "GlassCard",
      title: "GlassCard",
      description: "ガラスモーフィズム効果のカードコンテナコンポーネントです。",
      codeSample: `import GlassCard from "@/components/GlassCard";

<GlassCard>
  <h2 className="text-xl font-bold text-white mb-4">カードタイトル</h2>
  <p className="text-white/70">カードのコンテンツ</p>
</GlassCard>`,
      variations: [
        {
          name: "パディングサイズ",
          description: "パディングサイズを変更",
          code: `<GlassCard padding="sm">小さいパディング</GlassCard>
<GlassCard padding="md">中サイズパディング（デフォルト）</GlassCard>
<GlassCard padding="lg">大きいパディング</GlassCard>`,
        },
        {
          name: "カスタムクラス",
          description: "追加のクラスを指定",
          code: `<GlassCard className="custom-class">カスタムスタイル</GlassCard>`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      id: "FormInput",
      name: "FormInput",
      title: "FormInput",
      description: "アイコン付きのフォーム入力フィールドコンポーネントです。メールアドレス、パスワードなどで使用されています。",
      codeSample: `import FormInput from "@/components/FormInput";

// メールアドレス入力
<FormInput
  id="email"
  type="email"
  label="メールアドレス"
  placeholder="example@email.com"
  icon={
    <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  }
/>

// パスワード入力
<FormInput
  id="password"
  type="password"
  label="パスワード"
  placeholder="••••••••"
  icon={
    <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  }
/>`,
      variations: [
        {
          name: "エラー表示",
          description: "エラーメッセージを表示",
          code: `<FormInput
  id="email"
  type="email"
  label="メールアドレス"
  error="メールアドレスが正しくありません"
/>`,
        },
        {
          name: "アイコンなし",
          description: "アイコンを表示しない",
          code: `<FormInput
  id="username"
  label="ユーザー名"
  placeholder="ユーザー名を入力"
/>`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
    },
    {
      id: "Checkbox",
      name: "Checkbox",
      title: "Checkbox",
      description: "カスタムスタイルのチェックボックスコンポーネントです。",
      codeSample: `import Checkbox from "@/components/Checkbox";

<Checkbox
  id="remember-me"
  label="ログイン状態を保持"
/>

// ラベルなし
<Checkbox id="agree" />`,
      variations: [
        {
          name: "カスタムラベル",
          description: "ラベルにカスタムコンテンツを指定",
          code: `<Checkbox
  id="terms"
  label={<span>利用規約に<strong>同意</strong>します</span>}
/>`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "Button",
      name: "Button",
      title: "Button",
      description: "グラデーションや様々なスタイルのボタンコンポーネントです。",
      codeSample: `import Button from "@/components/Button";

// プライマリボタン（デフォルト）
<Button variant="primary">ログイン</Button>

// セカンダリボタン
<Button variant="secondary">キャンセル</Button>

// アウトラインボタン
<Button variant="outline">詳細を見る</Button>

// ゴーストボタン
<Button variant="ghost">削除</Button>

// アイコン付きボタン
<Button
  variant="primary"
  icon={
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  }
>
  次へ
</Button>`,
      variations: [
        {
          name: "サイズ",
          description: "ボタンのサイズを変更",
          code: `<Button size="sm">小さいボタン</Button>
<Button size="md">中サイズボタン（デフォルト）</Button>
<Button size="lg">大きいボタン</Button>`,
        },
        {
          name: "全幅",
          description: "ボタンを全幅にする",
          code: `<Button fullWidth>全幅ボタン</Button>`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
    {
      id: "Link",
      name: "Link",
      title: "Link",
      description: "カスタムスタイルのリンクコンポーネントです。",
      codeSample: `import Link from "@/components/Link";

// デフォルトスタイル
<Link href="/dashboard">ダッシュボード</Link>

// アンダーライン付き
<Link href="/signup" variant="underline">新規登録</Link>`,
      variations: [
        {
          name: "カスタムクラス",
          description: "追加のクラスを指定",
          code: `<Link href="/about" className="font-bold">詳細</Link>`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      id: "Header",
      name: "Header",
      title: "Header",
      description: "ダッシュボードのヘッダーコンポーネントです。ロゴ、タイトル、アクションボタンを含みます。",
      codeSample: `import Header from "@/components/Header";
import Button from "@/components/Button";

<Header
  logo={
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  }
  title="ダッシュボード"
  actions={
    <Button variant="secondary" size="sm">
      ログアウト
    </Button>
  }
/>`,
      variations: [
        {
          name: "ロゴなし",
          description: "ロゴを表示しない",
          code: `<Header title="ダッシュボード" />`,
        },
        {
          name: "アクションなし",
          description: "アクションボタンを表示しない",
          code: `<Header logo={logo} title="タイトル" />`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      id: "StatCard",
      name: "StatCard",
      title: "StatCard",
      description: "統計情報を表示するカードコンポーネントです。アイコン、タイトル、数値を表示します。",
      codeSample: `import StatCard from "@/components/StatCard";

<StatCard
  icon={
    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  }
  iconBg="blue"
  title="総ユーザー数"
  value="1,234"
/>`,
      variations: [
        {
          name: "アイコン背景色",
          description: "アイコンの背景色を変更",
          code: `<StatCard iconBg="blue" />  // 青
<StatCard iconBg="green" />  // 緑
<StatCard iconBg="yellow" />  // 黄
<StatCard iconBg="pink" />  // ピンク
<StatCard iconBg="purple" />  // 紫
<StatCard iconBg="indigo" />  // インディゴ`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: "StatusBadge",
      name: "StatusBadge",
      title: "StatusBadge",
      description: "ステータスを表示するバッジコンポーネントです。成功、保留中、失敗などの状態を表示します。",
      codeSample: `import StatusBadge from "@/components/StatusBadge";

<StatusBadge status="success">成功</StatusBadge>
<StatusBadge status="pending">保留中</StatusBadge>
<StatusBadge status="failed">失敗</StatusBadge>
<StatusBadge status="warning">警告</StatusBadge>`,
      variations: [
        {
          name: "カスタムクラス",
          description: "追加のクラスを指定",
          code: `<StatusBadge status="success" className="custom-class">成功</StatusBadge>`,
        },
      ],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
  ];

  const toggleExpand = (componentId: string) => {
    const newExpanded = new Set(expandedComponents);
    if (newExpanded.has(componentId)) {
      newExpanded.delete(componentId);
    } else {
      newExpanded.add(componentId);
    }
    setExpandedComponents(newExpanded);
  };

  const getAllComponents = () => {
    const all: any[] = [];
    componentList.forEach((component) => {
      all.push(component);
      if (component.children && expandedComponents.has(component.id)) {
        all.push(...component.children);
      }
    });
    return all;
  };

  const allComponentsFlat = getAllComponents();
  const selectedComponentData = allComponentsFlat.find((c) => c.id === selectedComponent);

  // コンポーネント検索フィルタリング
  const filteredComponents = componentList.filter((component) => {
    const matchesSearch = component.name.toLowerCase().includes(componentSearchQuery.toLowerCase());
    if (matchesSearch) return true;
    // 子コンポーネントが検索に一致する場合も表示
    if (component.children) {
      return component.children.some((child) =>
        child.name.toLowerCase().includes(componentSearchQuery.toLowerCase())
      );
    }
    return false;
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-sans">
      {/* アニメーション背景 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        <div className="absolute top-0 -left-4 h-72 w-72 rounded-full bg-purple-500 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-4 h-72 w-72 rounded-full bg-pink-500 opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* メインコンテンツ */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 固定ヘッダー */}
        <div className="sticky top-0 z-30 mb-8 backdrop-blur-xl bg-white/5 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 pt-8 -mt-8">
          <h1 className="text-3xl font-bold text-white mb-2">コンポーネント一覧</h1>
          <p className="text-white/70">再利用可能なコンポーネントの一覧です</p>
        </div>

        <div className="flex gap-6">
          {/* 左側: コンポーネント選択リスト */}
          <div className="w-64 flex-shrink-0 sticky top-32 self-start z-20 max-h-[calc(100vh-8rem)] overflow-y-auto">
            <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-4">
              <h2 className="text-lg font-semibold text-white mb-4">コンポーネント</h2>
              
              {/* 検索バー */}
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={componentSearchQuery}
                  onChange={(e) => setComponentSearchQuery(e.target.value)}
                  placeholder="検索..."
                  className="block w-full pl-9 pr-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1">
                {filteredComponents.map((component) => {
                  const hasChildren = component.children && component.children.length > 0;
                  const isExpanded = expandedComponents.has(component.id);
                  const showChildren = isExpanded && hasChildren && (!componentSearchQuery || componentSearchQuery === "");

                  return (
                    <div key={component.id}>
                      <div className="flex items-center">
                        <div className="w-5 flex items-center justify-center flex-shrink-0">
                          {hasChildren && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(component.id);
                              }}
                              className="p-1 text-white/50 hover:text-white transition-colors"
                            >
                              <svg
                                className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedComponent(component.id as SelectedComponent)}
                          className={`flex-1 text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 min-w-0 ${
                            selectedComponent === component.id
                              ? "bg-white/20 text-white font-semibold"
                              : "bg-white/5 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {component.icon && (
                            <span className="flex-shrink-0">{component.icon}</span>
                          )}
                          <span className="truncate">{component.name}</span>
                        </button>
                      </div>
                      {showChildren && (
                        <div className="ml-5 space-y-1 mt-1">
                          {component.children?.map((child) => (
                            <button
                              key={child.id}
                              onClick={() => setSelectedComponent(child.id as SelectedComponent)}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm min-w-0 ${
                                selectedComponent === child.id
                                  ? "bg-white/20 text-white font-semibold"
                                  : "bg-white/5 text-white/60 hover:bg-white/10"
                              }`}
                            >
                              {child.icon && (
                                <span className="flex-shrink-0">{child.icon}</span>
                              )}
                              <span className="truncate">{child.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {filteredComponents.length === 0 && (
                  <p className="text-white/50 text-sm text-center py-4">検索結果が見つかりませんでした</p>
                )}
              </div>
            </div>
          </div>

          {/* 右側: 選択されたコンポーネントのプレビュー */}
          <div className="flex-1">
            {selectedComponentData && (
              <>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedComponentData.icon && (
                      <span className="text-white">{selectedComponentData.icon}</span>
                    )}
                    <h2 className="text-2xl font-bold text-white">{selectedComponentData.title || selectedComponentData.name}</h2>
                  </div>
                  <p className="text-white/70">{selectedComponentData.description}</p>
                </div>

                {selectedComponent === "DataTable" && (
                  <>
                    <DataTable
                      data={components}
                      columns={columns}
                      searchable={true}
                      pagination={true}
                      itemsPerPageOptions={[10, 20, 50, 100]}
                      defaultItemsPerPage={20}
                    />
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "SearchBar" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">SearchBar プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <SearchBar value="" onChange={() => {}} placeholder="検索..." />
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "Pagination" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Pagination プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <Pagination
                        currentPage={1}
                        totalPages={10}
                        totalItems={200}
                        startIndex={0}
                        endIndex={20}
                        itemsPerPage={20}
                        itemsPerPageOptions={[10, 20, 50, 100]}
                        onPageChange={() => {}}
                        onItemsPerPageChange={() => {}}
                      />
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "ItemsPerPageDropdown" && (
                  <>
                    <div className="relative z-20 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">ItemsPerPageDropdown プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/70">表示件数:</span>
                        <ItemsPerPageDropdown
                          value={20}
                          options={[10, 20, 50, 100]}
                          onChange={() => {}}
                        />
                      </div>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="relative z-10 mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample || "")}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                              padding: "1rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "SortableHeader" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">SortableHeader プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <table className="min-w-full divide-y divide-white/10">
                        <thead className="bg-white/5">
                          <tr>
                            <SortableHeader
                              label="名前"
                              sortColumn={null}
                              sortDirection="asc"
                              currentColumn="name"
                              onSort={() => {}}
                              sortable={true}
                            />
                            <SortableHeader
                              label="カテゴリ"
                              sortColumn="name"
                              sortDirection="asc"
                              currentColumn="category"
                              onSort={() => {}}
                              sortable={true}
                            />
                          </tr>
                        </thead>
                      </table>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "TableHeader" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">TableHeader プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <table className="min-w-full divide-y divide-white/10">
                        <TableHeader
                          columns={columns}
                          sortColumn={null}
                          sortDirection="asc"
                          onSort={() => {}}
                        />
                      </table>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "TableRow" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">TableRow プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <table className="min-w-full divide-y divide-white/10">
                        <thead className="bg-white/5">
                          <tr>
                            {columns.map((col) => (
                              <th key={String(col.key)} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">
                                {col.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          <TableRow item={components[0]} columns={columns} index={0} />
                          <TableRow item={components[1]} columns={columns} index={1} />
                        </tbody>
                      </table>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "EmptyState" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">EmptyState プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <EmptyState />
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "AnimatedBackground" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">AnimatedBackground プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
                        <AnimatedBackground />
                        <div className="relative z-10 flex items-center justify-center h-full">
                          <p className="text-white/80">アニメーション背景のプレビュー</p>
                        </div>
                      </div>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "GlassCard" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">GlassCard プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <GlassCard>
                        <h4 className="text-lg font-semibold text-white mb-2">カードタイトル</h4>
                        <p className="text-white/70">ガラスモーフィズム効果のカードコンテナです。</p>
                      </GlassCard>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "FormInput" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">FormInput プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <div className="space-y-4">
                        <FormInput
                          id="email-demo"
                          type="email"
                          label="メールアドレス"
                          placeholder="example@email.com"
                          icon={
                            <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                          }
                        />
                        <FormInput
                          id="password-demo"
                          type="password"
                          label="パスワード"
                          placeholder="••••••••"
                          icon={
                            <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          }
                        />
                      </div>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "Checkbox" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Checkbox プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <div className="space-y-4">
                        <Checkbox id="remember-demo" label="ログイン状態を保持" />
                        <Checkbox id="terms-demo" label="利用規約に同意します" />
                      </div>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "Button" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Button プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-4">
                          <Button variant="primary">プライマリ</Button>
                          <Button variant="secondary">セカンダリ</Button>
                          <Button variant="outline">アウトライン</Button>
                          <Button variant="ghost">ゴースト</Button>
                        </div>
                        <div className="flex flex-wrap gap-4">
                          <Button size="sm">小さい</Button>
                          <Button size="md">中サイズ</Button>
                          <Button size="lg">大きい</Button>
                        </div>
                        <Button
                          fullWidth
                          variant="primary"
                          icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          }
                        >
                          ログイン
                        </Button>
                      </div>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "Link" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Link プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <div className="space-y-4">
                        <Link href="#">デフォルトリンク</Link>
                        <br />
                        <Link href="#" variant="underline">アンダーライン付きリンク</Link>
                      </div>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "Header" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Header プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <Header
                        logo={
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        }
                        title="ダッシュボード"
                        actions={
                          <Button variant="secondary" size="sm">
                            ログアウト
                          </Button>
                        }
                      />
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "StatCard" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">StatCard プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <StatCard
                          icon={
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          }
                          iconBg="blue"
                          title="総ユーザー数"
                          value="1,234"
                        />
                        <StatCard
                          icon={
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          }
                          iconBg="green"
                          title="アクティブ"
                          value="856"
                        />
                      </div>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
                {selectedComponent === "StatusBadge" && (
                  <>
                    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-white mb-2">StatusBadge プレビュー</h3>
                        <p className="text-white/70 text-sm mb-4">{selectedComponentData?.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <StatusBadge status="success">成功</StatusBadge>
                        <StatusBadge status="pending">保留中</StatusBadge>
                        <StatusBadge status="failed">失敗</StatusBadge>
                        <StatusBadge status="warning">警告</StatusBadge>
                      </div>
                    </div>
                    {selectedComponentData.codeSample && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                          <button
                            onClick={() => copyToClipboard(selectedComponentData.codeSample)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            コピー
                          </button>
                        </div>
                        <div className="rounded-lg overflow-hidden">
                          <SyntaxHighlighter
                            language="typescript"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: "0.5rem",
                              fontSize: "0.875rem",
                            }}
                          >
                            {selectedComponentData.codeSample}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    )}
                    {selectedComponentData.variations && selectedComponentData.variations.length > 0 && (
                      <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
                        <div className="space-y-4">
                          {selectedComponentData.variations.map((variation: any, index: number) => (
                            <div key={index} className="border-l-2 border-white/20 pl-4">
                              <h4 className="text-white font-medium mb-1">{variation.name}</h4>
                              <p className="text-white/70 text-sm mb-2">{variation.description}</p>
                              <div className="relative">
                                <button
                                  onClick={() => copyToClipboard(variation.code)}
                                  className="absolute top-2 right-2 p-1.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
                                  title="コピー"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                                </button>
                                <div className="rounded-lg overflow-hidden">
                                  <SyntaxHighlighter
                                    language="typescript"
                                    style={vscDarkPlus}
                                    customStyle={{
                                      margin: 0,
                                      borderRadius: "0.5rem",
                                      fontSize: "0.75rem",
                                      padding: "0.75rem",
                                    }}
                                  >
                                    {variation.code}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
            {selectedComponent === null && (
              <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-12 text-center">
                <p className="text-white/70">コンポーネントを選択してください</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

