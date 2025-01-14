import type { User } from "@prisma/client";
import type { Beatmap } from "nodesu";
import BanchoJs from "bancho.js";
import { nanoid } from "nanoid";
import { websocket } from "@/lib/websocket";
import { findOrCreateUser } from "@/utils/find-or-create-user";
import { secondsToString } from "@/utils/seconds-to-string";
import { getOsuModeName } from "@/utils/get-osu-mode-name";
import { BeatmapDetails, getBeatmapDetails } from "@/utils/get-beatmap-details";

export interface Room extends RoomOptions {
  id: number;
  queue: User[];
  host: number | null;
  beatmap: BeatmapDetails | null;
}

export interface RoomMessage {
  id: string;
  roomId: number;
  user: User;
  content: string;
  moment: number;
}

export interface RoomCommand {
  name: string;
  shortname?: string;
  exec: (user: User, ...args: string[]) => Promise<void>;
}

export type CreateCommandFunction = (room: RoomModel) => RoomCommand;

export interface RoomOptions {
  name: string;
  password: string;
  size: number;
  gamemode: number;
  minDiff: number;
  maxDiff: number;
  minLength: number;
  maxLength: number;
}

export class RoomModel {
  readonly multi: BanchoJs.BanchoMultiplayerChannel;
  readonly id: number;
  public name: string;
  public password: string;
  public size: number;
  public gamemode: number;
  public minDiff: number;
  public maxDiff: number;
  public minLength: number;
  public maxLength: number;
  public queue: User[] = [];
  public host: number | null = null;
  public beatmap: BeatmapDetails | null = null;
  public timer: NodeJS.Timeout | null = null;
  public strikes: number = 0;
  public commands: RoomCommand[] = [];

  constructor(multi: BanchoJs.BanchoMultiplayerChannel, options: RoomOptions) {
    this.id = multi.lobby.id;
    this.multi = multi;
    this.name = options.name;
    this.password = options.password;
    this.size = options.size;
    this.gamemode = options.gamemode;
    this.minDiff = options.minDiff;
    this.maxDiff = options.maxDiff;
    this.minLength = options.minLength * 60;
    this.maxLength = options.maxLength * 60;

    websocket.emit("roomCreated", this.data());

    multi.lobby.setPassword(options.password);
    multi.lobby.setSize(options.size);

    multi.lobby.on("allPlayersReady", async () => {
      await this.clearTimer();
      await multi.lobby.startMatch();
    });

    multi.lobby.on("matchFinished", async () => {
      await this.nextHost();
      await multi.lobby.setName(this.name);
      await multi.lobby.setPassword(this.password);
      await multi.lobby.setSettings(0, 0, this.size);
      await this.sendQueue();
    });

    multi.lobby.on("playerJoined", async ({ player: { user: banchoUser } }) => {
      const user = await findOrCreateUser(banchoUser);
      if (!this.queue.find((us) => us.id === user.id)) this.queue.push(user);
      websocket.emit("roomUpdated", this.data());
      if (this.host) return;
      const newHost = this.queue[0];
      if (!newHost) {
        this.host = null;
        return;
      }
      await multi.lobby.setHost(`#${newHost.id}`);
    });

    multi.lobby.on("playerLeft", async ({ user: banchoUser }) => {
      const user = await findOrCreateUser(banchoUser);
      const queueIndex = this.queue.findIndex((us) => us.id === user.id);
      if (queueIndex !== -1) this.queue.splice(queueIndex, 1);
      websocket.emit("roomUpdated", this.data());
      const isHost = this.host === banchoUser.id;
      if (!isHost) return;
      const newHost = this.queue[0];
      if (!newHost) {
        this.host = null;
        return;
      }
      await multi.lobby.setHost(`#${newHost.id}`);
    });

    multi.lobby.on("host", async (player) => {
      this.strikes = 0;
      if (!player || !player.user) return;
      this.host = player.user.id;
      websocket.emit("roomUpdated", this.data());
    });

    multi.on("message", async ({ content, user: banchoUser }) => {
      const user = await findOrCreateUser(banchoUser);
      if (user.username === "BanchoBot") {
        if (content.toLowerCase() === "closed the match") {
          websocket.emit("roomClosed", this.id);
        }
      }
      const moment = Date.now();
      websocket.emit("roomMessage", {
        id: `${moment}-${user.id}-${nanoid(10)}`,
        content,
        moment,
        roomId: this.id,
        user,
      });
      if (!content.startsWith("!")) return;
      const [name, ...args] = content.slice(1).split(" ");
      const command = this.commands.find(
        (cmd) => cmd.name === name || cmd.shortname === name
      );
      if (!command) return;
      try {
        await command.exec(user, ...args);
      } catch (error) {
        console.error(`[${this.name}] command error:`, error);
        await this.send("Sorry, I had an unexpected error.");
      }
    });

    multi.lobby.on("beatmap", async (beatmap) => {
      if (!beatmap) return;
      if (this.beatmap?.id === beatmap.id) return;
      const validation = this.validateBeatmap(beatmap);
      if (validation.success === false) {
        await this.setLastBeatmap();
        await this.send(validation.message);
        this.strikes++;
        await this.validateStrikes();
        return;
      }
      const details = await getBeatmapDetails(beatmap);
      this.beatmap = details;
      const message1 = `[${details.downloadLink} ${details.title} [${details.difficultyText}]] (Star Rating: ${details.difficulty} | ${details.status} | Length: ${details.duration} | BPM: ${details.bpm})`;
      const message2 = `(${details.settings}) (FC: x${details.maxCombo}) (100% ${details.pp100}pp | 98% ${details.pp98}pp | 95% ${details.pp95}pp)`;
      this.send(message1);
      this.send(message2);
      websocket.emit("roomUpdated", this.data());
    });
  }

