import axios from "axios";

export interface OAuthCredentials {
  clientId: string;
  callbackUrl: string;
  secret: string;
}

export class OAuth {
  static redirectUrl: string;
  static credentials: OAuthCredentials;

  static create(credentials: OAuthCredentials) {
    const baseUrl = "https://osu.ppy.sh/oauth/authorize";
    const params = new URLSearchParams({
      client_id: credentials.clientId,
      redirect_uri: credentials.callbackUrl,
      response_type: "code",
      scope: "identify",
    });
    this.redirectUrl = `${baseUrl}?${params.toString()}`;
    this.credentials = credentials;
  }

  static async user(token: string): Promise<{
    id: number;
    username: string;
  } | null> {
    try {
      const response = await axios.get("https://osu.ppy.sh/api/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch {
      return null;
    }
  }

  static async token(code: string): Promise<string | null> {
    if (!this.credentials) throw new Error("OAuth credentials not set");
    try {
      const response = await axios.post("https://osu.ppy.sh/oauth/token", {
        client_id: this.credentials.clientId,
        client_secret: this.credentials.secret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: this.credentials.callbackUrl,
      });
      return response.data.access_token;
    } catch {
      return null;
    }
  }
}
