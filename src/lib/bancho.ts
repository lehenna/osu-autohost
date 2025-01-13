import BanchoJs from "bancho.js";

export interface BanchoCredentials {
  username: string;
  password: string;
  apiKey: string;
  botAccount: boolean;
  host: string;
  port: number;
}

export class Bancho {
  static client: BanchoJs.BanchoClient;

  static async create(credentials: BanchoCredentials) {
    if (this.client && this.client.isConnected())
      throw new Error("Bancho client already connected.");
    const banchoClient = new BanchoJs.BanchoClient(credentials);
    banchoClient.on("disconnected", () => {
      console.info("Bancho is disconnected.");
    });
    await banchoClient.connect();
    this.client = banchoClient;
    console.info("> Bancho connected.");
  }

  static status() {
    const connected = this.client ? this.client.isConnected() : false;
    return {
      connected,
    };
  }
}
