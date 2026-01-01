"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useRequireAuth } from "@/hooks/useAuth";
import { logout } from "@/utils/auth";

interface Activity {
  id: number;
  user: string;
  action: string;
  datetime: string;
  status: string;
}

type SortColumn = "user" | "action" | "datetime" | "status" | null;
type SortDirection = "asc" | "desc";

export default function DashboardPage() {
  const router = useRouter();
  useRequireAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // アクティビティデータ
  const generateActivities = (): Activity[] => {
    const users = [
      "山田 太郎", "佐藤 花子", "鈴木 一郎", "高橋 美咲", "田中 健太",
      "伊藤 由美", "渡辺 翔太", "中村 さくら", "小林 大輔", "加藤 愛美",
      "吉田 圭介", "山本 麻美", "佐々木 拓也", "松本 優子", "井上 浩二"
    ];
    const actions = [
      "ログイン", "ログアウト", "ファイルアップロード", "ファイルダウンロード",
      "設定変更", "プロフィール更新", "データ削除", "レポート作成",
      "コメント投稿", "メッセージ送信", "タスク作成", "タスク完了"
    ];
    const statuses = ["成功", "保留中", "失敗"];

    const activities: Activity[] = [];
    const now = new Date("2024-01-15 12:00");

    for (let i = 1; i <= 1000; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      // 過去30日間のランダムな日時を生成
      const randomDaysAgo = Math.floor(Math.random() * 30);
      const randomHours = Math.floor(Math.random() * 24);
      const randomMinutes = Math.floor(Math.random() * 60);

      const activityDate = new Date(now);
      activityDate.setDate(activityDate.getDate() - randomDaysAgo);
      activityDate.setHours(randomHours);
      activityDate.setMinutes(randomMinutes);

      const datetime = `${activityDate.getFullYear()}-${String(activityDate.getMonth() + 1).padStart(2, '0')}-${String(activityDate.getDate()).padStart(2, '0')} ${String(activityDate.getHours()).padStart(2, '0')}:${String(activityDate.getMinutes()).padStart(2, '0')}`;

      activities.push({
        id: i,
        user: randomUser,
        action: randomAction,
        datetime: datetime,
        status: randomStatus
      });
    }

    return activities;
  };

  const activities: Activity[] = generateActivities();

  // 検索フィルタリング
  const filteredActivities = activities.filter((activity) => {
    const query = searchQuery.toLowerCase();
    return (
      activity.user.toLowerCase().includes(query) ||
      activity.action.toLowerCase().includes(query) ||
      activity.datetime.toLowerCase().includes(query) ||
      activity.status.toLowerCase().includes(query)
    );
  });

  // ソート処理
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue: string;
    let bValue: string;

    switch (sortColumn) {
      case "user":
        aValue = a.user;
        bValue = b.user;
        break;
      case "action":
        aValue = a.action;
        bValue = b.action;
        break;
      case "datetime":
        aValue = a.datetime;
        bValue = b.datetime;
        break;
      case "status":
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // ページネーション計算
  const totalPages = Math.ceil(sortedActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedActivities = sortedActivities.slice(startIndex, endIndex);

  // ページ変更時に検索/ソートが変わったら1ページ目に戻る
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortColumn, sortDirection, itemsPerPage]);

  // ソートハンドラー
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // 同じ列をクリックした場合は昇順/降順を切り替え
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // 新しい列をクリックした場合はその列で昇順ソート
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-sans">
      <AnimatedBackground />

      {/* ヘッダー */}
      <header className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">
                ダッシュボード
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/30 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 統計カード */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-2xl hover:bg-white/15 transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/70">
                  総ユーザー数
                </p>
                <p className="text-2xl font-bold text-white">
                  1,234
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-2xl hover:bg-white/15 transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600 shadow-lg">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/70">
                  アクティブ
                </p>
                <p className="text-2xl font-bold text-white">
                  856
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-2xl hover:bg-white/15 transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/70">
                  保留中
                </p>
                <p className="text-2xl font-bold text-white">
                  123
                </p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-2xl hover:bg-white/15 transition-all duration-200 transform hover:scale-105">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-white/70">
                  今月の売上
                </p>
                <p className="text-2xl font-bold text-white">
                  ¥1,234,567
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* テーブル */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                最近のアクティビティ
              </h2>
            </div>
            {/* 検索バー */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ユーザー、アクション、日時、ステータスで検索..."
                className="block w-full pl-10 pr-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* ページネーション（上部） */}
          {sortedActivities.length > 0 && (
            <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/70">
                  全 {sortedActivities.length} 件中 {startIndex + 1} - {Math.min(endIndex, sortedActivities.length)} 件を表示
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/70">表示件数:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  >
                    <option value={10} className="bg-zinc-900">10</option>
                    <option value={20} className="bg-zinc-900">20</option>
                    <option value={50} className="bg-zinc-900">50</option>
                    <option value={100} className="bg-zinc-900">100</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  最初
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  前へ
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg backdrop-blur-sm border text-sm transition-all ${
                          currentPage === pageNum
                            ? "bg-white/30 border-white/40 text-white font-semibold"
                            : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  次へ
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  最後
                </button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            {paginatedActivities.length > 0 ? (
              <table className="min-w-full divide-y divide-white/10">
                <thead className="bg-white/5">
                  <tr>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleSort("user")}
                    >
                      <div className="flex items-center gap-2">
                        <span>ユーザー</span>
                        <div className="flex flex-col">
                          {sortColumn === "user" ? (
                            sortDirection === "asc" ? (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )
                          ) : (
                            <div className="flex flex-col -space-y-1">
                              <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                              <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleSort("action")}
                    >
                      <div className="flex items-center gap-2">
                        <span>アクション</span>
                        <div className="flex flex-col">
                          {sortColumn === "action" ? (
                            sortDirection === "asc" ? (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )
                          ) : (
                            <div className="flex flex-col -space-y-1">
                              <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                              <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleSort("datetime")}
                    >
                      <div className="flex items-center gap-2">
                        <span>日時</span>
                        <div className="flex flex-col">
                          {sortColumn === "datetime" ? (
                            sortDirection === "asc" ? (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )
                          ) : (
                            <div className="flex flex-col -space-y-1">
                              <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                              <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-2">
                        <span>ステータス</span>
                        <div className="flex flex-col">
                          {sortColumn === "status" ? (
                            sortDirection === "asc" ? (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            )
                          ) : (
                            <div className="flex flex-col -space-y-1">
                              <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              </svg>
                              <svg className="w-2 h-2 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {paginatedActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-white/5 transition-colors">
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-white font-medium">
                        {activity.user}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-white/80">
                        {activity.action}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-white/70">
                        {activity.datetime}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span
                          className={`inline-flex rounded-full backdrop-blur-sm border px-3 py-1 text-xs font-semibold ${
                            activity.status === "成功"
                              ? "bg-green-500/20 border-green-400/30 text-green-200"
                              : "bg-yellow-500/20 border-yellow-400/30 text-yellow-200"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-12 text-center">
                <svg className="mx-auto h-12 w-12 text-white/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-white/70 text-sm">検索結果が見つかりませんでした</p>
              </div>
            )}
          </div>

          {/* ページネーション */}
          {sortedActivities.length > 0 && (
            <div className="px-6 py-4 border-t border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-white/70">
                  全 {sortedActivities.length} 件中 {startIndex + 1} - {Math.min(endIndex, sortedActivities.length)} 件を表示
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white/70">表示件数:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  >
                    <option value={10} className="bg-zinc-900">10</option>
                    <option value={20} className="bg-zinc-900">20</option>
                    <option value={50} className="bg-zinc-900">50</option>
                    <option value={100} className="bg-zinc-900">100</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  最初
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  前へ
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded-lg backdrop-blur-sm border text-sm transition-all ${
                          currentPage === pageNum
                            ? "bg-white/30 border-white/40 text-white font-semibold"
                            : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  次へ
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  最後
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

