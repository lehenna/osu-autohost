import EventEmitter from "events";
import type { Room, RoomMessage } from "@/models/room";
import { User } from "@prisma/client";

export interface WebsocketEvents {
  roomMessage: (message: RoomMessage) => void;
  roomClosed: (roomId: number) => void;
  roomCreated: (room: Room) => void;
  roomUpdated: (room: Room) => void;
  userUpdated: (user: User) => void;
}

export class Websocket extends EventEmitter {
  on<K extends keyof WebsocketEvents>(
    event: K,
    listener: WebsocketEvents[K]
  ): this {
    return super.on(event, listener);
  }

  emit<K extends keyof WebsocketEvents>(
    event: K,
    ...args: Parameters<WebsocketEvents[K]>
  ): boolean {
    return super.emit(event, ...args);
  }
}

export const websocket = new Websocket();
