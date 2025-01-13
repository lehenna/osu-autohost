export interface OsuAccuracyOptions {
  count300: number;
  count100: number;
  count50: number;
  countMiss: number;
}

export function calculateOsuAccuracy({
  count300,
  count100,
  count50,
  countMiss,
}: OsuAccuracyOptions) {
  return (
    (100.0 * (6 * count300 + 2 * count100 + count50)) /
    (6 * (count50 + count100 + count300 + countMiss))
  );
}

export interface OsuTaicountKatuoAccuracyOptions {
  count300: number;
  count100: number;
  countMiss: number;
}

export function calculateOsuTaicountKatuoAccuracy({
  count300,
  count100,
  countMiss,
}: OsuTaicountKatuoAccuracyOptions) {
  return (
    (100.0 * (2 * count300 + count100)) /
    (2 * (count300 + count100 + countMiss))
  );
}

export interface OsuCatchAccuracyOptions {
  count300: number;
  count100: number;
  count50: number;
  countMiss: number;
  countKatu?: number;
}

export function calculateOsuCatchAccuracy({
  count300,
  count100,
  count50,
  countMiss,
  countKatu = 0,
}: OsuCatchAccuracyOptions) {
  return (
    (100.0 * (count300 + count100 + count50)) /
    (count300 + count100 + count50 + countKatu + countMiss)
  );
}

export interface OsuManiaAccuracyOptions {
  count300: number;
  count100: number;
  count50: number;
  countMiss: number;
  countKatu?: number;
  countGeki?: number;
}

export function calculateOsuManiaAccuracy({
  count300,
  count100,
  count50,
  countMiss,
  countKatu = 0,
  countGeki = 0,
}: OsuManiaAccuracyOptions) {
  return (
    (100.0 *
      (6 * countGeki + 6 * count300 + 4 * countKatu + 2 * count100 + count50)) /
    (6 * (count50 + count100 + count300 + countMiss + countGeki + countKatu))
  );
}

export type CalculateAccuracyOptions =
  | ({
      mode: 0;
    } & OsuAccuracyOptions)
  | ({
      mode: 1;
    } & OsuTaicountKatuoAccuracyOptions)
  | ({
      mode: 2;
    } & OsuCatchAccuracyOptions)
  | ({
      mode: 3;
    } & OsuManiaAccuracyOptions);

export function calculateAccuracy(options: CalculateAccuracyOptions) {
  if (options.mode === 0) return calculateOsuAccuracy(options);
  if (options.mode === 1) return calculateOsuTaicountKatuoAccuracy(options);
  if (options.mode === 2) return calculateOsuCatchAccuracy(options);
  return calculateOsuManiaAccuracy(options);
}
