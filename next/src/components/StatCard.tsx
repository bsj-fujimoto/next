import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradientColors: string;
}

export default function StatCard({ title, value, icon, gradientColors }: StatCardProps) {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-2xl hover:bg-white/15 transition-all duration-200 transform hover:scale-105">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${gradientColors} shadow-lg`}>
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-white/70">
            {title}
          </p>
          <p className="text-2xl font-bold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
