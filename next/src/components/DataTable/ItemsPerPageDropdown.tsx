"use client";

import { memo, useCallback, useState } from "react";
import DropdownMenu, { DropdownMenuItem } from "@/components/DropdownMenu";

interface ItemsPerPageDropdownProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

function ItemsPerPageDropdown({
  value,
  options,
  onChange,
}: ItemsPerPageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback((option: number) => {
    onChange(option);
  }, [onChange]);

  const menuItems: DropdownMenuItem[] = options.map((option) => ({
    label: option.toString(),
    onClick: () => handleSelect(option),
    className: value === option
      ? "bg-indigo-100 text-indigo-900 font-semibold"
      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:outline-none",
  }));

  const trigger = (
    <button
      type="button"
      className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
    >
      <span>{value}</span>
      <svg
        className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );

  return (
    <DropdownMenu
      trigger={trigger}
      items={menuItems}
      align="left"
      onOpenChange={setIsOpen}
    />
  );
}

export default memo(ItemsPerPageDropdown);

