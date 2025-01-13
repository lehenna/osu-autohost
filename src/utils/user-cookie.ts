import { ncrypt as Ncrypt } from "ncrypt-js";
import { UserData } from "@/hooks/user";

const ncrypt = new Ncrypt(process.env.SECRET ?? "user-cookie");

export class UserCookie {
  static decode(value: string) {
    try {
      const originalContent = ncrypt.decrypt(value);
      return JSON.parse(originalContent as string) as UserData;
    } catch {
      return null;
    }
  }

  static encode(user: UserData) {
    const encryptedValue = ncrypt.encrypt(JSON.stringify(user));
    return encryptedValue;
  }
}
