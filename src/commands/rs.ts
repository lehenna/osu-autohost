import { CreateCommandFunction } from "@/models/room";
import { Bancho } from "@/lib/bancho";
import { getScoreDetails } from "@/utils/get-score-details";

export const rsCommand: CreateCommandFunction = (room) => {
  return {
    name: "rs",
    exec: async (user) => {
      const bancho = Bancho.client;
      const scores = await bancho.osuApi.user.getRecent(user.id, room.gamemode);
      const rs = scores[0];
      if (!("userId" in rs)) {
        await room.send(`${user.username}, Error getting recent score.`);
        return;
      }
      const details = await getScoreDetails(rs.beatmapId, rs);
      if (!details) {
        await room.send(`${user.username}, There are no scores to display.`);
        return;
      }
      await room.send(`${user.username}, Recent score: ${details}`);
    },
  };
};
