import { CreateCommandFunction } from "@/models/room";

export const queueCommand: CreateCommandFunction = (room) => {
  return {
    name: "queue",
    shortname: "q",
    exec: async () => {
      await room.sendQueue();
    },
  };
};
