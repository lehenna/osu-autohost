export class Session {
  static async decode(
    value: string
  ): Promise<User & { blockRoles: UserRole[] }> {
    return JSON.parse(value);
  }

  static async encode(user: User & { blockRoles: UserRole[] }) {
    return JSON.stringify(user);
  }
}
