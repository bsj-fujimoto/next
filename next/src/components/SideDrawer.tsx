"use client";

import { useState, useRef, useEffect, memo, useCallback, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type React from "react";

export interface SideDrawerMenuItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems?: SideDrawerMenuItem[];
  triggerButtonRef?: React.RefObject<HTMLButtonElement | null>;
  className?: string;
}

function SideDrawer({
  isOpen,
  onClose,
  menuItems = [],
  triggerButtonRef,
  className = "",
}: SideDrawerProps) {
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Default menu items
  const defaultMenuItems: SideDrawerMenuItem[] = [
    {
      label: "ダッシュボード",
      path: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: "プロフィール",
      path: "/profile",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      label: "セッティング",
      path: "/settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems;

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      // Focus first menu item when drawer opens
      const firstMenuItem = drawerRef.current.querySelector<HTMLElement>("a, button");
      if (firstMenuItem) {
        setTimeout(() => firstMenuItem.focus(), 0);
      }
    } else if (!isOpen && triggerButtonRef?.current) {
      // Return focus to trigger button when drawer closes
      triggerButtonRef.current.focus();
    }
  }, [isOpen, triggerButtonRef]);

  // Handle overlay click (mobile only)
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget && isMobile) {
        onClose();
      }
    },
    [isMobile, onClose]
  );

  // Handle menu item click
  const handleMenuItemClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <>
      {/* Overlay background (mobile only) */}
      {isOpen && isMobile && (
        <div
          data-testid="drawer-overlay"
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <nav
        ref={drawerRef}
        role="navigation"
        aria-label="メインメニュー"
        aria-expanded={isOpen}
        className={`
          ${isMobile ? "fixed" : "relative"}
          top-0 left-0 h-full z-50
          backdrop-blur-xl bg-white/10 border-r border-white/20
          transition-all duration-300 ease-in-out
          ${isMobile 
            ? (isOpen ? "translate-x-0" : "-translate-x-full") 
            : (isOpen ? "w-64" : "w-0 overflow-hidden")
          }
          ${isMobile ? "w-64" : ""}
          ${className}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <h2 className="text-lg font-semibold text-white">メニュー</h2>
            {isMobile && (
              <button
                type="button"
                onClick={onClose}
                aria-label="メニューを閉じる"
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Menu items */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.path}
                    onClick={() => handleMenuItemClick(item.path)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      text-white/70 hover:text-white hover:bg-white/10
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10
                    `}
                  >
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default memo(SideDrawer);
