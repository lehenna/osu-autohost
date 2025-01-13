import { ncrypt as Ncrypt } from "ncrypt-js";
import fs from "fs/promises";
import path from "path";

import { type BanchoCredentials } from "./bancho";
import { OAuthCredentials } from "./oauth";

const ncrypt = new Ncrypt(process.env.SECRET ?? "custom-secret");

const CREDENTIALS_FILE = path.join(process.cwd(), "credentials.txt");

export interface Credentials {
  oauth: OAuthCredentials;
  bancho: BanchoCredentials;
}

export async function getCredentials(): Promise<Credentials | null> {
  try {
    const fileContent = await fs.readFile(CREDENTIALS_FILE, "utf-8");
    const originalContent = ncrypt.decrypt(fileContent).toString();
    const content = JSON.parse(originalContent);
    return content;
  } catch {
    return null;
  }
}

export async function createCredentialsFile(credentials: Credentials) {
  try {
    const encryptedContent = ncrypt.encrypt(JSON.stringify(credentials));
    await fs.writeFile(CREDENTIALS_FILE, encryptedContent, "utf-8");
  } catch {
    return;
  }
}
