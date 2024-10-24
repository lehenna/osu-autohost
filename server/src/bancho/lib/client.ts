import { Client } from "irc";
import { EventEmitter } from "events";
import { Client as Nodesu } from "nodesu";
import { BanchoMultiplayerChannel } from "./channel";
import { BanchoUser } from "./user";
import { UserServices } from "../../services/users";

export interface BanchoClientOptions {
  apikey: string;
  username: string;
  password: string;
  port?: number;
  host?: string;
}

export interface BanchoClientMessage {
  from: string;
  to: string;
  content: string;
}

export interface BanchoClientEvents {
  message: (message: BanchoClientMessage) => void;
}

export class BanchoClient extends EventEmitter {
  public client: Client | null = null;
  public isConnected: boolean = false;
  readonly osuApi: Nodesu;
  readonly apikey: string;
  readonly username: string;
  readonly password: string;
  readonly port: number;
  readonly host: string;

  constructor(options: BanchoClientOptions) {
    super();
    this.apikey = options.apikey;
    this.username = options.username;
    this.password = options.password;
    this.host = options.host ?? "irc.ppy.sh";
    this.port = options.port ?? 6667;
    this.osuApi = new Nodesu(this.apikey, {
      parseData: true,
    });
  }

  async getUser(username: string): Promise<BanchoUser | null> {
    const res = await this.osuApi.user.get(username);
    if (!("username" in res)) return null;
    const newUser = await UserServices.create({
      id: res.id,
      username: username,
    });
    return new BanchoUser(newUser);
  }

  async createLobby(
    name: string,
    privated: boolean = false
  ): Promise<BanchoMultiplayerChannel> {
    return await new Promise((resolve) => {
      if (!this.client) throw new Error("BanchoClient needs to connect.");
      this.on("message", ({ to, from, content }) => {
        if (from !== "BanchoBot" || to !== this.username) return;
        const matchId = this.extractMatchId(content);
        if (!matchId) return;
        const multi = new BanchoMultiplayerChannel({
          client: this,
          id: parseInt(matchId),
        });
        resolve(multi);
      });
      const command = privated ? "makeprivate" : "make";
      this.exec("BanchoBot", `!mp ${command} ${name}`);
    });
  }

  private extractMatchId(message: string): string | null {
    const match = message.match(/https:\/\/osu.ppy.sh\/mp\/(\d+)/);
    return match ? match[1] : null;
  }

  async connect(): Promise<void> {
    if (this.isConnected) return;
    return await new Promise((resolve, reject) => {
      const client = new Client(this.host, this.username, {
        port: this.port,
        password: this.password,
      });

      client.addListener("error", (message) => {
        this.isConnected = false;
        reject(message);
      });

      client.addListener("registered", () => {
        this.isConnected = true;
        resolve();
      });

      client.addListener("message", (from, to, message) => {
        this.emit("message", {
          from,
          to,
          content: message,
        });
      });

      this.client = client;
    });
  }

  disconnect() {
    this.client?.disconnect("", () => {});
  }

  exec(channel: string, content: string) {
    this.client?.say(channel, content);
  }

  on<K extends keyof BanchoClientEvents>(
    event: K,
    listener: BanchoClientEvents[K]
  ): this {
    return super.on(event, listener);
  }

  emit<K extends keyof BanchoClientEvents>(
    event: K,
    ...args: Parameters<BanchoClientEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }
}
