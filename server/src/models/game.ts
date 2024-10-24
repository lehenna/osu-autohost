import { EventEmitter } from "events";
import {
  BanchoChannelMessage,
  BanchoMultiplayerChannel,
  BanchoPlayer,
  BanchoUser,
} from "../bancho";

export interface GameModelEvents {
  update: () => void;
  close: () => void;
  message: (message: BanchoChannelMessage) => void;
}

export interface GameModelCommand {
  name: string;
  description: string;
  args?: string;
  role?: UserRole;
  shortname?: string;
  run: (user: BanchoPlayer, ...args: string[]) => Promise<void>;
}

export class GameModel extends EventEmitter {
  readonly commands: GameModelCommand[] = [];
  readonly multi: BanchoMultiplayerChannel;
  public minDiff: number = 0;
  public maxDiff: number = 20;
  public minLength: number = 0;
  public maxLength: number = 60 * 10;

  constructor(multi: BanchoMultiplayerChannel) {
    super();
    this.multi = multi;
    multi.lobby.on("update", () => {
      this.emit("update");
    });
    multi.lobby.on("close", () => {
      this.emit("close");
    });
    multi.on("message", async ({ content, user }) => {
      this.emit("message", { content, user });
      if (!content.startsWith("!")) return;
      const [name, ...args] = content.slice(1).split(" ");
      const command = this.commands.find(
        (cmd) => cmd.name === name || cmd.shortname === name
      );
      if (!command) return;
      const player = multi.lobby.slots.find(
        (slot) => slot.user.id === user?.id
      );
      if (!player) return;
      command.run(player, ...args).catch((error) => {
        console.error(`[error] in [${name}] command:`);
        console.error(error);
      });
    });
  }

  reply(username: string, content: string) {
    this.multi.exec(`${username} -> ${content}`);
  }

  send(content: string) {
    this.multi.exec(content);
  }

  findUser(userId: number) {
    return (
      this.multi.lobby.slots.find((slot) => slot.user.id === userId) ?? null
    );
  }

  setMinDiff(minDiff: number) {
    this.minDiff = minDiff;
    this.emit("update");
  }

  setMaxDiff(maxDiff: number) {
    this.maxDiff = maxDiff;
    this.emit("update");
  }

  setMinLength(minLength: number) {
    this.minLength = minLength;
    this.emit("update");
  }

  setMaxLength(maxLength: number) {
    this.maxLength = maxLength;
    this.emit("update");
  }

  data(): Game {
    return {
      id: this.multi.id,
      name: this.multi.lobby.name,
      beatmap: this.multi.lobby.beatmap,
      gamemode: this.multi.lobby.gamemode,
      host: this.multi.lobby.host,
      maxDiff: this.maxDiff,
      minDiff: this.minDiff,
      maxLength: this.maxLength,
      minLength: this.minLength,
      playing: this.multi.lobby.playing,
      slots: this.multi.lobby.slots.map((slot) => slot.data()),
      teamMode: this.multi.lobby.teamMode,
      winCondition: this.multi.lobby.winCondition,
      password: this.multi.lobby.password,
    };
  }

  on<K extends keyof GameModelEvents>(
    event: K,
    listener: GameModelEvents[K]
  ): this {
    return super.on(event, listener);
  }

  emit<K extends keyof GameModelEvents>(
    event: K,
    ...args: Parameters<GameModelEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }
}
