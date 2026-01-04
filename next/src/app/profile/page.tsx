"use client";

import { useRouter } from "next/navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import AvatarDropdown from "@/components/AvatarDropdown";
import { useRequireAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const router = useRouter();
  useRequireAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-sans">
      <AnimatedBackground />

      {/* ヘッダー */}
      <header className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>ダッシュボードに戻る</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <AvatarDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">プロフィール</h1>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">ユーザー名</label>
              <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-white/20 px-4 py-2 text-white">
                サンプルユーザー
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">メールアドレス</label>
              <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-white/20 px-4 py-2 text-white">
                user@example.com
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">登録日</label>
              <div className="backdrop-blur-sm bg-white/5 rounded-lg border border-white/20 px-4 py-2 text-white">
                2024年1月1日
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


