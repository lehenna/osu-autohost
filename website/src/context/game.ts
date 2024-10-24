import { GameType } from "@/api/games";
import { createContext, useContext } from "react";

export const GameContext = createContext({} as GameType);

export function useGameContext() {
  return useContext(GameContext);
}
