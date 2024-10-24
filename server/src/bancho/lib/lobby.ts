import { EventEmitter } from "events";
import type { BanchoMultiplayerChannel } from "./channel";
import type { BanchoClient } from "./client";
import { BanchoPlayer, BanchoUser } from "./user";
import { BeatmapServices } from "../../services/beatmap";
import { getTeamModeValue, getWinConditionValue } from "./consts";

export interface BanchoLobbyOptions {
  client: BanchoClient;
  channel: BanchoMultiplayerChannel;
}

export interface BanchoLobbyEvents {
  close: () => void;
  name: (name: string) => void;
  gamemode: (gamemode: GameMode) => void;
  playing: (playing: boolean) => void;
  slots: (slots: BanchoPlayer[]) => void;
  winCondition: (winCondition: number) => void;
  teamMode: (teamMode: number) => void;
  host: (host: BanchoUser | null) => void;
  beatmap: (beatmap: Beatmap) => void;
  join: (user: BanchoPlayer) => void;
  leave: (user: BanchoUser) => void;
  password: (password: string) => void;
  allPlayersReady: () => void;
  update: () => void;
}

export class BanchoLobby extends EventEmitter {
  readonly client: BanchoClient;
  readonly channel: BanchoMultiplayerChannel;
  public slots: BanchoPlayer[] = [];
  public playing: boolean = false;
  public host: BanchoUser | null = null;
  public beatmap: Beatmap | null = null;

  public name: string = "";
  public password: string = "";
  public gamemode: GameMode = 0;
  public winCondition: number = 0;
  public teamMode: number = 0;

  private async details(content: string) {
    const action = content.toLowerCase().trim();

    const patterns: { [key: string]: () => Promise<void> | void } = {
      "room name:": () => this.handleRoomNameChange(action),
      "team mode": () => this.handleTeamModeChange(action),
      "closed the match": () => this.handleMatchClosure(),
      "changed match host to": () => this.handleHostChange(action),
      "the match has finished": () => this.handleMatchFinish(),
      "started the match": () => this.handleMatchStart(),
      "joined in slot": () => this.handlePlayerJoin(action),
      "left the game": () => this.handlePlayerLeave(action),
      "moved to slot": () => this.handleSlotChange(action),
      "beatmap changed to": () => this.handleBeatmapChange(action),
      "all players are ready": () => this.handleAllPlayersReady(),
    };

    for (const [pattern, handler] of Object.entries(patterns)) {
      if (action.includes(pattern)) {
        await handler();
        return;
      }
    }
  }

  private handleAllPlayersReady() {
    this.emit("allPlayersReady");
  }

  private handleRoomNameChange(action: string) {
    const regex = /room name: (.*?), history:/;
    const match = action.match(regex);
    const name = match ? match[1] : "";
    this.name = name;
    this.emit("name", name);
    this.emit("update");
  }

  private handleTeamModeChange(action: string) {
    const regex = /team mode: (.*?), win condition: (.*)/;
    const match = action.match(regex);
    const teamMode = match ? match[1] : "headtohead";
    const winCondition = match ? match[2] : "score";
    this.emit("teamMode", getTeamModeValue(teamMode));
    this.emit("winCondition", getWinConditionValue(winCondition));
    this.emit("update");
  }

  private handleMatchClosure() {
    this.emit("close");
  }

  private async handleHostChange(action: string) {
    const username = action.split(" ").pop();
    if (!username) return;
    const user = await this.client.getUser(username);
    this.host = user;
    this.emit("host", user);
    this.emit("update");
  }

  private handleMatchFinish() {
    this.playing = false;
    this.emit("playing", false);
    this.emit("update");
  }

  private handleMatchStart() {
    this.playing = true;
    this.emit("playing", true);
    this.emit("update");
    this.channel.exec("!mp settings");
  }

