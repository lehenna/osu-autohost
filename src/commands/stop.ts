import { CreateCommandFunction } from "@/models/room";

export const stopCommand: CreateCommandFunction = (room) => {
  return {
    name: "stop",
    exec: async () => {
      await room.clearTimer();
    },
  };
};
