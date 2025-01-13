import type { Beatmap } from "nodesu";
import { secondsToString } from "./seconds-to-string";
import { getOsuModeName } from "./get-osu-mode-name";
import { getBeatmapStatus } from "./get-beatmap-status";
import { getBeatmapPerformance } from "./get-beatmap-performance";

export interface BeatmapDetails {
  id: number;
  downloadLink: string;
  title: string;
  difficulty: string;
  difficultyText: string;
  settings: string;
  status: string;
  durationText: string;
  duration: number;
  mode: number;
  modeText: string;
  bpm: string;
  maxCombo: number;
  pp100: string;
  pp98: string;
  pp95: string;
  setId: number;
}

export async function getBeatmapDetails(
  beatmap: Beatmap
): Promise<BeatmapDetails> {
  const modeText = getOsuModeName(beatmap.mode ?? 0);
  const downloadLink = `https://osu.ppy.sh/beatmapsets/${beatmap.setId}#${modeText}/${beatmap.id}`;
  const settings = `AR: ${beatmap.AR} | OD: ${beatmap.OD} | CS: ${beatmap.CS} | HP: ${beatmap.HP}`;
  const status = getBeatmapStatus(beatmap.approved);
  const performance = await getBeatmapPerformance(beatmap.id, beatmap.maxCombo);
  return {
    id: beatmap.id,
    setId: beatmap.setId,
    title: beatmap.title,
    difficulty: beatmap.difficultyRating.toFixed(2),
    difficultyText: beatmap.difficultyName,
    duration: beatmap.totalLength,
    durationText: secondsToString(beatmap.totalLength),
    bpm: beatmap.bpm.toFixed(0),
    downloadLink,
    modeText,
    mode: beatmap.mode ?? 0,
    settings,
    status,
    maxCombo: beatmap.maxCombo,
    pp100: performance.pp100.toFixed(0),
    pp98: performance.pp98.toFixed(0),
    pp95: performance.pp95.toFixed(0),
  };
}

export async function getBasicBeatmapDetails(beatmap: Beatmap) {
  const modeText = getOsuModeName(beatmap.mode ?? 0);
  const downloadLink = `https://osu.ppy.sh/beatmapsets/${beatmap.setId}#${modeText}/${beatmap.id}`;
  return {
    setId: beatmap.setId,
    id: beatmap.id,
    title: beatmap.title,
    difficultyText: beatmap.difficultyName,
    downloadLink,
  };
}
