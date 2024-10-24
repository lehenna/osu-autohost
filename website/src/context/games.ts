import { GameType } from "@/api/games";
import { createContext, useContext } from "react";

export interface GamesContextValue {
  games: GameType[];
}

export const GamesContext = createContext({} as GamesContextValue);

export function useGamesContext() {
  return useContext(GamesContext);
}
