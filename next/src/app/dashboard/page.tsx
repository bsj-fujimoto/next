"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import DataTable from "@/components/DataTable";
import { useRequireAuth } from "@/hooks/useAuth";
import { logout } from "@/utils/auth";
import type { Column } from "@/types/table";

interface Activity extends Record<string, unknown> {
  id: number;
  user: string;
  action: string;
  datetime: string;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  useRequireAuth();

  // アクティビティデータ
  const activities = useMemo((): Activity[] => {
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

    const result: Activity[] = [];
    const now = new Date("2024-01-15 12:00");

    for (let i = 1; i <= 1000; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

      const randomDaysAgo = Math.floor(Math.random() * 30);
      const randomHours = Math.floor(Math.random() * 24);
      const randomMinutes = Math.floor(Math.random() * 60);

      const activityDate = new Date(now);
      activityDate.setDate(activityDate.getDate() - randomDaysAgo);
      activityDate.setHours(randomHours);
      activityDate.setMinutes(randomMinutes);

      const datetime = `${activityDate.getFullYear()}-${String(activityDate.getMonth() + 1).padStart(2, '0')}-${String(activityDate.getDate()).padStart(2, '0')} ${String(activityDate.getHours()).padStart(2, '0')}:${String(activityDate.getMinutes()).padStart(2, '0')}`;

      result.push({
        id: i,
        user: randomUser,
        action: randomAction,
        datetime: datetime,
        status: randomStatus
      });
    }

    return result;
  }, []);

  const columns: Column<Activity>[] = [
    { key: "id", label: "ID", sortable: true, sortType: "number" },
    { key: "user", label: "ユーザー", sortable: true },
    { key: "action", label: "アクション", sortable: true },
    { key: "datetime", label: "日時", sortable: true, sortType: "date" },
    { key: "status", label: "ステータス", sortable: true },
  ];

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
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              最近のアクティビティ
            </h2>
          </div>
          <DataTable
            data={activities}
            columns={columns}
            searchPlaceholder="ユーザー、アクション、日時、ステータスで検索..."
          />
        </div>
      </main>
    </div>
  );
}
