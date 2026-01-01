import { AnchorHTMLAttributes, ReactNode } from "react";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "default" | "underline";
}

export default function Link({ children, variant = "default", className = "", ...props }: LinkProps) {
  const variantClasses = {
    default: "text-white hover:text-white/80 transition-colors",
    underline: "text-sm font-semibold text-white hover:text-white/80 transition-colors underline decoration-2 underline-offset-2",
  };

  return (
    <a {...props} className={`${variantClasses[variant]} ${className}`}>
      {children}
    </a>
  );
}

