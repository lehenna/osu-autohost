type UserRole = "user" | "admin" | "moder" | "banned";

interface User {
  id: number;
  username: string;
  playtime: number;
  role: UserRole;
  autoskip: number;
}

// declare enum GameMode {
//   osu = 0,
//   taiko = 1,
//   catch = 2,
//   mania = 3,
// }

type GameMode = 0 | 1 | 2 | 3;

interface GameMessage {
  id: string;
  gameId: number;
  user: User;
  content: string;
  moment: number;
}

interface GameSlot {
  slot: number;
  team: string;
  user: User;
}

interface Game {
  id: number;
  name: string;
  beatmap: Beatmap | null;
  winCondition: number;
  gamemode: GameMode;
  teamMode: number;
  playing: boolean;
  host: User | null;
  minDiff: number;
  maxDiff: number;
  slots: GameSlot[];
  minLength: number;
  maxLength: number;
  password: string;
}

interface GameMessage {
  user: User;
  content: string;
  id: string;
  moment: number;
}

interface GameSet {
  name: string;
  size: number;
  beatmap: number;
  winCondition: number;
  password: string;
  teamMode: number;
  host: number | null;
  minDiff: number;
  maxDiff: number;
  minLength: number;
  maxLength: number;
}

interface BeatmapPerformance {
  pp100: number;
  pp98: number;
  pp95: number;
}

interface Beatmap extends BeatmapPerformance {
  approved: number;
  rankedStatus: number;
  submitDate: Date;
  approvedDate: Date;
  lastUpdate: Date;
  artist: string;
  id: number;
  beatmapId: number;
  setId: number;
  beatmapSetId: number;
  bpm: number;
  creator: string;
  mapper: string;
  creatorId: number;
  mapperId: number;
  difficultyRating: number;
  stars: number;
  diffSize: number;
  circleSize: number;
  CS: number;
  diffOverall: number;
  overallDifficulty: number;
  OD: number;
  diffApproach: number;
  approachRate: number;
  AR: number;
  diffDrain: number;
  hpDrain: number;
  HP: number;
  countNormal: number;
  countSlider: number;
  countSpinner: number;
  hitLength: number;
  source: string | null;
  genre: number;
  language: number;
  title: string;
  totalLength: number;
  version: string;
  difficultyName: string;
  fileMd5: string;
  mode: number | undefined;
  tags: string[];
  favouriteCount: number;
  favoriteCount: number;
  rating: number;
  userRating: number;
  downloadUnavailable: boolean;
  downloadAvailable: boolean;
  audioUnavailable: boolean;
  audioAvailable: boolean;
  playcount: number;
  passcount: number;
  maxCombo: number;
  diffAim: number;
  diffSpeed: number;
  packs: string[];
  video: boolean;
  storyboard: boolean;
}

interface OsuApiScore {
  count300: number;
  count100: number;
  count50: number;
  countMiss: number;
  countGeki: number;
  countKatu: number;
  maxCombo: number;
  rank: string;
  mods?: number;
}
