import { msToString } from "../lib/formater";
import { GameModel } from "../models/game";

export function addUserStatsModule(game: GameModel) {
  game.commands.push({
    name: "playtime",
    shortname: "pt",
    description: "Shows the playing time of a user in the lobby.",
    run: async (player, args) => {
      const currentTime = player.currentPlayTime();
      const totalTime = player.totalPlayTime();
      const formatedCurrentTime = msToString(currentTime);
      const formatedTotalTime = msToString(totalTime);
      game.reply(
        player.user.username,
        `Your current play time is ${formatedCurrentTime}, your total time is ${formatedTotalTime}.`
      );
    },
  });
}
