import { GameModel } from "../models/game";

export function addHelpCommand(game: GameModel) {
  game.multi.lobby.on("playing", (playing) => {
    if (playing) return;
    game.send(
      "First time in this lobby? see my commands in our [https://github.com/lehenna/osu-autohost/blob/main/COMMANDS.md Github] repository"
    );
  });
  game.commands.push({
    name: "help",
    description: "Shows the list of commands.",
    shortname: "h",
    run: async () => {
      game.send(
        "Check out the list of commands in my [https://github.com/lehenna/osu-autohost/blob/main/COMMANDS.md Github] repository."
      );
    },
  });
}
