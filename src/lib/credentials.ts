import fs from "fs/promises";
import path from "path";

import { type BanchoCredentials } from "./bancho";
import { OAuthCredentials } from "./oauth";

const CREDENTIALS_FILE = path.join(process.cwd(), "credentials.txt");

export interface Credentials {
  oauth: OAuthCredentials;
  bancho: BanchoCredentials;
}

export async function getCredentials(): Promise<Credentials | null> {
  try {
    const fileContent = await fs.readFile(CREDENTIALS_FILE, "utf-8");
    const content = JSON.parse(fileContent);
    return content;
  } catch {
    return null;
  }
}

export async function createCredentialsFile(credentials: Credentials) {
  try {
    await fs.writeFile(CREDENTIALS_FILE, JSON.stringify(credentials), "utf-8");
  } catch {
    return;
  }
}
