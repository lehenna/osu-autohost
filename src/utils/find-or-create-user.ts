import { db } from "@/lib/database";

let totalUsers: number;

export async function findOrCreateUser(banchoUser?: {
  id: number;
  username: string;
}) {
  if (!totalUsers || totalUsers === 0) totalUsers = await db.user.count();
  const user = await db.user.upsert({
    where: {
      id: banchoUser?.id ?? 3,
    },
    create: {
      id: banchoUser?.id ?? 3,
      role: totalUsers === 0 ? "master" : "user",
      username: banchoUser?.username ?? "BanchoBot",
      banned: false,
    },
    update: {
      username: banchoUser?.username ?? "BanchoBot",
    },
  });
  return user;
}
