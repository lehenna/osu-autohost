"use client";
import { useCallback } from "react";
import { UseSwitchReturn } from "@/hooks/switch";

export function Switch({ active, setActive }: UseSwitchReturn) {
  const handleClick = useCallback(() => {
    setActive((m) => !m);
  }, [setActive]);
  return (
    <button
      data-actived={active}
      className="relative rounded-full transition-[background-color,border-color] before:transition-[background-color,margin-left] w-10 h-6 bg-transparent border-2 border-zinc-900 flex items-center before:content-[' '] before:w-4 before:h-4 before:rounded-full before:bg-zinc-800 before:left-0.5 data-[actived=true]:bg-violet-500 data-[actived=true]:before:bg-white data-[actived=true]:border-violet-500 data-[actived=true]:before:ml-4 before:absolute"
      onClick={handleClick}
      type="button"
    ></button>
  );
}
