export const Status = {
  loved: 4,
  qualified: 3,
  approved: 2,
  ranked: 1,
  pending: 0,
  wip: -1,
  graveyard: -2,
};

export function getBeatmapStatus(status: number) {
  for (const approval in Status) {
    const num = Status[approval as keyof typeof Status];
    if (status === num)
      return approval.charAt(0).toUpperCase() + approval.slice(1);
  }
  return "Unknown";
}
