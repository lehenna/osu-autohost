import { API } from "@/lib/axios";
import { Credentials } from "@/lib/credentials";

export async function saveCredentials(credentials: Credentials) {
  try {
    const res = await API.post("/api/credentials", credentials);
    return res.data;
  } catch {
    return { success: false };
  }
}
