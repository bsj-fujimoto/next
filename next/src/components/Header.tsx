import { ReactNode } from "react";

interface HeaderProps {
  logo?: ReactNode;
  title: string;
  actions?: ReactNode;
  className?: string;
}

export default function Header({ logo, title, actions, className = "" }: HeaderProps) {
  return (
    <header className={`relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
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

