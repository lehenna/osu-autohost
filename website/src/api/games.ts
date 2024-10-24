import { API } from "@/lib/axios";

export interface GameSlotType {
  slot: number;
  team: string;
  user: User;
}

export interface GameType {
  id: number;
  name: string;
  size: number;
  beatmap: Beatmap | null;
  winCondition: number;
  gamemode: GameMode;
  password: string;
  teamMode: number;
  playing: boolean;
  host: User | null;
  minDiff: number;
  maxDiff: number;
  slots: GameSlotType[];
  minLength: number;
  maxLength: number;
}

export class GamesAPI {
  static async find(): Promise<GameType[]> {
    try {
      const res = await API.get("/api/games");
      return res.data;
    } catch {
      return [];
    }
  }

  static async findById(gameId: number): Promise<GameType | null> {
    try {
      const res = await API.get(`/api/games/${gameId}`);
      return res.data;
    } catch {
      return null;
    }
  }

  static async kick(gameId: number, userId: number): Promise<void> {
    try {
      await API.post(`/api/games/${gameId}/kick`, { userId });
    } catch {
      return;
    }
  }

  static async create(data: {
    password: string;
    name: string;
    hostRotate: boolean;
  }): Promise<GameType | null> {
    try {
      const res = await API.post("/api/games", data);
      return res.data;
    } catch {
      return null;
    }
  }

  static async update(
    gameId: number,
    data: {
      name?: string;
      minDiff?: number;
      maxDiff?: number;
      minLength?: number;
      maxLength?: number;
      password?: string;
      size?: number;
      mapId?: number;
      winCondition?: number;
      teamMode?: number;
      host?: string | null;
    }
  ) {
    try {
      await API.patch(`/api/games/${gameId}`, data);
    } catch {
      return;
    }
  }

  static async close(gameId: number) {
    try {
      await API.delete(`/api/games/${gameId}`);
    } catch {
      return;
    }
  }
}
