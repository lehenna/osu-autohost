import { secondsToString } from "../lib/formater";
import {
  createBeatmapInfo,
  createPerformanceMessage,
  createScoreMessage,
} from "../lib/messages";
import { getApprovalStatus } from "../lib/status";
import { GameModel } from "../models/game";
import { BeatmapServices } from "../services/beatmap";

export function addBeatmapStatsModule(game: GameModel) {
  let lastGame: Beatmap | null;
  let previusBeatmap: Beatmap;
  game.multi.lobby.on("playing", (playing) => {
    if (!playing) return;
    lastGame = game.multi.lobby.beatmap;
  });
  game.multi.lobby.on("beatmap", (beatmap) => {
    if (beatmap.id === previusBeatmap?.id) return;

    if (beatmap.difficultyRating < game.minDiff) {
      game.multi.lobby.setMap(previusBeatmap?.id);
      game.send(
        `The selected map does not meet the minimum difficulty of the lobby (${
          beatmap.difficultyRating < game.minDiff
        }).`
      );
      return;
    }

    if (beatmap.difficultyRating > game.maxDiff) {
      game.multi.lobby.setMap(previusBeatmap?.id);
      game.send(
        `The selected map does not meet the maximum difficulty of the lobby (${
          beatmap.difficultyRating > game.maxDiff
        }).`
      );
      return;
    }

    if (beatmap.totalLength < game.minLength) {
      game.multi.lobby.setMap(previusBeatmap?.id);
      game.send(
        `The selected map does not meet the minimum length of the lobby (${secondsToString(
          beatmap.totalLength
        )} < ${secondsToString(game.minLength)}).`
      );
      return;
    }

    if (beatmap.totalLength > game.maxLength) {
      game.multi.lobby.setMap(previusBeatmap?.id);
      game.send(
        `The selected map does not meet the maximum length of the lobby (${secondsToString(
          beatmap.totalLength
        )} > ${secondsToString(game.maxLength)}).`
      );
      return;
    }

    const downloadLinks = createBeatmapInfo(beatmap, "");
    const performance = createPerformanceMessage({
      pp100: beatmap.pp100,
      pp98: beatmap.pp98,
      pp95: beatmap.pp95,
    });
    const diffValues = `(AR: ${beatmap.AR} | OD: ${beatmap.OD} | CS: ${beatmap.CS} | HP: ${beatmap.HP})`;
    const approved = getApprovalStatus(beatmap.approved);
    const formatedSeconds = secondsToString(beatmap.totalLength);
    const status = `(Star Rating: ${beatmap.difficultyRating.toFixed(
      2
    )} | ${approved} | Length: ${formatedSeconds} | BPM: ${beatmap.bpm})`;
    const settings = `${diffValues} (FC: x${beatmap.maxCombo}) ${performance}`;
    const info = `${downloadLinks} | ${status}`;
    game.send(info);
    game.send(settings);
    previusBeatmap = beatmap;
  });
  game.commands.push(
    {
      name: "config",
      shortname: "c",
      description: "Shows the lobby configuration.",
      run: async () => {
        game.send(
          `(Difficulty: ${game.minDiff} - ${
            game.maxDiff
          }) (Length: ${secondsToString(game.minLength)} - ${secondsToString(
            game.maxLength
          )})`
        );
      },
    },
    {
      name: "pp",
      description: "Obtain the possible PP values ​for a map.",
      args: "<mods>",
      run: async (player, mods) => {
        const beatmap = game.multi.lobby.beatmap;
        if (!beatmap)
          return game.reply(
            player.user.username,
            "There is no map currently selected."
          );
        let pp100 = beatmap.pp100;
        let pp98 = beatmap.pp98;
        let pp95 = beatmap.pp95;
        if (!mods) mods = "";
        if (mods || mods.length >= 2) {
          try {
            const performance = await BeatmapServices.getPerformance(
              beatmap,
              mods
            );
            pp100 = performance.pp100;
            pp98 = performance.pp98;
            pp95 = performance.pp95;
          } catch {
            game.reply(player.user.username, `Invalid mods "${mods}"`);
            return;
          }
        }
        const info = createBeatmapInfo(beatmap, mods);
        const performance = createPerformanceMessage({ pp100, pp98, pp95 });
        const content = `${info} (FC: x${beatmap.maxCombo}) ${performance}`;
        game.reply(player.user.username, content);
      },
    },
    {
      name: "rs",
      description: "Shows your recently obtained score.",
      run: async (player) => {
        if (!lastGame) {
          game.reply(player.user.username, "There hasn't been any match yet.");
          return;
        }
        const scores = await game.multi.client.osuApi.user.getRecent(
          player.user.id
        );
        const recentScore = scores[0] ?? null;
        if (!recentScore || !("scoreId" in recentScore)) {
          game.reply(
            player.user.username,
            "You don't have scores to show yet."
          );
          return;
        }
        if (recentScore.beatmapId !== lastGame.id) {
          game.reply(
            player.user.username,
            "You haven't played the last match."
          );
          return;
        }
        const message = await createScoreMessage(lastGame, {
          count300: recentScore.count300,
          count100: recentScore.count100,
          count50: recentScore.count50,
          countMiss: recentScore.countMiss,
          countGeki: recentScore.countGeki,
          countKatu: recentScore.countKatu,
          maxCombo: recentScore.maxCombo,
          rank: recentScore.rank,
          mods: recentScore.enabledMods,
        });
        game.reply(player.user.username, message);
      },
    }
  );
}
