import { API } from "@/lib/axios";

export class UsersAPI {
  static async me(): Promise<(User & { blockRoles: UserRole[] }) | null> {
    try {
      const res = await API.get("/api/users/me");
      return res.data;
    } catch {
      return null;
    }
  }

  static async find(): Promise<User[]> {
    try {
      const res = await API.get(`/api/users`);
      return res.data;
    } catch {
      return [];
    }
  }

  static async findById(userId: number): Promise<User | null> {
    try {
      const res = await API.get(`/api/users/${userId}`);
      return res.data;
    } catch {
      return null;
    }
  }

  static async ban(userId: number) {
    try {
      await API.post(`/api/users/${userId}/ban`);
    } catch {
      return;
    }
  }

  static async unban(userId: number) {
    try {
      await API.delete(`/api/users/${userId}/ban`);
    } catch {
      return;
    }
  }

  static async setRole(userId: number, role: UserRole) {
    try {
      await API.put(`/api/users/${userId}/role`, { role });
    } catch {
      return;
    }
  }
}
