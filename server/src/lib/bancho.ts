import { BanchoClient } from "../bancho";
import { getSettings } from "./settings";

let banchoClient: BanchoClient;

export async function createBanchoClient() {
  const settings = await getSettings();
  banchoClient = new BanchoClient({
    username: settings.username,
    apikey: settings.apiKey,
    password: settings.password,
  });
  await banchoClient.connect();
}

export function getBanchoClient(): BanchoClient {
  return banchoClient;
}
