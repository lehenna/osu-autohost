import { API } from "@/lib/axios";
import { User } from "@prisma/client";

export async function getUsers(): Promise<User[]> {
  try {
    const res = await API.get(`/api/users`);
    return res.data;
  } catch {
    return [];
  }
}

export async function setUserRole(
  userId: number,
  role: string
): Promise<User | null> {
  try {
    const res = await API.put(`/api/users/${userId}`, { role });
    return res.data;
  } catch {
    return null;
  }
}

export async function banOrUnban(userId: number) {
  try {
    const res = await API.delete(`/api/users/${userId}/ban`);
    return res.data;
  } catch {
    return null;
  }
}
