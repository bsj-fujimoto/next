"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";

interface AvatarDropdownProps {
  className?: string;
}

function AvatarDropdown({ className = "" }: AvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    const handleResize = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleProfile = useCallback(() => {
    setIsOpen(false);
    router.push("/profile");
  }, [router]);

  const handleSettings = useCallback(() => {
    setIsOpen(false);
    router.push("/settings");
  }, [router]);

  const handleLogout = useCallback(() => {
    setIsOpen(false);
    logout();
    router.push("/login");
  }, [router]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        aria-label="ユーザーメニュー"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute top-full right-0 mt-2 z-50 min-w-[200px] rounded-lg border border-white/20 shadow-2xl overflow-hidden backdrop-blur-xl bg-white/10"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleProfile}
            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/20 transition-all flex items-center gap-3"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            プロフィール
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleSettings}
            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/20 transition-all flex items-center gap-3 border-t border-white/10"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            セッティング
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/20 transition-all flex items-center gap-3 border-t border-white/10"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(AvatarDropdown);