  addCommand(createCommand: CreateCommandFunction) {
    const command = createCommand(this);
    this.commands.push(command);
  }

  addCommands(createCommands: CreateCommandFunction[]) {
    for (const createCommand of createCommands) {
      this.addCommand(createCommand);
    }
  }

  validateBeatmap(
    beatmap: Beatmap
  ): { success: true; message: null } | { success: false; message: string } {
    if (beatmap.mode !== this.gamemode) {
      const message = `The game mode of the selected map is not allowed (${getOsuModeName(
        beatmap.mode ?? 0
      )} !== ${getOsuModeName(this.gamemode)}).`;
      return {
        success: false,
        message,
      };
    }
    const beatmapDiff = beatmap.difficultyRating.toFixed(2);
    const beatmapLegth = secondsToString(beatmap.totalLength);
    if (beatmap.difficultyRating < this.minDiff) {
      const minDiffText = this.minDiff.toFixed(2);
      const message = `The map difficulty is lower than allowed (${beatmapDiff} < ${minDiffText}).`;
      return {
        success: false,
        message,
      };
    }
    if (beatmap.difficultyRating > this.maxDiff) {
      const maxDiffText = this.maxDiff.toFixed(2);
      const message = `The map difficulty is higher than allowed (${beatmapDiff} > ${maxDiffText}).`;
      return {
        success: false,
        message,
      };
    }
    if (beatmap.totalLength < this.minLength) {
      const minLegthText = secondsToString(this.minLength);
      const message = `The map legth is lower than allowed (${beatmapLegth} < ${minLegthText}).`;
      return {
        success: false,
        message,
      };
    }
    if (beatmap.totalLength > this.maxLength) {
      const maxLegthText = secondsToString(this.maxLength);
      const message = `The map legth is higher than allowed (${beatmapLegth} > ${maxLegthText}).`;
      return {
        success: false,
        message,
      };
    }
    return { success: true, message: null };
  }

  async setLastBeatmap() {
    if (!this.beatmap) return;
    await this.multi.lobby.setMap(this.beatmap.id);
  }

  async validateStrikes() {
    if (this.strikes < 3) return;
    await this.send("Strike limit reached, skipping host...");
    await this.nextHost();
  }

  async clearTimer() {
    if (this.timer) clearTimeout(this.timer);
  }

  async sendQueue() {
    const users = this.queue
      .slice(0, 6)
      .map((i) => i.username)
      .join(", ");
    const queue = `Queue: ${users}${this.queue.length > 6 ? "..." : ""}`;
    await this.send(queue);
  }

  async nextHost() {
    if (this.queue.length < 2) return;
    const [currentHost, newHost] = this.queue;
    await this.multi.lobby.setHost(`#${newHost.id}`);
    this.queue.splice(0, 1);
    this.queue.push(currentHost);
  }

  async setTimer(time: number) {
    this.clearTimer();
    if (time > 10) {
      await this.send(`Queued the match to start in ${time} seconds`);
      this.timer = setTimeout(async () => {
        await this.send(`Match starts in 10 seconds`);
        this.setTimer(10);
      }, (time - 10) * 1000);
      return;
    }
    await this.send(`Match starts in ${time} seconds`);
    this.timer = setTimeout(async () => {
      await this.multi.lobby.startMatch();
    }, time * 1000);
  }

  async send(content: string) {
    await this.multi.sendMessage(content);
  }

  data(): Room {
    return {
      id: this.id,
      name: this.name,
      minDiff: this.minDiff,
      maxDiff: this.maxDiff,
      minLength: this.minLength,
      maxLength: this.maxLength,
      gamemode: this.gamemode,
      size: this.size,
      password: this.password,
      queue: this.queue,
      host: this.host,
      beatmap: this.beatmap,
    };
  }

  async update(data: Partial<RoomOptions>) {
    if (data.name && data.name !== this.name) {
      this.name = data.name;
      await this.multi.lobby.setName(data.name);
    }
    if (typeof data.gamemode === "number") this.gamemode = data.gamemode;
    if (typeof data.password === "string" && data.password !== this.password) {
      this.password = data.password;
      await this.multi.lobby.setPassword(data.password);
    }
    if (data.size && data.size !== this.size) {
      this.size = data.size;
      await this.multi.lobby.setSize(data.size);
    }
    if (typeof data.minDiff === "number") this.minDiff = data.minDiff;
    if (typeof data.maxDiff === "number") this.maxDiff = data.maxDiff;
    if (typeof data.minLength === "number")
      this.minLength = data.minLength * 60;
    if (typeof data.maxLength === "number")
      this.maxLength = data.maxLength * 60;
    websocket.emit("roomUpdated", this.data());
  }

  async remove() {
    await this.multi.lobby.closeLobby();
    websocket.emit("roomClosed", this.id);
  }
}
