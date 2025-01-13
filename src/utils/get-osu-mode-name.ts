export function getOsuModeName(mode: number) {
  if (mode === 3) return "catch";
  if (mode === 2) return "taiko";
  if (mode === 1) return "mania";
  return "osu";
}
