import { CreateCommandFunction } from "@/models/room";
import { secondsToString } from "@/utils/seconds-to-string";

export const timeLeftCommand: CreateCommandFunction = (room) => {
  let endTime: number;

  room.multi.lobby.on("matchStarted", () => {
    endTime = Date.now() + (room.beatmap?.duration ?? 0);
  });

  return {
    name: "timeleft",
    shortname: "tl",
    exec: async (user) => {
      const timeleft = endTime > 0 ? endTime - Date.now() : 0;
      const tl = timeleft > 0 ? timeleft : 0;
      await room.send(`${user.username}, Time left: ${secondsToString(tl)}`);
    },
  };
};
