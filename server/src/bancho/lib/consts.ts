export const TeamMode = {
  0: "HeadToHead",
  1: "TagCoop",
  2: "TeamVs",
  3: "TagTeamVs",
};

export const WinCondition = {
  0: "Score",
  1: "Accuracy",
  2: "Score V2",
};

export function getTeamModeValue(teamMode: string) {
  return teamMode === "headtohead"
    ? 0
    : teamMode === "tagcoop"
    ? 1
    : teamMode === "teamvs"
    ? 2
    : 3;
}

export function getWinConditionValue(winCondition: string) {
  return winCondition === "score" ? 0 : winCondition === "accuracy" ? 2 : 3;
}
