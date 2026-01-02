"use client";

import { useState, useCallback, useEffect } from "react";
import ComponentPreview from "./ComponentPreview";
import { ComponentMarkdown } from "@/lib/markdown";
import { componentList } from "./componentList";
import type { Column } from "@/types/table";
import Toast from "@/components/Toast";

interface ComponentItem {
  id: number;
  name: string;
  category: string;
  status: string;
}

type SelectedComponent = "DataTable" | "SearchBar" | "Pagination" | "ItemsPerPageDropdown" | "SortableHeader" | "TableHeader" | "TableRow" | "EmptyState" | "AnimatedBackground" | "GlassCard" | "FormInput" | "Checkbox" | "Button" | "Link" | "Header" | "StatCard" | "StatusBadge" | "Toast" | null;

export default function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent>("DataTable");
  const [componentSearchQuery, setComponentSearchQuery] = useState("");
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(new Set(["DataTable"]));
  const [toastVisible, setToastVisible] = useState(false);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastVisible(true);
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err);
    }
  }, []);

  const [markdownData, setMarkdownData] = useState<ComponentMarkdown | null>(null);

  // Markdownデータを読み込む
  useEffect(() => {
    if (selectedComponent) {
      fetch(`/api/components/${selectedComponent}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setMarkdownData(null);
          } else {
            setMarkdownData(data);
          }
        })
        .catch((err) => {
          console.error("Failed to load markdown:", err);
          setMarkdownData(null);
        });
    }
  }, [selectedComponent]);

  // ダミーデータ
  const components: Record<string, unknown>[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `アイテム${i + 1}`,
    category: `カテゴリ${Math.floor(i / 10) + 1}`,
    status: i % 3 === 0 ? "有効" : i % 3 === 1 ? "無効" : "保留中",
  }));

  const columns: Column<Record<string, unknown>>[] = [
    { key: "id", label: "ID", sortable: true, sortType: "number" },
    { key: "name", label: "名前", sortable: true },
    { key: "category", label: "カテゴリ", sortable: true },
    { key: "status", label: "ステータス", sortable: true },
  ];

  // componentListはcomponentList.tsからインポート

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
              <ComponentPreview
                componentData={selectedComponentData}
                markdownData={markdownData}
                copyToClipboard={copyToClipboard}
                previewData={selectedComponent === "DataTable" ? components : undefined}
                previewColumns={selectedComponent === "DataTable" ? columns : undefined}
              />
            )}
            {selectedComponent === null && (
              <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-12 text-center">
                <p className="text-white/70">コンポーネントを選択してください</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Toast
        message="クリップボードにコピーしました。"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
