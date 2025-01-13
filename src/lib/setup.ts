import { Bancho } from "./bancho";
import { Credentials } from "./credentials";
import { OAuth } from "./oauth";

export async function setup(credentials: Credentials) {
  let success = true;
  const banchoClientStatus = Bancho.status();
  const banchoIsConnected = banchoClientStatus.connected;
  if (!banchoIsConnected && credentials) {
    try {
      await Bancho.create(credentials.bancho);
      OAuth.create(credentials.oauth);
    } catch {
      success = false;
    }
  }
  return { success };
}
