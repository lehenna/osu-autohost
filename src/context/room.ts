import type { Room } from "@/models/room";
import { createContext, useContext } from "react";

export const RoomContext = createContext({} as Room);

export function useRoomContext() {
  return useContext(RoomContext);
}
