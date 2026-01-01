"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ログイン状態をチェック
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (isLoggedIn) {
      // ログイン済みの場合はダッシュボードにリダイレクト
      router.push("/dashboard");
    } else {
      // 未ログインの場合はログイン画面にリダイレクト
      router.push("/login");
    }
  }, [router]);

  // リダイレクト中は何も表示しない
  return null;
}
