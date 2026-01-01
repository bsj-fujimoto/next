import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export default function GlassCard({ children, className = "", padding = "md" }: GlassCardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div className={`backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-2xl ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}