  private async handlePlayerJoin(action: string) {
    const args = action.split(" ");
    const username = args[0];
    const slot = args.pop()?.replace(".", "") ?? "";
    const user = (await this.client.getUser(username)) as BanchoUser;
    const player = new BanchoPlayer({
      channel: this.channel,
      slot: parseInt(slot),
      team: null,
      user,
    });
    this.slots.push(player);
    this.emit("join", player);
    this.emit("slots", this.slots);
    this.emit("update");
  }

  private async handlePlayerLeave(action: string) {
    const args = action.split(" ");
    const username = args[0];
    const user = await this.client.getUser(username);
    const isHost = this.host?.id === user?.id;
    if (isHost) {
      this.host = null;
    }
    const index = this.slots.findIndex((slot) => slot.user.id === user?.id);
    if (index !== -1) this.slots.splice(index, 1);
    if (user?.id === this.host?.id) {
      this.host = null;
    }
    this.emit("leave", user!);
    this.emit("slots", this.slots);
    this.emit("update");
  }

  private handleSlotChange(action: string) {
    const args = action.split(" ");
    const username = args[0];
    const slot = args.pop()?.replace(".", "") ?? "";
    const newSlot = parseInt(slot);
    const index = this.slots.findIndex(
      (slot) => slot.user.username === username
    );
    if (index === -1) return;
    this.slots[index].slot = newSlot;
    this.emit("slots", this.slots);
    this.emit("update");
  }

  private async handleBeatmapChange(action: string) {
    const regex = /https:\/\/osu\.ppy\.sh\/b\/(\d+)/;
    const match = action.match(regex);
    const beatmapId = match ? match[1] : null;
    const beatmaps = await this.client.osuApi.beatmaps.getByBeatmapId(
      beatmapId!,
      this.gamemode,
      1
    );
    if (beatmaps.length === 0) return;
    const beatmap = beatmaps[0];
    if (!("title" in beatmap)) return;
    const newBeatmap = await BeatmapServices.create(beatmap);
    this.beatmap = newBeatmap;
    this.emit("beatmap", newBeatmap);
    this.emit("gamemode", beatmap.mode as GameMode);
    this.emit("update");
  }

  constructor(options: BanchoLobbyOptions) {
    super();
    this.client = options.client;
    this.channel = options.channel;
    this.channel.on("message", async ({ user, content }) => {
      if (user?.username !== "BanchoBot") return;
      await this.details(content);
    });
    this.channel.exec("!mp settings");
    this.on("join", async ({ kick, user }) => {
      if (user.role !== "banned") return;
      kick();
    });
  }

  setHost(username: string | null) {
    if (username) {
      this.channel.exec(`!mp host ${username}`);
      return;
    }
    this.channel.exec("!mp clearhost");
  }

  setMap(beatmapId: number) {
    this.channel.exec(`!mp map ${beatmapId} ${this.gamemode}`);
  }

  setPassword(password: string) {
    this.channel.exec(`!mp password ${password}`);
    this.password = password;
  }

  setTeamMode(teamMode: number) {
    this.channel.exec(`!mp set ${teamMode} ${this.winCondition}`);
    this.teamMode = teamMode;
    this.emit("teamMode", teamMode);
    this.emit("update");
  }

  setWinCondition(winCondition: number) {
    this.channel.exec(`!mp set ${this.teamMode} ${winCondition}`);
    this.winCondition = winCondition;
    this.emit("winCondition", winCondition);
    this.emit("update");
  }

  setName(name: string) {
    this.channel.exec(`!mp name ${name}`);
    this.name = name;
    this.emit("name", name);
    this.emit("update");
  }

  async close() {
    this.channel.exec("!mp close");
  }

  on<K extends keyof BanchoLobbyEvents>(
    event: K,
    listener: BanchoLobbyEvents[K]
  ): this {
    return super.on(event, listener);
  }

  emit<K extends keyof BanchoLobbyEvents>(
    event: K,
    ...args: Parameters<BanchoLobbyEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }
}
