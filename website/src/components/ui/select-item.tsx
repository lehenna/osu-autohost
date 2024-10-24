"use client";

import { useCallback } from "react";

export interface SelectItemOptions {
  value: string;
  label: string;
}

export function SelectItem({
  value,
  label,
  onClick,
}: SelectItemOptions & { onClick: (item: SelectItemOptions) => void }) {
  const handleClick = useCallback(() => {
    onClick({ value, label });
  }, [value, label, onClick]);
  return (
    <li
      className="rounded-md px-2.5 text-sm cursor-pointer h-8 flex items-center transition-[background-color] hover:bg-zinc-800"
      onClick={handleClick}
    >
      {label}
    </li>
  );
}
