import { GamesAPI, GameType } from "@/api/games";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";

export function useGames() {
  const [games, setGames] = useState<GameType[]>([]);
  useEffect(() => {
    GamesAPI.find()
      .then(setGames)
      .catch(() => setGames([]));
    socket.on("update", (raw) => {
      const updatedGame = JSON.parse(raw) as GameType;
      setGames((games) => {
        const gameExists = games.find((g) => g.id === updatedGame.id);
        if (gameExists)
          return games.map((game) =>
            game.id === updatedGame.id ? updatedGame : game
          );
        return [...games, updatedGame];
      });
    });
    socket.on("close", (id) => {
      setGames((games) => {
        return games.filter((game) => game.id !== parseInt(id));
      });
    });
  }, []);
  return { games };
}
