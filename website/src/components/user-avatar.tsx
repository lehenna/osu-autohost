import { cn } from "@/lib/cn";

export interface UserAvatarOptions {
  userId?: number;
  className?: string;
  username?: string;
  size?: number;
}

export function UserAvatar({
  userId,
  username,
  className,
  size = 50,
}: UserAvatarOptions) {
  const url = `https://a.ppy.sh/${userId}`;
  return (
    <img
      width={size}
      height={size}
      src={url}
      className={cn("rounded-full", className)}
      alt={username ?? "User avatar"}
    />
  );
}
