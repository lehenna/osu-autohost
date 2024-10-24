import { eq } from "drizzle-orm";
import { Users } from "../lib/schemas";
import { db } from "../lib/database";
import { getSettings } from "../lib/settings";

export class UserServices {
  static async find(): Promise<User[]> {
    const users = await db.select().from(Users);
    return users as User[];
  }

  static async update(userId: number, data: Partial<User>) {
    await db.update(Users).set(data).where(eq(Users.id, userId));
  }

  static async findById(userId: number) {
    const users = await db.select().from(Users).where(eq(Users.id, userId));
    return users[0] ?? null;
  }

  static async create(data: { id: number; username: string }): Promise<User> {
    const user = await this.findById(data.id);
    if (user) {
      if (user.username !== data.username) {
        await this.update(user.id, {
          username: data.username,
        });
        return {
          ...user,
          username: user.username,
        } as User;
      }
      return user as User;
    }
    const settings = await getSettings();
    const newUser: User = {
      id: data.id,
      username: data.username,
      role: settings.username === data.username ? "admin" : "user",
      autoskip: 0,
      playtime: 0,
    };
    await db.insert(Users).values(newUser);
    return newUser;
  }
}
