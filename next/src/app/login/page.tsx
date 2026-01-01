"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import FormInput from "@/components/FormInput";
import Checkbox from "@/components/Checkbox";
import Button from "@/components/Button";
import { useRedirectIfAuthenticated } from "@/hooks/useAuth";
import { login } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();
  useRedirectIfAuthenticated();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 font-sans">
      <AnimatedBackground />

      {/* メインコンテンツ */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 shadow-2xl">
          {/* ロゴ・タイトル */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/10 mb-4 backdrop-blur-sm border border-white/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
              ようこそ
            </h1>
            <p className="text-white/70 text-sm">
              アカウントにログインしてください
            </p>
          </div>

          {/* フォーム */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* メールアドレス */}
              <FormInput
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                label="メールアドレス"
                placeholder="example@email.com"
                icon={
                  <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              {/* パスワード */}
              <FormInput
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                label="パスワード"
                placeholder="••••••••"
                icon={
                  <svg className="h-5 w-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
            </div>

            {/* オプション */}
            <div className="flex items-center justify-between">
              <Checkbox
                id="remember-me"
                name="remember-me"
                label="ログイン状態を保持"
              />
              <a href="#" className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                パスワードを忘れた場合
              </a>
            </div>

            {/* ログインボタン */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              }
            >
              ログイン
            </Button>
          </form>

          {/* 新規登録リンク */}
          <div className="mt-6 text-center">
            <span className="text-white/70 text-sm">
              アカウントをお持ちでない方は{" "}
            </span>
            <a href="#" className="text-sm font-semibold text-white hover:text-white/80 transition-colors underline decoration-2 underline-offset-2">
              新規登録
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

