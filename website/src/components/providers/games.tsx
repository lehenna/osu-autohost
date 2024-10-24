import React from "react";
import { GamesContext } from "@/context/games";
import { useGames } from "@/hooks/games";

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const { games } = useGames();
  return (
    <GamesContext.Provider value={{ games }}>{children}</GamesContext.Provider>
  );
}
