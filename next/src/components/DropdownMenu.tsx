"use client";

import { useState, useRef, useEffect, memo, useCallback, ReactNode } from "react";
import type React from "react";

export interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  className?: string;
}

interface DropdownMenuProps {
  trigger: ReactNode;
  items: DropdownMenuItem[];
  align?: "left" | "right";
  className?: string;
  menuClassName?: string;
  onOpenChange?: (isOpen: boolean) => void;
  closeOnSelect?: boolean;
}

function DropdownMenu({
  trigger,
  items,
  align = "left",
  className = "",
  menuClassName = "",
  onOpenChange,
  closeOnSelect = true,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
  }, [isOpen, onOpenChange]);

  const handleSelect = useCallback((item: DropdownMenuItem) => {
    item.onClick();
    if (closeOnSelect) {
      setIsOpen(false);
      onOpenChange?.(false);
    }
  }, [closeOnSelect, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
      onOpenChange?.(false);
    };

    const handleResize = () => {
      setIsOpen(false);
      onOpenChange?.(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      const menuItems = Array.from(
        dropdownRef.current?.querySelectorAll('[role="menuitem"]') || []
      ) as HTMLElement[];
      
      const currentIndex = menuItems.findIndex(item => item === document.activeElement);

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
          menuItems[nextIndex]?.focus();
          break;
        case 'ArrowUp':
          event.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
          menuItems[prevIndex]?.focus();
          break;
        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          onOpenChange?.(false);
          triggerRef.current?.querySelector('button')?.focus();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
      document.addEventListener("keydown", handleKeyDown);
      
      // Focus first menu item when menu opens
      const menuItems = Array.from(
        dropdownRef.current?.querySelectorAll('[role="menuitem"]') || []
      ) as HTMLElement[];
      if (menuItems.length > 0) {
        setTimeout(() => menuItems[0]?.focus(), 0);
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onOpenChange]);

  const handleTriggerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggle();
  }, [handleToggle]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div ref={triggerRef} onClick={handleTriggerClick} style={{ display: 'inline-block' }}>
        {trigger}
      </div>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute ${align === "right" ? "right-0" : "left-0"} top-full mt-1 z-[9999] rounded-lg border border-gray-200 shadow-xl overflow-hidden bg-white ${menuClassName || 'min-w-full'}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              role="menuitem"
              onClick={() => handleSelect(item)}
              tabIndex={0}
              className={`w-full text-left px-3 py-2 text-sm transition-all flex items-center gap-3 ${
                item.className || "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:outline-none"
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(DropdownMenu);

