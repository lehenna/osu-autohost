import { EventEmitter } from "events";
import { getBanchoClient } from "../lib/bancho";
import { GameModel } from "./game";
import { nanoid } from "nanoid";
import { addHostRotateModule } from "../modules/host-rotate";
import { addUserStatsModule } from "../modules/user-stats";
import { addBeatmapStatsModule } from "../modules/beatmap-stats";
import { addHelpCommand } from "../modules/help-command";
import { UserServices } from "../services/users";
import { BanchoUser } from "../bancho";

export interface GamesEvents {
  update: (game: GameModel) => void;
  message: (data: GameMessage) => void;
  close: (game: GameModel) => void;
}

class GamesModel extends EventEmitter {
  readonly games: GameModel[] = [];

  on<K extends keyof GamesEvents>(event: K, listener: GamesEvents[K]): this {
    return super.on(event, listener);
  }

  emit<K extends keyof GamesEvents>(
    event: K,
    ...args: Parameters<GamesEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }

  data() {
    return this.games.map((game) => game.data());
  }

  findById(gameId: number) {
    return this.games.find((game) => game.multi.id === gameId) ?? null;
  }

  async findUser(userId: number) {
    for (const game of this.games) {
      const user = game.findUser(userId);
      if (!user) continue;
      return user;
    }
    const userData = await UserServices.findById(userId);
    return new BanchoUser(userData as User);
  }

  async create(data: { name: string; password: string; hostRotate?: boolean }) {
    const banchoClient = getBanchoClient();
    const multi = await banchoClient.createLobby(data.name, false);
    const game = new GameModel(multi);
    this.games.push(game);
    game.multi.lobby.setPassword(data.password);
    game.multi.on("message", (message) => {
      const moment = Date.now();
      this.emit("message", {
        content: message.content,
        gameId: game.multi.id,
        id: `${nanoid()}-${moment}`,
        moment,
        user: message.user?.data()!,
      });
    });
    game.on("update", () => {
      this.emit("update", game);
    });
    game.on("close", () => {
      const index = this.games.findIndex((i) => i.multi.id === game.multi.id);
      if (index === -1) return;
      this.games.splice(index, 1);
      this.emit("close", game);
    });
    this.emit("update", game);
    if (data.hostRotate) addHostRotateModule(game);
    addUserStatsModule(game);
    addBeatmapStatsModule(game);
    addHelpCommand(game);
    return game;
  }
}

export const Games = new GamesModel();
