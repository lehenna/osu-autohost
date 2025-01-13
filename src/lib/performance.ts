import {
  Performance as RosuPerformance,
  Beatmap as RosuBeatmap,
} from "rosu-pp-js";
import axios from "axios";
import { getMods } from "@/utils/get-mods";

export class Performance {
  static async calc(
    beatmapId: string | number,
    options: {
      mods?: string | number;
      combo: number;
      accuracy: number;
      misses: number;
    }
  ) {
    const beatmap = await this.getRosuBeatmapById(beatmapId);
    if (!beatmap) return 0;
    const mods = options.mods
      ? typeof options.mods === "number"
        ? getMods(options.mods)
        : options.mods
      : "";
    const attrs = new RosuPerformance({
      accuracy: options.accuracy,
      combo: options.combo,
      mods,
      misses: options.misses,
    }).calculate(beatmap);
    return attrs.pp;
  }

  private static async getRosuBeatmapById(beatmapId: string | number) {
    const response = await axios.get(`https://osu.ppy.sh/osu/${beatmapId}`, {
      responseType: "arraybuffer",
    });
    const beatmapBuffer = response.data;
    if (!beatmapBuffer) return null;
    const beatmapArray = new Uint8Array(beatmapBuffer);
    const beatmap = new RosuBeatmap(beatmapArray);
    return beatmap;
  }
}
