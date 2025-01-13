"use client";

import type { Room } from "@/models/room";
import { RoomContext } from "../context/room";

export function RoomProvider({
  children,
  room,
}: {
  children: React.ReactNode;
  room: Room;
}) {
  return <RoomContext.Provider value={room}>{children}</RoomContext.Provider>;
}
