interface StatusBadgeProps {
  status: "success" | "pending" | "failed" | "warning";
  children: React.ReactNode;
  className?: string;
}

export default function StatusBadge({ status, children, className = "" }: StatusBadgeProps) {
  const statusClasses = {
    success: "bg-green-500/20 border-green-400/30 text-green-200",
    pending: "bg-yellow-500/20 border-yellow-400/30 text-yellow-200",
    failed: "bg-red-500/20 border-red-400/30 text-red-200",
    warning: "bg-orange-500/20 border-orange-400/30 text-orange-200",
  };

  return (
    <span
      className={`inline-flex rounded-full backdrop-blur-sm border px-3 py-1 text-xs font-semibold ${statusClasses[status]} ${className}`}
    >
      {children}
    </span>
  );
}

