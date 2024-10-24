import { EventEmitter } from "events";
import type { BanchoClient } from "./client";
import { BanchoLobby } from "./lobby";
import { BanchoUser } from "./user";

export interface BanchoChannelMessage {
  user: BanchoUser | null;
  content: string;
}

export interface BanchoChannelEvents {
  message: (message: BanchoChannelMessage) => void;
}

export interface BanchoChannelOptions {
  client: BanchoClient;
  id: number;
}

export class BanchoChannel extends EventEmitter {
  readonly client: BanchoClient;
  readonly id: number;

  constructor(options: BanchoChannelOptions) {
    super();
    this.client = options.client;
    this.id = options.id;

    this.client.on("message", async ({ from, content, to }) => {
      if (to !== `#mp_${this.id}`) return;
      const user = await this.client.getUser(from);
      this.emit("message", { user, content });
    });
  }

  exec(content: string) {
    this.client?.exec(`#mp_${this.id}`, content);
  }

  on<K extends keyof BanchoChannelEvents>(
    event: K,
    listener: BanchoChannelEvents[K]
  ): this {
    return super.on(event, listener);
  }

  emit<K extends keyof BanchoChannelEvents>(
    event: K,
    ...args: Parameters<BanchoChannelEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }
}

export interface BanchoMultiplayerChannelOptions extends BanchoChannelOptions {}

export class BanchoMultiplayerChannel extends BanchoChannel {
  readonly lobby: BanchoLobby;

  constructor(options: BanchoMultiplayerChannelOptions) {
    super(options);
    this.lobby = new BanchoLobby({
      client: this.client,
      channel: this,
    });
  }
}
