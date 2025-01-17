import { APIError } from "../lib/api-error";
import { RoomModel, RoomOptions } from "../models/room";

// commands
import { abortCommand } from "../commands/abort";
import { bmsCommand } from "../commands/bms";
import { helpCommand } from "../commands/help";
import { queuePositionCommand } from "../commands/queue-position";
import { queueCommand } from "../commands/queue";
import { rsCommand } from "../commands/rs";
import { skipCommand } from "../commands/skip";
import { startCommand } from "../commands/start";
import { stopCommand } from "../commands/stop";
import { timeLeftCommand } from "../commands/timeleft";
import { Bancho } from "@/lib/bancho";
import { websocket } from "@/lib/websocket";
import { banCommand } from "@/commands/ban";

const commands = [
  startCommand,
  skipCommand,
  stopCommand,
  rsCommand,
  helpCommand,
  bmsCommand,
  queueCommand,
  timeLeftCommand,
  queuePositionCommand,
  abortCommand,
  banCommand,
];

export class RoomServices {
  static rooms: RoomModel[] = [];

  static async find() {
    return this.rooms.map((room) => room.data());
  }

  static async findById(roomId: number) {
    return this.rooms.find((room) => room.id === roomId)?.data() ?? null;
  }

  static async create(options: RoomOptions) {
    const bancho = Bancho.client;
    const multi = await bancho.createLobby(options.name, false);
    const newRoomModel = new RoomModel(multi, options);
    newRoomModel.addCommands(commands);
    this.rooms.push(newRoomModel);

    websocket.on("roomClosed", (roomId) => {
      const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
      if (roomIndex < 0) return;
      this.rooms.splice(roomIndex, 1);
    });

    return newRoomModel.data();
  }

  static async update(roomId: number, options: Partial<RoomOptions>) {
    const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
    if (roomIndex < 0) throw new APIError(404, "Room not found.");
    const RoomModel = this.rooms[roomIndex];
    await RoomModel.update(options);
    return RoomModel.data();
  }

  static async removeAll() {
    for (const RoomModel of this.rooms) {
      await RoomModel.remove();
    }
    this.rooms = this.rooms;
  }

  static async remove(roomId: number) {
    const roomIndex = this.rooms.findIndex((room) => room.id === roomId);
    if (roomIndex < 0) throw new APIError(404, "Room not found.");
    const RoomModel = this.rooms[roomIndex];
    await RoomModel.remove();
    this.rooms.splice(roomIndex, 1);
    websocket.emit("roomClosed", roomId);
  }
}
