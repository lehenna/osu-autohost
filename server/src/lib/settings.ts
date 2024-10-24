import path from "path";

export interface Settings {
  username: string;
  apiKey: string;
  password: string;
  oauth: {
    clientId: number;
    redirectUri: string;
    secret: string;
  };
}

const FILE_PATH = path.join(process.cwd(), "settings.json");

let settings: Settings | null = null;

export async function getSettings(): Promise<Settings> {
  if (!settings) settings = await Bun.file(FILE_PATH).json();
  return settings as Settings;
}
