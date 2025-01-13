import { CreateCommandFunction } from "@/models/room";

export const queuePositionCommand: CreateCommandFunction = (room) => {
  return {
    name: "queuepos",
    shortname: "qp",
    exec: async (user) => {
      const queueIndex = room.queue.findIndex((i) => i.id === user.id);
      await room.send(
        `${user.username}, Your queue position is #${queueIndex + 1}`
      );
    },
  };
};
