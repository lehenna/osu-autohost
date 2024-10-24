import React from "react";
import { GameContext } from "@/context/game";
import { useGame } from "@/hooks/game";
import { GamePageLoader } from "../game-loader";

export function GameProvider({
  children,
  gameId,
}: {
  children: React.ReactNode;
  gameId: string;
}) {
  const { game, pending } = useGame(gameId);
  if (pending) return <GamePageLoader />;
  if (!game) throw new Error("Game not found.");
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}
