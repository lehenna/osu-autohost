import { BeatmapScore } from "nodesu";
import { CreateCommandFunction } from "@/models/room";
import { Bancho } from "@/lib/bancho";
import { getScoreDetails } from "@/utils/get-score-details";

export const bmsCommand: CreateCommandFunction = (room) => {
  return {
    name: "bms",
    exec: async (user) => {
      const bancho = Bancho.client;
      const beatmap = room.beatmap;
      if (!beatmap) {
        await room.send(`${user.username}, There is no map selected.`);
        return;
      }
      const scores = (await bancho.osuApi.scores.get(
        beatmap.id,
        undefined,
        room.gamemode,
        undefined,
        user.id
      )) as BeatmapScore[];
      const sortedScores = scores.sort((a, b) => {
        return b.score - a.score;
      });
      const bestScore = sortedScores[0];
      if (!bestScore) {
        await room.send(`${user.username}, There are no scores to display.`);
        return;
      }
      const details = await getScoreDetails(beatmap.id, bestScore);
      if (!details) {
        await room.send(`${user.username}, There are no scores to display.`);
        return;
      }
      await room.send(`${user.username}, Best score: ${details}`);
    },
  };
};
