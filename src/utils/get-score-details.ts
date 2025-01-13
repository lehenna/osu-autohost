import { Bancho } from "@/lib/bancho";
import type { BeatmapScore, UserScore } from "nodesu";
import { getMods } from "./get-mods";
import { calculateAccuracy } from "@/lib/accuracy";
import { Performance } from "@/lib/performance";
import { getBasicBeatmapDetails } from "./get-beatmap-details";

export async function getScoreDetails(
  beatmapId: number,
  score: UserScore | BeatmapScore
) {
  const bancho = Bancho.client;
  const beatmaps = await bancho.osuApi.beatmaps.getByBeatmapId(beatmapId);
  const beatmap = beatmaps[0];
  if (!("id" in beatmap)) return null;

  const mods = score.enabledMods ? getMods(score.enabledMods) : "";
  const modsText = mods.length >= 2 ? ` + ${mods}` : "";
  const count = `[${score.count300}, ${score.count100}, ${score.count50}, ${score.countMiss}]`;
  const accuracy = calculateAccuracy({
    count100: score.count100,
    count300: score.count300,
    count50: score.count50,
    countMiss: score.count50,
    countGeki: score.countGeki,
    countKatu: score.countKatu,
    mode: (beatmap.mode as 0 | 1 | 2 | 3) ?? 0,
  });
  const performance = await Performance.calc(beatmap.id, {
    accuracy,
    combo: score.maxCombo,
    misses: score.countMiss,
    mods: score.enabledMods,
  });
  const details = await getBasicBeatmapDetails(beatmap);
  return `[${details.downloadLink} ${details.title} [${
    details.difficultyText
  }]]${modsText} | ${score.rank} ${accuracy.toFixed(
    2
  )}% | ${performance.toFixed(0)}pp | ${count}`;
}
