"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import DataTable from "@/components/DataTable";
import AvatarDropdown from "@/components/AvatarDropdown";
import SideDrawer from "@/components/SideDrawer";
import Header from "@/components/Header";
import { useRequireAuth } from "@/hooks/useAuth";
import type { Column } from "@/types/table";

interface Activity extends Record<string, unknown> {
  id: number;
  user: string;
  action: string;
  datetime: string;
  status: string;
}

export default function DashboardPage() {
  useRequireAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const drawerToggleRef = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On mobile, default to closed
      if (mobile && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
      // On desktop, default to open
      if (!mobile && !isDrawerOpen) {
        setIsDrawerOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isDrawerOpen]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

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
    
    // Use a fixed seed for consistent server/client rendering
    let seed = 12345;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 1; i <= 1000; i++) {
      const randomUser = users[Math.floor(seededRandom() * users.length)];
      const randomAction = actions[Math.floor(seededRandom() * actions.length)];
      const randomStatus = statuses[Math.floor(seededRandom() * statuses.length)];

      const randomDaysAgo = Math.floor(seededRandom() * 30);
      const randomHours = Math.floor(seededRandom() * 24);
      const randomMinutes = Math.floor(seededRandom() * 60);

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


  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-sans">
      <AnimatedBackground />

      {/* ヘッダー */}
      <Header
        title="ダッシュボード"
        logo={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
        actions={<AvatarDropdown />}
        withDrawerToggle={true}
        onDrawerToggle={handleDrawerToggle}
        drawerToggleRef={drawerToggleRef}
        isDrawerOpen={isDrawerOpen}
      />

      {/* レイアウトコンテナ */}
      <div className="flex relative z-0 min-h-[calc(100vh-4rem)]">
        {/* サイドドロワー */}
        <SideDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          triggerButtonRef={drawerToggleRef}
        />

        {/* メインコンテンツ */}
        <main className="relative z-0 flex-1 transition-all duration-300">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
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
          </div>
        </main>
      </div>
    </div>
  );
}
