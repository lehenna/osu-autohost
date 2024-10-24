import { BeatmapServices } from "../services/beatmap";
import { calculateAccuracy } from "./accuracy";
import { transformModsToString } from "./mods";

export function createPerformanceMessage({
  pp100,
  pp98,
  pp95,
}: {
  pp100: number;
  pp98: number;
  pp95: number;
}) {
  return `(100% ${pp100.toFixed(0)}pp | 98% ${pp98.toFixed(
    0
  )}pp | 95% ${pp95.toFixed(0)}pp)`;
}

export function createBeatmapInfo(beatmap: Beatmap, mods: string) {
  const modsText = mods.length >= 2 ? ` + ${mods}` : "";
  const title = `${beatmap.title} [${beatmap.difficultyName}]`;
  return `[https://osu.ppy.sh/beatmapsets/${beatmap.setId} ${title}] ${modsText}`;
}

export async function createScoreMessage(beatmap: Beatmap, score: OsuApiScore) {
  const accuracy = calculateAccuracy({
    count100: score.count100,
    count300: score.count300,
    count50: score.count50,
    countMiss: score.count50,
    countGeki: score.countGeki,
    countKatu: score.countKatu,
    mode: (beatmap.mode as GameMode) ?? 0,
  });
  const mods = score.mods ? transformModsToString(score.mods) : "";
  const beatmapInfo = createBeatmapInfo(beatmap, mods);
  const isFC = beatmap.maxCombo === score.maxCombo;
  let ppIfFC: string | null = null;
  if (!isFC) {
    const pp = await BeatmapServices.calcPerformance(
      beatmap,
      accuracy,
      0,
      mods
    );
    ppIfFC = `(${pp.toFixed(0)}pp if FC)`;
  }
  const scorePP = await BeatmapServices.calcPerformance(
    beatmap,
    accuracy,
    score.countMiss,
    mods
  );
  const ppString = [`${scorePP.toFixed(0)}pp`, ppIfFC]
    .filter((k) => k && k.length > 0)
    .join(" ");
  const count = `[${score.count300}, ${score.count100}, ${score.count50}, ${score.countMiss}]`;
  return [beatmapInfo, score.rank, `${accuracy.toFixed(2)}%`, ppString, count]
    .filter((k) => k && k.length > 0)
    .join(" | ");
}
