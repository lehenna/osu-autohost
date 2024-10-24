import { cn } from "@/lib/cn";
import { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...options
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        className,
        "h-10 rounded-md w-full bg-transparent border-2 border-zinc-800 text-white transition-[border-color] px-2.5 outline-none focus:border-violet-500"
      )}
      {...options}
    />
  );
}
