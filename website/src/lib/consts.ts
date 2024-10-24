export const DEV_MODE = import.meta.env.MODE === "development";

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
