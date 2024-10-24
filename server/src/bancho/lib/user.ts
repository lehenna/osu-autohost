import { UserServices } from "../../services/users";
import { BanchoMultiplayerChannel } from "./channel";

export interface BanchoUserOptions {
  id: number;
  username: string;
  playtime: number;
  role: UserRole;
  autoskip: number;
}

export class BanchoUser {
  readonly id: number;
  readonly username: string;
  public playtime: number;
  public role: UserRole;
  public autoskip: number;

  constructor(options: BanchoUserOptions) {
    this.id = options.id;
    this.username = options.username;
    this.playtime = options.playtime;
    this.role = options.role;
    this.autoskip = options.autoskip;
  }

  data(): User {
    return {
      id: this.id,
      username: this.username,
      autoskip: this.autoskip,
      playtime: this.playtime,
      role: this.role,
    };
  }

  async setRole(role: UserRole) {
    this.role = role;
    await UserServices.update(this.id, { role });
  }

  async ban() {
    await UserServices.update(this.id, {
      role: "banned",
    });
  }

  async setAutoplay(autoskip: number) {
    this.autoskip = autoskip;
    await UserServices.update(this.id, {
      autoskip,
    });
  }

  async unban() {
    await UserServices.update(this.id, {
      role: "user",
    });
  }
}

export interface BanchoPlayerOptions {
  channel: BanchoMultiplayerChannel;
  user: BanchoUser;
  slot: number;
  team: string | null;
}

export class BanchoPlayer {
  readonly connectedAt = Date.now();
  readonly channel: BanchoMultiplayerChannel;
  readonly user: BanchoUser;
  public slot: number;
  public team: string | null;

  constructor(options: BanchoPlayerOptions) {
    this.channel = options.channel;
    this.user = options.user;
    this.slot = options.slot;
    this.team = options.team;
  }

  currentPlayTime() {
    return Date.now() - this.connectedAt;
  }

  totalPlayTime() {
    const current = this.currentPlayTime();
    return current + this.user.playtime;
  }

  async savePlayTime() {
    this.user.playtime = this.user.playtime;
    await UserServices.update(this.user.id, {
      playtime: this.totalPlayTime(),
    });
  }

  data(): GameSlot {
    return {
      user: {
        ...this.user.data(),
        playtime: this.totalPlayTime(),
      },
      slot: this.slot,
      team: this.team ?? "",
    };
  }

  async ban() {
    await this.user.ban();
    this.channel.exec(`!mp kick ${this.user.username}`);
  }

  async unban() {
    await this.user.unban();
  }

  kick() {
    this.channel.exec(`!mp kick ${this.user.username}`);
  }

  host() {
    this.channel.exec(`!mp host ${this.user.username}`);
  }
}
