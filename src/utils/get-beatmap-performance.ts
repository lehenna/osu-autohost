import { Performance } from "@/lib/performance";

export async function getBeatmapPerformance(
  beatmapId: number,
  maxCombo: number,
  mods?: number
) {
  return {
    pp100: await Performance.calc(beatmapId, {
      misses: 0,
      accuracy: 100,
      combo: maxCombo,
      mods,
    }),
    pp98: await Performance.calc(beatmapId, {
      misses: 0,
      accuracy: 98,
      combo: maxCombo,
      mods,
    }),
    pp95: await Performance.calc(beatmapId, {
      misses: 0,
      accuracy: 95,
      combo: maxCombo,
      mods,
    }),
  };
}
