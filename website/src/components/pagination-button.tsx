import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function PaginationButton({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "relative min-w-8 h-8 grid place-items-center border-2 border-zinc-800 rounded-md text-sm transition-[border-color] data-[actived=true]:border-blue-500",
        className
      )}
      {...props}
    />
  );
}
