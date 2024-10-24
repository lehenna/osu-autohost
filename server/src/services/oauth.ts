import { getSettings } from "../lib/settings";
import axios from "axios";

export class OAuthServices {
  clientId: number;
  clientSecret: string;
  redirectUri: string;
  userInfoUrl = "https://osu.ppy.sh/api/v2/me";
  tokenUrl = "https://osu.ppy.sh/oauth/token";

  constructor(options: {
    clientId: number;
    clientSecret: string;
    redirectUri: string;
  }) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.redirectUri = options.redirectUri;
  }

  getAuthorizationUrl(): string {
    const baseUrl = "https://osu.ppy.sh/oauth/authorize";
    const params = new URLSearchParams({
      client_id: this.clientId.toString(),
      redirect_uri: this.redirectUri,
      response_type: "code",
      scope: "identify",
    });

    return `${baseUrl}?${params.toString()}`;
  }

  async getToken(code: string): Promise<string | null> {
    try {
      const response = await axios.post(this.tokenUrl, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: this.redirectUri,
      });

      return response.data.access_token;
    } catch {
      return null;
    }
  }

  async getUserInfo(token: string): Promise<{
    id: number;
    username: string;
  } | null> {
    try {
      const response = await axios.get(this.userInfoUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch {
      return null;
    }
  }
}

let oauth: OAuthServices | null = null;

export async function getOAuthServices() {
  if (!oauth) {
    const settings = await getSettings();
    oauth = new OAuthServices({
      clientId: settings.oauth.clientId,
      clientSecret: settings.oauth.secret,
      redirectUri: settings.oauth.redirectUri,
    });
  }
  return oauth;
}
