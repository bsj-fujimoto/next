"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ComponentMarkdown } from "@/lib/markdown";
import { ComponentItem } from "@/types/component";
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
import Toast from "@/components/Toast";
import DropdownMenu from "@/components/DropdownMenu";
import AvatarDropdown from "@/components/AvatarDropdown";

interface ComponentPreviewProps {
  componentData: ComponentItem;
  markdownData?: ComponentMarkdown | null;
  copyToClipboard: (text: string) => void;
  // プレビュー用のダミーデータ
  previewData?: Record<string, unknown>[];
  previewColumns?: Array<{ key: string; label: string; sortable?: boolean }>;
}

const componentMap: Record<string, React.ComponentType<any>> = {
  DataTable,
  SearchBar,
  Pagination,
  SortableHeader,
  TableHeader,
  TableRow,
  EmptyState,
  ItemsPerPageDropdown,
  AnimatedBackground,
  GlassCard,
  FormInput,
  Checkbox,
  Button,
  Link,
  Header,
  StatCard,
  StatusBadge,
  Toast,
  DropdownMenu,
  AvatarDropdown,
};

export default function ComponentPreview({
  componentData,
  markdownData,
  copyToClipboard,
  previewData,
  previewColumns,
}: ComponentPreviewProps) {
  // Markdownデータがある場合はそれを使用、なければ既存のcomponentDataを使用
  const displayData = useMemo(() => {
    if (markdownData) {
      // Markdownのiconが空文字列やnullの場合はcomponentData.iconを使用
      const icon = (typeof markdownData.metadata.icon === 'string' && markdownData.metadata.icon.trim())
        ? markdownData.metadata.icon 
        : componentData.icon;
      
      return {
        title: markdownData.metadata.title,
        description: markdownData.metadata.description,
        icon: icon,
        codeSample: markdownData.codeSample,
        variations: markdownData.variations,
        previewComponent: markdownData.metadata.previewComponent,
        previewProps: markdownData.metadata.previewProps,
      };
    }
    return {
      title: componentData.title,
      description: componentData.description,
      icon: componentData.icon,
      codeSample: componentData.codeSample,
      variations: componentData.variations,
      previewComponent: componentData.id, // componentDataのidをpreviewComponentとして使用
      previewProps: {},
    };
  }, [markdownData, componentData]);

  // プレビューコンポーネントをレンダリング
  const previewElement = useMemo(() => {
    // previewComponentが指定されている場合
    if (displayData.previewComponent) {
      const PreviewComponent = componentMap[displayData.previewComponent];
      
      if (!PreviewComponent) {
        return null;
      }

      // previewPropsの関数文字列を実際の関数に変換
      const processedProps = Object.entries(displayData.previewProps).reduce((acc, [key, value]) => {
        if (typeof value === 'string' && (value === '() => {}' || value.startsWith('() =>'))) {
          acc[key] = () => {};
        } else if (key === 'items' && Array.isArray(value)) {
          // items配列のonClickを関数に変換
          acc[key] = value.map((item: any) => ({
            ...item,
            onClick: typeof item.onClick === 'string' ? (() => {}) : item.onClick,
          }));
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>);

      // コンポーネント固有のプレビューロジック
      if (displayData.previewComponent === "DataTable") {
        // previewDataとpreviewColumnsが必須
        if (!previewData || !previewColumns) {
          return null;
        }
        return (
          <DataTable
            data={previewData}
            columns={previewColumns}
            {...processedProps}
          />
        );
      }

      // DropdownMenuの場合は特別な処理
      if (displayData.previewComponent === "DropdownMenu") {
        // triggerが文字列（JSX文字列）の場合は、ボタン要素に変換
        if (typeof processedProps.trigger === 'string') {
          // JSX文字列からテキストを抽出（<button ...>テキスト</button>の形式）
          const textMatch = processedProps.trigger.match(/>([^<]+)</);
          const buttonText = textMatch ? textMatch[1] : processedProps.trigger;
          processedProps.trigger = (
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              {buttonText}
            </button>
          );
        }
      }

      // その他のコンポーネントのプレビュー
      return <PreviewComponent {...processedProps} />;
    }

    // previewComponentが指定されていない場合、componentDataからコンポーネント名を推測
    const componentName = componentData.id;
    const FallbackComponent = componentMap[componentName];
    
    if (FallbackComponent) {
      // コンポーネントごとのデフォルトプロップス
      const defaultProps: Record<string, any> = {
        SearchBar: { value: "", onChange: () => {}, placeholder: "検索..." },
        Pagination: {
          currentPage: 1,
          totalPages: 10,
          totalItems: 200,
          startIndex: 0,
          endIndex: 20,
          itemsPerPage: 20,
          itemsPerPageOptions: [10, 20, 50, 100],
          onPageChange: () => {},
          onItemsPerPageChange: () => {},
        },
        ItemsPerPageDropdown: { value: 20, options: [10, 20, 50, 100], onChange: () => {} },
        SortableHeader: {
          label: "名前",
          sortColumn: null,
          sortDirection: "asc" as const,
          currentColumn: "name",
          onSort: () => {},
          sortable: true,
        },
        TableHeader: {
          columns: [{ key: "name", label: "名前", sortable: true }],
          sortColumn: null,
          sortDirection: "asc" as const,
          onSort: () => {},
        },
        TableRow: {
          item: { name: "サンプル" },
          columns: [{ key: "name", label: "名前" }],
          index: 0,
        },
        EmptyState: {},
        AnimatedBackground: {},
        GlassCard: { children: <p className="text-white/70">カードコンテンツ</p> },
        FormInput: {
          id: "demo-input",
          type: "text",
          label: "サンプル入力",
          placeholder: "入力してください",
        },
        Checkbox: { id: "demo-checkbox", label: "サンプルチェックボックス" },
        Button: { children: "サンプルボタン" },
        Link: { href: "#", children: "サンプルリンク" },
        Header: { title: "サンプルヘッダー" },
        StatCard: {
          title: "サンプル",
          value: "123",
          icon: (
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          gradientColors: "bg-gradient-to-br from-blue-500 to-blue-600",
        },
        StatusBadge: { status: "success" as const, children: "サンプル" },
        Toast: { message: "サンプルメッセージ", isVisible: true, onClose: () => {}, duration: 3000 },
        DropdownMenu: {
          trigger: <button className="px-4 py-2 bg-blue-500 text-white rounded">メニューを開く</button>,
          items: [
            { label: "項目1", onClick: () => {} },
            { label: "項目2", onClick: () => {} },
            { label: "項目3", onClick: () => {} },
          ],
        },
        AvatarDropdown: {},
      };

      const props = defaultProps[componentName] || {};
      return <FallbackComponent {...props} />;
    }

    return null;
  }, [displayData, previewData, previewColumns, componentData.id]);

  // Markdownコンテンツをレンダリング（コードブロックをSyntaxHighlighterで置き換え）
  const renderMarkdownContent = () => {
    if (!markdownData) {
      return null;
    }

    // プレビューセクションを除外したコンテンツ
    let contentWithoutPreview = markdownData.content;
    // プレビューセクションを削除（エスケープされたバッククォートにも対応）
    contentWithoutPreview = contentWithoutPreview.replace(
      /## プレビュー[\s\S]*?## コードサンプル/,
      "## コードサンプル"
    );
    // プレビューセクションが最後にある場合
    contentWithoutPreview = contentWithoutPreview.replace(
      /## プレビュー[\s\S]*$/,
      ""
    );
    // エスケープされたバッククォートを通常のバッククォートに変換（ReactMarkdownが正しくパースできるように）
    contentWithoutPreview = contentWithoutPreview.replace(/\\`/g, '`');

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeString = String(children).replace(/\n$/, "");

            if (!inline && language) {
              return (
                <div className="relative mt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-white/70 uppercase">{language}</span>
                    <button
                      onClick={() => copyToClipboard(codeString)}
                      className="flex items-center gap-1 px-2 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all text-xs"
                      title="コピー"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      コピー
                    </button>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language={language}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        borderRadius: "0.5rem",
                        fontSize: language === "typescript" ? "0.875rem" : "0.75rem",
                        padding: "0.75rem",
                      }}
                      {...props}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  </div>
                </div>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          h2({ children }: any) {
            return (
              <h2 className="text-lg font-semibold text-white mb-4 mt-6 first:mt-0">
                {children}
              </h2>
            );
          },
          h3({ children }: any) {
            return (
              <h3 className="text-white font-medium mb-1 mt-4">{children}</h3>
            );
          },
          p({ children }: any) {
            return <p className="text-white/70 text-sm mb-2">{children}</p>;
          },
        }}
      >
        {contentWithoutPreview}
      </ReactMarkdown>
    );
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          {displayData.icon && (
            typeof displayData.icon === 'string' ? (
              <span 
                className="flex-shrink-0 inline-block [&_svg]:text-white [&_svg]:w-5 [&_svg]:h-5"
                dangerouslySetInnerHTML={{ __html: displayData.icon.trim() }}
              />
            ) : (
              <div className="flex-shrink-0 inline-block [&_svg]:text-white">{displayData.icon}</div>
            )
          )}
          <h2 className="text-2xl font-bold text-white">{displayData.title}</h2>
        </div>
        <p className="text-white/70">{displayData.description}</p>
      </div>

      {/* プレビューセクション */}
      {previewElement && (
        <div className="mb-6">
          <GlassCard padding="lg">
            <h3 className="text-lg font-semibold text-white mb-4">プレビュー</h3>
            {(displayData.previewComponent === "Button" || componentData.id === "Button") ? (
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">プライマリ</Button>
                <Button variant="secondary">セカンダリ</Button>
                <Button variant="outline">アウトライン</Button>
                <Button variant="ghost">ゴースト</Button>
              </div>
            ) : (displayData.previewComponent === "Link" || componentData.id === "Link") ? (
              <div className="flex flex-wrap gap-4">
                <Link href="#" variant="default">デフォルト</Link>
                <Link href="#" variant="underline">アンダーライン</Link>
              </div>
            ) : (displayData.previewComponent === "StatusBadge" || componentData.id === "StatusBadge") ? (
              <div className="flex flex-wrap gap-4">
                <StatusBadge status="success">成功</StatusBadge>
                <StatusBadge status="pending">保留中</StatusBadge>
                <StatusBadge status="failed">失敗</StatusBadge>
                <StatusBadge status="warning">警告</StatusBadge>
              </div>
            ) : (
              previewElement
            )}
          </GlassCard>
        </div>
      )}

      {/* Markdownコンテンツまたは既存のコードサンプル */}
      {markdownData ? (
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
          {renderMarkdownContent()}
        </div>
      ) : (displayData.codeSample || (displayData.variations && displayData.variations.length > 0)) ? (
        <>
          {displayData.codeSample && (
            <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">コードサンプル</h3>
                <button
                  onClick={() => copyToClipboard(displayData.codeSample!)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
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
                  {displayData.codeSample}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {displayData.variations && displayData.variations.length > 0 && (
            <div className="mt-6 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">バリエーション</h3>
              <div className="space-y-4">
                {displayData.variations.map((variation, index) => (
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
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
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
      ) : null}
    </>
  );
}

