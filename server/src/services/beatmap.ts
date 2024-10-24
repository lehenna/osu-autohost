import { eq } from "drizzle-orm";
import { Beatmap as NodesuBeatmap } from "nodesu";
import { Performance } from "../lib/performance";
import { db } from "../lib/database";
import { BeatmapPerformance } from "../lib/schemas";

export class BeatmapServices {
  static async calcPerformance(
    beatmap: { id: number; maxCombo: number },
    accuracy: number,
    misses: number = 0,
    mods: string = ""
  ) {
    return await Performance.calc(beatmap.id, {
      misses,
      accuracy,
      combo: beatmap.maxCombo,
      mods,
    });
  }

  static async getPerformance(
    beatmap: { id: number; maxCombo: number },
    mods: string = ""
  ): Promise<BeatmapPerformance> {
    const existsPerformance = await db
      .select()
      .from(BeatmapPerformance)
      .where(eq(BeatmapPerformance.id, beatmap.id));
    if (existsPerformance.length > 0) return existsPerformance[0];
    const newPerformance = {
      pp100: await Performance.calc(beatmap.id, {
        misses: 0,
        accuracy: 100,
        combo: beatmap.maxCombo,
        mods,
      }),
      pp98: await Performance.calc(beatmap.id, {
        misses: 0,
        accuracy: 98,
        combo: beatmap.maxCombo,
        mods,
      }),
      pp95: await Performance.calc(beatmap.id, {
        misses: 0,
        accuracy: 95,
        combo: beatmap.maxCombo,
        mods,
      }),
    };
    await db.insert(BeatmapPerformance).values({
      id: beatmap.id,
      ...newPerformance,
    });
    return newPerformance;
  }

  static async create(beatmap: NodesuBeatmap) {
    const performance = await this.getPerformance({
      id: beatmap.id,
      maxCombo: beatmap.maxCombo,
    });
    const newBeatmap: Beatmap = {
      approved: beatmap.approved,
      rankedStatus: beatmap.rankedStatus,
      submitDate: beatmap.submitDate,
      approvedDate: beatmap.approvedDate,
      lastUpdate: beatmap.lastUpdate,
      artist: beatmap.artist,
      id: beatmap.id,
      beatmapId: beatmap.beatmapId,
      setId: beatmap.setId,
      beatmapSetId: beatmap.beatmapSetId,
      bpm: beatmap.bpm,
      creator: beatmap.creator,
      mapper: beatmap.mapper,
      creatorId: beatmap.creatorId,
      mapperId: beatmap.mapperId,
      difficultyRating: beatmap.difficultyRating,
      stars: beatmap.stars,
      diffSize: beatmap.diffSize,
      circleSize: beatmap.circleSize,
      CS: beatmap.CS,
      diffOverall: beatmap.diffOverall,
      overallDifficulty: beatmap.overallDifficulty,
      OD: beatmap.OD,
      diffApproach: beatmap.diffApproach,
      approachRate: beatmap.approachRate,
      AR: beatmap.AR,
      diffDrain: beatmap.diffDrain,
      hpDrain: beatmap.hpDrain,
      HP: beatmap.HP,
      countNormal: beatmap.countNormal,
      countSlider: beatmap.countSlider,
      countSpinner: beatmap.countSpinner,
      hitLength: beatmap.hitLength,
      source: beatmap.source,
      genre: beatmap.genre,
      language: beatmap.language,
      title: beatmap.title,
      totalLength: beatmap.totalLength,
      version: beatmap.version,
      difficultyName: beatmap.difficultyName,
      fileMd5: beatmap.fileMd5,
      mode: beatmap.mode,
      tags: beatmap.tags,
      favouriteCount: beatmap.favouriteCount,
      favoriteCount: beatmap.favoriteCount,
      rating: beatmap.rating,
      userRating: beatmap.userRating,
      downloadUnavailable: beatmap.downloadUnavailable,
      downloadAvailable: beatmap.downloadAvailable,
      audioUnavailable: beatmap.audioUnavailable,
      audioAvailable: beatmap.audioAvailable,
      playcount: beatmap.playcount,
      passcount: beatmap.passcount,
      maxCombo: beatmap.maxCombo,
      diffAim: beatmap.diffAim,
      diffSpeed: beatmap.diffSpeed,
      packs: beatmap.packs,
      video: beatmap.video,
      storyboard: beatmap.storyboard,
      ...performance,
    };
    return newBeatmap;
  }
}
