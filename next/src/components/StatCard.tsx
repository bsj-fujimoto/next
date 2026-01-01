import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  iconBg?: "blue" | "green" | "yellow" | "pink" | "purple" | "indigo";
  title: string;
  value: string | number;
  className?: string;
}

export default function StatCard({ icon, iconBg = "blue", title, value, className = "" }: StatCardProps) {
  const iconBgClasses = {
    blue: "bg-gradient-to-br from-blue-400 to-blue-600",
    green: "bg-gradient-to-br from-green-400 to-green-600",
    yellow: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    pink: "bg-gradient-to-br from-pink-400 to-pink-600",
    purple: "bg-gradient-to-br from-purple-400 to-purple-600",
    indigo: "bg-gradient-to-br from-indigo-400 to-indigo-600",
  };

  return (
    <div className={`backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 shadow-2xl hover:bg-white/15 transition-all duration-200 transform hover:scale-105 ${className}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBgClasses[iconBg]} shadow-lg`}>
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

