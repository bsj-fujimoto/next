import { ReactNode, useRef } from "react";

interface HeaderProps {
  logo?: ReactNode;
  title: string;
  actions?: ReactNode;
  className?: string;
  withDrawerToggle?: boolean;
  onDrawerToggle?: () => void;
  drawerToggleRef?: React.RefObject<HTMLButtonElement | null>;
  isDrawerOpen?: boolean;
}

export default function Header({ 
  logo, 
  title, 
  actions, 
  className = "",
  withDrawerToggle = false,
  onDrawerToggle,
  drawerToggleRef,
  isDrawerOpen = false,
}: HeaderProps) {
  const internalRef = useRef<HTMLButtonElement>(null);
  const toggleRef = drawerToggleRef || internalRef;

  return (
    <header className={`relative z-40 backdrop-blur-xl bg-white/10 border-b border-white/20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            {withDrawerToggle && (
              <button
                ref={toggleRef}
                type="button"
                onClick={onDrawerToggle}
                aria-label={isDrawerOpen ? "メニューを閉じる" : "メニューを開く"}
                aria-expanded={isDrawerOpen}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            {logo && (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm border border-white/30">
                {logo}
              </div>
            )}
            <h1 className="text-xl font-bold text-white">
              {title}
            </h1>
          </div>
          {actions && (
            <div className="flex items-center space-x-4">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

