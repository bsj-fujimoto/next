import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-gradient-to-r from-white to-white/90 text-indigo-900 font-semibold hover:from-white hover:to-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30",
    outline: "border border-white/30 text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

